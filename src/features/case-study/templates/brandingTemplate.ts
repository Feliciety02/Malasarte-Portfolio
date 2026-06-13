import type { TemplateConfig } from "../types/templates";
import { SnapshotSection } from "../sections/SnapshotSection";
import { IdentitySection } from "../sections/IdentitySection";
import { DeliverablesSection } from "../sections/DeliverablesSection";
import { RelatedProjectsSection } from "../sections/RelatedProjectsSection";

export const brandingTemplate: TemplateConfig = {
  key: "branding",
  label: "Branding",
  routeBase: "/works/branding",
  routeCategory: "branding",
  accent: "from-amber-400/40 via-rose-500/20 to-transparent",
  galleryVariant: "grid",
  workspace: "none",
  sections: [
    { id: "snapshot", label: "Snapshot", component: SnapshotSection },
    { id: "identity", label: "Identity", component: IdentitySection },
    { id: "deliverables", label: "Deliverables", component: DeliverablesSection },
    { id: "next", label: "Next", component: RelatedProjectsSection },
  ],
};
