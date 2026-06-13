import { useEffect, useMemo, useState } from "react";
import { getProjectGalleryImage, getSocialMediaProjectImages } from "@/data/projectImages";
import { getProjectDisplayTitle } from "@/data/projects";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const MIN_BENTO_TILES = 6;
const MAX_BENTO_TILES = 9;

type ImageDimensions = {
  width: number;
  height: number;
};

function orderImagesForBento(images: string[], dimensions: ImageDimensions[]) {
  if (images.length !== dimensions.length) return images;

  const entries = images.map((image, index) => ({
    image,
    index,
    ratio: dimensions[index].height > 0 ? dimensions[index].width / dimensions[index].height : 1,
  }));
  const lead = entries.find((entry) => entry.ratio >= 0.8 && entry.ratio <= 1.25) ?? entries[0];
  const remaining = entries.filter((entry) => entry.index !== lead.index);
  const wide = remaining.filter((entry) => entry.ratio > 1.25);
  const wideIndexes = new Set(wide.map((entry) => entry.index));

  return [
    lead.image,
    ...wide.map((entry) => entry.image),
    ...remaining.filter((entry) => !wideIndexes.has(entry.index)).map((entry) => entry.image),
  ];
}

const bentoLayouts: Record<number, string[]> = {
  5: [
    "col-span-2 row-span-2",
    "col-span-2 row-span-1",
    "col-span-2 row-span-1",
    "col-span-2 row-span-2",
    "col-span-2 row-span-2",
  ],
  6: [
    "col-span-2 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-2",
    "col-span-2 row-span-2",
  ],
  7: [
    "col-span-2 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-2 row-span-1",
    "col-span-2 row-span-2",
  ],
  8: [
    "col-span-2 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-2 row-span-1",
    "col-span-2 row-span-1",
    "col-span-2 row-span-1",
  ],
  9: [
    "col-span-2 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
  ],
};

export function SocialMediaGraphicsShowcase({ projects }: { projects: Project[] }) {
  const [selectedSlug, setSelectedSlug] = useState(projects[0]?.slug ?? "");
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions[]>([]);
  const selectedProject = projects.find((project) => project.slug === selectedSlug) ?? projects[0];
  const selectedProjectSlug = selectedProject?.slug ?? "";
  const folderImages = useMemo(
    () => (selectedProjectSlug ? getSocialMediaProjectImages(selectedProjectSlug) : []),
    [selectedProjectSlug],
  );

  useEffect(() => {
    let cancelled = false;

    setImageDimensions([]);

    Promise.all(
      folderImages.map(
        (src) =>
          new Promise<ImageDimensions>((resolve) => {
            const image = new Image();
            image.onload = () =>
              resolve({
                width: image.naturalWidth,
                height: image.naturalHeight,
              });
            image.onerror = () => resolve({ width: 0, height: 0 });
            image.src = src;
          }),
      ),
    ).then((dimensions) => {
      if (!cancelled) setImageDimensions(dimensions);
    });

    return () => {
      cancelled = true;
    };
  }, [folderImages]);

  if (!selectedProject) return null;

  const hasMeasuredAllImages =
    folderImages.length > 0 && imageDimensions.length === folderImages.length;
  const hasCompleteMeasurements = folderImages.length === MAX_BENTO_TILES && hasMeasuredAllImages;
  const firstDimensions = imageDimensions[0];
  const hasUniformDimensions =
    hasCompleteMeasurements &&
    firstDimensions.width > 0 &&
    firstDimensions.height > 0 &&
    imageDimensions.every(
      ({ width, height }) => width === firstDimensions.width && height === firstDimensions.height,
    );
  const displayImages = hasUniformDimensions
    ? folderImages
    : orderImagesForBento(folderImages, imageDimensions);
  const imageRatios = imageDimensions.map(({ width, height }) => (height > 0 ? width / height : 1));
  const usesFiveTileMixedLayout =
    folderImages.length === 5 &&
    hasMeasuredAllImages &&
    imageRatios.filter((ratio) => ratio > 1.25).length === 2 &&
    imageRatios.filter((ratio) => ratio >= 0.8 && ratio <= 1.25).length === 3;
  const tileCount = usesFiveTileMixedLayout
    ? 5
    : Math.min(
        MAX_BENTO_TILES,
        Math.max(MIN_BENTO_TILES, folderImages.length, selectedProject.gallery.length),
      );
  const layout = bentoLayouts[tileCount];
  const gallerySlots = Array.from({ length: tileCount }, (_, index) => {
    const item = selectedProject.gallery[index] ?? null;
    return {
      item,
      image:
        displayImages[index] ?? (item ? getProjectGalleryImage(selectedProject, item) : undefined),
    };
  });

  return (
    <section className="relative z-10 mx-auto mt-12 max-w-7xl px-4 sm:mt-16 sm:px-6">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.5fr)]">
        <div className="max-h-[52rem] space-y-3 overflow-y-auto pr-2">
          {projects.map((project) => {
            const isSelected = project.slug === selectedProject.slug;

            return (
              <button
                key={project.slug}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedSlug(project.slug)}
                className={cn(
                  "metal-panel w-full rounded-xl p-4 text-left transition-all duration-200",
                  isSelected ? "ring-2 ring-primary" : "hover:bg-white/5",
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
          className={cn(
            "grid aspect-square gap-2",
            hasUniformDimensions
              ? "grid-cols-3 grid-rows-3"
              : "grid-flow-dense grid-cols-4 grid-rows-4",
          )}
        >
          {gallerySlots.map(({ item, image }, index) => (
            <div
              key={`${selectedProject.slug}-${item?.label ?? "empty"}-${index}`}
              className={cn(
                "metal-panel group relative min-h-0 overflow-hidden rounded-lg",
                hasUniformDimensions ? "col-span-1 row-span-1" : layout[index],
                !image && "bg-gradient-to-br",
                !image ? (item?.color ?? selectedProject.color) : "",
              )}
            >
              {image ? (
                <>
                  <img
                    src={image}
                    alt={`${selectedProject.title} - ${item?.label ?? `asset ${index + 1}`}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70" />
                  {item ? (
                    <span className="absolute bottom-2 left-2 right-2 line-clamp-1 text-[9px] font-medium text-white/80 sm:text-[10px]">
                      {item.label}
                    </span>
                  ) : null}
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center p-2 text-center">
                  <span className="font-mono text-[9px] text-white/40 sm:text-[10px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 line-clamp-2 text-[9px] font-medium text-white/60 sm:text-[10px]">
                    {item?.label ?? selectedProject.title}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
