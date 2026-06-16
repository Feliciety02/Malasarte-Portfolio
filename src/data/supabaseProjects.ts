import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import {
  getProject,
  type Project,
  type ProjectCategory,
  type ProjectGalleryItem,
  type ProjectKind,
} from "@/data/projects";

type PortfolioCategoryRow = {
  category: ProjectCategory;
  pill_label: string;
  title_override: string | null;
  sort_order: number | null;
};

type PortfolioGalleryRow = {
  label: string;
  note: string | null;
  image_url: string | null;
  ratio: ProjectGalleryItem["ratio"] | null;
  color: string | null;
  sort_order: number | null;
};

type PortfolioProjectRow = {
  slug: string;
  title: string;
  directory_title: string | null;
  primary_category: ProjectCategory;
  kind: ProjectKind;
  tag: string | null;
  description: string | null;
  role: string | null;
  tools: string[] | null;
  year: string | null;
  client: string | null;
  overview: string | null;
  outcome: string | null;
  sort_order: number | null;
  portfolio_project_categories?: PortfolioCategoryRow[];
  portfolio_gallery_items?: PortfolioGalleryRow[];
};

const portfolioSelect = `
  slug,
  title,
  directory_title,
  primary_category,
  kind,
  tag,
  description,
  role,
  tools,
  year,
  client,
  overview,
  outcome,
  sort_order,
  portfolio_project_categories (
    category,
    pill_label,
    title_override,
    sort_order
  ),
  portfolio_gallery_items (
    label,
    note,
    image_url,
    ratio,
    color,
    sort_order
  )
`;

const hiddenProjectSlugs = new Set([
  "cosmic-remedies-by-sia-logo",
  "pietyl-management-system-logo",
]);
const localIdentitySlugs = new Set(["pietyl-lpg"]);
const localGallerySlugs = new Set(["enigma", "umsdc-publication-materials-and-assets"]);

const sortBySortOrder = <T extends { sort_order: number | null }>(items: T[] = []) =>
  [...items].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

function makeFallbackProject(row: PortfolioProjectRow): Project {
  const gallery = sortBySortOrder(row.portfolio_gallery_items ?? []).map((item) => ({
    color: item.color ?? "from-fuchsia-500/50 to-violet-500/30",
    label: item.label,
    imageUrl: item.image_url ?? undefined,
    ratio: item.ratio ?? "square",
    note: item.note ?? "",
  }));

  return {
    slug: row.slug,
    title: row.title,
    directoryTitle: row.directory_title ?? row.title,
    cat: row.primary_category,
    kind: row.kind,
    tag: row.tag ?? row.primary_category,
    color: "from-fuchsia-500/50 to-violet-500/30",
    desc: row.description ?? row.overview ?? row.title,
    role: row.role ?? "Designer",
    tools: row.tools ?? [],
    year: row.year ?? "",
    client: row.client ?? row.directory_title ?? row.title,
    overview: row.overview ?? row.description ?? "",
    goals: [],
    impact: [],
    focusAreas: [],
    process: [],
    challenges: [],
    outcome: row.outcome ?? "",
    gallery,
  };
}

function mapProject(row: PortfolioProjectRow): Project {
  const localProject = getProject(row.slug);
  const categoryRows = sortBySortOrder(row.portfolio_project_categories ?? []);
  const secondaryCategories = categoryRows
    .map((item) => item.category)
    .filter((category) => category !== row.primary_category);
  const categoryLabels = Object.fromEntries(
    categoryRows.map((item) => [item.category, item.pill_label]),
  ) as Partial<Record<ProjectCategory, string>>;
  const categoryTitles = Object.fromEntries(
    categoryRows
      .filter((item) => item.title_override)
      .map((item) => [item.category, item.title_override]),
  ) as Partial<Record<ProjectCategory, string>>;
  const galleryRows = sortBySortOrder(row.portfolio_gallery_items ?? []);

  const base = localProject ?? makeFallbackProject(row);
  const useLocalIdentity = localProject ? localIdentitySlugs.has(row.slug) : false;
  const useLocalGallery = localProject ? localGallerySlugs.has(row.slug) : false;

  return {
    ...base,
    slug: row.slug,
    title: useLocalIdentity ? base.title : row.title,
    directoryTitle: useLocalIdentity
      ? base.directoryTitle
      : (row.directory_title ?? base.directoryTitle),
    cat: row.primary_category,
    kind: row.kind,
    categories: secondaryCategories.length ? secondaryCategories : base.categories,
    categoryLabels: Object.keys(categoryLabels).length ? categoryLabels : base.categoryLabels,
    categoryTitles: Object.keys(categoryTitles).length ? categoryTitles : base.categoryTitles,
    tag: useLocalIdentity ? base.tag : (row.tag ?? base.tag),
    desc: useLocalIdentity ? base.desc : (row.description ?? base.desc),
    role: row.role ?? base.role,
    tools: row.tools ?? base.tools,
    year: row.year ?? base.year,
    client: useLocalIdentity ? base.client : (row.client ?? base.client),
    overview: useLocalIdentity ? base.overview : (row.overview ?? base.overview),
    outcome: useLocalIdentity ? base.outcome : (row.outcome ?? base.outcome),
    gallery:
      !useLocalGallery && galleryRows.length
        ? galleryRows.map((item, index) => ({
            ...base.gallery[index],
            color: item.color ?? "from-fuchsia-500/50 to-violet-500/30",
            label: item.label,
            imageUrl: item.image_url ?? undefined,
            ratio: item.ratio ?? "square",
            note: item.note ?? "",
          }))
        : base.gallery,
  };
}

export async function fetchPortfolioProjectsFromSupabase() {
  if (!isSupabaseConfigured) return undefined;

  try {
    const { data, error } = await getSupabaseClient()
      .from("portfolio_projects")
      .select(portfolioSelect)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    if (!data?.length) return undefined;

    return (data as PortfolioProjectRow[])
      .filter((item) => !hiddenProjectSlugs.has(item.slug))
      .map(mapProject);
  } catch (error) {
    console.warn("Unable to load Supabase portfolio projects.", error);
    return undefined;
  }
}

export async function fetchPortfolioProjectFromSupabase(slug: string) {
  if (!isSupabaseConfigured) return undefined;
  if (hiddenProjectSlugs.has(slug)) return undefined;

  try {
    const { data, error } = await getSupabaseClient()
      .from("portfolio_projects")
      .select(portfolioSelect)
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    if (!data) return undefined;

    return mapProject(data as PortfolioProjectRow);
  } catch (error) {
    console.warn(`Unable to load Supabase portfolio project: ${slug}.`, error);
    return undefined;
  }
}
