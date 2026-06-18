import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { ProcessTimeline } from "./blocks/ProcessTimeline";
import type { SectionProps } from "../types/templates";

export function ProcessSection({ project, sectionNumber }: SectionProps) {
  if (!project.process?.length) return null;
  return (
    <SectionAnchor id="process" className="pt-16 md:pt-24">
      <FadeIn>
        <SectionLabel kicker={sectionNumber} label="Process" />
        <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
          Design and development <em>process</em>
        </h2>
      </FadeIn>
      <ProcessTimeline steps={project.process} />
    </SectionAnchor>
  );
}
