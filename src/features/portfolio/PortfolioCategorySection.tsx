import { PortfolioProjectCard } from "./PortfolioProjectCard";
import type { Project, ProjectCategory } from "@/data/projects";
import { categoryDescriptions } from "@/data/projects";
import type { CardSize } from "./PortfolioProjectCard";

function getBentoSize(index: number): CardSize {
  const pattern: CardSize[] = [
    "large",
    "medium",
    "tall",
    "medium",
    "wide",
    "medium",
    "medium",
    "tall",
    "medium",
    "wide",
    "medium",
    "medium",
  ];
  return pattern[index % pattern.length];
}

type PortfolioCategorySectionProps = {
  category: ProjectCategory;
  projects: Project[];
};

export function PortfolioCategorySection({ category, projects }: PortfolioCategorySectionProps) {
  return (
    <section className="relative z-10 mx-auto mt-14 max-w-7xl px-4 sm:mt-20 sm:px-6">
      <div className="mb-6 flex flex-col gap-1 sm:mb-8">
        <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
          {category}
        </h2>
        <p className="text-[13px] leading-5 text-muted-foreground sm:text-sm">
          {projects.length} project{projects.length === 1 ? "" : "s"}
          <span className="mx-2 inline-block text-white/10">·</span>
          {categoryDescriptions[category]}
        </p>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 grid-flow-dense">
        {projects.map((project, index) => (
          <PortfolioProjectCard
            key={project.slug}
            project={project}
            activeCategory={category}
            size={getBentoSize(index)}
          />
        ))}
      </div>
    </section>
  );
}
