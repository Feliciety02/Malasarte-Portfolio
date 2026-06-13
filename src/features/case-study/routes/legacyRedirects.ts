import type { ProjectCategory, ProjectKind } from "@/data/projects";
import { getProject } from "@/data/projects";
import type { RouteCategory } from "../types/templates";

const SLUG_TO_ROUTE: Record<string, RouteCategory> = {};

const KIND_ROUTE: Record<ProjectKind, RouteCategory> = {
  uiux: "ui-ux-design",
  frontend: "web-development",
  branding: "branding",
  logo: "logo-design",
  publication: "publication",
  writing: "writing",
  gallery: "gallery",
};

export function getLegacyRedirect(slug: string): string | undefined {
  const project = getProject(slug);
  if (!project) return undefined;

  const routeCategory = KIND_ROUTE[project.kind] ?? "ui-ux-design";
  return `/works/${routeCategory}/${slug}`;
}
