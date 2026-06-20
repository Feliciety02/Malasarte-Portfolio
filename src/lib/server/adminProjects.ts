import "@tanstack/react-start/server-only";

import { projects, type ProjectCategory } from "@/data/projects";
import { fetchPortfolioProjectsFromSupabase } from "@/data/supabaseProjects";
import type { AdminProjectRecord } from "@/features/admin/types";
import { getAdminSupabaseClient, isAdminPersistenceConfigured } from "./adminSupabase";

const orderedCategories: ProjectCategory[] = [
  "UI/UX Design",
  "Software Development",
  "Logo & Branding",
  "Social Media Graphics",
  "Creative Assets",
  "Writing / VA",
];

function getDefaultProjects() {
  return projects.map<AdminProjectRecord>((project) => ({
    slug: project.slug,
    title: project.title,
    directoryTitle: project.directoryTitle ?? project.title,
    primaryCategory: project.cat,
    secondaryCategories: project.categories ?? [],
    kind: project.kind,
    tag: project.tag,
    description: project.desc,
    role: project.role,
    collaborators: project.collaborators ?? [],
    tools: project.tools,
    year: project.year,
    client: project.client,
    overview: project.overview,
    outcome: project.outcome,
    hasServerRecord: false,
  }));
}

export async function listAdminProjects() {
  const defaults = getDefaultProjects();
  const defaultsBySlug = new Map(defaults.map((project) => [project.slug, project]));

  const remoteProjects = await fetchPortfolioProjectsFromSupabase();
  if (!remoteProjects?.length) {
    return defaults.sort((a, b) => a.title.localeCompare(b.title));
  }

  for (const project of remoteProjects) {
    defaultsBySlug.set(project.slug, {
      slug: project.slug,
      title: project.title,
      directoryTitle: project.directoryTitle ?? project.title,
      primaryCategory: project.cat,
      secondaryCategories: project.categories ?? [],
      kind: project.kind,
      tag: project.tag,
      description: project.desc,
      role: project.role,
      collaborators: project.collaborators ?? [],
      tools: project.tools,
      year: project.year,
      client: project.client,
      overview: project.overview,
      outcome: project.outcome,
      hasServerRecord: true,
    });
  }

  return Array.from(defaultsBySlug.values()).sort((a, b) => a.title.localeCompare(b.title));
}

function normalizeCategories(project: AdminProjectRecord) {
  const unique = new Set<ProjectCategory>();
  unique.add(project.primaryCategory);

  for (const category of project.secondaryCategories) {
    if (orderedCategories.includes(category) && category !== project.primaryCategory) {
      unique.add(category);
    }
  }

  return Array.from(unique);
}

export async function saveAdminProject(project: AdminProjectRecord) {
  if (!isAdminPersistenceConfigured()) {
    throw new Error("Server persistence is not configured.");
  }

  const existingProject =
    projects.find((candidate) => candidate.slug === project.slug) ??
    (await fetchPortfolioProjectsFromSupabase())?.find((candidate) => candidate.slug === project.slug);

  if (!existingProject) {
    throw new Error(`Unknown project slug: ${project.slug}`);
  }

  const supabase = getAdminSupabaseClient();
  const categories = normalizeCategories(project);

  const { data: savedProject, error: projectError } = await supabase
    .from("portfolio_projects")
    .upsert(
      {
        slug: project.slug,
        title: project.title.trim(),
        directory_title: project.directoryTitle.trim() || null,
        primary_category: project.primaryCategory,
        kind: existingProject.kind,
        tag: project.tag.trim() || null,
        description: project.description.trim() || null,
        role: project.role.trim() || null,
        collaborators: project.collaborators.map((item) => item.trim()).filter(Boolean),
        tools: project.tools.map((tool) => tool.trim()).filter(Boolean),
        year: project.year.trim() || null,
        client: project.client.trim() || null,
        overview: project.overview.trim() || null,
        outcome: project.outcome.trim() || null,
      },
      { onConflict: "slug" },
    )
    .select("id")
    .single();

  if (projectError || !savedProject) {
    throw new Error(projectError?.message || "Unable to save project.");
  }

  const { error: deleteCategoriesError } = await supabase
    .from("portfolio_project_categories")
    .delete()
    .eq("project_id", savedProject.id);

  if (deleteCategoriesError) {
    throw new Error(deleteCategoriesError.message);
  }

  const { error: insertCategoriesError } = await supabase
    .from("portfolio_project_categories")
    .insert(
      categories.map((category, index) => ({
        project_id: savedProject.id,
        category,
        pill_label: category,
        title_override: null,
        sort_order: index,
      })),
    );

  if (insertCategoriesError) {
    throw new Error(insertCategoriesError.message);
  }
}
