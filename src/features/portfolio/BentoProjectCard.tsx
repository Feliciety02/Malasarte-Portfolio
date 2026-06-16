import { useCallback, useRef } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { TagPill } from "@/components/site/TagPill";
import { getProjectCoverImage } from "@/data/projectImages";
import { getProjectCategoryLabel, getProjectDisplayTitle, type Project } from "@/data/projects";
import { getRouteCategoryForProject } from "@/features/case-study/templates/templateRegistry";
import { cn } from "@/lib/utils";
import { SocialMediaBentoPreview } from "./SocialMediaBentoPreview";

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
  isBranding,
}: {
  project: Project;
  type: BentoCardType;
  coverImage?: string;
  isBranding?: boolean;
}) {
  if (type === "gallery") {
    return <SocialMediaBentoPreview project={project} fallbackImage={coverImage} />;
  }

  if (!coverImage) return null;

  if (isBranding) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6 sm:p-8">
        <img
          src={coverImage}
          alt={`${project.title} preview`}
          className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.025]"
          loading="lazy"
        />
      </div>
    );
  }

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
          "relative h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.025]",
          type === "portrait" && "p-5 sm:p-7",
        )}
        loading="lazy"
      />
    </>
  );
}

export function BentoProjectCard({ project, type, onSocialClick }: BentoProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const coverImage = getProjectCoverImage(project);
  const title = getProjectDisplayTitle(project, "All");
  const category = getProjectCategoryLabel(project, "All");
  const isSocial =
    project.cat === "Social Media Graphics" ||
    project.categories?.includes("Social Media Graphics");
  const isBranding = project.cat === "Logo & Branding";

  const handleMouse = useCallback((event: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }, []);

  const cardContent = (
    <div
      ref={cardRef}
      onMouseMove={handleMouse}
      className="metal-card group relative h-full overflow-hidden rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1"
    >
      <div
        className={cn("absolute inset-0 overflow-hidden", isBranding ? "bg-white" : "bg-black/70")}
      >
        <ProjectPreview
          project={project}
          type={type}
          coverImage={coverImage}
          isBranding={isBranding}
        />
      </div>

      {!isBranding ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
        />
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"
        />
      )}

      <TagPill className={isBranding ? "text-gray-800" : undefined}>{category}</TagPill>

      {project.vercelLiveUrl?.trim() ? (
        <a
          href={project.vercelLiveUrl.trim()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-yellow/30 bg-yellow/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-yellow/90 backdrop-blur-sm transition-all hover:bg-yellow/20 hover:text-yellow"
        >
          <ExternalLink size={11} />
          Live
        </a>
      ) : null}

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-10",
          isBranding ? "bg-white" : "bg-black/80",
        )}
      >
        <div className="flex items-end justify-between gap-4 px-5 pb-5 pt-3 sm:px-6 sm:pb-6">
          <div className="min-w-0">
            <h3
              className={cn(
                "font-display font-bold leading-tight tracking-[-0.02em]",
                isBranding && "text-black",
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
                "mt-2 text-[13px] leading-6",
                isBranding ? "text-black/60" : "text-white/65",
                type === "featured" ? "line-clamp-2 max-w-2xl sm:text-sm" : "line-clamp-1",
              )}
            >
              {project.desc}
            </p>
          </div>

          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 text-xs font-medium transition-colors",
              isBranding
                ? "text-yellow group-hover:text-yellow/80"
                : "text-yellow/80 group-hover:text-yellow",
            )}
          >
            View
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), rgba(255, 215, 0, 0.08), transparent 50%)",
        }}
      />
    </div>
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
