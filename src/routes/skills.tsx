import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Palette, Code2, Sparkles, Briefcase } from "lucide-react";
import { FloatingOrbs, Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Fe Anne Malasarte" },
      { name: "description", content: "Design, tech, creative and work skills of Fe Anne Malasarte." },
      { property: "og:title", content: "Skills — Fe Anne Malasarte" },
      { property: "og:description", content: "An interactive overview of design, tech and creative skills." },
    ],
  }),
  component: Skills,
});

const groups = [
  {
    icon: Palette,
    title: "Design",
    color: "from-fuchsia-500/40 to-pink-500/30",
    items: [
      { name: "UI/UX Design (Figma)", level: 95 },
      { name: "Branding", level: 88 },
      { name: "Logo Design", level: 86 },
      { name: "Social Media Graphics", level: 92 },
      { name: "Publication Materials", level: 90 },
    ],
  },
  {
    icon: Code2,
    title: "Tech",
    color: "from-blue-500/40 to-cyan-500/30",
    items: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 88 },
      { name: "Bootstrap", level: 80 },
      { name: "JavaScript (Basics)", level: 65 },
      { name: "WordPress", level: 78 },
    ],
  },
  {
    icon: Sparkles,
    title: "Creative",
    color: "from-violet-500/40 to-indigo-500/30",
    items: [
      { name: "Typography", level: 92 },
      { name: "Layout Composition", level: 90 },
      { name: "Color Theory", level: 88 },
      { name: "Visual Storytelling", level: 93 },
    ],
  },
  {
    icon: Briefcase,
    title: "Work",
    color: "from-emerald-400/40 to-teal-500/30",
    items: [
      { name: "Virtual Assistance", level: 88 },
      { name: "Content Writing", level: 85 },
      { name: "Social Media Management", level: 87 },
      { name: "File Organization", level: 92 },
    ],
  },
];

function Skills() {
  return (
    <div className="relative px-6 pb-20">
      <section className="relative mx-auto max-w-7xl pt-12">
        <FloatingOrbs />
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Toolkit</span>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
            Skills & <span className="text-gradient">craft</span>
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            A blend of design intuition, technical fluency, and creative discipline — refined across years of real client work.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08}>
              <SkillCard {...g} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

function SkillCard({
  icon: Icon,
  title,
  color,
  items,
}: {
  icon: typeof Palette;
  title: string;
  color: string;
  items: { name: string; level: number }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="group relative overflow-hidden rounded-3xl glass-strong p-8 hover-lift">
      <div className={`pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br ${color} blur-3xl opacity-50 transition-opacity group-hover:opacity-80`} />
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero shadow-glow">
          <Icon size={20} className="text-primary-foreground" />
        </div>
        <h3 className="font-display text-2xl font-bold">{title}</h3>
      </div>

      <ul className="mt-8 space-y-5">
        {items.map((it, i) => (
          <li key={it.name}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium">{it.name}</span>
              <span className="text-xs text-muted-foreground">{it.level}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${it.level}%` } : {}}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                className="h-full rounded-full bg-gradient-hero shadow-glow"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
