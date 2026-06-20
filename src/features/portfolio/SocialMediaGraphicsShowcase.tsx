import { useEffect, useMemo, useRef, useState } from "react";
import { ZoomIn } from "lucide-react";
import { Lightbox, type LightboxItem } from "@/components/site/Lightbox";
import { getProjectGalleryImage, getSocialMediaProjectImages } from "@/data/projectImages";
import { getProjectDisplayTitle } from "@/data/projects";
import type { Project, ProjectGalleryItem } from "@/data/projects";
import { cn } from "@/lib/utils";

type ImageDimensions = {
  width: number;
  height: number;
};

type BentoTile = {
  image?: string;
  item: ProjectGalleryItem | null;
  sourceIndex: number;
  ratio: number;
};

type BentoSlot = {
  column: number;
  row: number;
  columnSpan: number;
  rowSpan: number;
};

type BentoLayout = {
  columns: number;
  rows: number;
  slots: BentoSlot[];
};

const slot = (column: number, row: number, columnSpan = 1, rowSpan = 1): BentoSlot => ({
  column,
  row,
  columnSpan,
  rowSpan,
});

const squareLayouts: Record<number, BentoLayout> = {
  1: { columns: 1, rows: 1, slots: [slot(1, 1)] },
  2: { columns: 2, rows: 1, slots: [slot(1, 1), slot(2, 1)] },
  3: {
    columns: 3,
    rows: 2,
    slots: [slot(1, 1, 2, 2), slot(3, 1), slot(3, 2)],
  },
  4: {
    columns: 2,
    rows: 2,
    slots: [slot(1, 1), slot(2, 1), slot(1, 2), slot(2, 2)],
  },
  5: {
    columns: 4,
    rows: 2,
    slots: [slot(1, 1, 2, 2), slot(3, 1), slot(4, 1), slot(3, 2), slot(4, 2)],
  },
  6: {
    columns: 3,
    rows: 2,
    slots: [slot(1, 1), slot(2, 1), slot(3, 1), slot(1, 2), slot(2, 2), slot(3, 2)],
  },
  7: {
    columns: 5,
    rows: 2,
    slots: [
      slot(1, 1, 2, 2),
      slot(3, 1),
      slot(4, 1),
      slot(5, 1),
      slot(3, 2),
      slot(4, 2),
      slot(5, 2),
    ],
  },
  8: {
    columns: 4,
    rows: 2,
    slots: [
      slot(1, 1),
      slot(2, 1),
      slot(3, 1),
      slot(4, 1),
      slot(1, 2),
      slot(2, 2),
      slot(3, 2),
      slot(4, 2),
    ],
  },
  9: {
    columns: 3,
    rows: 3,
    slots: [
      slot(1, 1),
      slot(2, 1),
      slot(3, 1),
      slot(1, 2),
      slot(2, 2),
      slot(3, 2),
      slot(1, 3),
      slot(2, 3),
      slot(3, 3),
    ],
  },
};

const mixedLayouts: Partial<Record<number, BentoLayout[]>> = {
  1: [
    {
      columns: 2,
      rows: 1,
      slots: [slot(1, 1, 2, 1)],
    },
    {
      columns: 3,
      rows: 4,
      slots: [slot(1, 1, 3, 4)],
    },
  ],
  2: [
    {
      columns: 2,
      rows: 2,
      slots: [slot(1, 1, 2, 1), slot(1, 2, 2, 1)],
    },
    {
      columns: 6,
      rows: 4,
      slots: [slot(1, 1, 3, 4), slot(4, 1, 3, 4)],
    },
  ],
  3: [
    {
      columns: 4,
      rows: 4,
      slots: [slot(1, 1, 4, 2), slot(1, 3, 2, 2), slot(3, 3, 2, 2)],
    },
    {
      columns: 5,
      rows: 4,
      slots: [slot(1, 1, 3, 4), slot(4, 1, 2, 2), slot(4, 3, 2, 2)],
    },
  ],
  4: [
    {
      columns: 6,
      rows: 5,
      slots: [slot(1, 1, 6, 3), slot(1, 4, 2, 2), slot(3, 4, 2, 2), slot(5, 4, 2, 2)],
    },
    {
      columns: 9,
      rows: 4,
      slots: [slot(1, 1, 4, 4), slot(5, 1, 3, 4), slot(8, 1, 2, 2), slot(8, 3, 2, 2)],
    },
  ],
  5: [
    {
      columns: 6,
      rows: 4,
      slots: [
        slot(1, 1, 4, 2),
        slot(5, 1, 2, 2),
        slot(1, 3, 2, 2),
        slot(3, 3, 2, 2),
        slot(5, 3, 2, 2),
      ],
    },
    {
      columns: 4,
      rows: 4,
      slots: [
        slot(1, 1, 2, 2),
        slot(3, 1, 2, 1),
        slot(3, 2, 2, 1),
        slot(1, 3, 2, 2),
        slot(3, 3, 2, 2),
      ],
    },
    {
      columns: 7,
      rows: 4,
      slots: [
        slot(1, 1, 3, 4),
        slot(4, 1, 2, 2),
        slot(6, 1, 2, 2),
        slot(4, 3, 2, 2),
        slot(6, 3, 2, 2),
      ],
    },
  ],
  6: [
    {
      columns: 4,
      rows: 4,
      slots: [
        slot(1, 1, 2, 2),
        slot(3, 1, 2, 1),
        slot(3, 2),
        slot(4, 2),
        slot(1, 3, 2, 2),
        slot(3, 3, 2, 2),
      ],
    },
  ],
  7: [
    {
      columns: 4,
      rows: 4,
      slots: [
        slot(1, 1, 2, 2),
        slot(3, 1, 2, 1),
        slot(3, 2),
        slot(4, 2),
        slot(1, 3, 2, 1),
        slot(1, 4, 2, 1),
        slot(3, 3, 2, 2),
      ],
    },
  ],
  8: [
    {
      columns: 4,
      rows: 4,
      slots: [
        slot(1, 1, 2, 2),
        slot(3, 1, 2, 1),
        slot(3, 2),
        slot(4, 2),
        slot(1, 3, 2, 1),
        slot(3, 3, 2, 1),
        slot(1, 4, 2, 1),
        slot(3, 4, 2, 1),
      ],
    },
  ],
  9: [
    {
      columns: 4,
      rows: 4,
      slots: [
        slot(1, 1, 2, 2),
        slot(3, 1, 2, 1),
        slot(3, 2),
        slot(4, 2),
        slot(1, 3, 2, 1),
        slot(3, 3, 2, 1),
        slot(1, 4),
        slot(2, 4),
        slot(3, 4, 2, 1),
      ],
    },
  ],
};

const getSlotRatio = (_layout: BentoLayout, layoutSlot: BentoSlot) =>
  layoutSlot.columnSpan / layoutSlot.rowSpan;

const ratioDistance = (imageRatio: number, slotRatio: number) =>
  Math.abs(Math.log(Math.max(imageRatio, 0.01) / Math.max(slotRatio, 0.01)));

function arrangeTiles(tiles: BentoTile[], layout: BentoLayout) {
  const remaining = [...tiles];
  const arranged = Array<BentoTile>(layout.slots.length);
  const prioritizedSlots = layout.slots
    .map((layoutSlot, index) => ({
      index,
      ratio: getSlotRatio(layout, layoutSlot),
    }))
    .sort((a, b) => Math.abs(Math.log(b.ratio)) - Math.abs(Math.log(a.ratio)));

  for (const layoutSlot of prioritizedSlots) {
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    remaining.forEach((tile, index) => {
      const distance = ratioDistance(tile.ratio, layoutSlot.ratio);
      if (distance < bestDistance) {
        bestIndex = index;
        bestDistance = distance;
      }
    });

    arranged[layoutSlot.index] = remaining.splice(bestIndex, 1)[0];
  }

  return {
    tiles: arranged,
    score: arranged.reduce(
      (score, tile, index) =>
        score + ratioDistance(tile.ratio, getSlotRatio(layout, layout.slots[index])),
      0,
    ),
  };
}

function getFallbackLayout(count: number): BentoLayout {
  const columns = Math.max(1, count >= 10 ? 4 : Math.min(3, count));
  const rows = Math.max(1, Math.ceil(count / columns));

  return {
    columns,
    rows,
    slots: Array.from({ length: count }, (_, index) =>
      slot((index % columns) + 1, Math.floor(index / columns) + 1),
    ),
  };
}

function getSmartBento(tiles: BentoTile[]) {
  const squareLayout = squareLayouts[tiles.length] ?? getFallbackLayout(tiles.length);
  const candidates = [squareLayout, ...(mixedLayouts[tiles.length] ?? [])];

  return candidates
    .map((layout) => ({ layout, ...arrangeTiles(tiles, layout) }))
    .sort((a, b) => a.score - b.score)[0];
}

const getGalleryRatio = (item: ProjectGalleryItem | null) => {
  if (item?.ratio === "wide") return 2;
  if (item?.ratio === "tall") return 0.75;
  return 1;
};

type SocialMediaGraphicsShowcaseProps = {
  projects: Project[];
  requestedSlug?: string | null;
  requestId?: number;
};

export function SocialMediaGraphicsShowcase({
  projects,
  requestedSlug,
  requestId = 0,
}: SocialMediaGraphicsShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedSlug, setSelectedSlug] = useState(projects[0]?.slug ?? "");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setLightboxIndex(null);
  }, [selectedSlug]);

  useEffect(() => {
    if (!requestedSlug || !projects.some((project) => project.slug === requestedSlug)) return;

    const frame = window.requestAnimationFrame(() => {
      const recommendation =
        sectionRef.current?.querySelector<HTMLButtonElement>(
          `[data-project-slug="${requestedSlug}"]`,
        ) ?? null;

      recommendation?.click();
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      recommendation?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [projects, requestId, requestedSlug]);
  const [imageDimensions, setImageDimensions] = useState<Record<string, ImageDimensions>>({});
  const selectedProject = projects.find((project) => project.slug === selectedSlug) ?? projects[0];
  const selectedProjectSlug = selectedProject?.slug ?? "";
  const folderImages = useMemo(
    () => (selectedProjectSlug ? getSocialMediaProjectImages(selectedProjectSlug) : []),
    [selectedProjectSlug],
  );
  const sourceTiles = useMemo(() => {
    if (!selectedProject) return [];

    const resolvedGalleryTiles = selectedProject.gallery.flatMap((item, sourceIndex) => {
      const image = getProjectGalleryImage(selectedProject, item);
      return image ? [{ image, item, sourceIndex, fromFolder: false }] : [];
    });

    if (resolvedGalleryTiles.length > 0) {
      const usedImages = new Set(resolvedGalleryTiles.map(({ image }) => image));
      return [
        ...resolvedGalleryTiles,
        ...folderImages
          .filter((image) => !usedImages.has(image))
          .map((image, index) => ({
            image,
            item: null,
            sourceIndex: selectedProject.gallery.length + index,
            fromFolder: true,
          })),
      ];
    }

    if (folderImages.length > 0) {
      return folderImages.map((image, sourceIndex) => ({
        image,
        item: selectedProject.gallery[sourceIndex] ?? null,
        sourceIndex,
        fromFolder: true,
      }));
    }

    return selectedProject.gallery.map((item, sourceIndex) => ({
      image: undefined,
      item,
      sourceIndex,
      fromFolder: false,
    }));
  }, [folderImages, selectedProject]);

  useEffect(() => {
    let cancelled = false;
    const images = sourceTiles.flatMap(({ image }) => (image ? [image] : []));

    setImageDimensions({});

    Promise.all(
      images.map(
        (src) =>
          new Promise<[string, ImageDimensions]>((resolve) => {
            const image = new Image();
            image.onload = () =>
              resolve([
                src,
                {
                  width: image.naturalWidth,
                  height: image.naturalHeight,
                },
              ]);
            image.onerror = () => resolve([src, { width: 0, height: 0 }]);
            image.src = src;
          }),
      ),
    ).then((dimensions) => {
      if (!cancelled) setImageDimensions(Object.fromEntries(dimensions));
    });

    return () => {
      cancelled = true;
    };
  }, [sourceTiles]);

  if (!selectedProject) return null;

  const measuredTiles: BentoTile[] = sourceTiles.map((tile) => {
    const dimensions = tile.image ? imageDimensions[tile.image] : undefined;
    return {
      ...tile,
      ratio:
        dimensions && dimensions.height > 0
          ? dimensions.width / dimensions.height
          : getGalleryRatio(tile.item),
    };
  });
  const bento = getSmartBento(measuredTiles);
  const lightboxItems: LightboxItem[] = measuredTiles.map(({ item, image }, index) => ({
    color: item?.color ?? selectedProject.color,
    label: item?.label ?? `${getProjectDisplayTitle(selectedProject, "Social Media Graphics")} asset ${index + 1}`,
    note: item?.note ?? "Click outside or press Esc to close.",
    src: image,
  }));

  return (
    <>
      <section
        ref={sectionRef}
        id="social-media-showcase"
        className="relative z-10 mx-auto mt-14 max-w-7xl scroll-mt-24 px-4 sm:mt-16 sm:px-6"
      >
        <div className="grid items-start gap-5 sm:gap-6 lg:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.5fr)]">
          <div className="max-h-[52rem] space-y-3.5 overflow-y-auto pr-1 sm:pr-2">
            {projects.map((project) => {
              const isSelected = project.slug === selectedProject.slug;

              return (
                <button
                  key={project.slug}
                  type="button"
                  data-project-slug={project.slug}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedSlug(project.slug)}
                  className={cn(
                    "metal-panel w-full rounded-xl p-4 text-left transition-colors duration-200",
                    isSelected ? "ring-2 ring-primary" : "hover:bg-white/[0.06]",
                  )}
                >
                  <p className="font-display text-sm font-bold">
                    {getProjectDisplayTitle(project, "Social Media Graphics")}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {project.tag} / {project.year}
                  </p>
                </button>
              );
            })}
          </div>

          <div
            className="grid min-h-[24rem] gap-2.5 overflow-hidden lg:min-h-0"
            style={{
              aspectRatio: `${bento.layout.columns} / ${bento.layout.rows}`,
              gridTemplateColumns: `repeat(${bento.layout.columns}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${bento.layout.rows}, minmax(0, 1fr))`,
            }}
          >
            {bento.tiles.map(({ item, image, sourceIndex, fromFolder }, index) => {
              const layoutSlot = bento.layout.slots[index];

              const tileClassName = cn(
                "metal-panel group relative min-h-0 overflow-hidden rounded-lg text-left",
                !image && "bg-gradient-to-br",
                !image ? (item?.color ?? selectedProject.color) : "",
              );
              const tileStyle = {
                gridColumn: `${layoutSlot.column} / span ${layoutSlot.columnSpan}`,
                gridRow: `${layoutSlot.row} / span ${layoutSlot.rowSpan}`,
              };

              if (!image) {
                return (
                  <div
                    key={`${selectedProject.slug}-${item?.label ?? sourceIndex}`}
                    className={tileClassName}
                    style={tileStyle}
                  >
                    <div className="flex h-full flex-col items-center justify-center p-2 text-center">
                      <span className="font-mono text-[9px] text-white/40 sm:text-[10px]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={`${selectedProject.slug}-${image ?? item?.label ?? sourceIndex}`}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className={tileClassName}
                  style={tileStyle}
                  aria-label={`Open ${lightboxItems[index]?.label ?? `asset ${index + 1}`}`}
                >
                  <div className={cn("h-full w-full", fromFolder && "pt-3")}>
                    <img
                      src={image}
                      alt={`${selectedProject.title} - ${item?.label ?? `asset ${index + 1}`}`}
                      className={cn(
                        "transition-transform duration-500 group-hover:scale-[1.02]",
                        fromFolder ? "h-[calc(100%-0.75rem)] w-full object-contain" : "h-full w-full object-cover",
                      )}
                      loading="lazy"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70" />
                  <div className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/12 bg-black/40 p-2 text-white/80 backdrop-blur-sm">
                    <ZoomIn size={14} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}
