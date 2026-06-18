import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { getProjectCaseStudyContent } from "@/data/projects";
import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import type { SectionProps } from "../types/templates";

function RevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <p ref={ref} className="max-w-4xl font-display text-4xl font-medium italic leading-[1.2] tracking-tight text-white/92 md:text-5xl lg:text-6xl">
      &ldquo;
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: i * 0.025,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.15em]"
        >
          {word}
        </motion.span>
      ))}
      &rdquo;
    </p>
  );
}

export function OverviewSection({ project, sectionNumber }: SectionProps) {
  const caseStudy = getProjectCaseStudyContent(project);

  return (
    <SectionAnchor id="overview">
      <FadeIn>
        <SectionLabel kicker={sectionNumber} label="Overview" />
        <div className="relative mt-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-8 -top-8 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/10 via-transparent to-transparent blur-3xl"
          />
          <RevealText text={caseStudy.overview} />
        </div>
      </FadeIn>
    </SectionAnchor>
  );
}
