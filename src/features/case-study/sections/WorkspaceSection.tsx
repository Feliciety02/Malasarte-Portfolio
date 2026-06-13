import type { SectionProps } from "../types/templates";
import { cn } from "@/lib/utils";
import { InteractiveWorkspace } from "../workspace/figmaWorkspace";
import { canShowProjectWorkspace, shouldSwapToGallery } from "../utils/workspaceUtils";

export function WorkspaceSection({ project, sectionNumber }: SectionProps) {
  if (canShowProjectWorkspace(project)) {
    return <InteractiveWorkspace project={project} />;
  }
  return null;
}
