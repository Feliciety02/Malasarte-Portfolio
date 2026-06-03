import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import brandingCover from "@/assets/work-placeholders/covers-real/branding-cover.webp";
import frontendCover from "@/assets/work-placeholders/covers-real/frontend-cover.webp";
import publicationCover from "@/assets/work-placeholders/covers-real/publication-cover.webp";
import uiuxCover from "@/assets/work-placeholders/covers-real/uiux-cover.webp";
import writingCover from "@/assets/work-placeholders/covers-real/writing-cover.webp";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
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
    <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.995 }} className="h-full">
      <CaseStudyLink
        slug={project.slug}
        aria-label={`Open ${project.title} case study`}
        className="metal-card work-card group relative flex h-full flex-col"
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/8">
          <img
            src={coverImage}
            alt={`${project.title} placeholder cover`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,12,0.03),rgba(10,11,12,0.14)_46%,rgba(4,5,6,0.78)_100%)]"
          />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
            <span className="metal-kicker">{project.tag}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
              {project.year}
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-[0.16em] text-white/42">
                {project.cat}
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight">
                {project.title}
              </h3>
            </div>
            <div className="metal-icon h-10 w-10 shrink-0 opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100">
              <ArrowUpRight size={16} />
            </div>
          </div>

          <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">{project.desc}</p>

          <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/8 pt-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary transition-colors group-hover:text-foreground">
              View case study <ArrowRight size={12} />
            </div>
            <span className="text-xs text-white/58">{project.client}</span>
          </div>
        </div>
      </CaseStudyLink>
    </motion.div>
  );
}
