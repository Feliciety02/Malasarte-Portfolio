import { accentLastWord } from "@/components/site/HeadingAccent";
import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import { GalleryGrid, FlipbookEmbed } from "./GalleryGrid";
import type { SectionProps } from "../types/templates";

export function ShowcaseSection({ project, sectionNumber, openLightbox }: SectionProps) {
  const isWriting = project.kind === "writing";
  const isBranding = project.kind === "branding";

  let variant: "grid" | "masonry" | "stack" | "documents" | "bento" = "grid";
  if (isWriting) {
    variant = "documents";
  } else if (isBranding) {
    variant = "bento";
  }

  return (
    <SectionAnchor id="showcase">
      <FadeIn>
        <SectionLabel kicker={sectionNumber} label={isWriting ? "Preview" : "Showcase"} />
        <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
          {accentLastWord(isWriting ? "Document preview" : "Visual showcase")}
        </h2>
      </FadeIn>
      {isWriting && project.flipbookEmbed ? (
        <FlipbookEmbed embed={project.flipbookEmbed} />
      ) : openLightbox ? (
        <GalleryGrid project={project} openLightbox={openLightbox} variant={variant} />
      ) : null}
    </SectionAnchor>
  );
}
