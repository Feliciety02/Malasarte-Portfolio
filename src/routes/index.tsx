import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { FloatingOrbs, Reveal } from "@/components/site/Reveal";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fe Anne Malasarte — Creative Designer & UI/UX Storyteller" },
      { name: "description", content: "Portfolio home of Fe Anne Malasarte — UI/UX, branding, and creative design." },
      { property: "og:title", content: "Fe Anne Malasarte — Creative Designer" },
      { property: "og:description", content: "Crafting meaningful, beautifully animated digital experiences." },
    ],
  }),
  component: Home,
});

const featuredSlugs = ["lumen-banking", "aurora-brand", "wavefront-dashboard", "echo-magazine", "studio-folio-site"];
const featured = featuredSlugs
  .map((s) => projects.find((p) => p.slug === s))
  .filter((p): p is NonNullable<typeof p> => !!p);

function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section ref={ref} className="relative min-h-[92vh] px-6">
        <FloatingOrbs />
        <motion.div style={{ y: y2 }} aria-hidden className="absolute inset-0 -z-10 opacity-50" />

        <motion.div style={{ y: y1, opacity }} className="relative mx-auto flex max-w-6xl flex-col items-center pt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <Sparkles size={14} className="text-primary" />
            Available for select projects · 2026
          </motion.div>

          <h1 className="mt-8 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-[7.5rem]">
            <SplitText text="Creative Designer" />
            <br />
            <span className="text-gradient"><SplitText text="& UI/UX Storyteller" delay={0.4} /></span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg"
          >
            I'm <span className="text-foreground font-medium">Fe Anne Malasarte</span> — a multidisciplinary designer blending
            UI/UX, branding, and visual storytelling into experiences that feel
            human, intentional, and quietly magical.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/works"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-hero px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              View Portfolio
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10"
            >
              About me
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-20 flex items-center gap-2 text-xs text-muted-foreground"
          >
            <span className="h-px w-10 bg-border" />
            Scroll to explore
            <span className="h-px w-10 bg-border" />
          </motion.div>
        </motion.div>

        {/* Floating decorative shapes */}
        <motion.div aria-hidden style={{ y: y2 }} className="absolute left-8 top-1/3 hidden h-20 w-20 rounded-3xl glass md:block" />
        <motion.div aria-hidden style={{ y: y1 }} className="absolute right-12 top-40 hidden h-14 w-14 rotate-12 rounded-2xl bg-gradient-hero shadow-glow md:block" />
        <motion.div aria-hidden style={{ y: y2 }} className="absolute right-1/4 bottom-20 hidden h-10 w-10 rounded-full bg-accent/40 blur-xl md:block" />
      </section>

      {/* MARQUEE */}
      <section className="relative overflow-hidden border-y border-border/50 py-6">
        <div className="flex animate-[shimmer_30s_linear_infinite] gap-12 whitespace-nowrap text-2xl font-display font-semibold text-muted-foreground/50 md:text-4xl">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span>UI/UX Design</span><span className="text-primary">✦</span>
              <span>Branding</span><span className="text-primary">✦</span>
              <span>Visual Storytelling</span><span className="text-primary">✦</span>
              <span>Publication</span><span className="text-primary">✦</span>
              <span>Web Design</span><span className="text-primary">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED WORKS */}
      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-16 flex items-end justify-between gap-6">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Selected Work</span>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl">Featured projects</h2>
            </div>
            <Link to="/works" className="hidden items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground md:inline-flex">
              All works <ArrowRight size={14} />
            </Link>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-6">
            {featured.map((p, i) => (
              <Reveal
                key={p.slug}
                delay={i * 0.08}
                className={`${i === 0 ? "md:col-span-4" : i === 1 ? "md:col-span-2" : i === 2 ? "md:col-span-3" : i === 3 ? "md:col-span-3" : "md:col-span-6"}`}
              >
                <ProjectCard slug={p.slug} title={p.title} tag={p.tag} color={p.color} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-24">
        <Reveal className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] glass-strong p-12 text-center md:p-20">
          <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-20" />
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Let's create something <span className="text-gradient">meaningful</span> together.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Have a project in mind? I'd love to hear your story.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-hero px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            Start a project <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block">
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden pr-[0.25em] align-bottom">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: delay + wi * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function ProjectCard({ slug, title, tag, color }: { slug: string; title: string; tag: string; color: string }) {
  return (
    <Link to="/works/$slug" params={{ slug }} className="group relative block aspect-[4/3] overflow-hidden rounded-3xl glass hover-lift">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} transition-transform duration-700 group-hover:scale-110`} />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at 50% 50%, oklch(0.65 0.25 295 / 0.25), transparent 60%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-7">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-primary">{tag}</span>
        <h3 className="mt-2 font-display text-2xl font-bold transition-transform duration-500 group-hover:-translate-y-1 md:text-3xl">{title}</h3>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground opacity-0 transition-opacity delay-100 group-hover:opacity-100">
          View case study <ArrowRight size={12} />
        </div>
      </div>
    </Link>
  );
}
