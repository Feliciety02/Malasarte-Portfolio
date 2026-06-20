import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, BookOpen, Monitor, Palette } from "lucide-react";
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

function MacWindow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[72rem]">
      <div className="overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#15161b] shadow-[0_32px_80px_rgba(0,0,0,0.45)] transition-shadow duration-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
        <div className="flex h-12 items-center gap-2 border-b border-white/[0.06] px-4">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
            {label}
          </span>
        </div>
        {children}
      </div>
    </div>
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

  useEffect(() => {
    setIsLoaded(false);
    setEmbedKey((c) => c + 1);
  }, [activeTab?.id, activeTab?.src]);

  if (tabs.length === 0) return null;

  const tabIcon = (id: string) => {
    switch (id) {
      case "live": return <Monitor size={13} />;
      case "flipbook": return <BookOpen size={13} />;
      default: return <Palette size={13} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-6"
    >
      {/* Action bar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
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
                    {tabIcon(tab.id)}
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
        </div>
      </div>

      {/* Preview window */}
      <div
        ref={containerRef}
        className="relative"
      >
        {/* Loading spinner */}
        {!isLoaded ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/15 border-t-white/60" />
          </div>
        ) : null}

        {activeTab ? (
          <div className={cn(activeTab.minWidthClassName)}>
            {isDesignTab ? (
              <MacWindow label={activeTab.label}>
                <div className="overflow-hidden bg-[#0d0e12]">
                  <div className="relative mx-auto aspect-[16/10] overflow-hidden bg-[#111216]">
                    <iframe
                      key={`${project.slug}-${activeTab.id}-${embedKey}`}
                      title={`${activeTab.title} workspace`}
                      src={activeTab.src}
                      className="h-full w-full border-0"
                      allow={activeTab.allow}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      onLoad={() => setIsLoaded(true)}
                    />
                  </div>
                </div>
              </MacWindow>
            ) : activeTab.id === "flipbook" ? (
              <MacWindow label={activeTab.label}>
                <iframe
                  key={`${project.slug}-${activeTab.id}-${embedKey}`}
                  title={`${activeTab.title} workspace`}
                  src={activeTab.src}
                  className="h-[580px] w-full border-0 max-lg:h-[460px] max-md:h-[380px]"
                  allow={activeTab.allow}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  onLoad={() => setIsLoaded(true)}
                />
              </MacWindow>
            ) : (
              <MacWindow label={activeTab.label}>
                <iframe
                  key={`${project.slug}-${activeTab.id}-${embedKey}`}
                  title={`${activeTab.title} workspace`}
                  src={activeTab.src}
                  className="h-[580px] w-full border-0 max-lg:h-[460px] max-md:h-[380px]"
                  allow={activeTab.allow}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  onLoad={() => setIsLoaded(true)}
                />
              </MacWindow>
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
