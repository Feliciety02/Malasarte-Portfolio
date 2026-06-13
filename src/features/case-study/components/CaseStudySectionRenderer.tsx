import type { Project } from "@/data/projects";
import type { SectionComponentDef } from "../types/templates";

export function CaseStudySectionRenderer({
  sections,
  project,
  openLightbox,
}: {
  sections: SectionComponentDef[];
  project: Project;
  openLightbox: (index: number) => void;
}) {
  return (
    <>
      {sections.map((section, i) => {
        const number = String(i + 1).padStart(2, "0");
        return (
          <section.component
            key={section.id}
            project={project}
            sectionNumber={number}
            openLightbox={openLightbox}
          />
        );
      })}
    </>
  );
}
