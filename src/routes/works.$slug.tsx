import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Calendar, Expand, Star, Target, User, Wrench } from "lucide-react";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { Lightbox } from "@/components/site/Lightbox";
import { FloatingOrbs, Reveal } from "@/components/site/Reveal";
import { getNextProject, getProject } from "@/data/projects";
import type { Project, ProjectKind } from "@/data/projects";

function CaseStudyError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
      <button
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className="mt-6 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
      >
        Retry
      </button>
    </div>
  );
}

const focusSectionMeta: Record<ProjectKind, { eyebrow: string; title: string; description: string }> = {
  uiux: {
    eyebrow: "Inside the product",
    title: "Research to final interface",
    description:
      "This section focuses on how the product was structured, tested, refined, and turned into a usable interface system.",
  },
  publication: {
    eyebrow: "Inside the campaign",
    title: "Direction, type, and visual system",
    description:
      "This section highlights the campaign goal, visual direction, layout rhythm, and the final publication assets.",
  },
  branding: {
    eyebrow: "Inside the identity",
    title: "Concept to brand system",
    description:
      "This section covers the brand overview, concept development, typography, palette, and real-world applications.",
  },
  frontend: {
    eyebrow: "Inside the build",
    title: "Layout strategy to working interface",
    description:
      "This section focuses on interface structure, responsive behavior, implementation logic, and the final built screens.",
  },
  writing: {
    eyebrow: "Inside the workflow",
    title: "Tasks, structure, and deliverables",
    description:
      "This section outlines the content or support workflow, how work was organized, and what was delivered at the end.",
  },
};

export const Route = createFileRoute("/works/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} - Case Study · Fe Anne Malasarte` },
          { name: "description", content: loaderData.overview },
          { property: "og:title", content: `${loaderData.title} - Case Study` },
          { property: "og:description", content: loaderData.desc },
        ]
      : [{ title: "Case Study · Fe Anne Malasarte" }],
  }),
  component: CaseStudy,
  errorComponent: CaseStudyError,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="font-display text-5xl font-bold text-gradient">404</h1>
      <p className="mt-4 text-muted-foreground">That case study does not exist.</p>
      <Link
        to="/works"
        className="mt-8 inline-flex rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
      >
        Back to Works
      </Link>
    </div>
  ),
});

function CaseStudy() {
  const project = Route.useLoaderData() as Project;
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const nextProject = getNextProject(project.slug);
  const focusMeta = focusSectionMeta[project.kind];

  useLayoutEffect(() => {
    const resetToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetToTop();
    const frame = window.requestAnimationFrame(resetToTop);
    const timeout = window.setTimeout(resetToTop, 0);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [project.slug]);

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "focus", label: "Focus" },
    { id: "goals", label: "Goals" },
    { id: "challenges", label: "Challenges" },
    { id: "gallery", label: "Gallery" },
  ];
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative overflow-hidden px-6 pb-10">
      <FloatingOrbs />
      <div
        aria-hidden
        className="page-midshade pointer-events-none absolute inset-x-0 top-0 h-[34rem]"
      />

      <section ref={heroRef} className="relative mx-auto max-w-6xl pt-6">
        <Link
          to="/works"
          resetScroll
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={14} /> All works
        </Link>

        <motion.div style={{ y: y1 }} className="mt-10">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {project.cat}
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[0.95] sm:text-5xl md:text-7xl lg:text-8xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">{project.desc}</p>
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[2rem] glass-strong shadow-card"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-4 md:inset-x-8 md:top-8">
            <div className="rounded-full glass px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
              Featured case study
            </div>
            <div className="rounded-full glass px-4 py-1.5 text-xs font-medium">{project.year}</div>
          </div>
          <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8">
            <div className="max-w-lg rounded-[1.5rem] glass-strong px-5 py-4 md:px-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Project focus</div>
              <div className="mt-1 font-display text-xl font-semibold md:text-2xl">{project.tag}</div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { Icon: User, label: "Role", value: project.role },
              { Icon: Star, label: "Category", value: project.cat },
              { Icon: Wrench, label: "Tools", value: project.tools.join(" · ") },
              { Icon: Calendar, label: "Year", value: project.year },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="rounded-2xl glass p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <Icon size={12} /> {label}
                </div>
                <div className="mt-2 text-sm font-medium md:text-base">{value}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <nav aria-label="Case study sections" className="sticky top-20 z-30 mx-auto mt-12 max-w-6xl">
        <div className="overflow-x-auto rounded-full glass-strong p-2 backdrop-blur-xl">
          <div className="flex w-max min-w-full gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  activeSection === section.id
                    ? "bg-gradient-hero text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section id="overview" className="mx-auto mt-16 grid max-w-6xl gap-6 scroll-mt-32 lg:grid-cols-2">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Project overview
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">The full story</h2>
          <div className="mt-6 rounded-[1.5rem] glass-strong p-6 md:p-8">
            <p className="text-muted-foreground">{project.overview}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Final outcome
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">What it delivered</h2>
          <div className="mt-6 rounded-[1.5rem] glass-strong p-6 md:p-8">
            <p className="text-muted-foreground">{project.outcome}</p>
          </div>
        </Reveal>
      </section>

      <section id="focus" className="mx-auto mt-24 max-w-6xl scroll-mt-32">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {focusMeta.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">{focusMeta.title}</h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">{focusMeta.description}</p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {project.focusAreas.map((area, index) => (
            <Reveal key={area.title} delay={index * 0.05}>
              <div className="rounded-3xl glass-strong p-6">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">{area.title}</div>
                <p className="mt-3 text-sm text-muted-foreground">{area.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="goals" className="mx-auto mt-24 grid max-w-6xl gap-12 scroll-mt-32 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Goals</span>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            What this project needed to do
          </h2>
          <div className="mt-8 space-y-3">
            {project.goals.map((goal) => (
              <div key={goal} className="flex gap-3 rounded-2xl glass p-4">
                <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-gradient-hero shadow-glow">
                  <Target size={14} className="text-primary-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">{goal}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-2">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Highlights
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">Key outcomes</h2>
          <div className="mt-6 space-y-3">
            {project.impact.map((metric) => (
              <div
                key={metric.label}
                className="flex items-baseline justify-between rounded-2xl glass p-4"
              >
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <span className="font-display text-2xl font-bold text-gradient">{metric.value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-24 max-w-6xl">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Process
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">How it came together</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {project.process.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06}>
              <div className="rounded-3xl glass-strong p-7">
                <div className="font-display text-6xl font-bold text-white/10">0{index + 1}</div>
                <h3 className="mt-2 font-display text-lg font-semibold md:text-xl">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="challenges" className="mx-auto mt-24 max-w-6xl scroll-mt-32">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Challenges and solutions
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            What had to be solved
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {project.challenges.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <div className="rounded-3xl glass-strong p-7">
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <div className="mt-4">
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                    Challenge
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.challenge}</p>
                </div>
                <div className="mt-5 border-t border-border/60 pt-5">
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                    Solution
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.solution}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="gallery" className="mx-auto mt-24 max-w-6xl scroll-mt-32">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Gallery and mockups
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            Consistent placeholder previews
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            Every project uses the same reusable gallery treatment so placeholder screens, brand applications,
            layouts, or workflow visuals still feel cohesive before final images are added.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {project.gallery.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.05}>
              <motion.button
                whileHover={{ y: -4 }}
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[16/10] w-full overflow-hidden rounded-3xl glass text-left"
                aria-label={`Open ${item.label} in fullscreen`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} transition-transform duration-700 group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute inset-[10%] rounded-[1.35rem] border border-white/10 bg-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
                <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass-strong opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100">
                  <Expand size={14} />
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      View
                    </span>
                  </div>
                  <p className="mt-2 max-w-md text-xs text-muted-foreground">{item.note}</p>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
        <Lightbox
          items={project.gallery}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      </section>

      {nextProject ? (
        <section className="mx-auto mt-24 max-w-6xl">
          <Reveal>
            <CaseStudyLink
              slug={nextProject.slug}
              aria-label={`Open next case study: ${nextProject.title}`}
              className="group relative block overflow-hidden rounded-[2rem] glass-strong p-10 hover-lift md:p-14"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${nextProject.color} opacity-30 transition-opacity group-hover:opacity-50`}
              />
              <div className="relative flex flex-wrap items-end justify-between gap-6">
                <div>
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                    Next case study
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl md:text-5xl">
                    {nextProject.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{nextProject.tag}</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
                  View next{" "}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </CaseStudyLink>
          </Reveal>
        </section>
      ) : null}
    </div>
  );
}


