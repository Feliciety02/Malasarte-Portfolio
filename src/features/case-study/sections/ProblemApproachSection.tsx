import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  getProjectCaseStudyProblem,
  getProjectCaseStudyApproach,
} from "@/data/projects";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import type { SectionProps } from "../types/templates";

export function ProblemApproachSection({ project, sectionNumber }: SectionProps) {
  const problem = getProjectCaseStudyProblem(project);
  const approach = getProjectCaseStudyApproach(project);

  const decisions =
    project.caseStudy?.modules?.filter(Boolean).slice(0, 4) ??
    project.focusAreas.slice(0, 4).map((fa) => ({ title: fa.title, desc: fa.text }));

  return (
    <SectionAnchor id="problem">
      <FadeIn>
        <SectionLabel kicker={sectionNumber} label="Problem / Approach" />
        <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
          {accentLastWord("From problem to solution")}
        </h2>
      </FadeIn>

      <div className="relative mt-14 md:mt-20">
        <div className="relative grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <ConnectorLine />

          {/* Challenge */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-red-400/60">
              The Challenge
            </span>
            <div className="mt-5 h-px w-12 bg-red-400/20" />
            <p className="mt-6 font-display text-2xl italic leading-relaxed text-white/85 md:text-3xl md:leading-[1.5]">
              {problem}
            </p>
          </motion.div>

          {/* Response */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary/60">
              The Response
            </span>
            <div className="mt-5 h-px w-12 bg-primary/20" />
            <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg md:leading-9">
              {approach}
            </p>

            {/* Design Decisions */}
            {decisions.length > 0 && (
              <div className="mt-10 border-t border-white/[0.04] pt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
                  Design Decisions
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {decisions.map((d, i) => (
                    <DecisionItem key={d.title} title={d.title} index={i} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </SectionAnchor>
  );
}

function ConnectorLine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block"
    >
      <motion.div
        className="mx-auto w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
        initial={{ height: 0, opacity: 0 }}
        animate={inView ? { height: "100%", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-primary/40 bg-primary/10"
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function DecisionItem({ title, index }: { title: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{
        duration: 0.5,
        delay: 0.4 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-3 transition-colors duration-300 hover:border-primary/15 hover:bg-primary/[0.04]"
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
      <span className="text-sm font-medium text-white/65">{title}</span>
    </motion.div>
  );
}
