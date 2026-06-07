import { motion } from "motion/react";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { TagPill } from "@/components/site/TagPill";
import { getProjectCoverImage } from "@/data/projectImages";
import {
  getProjectCategoryLabel,
  getProjectDisplayTitle,
  type Project,
  type ProjectCategory,
  type ProjectFilter,
} from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  activeCategory?: ProjectFilter;
};

export function ProjectCard({ project, activeCategory = project.cat }: ProjectCardProps) {
  const coverImage = getProjectCoverImage(project);
  const title = getProjectDisplayTitle(project, activeCategory);
  const pill = getProjectCategoryLabel(project, activeCategory);

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.995 }} className="h-full">
      <CaseStudyLink
        slug={project.slug}
        category={activeCategory === "All" ? undefined : activeCategory}
        aria-label={`Open ${title} work`}
        className="metal-card work-card group relative flex h-full flex-col"
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/8 bg-gradient-to-br from-white/10 to-white/[0.02]">
          {coverImage ? (
            <img
              src={coverImage}
              alt={`${title} cover`}
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
          <h3 className="font-display text-xl font-semibold leading-tight sm:text-2xl">{title}</h3>

          <p className="mt-3 line-clamp-2 text-[13px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
            {project.desc}
          </p>
        </div>
      </CaseStudyLink>
    </motion.div>
  );
}
