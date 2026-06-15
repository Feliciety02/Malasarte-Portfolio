import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Maximize2, Monitor, Palette, RotateCcw, Sparkles } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { SectionAnchor, SectionLabel, FadeIn } from "./-sections";
import { GalleryGrid } from "./-gallery";
import type { WorkspaceTab, WorkspaceTabId } from "./-config";

export function InteractiveWorkspace({ project }: { project: Project }) {
  const figmaPreviewUrl = project.figmaPreviewUrl?.trim();
  const vercelLiveUrl = project.vercelLiveUrl?.trim();
  const isUxProject = project.cat === "UI/UX Design";
  const workspaceTabs: WorkspaceTab[] = [];

  if (figmaPreviewUrl) {
    workspaceTabs.push({
      id: "design",
      label: "Design",
      title: `${project.title} design workspace`,
      src: figmaPreviewUrl,
      externalUrl: figmaPreviewUrl,
      allow: "fullscreen; clipboard-read; clipboard-write",
      minWidthClassName: "min-w-[52rem] sm:min-w-0",
    });
  }

  if (vercelLiveUrl) {
    workspaceTabs.push({
      id: "live",
      label: "Live Build",
      title: `${project.title} deployed web app`,
      src: vercelLiveUrl,
      externalUrl: vercelLiveUrl,
      allow: "fullscreen; clipboard-read; clipboard-write; autoplay; gamepad",
      minWidthClassName: "min-w-[24rem] sm:min-w-0",
    });
  }

  const defaultTab: WorkspaceTabId =
    workspaceTabs.length === 1 ? workspaceTabs[0].id : isUxProject ? "design" : "live";
  const [activeTabId, setActiveTabId] = useState<WorkspaceTabId>(defaultTab);
  const activeTab = workspaceTabs.find((tab) => tab.id === activeTabId) ?? workspaceTabs[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [embedKey, setEmbedKey] = useState(0);

  useEffect(() => {
    setIsLoaded(false);
    setEmbedKey(0);
  }, [activeTab?.id, activeTab?.src]);

  const resetView = () => {
    if (!activeTab) return;
    setIsLoaded(false);
    setEmbedKey((key) => key + 1);
  };

  const enterFullscreen = () => {
    if (!activeTab) return;
    containerRef.current?.requestFullscreen?.();
  };

  return (
    <SectionAnchor id="workspace" className="pt-16 md:pt-24">
      <FadeIn>
        <SectionLabel kicker="02" label="Live Workspace" />
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold leading-tight md:text-4xl">
              {accentLastWord(
                activeTab?.id === "live" ? "Explore the live build" : "Explore the design",
              )}
            </h2>
            {activeTab?.note ? (
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                {activeTab.note}
              </p>
            ) : null}
          </div>
          {activeTab ? (
            <div className="flex flex-wrap items-center gap-2">
              {workspaceTabs.length > 1 ? (
                <div className="metal-ghost flex rounded-full p-1">
                  {workspaceTabs.map((tab) => {
                    const isActive = activeTab.id === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTabId(tab.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-white",
                        )}
                        aria-pressed={isActive}
                      >
                        {tab.id === "live" ? <Monitor size={12} /> : <Palette size={12} />}
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}
              <a
                href={activeTab.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="metal-ghost flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-white"
                aria-label={`Open ${activeTab.title} in a new tab`}
              >
                <ArrowUpRight size={12} /> Open
              </a>
              <button
                type="button"
                onClick={enterFullscreen}
                className="metal-ghost flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-white"
                aria-label="Open fullscreen"
              >
                <Maximize2 size={12} /> Full Preview
              </button>
              <button
                type="button"
                onClick={resetView}
                className="metal-ghost flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-white"
                aria-label="Reset view"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>
          ) : null}
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <div
          ref={containerRef}
          className="relative mt-6 overflow-hidden rounded-xl border border-white/8 bg-[#060708]"
        >
          <div
            className="relative h-[72vh] min-h-[28rem] max-h-[48rem] overflow-auto invisible-scrollbar"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01) 38%), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 44px), repeating-linear-gradient(90deg, rgba(255,255,255,0.022) 0 1px, transparent 1px 44px)",
            }}
          >
            {activeTab ? (
              <div className={cn("relative h-full", activeTab.minWidthClassName)}>
                {!isLoaded ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
                  </div>
                ) : null}
                <div className="h-full overflow-hidden">
                  <iframe
                    key={`${project.slug}-${activeTab.id}-${embedKey}`}
                    title={`${activeTab.title} workspace`}
                    src={activeTab.src}
                    className="pointer-events-auto h-full w-[calc(100%+20px)] border-0"
                    style={{ marginRight: "-20px" }}
                    allow={activeTab.allow}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    onLoad={() => setIsLoaded(true)}
                  />
                </div>
              </div>
            ) : (
              <WorkspacePlaceholder project={project} />
            )}
          </div>
        </div>
      </FadeIn>
    </SectionAnchor>
  );
}

function WorkspacePlaceholder({ project }: { project: Project }) {
  return (
    <div className="grid h-full min-w-[42rem] place-items-center p-6 sm:min-w-0">
      <div className="w-full max-w-4xl rounded-xl border border-white/10 bg-black/30 p-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
              Preview frame
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold">
              Interactive Workspace Coming Soon
            </h3>
          </div>
          <Sparkles size={18} className="text-primary" />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-[0.4fr_0.6fr]">
          <div className="space-y-3">
            <div className="h-4 rounded-full bg-white/14" />
            <div className="h-4 w-3/4 rounded-full bg-white/8" />
            <div className="h-28 rounded-lg border border-white/8 bg-white/[0.04]" />
          </div>
          <div className="aspect-video rounded-lg border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.11),rgba(255,255,255,0.025)_45%,rgba(0,0,0,0.26))]" />
        </div>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          {project.title} will include the live build or embedded design workspace here when a
          public URL is available.
        </p>
      </div>
    </div>
  );
}

export function WorkspacePhotoGallery({
  project,
  openLightbox,
}: {
  project: Project;
  openLightbox: (i: number) => void;
}) {
  const items = project.gallery;

  return (
    <SectionAnchor id="workspace" className="pt-16 md:pt-24">
      <FadeIn>
        <SectionLabel kicker="02" label="Photo Gallery" />
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold leading-tight md:text-4xl">
              {accentLastWord("Walkthrough the screenshots")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              The live build for {project.title} is private or not yet deployed. Browse curated
              screenshots of the build to see how the interface works end-to-end.
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        {items.length > 0 ? (
          <GalleryGrid project={project} openLightbox={openLightbox} />
        ) : (
          <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center text-sm text-muted-foreground">
            No screenshots are available for this project yet.
          </div>
        )}
      </FadeIn>
    </SectionAnchor>
  );
}
