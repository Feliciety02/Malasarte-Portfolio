import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { type Project } from "@/data/projects";
import { TagPill } from "@/components/site/TagPill";

type ProjectCardProps = {
  project: Project;
  variant?: "feature" | "grid";
};

export function ProjectCard({ project, variant = "feature" }: ProjectCardProps) {
  if (variant === "grid") {
    return (
      <Link
        to="/works/$slug"
        params={{ slug: project.slug }}
        className="group relative block aspect-[4/5] overflow-hidden rounded-3xl glass text-left hover-lift"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} transition-transform duration-700 group-hover:scale-110`} />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
        <div className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full glass-strong opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-primary">{project.tag}</span>
          <h3 className="mt-2 font-display text-2xl font-bold">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.desc}</p>
        </div>
      </Link>
    );
  }

  return (
    <motion.div whileHover={{ y: -6 }}>
      <Link
        to="/works/$slug"
        params={{ slug: project.slug }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass-strong hover-lift"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} transition-transform duration-700 group-hover:scale-110`} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          <TagPill>{project.cat}</TagPill>
        </div>

        <div className="flex flex-1 flex-col p-7">
          <h3 className="font-display text-2xl font-bold md:text-3xl">{project.title}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{project.desc}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span key={tool} className="rounded-full border border-border/60 px-3 py-1 text-[11px] text-muted-foreground">
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 pt-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-hero px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-glow transition-transform group-hover:scale-105">
              View Case Study <ArrowRight size={12} />
            </div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">{project.year}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
