import { useRef, useCallback } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { getProjectCoverImage } from "@/data/projectImages";
import { getProjectDisplayTitle } from "@/data/projects";
import type { Project, ProjectFilter } from "@/data/projects";
import { getRouteCategoryForProject } from "@/features/case-study/templates/templateRegistry";
import { cn } from "@/lib/utils";

export type CardSize = "large" | "tall" | "wide" | "medium";

type PortfolioProjectCardProps = {
  project: Project;
  activeCategory?: ProjectFilter;
  size: CardSize;
  onSocialClick?: (slug: string) => void;
};

const sizeClasses: Record<CardSize, string> = {
  large: "md:col-span-2 md:row-span-2",
  tall: "md:row-span-2",
  wide: "md:col-span-2",
  medium: "",
};

const imageAspect: Record<CardSize, string> = {
  large: "aspect-video",
  tall: "aspect-video",
  wide: "aspect-video",
  medium: "aspect-video",
};

export function PortfolioProjectCard({
  project,
  activeCategory = "All",
  size,
  onSocialClick,
}: PortfolioProjectCardProps) {
  const coverImage = getProjectCoverImage(project);
  const title = getProjectDisplayTitle(project, activeCategory);
  const cardRef = useRef<HTMLDivElement>(null);

  const isBranding = project.cat === "Logo & Branding";
  const isBrandingRecommendation = activeCategory === "Logo & Branding";
  const isBook = activeCategory === "Writing / VA" || project.cat === "Writing / VA";
  const isCoverFit = project.cat === "UI/UX Design" || project.cat === "Web Development";
  const brandingExcluded = ["Miro", "FigJam", "Illustrator", "Photoshop", "Canva"];
  const displayTools = isBranding
    ? project.tools.filter((t) => !brandingExcluded.includes(t))
    : project.tools;
  const isSocial =
    project.cat === "Social Media Graphics" ||
    project.categories?.includes("Social Media Graphics");
  const isWebDev = project.cat === "Web Development" || activeCategory === "Web Development";
  const liveUrl = project.vercelLiveUrl?.trim();

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }, []);

  const cardContent = (
    <div
      ref={cardRef}
      onMouseMove={handleMouse}
      className={cn(
        "metal-card group relative h-full overflow-hidden rounded-2xl",
        "transition-transform duration-500 ease-out will-change-transform",
        "hover:-translate-y-0.5",
      )}
    >
      {isBrandingRecommendation ? (
        <div className="flex h-full flex-col">
          <div className="relative h-[65%] shrink-0 overflow-hidden bg-white">
            {coverImage ? (
              <div className="flex h-full w-full items-center justify-center p-6 sm:p-8">
                <img
                  src={coverImage}
                  alt={`${title} preview`}
                  className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-[11px] uppercase tracking-[0.15em] text-black/45">
                  Preview
                </span>
              </div>
            )}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/80 to-transparent"
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col bg-black/80 p-4">
            <h3 className="line-clamp-2 font-display text-lg font-bold leading-tight sm:text-xl">
              {title}
            </h3>

            <p className="mt-2 line-clamp-1 text-[12px] leading-5 text-muted-foreground sm:text-[13px]">
              {project.desc}
            </p>
          </div>
        </div>
      ) : isBook ? (
        <div className="flex h-full flex-col sm:flex-row">
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:h-auto sm:w-[25%]">
            {coverImage ? (
              <img
                src={coverImage}
                alt={`${title} preview`}
                className="h-full w-full object-contain p-3 transition-transform duration-700 group-hover:scale-[1.03] sm:p-4"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  Preview
                </span>
              </div>
            )}

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"
            />
          </div>

          <div className="flex flex-col gap-2 p-4 sm:w-[75%] sm:p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl">{title}</h3>
              <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.15em] text-yellow/60 sm:text-xs">
                {project.year}
              </span>
            </div>

            <p className="line-clamp-2 text-[13px] leading-6 text-muted-foreground sm:text-[14px] sm:leading-7">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {displayTools.slice(0, 5).map((tool) => (
                <span
                  key={tool}
                  className="metal-ghost inline-block rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] sm:px-3 sm:text-[10px]"
                >
                  {tool}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-end">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-yellow/70 transition-colors duration-300 group-hover:text-yellow sm:text-sm">
                View Project
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px"
                />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="relative overflow-hidden">
            <div className={cn("aspect-video w-full", isBranding && "bg-white")}>
              {coverImage ? (
                <div
                  className={cn(
                    "flex h-full w-full items-center justify-center",
                    isCoverFit ? "" : "p-6 sm:p-8",
                  )}
                >
                  <img
                    src={coverImage}
                    alt={`${title} preview`}
                    className={cn(
                      "transition-transform duration-700 group-hover:scale-[1.03]",
                      isCoverFit
                        ? "h-full w-full object-cover"
                        : "max-h-full max-w-full object-contain",
                    )}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                    Preview
                  </span>
                </div>
              )}
            </div>

            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0",
                isBranding
                  ? "hidden"
                  : "bg-gradient-to-t from-black/30 via-transparent to-transparent",
              )}
            />

            {isWebDev && liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-yellow/30 bg-yellow/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-yellow/90 backdrop-blur-sm transition-colors duration-300 hover:bg-yellow/20 hover:text-yellow"
              >
                <ExternalLink size={11} />
                Live
              </a>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 px-4 pb-4 pt-2 sm:px-5 sm:pb-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl">{title}</h3>
              <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.15em] text-yellow/60 sm:text-xs">
                {project.year}
              </span>
            </div>

            <p className="line-clamp-2 text-[13px] leading-6 text-muted-foreground sm:text-[14px] sm:leading-7">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {displayTools.slice(0, 5).map((tool) => (
                <span
                  key={tool}
                  className="metal-ghost inline-block rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] sm:px-3 sm:text-[10px]"
                >
                  {tool}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-end">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-yellow/70 transition-colors duration-300 group-hover:text-yellow sm:text-sm">
                View Project
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px"
                />
              </span>
            </div>
          </div>
        </>
      )}

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(255, 215, 0, 0.04), transparent 50%)",
        }}
      />
    </div>
  );

  return (
    <div className={cn(sizeClasses[size], isBrandingRecommendation && "aspect-square")}>
      {isSocial && onSocialClick ? (
        <button
          type="button"
          onClick={() => onSocialClick(project.slug)}
          className="block h-full w-full text-left"
        >
          {cardContent}
        </button>
      ) : (
        <CaseStudyLink
          slug={project.slug}
          routeCategory={getRouteCategoryForProject(project)}
          aria-label={`View ${title} case study`}
          className="block h-full"
        >
          {cardContent}
        </CaseStudyLink>
      )}
    </div>
  );
}
