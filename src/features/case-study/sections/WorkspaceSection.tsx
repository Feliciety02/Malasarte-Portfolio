import { getProjectCaseStudyContent } from "@/data/projects";
import { ScreenTabShowcase } from "./screens/ScreenTabShowcase";
import { ScreenSectionIntro } from "./screens/ScreenSectionIntro";
import { ScreenFallbackCards } from "./screens/ScreenFallbackCards";
import { SectionAnchor, FadeIn } from "./SectionWrappers";
import type { SectionProps } from "../types/templates";
import { InteractiveWorkspace } from "../workspace/figmaWorkspace";
import { hasProjectScreenEmbeds } from "../utils/workspaceUtils";

export function WorkspaceSection({ project, sectionNumber, openLightbox }: SectionProps) {
  const caseStudy = getProjectCaseStudyContent(project);
  const hasEmbeds = hasProjectScreenEmbeds(project);
  const hasGallery = project.gallery.length > 0;
  const modules = caseStudy.modules;

  return (
    <SectionAnchor id="screens">
      <ScreenSectionIntro sectionNumber={sectionNumber} />

      <FadeIn delay={0.08}>
        {hasEmbeds ? (
          <InteractiveWorkspace project={project} />
        ) : hasGallery || modules.length > 0 ? (
          <ScreenTabShowcase
            project={project}
            modules={modules}
            openLightbox={openLightbox}
          />
        ) : (
          <ScreenFallbackCards modules={modules} />
        )}
      </FadeIn>
    </SectionAnchor>
  );
}
