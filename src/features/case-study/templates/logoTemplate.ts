import type { TemplateConfig } from "../types/templates";
import { SnapshotSection } from "../sections/SnapshotSection";
import { IdentitySection } from "../sections/IdentitySection";
import { DeliverablesSection } from "../sections/DeliverablesSection";
import { RelatedProjectsSection } from "../sections/RelatedProjectsSection";

export const logoTemplate: TemplateConfig = {
  key: "logo",
  label: "Logo Design",
  routeBase: "/works/logo-design",
  routeCategory: "logo-design",
  accent: "from-cyan-400/40 via-teal-500/20 to-transparent",
  galleryVariant: "grid",
  workspace: "none",
  sections: [
    { id: "snapshot", label: "Snapshot", component: SnapshotSection },
    { id: "identity", label: "Identity", component: IdentitySection },
    { id: "deliverables", label: "Deliverables", component: DeliverablesSection },
    { id: "next", label: "Next", component: RelatedProjectsSection },
  ],
};
