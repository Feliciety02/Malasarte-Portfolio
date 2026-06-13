import { canShowProjectWorkspace } from "../utils/workspaceUtils";
import type { TemplateConfig } from "../types/templates";
import { SnapshotSection } from "../sections/SnapshotSection";
import { WorkspaceSection } from "../sections/WorkspaceSection";
import { FeaturesSection } from "../sections/FeaturesSection";
import { DeliverablesSection } from "../sections/DeliverablesSection";
import { RelatedProjectsSection } from "../sections/RelatedProjectsSection";

export const developmentTemplate: TemplateConfig = {
  key: "development",
  label: "Web Development",
  routeBase: "/works/web-development",
  routeCategory: "web-development",
  accent: "from-sky-400/40 via-cyan-500/20 to-transparent",
  galleryVariant: "grid",
  workspace: "live-preview",
  sections: [
    { id: "snapshot", label: "Snapshot", component: SnapshotSection },
    {
      id: "workspace",
      label: "Workspace",
      component: WorkspaceSection,
      condition: canShowProjectWorkspace,
    },
    {
      id: "features",
      label: "Features",
      component: FeaturesSection,
      condition: (p) => !canShowProjectWorkspace(p),
    },
    { id: "deliverables", label: "Deliverables", component: DeliverablesSection },
    { id: "next", label: "Next", component: RelatedProjectsSection },
  ],
};
