import type { Project, ProjectCategory, ProjectFilter } from "@/data/projects";
import { projects, getProject, getProjectsByCategoryFrom } from "@/data/projects";
import contentJson from "@/content/projects.json";

export type ContentProject = {
  slug: string;
  title: string;
  desc: string;
  overview: string;
  role: string;
  client: string;
  year: string;
  tools: string[];
  tags: string[];
  goals: string[];
  timeline: ContentTimelineEntry[];
  screenshots: ContentScreenshot[];
};

export type ContentTimelineEntry = {
  phase: string;
  date: string;
  description: string;
};

export type ContentScreenshot = {
  id: string;
  label: string;
  fileName: string;
  sizes: {
    thumb: string;
    medium: string;
    full: string;
  };
  projectSlug: string;
  uploadedAt: string;
};

const contentData: ContentProject[] = contentJson.projects;

const getContentForProject = (slug: string): ContentProject | undefined =>
  contentData.find((p) => p.slug === slug);

export const getMergedProject = (slug: string): Project | undefined => {
  const base = getProject(slug);
  if (!base) return undefined;
  const content = getContentForProject(slug);
  if (!content) return base;
  return {
    ...base,
    desc: content.desc || base.desc,
    overview: content.overview || base.overview,
    role: content.role || base.role,
    client: content.client || base.client,
    year: content.year || base.year,
    tools: content.tools.length > 0 ? content.tools : base.tools,
    goals: content.goals.length > 0 ? content.goals : base.goals,
  };
};

export const getMergedProjects = (): Project[] =>
  projects.map((p) => getMergedProject(p.slug) ?? p);

export const getMergedProjectsByCategory = (category: ProjectFilter): Project[] =>
  getProjectsByCategoryFrom(getMergedProjects(), category);

export const getProjectTags = (slug: string): string[] => {
  const content = getContentForProject(slug);
  return content?.tags ?? [];
};

export const getAllTags = (): string[] => {
  const tagSet = new Set<string>();
  for (const p of contentData) {
    for (const t of p.tags) tagSet.add(t);
  }
  return Array.from(tagSet).sort();
};

export const getProjectsByTag = (tag: string): ContentProject[] =>
  contentData.filter((p) => p.tags.includes(tag));

export const searchProjects = (query: string): ContentProject[] => {
  const q = query.toLowerCase();
  return contentData.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.tools.some((t) => t.toLowerCase().includes(q)),
  );
};

export const saveScreenshot = (projectSlug: string, screenshot: ContentScreenshot): void => {
  const project = contentData.find((p) => p.slug === projectSlug);
  if (project) {
    project.screenshots.push(screenshot);
  }
};

export const getProjectScreenshots = (slug: string): ContentScreenshot[] => {
  const project = contentData.find((p) => p.slug === slug);
  return project?.screenshots ?? [];
};

export const removeScreenshot = (projectSlug: string, screenshotId: string): void => {
  const project = contentData.find((p) => p.slug === projectSlug);
  if (project) {
    project.screenshots = project.screenshots.filter((s) => s.id !== screenshotId);
  }
};

export const exportContentJson = (): string => JSON.stringify({ projects: contentData }, null, 2);
