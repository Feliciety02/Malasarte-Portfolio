import { PortfolioProjectCard } from "./PortfolioProjectCard";
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
  return project.cardSize ?? "medium";
}

type PortfolioGalleryProps = {
  projects: Project[];
  activeCategory: ProjectCategory | "All";
};

const twoColumnCats: ProjectCategory[] = ["UI/UX Design", "Web Development"];
const singleColumnCats: ProjectCategory[] = ["Writing / VA"];

export function PortfolioGallery({ projects, activeCategory }: PortfolioGalleryProps) {
  const singleCol =
    activeCategory !== "All" && singleColumnCats.includes(activeCategory as ProjectCategory);
  const twoCol =
    !singleCol &&
    activeCategory !== "All" &&
    twoColumnCats.includes(activeCategory as ProjectCategory);
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
          />
        ))}
      </div>
    </section>
  );
}
