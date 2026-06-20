import type { ComponentType } from "react";
import type { Project } from "@/data/projects";

export type RouteCategory =
  | "web-development"
  | "ui-ux-design"
  | "branding"
  | "logo-design"
  | "publication"
  | "writing"
  | "gallery";

export const ROUTE_CATEGORIES: RouteCategory[] = [
  "web-development",
  "ui-ux-design",
  "branding",
  "logo-design",
  "publication",
  "writing",
  "gallery",
];

export const ROUTE_CATEGORY_LABELS: Record<RouteCategory, string> = {
  "web-development": "Software Development",
  "ui-ux-design": "UI/UX Design",
  branding: "Branding",
  "logo-design": "Logo Design",
  publication: "Publication",
  writing: "Writing",
  gallery: "Gallery",
};

export type WorkspaceVariant = "figma" | "live-preview" | "none";

export type TemplateConfig = {
  key: string;
  label: string;
  routeBase: string;
  routeCategory: RouteCategory;
  accent: string;
  galleryVariant: "grid" | "masonry" | "stack" | "documents";
  workspace: WorkspaceVariant;
  sections: SectionComponentDef[];
};

export type SectionComponentDef = {
  id: string;
  label: string;
  component: ComponentType<SectionProps>;
  condition?: (project: Project) => boolean;
};

export type SectionProps = {
  project: Project;
  sectionNumber: string;
  openLightbox?: (index: number) => void;
};
