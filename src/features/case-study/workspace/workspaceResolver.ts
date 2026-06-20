import type { Project } from "@/data/projects";
import type { WorkspaceTab } from "../types/workspace";

export type WorkspaceResolution = {
  tabs: WorkspaceTab[];
  defaultTabId: "live" | "design" | "flipbook";
};

export function resolveWorkspace(project: Project): WorkspaceResolution {
  const figmaUrl = project.figmaPreviewUrl?.trim();
  const vercelUrl = project.vercelLiveUrl?.trim();
  const flipbookUrl = project.flipbookEmbed?.src?.trim();
  const isUxProject = project.cat === "UI/UX Design";
  const isDevProject = project.cat === "Software Development";
  const isWritingProject = project.kind === "writing";
  const tabs: WorkspaceTab[] = [];

  if (figmaUrl) {
    tabs.push({
      id: "design",
      label: "Design",
      title: `${project.title} design workspace`,
      src: figmaUrl,
      externalUrl: figmaUrl,
      allow: "fullscreen; clipboard-read; clipboard-write",
      minWidthClassName: "min-w-[52rem] sm:min-w-0",
    });
  }

  if (!project.hideLiveWorkspace && vercelUrl) {
    tabs.push({
      id: "live",
      label: "Live Build",
      title: `${project.title} deployed web app`,
      src: vercelUrl,
      externalUrl: vercelUrl,
      allow: "fullscreen; clipboard-read; clipboard-write; autoplay; gamepad",
      minWidthClassName: "min-w-[24rem] sm:min-w-0",
    });
  }

  if (flipbookUrl) {
    tabs.push({
      id: "flipbook",
      label: "Heyzine",
      title: `${project.title} flipbook preview`,
      src: flipbookUrl,
      externalUrl: flipbookUrl,
      allow: "fullscreen; clipboard-write",
      minWidthClassName: "min-w-[32rem] sm:min-w-0",
    });
  }

  const defaultTabId =
    tabs.length === 1
      ? tabs[0].id
      : isUxProject
        ? "design"
        : isDevProject
          ? "live"
          : isWritingProject
            ? "flipbook"
            : tabs[0]?.id ?? "design";

  return { tabs, defaultTabId };
}
