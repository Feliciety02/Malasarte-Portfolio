import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useLayoutEffect } from "react";
import { ArrowLeft, ArrowRight, Calendar, Star, User, Wrench } from "lucide-react";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { getNextProject, getProject } from "@/data/projects";
import type { Project } from "@/data/projects";

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
  const nextProject = getNextProject(project.slug);
  const primaryPreview = project.gallery[0];
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
    <div className="relative overflow-hidden px-6 pb-12">
      <div
        aria-hidden
        className="page-midshade pointer-events-none absolute inset-x-0 top-0 h-[28rem]"
      />

      <section className="relative mx-auto max-w-6xl pt-6 md:pt-10">
        <Link
          to="/works"
          resetScroll
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={14} /> All works
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {project.cat}
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              {project.desc}
            </p>
          </div>

          <dl className="grid gap-4 rounded-2xl glass p-5 sm:grid-cols-2 lg:grid-cols-1">
            {summaryItems.map(({ Icon, label, value }) => (
              <div key={label} className="min-w-0">
                <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <Icon size={13} /> {label}
                </dt>
                <dd className="mt-1 break-words text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {primaryPreview ? (
        <section className="relative mx-auto mt-10 max-w-6xl">
          <div className="relative aspect-[16/8] min-h-[16rem] overflow-hidden rounded-2xl glass-strong shadow-card">
            <div className={`absolute inset-0 bg-gradient-to-br ${primaryPreview.color}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
            <div className="absolute inset-5 rounded-2xl border border-white/10 bg-black/10 md:inset-8" />
            <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-4 md:left-8 md:right-8 md:top-8">
              <span className="rounded-full glass px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                Featured preview
              </span>
              <span className="rounded-full glass px-4 py-1.5 text-xs font-medium">
                {project.year}
              </span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8">
              <p className="font-display text-xl font-semibold md:text-2xl">
                {primaryPreview.label}
              </p>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">{primaryPreview.note}</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <article className="rounded-2xl glass-strong p-6 md:p-8">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Overview
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">Project summary</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
            <p>{project.overview}</p>
            <p>{project.outcome}</p>
          </div>
        </article>

        <aside className="rounded-2xl glass p-6 md:p-8">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Goals</span>
          <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">What mattered</h2>
          <ul className="mt-5 space-y-3">
            {goals.map((goal) => (
              <li
                key={goal}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted-foreground"
              >
                {goal}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {focusAreas.length > 0 ? (
        <section className="mx-auto mt-6 max-w-6xl rounded-2xl glass p-6 md:p-8">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Focus</span>
          <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">Key direction</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <h3 className="text-sm font-semibold">{area.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{area.text}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {nextProject ? (
        <section className="mx-auto mt-12 max-w-6xl">
          <CaseStudyLink
            slug={nextProject.slug}
            aria-label={`Open next case study: ${nextProject.title}`}
            className="group relative block overflow-hidden rounded-2xl glass-strong p-6 md:p-8"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${nextProject.color} opacity-25`} />
            <div className="relative flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  Next case study
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold md:text-4xl">
                  {nextProject.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{nextProject.tag}</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-hero px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
                View next <ArrowRight size={14} />
              </div>
            </div>
          </CaseStudyLink>
        </section>
      ) : null}
    </div>
  );
}
