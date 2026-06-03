import { motion } from "motion/react";
import brandingCover from "@/assets/work-placeholders/covers-real/branding-cover.webp";
import frontendCover from "@/assets/work-placeholders/covers-real/frontend-cover.webp";
import publicationCover from "@/assets/work-placeholders/covers-real/publication-cover.webp";
import uiuxCover from "@/assets/work-placeholders/covers-real/uiux-cover.webp";
import writingCover from "@/assets/work-placeholders/covers-real/writing-cover.webp";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { TagPill } from "@/components/site/TagPill";
import { type Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

const coverByKind = {
  branding: brandingCover,
  frontend: frontendCover,
  publication: publicationCover,
  uiux: uiuxCover,
  writing: writingCover,
} satisfies Record<Project["kind"], string>;

export function ProjectCard({ project }: ProjectCardProps) {
  const coverImage = coverByKind[project.kind];
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.995 }} className="h-full">
      <CaseStudyLink
        slug={project.slug}
        aria-label={`Open ${project.title} case study`}
        className="metal-card work-card group relative flex h-full flex-col"
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/8">
          <img
            src={coverImage}
            alt={`${project.title} cover`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,12,0.08),rgba(10,11,12,0.03)_42%,rgba(4,5,6,0.24)_100%)]"
          />
          <TagPill>{project.cat}</TagPill>
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-2xl font-semibold leading-tight">{project.title}</h3>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{project.desc}</p>
        </div>
      </CaseStudyLink>
    </motion.div>
  );
}
