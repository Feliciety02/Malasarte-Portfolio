import { ArrowUpRight, ExternalLink } from "lucide-react";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { TagPill } from "@/components/site/TagPill";
import { getProjectCoverImage } from "@/data/projectImages";
import { getProjectCategoryLabel, getProjectDisplayTitle, type Project } from "@/data/projects";
import { getRouteCategoryForProject } from "@/features/case-study/templates/templateRegistry";
import { cn } from "@/lib/utils";
import { SocialMediaBentoPreview } from "./SocialMediaBentoPreview";
import { PortfolioAccentCardFrame } from "./PortfolioAccentCardFrame";

export type BentoCardType = "featured" | "portrait" | "standard" | "gallery";

type BentoProjectCardProps = {
  project: Project;
  type: BentoCardType;
  onSocialClick?: (slug: string) => void;
};

const spanClasses: Record<BentoCardType, string> = {
  featured: "min-h-[28rem] md:col-span-2 md:min-h-0",
  portrait: "min-h-[38rem] md:row-span-2 md:min-h-0",
  standard: "min-h-[26rem] md:min-h-0",
  gallery: "min-h-[26rem] md:min-h-0",
};

function ProjectPreview({
  project,
  type,
  coverImage,
}: {
  project: Project;
  type: BentoCardType;
  coverImage?: string;
}) {
  if (type === "gallery") {
    return <SocialMediaBentoPreview project={project} fallbackImage={coverImage} />;
  }

  if (!coverImage) return null;

  const isCoverFit = project.cat === "UI/UX Design" || project.cat === "Web Development";

  return (
    <>
      <img
        src={coverImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-2xl"
      />
      <img
        src={coverImage}
        alt={`${project.title} preview`}
        className={cn(
          "relative h-full w-full transition-transform duration-700 group-hover:scale-[1.025]",
          isCoverFit ? "object-cover" : "object-contain",
          type === "portrait" && !isCoverFit && "p-5 sm:p-7",
        )}
        loading="lazy"
      />
    </>
  );
}

export function BentoProjectCard({ project, type, onSocialClick }: BentoProjectCardProps) {
  const coverImage = getProjectCoverImage(project);
  const title = getProjectDisplayTitle(project, "All");
  const category = getProjectCategoryLabel(project, "All");
  const isSocial =
    project.cat === "Social Media Graphics" ||
    project.categories?.includes("Social Media Graphics");
  const isBranding = project.cat === "Logo & Branding";

  const cardContent = (
    <PortfolioAccentCardFrame category={project.cat}>
      {isBranding ? (
        <div className="flex h-full flex-col">
          <div className="relative h-[65%] shrink-0 overflow-hidden bg-white">
            <div className="flex h-full w-full items-center justify-center p-6 sm:p-8">
              {coverImage ? (
                <img
                  src={coverImage}
                  alt={`${title} preview`}
                  className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-[11px] uppercase tracking-[0.15em] text-black/45">
                    Preview
                  </span>
                </div>
              )}
            </div>
            <TagPill className="absolute left-3 top-3">{category}</TagPill>
          </div>
          <div className="flex min-h-0 flex-1 flex-col bg-black/80 p-4">
            <div className="flex-1 min-w-0">
              <h3 className="line-clamp-2 font-display text-lg font-bold leading-tight sm:text-xl">
                {title}
              </h3>
              <p className="mt-2 line-clamp-1 text-[12px] leading-5 text-muted-foreground sm:text-[13px]">
                {project.desc}
              </p>
            </div>
            <div className="flex items-center justify-end pt-2">
              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-yellow/80 transition-colors group-hover:text-yellow">
                View
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px"
                />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <div
            className={cn(
              "relative min-h-0 overflow-hidden",
              type === "featured"
                ? "aspect-[16/10]"
                : type === "portrait"
                  ? "aspect-[4/5]"
                  : "aspect-[16/10]",
            )}
          >
            <div className="absolute inset-0 overflow-hidden bg-black/70">
              <ProjectPreview project={project} type={type} coverImage={coverImage} />
            </div>

            <div className="absolute left-3 top-3 z-10">
              <TagPill>{category}</TagPill>
            </div>

            {project.vercelLiveUrl?.trim() ? (
              <a
                href={project.vercelLiveUrl.trim()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-yellow/30 bg-yellow/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-yellow/90 backdrop-blur-sm transition-colors duration-300 hover:bg-yellow/20 hover:text-yellow"
              >
                <ExternalLink size={11} />
                Live
              </a>
            ) : null}
          </div>

          <div className="flex min-h-0 flex-1 flex-col bg-black/80 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0">
                <h3
                  className={cn(
                    "font-display font-bold leading-tight tracking-[-0.02em]",
                    type === "featured"
                      ? "text-3xl sm:text-4xl"
                      : type === "portrait"
                        ? "text-2xl sm:text-3xl"
                        : "text-2xl",
                  )}
                >
                  {title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-[13px] leading-6 text-white/65",
                    type === "featured" ? "line-clamp-2 max-w-2xl sm:text-sm" : "line-clamp-1",
                  )}
                >
                  {project.desc}
                </p>
              </div>

              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-yellow/80 transition-colors group-hover:text-yellow">
                View
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px"
                />
              </span>
            </div>
          </div>
        </div>
      )}
    </PortfolioAccentCardFrame>
  );

  return (
    <article className={spanClasses[type]}>
      {isSocial && onSocialClick ? (
        <button
          type="button"
          onClick={() => onSocialClick(project.slug)}
          className="block h-full w-full text-left rounded-2xl"
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
    </article>
  );
}
