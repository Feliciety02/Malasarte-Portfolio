import { ExternalLink } from "lucide-react";
import { getProjectCoverImage } from "@/data/projectImages";
import { getProjectDisplayTitle } from "@/data/projects";
import type { Project, ProjectFilter } from "@/data/projects";
import { AccentText } from "@/components/site/HeadingAccent";
import { SocialMediaBentoPreview } from "./SocialMediaBentoPreview";

type StatItem = {
  value: string;
  label: string;
};

type PortfolioHeroProps = {
  stats: StatItem[];
  featuredProject?: Project;
  activeCategory?: ProjectFilter;
  onSocialClick?: (slug: string) => void;
};

function FeaturedCard({
  project,
  activeCategory,
  onSocialClick,
}: {
  project: Project;
  activeCategory?: ProjectFilter;
  onSocialClick?: (slug: string) => void;
}) {
  const coverImage = getProjectCoverImage(project);
  const title = getProjectDisplayTitle(project, activeCategory);
  const isBranding = activeCategory === "Logo & Branding";
  const isSocial =
    project.cat === "Social Media Graphics" ||
    project.categories?.includes("Social Media Graphics");
  const liveUrl = project.vercelLiveUrl?.trim();

  return (
    <div className="metal-card group relative flex h-full w-full overflow-hidden rounded-2xl bg-white/5">
      {isSocial ? (
        <SocialMediaBentoPreview
          project={project}
          fallbackImage={coverImage}
          className="h-full w-full rounded-[inherit]"
        />
      ) : coverImage ? (
        isBranding ? (
          <div className="flex h-full w-full items-center justify-center bg-white p-8">
            <img
              src={coverImage}
              alt={`${title} preview`}
              className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        ) : (
          <img
            src={coverImage}
            alt={`${title} preview`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        )
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
    </div>
  );
}

export function PortfolioHero({ stats, featuredProject, activeCategory, onSocialClick }: PortfolioHeroProps) {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <span className="metal-kicker">Portfolio</span>

          <div className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <div>Selected</div>
            <div>
              <AccentText>Works</AccentText>
            </div>
          </div>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            A curated collection of digital products, brands, interfaces, and creative
            systems shaped across categories, clients, and disciplines.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1.5">
                <span className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground sm:text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="metal-kicker">Featured Work</span>
            <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <div className="relative h-[320px] w-full sm:h-[380px] md:h-[440px]">
            {featuredProject ? (
              <FeaturedCard
                project={featuredProject}
                activeCategory={activeCategory}
                onSocialClick={onSocialClick}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03]">
                <span className="text-sm text-muted-foreground">No featured project</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
