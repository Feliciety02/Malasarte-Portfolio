import { motion } from "motion/react";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { TagPill } from "@/components/site/TagPill";
import { getProjectCoverImage } from "@/data/projectImages";
import {
  getProjectCategoryLabel,
  getProjectDisplayTitle,
  type Project,
  type ProjectFilter,
} from "@/data/projects";
import { getRouteCategoryForProject } from "@/features/case-study/templates/templateRegistry";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  activeCategory?: ProjectFilter;
  imageFit?: "contain" | "cover";
};

export function ProjectCard({ project, activeCategory = project.cat, imageFit = "contain" }: ProjectCardProps) {
  const coverImage = getProjectCoverImage(project);
  const title = getProjectDisplayTitle(project, activeCategory);
  const pill = getProjectCategoryLabel(project, activeCategory);

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.995 }} className="h-full">
      <CaseStudyLink
        slug={project.slug}
        routeCategory={getRouteCategoryForProject(project)}
        aria-label={`Open ${title} work`}
        className="group relative flex h-full flex-col"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-white/[0.06] to-white/[0.01]">
          {coverImage ? (
            <img
              src={coverImage}
              alt={`${title} cover`}
              className={cn(
                "absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.02]",
                imageFit === "cover" ? "object-cover" : "object-contain p-2",
              )}
              loading="lazy"
            />
          ) : null}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"
          />
          <TagPill>{pill}</TagPill>
        </div>

        <div className="flex flex-1 flex-col px-1 pt-4">
          <h3 className="font-display text-lg font-medium leading-tight sm:text-xl">{title}</h3>
          <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
            {project.desc}
          </p>
        </div>
      </CaseStudyLink>
    </motion.div>
  );
}
