import { accentLastWord } from "@/components/site/HeadingAccent";
import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import { GalleryGrid, FlipbookEmbed } from "./GalleryGrid";
import type { SectionProps } from "../types/templates";

export function ShowcaseSection({ project, sectionNumber, openLightbox }: SectionProps) {
  const isWriting = project.kind === "writing";

  return (
    <SectionAnchor id="showcase">
      <FadeIn>
        <SectionLabel kicker={sectionNumber} label={isWriting ? "Preview" : "Showcase"} />
        <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
          {isWriting ? <>Document <em>preview</em></> : <>Visual <em>showcase</em></>}
        </h2>
      </FadeIn>
      {isWriting && project.flipbookEmbed ? (
        <FlipbookEmbed embed={project.flipbookEmbed} />
      ) : openLightbox ? (
        <GalleryGrid
          project={project}
          openLightbox={openLightbox}
          variant={isWriting ? "documents" : "grid"}
        />
      ) : null}
    </SectionAnchor>
  );
}
