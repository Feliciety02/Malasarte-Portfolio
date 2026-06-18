import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { getProjectCategoryLabel } from "@/data/projects";
import { getProjectCoverImage } from "@/data/projectImages";
import { TagPill } from "@/components/site/TagPill";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { getRelatedProjects } from "../utils/relatedProjectsUtils";
import { getRouteCategoryForProject } from "../templates/templateRegistry";
import type { SectionProps } from "../types/templates";

export function RelatedProjectsSection({ project, sectionNumber }: SectionProps) {
  const related = getRelatedProjects(project, 3);
  if (related.length === 0) return null;

  return (
    <SectionAnchor id="next" className="pt-24">
      <FadeIn>
        <SectionLabel kicker={sectionNumber} label="Next" />
        <h2 className="mt-4 font-display text-3xl font-medium leading-tight md:text-5xl">
          {accentLastWord("Explore other projects")}
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <RelatedProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </FadeIn>
    </SectionAnchor>
  );
}

function RelatedProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const coverImage = getProjectCoverImage(project);
  const pill = getProjectCategoryLabel(project, project.cat);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.995 }} className="h-full">
        <CaseStudyLink
          slug={project.slug}
          routeCategory={getRouteCategoryForProject(project)}
          aria-label={`Open ${project.title} work`}
          className="metal-card work-card group relative flex h-full flex-col overflow-hidden"
        >
          <div className="relative aspect-[16/10] overflow-hidden border-b border-white/8 bg-gradient-to-br from-white/10 to-white/[0.02]">
            {coverImage ? (
              <img
                src={coverImage}
                alt={`${project.title} preview`}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.05] group-hover:brightness-110"
                loading="lazy"
              />
            ) : null}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,12,0.08),rgba(10,11,12,0.03)_42%,rgba(4,5,6,0.24)_100%)]" />
            <TagPill>{pill}</TagPill>
          </div>
          <div className="relative z-10 flex flex-1 flex-col p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold leading-tight sm:text-2xl">
                {project.title}
              </h3>
              <ArrowUpRight
                size={16}
                className="shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
              />
            </div>
            <p className="mt-3 line-clamp-2 text-[13px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
              {project.desc}
            </p>
          </div>
        </CaseStudyLink>
      </motion.div>
    </motion.div>
  );
}
