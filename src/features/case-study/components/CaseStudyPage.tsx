import { useLayoutEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { Project, ProjectCategory } from "@/data/projects";
import { getProjectGalleryImage } from "@/data/projectImages";
import { MetallicPage } from "@/components/site/MetallicPage";
import { Lightbox, type LightboxItem } from "@/components/site/Lightbox";
import type { SectionComponentDef, RouteCategory } from "../types/templates";
import { getTemplateByRouteCategory } from "../templates/templateRegistry";
import { getSectionsForProject } from "../utils/templateUtils";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyLayout } from "./CaseStudyLayout";
import { CaseStudySectionRenderer } from "./CaseStudySectionRenderer";

type CaseStudyPageProps = {
  project: Project;
  routeCategory: RouteCategory;
};

export function CaseStudyPage({ project, routeCategory }: CaseStudyPageProps) {
  const template = getTemplateByRouteCategory(routeCategory);
  const isGalleryOnly = template.key === "gallery";
  const sections = getSectionsForProject(project, template);

  const sectionDefs = sections.map((s) => ({ id: s.id, label: s.label }));

  const galleryItems: LightboxItem[] = useMemo(
    () =>
      project.gallery.map((g) => ({
        color: g.color,
        label: g.label,
        note: g.note,
        src: getProjectGalleryImage(project, g),
      })),
    [project],
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const resetToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    resetToTop();
    const frame = window.requestAnimationFrame(resetToTop);
    const timeout = window.setTimeout(resetToTop, 0);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [project.slug]);

  return (
    <MetallicPage variant="project" className="px-0 pb-24">
      <FloatingCatalogBackLink />

      <CaseStudyHero project={project} />

      <CaseStudyLayout sections={sectionDefs} isGalleryOnly={isGalleryOnly}>
        <CaseStudySectionRenderer
          sections={sections}
          project={project}
          openLightbox={setLightboxIndex}
        />
      </CaseStudyLayout>

      <Lightbox
        items={galleryItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </MetallicPage>
  );
}

function FloatingCatalogBackLink() {
  const navigate = useNavigate();
  const goBack = () => navigate({ to: "/works" });

  return (
    <div>
      <button
        type="button"
        onClick={goBack}
        aria-label="Back to all works"
        title="Back to all works"
        className="metal-ghost fixed left-4 top-28 z-40 grid h-11 w-11 place-items-center rounded-full text-muted-foreground shadow-[0_16px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors duration-300 hover:border-primary/45 hover:bg-primary/15 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 lg:hidden"
      >
        <ArrowLeft size={16} />
      </button>

      <button
        type="button"
        onClick={goBack}
        aria-label="Back to all works"
        title="Back to all works"
        className="group fixed bottom-0 left-0 top-0 z-40 hidden w-24 items-start justify-center pt-36 text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/45 lg:flex xl:w-28 2xl:w-[max(7rem,calc((100vw-80rem)/2+5rem))]"
      >
        <span className="metal-ghost grid h-11 w-11 place-items-center rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors duration-300 group-hover:border-primary/45 group-hover:bg-primary/15">
          <ArrowLeft size={16} />
        </span>
      </button>
    </div>
  );
}
