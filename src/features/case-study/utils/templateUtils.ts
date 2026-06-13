import type { Project } from "@/data/projects";
import type { SectionComponentDef, TemplateConfig } from "../types/templates";
import { getTemplateForProject, getTemplateByRouteCategory } from "../templates/templateRegistry";
import type { RouteCategory } from "../types/templates";

export function getProjectTemplate(project: Project): TemplateConfig {
  return getTemplateForProject(project);
}

export function getSectionsForProject(
  project: Project,
  template?: TemplateConfig,
): SectionComponentDef[] {
  const tpl = template ?? getProjectTemplate(project);
  return tpl.sections.filter((section) => {
    if (!section.condition) return true;
    return section.condition(project);
  });
}

export function getTemplateByCategory(category: RouteCategory): TemplateConfig {
  return getTemplateByRouteCategory(category);
}
