import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Box } from "lucide-react";
import { getProjectCaseStudyContent } from "@/data/projects";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import { useCountUp } from "@/hooks/useCountUp";
import type { SectionProps } from "../types/templates";

function MetricValue({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const num = parseInt(value, 10);
  const hasPlus = value.endsWith("+");
  const count = useCountUp(num, { duration: 2000, enabled: inView && !isNaN(num) });

  return (
    <div ref={ref}>
      <div className="editorial-metric">
        {!isNaN(num) ? (
          <>
            {count}
            {hasPlus ? "+" : ""}
          </>
        ) : (
          value
        )}
      </div>
      <p className="editorial-metric-label">{label}</p>
    </div>
  );
}

export function OutcomesSection({ project, sectionNumber }: SectionProps) {
  const caseStudy = getProjectCaseStudyContent(project);
  const outcomes = caseStudy.outcomes;

  return (
    <SectionAnchor id="outcomes">
      <FadeIn>
        <SectionLabel kicker={sectionNumber} label="Outcomes" />
        <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
          {accentLastWord("Project Outcomes")}
        </h2>
      </FadeIn>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
        {outcomes.map((item, index) => (
          <FadeIn key={item.label} delay={index * 0.04}>
            <MetricValue value={item.value} label={item.label} />
          </FadeIn>
        ))}
      </div>

      {project.tools.length > 0 ? (
        <FadeIn delay={0.12}>
          <div className="mt-14 border-t border-white/[0.04] pt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">
              Built With
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {project.tools.map((tool) => (
                <motion.span
                  key={tool}
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="inline-flex cursor-default items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-5 py-2.5 text-sm text-white/70 backdrop-blur-sm transition-colors duration-300 hover:border-primary/25 hover:bg-primary/[0.07] hover:text-white"
                >
                  <Box size={14} className="text-primary/60" />
                  {tool}
                </motion.span>
              ))}
            </div>
          </div>
        </FadeIn>
      ) : null}
    </SectionAnchor>
  );
}
