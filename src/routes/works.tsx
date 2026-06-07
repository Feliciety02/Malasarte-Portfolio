import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { FileText, ImageIcon, PenTool } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { MetallicPage } from "@/components/site/MetallicPage";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { TagPill } from "@/components/site/TagPill";
import { getProjectCoverImage, getProjectGalleryImage } from "@/data/projectImages";
import {
  categoryDescriptions,
  getProjectCategoryLabel,
  getProjectDisplayTitle,
  getProjectsByCategoryFrom,
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { fetchPortfolioProjectsFromSupabase } from "@/data/supabaseProjects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/works")({
  loader: async () => fetchPortfolioProjectsFromSupabase(),
  head: () => ({
    meta: [
      { title: "Fe Anne Malasarte" },
      {
        name: "description",
        content:
          "Selected works across UI/UX, branding, social media graphics, creative assets, web development, and writing.",
      },
      { property: "og:title", content: "Fe Anne Malasarte" },
      {
        property: "og:description",
        content: "A curated portfolio of designs, brand systems, and creative work.",
      },
    ],
  }),
  component: Works,
});

const categories = [
  "UI/UX Design",
  "Social Media Graphics",
  "Creative Assets",
  "Logo & Branding",
  "Web Development",
  "Writing / VA",
] as const satisfies readonly ProjectCategory[];

function Works() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const loadedProjects = Route.useLoaderData();
  const sourceProjects = loadedProjects ?? projects;
  const [active, setActive] = useState<ProjectCategory>("UI/UX Design");
  const filtered = getProjectsByCategoryFrom(sourceProjects, active);

  if (pathname !== "/works") {
    return <Outlet />;
  }

  return (
    <MetallicPage variant="works" className="px-4 pb-20 sm:px-6 sm:pb-28">
      <section className="mx-auto max-w-7xl pt-10 md:pt-20">
        <Reveal>
          <SectionHeader
            eyebrow="Portfolio"
            title="Selected Works"
            description="A growing collection of work across product design, branding, social media graphics, creative assets, web development, and writing."
            contentClassName="max-w-2xl"
            titleClassName="text-3xl sm:text-5xl md:text-7xl"
            descriptionClassName="leading-6 sm:leading-7"
            titleTag="h1"
          />
        </Reveal>

        <div className="metal-rail mt-8 sm:mt-10" />

        <div className="thin-x-scrollbar mt-6 -mx-1 overflow-x-auto pb-2 pt-1 sm:mt-8">
          <div className="mb-2 flex w-max min-w-full gap-2 px-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`relative whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-medium transition-all sm:px-5 sm:text-sm ${
                  active === category
                    ? "metal-cta text-primary-foreground"
                    : "metal-ghost text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.p
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-4 max-w-3xl text-[13px] leading-6 text-muted-foreground sm:mt-5 sm:text-sm"
        >
          {categoryDescriptions[active]}
        </motion.p>

        <motion.div
          layout
          className={cn(
            "mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:mt-14 md:gap-6",
            getWorkGridClass(active),
          )}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, y: 24, clipPath: "inset(18% 0 18% 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0% 0)" }}
                exit={{ opacity: 0, scale: 0.98, clipPath: "inset(12% 0 12% 0)" }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
              >
                <CategoryWorkCard project={project} activeCategory={active} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </MetallicPage>
  );
}

function getWorkGridClass(active: ProjectCategory) {
  if (active === "Social Media Graphics" || active === "Creative Assets") {
    return "sm:grid-cols-2 lg:grid-cols-4";
  }
  if (active === "Web Development" || active === "Writing / VA") return "lg:grid-cols-2";
  return "md:grid-cols-2 lg:grid-cols-3";
}

function CategoryWorkCard({
  project,
  activeCategory,
}: {
  project: Project;
  activeCategory: ProjectCategory;
}) {
  if (activeCategory === "Social Media Graphics" || activeCategory === "Creative Assets") {
    return <GalleryWorkCard project={project} activeCategory={activeCategory} />;
  }
  if (activeCategory === "Logo & Branding") {
    return <BrandingWorkCard project={project} activeCategory={activeCategory} />;
  }
  if (activeCategory === "Web Development") {
    return <DevelopmentWorkCard project={project} activeCategory={activeCategory} />;
  }
  if (activeCategory === "Writing / VA") {
    return <WritingWorkCard project={project} activeCategory={activeCategory} />;
  }
  if (activeCategory === "UI/UX Design") {
    return <UxWorkCard project={project} activeCategory={activeCategory} />;
  }

  return <ProjectCard project={project} activeCategory={activeCategory} />;
}

function UxWorkCard({
  project,
  activeCategory,
}: {
  project: Project;
  activeCategory: ProjectCategory;
}) {
  const figmaImage =
    project.gallery.length > 0 ? getProjectGalleryImage(project, project.gallery[0]) : undefined;
  const title = getProjectDisplayTitle(project, activeCategory);
  const pill = getProjectCategoryLabel(project, activeCategory);

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.995 }} className="h-full">
      <CaseStudyLink
        slug={project.slug}
        category={activeCategory}
        aria-label={`Open ${title} work`}
        className="metal-card work-card group relative flex h-full flex-col"
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/8 bg-gradient-to-br from-white/10 to-white/[0.02]">
          {figmaImage ? (
            <img
              src={figmaImage}
              alt={`${title} design preview`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : null}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,12,0.08),rgba(10,11,12,0.03)_42%,rgba(4,5,6,0.24)_100%)]"
          />
          <TagPill>{pill}</TagPill>
        </div>
        <div className="relative z-10 flex flex-1 flex-col p-4 sm:p-6">
          <h3 className="font-display text-xl font-semibold leading-tight sm:text-2xl">{title}</h3>
          <p className="mt-3 line-clamp-2 text-[13px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
            {project.desc}
          </p>
        </div>
      </CaseStudyLink>
    </motion.div>
  );
}

function GalleryWorkCard({
  project,
  activeCategory,
}: {
  project: Project;
  activeCategory: ProjectCategory;
}) {
  const coverImage = getProjectCoverImage(project);
  const title = getProjectDisplayTitle(project, activeCategory);
  const pill = getProjectCategoryLabel(project, activeCategory);

  return (
    <CaseStudyLink
      slug={project.slug}
      category={activeCategory}
      aria-label={`Open ${title} gallery`}
      className="metal-panel group relative block min-h-[14rem] overflow-hidden rounded-lg sm:min-h-[17rem]"
    >
      {coverImage ? (
        <img
          src={coverImage}
          alt={`${title} gallery cover`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
      ) : null}
      <div className={cn("absolute inset-0 bg-gradient-to-br", project.color)} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.64))]" />
      <TagPill className="left-4 top-4">{pill}</TagPill>
      <div className="relative z-10 flex h-full min-h-[14rem] flex-col justify-end p-4 sm:min-h-[17rem] sm:p-5">
        <ImageIcon size={18} className="mb-3 text-white/70 sm:mb-4" />
        <h3 className="font-display text-xl font-semibold leading-tight sm:text-2xl">{title}</h3>
      </div>
    </CaseStudyLink>
  );
}

function BrandingWorkCard({
  project,
  activeCategory,
}: {
  project: Project;
  activeCategory: ProjectCategory;
}) {
  const coverImage = getProjectCoverImage(project);
  const title = getProjectDisplayTitle(project, activeCategory);
  const pill = getProjectCategoryLabel(project, activeCategory);

  return (
    <CaseStudyLink
      slug={project.slug}
      category={activeCategory}
      aria-label={`Open ${title} identity work`}
      className="metal-card group relative flex min-h-[22rem] flex-col overflow-hidden p-4 sm:min-h-[27rem] sm:p-6"
    >
      <div
        aria-hidden
        className={cn(
          "absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br opacity-45 blur-3xl transition-opacity group-hover:opacity-70",
          project.color,
        )}
      />
      <div className="relative z-10 flex items-center justify-between gap-4">
        <TagPill className="static">{pill}</TagPill>
        <PenTool size={18} className="text-primary" />
      </div>

      <div className="relative z-10 mx-auto mt-6 flex aspect-square w-full max-w-[13.5rem] items-center justify-center overflow-hidden rounded-md bg-white/[0.94] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)] sm:mt-8 sm:max-w-[19rem] sm:p-4">
        {coverImage ? (
          <img
            src={coverImage}
            alt={`${title} logo`}
            className="max-h-[96%] max-w-[96%] object-contain transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <PenTool size={30} className="text-primary" />
        )}
      </div>

      <div className="relative z-10 mt-auto pt-6 sm:pt-8">
        <p className="metal-kicker mb-3 sm:mb-4">{project.tag}</p>
        <h3 className="font-display text-2xl font-semibold leading-tight sm:text-3xl">{title}</h3>
        <p className="mt-3 line-clamp-2 text-[13px] leading-5 text-muted-foreground sm:mt-4 sm:text-sm sm:leading-6">
          {project.desc}
        </p>
      </div>
    </CaseStudyLink>
  );
}

function DevelopmentWorkCard({
  project,
  activeCategory,
}: {
  project: Project;
  activeCategory: ProjectCategory;
}) {
  const coverImage = getProjectCoverImage(project);
  const title = getProjectDisplayTitle(project, activeCategory);
  const pill = getProjectCategoryLabel(project, activeCategory);

  return (
    <CaseStudyLink
      slug={project.slug}
      category={activeCategory}
      aria-label={`Open ${title} web development work`}
      className="metal-card group p-4 sm:p-6"
    >
      <div>
        <TagPill className="static">{pill}</TagPill>
        <h3 className="mt-4 font-display text-2xl font-semibold leading-tight sm:mt-5 sm:text-3xl">
          {title}
        </h3>
        {coverImage ? (
          <div className="mt-4 overflow-hidden rounded-md border border-white/10 bg-white/[0.04] sm:mt-5">
            <img
              src={coverImage}
              alt={`${title} landing page preview`}
              className="aspect-[16/9] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        ) : null}
        <p className="mt-3 line-clamp-2 text-[13px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
          {project.desc}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/72 sm:px-3 sm:text-xs"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </CaseStudyLink>
  );
}

function WritingWorkCard({
  project,
  activeCategory,
}: {
  project: Project;
  activeCategory: ProjectCategory;
}) {
  const coverImage = getProjectCoverImage(project);
  const title = getProjectDisplayTitle(project, activeCategory);
  const pill = getProjectCategoryLabel(project, activeCategory);

  return (
    <CaseStudyLink
      slug={project.slug}
      category={activeCategory}
      aria-label={`Open ${title} writing work`}
      className="metal-card group grid min-h-[12.5rem] gap-4 p-4 sm:min-h-[15rem] sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6 sm:p-6 lg:grid-cols-[9.5rem_minmax(0,1fr)]"
    >
      <div className="metal-ghost relative aspect-[3/4] min-h-36 overflow-hidden rounded-md border border-white/12 bg-gradient-to-br from-white/[0.08] via-white/[0.025] to-transparent text-primary sm:min-h-44">
        {coverImage ? (
          <img
            src={coverImage}
            alt={`${title} book cover`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : null}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            coverImage ? "opacity-10" : "opacity-45",
            project.color,
          )}
        />
        {coverImage ? null : (
          <>
            <div aria-hidden className="absolute inset-3 rounded border border-white/14" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
              <FileText size={26} />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/58">
                Book Cover
              </span>
            </div>
          </>
        )}
      </div>
      <div className="min-w-0 self-center">
        <TagPill className="static">{pill}</TagPill>
        <h3 className="mt-4 font-display text-xl font-semibold leading-tight sm:mt-5 sm:text-2xl">
          {title}
        </h3>
        <p className="mt-3 line-clamp-3 text-[13px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
          {project.desc}
        </p>
      </div>
    </CaseStudyLink>
  );
}
