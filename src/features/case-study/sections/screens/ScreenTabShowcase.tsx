import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project, ProjectGalleryItem } from "@/data/projects";
import { getProjectGalleryImage } from "@/data/projectImages";
import { cn } from "@/lib/utils";

export function ScreenTabShowcase({
  project,
  modules,
  openLightbox,
}: {
  project: Project;
  modules: { title: string; desc: string }[];
  openLightbox?: (i: number) => void;
}) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const screenItems = (modules.length > 0
    ? modules
    : project.gallery.map((item) => ({
        title: item.label,
        desc: item.note,
      }))
  ).map((module, index) => {
    const galleryItem = project.gallery[index];
    return {
      title: module.title,
      desc: module.desc,
      galleryItem,
      image: galleryItem ? getProjectGalleryImage(project, galleryItem) : undefined,
    };
  });

  if (screenItems.length === 0) return null;

  const activeItem = screenItems[active] ?? screenItems[0];
  const activeGradient = activeItem?.galleryItem?.color ?? "from-slate-500/60 to-slate-700/40";
  const canOpenLightbox =
    typeof openLightbox === "function" && Boolean(activeItem?.image && activeItem.galleryItem);

  const onTabChange = (index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  return (
    <div className="mt-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}
        className="mx-auto max-w-6xl"
      >
        <div className="rounded-[1.75rem] border border-white/12 bg-[#17191d] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:p-4">
          <ScreenTabBar items={screenItems} active={active} onTabChange={onTabChange} />

          <div className="overflow-hidden rounded-[1.1rem] border border-white/8 bg-[#0f1115]">
            <div className="flex items-center gap-2 border-b border-white/8 bg-[#121419] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 truncate font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                {project.slug}.app / {activeItem.title}
              </span>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden bg-[#f5f1ea]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${active}-${activeItem.title}`}
                  initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {activeItem.image ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (canOpenLightbox) openLightbox(active);
                      }}
                      className={cn(
                        "group h-full w-full text-left",
                        !canOpenLightbox && "cursor-default",
                      )}
                    >
                      <img
                        src={activeItem.image}
                        alt={`${project.title} - ${activeItem.title}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03),rgba(0,0,0,0.28))]" />
                      {canOpenLightbox ? (
                        <span className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/88 backdrop-blur">
                          Open <ArrowUpRight size={11} />
                        </span>
                      ) : null}
                    </button>
                  ) : (
                    <ScreenMockCard
                      project={project}
                      title={activeItem.title}
                      desc={activeItem.desc}
                      gradient={activeGradient}
                      index={active}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mx-auto h-7 w-[28%] min-w-[9rem] rounded-b-[1.1rem] bg-[#17191d]" />
        <div className="mx-auto h-3 w-[42%] min-w-[12rem] rounded-full bg-[#0f1115]/90 blur-[1px]" />

        <div className="mt-6 grid gap-3 md:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]">
          <div>
            <p className="font-display text-2xl font-semibold text-white/92">{activeItem.title}</p>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
              {activeItem.desc}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
              Screen cue
            </p>
            <p className="mt-3 text-sm leading-7 text-white/80">
              {activeItem.image
                ? "This view uses the real project screenshot already available in the portfolio assets."
                : "This view uses a generated screen mock so the case study keeps a strong structure while final visuals are still being prepared."}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ScreenTabBar({
  items,
  active,
  onTabChange,
}: {
  items: { title: string }[];
  active: number;
  onTabChange: (index: number) => void;
}) {
  return (
    <div className="mb-3 flex flex-wrap gap-2 rounded-2xl border border-white/8 bg-black/25 p-2">
      {items.map((item, index) => {
        const isActive = index === active;
        return (
          <button
            key={`${item.title}-${index}`}
            type="button"
            onClick={() => onTabChange(index)}
            className={cn(
              "rounded-full border px-3 py-2 text-left text-[11px] font-medium uppercase tracking-[0.16em] transition-all md:px-4",
              isActive
                ? "border-white/20 bg-white text-black"
                : "border-white/10 bg-white/[0.03] text-white/72 hover:border-white/18 hover:bg-white/[0.06]",
            )}
          >
            {item.title}
          </button>
        );
      })}
    </div>
  );
}

function ScreenMockCard({
  project,
  title,
  desc,
  gradient,
  index,
}: {
  project: Project;
  title: string;
  desc: string;
  gradient: string;
  index: number;
}) {
  const metrics = [14, 28, 42].map((value) => String(value + index * 7).padStart(2, "0"));

  return (
    <div className="h-full bg-[#f5f1ea] p-5 text-[#14161b] md:p-6">
      <div className="rounded-[1.4rem] border border-black/10 bg-white shadow-[0_12px_30px_rgba(10,12,16,0.08)]">
        <div className="flex items-center justify-between border-b border-black/8 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/45">
            {project.slug}.app / {title}
          </span>
        </div>

        <div className="space-y-4 p-4 md:p-5">
          <div className="grid gap-3 md:grid-cols-3">
            {metrics.map((metric, metricIndex) => (
              <div
                key={`${metric}-${metricIndex}`}
                className={cn(
                  "rounded-2xl bg-gradient-to-br p-4 text-white shadow-sm",
                  metricIndex === 1
                    ? "from-slate-800 to-slate-600"
                    : cn("from-black/80 to-black/55", gradient),
                )}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                  Metric {metricIndex + 1}
                </p>
                <p className="mt-4 font-display text-3xl font-semibold">{metric}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-black/8 bg-[#faf7f1] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/45">
              Activity
            </p>
            <div className="mt-4 grid h-24 grid-cols-12 items-end gap-1">
              {Array.from({ length: 12 }).map((_, barIndex) => (
                <div
                  key={barIndex}
                  className={cn("rounded-sm bg-gradient-to-t", gradient)}
                  style={{ height: `${28 + ((barIndex * 17 + index * 13) % 58)}%` }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="flex items-center justify-between rounded-xl border border-black/8 bg-[#faf7f1] px-4 py-3"
              >
                <span className="font-mono text-[11px] text-black/55">
                  #{String(100 + rowIndex + index * 10)}
                </span>
                <span className="mx-4 flex-1 truncate text-sm text-black/72">
                  {rowIndex === 0 ? title : rowIndex === 1 ? project.title : desc}
                </span>
                <span className="rounded-full bg-[#14161b] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white">
                  OK
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

