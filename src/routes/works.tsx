import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MetallicPage } from "@/components/site/MetallicPage";
import { projects } from "@/data/projects";
import { getProjectsByCategoryFrom } from "@/data/projects";
import type { Project, ProjectCategory } from "@/data/projects";
import { fetchPortfolioProjectsFromSupabase } from "@/data/supabaseProjects";
import { PortfolioBackground } from "@/features/portfolio/PortfolioBackground";
import { PortfolioHero } from "@/features/portfolio/PortfolioHero";
import { CategoryFilterBar } from "@/features/portfolio/CategoryFilterBar";
import type { FilterCategory } from "@/features/portfolio/CategoryFilterBar";
import { FeaturedProject } from "@/features/portfolio/FeaturedProject";
import { PortfolioGallery } from "@/features/portfolio/PortfolioGallery";
import { SocialMediaGraphicsShowcase } from "@/features/portfolio/SocialMediaGraphicsShowcase";

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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const featuredProjectSlugs: Partial<Record<ProjectCategory, string>> = {
  "UI/UX Design": "adoptify",
  "Logo & Branding": "trichomend-plus",
  "Social Media Graphics": "umsdc-publication-materials-and-assets",
};

function Works() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const loadedProjects = Route.useLoaderData();
  const sourceProjects = loadedProjects ?? projects;
  const [active, setActive] = useState<FilterCategory>("All");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const filtered = useMemo(
    () => getProjectsByCategoryFrom(sourceProjects, active),
    [sourceProjects, active],
  );

  const allShuffled = useMemo(() => shuffle(sourceProjects), [sourceProjects]);

  const featuredProjects = useMemo(() => {
    const preferredSlug =
      active === "All" ? undefined : featuredProjectSlugs[active as ProjectCategory];
    const preferredIndex = preferredSlug
      ? filtered.findIndex((project) => project.slug === preferredSlug)
      : -1;

    if (preferredIndex <= 0) return filtered;
    return [...filtered.slice(preferredIndex), ...filtered.slice(0, preferredIndex)];
  }, [active, filtered]);

  const featuredProjectSignature = useMemo(
    () => featuredProjects.map((project) => project.slug).join("|"),
    [featuredProjects],
  );

  useEffect(() => {
    setFeaturedIndex(0);
  }, [active, featuredProjectSignature]);

  useEffect(() => {
    if (pathname !== "/works" || featuredProjects.length <= 1) return;

    const interval = window.setInterval(() => {
      setFeaturedIndex((current) => (current + 1) % featuredProjects.length);
    }, 10_000);

    return () => window.clearInterval(interval);
  }, [pathname, active, featuredProjects.length]);

  const featuredProject =
    featuredProjects.length > 0
      ? featuredProjects[featuredIndex % featuredProjects.length]
      : undefined;

  if (pathname !== "/works") {
    return <Outlet />;
  }

  return (
    <MetallicPage variant="works" className="relative px-0">
      <PortfolioBackground />
      <div className="relative z-10 pt-12 md:pt-20 pb-20 sm:pb-28">
        <PortfolioHero />

        <CategoryFilterBar active={active} onChange={setActive} />

        <p className="mx-auto mt-6 max-w-7xl px-4 text-[13px] leading-6 text-muted-foreground sm:px-6 sm:text-sm">
          {active === "All"
            ? `${allShuffled.length} projects across every category.`
            : filtered.length > 0
              ? `${filtered.length} project${filtered.length === 1 ? "" : "s"} in ${active}`
              : `No projects in ${active}`}
        </p>

        {featuredProject ? (
          <FeaturedProject project={featuredProject} activeCategory={active} />
        ) : null}

        {active === "All" ? (
          <PortfolioGallery projects={allShuffled} activeCategory="All" />
        ) : active === "Social Media Graphics" ? (
          <SocialMediaGraphicsShowcase projects={filtered} />
        ) : filtered.length > 0 ? (
          <PortfolioGallery projects={filtered} activeCategory={active} />
        ) : null}
      </div>
    </MetallicPage>
  );
}
