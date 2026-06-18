import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { SectionAnchor, SectionLabel, FadeIn } from "../sections/SectionWrappers";
import { GalleryGrid } from "../sections/GalleryGrid";

export function LivePreviewWorkspace({
  project,
  openLightbox,
}: {
  project: Project;
  openLightbox: (i: number) => void;
}) {
  const items = project.gallery;
  if (items.length === 0) return null;

  return (
    <SectionAnchor id="workspace" className="pt-16 md:pt-24">
      <FadeIn>
        <SectionLabel kicker="02" label="Photo Gallery" />
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-medium leading-tight md:text-4xl">
              {accentLastWord("Walkthrough the screenshots")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              The live build for {project.title} is private or not yet deployed. Browse curated
              screenshots of the build to see how the interface works end-to-end.
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <GalleryGrid project={project} openLightbox={openLightbox} />
      </FadeIn>
    </SectionAnchor>
  );
}
