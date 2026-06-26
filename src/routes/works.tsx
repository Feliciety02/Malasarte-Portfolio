import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MetallicPage } from "@/components/site/MetallicPage";
import { projects, matchesProjectCategory, getProjectsByCategoryFrom } from "@/data/projects";
import type { Project, ProjectCategory } from "@/data/projects";
import { BrushedMetalBackground } from "@/components/site/BrushedMetalBackground";
import { PortfolioBackground } from "@/features/portfolio/PortfolioBackground";
import { PortfolioHero } from "@/features/portfolio/PortfolioHero";
import { CategoryFilterBar } from "@/features/portfolio/CategoryFilterBar";
import type { FilterCategory } from "@/features/portfolio/CategoryFilterBar";
import { PortfolioGallery } from "@/features/portfolio/PortfolioGallery";
import { SocialMediaGraphicsShowcase } from "@/features/portfolio/SocialMediaGraphicsShowcase";
import {
  buildBreadcrumbSchema,
  buildCanonicalLinks,
  buildCollectionSchema,
  buildPageSchema,
  buildSeoMeta,
} from "@/lib/seo";
import { getProjectPath } from "@/features/case-study/routes/getProjectPath";
import { fetchPortfolioProjectsFromSupabase } from "@/data/supabaseProjects";

export const Route = createFileRoute("/works")({
  loader: async () => {
    const remoteProjects = await fetchPortfolioProjectsFromSupabase();
    return {
      projects: remoteProjects ?? projects,
    };
  },
  head: () => ({
    meta: buildSeoMeta({
      title: "Works",
      description:
        "Browse case studies and selected works by Fe Anne Malasarte across UI/UX design, branding, social media graphics, creative assets, software development, and writing.",
      path: "/works",
      keywords: [
        "design portfolio case studies",
        "UI UX case studies",
        "branding portfolio",
        "social media graphics portfolio",
      ],
      schemas: [
        buildPageSchema({
          type: "CollectionPage",
          name: "Works",
          description:
            "Browse case studies and selected works by Fe Anne Malasarte across UI/UX design, branding, social media graphics, creative assets, software development, and writing.",
          path: "/works",
        }),
        buildCollectionSchema({
          name: "Selected Works by Fe Anne Malasarte",
          description:
            "A collection of portfolio case studies covering UI/UX design, branding, software development, creative assets, and writing.",
          path: "/works",
          items: projects.map((project) => ({
            name: project.title,
            path: getProjectPath(project),
          })),
        }),
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Works", path: "/works" },
        ]),
      ],
    }),
    links: buildCanonicalLinks("/works"),
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
  "Creative Assets": "umsdc-creative-assets",
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
  const loaderData = Route.useLoaderData();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const sourceProjects = loaderData.projects;
  const [active, setActive] = useState<FilterCategory>("All");
  const [search, setSearch] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [socialSelectionRequest, setSocialSelectionRequest] = useState<{
    slug: string;
    requestId: number;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category") as FilterCategory | null;
    const slug = params.get("slug");
    if (cat && slug && (cat === "Social Media Graphics" || cat === "Creative Assets")) {
      setActive(cat);
      setSocialSelectionRequest({ slug, requestId: 1 });
    }
  }, []);

  const handleSocialClick = (slug: string) => {
    const clickedProject = sourceProjects.find((project) => project.slug === slug);
    const targetCategory =
      clickedProject?.cat === "Creative Assets" ||
      clickedProject?.categories?.includes("Creative Assets")
        ? "Creative Assets"
        : "Social Media Graphics";

    setActive(targetCategory);
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
  const searchedProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return sourceProjects;

    return sourceProjects.filter((project) => {
      const searchableFields = [
        project.title,
        project.desc,
        project.client,
        project.year,
        project.cat,
        ...(project.categories ?? []),
        ...project.tools,
      ];

      return searchableFields.some((value) => value.toLowerCase().includes(query));
    });
  }, [sourceProjects, search]);
  const filtered = useMemo(
    () => getProjectsByCategoryFrom(searchedProjects, active),
    [searchedProjects, active],
  );
  const allProjects = useMemo(
    () => getProjectsByCategoryFrom(searchedProjects, "All"),
    [searchedProjects],
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
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.6]" aria-hidden>
        <BrushedMetalBackground />
      </div>
      <PortfolioBackground hoveredCategory={hoveredCategory} />

      <div className="relative z-10 pt-12 md:pt-20 pb-20 sm:pb-28">
        <PortfolioHero
          stats={stats}
          featuredProject={featuredProject}
          activeCategory={active}
          onSocialClick={handleSocialClick}
        />

        <CategoryFilterBar
          active={active}
          onChange={(category) => {
            setActive(category);
            if (category !== "Social Media Graphics" && category !== "Creative Assets") {
              setSocialSelectionRequest(null);
            }
          }}
          onHover={setHoveredCategory}
          search={search}
          onSearchChange={setSearch}
        />

        {active === "All" ? (
          <PortfolioGallery
            projects={allTabProjects}
            activeCategory="All"
            onSocialClick={handleSocialClick}
          />
        ) : active === "Social Media Graphics" || active === "Creative Assets" ? (
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
