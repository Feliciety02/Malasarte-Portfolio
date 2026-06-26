import { useEffect, useMemo, useRef, useState } from "react";
import { ZoomIn } from "lucide-react";
import { Lightbox, type LightboxItem } from "@/components/site/Lightbox";
import { getProjectGalleryImage, getSocialMediaProjectImages } from "@/data/projectImages";
import { getProjectDisplayTitle } from "@/data/projects";
import type { Project, ProjectGalleryItem } from "@/data/projects";
import { cn } from "@/lib/utils";
import { BentoProjectCard } from "./BentoProjectCard";

const GRID_PAGE_SIZE = 16;
const AUTOPLAY_MS = 5000;

type ShowcaseTile = {
  image?: string;
  item: ProjectGalleryItem | null;
  sourceIndex: number;
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
  const [activePage, setActivePage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setLightboxIndex(null);
    setActivePage(0);
  }, [selectedSlug]);

  useEffect(() => {
    if (!requestedSlug || !projects.some((project) => project.slug === requestedSlug)) return;

    const frame = window.requestAnimationFrame(() => {
      const recommendation =
        sectionRef.current?.querySelector<HTMLButtonElement>(
          `[data-project-slug="${requestedSlug}"] button`,
        ) ?? null;

      recommendation?.click();
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      recommendation?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [projects, requestId, requestedSlug]);

  const selectedProject = projects.find((project) => project.slug === selectedSlug) ?? projects[0];
  const selectedProjectSlug = selectedProject?.slug ?? "";

  const folderImages = useMemo(
    () => (selectedProjectSlug ? getSocialMediaProjectImages(selectedProjectSlug) : []),
    [selectedProjectSlug],
  );

  const sourceTiles = useMemo<ShowcaseTile[]>(() => {
    if (!selectedProject) return [];

    const resolvedGalleryTiles = selectedProject.gallery.flatMap((item, sourceIndex) => {
      const image = getProjectGalleryImage(selectedProject, item);
      return image ? [{ image, item, sourceIndex }] : [];
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
          })),
      ];
    }

    if (folderImages.length > 0) {
      return folderImages.map((image, sourceIndex) => ({
        image,
        item: selectedProject.gallery[sourceIndex] ?? null,
        sourceIndex,
      }));
    }

    return selectedProject.gallery.map((item, sourceIndex) => ({
      image: undefined,
      item,
      sourceIndex,
    }));
  }, [folderImages, selectedProject]);

  const lightboxItems: LightboxItem[] = sourceTiles.map(({ item, image }, index) => ({
    color: item?.color ?? selectedProject?.color ?? "from-cyan-500/50 to-blue-500/30",
    label:
      item?.label ??
      `${getProjectDisplayTitle(selectedProject, selectedProject?.cat ?? "Social Media Graphics")} asset ${index + 1}`,
    note: item?.note ?? "Click outside or press Esc to close.",
    src: image,
  }));

  const pageCount = Math.max(1, Math.ceil(sourceTiles.length / GRID_PAGE_SIZE));

  useEffect(() => {
    if (activePage >= pageCount) setActivePage(0);
  }, [activePage, pageCount]);

  useEffect(() => {
    if (isPaused || pageCount <= 1) return;

    const interval = window.setInterval(() => {
      setActivePage((current) => (current + 1) % pageCount);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(interval);
  }, [isPaused, pageCount]);

  const pagedTiles = sourceTiles.slice(
    activePage * GRID_PAGE_SIZE,
    activePage * GRID_PAGE_SIZE + GRID_PAGE_SIZE,
  );

  if (!selectedProject) return null;

  return (
    <>
      <section
        ref={sectionRef}
        id="social-media-showcase"
        className="relative z-10 mx-auto mt-14 max-w-7xl scroll-mt-24 px-4 sm:mt-16 sm:px-6"
      >
        <div className="grid items-start gap-5 sm:gap-6 lg:grid-cols-[minmax(18rem,0.9fr)_minmax(0,1.15fr)]">
          <div className="max-h-[52rem] space-y-3.5 overflow-y-auto pr-1 sm:pr-2">
            {projects.map((project) => {
              const isSelected = project.slug === selectedProject.slug;

              return (
                <BentoProjectCard
                  key={project.slug}
                  project={project}
                  type="gallery"
                  onSocialClick={setSelectedSlug}
                  isSelected={isSelected}
                  className="!min-h-0"
                />
              );
            })}
          </div>

          <div
            className="space-y-4 lg:max-w-4xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
              {pagedTiles.map(({ item, image, sourceIndex }, index) => {
                const globalIndex = activePage * GRID_PAGE_SIZE + index;
                const tileKey = `${selectedProject.slug}-${image ?? item?.label ?? sourceIndex}`;

                if (!image) {
                  return (
                    <div
                      key={tileKey}
                      className={cn(
                        "metal-panel relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br",
                        item?.color ?? selectedProject.color,
                      )}
                    >
                      <div className="flex h-full items-center justify-center p-2 text-center">
                        <span className="font-mono text-[9px] text-white/40 sm:text-[10px]">
                          {String(globalIndex + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={tileKey}
                    type="button"
                    onClick={() => setLightboxIndex(globalIndex)}
                    className="metal-panel group relative aspect-square overflow-hidden rounded-lg text-left"
                    aria-label={`Open ${lightboxItems[globalIndex]?.label ?? `asset ${globalIndex + 1}`}`}
                  >
                    <div className="flex h-full w-full items-center justify-center bg-black/28 p-1.5 sm:p-2">
                      <img
                        src={image}
                        alt={`${selectedProject.title} - ${item?.label ?? `asset ${globalIndex + 1}`}`}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70" />
                    <div className="pointer-events-none absolute right-1.5 top-1.5 rounded-full border border-white/12 bg-black/40 p-1.5 text-white/80 backdrop-blur-sm">
                      <ZoomIn size={12} />
                    </div>
                  </button>
                );
              })}

              {Array.from({ length: Math.max(0, GRID_PAGE_SIZE - pagedTiles.length) }, (_, index) => (
                <div
                  key={`empty-${selectedProject.slug}-${activePage}-${index}`}
                  aria-hidden
                  className="aspect-square"
                />
              ))}
            </div>

            {pageCount > 1 ? (
              <div className="flex items-center justify-center gap-2">
                {Array.from({ length: pageCount }, (_, index) => {
                  const isActive = index === activePage;
                  return (
                    <button
                      key={`${selectedProject.slug}-page-${index + 1}`}
                      type="button"
                      onClick={() => setActivePage(index)}
                      className={cn(
                        "h-2.5 rounded-full transition-all duration-300",
                        isActive ? "w-10 bg-primary" : "w-2.5 bg-white/20 hover:bg-white/40",
                      )}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  );
                })}
              </div>
            ) : null}
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
