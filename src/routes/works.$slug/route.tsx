import { createFileRoute, Link, notFound, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Star,
  User,
  Wrench,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Project, ProjectCategory } from "@/data/projects";
import { getProjectCoverImage, getProjectGalleryImage } from "@/data/projectImages";
import { getProject } from "@/data/projects";
import { fetchPortfolioProjectFromSupabase } from "@/data/supabaseProjects";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { Lightbox, type LightboxItem } from "@/components/site/Lightbox";
import { MetallicPage } from "@/components/site/MetallicPage";
import { TagPill } from "@/components/site/TagPill";
import { cn } from "@/lib/utils";
import {
  getProjectTemplate,
  TEMPLATE_META,
  getProjectSections,
  getProjectSection,
  canShowProjectWorkspace,
} from "./config";
import { InteractiveWorkspace, WorkspacePhotoGallery } from "./workspace";
import { GalleryGrid } from "./gallery";
import { RelatedProjects } from "./related";
import { StickyTOC, SectionAnchor, SectionLabel, FadeIn } from "./sections";
import {
  ProductBody,
  DevelopmentBody,
  BrandingBody,
  CreativeBody,
  WritingBody,
  GalleryOnlyBody,
  LogoBody,
} from "./bodies";
import {
  ResultsSection,
  ReflectionSection,
} from "./blocks";

// ---------------------------------------------------------------------------
// Route boilerplate
// ---------------------------------------------------------------------------

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
  validateSearch: (search: Record<string, unknown>): { category?: ProjectCategory } => ({
    category: search.category as ProjectCategory | undefined,
  }),
  loaderDeps: ({ search }) => ({ category: search.category }),
  loader: async ({ params, deps }) => {
    const supabaseProject = await fetchPortfolioProjectFromSupabase(params.slug);
    const localProject = getProject(params.slug);

    if (!supabaseProject && !localProject) throw notFound();

    const baseProject = supabaseProject ?? localProject!;
    const cat = deps.category ?? baseProject.cat;

    const variant = localProject?.categoryVariants?.[cat];
    const merged: Project = variant ? { ...baseProject, ...variant } : { ...baseProject };

    if (cat === "Web Development") merged.figmaPreviewUrl = undefined;
    if (cat === "UI/UX Design") merged.vercelLiveUrl = undefined;

    return merged;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: "Fe Anne Malasarte" },
          { name: "description", content: loaderData.overview },
          { property: "og:title", content: "Fe Anne Malasarte" },
          { property: "og:description", content: loaderData.desc },
        ]
      : [{ title: "Fe Anne Malasarte" }],
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

// ---------------------------------------------------------------------------
// Root component
// ---------------------------------------------------------------------------

function CaseStudy() {
  const project = Route.useLoaderData() as Project;
  const template = getProjectTemplate(project);
  const meta = TEMPLATE_META[template];
  const sections = getProjectSections(project);
  const sectionMeta = (id: string) => getProjectSection(project, id);
  const showWorkspace = canShowProjectWorkspace(project);
  const shouldSwapToGallery =
    !showWorkspace && project.cat === "Web Development" && project.gallery.length > 0;
  const isGalleryOnly = template === "gallery";

  const galleryItems: LightboxItem[] = useMemo(
    () =>
      project.gallery.map((g) => ({
        color: g.color,
        label: g.label,
        note: g.note,
        src: getProjectGalleryImage(project, g),
      })),
    [project],
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
    <MetallicPage variant="project" className="px-0 pb-24">
      <FloatingCatalogBackLink />

      <ProjectHero project={project} meta={meta} />

      <div
        className={cn(
          "relative mx-auto max-w-7xl px-6",
          !isGalleryOnly && "grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem]",
        )}
      >
        {isGalleryOnly ? (
          <GalleryOnlyBody project={project} openLightbox={setLightboxIndex} />
        ) : (
          <>
            <div className="min-w-0">
              <Snapshot project={project} />
              {showWorkspace ? (
                <InteractiveWorkspace project={project} />
              ) : shouldSwapToGallery ? (
                <WorkspacePhotoGallery
                  project={project}
                  openLightbox={setLightboxIndex}
                />
              ) : null}

              {template === "product" && (
                <ProductBody project={project} openLightbox={setLightboxIndex} />
              )}
              {template === "development" && (
                <DevelopmentBody
                  project={project}
                  openLightbox={setLightboxIndex}
                  sectionMeta={sectionMeta}
                />
              )}
              {template === "branding" && (
                <BrandingBody
                  project={project}
                  openLightbox={setLightboxIndex}
                  sectionMeta={sectionMeta}
                />
              )}
              {template === "creative" && (
                <CreativeBody
                  project={project}
                  openLightbox={setLightboxIndex}
                  sectionMeta={sectionMeta}
                />
              )}
              {template === "writing" && (
                <WritingBody
                  project={project}
                  openLightbox={setLightboxIndex}
                  sectionMeta={sectionMeta}
                />
              )}
              {template === "logo" && (
                <LogoBody
                  project={project}
                  openLightbox={setLightboxIndex}
                  sectionMeta={sectionMeta}
                />
              )}

              {template !== "logo" ? (
                <>
                  <ResultsSection project={project} />
                  <ReflectionSection project={project} />
                </>
              ) : null}

              <RelatedProjects currentProject={project} />
            </div>

            <StickyTOC sections={sections} />
          </>
        )}
      </div>

      <Lightbox
        items={galleryItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </MetallicPage>
  );
}

// ---------------------------------------------------------------------------
// Shared chrome
// ---------------------------------------------------------------------------

function FloatingCatalogBackLink() {
  const navigate = useNavigate();
  const { category } = Route.useSearch();
  const goBack = () => navigate({ to: "/works", search: { category } });

  return (
    <div>
      <button
        type="button"
        onClick={goBack}
        aria-label="Back to all works"
        title="Back to all works"
        className="metal-ghost fixed left-4 top-28 z-40 grid h-11 w-11 place-items-center rounded-full text-muted-foreground shadow-[0_16px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors duration-300 hover:border-primary/45 hover:bg-primary/15 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 lg:hidden"
      >
        <ArrowLeft size={16} />
      </button>

      <button
        type="button"
        onClick={goBack}
        aria-label="Back to all works"
        title="Back to all works"
        className="group fixed bottom-0 left-0 top-0 z-40 hidden w-24 items-start justify-center pt-36 text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/45 lg:flex xl:w-28 2xl:w-[max(7rem,calc((100vw-80rem)/2+5rem))]"
      >
        <span className="metal-ghost grid h-11 w-11 place-items-center rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors duration-300 group-hover:border-primary/45 group-hover:bg-primary/15">
          <ArrowLeft size={16} />
        </span>
      </button>
    </div>
  );
}

function ProjectHero({ project, meta }: { project: Project; meta: { accent: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
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
          meta.accent,
        )}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:80px_80px]"
      />

      <div className="mx-auto max-w-7xl px-6 pb-20 pt-24 md:pb-28 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center"
        >
          <TagPill className="static">{project.cat}</TagPill>
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

function Snapshot({ project }: { project: Project }) {
  const rows = [
    { Icon: User, label: "Role", value: project.role },
    { Icon: Star, label: "Client", value: project.client },
    { Icon: Calendar, label: "Year", value: project.year },
    { Icon: Wrench, label: "Tools", value: project.tools.join(" · ") },
  ];
  return (
    <SectionAnchor id="snapshot">
      <SectionLabel kicker="01" label="Project Snapshot" />
      <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(({ Icon, label, value }) => (
          <div key={label} className="bg-background/40 p-5">
            <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <Icon size={12} /> {label}
            </dt>
            <dd className="mt-3 break-words text-sm font-medium text-white/88">{value}</dd>
          </div>
        ))}
      </dl>
    </SectionAnchor>
  );
}
