import type { TemplateConfig } from "../types/templates";
import { ShowcaseSection } from "../sections/ShowcaseSection";
import { DeliverablesSection } from "../sections/DeliverablesSection";

export const galleryTemplate: TemplateConfig = {
  key: "gallery",
  label: "Gallery",
  routeBase: "/works/gallery",
  routeCategory: "gallery",
  accent: "from-fuchsia-500/40 via-cyan-500/20 to-transparent",
  galleryVariant: "masonry",
  workspace: "none",
  sections: [
    { id: "showcase", label: "Gallery", component: ShowcaseSection },
    { id: "deliverables", label: "Deliverables", component: DeliverablesSection },
  ],
};
