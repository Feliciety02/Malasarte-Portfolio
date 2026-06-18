import { useMemo } from "react";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";
import { projects, getProjectCategoryLabel } from "@/data/projects";
import { getProjectCoverImage } from "@/data/projectImages";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { getRouteCategoryForProject } from "@/features/case-study/templates/templateRegistry";
import { TagPill } from "@/components/site/TagPill";
import { SectionAnchor, SectionLabel, FadeIn } from "./-sections";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { getProjectSection } from "./-config";

export function RelatedProjects({ currentProject }: { currentProject: Project }) {
  const section = getProjectSection(currentProject, "next");

  const related = useMemo(() => {
    const others = projects.filter((p) => p.slug !== currentProject.slug);
    const seed = currentProject.slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const sorted = [...others].sort((a, b) => {
      const ha = (a.slug.charCodeAt(0) * seed) % 97;
      const hb = (b.slug.charCodeAt(0) * seed) % 97;
      return ha - hb;
    });
    return sorted.slice(0, 6);
  }, [currentProject.slug]);

  if (related.length === 0) return null;

  return (
    <SectionAnchor id="next" className="pt-24">
      <FadeIn>
        <SectionLabel kicker={section.number} label={section.label} />
        <h2 className="mt-4 font-display text-3xl font-medium leading-tight md:text-5xl">
          Explore other <em>projects</em>
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((project) => (
            <RelatedProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </FadeIn>
    </SectionAnchor>
  );
}

function RelatedProjectCard({ project }: { project: Project }) {
  const coverImage = getProjectCoverImage(project);
  const pill = getProjectCategoryLabel(project, project.cat);

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.995 }} className="h-full">
      <CaseStudyLink
        slug={project.slug}
        routeCategory={getRouteCategoryForProject(project)}
        aria-label={`Open ${project.title} work`}
        className="metal-card work-card group relative flex h-full flex-col"
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/8 bg-gradient-to-br from-white/10 to-white/[0.02]">
          {coverImage ? (
            <img
              src={coverImage}
              alt={`${project.title} preview`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : null}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,12,0.08),rgba(10,11,12,0.03)_42%,rgba(4,5,6,0.24)_100%)]"
          />
          <TagPill>{pill}</TagPill>
        </div>
        <div className="relative z-10 flex flex-1 flex-col p-4 sm:p-6">
          <h3 className="font-display text-xl font-semibold leading-tight sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-[13px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
            {project.desc}
          </p>
        </div>
      </CaseStudyLink>
    </motion.div>
  );
}
