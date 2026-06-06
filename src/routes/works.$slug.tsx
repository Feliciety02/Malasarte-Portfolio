import { createFileRoute, Link, notFound, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Layers,
  Lightbulb,
  Maximize2,
  Monitor,
  Palette,
  RotateCcw,
  Sparkles,
  Star,
  User,
  Wrench,
} from "lucide-react";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { Lightbox, type LightboxItem } from "@/components/site/Lightbox";
import { MetallicPage } from "@/components/site/MetallicPage";
import { TagPill } from "@/components/site/TagPill";
import { getProjectGalleryImage } from "@/data/projectImages";
import { getNextProject, getProject } from "@/data/projects";
import { fetchPortfolioProjectFromSupabase } from "@/data/supabaseProjects";
import type {
  Project,
  ProjectFigmaEmbed,
  ProjectFlipbookEmbed,
  ProjectGalleryItem,
  ProjectKind,
} from "@/data/projects";
import { cn } from "@/lib/utils";

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
  loader: async ({ params }) => {
    const project =
      (await fetchPortfolioProjectFromSupabase(params.slug)) ?? getProject(params.slug);
    if (!project) throw notFound();
    return project;
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
// Category configuration
// ---------------------------------------------------------------------------

type TemplateKey = "product" | "development" | "branding" | "creative" | "gallery" | "writing";

const KIND_TO_TEMPLATE: Record<ProjectKind, TemplateKey> = {
  uiux: "product",
  frontend: "development",
  branding: "branding",
  publication: "creative",
  gallery: "gallery",
  writing: "writing",
};

type TemplateMeta = {
  accent: string;
};

const TEMPLATE_META: Record<TemplateKey, TemplateMeta> = {
  product: {
    accent: "from-violet-500/40 via-fuchsia-500/20 to-transparent",
  },
  development: {
    accent: "from-sky-400/40 via-cyan-500/20 to-transparent",
  },
  branding: {
    accent: "from-amber-400/40 via-rose-500/20 to-transparent",
  },
  creative: {
    accent: "from-fuchsia-500/40 via-pink-500/20 to-transparent",
  },
  gallery: {
    accent: "from-fuchsia-500/40 via-cyan-500/20 to-transparent",
  },
  writing: {
    accent: "from-emerald-400/35 via-teal-500/15 to-transparent",
  },
};

type SectionDef = { id: string; label: string };

const TEMPLATE_SECTIONS: Record<TemplateKey, SectionDef[]> = {
  product: [
    { id: "snapshot", label: "Snapshot" },
    { id: "workspace", label: "Workspace" },
    { id: "problem", label: "Problem" },
    { id: "goals", label: "Goals" },
    { id: "process", label: "Process" },
    { id: "decisions", label: "Decisions" },
    { id: "showcase", label: "Showcase" },
    { id: "challenges", label: "Challenges" },
    { id: "results", label: "Results" },
    { id: "reflection", label: "Reflection" },
    { id: "next", label: "Next" },
  ],
  development: [
    { id: "snapshot", label: "Snapshot" },
    { id: "workspace", label: "Workspace" },
    { id: "problem", label: "Problem" },
    { id: "stack", label: "Stack" },
    { id: "architecture", label: "Architecture" },
    { id: "process", label: "Build" },
    { id: "challenges", label: "Challenges" },
    { id: "features", label: "Features" },
    { id: "results", label: "Performance" },
    { id: "reflection", label: "Reflection" },
    { id: "next", label: "Next" },
  ],
  branding: [
    { id: "snapshot", label: "Snapshot" },
    { id: "workspace", label: "Workspace" },
    { id: "story", label: "Story" },
    { id: "strategy", label: "Strategy" },
    { id: "identity", label: "Identity" },
    { id: "applications", label: "Applications" },
    { id: "process", label: "Process" },
    { id: "challenges", label: "Challenges" },
    { id: "results", label: "Impact" },
    { id: "reflection", label: "Reflection" },
    { id: "next", label: "Next" },
  ],
  creative: [
    { id: "snapshot", label: "Snapshot" },
    { id: "workspace", label: "Workspace" },
    { id: "overview", label: "Campaign" },
    { id: "direction", label: "Direction" },
    { id: "assets", label: "Assets" },
    { id: "rollout", label: "Rollout" },
    { id: "challenges", label: "Challenges" },
    { id: "results", label: "Results" },
    { id: "reflection", label: "Reflection" },
    { id: "next", label: "Next" },
  ],
  gallery: [{ id: "showcase", label: "Gallery" }],
  writing: [
    { id: "snapshot", label: "Snapshot" },
    { id: "workspace", label: "Workspace" },
    { id: "overview", label: "Overview" },
    { id: "goals", label: "Goals" },
    { id: "process", label: "Workflow" },
    { id: "deliverables", label: "Deliverables" },
    { id: "focus", label: "Focus" },
    { id: "challenges", label: "Challenges" },
    { id: "results", label: "Outcome" },
    { id: "reflection", label: "Reflection" },
    { id: "next", label: "Next" },
  ],
};

const getProjectTemplate = (project: Pick<Project, "kind">) =>
  KIND_TO_TEMPLATE[project.kind] ?? "product";

const WORKSPACE_PROJECT_CATEGORIES: Project["cat"][] = ["UI/UX Design", "Web Development"];

const canShowProjectWorkspace = (project: Pick<Project, "cat" | "categories">) =>
  WORKSPACE_PROJECT_CATEGORIES.includes(project.cat) ||
  project.categories?.some((category) => WORKSPACE_PROJECT_CATEGORIES.includes(category)) === true;

const getProjectSections = (project: Pick<Project, "kind" | "cat" | "categories">) => {
  const sections = TEMPLATE_SECTIONS[getProjectTemplate(project)];

  if (canShowProjectWorkspace(project)) return sections;

  return sections.filter((section) => section.id !== "workspace");
};

type ProjectSectionMeta = SectionDef & { number: string };

const getProjectSection = (
  project: Pick<Project, "kind" | "cat" | "categories">,
  id: string,
): ProjectSectionMeta => {
  const sections = getProjectSections(project);
  const index = sections.findIndex((section) => section.id === id);
  return {
    id,
    label: index >= 0 ? sections[index].label : "",
    number: index >= 0 ? String(index + 1).padStart(2, "0") : "",
  };
};

// ---------------------------------------------------------------------------
// Root component
// ---------------------------------------------------------------------------

function CaseStudy() {
  const project = Route.useLoaderData() as Project;
  const nextProject = getNextProject(project.slug);
  const template = getProjectTemplate(project);
  const meta = TEMPLATE_META[template];
  const sections = getProjectSections(project);
  const sectionMeta = (id: string) => getProjectSection(project, id);
  const showWorkspace = canShowProjectWorkspace(project);
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
              {showWorkspace ? <InteractiveWorkspace project={project} /> : null}

              {template === "product" && (
                <ProductBody project={project} openLightbox={setLightboxIndex} />
              )}
              {template === "development" && (
                <DevelopmentBody project={project} openLightbox={setLightboxIndex} />
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

              <ResultsSection project={project} />
              <ReflectionSection project={project} />

              {nextProject ? (
                <NextProjectCta project={nextProject} currentProject={project} sectionId="next" />
              ) : null}
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
  const goBack = () => navigate({ to: "/works" });

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

function ProjectHero({ project, meta }: { project: Project; meta: TemplateMeta }) {
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

type WorkspaceTabId = "live" | "design";

type WorkspaceTab = {
  id: WorkspaceTabId;
  label: string;
  title: string;
  note?: string;
  src: string;
  externalUrl: string;
  allow: string;
  minWidthClassName: string;
};

function InteractiveWorkspace({ project }: { project: Project }) {
  const figma = project.figmaEmbed;
  const live = project.liveEmbed;
  const figmaEmbedSrc = figma ? getFigmaEmbedUrl(figma) : undefined;
  const liveSrc = live?.src.trim();
  const isUxProject = project.cat === "UI/UX Design";
  const isWebDevProject = project.cat === "Web Development";
  const workspaceTabs: WorkspaceTab[] = [];

  if (isUxProject && figmaEmbedSrc) {
    workspaceTabs.push({
      id: "design",
      label: "Design",
      title: figma?.title ?? `${project.title} design workspace`,
      note: figma?.note,
      src: figmaEmbedSrc,
      externalUrl: figma?.prototypeUrl ?? figma?.shareUrl ?? figmaEmbedSrc,
      allow: "fullscreen; clipboard-read; clipboard-write",
      minWidthClassName: "min-w-[52rem] sm:min-w-0",
    });
  }

  if (isWebDevProject && liveSrc) {
    workspaceTabs.push({
      id: "live",
      label: "Live Build",
      title: live.title,
      note: live.note,
      src: liveSrc,
      externalUrl: liveSrc,
      allow: "fullscreen; clipboard-read; clipboard-write; autoplay; gamepad",
      minWidthClassName: "min-w-[24rem] sm:min-w-0",
    });
  }

  const defaultTab: WorkspaceTabId = workspaceTabs[0]?.id ?? "live";
  const [activeTabId, setActiveTabId] = useState<WorkspaceTabId>(defaultTab);
  const activeTab = workspaceTabs.find((tab) => tab.id === activeTabId) ?? workspaceTabs[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [embedKey, setEmbedKey] = useState(0);

  useEffect(() => {
    setIsLoaded(false);
    setEmbedKey(0);
  }, [activeTab?.id, activeTab?.src]);

  const resetView = () => {
    if (!activeTab) return;
    setIsLoaded(false);
    setEmbedKey((key) => key + 1);
  };

  const enterFullscreen = () => {
    if (!activeTab) return;
    containerRef.current?.requestFullscreen?.();
  };

  return (
    <SectionAnchor id="workspace" className="pt-16 md:pt-24">
      <FadeIn>
        <SectionLabel kicker="02" label="Live Workspace" />
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold leading-tight md:text-4xl">
              {accentLastWord(
                activeTab?.id === "live" ? "Explore the live build" : "Explore the design",
              )}
            </h2>
            {activeTab?.note ? (
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                {activeTab.note}
              </p>
            ) : null}
          </div>
          {activeTab ? (
            <div className="flex flex-wrap items-center gap-2">
              {workspaceTabs.length > 1 ? (
                <div className="metal-ghost flex rounded-full p-1">
                  {workspaceTabs.map((tab) => {
                    const isActive = activeTab.id === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTabId(tab.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-white",
                        )}
                        aria-pressed={isActive}
                      >
                        {tab.id === "live" ? <Monitor size={12} /> : <Palette size={12} />}
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}
              <a
                href={activeTab.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="metal-ghost flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-white"
                aria-label={`Open ${activeTab.title} in a new tab`}
              >
                <ArrowUpRight size={12} /> Open
              </a>
              <button
                type="button"
                onClick={enterFullscreen}
                className="metal-ghost flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-white"
                aria-label="Open fullscreen"
              >
                <Maximize2 size={12} /> Full Preview
              </button>
              <button
                type="button"
                onClick={resetView}
                className="metal-ghost flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-white"
                aria-label="Reset view"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>
          ) : null}
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <div
          ref={containerRef}
          className="relative mt-6 overflow-hidden rounded-xl border border-white/8 bg-[#060708]"
        >
          <div
            className="relative h-[72vh] min-h-[28rem] max-h-[48rem] overflow-auto"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01) 38%), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 44px), repeating-linear-gradient(90deg, rgba(255,255,255,0.022) 0 1px, transparent 1px 44px)",
            }}
          >
            {activeTab ? (
              <div className={cn("relative h-full", activeTab.minWidthClassName)}>
                {!isLoaded ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
                  </div>
                ) : null}
                <iframe
                  key={`${project.slug}-${activeTab.id}-${embedKey}`}
                  title={`${activeTab.title} workspace`}
                  src={activeTab.src}
                  className="h-full w-full border-0"
                  allow={activeTab.allow}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  onLoad={() => setIsLoaded(true)}
                />
              </div>
            ) : (
              <WorkspacePlaceholder project={project} />
            )}
          </div>
        </div>
      </FadeIn>
    </SectionAnchor>
  );
}

function getFigmaEmbedUrl(figma: ProjectFigmaEmbed) {
  if (figma.embedUrl) return figma.embedUrl;

  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figma.shareUrl)}`;
}

function WorkspacePlaceholder({ project }: { project: Project }) {
  return (
    <div className="grid h-full min-w-[42rem] place-items-center p-6 sm:min-w-0">
      <div className="w-full max-w-4xl rounded-xl border border-white/10 bg-black/30 p-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
              Preview frame
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold">
              Interactive Workspace Coming Soon
            </h3>
          </div>
          <Sparkles size={18} className="text-primary" />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-[0.4fr_0.6fr]">
          <div className="space-y-3">
            <div className="h-4 rounded-full bg-white/14" />
            <div className="h-4 w-3/4 rounded-full bg-white/8" />
            <div className="h-28 rounded-lg border border-white/8 bg-white/[0.04]" />
          </div>
          <div className="aspect-video rounded-lg border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.11),rgba(255,255,255,0.025)_45%,rgba(0,0,0,0.26))]" />
        </div>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          {project.title} will include the live build or embedded design workspace here when a
          public URL is available.
        </p>
      </div>
    </div>
  );
}

function SectionAnchor({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-28 pt-20 md:pt-28", className)}>
      {children}
    </section>
  );
}

function SectionLabel({ kicker, label }: { kicker: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-xs text-primary">{kicker}</span>
      <span className="metal-kicker">{label}</span>
    </div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GalleryPreviewImage({ project, item }: { project: Project; item: ProjectGalleryItem }) {
  const image = getProjectGalleryImage(project, item);

  return (
    <>
      {image ? (
        <img
          src={image}
          alt={`${project.title} - ${item.label}`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      ) : null}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          item.color,
          image ? "opacity-20 mix-blend-overlay" : "opacity-100",
        )}
      />
    </>
  );
}

function GalleryGrid({
  project,
  openLightbox,
  variant = "grid",
}: {
  project: Project;
  openLightbox: (i: number) => void;
  variant?: "grid" | "masonry" | "stack" | "documents";
}) {
  const items = project.gallery;
  if (variant === "stack") {
    return (
      <div className="thin-x-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
        {items.map((item, i) => (
          <button
            key={item.label}
            onClick={() => openLightbox(i)}
            className="metal-panel group relative w-[78%] shrink-0 snap-center overflow-hidden text-left md:w-[60%] lg:w-[48%]"
          >
            <div className={cn("relative aspect-[16/10] bg-gradient-to-br", item.color)}>
              <GalleryPreviewImage project={project} item={item} />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_45%,rgba(0,0,0,0.4))]" />
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                {String(i + 1).padStart(2, "0")} <ArrowUpRight size={11} />
              </span>
            </div>
            <div className="p-5">
              <p className="font-display text-xl font-semibold">{item.label}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>
            </div>
          </button>
        ))}
      </div>
    );
  }
  if (variant === "documents") {
    return (
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {items.map((item, i) => (
          <FadeIn key={item.label} delay={i * 0.05}>
            <button
              onClick={() => openLightbox(i)}
              className="metal-card group relative flex w-full flex-col overflow-hidden text-left sm:flex-row"
            >
              <div
                className={cn(
                  "relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-gradient-to-br sm:aspect-auto sm:w-36",
                  item.color,
                )}
              >
                <GalleryPreviewImage project={project} item={item} />
              </div>
              <div className="flex-1 p-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                  Document · {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-display text-xl font-semibold">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.note}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open <ArrowUpRight size={11} />
                </span>
              </div>
            </button>
          </FadeIn>
        ))}
      </div>
    );
  }
  if (variant === "masonry") {
    return (
      <div className="mt-10 grid auto-rows-[10rem] grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((item, i) => {
          const span =
            item.ratio === "tall"
              ? "row-span-3 col-span-1"
              : item.ratio === "wide"
                ? "row-span-2 col-span-2"
                : "row-span-2 col-span-1";
          return (
            <FadeIn key={item.label} delay={i * 0.06} className={span}>
              <button
                onClick={() => openLightbox(i)}
                className="metal-panel group relative h-full w-full overflow-hidden text-left"
              >
                <GalleryPreviewImage project={project} item={item} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.55))]" />
                <div className="relative z-10 flex h-full flex-col justify-end p-4">
                  <p className="font-display text-sm font-semibold">{item.label}</p>
                </div>
              </button>
            </FadeIn>
          );
        })}
      </div>
    );
  }
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <FadeIn key={item.label} delay={i * 0.06}>
          <button
            onClick={() => openLightbox(i)}
            className="metal-panel group relative aspect-[4/3] w-full overflow-hidden text-left"
          >
            <GalleryPreviewImage project={project} item={item} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.55))]" />
            <div className="relative z-10 flex h-full flex-col justify-end p-5">
              <p className="font-display text-lg font-semibold">{item.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
            </div>
          </button>
        </FadeIn>
      ))}
    </div>
  );
}

function FlipbookEmbed({ embed }: { embed: ProjectFlipbookEmbed }) {
  return (
    <FadeIn delay={0.08}>
      <div className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-[#060708] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <iframe
          title={embed.title}
          src={embed.src}
          allow="clipboard-write"
          allowFullScreen
          scrolling="no"
          loading="lazy"
          className="fp-iframe block h-[600px] w-full border-0 xl:h-[680px]"
        />
      </div>
    </FadeIn>
  );
}

function StickyTOC({ sections }: { sections: SectionDef[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-28">
        <p className="metal-kicker mb-4">Contents</p>
        <ul className="space-y-1 border-l border-white/10 pl-4">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(s.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={cn(
                  "group flex items-center gap-3 py-1.5 text-xs transition-colors",
                  active === s.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[10px] transition-colors",
                    active === s.id ? "text-primary" : "text-white/40",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{s.label}</span>
                {active === s.id && (
                  <motion.span
                    layoutId="toc-dot"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Reusable story blocks
// ---------------------------------------------------------------------------

function EditorialBlock({
  kicker,
  label,
  title,
  body,
}: {
  kicker: string;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <FadeIn>
      <SectionLabel kicker={kicker} label={label} />
      <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
        {accentLastWord(title)}
      </h2>
      <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">{body}</p>
    </FadeIn>
  );
}

function GoalsList({ goals }: { goals: string[] }) {
  return (
    <ul className="mt-10 grid gap-4 md:grid-cols-3">
      {goals.map((g, i) => (
        <FadeIn key={g} delay={i * 0.08}>
          <div className="metal-card h-full p-6">
            <span className="font-mono text-xs text-primary">
              G{String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-4 text-sm leading-7 text-white/85">{g}</p>
          </div>
        </FadeIn>
      ))}
    </ul>
  );
}

function ProcessTimeline({ steps, dense = false }: { steps: Project["process"]; dense?: boolean }) {
  return (
    <ol className="mt-10 space-y-px overflow-hidden rounded-2xl border border-white/10">
      {steps.map((s, i) => (
        <FadeIn key={s.title} delay={i * 0.06}>
          <li
            className={cn(
              "group grid items-start gap-6 bg-background/40 px-6 py-7 transition-colors hover:bg-white/[0.02] md:grid-cols-[6rem_minmax(0,1fr)_minmax(0,2fr)]",
              dense && "py-5",
            )}
          >
            <span className="font-mono text-xs text-primary">
              PH.{String(i + 1).padStart(2, "0")}
            </span>
            <p className="font-display text-xl font-semibold">{s.title}</p>
            <p className="text-sm leading-7 text-muted-foreground">{s.text}</p>
          </li>
        </FadeIn>
      ))}
    </ol>
  );
}

function FocusGrid({ areas, columns = 3 }: { areas: Project["focusAreas"]; columns?: 2 | 3 }) {
  return (
    <div
      className={cn(
        "mt-10 grid gap-5",
        columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {areas.map((area, i) => (
        <FadeIn key={area.title} delay={i * 0.05}>
          <div className="metal-card h-full p-6">
            <span className="font-mono text-xs text-primary">
              .{String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold">{area.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{area.text}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

function ChallengesBlock({ project }: { project: Project }) {
  if (!project.challenges.length) return null;
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-2">
      {project.challenges.map((c, i) => (
        <FadeIn key={c.title} delay={i * 0.08}>
          <div className="metal-card h-full p-6">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-primary">
              <Lightbulb size={12} /> Challenge {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">{c.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{c.challenge}</p>
            <div className="mt-5 rounded-xl border border-primary/25 bg-primary/[0.06] p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary">Solution</p>
              <p className="mt-2 text-sm leading-7 text-white/85">{c.solution}</p>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

function ResultsSection({ project }: { project: Project }) {
  if (!project.impact.length) return null;
  const section = getProjectSection(project, "results");
  const headingByLabel: Record<string, string> = {
    Impact: "Impact in numbers",
    Outcome: "Outcome in numbers",
    Performance: "Performance in numbers",
    Results: "Results in numbers",
  };

  return (
    <SectionAnchor id="results">
      <FadeIn>
        <SectionLabel kicker={section.number} label={section.label} />
        <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
          {accentLastWord(headingByLabel[section.label] ?? "Results in numbers")}
        </h2>
      </FadeIn>
      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-3">
        {project.impact.map((m, i) => (
          <FadeIn key={m.label} delay={i * 0.08}>
            <div className="bg-background/40 p-8">
              <div className="font-display text-5xl font-bold text-gradient md:text-6xl">
                {m.value}
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {m.label}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionAnchor>
  );
}

function ReflectionSection({ project }: { project: Project }) {
  const section = getProjectSection(project, "reflection");

  return (
    <SectionAnchor id="reflection">
      <FadeIn>
        <SectionLabel kicker={section.number} label={section.label} />
        <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
          {accentLastWord("Closing thoughts")}
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
          {project.outcome}
        </p>
      </FadeIn>
    </SectionAnchor>
  );
}

function NextProjectCta({
  project,
  currentProject,
  sectionId,
}: {
  project: Project;
  currentProject: Project;
  sectionId: string;
}) {
  const section = getProjectSection(currentProject, sectionId);

  return (
    <SectionAnchor id={sectionId} className="pt-24">
      <CaseStudyLink
        slug={project.slug}
        aria-label={`Open next case study: ${project.title}`}
        className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-10 md:p-14"
      >
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionLabel kicker={section.number} label={section.label} />
            <h3 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
              {project.title}
              <span className="text-primary"> →</span>
            </h3>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">{project.tag}</p>
          </div>
          <div className="metal-cta inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground">
            View next <ArrowRight size={14} />
          </div>
        </div>
        <div
          aria-hidden
          className={cn(
            "absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br blur-3xl opacity-50 transition-opacity group-hover:opacity-80",
            project.color,
          )}
        />
      </CaseStudyLink>
    </SectionAnchor>
  );
}

// ---------------------------------------------------------------------------
// Template bodies
// ---------------------------------------------------------------------------

type BodyProps = { project: Project; openLightbox: (i: number) => void };
type StructuredBodyProps = BodyProps & {
  sectionMeta: (id: string) => ProjectSectionMeta;
};

function GalleryOnlyBody({ project, openLightbox }: BodyProps) {
  return (
    <SectionAnchor id="showcase" className="pt-16 md:pt-24">
      <FadeIn>
        <SectionLabel kicker="01" label="Gallery" />
        <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
          {accentLastWord("Visual showcase")}
        </h2>
      </FadeIn>
      <GalleryGrid project={project} openLightbox={openLightbox} variant="masonry" />
    </SectionAnchor>
  );
}

function ProductBody({ project, openLightbox }: BodyProps) {
  return (
    <>
      <SectionAnchor id="problem">
        <EditorialBlock
          kicker="03"
          label="Problem"
          title="The problem we set out to solve"
          body={project.overview}
        />
      </SectionAnchor>
      <SectionAnchor id="goals">
        <FadeIn>
          <SectionLabel kicker="04" label="Goals" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("What success looked like")}
          </h2>
        </FadeIn>
        <GoalsList goals={project.goals} />
      </SectionAnchor>
      <SectionAnchor id="process">
        <FadeIn>
          <SectionLabel kicker="05" label="Process" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("From research to refinement")}
          </h2>
        </FadeIn>
        <ProcessTimeline steps={project.process} />
      </SectionAnchor>
      <SectionAnchor id="decisions">
        <FadeIn>
          <SectionLabel kicker="06" label="Decisions" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Choices that shaped the product")}
          </h2>
        </FadeIn>
        <FocusGrid areas={project.focusAreas} />
      </SectionAnchor>
      <SectionAnchor id="showcase">
        <FadeIn>
          <SectionLabel kicker="07" label="Showcase" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Screens in motion")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            Swipe through high-fidelity surfaces. Tap any frame to open the lightbox.
          </p>
        </FadeIn>
        <GalleryGrid project={project} openLightbox={openLightbox} variant="stack" />
      </SectionAnchor>
      <SectionAnchor id="challenges">
        <FadeIn>
          <SectionLabel kicker="08" label="Challenges" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("What we had to solve")}
          </h2>
        </FadeIn>
        <ChallengesBlock project={project} />
      </SectionAnchor>
    </>
  );
}

function DevelopmentBody({ project, openLightbox }: BodyProps) {
  return (
    <>
      <SectionAnchor id="problem">
        <EditorialBlock
          kicker="03"
          label="Problem"
          title="The technical brief"
          body={project.overview}
        />
      </SectionAnchor>
      <SectionAnchor id="stack">
        <FadeIn>
          <SectionLabel kicker="04" label="Stack" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Tools behind the build")}
          </h2>
        </FadeIn>
        <div className="mt-10 flex flex-wrap gap-3">
          {project.tools.map((t, i) => (
            <FadeIn key={t} delay={i * 0.04}>
              <span className="metal-ghost inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium">
                <Layers size={13} className="text-primary" /> {t}
              </span>
            </FadeIn>
          ))}
        </div>
      </SectionAnchor>
      <SectionAnchor id="architecture">
        <FadeIn>
          <SectionLabel kicker="05" label="Architecture" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("How the system fits together")}
          </h2>
        </FadeIn>
        <FocusGrid areas={project.focusAreas} columns={2} />
      </SectionAnchor>
      <SectionAnchor id="process">
        <FadeIn>
          <SectionLabel kicker="06" label="Build" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Phases that shipped the product")}
          </h2>
        </FadeIn>
        <ProcessTimeline steps={project.process} />
      </SectionAnchor>
      <SectionAnchor id="challenges">
        <FadeIn>
          <SectionLabel kicker="07" label="Challenges" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Problems worth solving")}
          </h2>
        </FadeIn>
        <ChallengesBlock project={project} />
      </SectionAnchor>
      <SectionAnchor id="features">
        <FadeIn>
          <SectionLabel kicker="08" label="Features" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Interface and implementation")}
          </h2>
        </FadeIn>
        <GalleryGrid project={project} openLightbox={openLightbox} variant="grid" />
      </SectionAnchor>
    </>
  );
}

function BrandingBody({ project, openLightbox, sectionMeta }: StructuredBodyProps) {
  const story = sectionMeta("story");
  const strategy = sectionMeta("strategy");
  const identity = sectionMeta("identity");
  const applications = sectionMeta("applications");
  const process = sectionMeta("process");
  const challenges = sectionMeta("challenges");

  return (
    <>
      <SectionAnchor id="story">
        <EditorialBlock
          kicker={story.number}
          label={story.label}
          title="The brand story"
          body={project.overview}
        />
      </SectionAnchor>
      <SectionAnchor id="strategy">
        <FadeIn>
          <SectionLabel kicker={strategy.number} label={strategy.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("What the identity had to do")}
          </h2>
        </FadeIn>
        <GoalsList goals={project.goals} />
      </SectionAnchor>
      <SectionAnchor id="identity">
        <FadeIn>
          <SectionLabel kicker={identity.number} label={identity.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Building the visual language")}
          </h2>
        </FadeIn>
        <FocusGrid areas={project.focusAreas} />
      </SectionAnchor>
      <SectionAnchor id="applications">
        <FadeIn>
          <SectionLabel kicker={applications.number} label={applications.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Identity in the wild")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            A masonry view of the system across real applications. Click any tile to expand.
          </p>
        </FadeIn>
        <GalleryGrid project={project} openLightbox={openLightbox} variant="masonry" />
      </SectionAnchor>
      <SectionAnchor id="process">
        <FadeIn>
          <SectionLabel kicker={process.number} label={process.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("From concept to deliverable")}
          </h2>
        </FadeIn>
        <ProcessTimeline steps={project.process} dense />
      </SectionAnchor>
      <SectionAnchor id="challenges">
        <FadeIn>
          <SectionLabel kicker={challenges.number} label={challenges.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Where the system was tested")}
          </h2>
        </FadeIn>
        <ChallengesBlock project={project} />
      </SectionAnchor>
    </>
  );
}

function CreativeBody({ project, openLightbox, sectionMeta }: StructuredBodyProps) {
  const overview = sectionMeta("overview");
  const direction = sectionMeta("direction");
  const assets = sectionMeta("assets");
  const rollout = sectionMeta("rollout");
  const challenges = sectionMeta("challenges");

  return (
    <>
      <SectionAnchor id="overview">
        <EditorialBlock
          kicker={overview.number}
          label={overview.label}
          title="Campaign overview"
          body={project.overview}
        />
      </SectionAnchor>
      <SectionAnchor id="direction">
        <FadeIn>
          <SectionLabel kicker={direction.number} label={direction.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Shaping the visual idea")}
          </h2>
        </FadeIn>
        <FocusGrid areas={project.focusAreas} />
      </SectionAnchor>
      <SectionAnchor id="assets">
        <FadeIn>
          <SectionLabel kicker={assets.number} label={assets.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Magazine-style assembly")}
          </h2>
        </FadeIn>
        <GalleryGrid project={project} openLightbox={openLightbox} variant="masonry" />
      </SectionAnchor>
      <SectionAnchor id="rollout">
        <FadeIn>
          <SectionLabel kicker={rollout.number} label={rollout.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Bringing it to audience")}
          </h2>
        </FadeIn>
        <ProcessTimeline steps={project.process} dense />
      </SectionAnchor>
      <SectionAnchor id="challenges">
        <FadeIn>
          <SectionLabel kicker={challenges.number} label={challenges.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Creative tradeoffs")}
          </h2>
        </FadeIn>
        <ChallengesBlock project={project} />
      </SectionAnchor>
    </>
  );
}

function WritingBody({ project, openLightbox, sectionMeta }: StructuredBodyProps) {
  const overview = sectionMeta("overview");
  const goals = sectionMeta("goals");
  const process = sectionMeta("process");
  const deliverables = sectionMeta("deliverables");
  const focus = sectionMeta("focus");
  const challenges = sectionMeta("challenges");

  return (
    <>
      <SectionAnchor id="overview">
        <EditorialBlock
          kicker={overview.number}
          label={overview.label}
          title="Project overview"
          body={project.overview}
        />
      </SectionAnchor>
      <SectionAnchor id="goals">
        <FadeIn>
          <SectionLabel kicker={goals.number} label={goals.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("What the client needed")}
          </h2>
        </FadeIn>
        <ol className="mt-10 space-y-3">
          {project.goals.map((g, i) => (
            <FadeIn key={g} delay={i * 0.06}>
              <li className="flex items-start gap-5 border-b border-white/8 pb-5">
                <span className="font-mono text-xs text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-8 text-white/85 md:text-lg">{g}</p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </SectionAnchor>
      <SectionAnchor id="process">
        <FadeIn>
          <SectionLabel kicker={process.number} label={process.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("From brief to draft")}
          </h2>
        </FadeIn>
        <ProcessTimeline steps={project.process} dense />
      </SectionAnchor>
      <SectionAnchor id="deliverables">
        <FadeIn>
          <SectionLabel kicker={deliverables.number} label={deliverables.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("What was handed off")}
          </h2>
        </FadeIn>
        {project.flipbookEmbed ? (
          <FlipbookEmbed embed={project.flipbookEmbed} />
        ) : (
          <GalleryGrid project={project} openLightbox={openLightbox} variant="documents" />
        )}
      </SectionAnchor>
      <SectionAnchor id="focus">
        <FadeIn>
          <SectionLabel kicker={focus.number} label={focus.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Where the work went deepest")}
          </h2>
        </FadeIn>
        <FocusGrid areas={project.focusAreas} columns={2} />
      </SectionAnchor>
      <SectionAnchor id="challenges">
        <FadeIn>
          <SectionLabel kicker={challenges.number} label={challenges.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Editorial tradeoffs")}
          </h2>
        </FadeIn>
        <ChallengesBlock project={project} />
      </SectionAnchor>
    </>
  );
}
