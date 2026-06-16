import { BentoProjectCard, type BentoCardType } from "./BentoProjectCard";
import { PortfolioProjectCard } from "./PortfolioProjectCard";
import { ArrowLeft } from "lucide-react";
import type { Project, ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

type CardSize = "large" | "tall" | "wide" | "medium";

function getCardSize(
  project: Project,
  _index: number,
  activeCategory: ProjectCategory | "All",
): CardSize {
  if (activeCategory === "Writing / VA") {
    return "wide";
  }
  if (activeCategory === "UI/UX Design" || activeCategory === "Web Development") {
    return "medium";
  }
  if (activeCategory === "Logo & Branding") {
    return "medium";
  }
  return project.cardSize ?? "medium";
}

type PortfolioGalleryProps = {
  projects: Project[];
  activeCategory: ProjectCategory | "All";
  onSocialClick?: (slug: string) => void;
  onBackToProjects?: () => void;
};

const twoColumnCats: ProjectCategory[] = ["UI/UX Design", "Web Development"];
const singleColumnCats: ProjectCategory[] = ["Writing / VA"];

function getBentoCardType(project: Project): BentoCardType {
  if (
    project.kind === "frontend" ||
    project.kind === "uiux" ||
    project.cat === "Web Development" ||
    project.cat === "UI/UX Design" ||
    project.categories?.includes("Web Development") ||
    project.categories?.includes("UI/UX Design")
  ) {
    return "featured";
  }

  if (
    project.kind === "writing" ||
    project.kind === "publication" ||
    project.cat === "Writing / VA"
  ) {
    return "portrait";
  }

  if (
    project.kind === "gallery" ||
    project.cat === "Social Media Graphics" ||
    project.cat === "Creative Assets"
  ) {
    return "gallery";
  }

  return "standard";
}

function getBentoProjects(projects: Project[]) {
  return projects.map((project) => ({
    project,
    type: getBentoCardType(project),
  }));
}

export function PortfolioGallery({
  projects,
  activeCategory,
  onSocialClick,
  onBackToProjects,
}: PortfolioGalleryProps) {
  if (activeCategory === "All") {
    const bentoProjects = getBentoProjects(projects);

    return (
      <section className="relative z-10 mx-auto mt-12 max-w-7xl px-4 sm:mt-16 sm:px-6">
        <div className="grid grid-flow-dense gap-5 md:auto-rows-[26rem] md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {bentoProjects.map(({ project, type }) => (
            <BentoProjectCard
              key={project.slug}
              project={project}
              type={type}
              onSocialClick={onSocialClick}
            />
          ))}
        </div>
      </section>
    );
  }

  if (activeCategory === "Logo & Branding") {
    return (
      <section className="relative z-10 mx-auto mt-12 max-w-7xl px-4 sm:mt-16 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {projects.map((project, index) => (
            <PortfolioProjectCard
              key={project.slug}
              project={project}
              activeCategory={activeCategory}
              size={getCardSize(project, index, activeCategory)}
              onSocialClick={onSocialClick}
            />
          ))}
        </div>
      </section>
    );
  }

  const singleCol = singleColumnCats.includes(activeCategory);
  const twoCol = !singleCol && twoColumnCats.includes(activeCategory);
  return (
    <section className="relative z-10 mx-auto mt-12 max-w-7xl px-4 sm:mt-16 sm:px-6">
      <div
        className={cn(
          "grid gap-6 grid-flow-dense",
          singleCol
            ? "md:grid-cols-2"
            : twoCol
              ? "md:grid-cols-2"
              : "md:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {projects.map((project, index) => (
          <PortfolioProjectCard
            key={project.slug}
            project={project}
            activeCategory={activeCategory}
            size={getCardSize(project, index, activeCategory)}
            onSocialClick={onSocialClick}
          />
        ))}
      </div>
    </section>
  );
}
