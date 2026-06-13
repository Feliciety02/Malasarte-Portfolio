import { useRef, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
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
};

const sizeClasses: Record<CardSize, string> = {
  large: "md:col-span-2 md:row-span-2",
  tall: "md:row-span-2",
  wide: "md:col-span-2",
  medium: "",
};

const imageAspect: Record<CardSize, string> = {
  large: "aspect-square",
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  medium: "aspect-[4/3]",
};

export function PortfolioProjectCard({
  project,
  activeCategory = "All",
  size,
}: PortfolioProjectCardProps) {
  const coverImage = getProjectCoverImage(project);
  const title = getProjectDisplayTitle(project, activeCategory);
  const cardRef = useRef<HTMLDivElement>(null);

  const isBranding = project.cat === "Logo & Branding";
  const isBook = activeCategory === "Writing / VA";
  const brandingExcluded = ["Miro", "FigJam", "Illustrator", "Photoshop", "Canva"];
  const displayTools = isBranding
    ? project.tools.filter((t) => !brandingExcluded.includes(t))
    : project.tools;

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }, []);

  return (
    <div className={cn(sizeClasses[size])}>
      <CaseStudyLink
        slug={project.slug}
        routeCategory={getRouteCategoryForProject(project)}
        aria-label={`View ${title} case study`}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouse}
          className={cn(
            "metal-card group relative h-full overflow-hidden rounded-2xl",
            "transition-all duration-500 ease-out",
            "hover:-translate-y-1",
          )}
        >
          {isBook ? (
            <div className="flex h-full flex-col sm:flex-row">
              <div className="relative aspect-[4/5] w-full overflow-hidden sm:h-auto sm:w-[25%]">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt={`${title} preview`}
                    className="h-full w-full object-contain p-3 transition-all duration-700 group-hover:scale-105 sm:p-4"
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
                  <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
                    {title}
                  </h3>
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
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-yellow/70 transition-all duration-300 group-hover:text-yellow sm:text-sm">
                    View Project
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="relative overflow-hidden">
                <div className={cn(imageAspect[size], "w-full", isBranding && "bg-white")}>
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={`${title} preview`}
                      className={cn(
                        "h-full w-full transition-all duration-700 group-hover:scale-105",
                        isBranding ? "object-contain p-4 sm:p-6" : "object-cover",
                      )}
                      loading="lazy"
                    />
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
              </div>

              <div className="flex flex-col gap-3 p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
                    {title}
                  </h3>
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
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-yellow/70 transition-all duration-300 group-hover:text-yellow sm:text-sm">
                    View Project
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
      </CaseStudyLink>
    </div>
  );
}
