import type { TemplateConfig } from "../types/templates";
import { SnapshotSection } from "../sections/SnapshotSection";
import { ShowcaseSection } from "../sections/ShowcaseSection";
import { DeliverablesSection } from "../sections/DeliverablesSection";
import { RelatedProjectsSection } from "../sections/RelatedProjectsSection";

export const publicationTemplate: TemplateConfig = {
  key: "creative",
  label: "Publication",
  routeBase: "/works/publication",
  routeCategory: "publication",
  accent: "from-fuchsia-500/40 via-pink-500/20 to-transparent",
  galleryVariant: "masonry",
  workspace: "none",
  sections: [
    { id: "snapshot", label: "Snapshot", component: SnapshotSection },
    { id: "assets", label: "Assets", component: ShowcaseSection },
    { id: "deliverables", label: "Deliverables", component: DeliverablesSection },
    { id: "next", label: "Next", component: RelatedProjectsSection },
  ],
};
