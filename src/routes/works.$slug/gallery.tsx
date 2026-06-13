import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectFlipbookEmbed, ProjectGalleryItem } from "@/data/projects";
import { getProjectGalleryImage } from "@/data/projectImages";
import { cn } from "@/lib/utils";
import { FadeIn } from "./sections";

export function GalleryPreviewImage({
  project,
  item,
}: {
  project: Project;
  item: ProjectGalleryItem;
}) {
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
    return (
      <div className="thin-x-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
        {items.map((item, i) => (
          <button
            key={item.label}
            onClick={() => openLightbox(i)}
            className="metal-panel group relative w-[78%] shrink-0 snap-center overflow-hidden text-left md:w-[60%] lg:w-[48%]"
          >
            <div className={cn("relative aspect-[16/10] bg-gradient-to-br", item.color)}>
              <GalleryPreviewImage project={project} item={item} />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_45%,rgba(0,0,0,0.4))]" />
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                {String(i + 1).padStart(2, "0")} <ArrowUpRight size={11} />
              </span>
            </div>
            <div className="p-5">
              <p className="font-display text-xl font-semibold">{item.label}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>
            </div>
          </button>
        ))}
      </div>
    );
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
