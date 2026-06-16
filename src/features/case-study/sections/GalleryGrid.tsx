import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import type { Project, ProjectFlipbookEmbed, ProjectGalleryItem } from "@/data/projects";
import { getProjectGalleryImage } from "@/data/projectImages";
import { cn } from "@/lib/utils";
import { FadeIn } from "./SectionWrappers";

function GalleryPreviewImage({ project, item }: { project: Project; item: ProjectGalleryItem }) {
  const image = getProjectGalleryImage(project, item);
  return (
    <>
      {image ? (
        <img
          src={image}
          alt={`${project.title} - ${item.label}`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      ) : null}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          item.color,
          image ? "opacity-20 mix-blend-overlay" : "opacity-100",
        )}
      />
    </>
  );
}

function Slideshow({
  items,
  project,
  openLightbox,
}: {
  items: ProjectGalleryItem[];
  project: Project;
  openLightbox: (i: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > current ? 1 : -1);
      setCurrent(((i % items.length) + items.length) % items.length);
    },
    [current, items.length],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
  }, [paused, next]);

  const item = items[current];

  return (
    <div
      className="mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @keyframes slide-from-right {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-from-left {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-right { animation: slide-from-right 0.45s ease-out both; }
        .animate-slide-left { animation: slide-from-left 0.45s ease-out both; }
        .animate-fade-up { animation: fade-up 0.4s ease-out both; }
      `}</style>

      <div className="relative overflow-hidden rounded-xl">
        <div className="relative w-full overflow-hidden">
          <button
            onClick={() => openLightbox(current)}
            className="metal-panel group relative block w-full text-left"
          >
            <div
              key={current}
              className={cn(
                "relative aspect-[16/10] bg-gradient-to-br",
                direction > 0 ? "animate-slide-right" : "animate-slide-left",
                item.color,
              )}
            >
              <GalleryPreviewImage project={project} item={item} />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_45%,rgba(0,0,0,0.4))]" />
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                {String(current + 1).padStart(2, "0")} <ArrowUpRight size={11} />
              </span>
            </div>
          </button>

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/80 backdrop-blur transition hover:bg-black/70 hover:text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/80 backdrop-blur transition hover:bg-black/70 hover:text-white"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div key={`text-${current}`} className="animate-fade-up p-5" style={{ animationDelay: "0.12s" }}>
        <p className="font-display text-xl font-semibold">{item.label}</p>
        <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>
      </div>

      <div className="flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === current
                ? "w-6 bg-primary"
                : "w-2 bg-white/20 hover:bg-white/40",
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function GalleryGrid({
  project,
  openLightbox,
  variant = "grid",
}: {
  project: Project;
  openLightbox: (i: number) => void;
  variant?: "grid" | "masonry" | "stack" | "documents";
}) {
  const items = project.gallery;
  if (variant === "stack") {
    return <Slideshow items={items} project={project} openLightbox={openLightbox} />;
  }
  if (variant === "documents") {
    return (
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {items.map((item, i) => (
          <FadeIn key={item.label} delay={i * 0.05}>
            <button
              onClick={() => openLightbox(i)}
              className="metal-card group relative flex w-full flex-col overflow-hidden text-left sm:flex-row"
            >
              <div
                className={cn(
                  "relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-gradient-to-br sm:aspect-auto sm:w-36",
                  item.color,
                )}
              >
                <GalleryPreviewImage project={project} item={item} />
              </div>
              <div className="flex-1 p-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                  Document · {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-display text-xl font-semibold">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.note}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open <ArrowUpRight size={11} />
                </span>
              </div>
            </button>
          </FadeIn>
        ))}
      </div>
    );
  }
  if (variant === "masonry") {
    return (
      <div className="mt-10 grid auto-rows-[10rem] grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((item, i) => {
          const span =
            item.ratio === "tall"
              ? "row-span-3 col-span-1"
              : item.ratio === "wide"
                ? "row-span-2 col-span-2"
                : "row-span-2 col-span-1";
          return (
            <FadeIn key={item.label} delay={i * 0.06} className={span}>
              <button
                onClick={() => openLightbox(i)}
                className="metal-panel group relative h-full w-full overflow-hidden text-left"
              >
                <GalleryPreviewImage project={project} item={item} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.55))]" />
                <div className="relative z-10 flex h-full flex-col justify-end p-4">
                  <p className="font-display text-sm font-semibold">{item.label}</p>
                </div>
              </button>
            </FadeIn>
          );
        })}
      </div>
    );
  }
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <FadeIn key={item.label} delay={i * 0.06}>
          <button
            onClick={() => openLightbox(i)}
            className="metal-panel group relative aspect-[4/3] w-full overflow-hidden text-left"
          >
            <GalleryPreviewImage project={project} item={item} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.55))]" />
            <div className="relative z-10 flex h-full flex-col justify-end p-5">
              <p className="font-display text-lg font-semibold">{item.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
            </div>
          </button>
        </FadeIn>
      ))}
    </div>
  );
}

export function FlipbookEmbed({ embed }: { embed: ProjectFlipbookEmbed }) {
  return (
    <FadeIn delay={0.08}>
      <div className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-[#060708] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <iframe
          title={embed.title}
          src={embed.src}
          allow="clipboard-write"
          allowFullScreen
          scrolling="no"
          loading="lazy"
          className="fp-iframe block h-[600px] w-full border-0 xl:h-[680px]"
        />
      </div>
    </FadeIn>
  );
}
