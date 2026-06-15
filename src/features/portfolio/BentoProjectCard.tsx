import { useCallback, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
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
  featured: "min-h-[24rem] md:col-span-2 md:min-h-0",
  portrait: "min-h-[34rem] md:row-span-2 md:min-h-0",
  standard: "min-h-[22rem] md:min-h-0",
  gallery: "min-h-[22rem] md:min-h-0",
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

  return (
    <>
      {!isBranding ? (
        <img
          src={coverImage}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-2xl"
        />
      ) : null}
      <img
        src={coverImage}
        alt={`${project.title} preview`}
        className={cn(
          "relative h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.025]",
          type === "portrait" && "p-5 sm:p-7",
          isBranding && "p-8 sm:p-10",
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
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"
        />
      ) : null}

      <TagPill>{category}</TagPill>

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
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
