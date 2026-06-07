import type { Project, ProjectKind } from "@/data/projects";

export type TemplateKey = "product" | "development" | "branding" | "creative" | "gallery" | "writing" | "logo";

const KIND_TO_TEMPLATE: Record<ProjectKind, TemplateKey> = {
  uiux: "product",
  frontend: "development",
  branding: "branding",
  publication: "creative",
  gallery: "gallery",
  writing: "writing",
  logo: "logo",
};

export type TemplateMeta = {
  accent: string;
};

export const TEMPLATE_META: Record<TemplateKey, TemplateMeta> = {
  product: {
    accent: "from-violet-500/40 via-fuchsia-500/20 to-transparent",
  },
  development: {
    accent: "from-sky-400/40 via-cyan-500/20 to-transparent",
  },
  branding: {
    accent: "from-amber-400/40 via-rose-500/20 to-transparent",
  },
  creative: {
    accent: "from-fuchsia-500/40 via-pink-500/20 to-transparent",
  },
  gallery: {
    accent: "from-fuchsia-500/40 via-cyan-500/20 to-transparent",
  },
  writing: {
    accent: "from-emerald-400/35 via-teal-500/15 to-transparent",
  },
  logo: {
    accent: "from-cyan-400/40 via-teal-500/20 to-transparent",
  },
};

export type SectionDef = { id: string; label: string };

const TEMPLATE_SECTIONS: Record<TemplateKey, SectionDef[]> = {
  product: [
    { id: "snapshot", label: "Snapshot" },
    { id: "workspace", label: "Workspace" },
    { id: "problem", label: "Problem" },
    { id: "goals", label: "Goals" },
    { id: "process", label: "Process" },
    { id: "decisions", label: "Decisions" },
    { id: "showcase", label: "Showcase" },
    { id: "challenges", label: "Challenges" },
    { id: "results", label: "Results" },
    { id: "reflection", label: "Reflection" },
    { id: "next", label: "Next" },
  ],
  development: [
    { id: "snapshot", label: "Snapshot" },
    { id: "workspace", label: "Workspace" },
    { id: "problem", label: "Problem" },
    { id: "stack", label: "Stack" },
    { id: "architecture", label: "Architecture" },
    { id: "process", label: "Build" },
    { id: "challenges", label: "Challenges" },
    { id: "features", label: "Features" },
    { id: "results", label: "Performance" },
    { id: "reflection", label: "Reflection" },
    { id: "next", label: "Next" },
  ],
  branding: [
    { id: "snapshot", label: "Snapshot" },
    { id: "workspace", label: "Workspace" },
    { id: "story", label: "Story" },
    { id: "strategy", label: "Strategy" },
    { id: "research", label: "Research" },
    { id: "identity", label: "Identity" },
    { id: "deliverables", label: "Deliverables" },
    { id: "process", label: "Process" },
    { id: "challenges", label: "Challenges" },
    { id: "results", label: "Impact" },
    { id: "reflection", label: "Reflection" },
    { id: "next", label: "Next" },
  ],
  creative: [
    { id: "snapshot", label: "Snapshot" },
    { id: "workspace", label: "Workspace" },
    { id: "overview", label: "Campaign" },
    { id: "direction", label: "Direction" },
    { id: "assets", label: "Assets" },
    { id: "rollout", label: "Rollout" },
    { id: "challenges", label: "Challenges" },
    { id: "results", label: "Results" },
    { id: "reflection", label: "Reflection" },
    { id: "next", label: "Next" },
  ],
  gallery: [{ id: "showcase", label: "Gallery" }],
  logo: [
    { id: "snapshot", label: "Snapshot" },
    { id: "challenge", label: "Challenge" },
    { id: "strategy", label: "Strategy" },
    { id: "identity", label: "Identity" },
    { id: "impact", label: "Impact" },
    { id: "next", label: "Next" },
  ],
  writing: [
    { id: "snapshot", label: "Snapshot" },
    { id: "workspace", label: "Workspace" },
    { id: "overview", label: "Overview" },
    { id: "goals", label: "Goals" },
    { id: "process", label: "Workflow" },
    { id: "deliverables", label: "Deliverables" },
    { id: "focus", label: "Focus" },
    { id: "challenges", label: "Challenges" },
    { id: "results", label: "Outcome" },
    { id: "reflection", label: "Reflection" },
    { id: "next", label: "Next" },
  ],
};

export const getProjectTemplate = (project: Pick<Project, "kind">) =>
  KIND_TO_TEMPLATE[project.kind] ?? "product";

export const WORKSPACE_PROJECT_CATEGORIES: Project["cat"][] = ["UI/UX Design", "Web Development"];

export const canShowProjectWorkspace = (project: Pick<Project, "cat" | "categories">) =>
  WORKSPACE_PROJECT_CATEGORIES.includes(project.cat) ||
  project.categories?.some((category) => WORKSPACE_PROJECT_CATEGORIES.includes(category)) === true;

export const getProjectSections = (project: Pick<Project, "kind" | "cat" | "categories">) => {
  const sections = TEMPLATE_SECTIONS[getProjectTemplate(project)];

  if (canShowProjectWorkspace(project)) return sections;

  return sections.filter((section) => section.id !== "workspace");
};

export type ProjectSectionMeta = SectionDef & { number: string };

export const getProjectSection = (
  project: Pick<Project, "kind" | "cat" | "categories">,
  id: string,
): ProjectSectionMeta => {
  const sections = getProjectSections(project);
  const index = sections.findIndex((section) => section.id === id);
  return {
    id,
    label: index >= 0 ? sections[index].label : "",
    number: index >= 0 ? String(index + 1).padStart(2, "0") : "",
  };
};

export type WorkspaceTabId = "live" | "design";

export type WorkspaceTab = {
  id: WorkspaceTabId;
  label: string;
  title: string;
  note?: string;
  src: string;
  externalUrl: string;
  allow: string;
  minWidthClassName: string;
};

export type BodyProps = { project: Project; openLightbox: (i: number) => void };
export type StructuredBodyProps = BodyProps & {
  sectionMeta: (id: string) => ProjectSectionMeta;
};
