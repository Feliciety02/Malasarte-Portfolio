import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MetallicPage } from "@/components/site/MetallicPage";
import { projects, matchesProjectCategory, getProjectsByCategoryFrom } from "@/data/projects";
import type { Project, ProjectCategory } from "@/data/projects";
import { PortfolioBackground } from "@/features/portfolio/PortfolioBackground";
import { PortfolioHero } from "@/features/portfolio/PortfolioHero";
import { CategoryFilterBar } from "@/features/portfolio/CategoryFilterBar";
import type { FilterCategory } from "@/features/portfolio/CategoryFilterBar";
import { FeaturedProject } from "@/features/portfolio/FeaturedProject";
import { PortfolioGallery } from "@/features/portfolio/PortfolioGallery";
import { SocialMediaGraphicsShowcase } from "@/features/portfolio/SocialMediaGraphicsShowcase";

export const Route = createFileRoute("/works")({
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

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

const featuredProjectSlugs: Partial<Record<ProjectCategory, string>> = {
  "UI/UX Design": "adoptify",
  "Logo & Branding": "trichomend-plus",
  "Social Media Graphics": "umsdc-publication-materials-and-assets",
};

function computePortfolioStats(projects: Project[]) {
  const allProjects = getProjectsByCategoryFrom(projects, "All");
  const totalProjects = allProjects.length;

  const uniqueCategories = new Set<ProjectCategory>();
  for (const p of allProjects) {
    uniqueCategories.add(p.cat);
    if (p.categories) {
      for (const c of p.categories) {
        uniqueCategories.add(c);
      }
    }
  }

  const years = allProjects.map((p) => parseInt(p.year, 10)).filter((y) => !isNaN(y));
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const orgs = new Set(allProjects.map((p) => p.client));
  const orgsCount = orgs.size;

  return {
    stats: [
      { value: `${totalProjects}`, label: "Projects" },
      { value: `${uniqueCategories.size}`, label: "Categories" },
      { value: `${maxYear - minYear}+`, label: "Years of Work" },
      { value: `${orgsCount}+`, label: "Organizations Served" },
    ],
  };
}

function Works() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const sourceProjects = projects;
  const [active, setActive] = useState<FilterCategory>("All");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [socialSelectionRequest, setSocialSelectionRequest] = useState<{
    slug: string;
    requestId: number;
  } | null>(null);

  const handleSocialClick = (slug: string) => {
    setActive("Social Media Graphics");
    setSocialSelectionRequest((current) => ({
      slug,
      requestId: (current?.requestId ?? 0) + 1,
    }));
  };
  const handleBackToProjects = () => {
    setActive("All");
    setSocialSelectionRequest(null);
  };
  const { stats } = useMemo(() => computePortfolioStats(sourceProjects), [sourceProjects]);
  const [randomizedAllProjects, setRandomizedAllProjects] = useState<Project[]>([]);
  const filtered = useMemo(
    () => getProjectsByCategoryFrom(sourceProjects, active),
    [sourceProjects, active],
  );
  const allProjects = useMemo(
    () => getProjectsByCategoryFrom(sourceProjects, "All"),
    [sourceProjects],
  );

  useEffect(() => {
    if (active === "All") setRandomizedAllProjects(shuffle(allProjects));
  }, [active, allProjects]);

  const allTabProjects =
    randomizedAllProjects.length === allProjects.length ? randomizedAllProjects : allProjects;

  const featuredProjects = useMemo(() => {
    if (active === "All") return allTabProjects;

    const preferredSlug = featuredProjectSlugs[active as ProjectCategory];
    const preferredIndex = preferredSlug
      ? filtered.findIndex((project) => project.slug === preferredSlug)
      : -1;

    if (preferredIndex <= 0) return filtered;
    return [...filtered.slice(preferredIndex), ...filtered.slice(0, preferredIndex)];
  }, [active, allTabProjects, filtered]);

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
      <PortfolioBackground hoveredCategory={hoveredCategory} />
      <div className="relative z-10 pt-12 md:pt-20 pb-20 sm:pb-28">
        <PortfolioHero stats={stats} />

        <CategoryFilterBar
          active={active}
          onChange={(category) => {
            setActive(category);
            if (category !== "Social Media Graphics") setSocialSelectionRequest(null);
          }}
          onHover={setHoveredCategory}
        />

        {featuredProject ? (
          <FeaturedProject
            project={featuredProject}
            activeCategory={active}
            onSocialClick={handleSocialClick}
          />
        ) : null}

        {active === "All" ? (
          <PortfolioGallery
            projects={allTabProjects}
            activeCategory="All"
            onSocialClick={handleSocialClick}
          />
        ) : active === "Social Media Graphics" ? (
          <SocialMediaGraphicsShowcase
            projects={filtered}
            requestedSlug={socialSelectionRequest?.slug}
            requestId={socialSelectionRequest?.requestId}
          />
        ) : filtered.length > 0 ? (
          <PortfolioGallery
            projects={filtered}
            activeCategory={active}
            onSocialClick={handleSocialClick}
            onBackToProjects={handleBackToProjects}
          />
        ) : null}
      </div>
    </MetallicPage>
  );
}
