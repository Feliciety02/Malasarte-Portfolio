import type { Project } from "@/data/projects";
import { resolveWorkspace } from "../workspace/workspaceResolver";

export function canShowProjectWorkspace(
  project: Pick<
    Project,
    "cat" | "categories" | "vercelLiveUrl" | "figmaPreviewUrl" | "hideLiveWorkspace"
  >,
): boolean {
  if (project.hideLiveWorkspace) return false;
  if (!project.vercelLiveUrl?.trim() && !project.figmaPreviewUrl?.trim()) return false;

  const cats = [project.cat, ...(project.categories ?? [])];
  return cats.some((c) => c === "UI/UX Design" || c === "Web Development");
}

export function hasProjectScreenEmbeds(project: Project) {
  return resolveWorkspace(project).tabs.length > 0;
}

export function shouldSwapToGallery(project: Project): boolean {
  return (
    !canShowProjectWorkspace(project) &&
    project.cat === "Web Development" &&
    project.gallery.length > 0
  );
}
