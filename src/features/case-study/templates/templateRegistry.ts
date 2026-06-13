import type { Project, ProjectKind } from "@/data/projects";
import type { TemplateConfig, RouteCategory } from "../types/templates";
import { uiuxTemplate } from "./uiuxTemplate";
import { developmentTemplate } from "./developmentTemplate";
import { brandingTemplate } from "./brandingTemplate";
import { logoTemplate } from "./logoTemplate";
import { publicationTemplate } from "./publicationTemplate";
import { writingTemplate } from "./writingTemplate";
import { galleryTemplate } from "./galleryTemplate";

export const TEMPLATES: TemplateConfig[] = [
  uiuxTemplate,
  developmentTemplate,
  brandingTemplate,
  logoTemplate,
  publicationTemplate,
  writingTemplate,
  galleryTemplate,
];

export const TEMPLATE_BY_KEY: Record<string, TemplateConfig> = Object.fromEntries(
  TEMPLATES.map((t) => [t.key, t]),
);

export const TEMPLATE_BY_ROUTE_CATEGORY: Record<RouteCategory, TemplateConfig> = Object.fromEntries(
  TEMPLATES.map((t) => [t.routeCategory, t]),
) as Record<RouteCategory, TemplateConfig>;

const KIND_TO_ROUTE_CATEGORY: Record<ProjectKind, RouteCategory | undefined> = {
  uiux: "ui-ux-design",
  frontend: "web-development",
  branding: "branding",
  logo: "logo-design",
  publication: "publication",
  writing: "writing",
  gallery: "gallery",
};

export function getRouteCategoryForProject(project: Project): RouteCategory {
  const fromKind = KIND_TO_ROUTE_CATEGORY[project.kind];
  if (fromKind) return fromKind;
  return "ui-ux-design";
}

export function getTemplateForProject(project: Project): TemplateConfig {
  const routeCategory = getRouteCategoryForProject(project);
  return TEMPLATE_BY_ROUTE_CATEGORY[routeCategory] ?? uiuxTemplate;
}

export function getTemplateByRouteCategory(category: RouteCategory): TemplateConfig {
  return TEMPLATE_BY_ROUTE_CATEGORY[category] ?? uiuxTemplate;
}
