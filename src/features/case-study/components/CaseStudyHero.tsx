import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Project } from "@/data/projects";
import { TagPill } from "@/components/site/TagPill";
import { cn } from "@/lib/utils";

const PROJECT_HERO_THEMES: Record<string, { glow: string; dot: string }> = {
  "odara-management-group": {
    glow: "from-yellow-300/45 via-slate-500/20 to-transparent",
    dot: "bg-gradient-to-br from-yellow-300 to-slate-600",
  },
  "lian-monley": {
    glow: "from-blue-500/40 via-sky-300/20 to-transparent",
    dot: "bg-gradient-to-br from-blue-400 to-sky-200",
  },
  "pietyl-lpg": {
    glow: "from-teal-400/45 via-cyan-500/20 to-transparent",
    dot: "bg-gradient-to-br from-teal-300 to-cyan-600",
  },
  "blue-collar-builders": {
    glow: "from-indigo-500/45 via-sky-400/20 to-transparent",
    dot: "bg-gradient-to-br from-indigo-400 to-sky-400",
  },
  "trichomend-plus": {
    glow: "from-emerald-500/45 via-lime-400/20 to-transparent",
    dot: "bg-gradient-to-br from-emerald-500 to-lime-300",
  },
  adoptify: {
    glow: "from-violet-500/45 via-sky-400/20 to-transparent",
    dot: "bg-gradient-to-br from-violet-400 to-sky-400",
  },
  "pietyl-management-system": {
    glow: "from-teal-400/45 via-cyan-500/20 to-transparent",
    dot: "bg-gradient-to-br from-teal-300 to-cyan-600",
  },
  "dost-laon": {
    glow: "from-blue-500/45 via-cyan-400/20 to-transparent",
    dot: "bg-gradient-to-br from-blue-500 to-cyan-300",
  },
  "cosmic-remedies-by-sia": {
    glow: "from-amber-300/45 via-orange-700/20 to-transparent",
    dot: "bg-gradient-to-br from-amber-300 to-orange-700",
  },
  umunity: {
    glow: "from-rose-900/65 via-red-950/35 to-amber-400/10",
    dot: "bg-gradient-to-br from-amber-300 to-red-700",
  },
  "umunity-logo": {
    glow: "from-rose-900/65 via-red-950/35 to-amber-400/10",
    dot: "bg-gradient-to-br from-amber-300 to-red-700",
  },
};

function getProjectHeroTheme(project: Project) {
  return (
    PROJECT_HERO_THEMES[project.slug] ?? {
      glow: project.color,
      dot: cn("bg-gradient-to-br", project.color),
    }
  );
}

export function CaseStudyHero({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const theme = getProjectHeroTheme(project);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden border-b border-white/8">
      <motion.div
        aria-hidden
        style={prefersReducedMotion ? undefined : { y: glowY, opacity }}
        className={cn(
          "pointer-events-none absolute -top-32 left-1/2 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl bg-gradient-to-b",
          theme.glow,
        )}
      />
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-24 md:pb-28 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center"
        >
          <TagPill className="static" dotClassName={theme.dot}>
            {project.cat}
          </TagPill>
        </motion.div>

        <motion.h1
          style={prefersReducedMotion ? undefined : { y: titleY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-8 max-w-5xl font-display text-3xl font-bold leading-[1.06] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        >
          {project.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg"
        >
          {project.desc}
        </motion.p>
      </div>
    </section>
  );
}
