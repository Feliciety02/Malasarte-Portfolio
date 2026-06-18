import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Maximize2, Monitor, Palette, RotateCcw, Sparkles } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { SectionAnchor, SectionLabel, FadeIn } from "../sections/SectionWrappers";
import { resolveWorkspace } from "./workspaceResolver";

export function InteractiveWorkspace({ project }: { project: Project }) {
  const { tabs, defaultTabId } = useMemo(() => resolveWorkspace(project), [project]);
  const [activeTabId, setActiveTabId] = useState<"live" | "design">(defaultTabId);
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
  const isUxWorkspace = project.cat === "UI/UX Design";
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

  if (tabs.length === 0) return null;

  return (
    <SectionAnchor id="workspace" className="pt-16 md:pt-24">
      <FadeIn>
        <SectionLabel kicker="02" label="Live Workspace" />
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-medium leading-tight md:text-4xl">
              {activeTab?.id === "live" ? <>Explore the live <em>build</em></> : <>Explore the <em>design</em></>}
            </h2>
            {activeTab?.note ? (
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                {activeTab.note}
              </p>
            ) : null}
          </div>
          {activeTab ? (
            <div className="flex flex-wrap items-center gap-2">
              {tabs.length > 1 ? (
                <div className="metal-ghost flex rounded-full p-1">
                  {tabs.map((tab) => {
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
          className={cn(
            "relative mt-6 overflow-hidden rounded-xl border",
            isUxWorkspace
              ? "border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),rgba(7,7,9,0.96)_48%,rgba(4,4,5,1))]"
              : "border-white/8 bg-[#060708]",
          )}
        >
          {isUxWorkspace ? (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,178,0,0.12),rgba(255,255,255,0)_72%)]"
            />
          ) : null}
          <div
            className={cn(
              "relative overflow-auto invisible-scrollbar",
              isUxWorkspace ? "min-h-[32rem]" : "h-[72vh] min-h-[28rem] max-h-[48rem]",
            )}
            style={
              isUxWorkspace
                ? undefined
                : {
                    backgroundImage:
                      "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01) 38%), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 44px), repeating-linear-gradient(90deg, rgba(255,255,255,0.022) 0 1px, transparent 1px 44px)",
                  }
            }
          >
            {activeTab ? (
              <div
                className={cn(
                  "relative",
                  isUxWorkspace
                    ? "grid gap-6 p-4 md:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] md:p-6"
                    : "h-full",
                  activeTab.minWidthClassName,
                )}
              >
                {isUxWorkspace ? (
                  <div className="flex flex-col justify-between rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary/80">
                        Design Canvas
                      </p>
                      <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-white">
                        Figma showcase for {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-white/65">
                        A dedicated preview surface for flows, interface structure, and visual
                        system details. This stays design-first and does not reuse the web app
                        presentation.
                      </p>
                    </div>
                    <div className="mt-6 grid gap-3 text-sm text-white/70">
                      <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                        Embedded Figma preview remains active for direct exploration.
                      </div>
                      <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                        Use fullscreen for a larger canvas and reset if the embed drifts.
                      </div>
                    </div>
                  </div>
                ) : null}
                <div
                  className={cn(
                    "relative overflow-hidden",
                    isUxWorkspace
                      ? "rounded-[1.5rem] border border-white/10 bg-[#07080b] shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
                      : "h-full",
                  )}
                >
                  {isUxWorkspace ? (
                    <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
                        Figma Embed
                      </span>
                    </div>
                  ) : null}
                  {!isLoaded ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
                    </div>
                  ) : null}
                  <iframe
                    key={`${project.slug}-${activeTab.id}-${embedKey}`}
                    title={`${activeTab.title} workspace`}
                    src={activeTab.src}
                    className={cn(
                      "pointer-events-auto border-0",
                      isUxWorkspace
                        ? "h-[70vh] min-h-[34rem] w-full"
                        : "h-full w-[calc(100%+20px)]",
                    )}
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
