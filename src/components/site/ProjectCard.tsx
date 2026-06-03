import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { TagPill } from "@/components/site/TagPill";
import { type Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  variant?: "feature" | "grid";
};

export function ProjectCard({ project, variant = "feature" }: ProjectCardProps) {
  if (variant === "grid") {
    return (
      <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.995 }} className="h-full">
        <CaseStudyLink
          slug={project.slug}
          aria-label={`Open ${project.title} case study`}
          className="metal-card group relative flex aspect-[4/4.85] h-full flex-col justify-between p-5 text-left sm:p-6"
        >
          <div
            aria-hidden
            className="absolute inset-x-5 top-5 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent"
          />
          <div
            aria-hidden
            className="absolute bottom-0 right-0 h-32 w-32 border-l border-t border-white/8 bg-white/[0.018]"
          />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <span className="metal-kicker">{project.tag}</span>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight">
                {project.title}
              </h3>
            </div>
            <div className="metal-icon h-10 w-10 shrink-0 text-primary opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100">
              <ArrowUpRight size={16} />
            </div>
          </div>

          <div className="relative z-10">
            <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{project.desc}</p>
            <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
              <span className="text-xs uppercase tracking-[0.16em] text-white/45">
                {project.cat}
              </span>
              <span className="text-xs font-medium text-white/70">{project.year}</span>
            </div>
          </div>
        </CaseStudyLink>
      </motion.div>
    );
  }

  return (
    <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.995 }} className="h-full">
      <CaseStudyLink
        slug={project.slug}
        aria-label={`Open ${project.title} case study`}
        className="metal-card group relative flex h-full flex-col"
      >
        <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10">
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.13),rgba(255,255,255,0.025)_34%,rgba(0,0,0,0.42)_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-6 border border-white/10 bg-black/12"
          />
          <div
            aria-hidden
            className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-white/24 to-transparent"
          />
          <TagPill>{project.cat}</TagPill>
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-white/44">
              {project.year}
            </span>
            <span className="text-xs text-white/56">{project.client}</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6 md:p-7">
          <span className="metal-kicker">{project.tag}</span>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-tight md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{project.desc}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="pointer-events-none rounded-full border border-white/12 bg-white/[0.035] px-3 py-1 text-[11px] text-white/62"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-col items-start gap-3 pt-7 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary transition-colors group-hover:text-foreground">
              View case study <ArrowRight size={12} />
            </div>
            <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {project.role}
            </span>
          </div>
        </div>
      </CaseStudyLink>
    </motion.div>
  );
}
