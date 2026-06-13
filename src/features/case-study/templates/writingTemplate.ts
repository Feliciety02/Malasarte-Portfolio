import type { TemplateConfig } from "../types/templates";
import { SnapshotSection } from "../sections/SnapshotSection";
import { ShowcaseSection } from "../sections/ShowcaseSection";
import { DeliverablesSection } from "../sections/DeliverablesSection";
import { RelatedProjectsSection } from "../sections/RelatedProjectsSection";

export const writingTemplate: TemplateConfig = {
  key: "writing",
  label: "Writing",
  routeBase: "/works/writing",
  routeCategory: "writing",
  accent: "from-emerald-400/35 via-teal-500/15 to-transparent",
  galleryVariant: "documents",
  workspace: "none",
  sections: [
    { id: "snapshot", label: "Snapshot", component: SnapshotSection },
    { id: "showcase", label: "Preview", component: ShowcaseSection },
    { id: "deliverables", label: "Deliverables", component: DeliverablesSection },
    { id: "next", label: "Next", component: RelatedProjectsSection },
  ],
};
