import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Sparkles, User, Wrench } from "lucide-react";
import { FloatingOrbs, Reveal } from "@/components/site/Reveal";
import { getProject, projects } from "@/data/projects";
import type { Project } from "@/data/projects";

export const Route = createFileRoute("/works/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Case Study · Fe Anne Malasarte` },
          { name: "description", content: loaderData.details },
          { property: "og:title", content: `${loaderData.title} — Case Study` },
          { property: "og:description", content: loaderData.desc },
        ]
      : [{ title: "Case Study — Fe Anne Malasarte" }],
  }),
  component: CaseStudy,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Retry
        </button>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="font-display text-5xl font-bold text-gradient">404</h1>
      <p className="mt-4 text-muted-foreground">That case study doesn't exist.</p>
      <Link to="/works" className="mt-8 inline-flex rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
        Back to Works
      </Link>
    </div>
  ),
});

function ratioClass(r: "square" | "wide" | "tall") {
  return r === "wide" ? "aspect-[16/9] md:col-span-2" : r === "tall" ? "aspect-[3/4]" : "aspect-square";
}

function CaseStudy() {
  const project = Route.useLoaderData() as Project;
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="relative overflow-hidden px-6 pb-10">
      {/* HERO */}
      <section ref={heroRef} className="relative mx-auto max-w-6xl pt-6">
        <FloatingOrbs />

        <Link
          to="/works"
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={14} /> All works
        </Link>

        <motion.div style={{ y: y1 }} className="mt-10">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{project.cat}</span>
          <h1 className="mt-3 font-display text-5xl font-bold leading-[0.95] md:text-7xl lg:text-8xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{project.desc}</p>
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[2rem] glass-strong shadow-card"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Featured</div>
              <div className="mt-1 font-display text-2xl font-semibold">{project.tag}</div>
            </div>
            <div className="rounded-full glass px-4 py-1.5 text-xs font-medium">{project.year}</div>
          </div>
        </motion.div>
      </section>

      {/* META */}
      <section className="mx-auto mt-16 max-w-6xl">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { Icon: User, k: "Role", v: project.role },
              { Icon: Sparkles, k: "Client", v: project.client },
              { Icon: Wrench, k: "Tools", v: project.tools },
              { Icon: Calendar, k: "Year", v: project.year },
            ].map(({ Icon, k, v }) => (
              <div key={k} className="rounded-2xl glass p-5 hover-lift">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <Icon size={12} /> {k}
                </div>
                <div className="mt-2 font-medium">{v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* OVERVIEW + IMPACT */}
      <section className="mx-auto mt-24 grid max-w-6xl gap-12 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Overview</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">The story</h2>
          <p className="mt-6 text-muted-foreground">{project.details}</p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-2">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Impact</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Outcomes</h2>
          <div className="mt-6 space-y-3">
            {project.impact.map((m) => (
              <div key={m.v} className="flex items-baseline justify-between rounded-2xl glass p-4">
                <span className="text-sm text-muted-foreground">{m.v}</span>
                <span className="font-display text-2xl font-bold text-gradient">{m.k}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* PROCESS NOTES */}
      <section className="mx-auto mt-24 max-w-6xl">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Process</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">How it came together</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {project.process.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-3xl glass-strong p-7 hover-lift">
                <div className="font-display text-6xl font-bold text-white/10">0{i + 1}</div>
                <h3 className="mt-2 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto mt-24 max-w-6xl">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Gallery</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Selected visuals</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {project.gallery.map((g, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`group relative ${ratioClass(g.ratio)} overflow-hidden rounded-3xl glass`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${g.color} transition-transform duration-700 group-hover:scale-110`} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <span className="text-sm font-medium">{g.label}</span>
                  <ArrowUpRight size={16} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEXT + CTA */}
      <section className="mx-auto mt-24 max-w-6xl">
        <Reveal>
          <Link
            to="/works/$slug"
            params={{ slug: next.slug }}
            className="group relative block overflow-hidden rounded-[2rem] glass-strong p-10 md:p-14 hover-lift"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${next.color} opacity-30 transition-opacity group-hover:opacity-50`} />
            <div className="relative flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Next case study</span>
                <h3 className="mt-2 font-display text-3xl font-bold md:text-5xl">{next.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{next.tag}</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
                View next <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
