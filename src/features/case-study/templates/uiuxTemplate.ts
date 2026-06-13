import type { TemplateConfig } from "../types/templates";
import { SnapshotSection } from "../sections/SnapshotSection";
import { WorkspaceSection } from "../sections/WorkspaceSection";
import { ShowcaseSection } from "../sections/ShowcaseSection";
import { DeliverablesSection } from "../sections/DeliverablesSection";
import { RelatedProjectsSection } from "../sections/RelatedProjectsSection";

export const uiuxTemplate: TemplateConfig = {
  key: "uiux",
  label: "UI/UX Design",
  routeBase: "/works/ui-ux-design",
  routeCategory: "ui-ux-design",
  accent: "from-violet-500/40 via-fuchsia-500/20 to-transparent",
  galleryVariant: "stack",
  workspace: "figma",
  sections: [
    { id: "snapshot", label: "Snapshot", component: SnapshotSection },
    { id: "workspace", label: "Workspace", component: WorkspaceSection },
    { id: "showcase", label: "Showcase", component: ShowcaseSection },
    { id: "deliverables", label: "Deliverables", component: DeliverablesSection },
    { id: "next", label: "Next", component: RelatedProjectsSection },
  ],
};
