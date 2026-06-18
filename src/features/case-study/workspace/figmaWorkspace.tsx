import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, BookOpen, Maximize2, Monitor, Palette, ZoomIn, ZoomOut } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { resolveWorkspace } from "./workspaceResolver";

function MagneticButton({
  children,
  className,
  as: Tag = "button",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: "button" | "a";
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
  };

  const onPointerLeave = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12px] font-medium text-muted-foreground transition-[background,border,color] duration-300 hover:bg-white/10 hover:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function InteractiveWorkspace({ project }: { project: Project }) {
  const { tabs, defaultTabId } = useMemo(() => resolveWorkspace(project), [project]);
  const [activeTabId, setActiveTabId] = useState<"live" | "design" | "flipbook">(defaultTabId);
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
  const isDesignTab = activeTab?.id === "design";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [embedKey, setEmbedKey] = useState(0);
  const [zoom, setZoom] = useState(0.88);

  useEffect(() => {
    setIsLoaded(false);
    setEmbedKey(0);
    setZoom(activeTab?.id === "design" ? 0.88 : 1);
  }, [activeTab?.id, activeTab?.src]);

  const enterFullscreen = () => {
    if (!activeTab) return;
    containerRef.current?.requestFullscreen?.();
  };

  if (tabs.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-6"
    >
      {/* Action bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {tabs.length > 1 ? (
            <div className="flex rounded-full border border-white/10 bg-white/[0.03] p-0.5">
              {tabs.map((tab) => {
                const isActive = activeTab.id === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTabId(tab.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors",
                      isActive
                        ? "bg-white/10 text-white shadow-sm"
                        : "text-muted-foreground hover:text-white",
                    )}
                    aria-pressed={isActive}
                  >
                    {tab.id === "live" ? (
                      <Monitor size={13} />
                    ) : tab.id === "flipbook" ? (
                      <BookOpen size={13} />
                    ) : (
                      <Palette size={13} />
                    )}
                    {tab.label}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {activeTab?.externalUrl ? (
            <MagneticButton as="a" href={activeTab.externalUrl} target="_blank" rel="noreferrer">
              <ArrowUpRight size={13} /> {isDesignTab ? "Open in Figma" : "Open"}
            </MagneticButton>
          ) : null}
          {isDesignTab ? (
            <>
              <MagneticButton onClick={() => setZoom((c) => Math.max(0.72, Number((c - 0.08).toFixed(2))))}>
                <ZoomOut size={13} />
              </MagneticButton>
              <MagneticButton onClick={() => setZoom((c) => Math.min(1.08, Number((c + 0.08).toFixed(2))))}>
                <ZoomIn size={13} />
              </MagneticButton>
            </>
          ) : null}
          <MagneticButton onClick={enterFullscreen}>
            <Maximize2 size={13} /> Fullscreen
          </MagneticButton>
        </div>
      </div>

      {/* Figma embed container */}
      <div
        ref={containerRef}
        className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#07080b] shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-shadow duration-500 hover:shadow-[0_32px_100px_rgba(124,58,237,0.08)]"
      >
        {/* Loading spinner */}
        {!isLoaded ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#07080b]">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/15 border-t-white/60" />
          </div>
        ) : null}

        {activeTab ? (
          <div className={cn(activeTab.minWidthClassName)}>
            {isDesignTab ? (
              <div className="bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.1),transparent_42%)] px-4 py-5 md:px-6">
                <div className="mx-auto max-w-[72rem]">
                  <div
                    className="rounded-[1.6rem] border border-white/10 bg-[#15161b] p-3 shadow-[0_22px_60px_rgba(0,0,0,0.35)] transition-shadow duration-500 group-hover:shadow-[0_26px_70px_rgba(0,0,0,0.45)]"
                  >
                    <div className="mb-3 flex items-center gap-2 px-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                      <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/38">
                        laptop preview
                      </span>
                    </div>
                    <div className="overflow-hidden rounded-[1rem] border border-white/8 bg-[#0d0e12]">
                      <div className="relative mx-auto aspect-[16/10] max-w-[68rem] overflow-hidden bg-[#111216]">
                        <div
                          className="absolute left-1/2 top-0 h-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                          style={{
                            width: `${100 / zoom}%`,
                            transform: `translateX(-50%) scale(${zoom})`,
                            transformOrigin: "top center",
                          }}
                        >
                          <iframe
                            key={`${project.slug}-${activeTab.id}-${embedKey}`}
                            title={`${activeTab.title} workspace`}
                            src={activeTab.src}
                            className="h-full w-full border-0"
                            allow={activeTab.allow}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            onLoad={() => setIsLoaded(true)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-2 pb-1 pt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/32">
                      zoom {Math.round(zoom * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab.id === "flipbook" ? (
              <iframe
                key={`${project.slug}-${activeTab.id}-${embedKey}`}
                title={`${activeTab.title} workspace`}
                src={activeTab.src}
                className="h-[580px] w-full border-0 max-lg:h-[460px] max-md:h-[380px]"
                allow={activeTab.allow}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => setIsLoaded(true)}
              />
            ) : (
              <iframe
                key={`${project.slug}-${activeTab.id}-${embedKey}`}
                title={`${activeTab.title} workspace`}
                src={activeTab.src}
                className="h-[580px] w-full border-0 max-lg:h-[460px] max-md:h-[380px]"
                allow={activeTab.allow}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => setIsLoaded(true)}
              />
            )}
          </div>
        ) : (
          <WorkspacePlaceholder project={project} />
        )}
      </div>
    </motion.div>
  );
}

function WorkspacePlaceholder({ project }: { project: Project }) {
  return (
    <div className="flex min-h-[24rem] items-center justify-center p-8">
      <div className="max-w-lg text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
          <Palette size={20} className="text-muted-foreground" />
        </div>
        <h3 className="font-display text-xl font-medium text-white/80">
          Interactive Workspace Coming Soon
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {project.title} will include the live build or embedded design workspace here when a
          public URL is available.
        </p>
      </div>
    </div>
  );
}
