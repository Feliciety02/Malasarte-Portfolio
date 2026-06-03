import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, Calendar, Star, User, Wrench } from "lucide-react";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { MetallicPage } from "@/components/site/MetallicPage";
import { getNextProject, getProject } from "@/data/projects";
import type { Project } from "@/data/projects";

function CaseStudyError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <MetallicPage variant="project" className="px-6">
      <div className="mx-auto max-w-xl py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="metal-cta mt-6 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Retry
        </button>
      </div>
    </MetallicPage>
  );
}

export const Route = createFileRoute("/works/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} - Case Study - Fe Anne Malasarte` },
          { name: "description", content: loaderData.overview },
          { property: "og:title", content: `${loaderData.title} - Case Study` },
          { property: "og:description", content: loaderData.desc },
        ]
      : [{ title: "Case Study - Fe Anne Malasarte" }],
  }),
  component: CaseStudy,
  errorComponent: CaseStudyError,
  notFoundComponent: () => (
    <MetallicPage variant="project" className="px-6">
      <div className="mx-auto max-w-xl py-32 text-center">
        <h1 className="font-display text-5xl font-bold text-gradient">404</h1>
        <p className="mt-4 text-muted-foreground">That case study does not exist.</p>
        <Link
          to="/works"
          className="metal-cta mt-8 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Back to Works
        </Link>
      </div>
    </MetallicPage>
  ),
});

function CaseStudy() {
  const project = Route.useLoaderData() as Project;
  const nextProject = getNextProject(project.slug);
  const previewRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: previewRef,
    offset: ["start start", "end start"],
  });
  const previewY = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const previewOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.78]);
  const primaryPreview = project.gallery[0];
  const galleryItems = project.gallery.slice(0, 3);
  const goals = project.goals.slice(0, 3);
  const focusAreas = project.focusAreas.slice(0, 3);
  const summaryItems = [
    { Icon: User, label: "Role", value: project.role },
    { Icon: Star, label: "Category", value: project.cat },
    { Icon: Wrench, label: "Tools", value: project.tools.join(", ") },
    { Icon: Calendar, label: "Year", value: project.year },
  ];

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

  return (
    <MetallicPage variant="project" className="px-6 pb-20">
      <section className="mx-auto max-w-6xl pt-6 md:pt-10">
        <Link
          to="/works"
          resetScroll
          className="metal-ghost inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={14} /> All works
        </Link>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div>
            <span className="metal-kicker">{project.cat}</span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              {project.desc}
            </p>
          </div>

          <dl className="border-y border-white/10 py-2">
            {summaryItems.map(({ Icon, label, value }) => (
              <div
                key={label}
                className="grid min-w-0 grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-b border-white/10 py-4 last:border-b-0"
              >
                <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  <Icon size={13} /> {label}
                </dt>
                <dd className="break-words text-sm font-medium text-white/88">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {primaryPreview ? (
        <section ref={previewRef} className="relative mx-auto mt-14 max-w-6xl md:mt-20">
          <motion.div
            style={prefersReducedMotion ? undefined : { y: previewY, opacity: previewOpacity }}
            className="metal-panel relative aspect-[16/8] min-h-[18rem] p-6 md:p-8"
          >
            <div
              aria-hidden
              className="absolute inset-6 border border-white/10 bg-black/18 md:inset-8"
            />
            <div
              aria-hidden
              className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-white/28 to-transparent"
            />
            <div className="relative z-10 flex items-center justify-between gap-4">
              <span className="metal-ghost rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                Featured preview
              </span>
              <span className="font-mono text-xs text-white/64">{project.year}</span>
            </div>
            <div className="relative z-10 mt-auto flex h-full flex-col justify-end">
              <p className="font-display text-2xl font-semibold md:text-4xl">
                {primaryPreview.label}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                {primaryPreview.note}
              </p>
            </div>
          </motion.div>
        </section>
      ) : null}

      <section className="mx-auto mt-24 grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <article>
          <span className="metal-kicker">Overview</span>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Project summary")}
          </h2>
          <div className="mt-7 space-y-5 text-sm leading-8 text-muted-foreground md:text-base">
            <p>{project.overview}</p>
            <p>{project.outcome}</p>
          </div>
        </article>

        <aside className="metal-panel p-6 md:p-8">
          <span className="metal-kicker">Goals</span>
          <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">
            {accentLastWord("What mattered")}
          </h2>
          <ul className="mt-6 space-y-4">
            {goals.map((goal, index) => (
              <li key={goal} className="border-t border-white/10 pt-4 text-sm leading-6 text-muted-foreground">
                <span className="mr-3 font-mono text-xs text-primary">0{index + 1}</span>
                {goal}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {focusAreas.length > 0 ? (
        <section className="mx-auto mt-20 max-w-6xl">
          <span className="metal-kicker">Focus</span>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Key direction")}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {focusAreas.map((area, index) => (
              <div key={area.title} className="metal-card p-5">
                <div className="font-mono text-xs text-primary">0{index + 1}</div>
                <h3 className="mt-4 text-base font-semibold">{area.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{area.text}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {galleryItems.length > 1 ? (
        <section className="mx-auto mt-20 max-w-6xl">
          <span className="metal-kicker">Surface studies</span>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {galleryItems.map((item) => (
              <div key={item.label} className="metal-panel min-h-48 p-5">
                <div className="relative z-10 flex h-full flex-col justify-end">
                  <h3 className="font-display text-xl font-semibold">{item.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {nextProject ? (
        <section className="mx-auto mt-24 max-w-6xl">
          <CaseStudyLink
            slug={nextProject.slug}
            aria-label={`Open next case study: ${nextProject.title}`}
            className="metal-card group block p-6 md:p-8"
          >
            <div className="relative z-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="metal-kicker">Next case study</span>
                <h3 className="mt-3 font-display text-2xl font-bold md:text-4xl">
                  {nextProject.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{nextProject.tag}</p>
              </div>
              <div className="metal-cta inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground">
                View next <ArrowRight size={14} />
              </div>
            </div>
          </CaseStudyLink>
        </section>
      ) : null}
    </MetallicPage>
  );
}
