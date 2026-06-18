import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import { accentLastWord } from "@/components/site/HeadingAccent";
import type { SectionProps } from "../types/templates";

export function ResearchSection({ project, sectionNumber }: SectionProps) {
  return (
    <SectionAnchor id="research" className="pt-16 md:pt-24">
      <FadeIn>
        <SectionLabel kicker={sectionNumber} label="Research" />
        <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
          {accentLastWord("Research and discovery")}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
          {project.overview}
        </p>
      </FadeIn>
    </SectionAnchor>
  );
}
