import { ArrowUpRight, ExternalLink } from "lucide-react";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { TagPill } from "@/components/site/TagPill";
import { getProjectCoverImage } from "@/data/projectImages";
import { getProjectDisplayTitle, getProjectCategoryLabel } from "@/data/projects";
import type { Project, ProjectFilter } from "@/data/projects";
import { getRouteCategoryForProject } from "@/features/case-study/templates/templateRegistry";
import { cn } from "@/lib/utils";
import { SocialMediaBentoPreview } from "./SocialMediaBentoPreview";

type FeaturedProjectProps = {
  project: Project;
  activeCategory?: ProjectFilter;
  onSocialClick?: (slug: string) => void;
};

const featuredImageAspect: Record<string, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[16/9]",
  large: "aspect-[16/9]",
  medium: "aspect-[4/3]",
};

export function FeaturedProject({
  project,
  activeCategory = project.cat,
  onSocialClick,
}: FeaturedProjectProps) {
  const coverImage = getProjectCoverImage(project);
  const title = getProjectDisplayTitle(project, activeCategory);
  const pill = getProjectCategoryLabel(project, activeCategory);
  const isBranding = activeCategory === "Logo & Branding";
  const aspect = isBranding ? "aspect-square" : featuredImageAspect[project.cardSize ?? "medium"];
  const isSocial =
    project.cat === "Social Media Graphics" ||
    project.categories?.includes("Social Media Graphics");
  const liveUrl = project.vercelLiveUrl?.trim();

  return (
    <section className="relative z-10 mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6">
      <span className="metal-kicker">Featured Project</span>

      <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl md:text-5xl">
            {title}
          </h2>

          <p className="mt-4 text-[14px] leading-7 text-muted-foreground sm:text-[15px] sm:leading-8">
            {project.desc}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {isSocial && onSocialClick ? (
              <button
                type="button"
                onClick={() => onSocialClick(project.slug)}
                className="group inline-flex items-center gap-2 rounded-xl border border-yellow/30 bg-yellow/5 px-5 py-2.5 text-[13px] font-medium text-yellow transition-all duration-300 hover:bg-yellow/10 hover:shadow-[0_0_30px_-8px_rgba(255,215,0,0.3)] sm:text-sm"
              >
                View Project
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            ) : (
              <>
                <CaseStudyLink
                  slug={project.slug}
                  routeCategory={getRouteCategoryForProject(project)}
                  className="group inline-flex items-center gap-2 rounded-xl border border-yellow/30 bg-yellow/5 px-5 py-2.5 text-[13px] font-medium text-yellow transition-all duration-300 hover:bg-yellow/10 hover:shadow-[0_0_30px_-8px_rgba(255,215,0,0.3)] sm:text-sm"
                >
                  View Case Study
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </CaseStudyLink>
                {liveUrl ? (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium text-white/70 transition-all duration-300 hover:border-yellow/20 hover:bg-yellow/[0.06] hover:text-yellow sm:text-sm"
                  >
                    <ExternalLink size={15} />
                    Live Preview
                  </a>
                ) : null}
              </>
            )}
          </div>
        </div>

        <div
          className={cn(
            "metal-card group relative overflow-hidden rounded-2xl",
            !isSocial && "p-5 sm:p-6",
            isBranding && "bg-white",
            aspect,
          )}
        >
          {isSocial ? (
            <SocialMediaBentoPreview
              project={project}
              fallbackImage={coverImage}
              className="rounded-[inherit]"
            />
          ) : coverImage ? (
            <img
              src={coverImage}
              alt={`${title} preview`}
              className={cn(
                "h-full w-full object-contain transition-transform duration-700 group-hover:scale-105",
                isBranding && "p-4 sm:p-6",
              )}
            />
          ) : null}

          {!isBranding ? (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          ) : null}

          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-yellow/30 bg-yellow/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-yellow/90 backdrop-blur-sm transition-all hover:bg-yellow/20 hover:text-yellow"
            >
              <ExternalLink size={11} />
              Live
            </a>
          ) : null}

          <TagPill>{pill}</TagPill>
        </div>
      </div>
    </section>
  );
}
