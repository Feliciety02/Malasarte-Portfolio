import { accentLastWord } from "@/components/site/HeadingAccent";
import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import { GalleryGrid } from "./GalleryGrid";
import type { SectionProps } from "../types/templates";
import { canShowProjectWorkspace } from "../utils/workspaceUtils";

export function FeaturesSection({ project, sectionNumber, openLightbox }: SectionProps) {
  if (canShowProjectWorkspace(project)) return null;
  if (project.gallery.length === 0) return null;

  return (
    <SectionAnchor id="features">
      <FadeIn>
        <SectionLabel kicker={sectionNumber} label="Features" />
        <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
          Interface and <em>implementation</em>
        </h2>
      </FadeIn>
      {openLightbox ? (
        <GalleryGrid project={project} openLightbox={openLightbox} variant="stack" />
      ) : null}
    </SectionAnchor>
  );
}
