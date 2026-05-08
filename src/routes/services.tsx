import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Layers, PenTool, Megaphone, FileText, Globe, Sparkles, Check } from "lucide-react";
import { FloatingOrbs, Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Fe Anne Malasarte" },
      { name: "description", content: "Design services: UI/UX, branding, publication, web design, content & VA support." },
      { property: "og:title", content: "Services — Fe Anne Malasarte" },
      { property: "og:description", content: "How I can help — from product design to brand systems and content." },
    ],
  }),
  component: Services,
});

const services = [
  {
    icon: Layers,
    title: "UI/UX Design",
    color: "from-violet-500/40 to-fuchsia-500/30",
    desc: "End-to-end product design — from research and wireframes to polished, accessible interfaces.",
    bullets: ["Mobile & web apps", "Design systems", "Prototyping in Figma"],
  },
  {
    icon: PenTool,
    title: "Branding & Logo",
    color: "from-pink-500/40 to-rose-500/30",
    desc: "Identity systems with personality — logos, color, type, and brand boards that carry across touchpoints.",
    bullets: ["Logo systems", "Brand guidelines", "Applied mockups"],
  },
  {
    icon: Megaphone,
    title: "Publication & Pubmats",
    color: "from-amber-400/40 to-orange-500/30",
    desc: "Editorial layouts, social campaigns, and pubmats designed around a cohesive visual story.",
    bullets: ["Editorial spreads", "Social campaigns", "Story templates"],
  },
  {
    icon: Globe,
    title: "Web Design",
    color: "from-cyan-400/40 to-blue-500/30",
    desc: "Responsive marketing sites and landing pages with motion, narrative, and crisp handoff.",
    bullets: ["Landing pages", "Marketing sites", "Framer / dev specs"],
  },
  {
    icon: FileText,
    title: "Content Writing",
    color: "from-purple-500/40 to-indigo-500/30",
    desc: "Captions, blogs, and tone-of-voice guides that sound like you — only sharper.",
    bullets: ["Long-form articles", "Caption frameworks", "Voice guides"],
  },
  {
    icon: Sparkles,
    title: "Virtual Assistance",
    color: "from-emerald-400/40 to-teal-500/30",
    desc: "Notion systems, file organization, and creator support that keeps the studio running.",
    bullets: ["Notion templates", "File systems", "Client onboarding"],
  },
];

function Services() {
  return (
    <div className="relative overflow-hidden px-6 pb-20">
      <FloatingOrbs />
      <div
        aria-hidden
        className="page-midshade pointer-events-none absolute inset-x-0 top-0 h-[34rem]"
      />
      <section className="relative mx-auto max-w-7xl pt-12">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Services</span>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
            How I can <span className="text-gradient">help</span>
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            A focused set of services for founders, studios, and creators — combining design craft, brand thinking, and reliable execution.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative h-full overflow-hidden rounded-3xl glass-strong p-7 hover-lift"
              >
                <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${s.color} blur-3xl opacity-50 transition-opacity group-hover:opacity-80`} />
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero shadow-glow">
                  <s.icon size={18} className="text-primary-foreground" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                <ul className="mt-5 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm">
                      <Check size={14} className="text-primary" /> {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <div className="relative overflow-hidden rounded-[2rem] glass-strong p-10 text-center md:p-16">
            <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-20" />
            <h2 className="font-display text-3xl font-bold md:text-5xl">Have a brief in mind?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Tell me about the project and I'll come back with scope, timeline, and a friendly hello.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-hero px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              Start a project <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
