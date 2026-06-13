import type { Project } from "@/data/projects";
import { getProject, getProjectBySlugAndCategory } from "@/data/projects";
import type { RouteCategory } from "../types/templates";
import { isValidRouteCategory } from "../utils/routeUtils";
import { getTemplateByRouteCategory } from "../templates/templateRegistry";

export type RouteLookupResult = {
  project: Project;
  category: RouteCategory;
};

export function getProjectByRoute(category: string, slug: string): RouteLookupResult | undefined {
  if (!isValidRouteCategory(category)) return undefined;

  const template = getTemplateByRouteCategory(category);
  const project = getProject(slug);
  if (!project) return undefined;

  return { project, category: template.routeCategory };
}
