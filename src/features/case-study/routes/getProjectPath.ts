import type { Project } from "@/data/projects";
import type { RouteCategory } from "../types/templates";
import { getRouteCategoryForProject } from "../templates/templateRegistry";

export function getProjectPath(project: Project): string {
  const category = getRouteCategoryForProject(project);
  return `/works/${category}/${project.slug}`;
}

export function getProjectPathFromCategory(slug: string, category: RouteCategory): string {
  return `/works/${category}/${slug}`;
}
