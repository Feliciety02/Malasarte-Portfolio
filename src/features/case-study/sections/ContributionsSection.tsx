import { useState } from "react";
import { motion } from "motion/react";
import { getProjectCaseStudyContent } from "@/data/projects";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import { cn } from "@/lib/utils";
import type { SectionProps } from "../types/templates";

export function ContributionsSection({ project, sectionNumber }: SectionProps) {
  const caseStudy = getProjectCaseStudyContent(project);
  const contributions = caseStudy.contributions;
  if (contributions.length === 0) return null;

  const descriptionMap = Object.fromEntries(
    project.focusAreas.map((fa) => [fa.title, fa.text]),
  );

  return (
    <SectionAnchor id="contributions">
      <FadeIn>
        <SectionLabel kicker={sectionNumber} label="Contributions" />
        <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
          {accentLastWord("What I owned")}
        </h2>
      </FadeIn>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {contributions.map((contribution, i) => {
          const description = descriptionMap[contribution];
          return (
            <ContributionCard
              key={contribution}
              title={contribution}
              description={description}
              index={i}
            />
          );
        })}
      </div>
    </SectionAnchor>
  );
}

function ContributionCard({
  title,
  description,
  index,
}: {
  title: string;
  description?: string;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative cursor-default rounded-xl border p-5 transition-all duration-500",
        isHovered
          ? "border-primary/20 bg-primary/[0.04]"
          : "border-white/[0.04] bg-white/[0.015]",
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "h-2 w-2 rounded-full transition-all duration-500",
            isHovered ? "bg-primary scale-125" : "bg-white/20",
          )}
        />
        <p
          className={cn(
            "text-base font-medium transition-all duration-500",
            isHovered ? "text-white" : "text-white/60",
          )}
        >
          {title}
        </p>
      </div>
      {description && (
        <motion.p
          initial={{ height: 0, opacity: 0 }}
          animate={
            isHovered
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden text-sm leading-6 text-muted-foreground"
        >
          <span className="block pt-3">{description}</span>
        </motion.p>
      )}
    </motion.div>
  );
}
