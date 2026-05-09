import { motion } from "motion/react";
import { type Project } from "@/data/projects";
import { TagPill } from "@/components/site/TagPill";

type ProjectCardProps = {
  project: Project;
  variant?: "feature" | "grid";
};

export function ProjectCard({ project, variant = "feature" }: ProjectCardProps) {
  if (variant === "grid") {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className="group relative block aspect-[4/4.8] overflow-hidden rounded-3xl glass text-left hover-lift sm:aspect-[4/5]"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} transition-transform duration-700 group-hover:scale-110`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary sm:text-xs">
            {project.tag}
          </span>
          <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.desc}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div whileHover={{ y: -6 }}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass-strong hover-lift">
        <div className="relative aspect-[16/10] overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.color} transition-transform duration-700 group-hover:scale-110`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          <TagPill>{project.cat}</TagPill>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-7">
          <h3 className="font-display text-xl font-bold sm:text-2xl md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">{project.desc}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-border/60 px-3 py-1 text-[11px] text-muted-foreground"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="rounded-full border border-border/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/90">
              Featured Project
            </div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              {project.year}
            </span>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
