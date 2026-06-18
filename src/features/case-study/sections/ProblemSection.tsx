import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { FocusGrid } from "./blocks/FocusGrid";
import type { SectionProps } from "../types/templates";

export function ProblemSection({ project, sectionNumber }: SectionProps) {
  if (project.challenges.length === 0) return null;
  return (
    <SectionAnchor id="problem" className="pt-16 md:pt-24">
      <FadeIn>
        <SectionLabel kicker={sectionNumber} label="Problem" />
        <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
          Challenges and <em>context</em>
        </h2>
      </FadeIn>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {project.challenges.map((c, i) => (
          <div key={c.title} className="metal-card h-full p-6">
            <h3 className="font-display text-xl font-semibold">{c.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{c.challenge}</p>
            <div className="mt-5 rounded-xl border border-primary/25 bg-primary/[0.06] p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary">Solution</p>
              <p className="mt-2 text-sm leading-7 text-white/85">{c.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionAnchor>
  );
}
