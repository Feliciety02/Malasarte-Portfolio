import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { FileText, Globe, ImageIcon, PenTool } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { MetallicPage } from "@/components/site/MetallicPage";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { TagPill } from "@/components/site/TagPill";
import { getProjectCoverImage } from "@/data/projectImages";
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
      { title: "Works - Fe Anne Malasarte" },
      {
        name: "description",
        content:
          "Selected works across UI/UX, branding, social media graphics, creative assets, web development, and writing.",
      },
      { property: "og:title", content: "Works - Fe Anne Malasarte" },
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
    <MetallicPage variant="works" className="px-6 pb-28">
      <section className="mx-auto max-w-7xl pt-12 md:pt-20">
        <Reveal>
          <SectionHeader
            eyebrow="Portfolio"
            title="Selected Works"
            description="A growing collection of work across product design, branding, social media graphics, creative assets, web development, and writing."
            contentClassName="max-w-2xl"
            titleClassName="text-4xl sm:text-5xl md:text-7xl"
            descriptionClassName="leading-7"
            titleTag="h1"
          />
        </Reveal>

        <div className="metal-rail mt-10" />

        <div className="thin-x-scrollbar mt-8 -mx-1 overflow-x-auto pb-2 pt-1">
          <div className="mb-2 flex w-max min-w-full gap-2 px-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all sm:px-5 sm:text-sm ${
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
          className="mt-5 max-w-3xl text-sm leading-6 text-muted-foreground"
        >
          {categoryDescriptions[active]}
        </motion.p>

        <motion.div
          layout
          className={cn("mt-12 grid gap-5 md:mt-14 md:gap-6", getWorkGridClass(active))}
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

  return <ProjectCard project={project} activeCategory={activeCategory} />;
}

function GalleryWorkCard({
  project,
  activeCategory,
}: {
  project: Project;
  activeCategory: ProjectCategory;
}) {
  const title = getProjectDisplayTitle(project, activeCategory);
  const pill = getProjectCategoryLabel(project, activeCategory);

  return (
    <CaseStudyLink
      slug={project.slug}
      aria-label={`Open ${title} gallery`}
      className="metal-panel group relative block min-h-[17rem] overflow-hidden rounded-lg"
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
      <div className="relative z-10 flex h-full min-h-[17rem] flex-col justify-end p-5">
        <ImageIcon size={18} className="mb-4 text-white/70" />
        <h3 className="font-display text-2xl font-semibold leading-tight">{title}</h3>
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
  const title = getProjectDisplayTitle(project, activeCategory);
  const pill = getProjectCategoryLabel(project, activeCategory);

  return (
    <CaseStudyLink
      slug={project.slug}
      aria-label={`Open ${title} identity work`}
      className="metal-card group relative flex min-h-[18rem] flex-col overflow-hidden p-6"
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
      <div className="relative z-10 mt-auto pt-12">
        <p className="metal-kicker mb-4">{project.tag}</p>
        <h3 className="font-display text-3xl font-semibold leading-tight">{title}</h3>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">{project.desc}</p>
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
  const title = getProjectDisplayTitle(project, activeCategory);
  const pill = getProjectCategoryLabel(project, activeCategory);

  return (
    <CaseStudyLink
      slug={project.slug}
      aria-label={`Open ${title} web development work`}
      className="metal-card group grid min-h-[15rem] gap-6 p-6 sm:grid-cols-[4rem_minmax(0,1fr)]"
    >
      <div className="metal-ghost grid h-16 w-16 place-items-center rounded-lg text-primary">
        <Globe size={24} />
      </div>
      <div>
        <TagPill className="static">{pill}</TagPill>
        <h3 className="mt-5 font-display text-3xl font-semibold leading-tight">{title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{project.desc}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tools.slice(0, 4).map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/72"
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
      aria-label={`Open ${title} writing work`}
      className="metal-card group grid min-h-[15rem] gap-6 p-6 sm:grid-cols-[8.5rem_minmax(0,1fr)] lg:grid-cols-[9.5rem_minmax(0,1fr)]"
    >
      <div className="metal-ghost relative aspect-[3/4] min-h-44 overflow-hidden rounded-md border border-white/12 bg-gradient-to-br from-white/[0.08] via-white/[0.025] to-transparent text-primary">
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
        <h3 className="mt-5 font-display text-2xl font-semibold leading-tight">{title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{project.desc}</p>
      </div>
    </CaseStudyLink>
  );
}
