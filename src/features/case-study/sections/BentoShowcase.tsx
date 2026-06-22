import { useEffect, useMemo, useRef, useState } from "react";
import { ZoomIn } from "lucide-react";
import { motion, useInView } from "motion/react";
import type { Project, ProjectGalleryItem } from "@/data/projects";
import { getProjectGalleryImage } from "@/data/projectImages";
import { cn } from "@/lib/utils";

type SlotRect = {
  col: number;
  row: number;
  colSpan: number;
  rowSpan: number;
};

type BentoLayout = {
  slots: SlotRect[];
};

type BentoTile = {
  src: string;
  item: ProjectGalleryItem;
  index: number;
  aspectRatio: number;
};

const S = (col: number, row: number, colSpan: number, rowSpan: number): SlotRect => ({
  col,
  row,
  colSpan,
  rowSpan,
});

const LAYOUTS: Record<number, BentoLayout[]> = {
  1: [{ slots: [S(1, 1, 3, 3)] }],
  2: [
    { slots: [S(1, 1, 2, 3), S(3, 1, 1, 3)] },
    { slots: [S(1, 1, 3, 2), S(1, 3, 3, 1)] },
    { slots: [S(1, 1, 1, 3), S(2, 1, 2, 3)] },
  ],
  3: [
    { slots: [S(1, 1, 2, 2), S(3, 1, 1, 2), S(1, 3, 3, 1)] },
    { slots: [S(1, 1, 3, 2), S(1, 3, 2, 1), S(3, 3, 1, 1)] },
    { slots: [S(1, 1, 1, 3), S(2, 1, 2, 2), S(2, 3, 2, 1)] },
    { slots: [S(1, 1, 2, 1), S(1, 2, 1, 2), S(2, 2, 2, 2)] },
  ],
  4: [
    { slots: [S(1, 1, 2, 2), S(3, 1, 1, 2), S(1, 3, 1, 1), S(2, 3, 2, 1)] },
    { slots: [S(1, 1, 2, 2), S(3, 1, 1, 1), S(3, 2, 1, 1), S(1, 3, 3, 1)] },
    { slots: [S(1, 1, 3, 2), S(1, 3, 1, 1), S(2, 3, 1, 1), S(3, 3, 1, 1)] },
    { slots: [S(1, 1, 1, 2), S(2, 1, 2, 2), S(1, 3, 1, 1), S(2, 3, 2, 1)] },
  ],
  5: [
    { slots: [S(1, 1, 2, 2), S(3, 1, 1, 2), S(1, 3, 1, 1), S(2, 3, 1, 1), S(3, 3, 1, 1)] },
    { slots: [S(1, 1, 1, 2), S(2, 1, 2, 1), S(2, 2, 1, 1), S(3, 2, 1, 1), S(1, 3, 3, 1)] },
    { slots: [S(1, 1, 3, 1), S(1, 2, 1, 1), S(2, 2, 2, 1), S(1, 3, 1, 1), S(2, 3, 2, 1)] },
  ],
  6: [
    { slots: [S(1, 1, 2, 2), S(3, 1, 1, 1), S(3, 2, 1, 1), S(1, 3, 1, 1), S(2, 3, 1, 1), S(3, 3, 1, 1)] },
    { slots: [S(1, 1, 3, 1), S(1, 2, 1, 1), S(2, 2, 1, 1), S(3, 2, 1, 1), S(1, 3, 1, 1), S(2, 3, 2, 1)] },
    { slots: [S(1, 1, 1, 3), S(2, 1, 2, 1), S(2, 2, 1, 1), S(3, 2, 1, 1), S(2, 3, 1, 1), S(3, 3, 1, 1)] },
  ],
  7: [
    { slots: [S(1, 1, 2, 1), S(3, 1, 1, 2), S(1, 2, 1, 1), S(2, 2, 1, 1), S(1, 3, 1, 1), S(2, 3, 1, 1), S(3, 3, 1, 1)] },
    { slots: [S(1, 1, 1, 2), S(2, 1, 2, 1), S(2, 2, 1, 1), S(3, 2, 1, 1), S(1, 3, 1, 1), S(2, 3, 1, 1), S(3, 3, 1, 1)] },
    { slots: [S(1, 1, 1, 3), S(2, 1, 1, 1), S(3, 1, 1, 1), S(2, 2, 1, 1), S(3, 2, 1, 1), S(2, 3, 1, 1), S(3, 3, 1, 1)] },
  ],
  8: [
    { slots: [S(1, 1, 2, 1), S(3, 1, 1, 1), S(1, 2, 1, 1), S(2, 2, 1, 1), S(3, 2, 1, 1), S(1, 3, 1, 1), S(2, 3, 1, 1), S(3, 3, 1, 1)] },
    { slots: [S(1, 1, 1, 2), S(2, 1, 1, 1), S(3, 1, 1, 1), S(2, 2, 1, 1), S(3, 2, 1, 1), S(1, 3, 1, 1), S(2, 3, 1, 1), S(3, 3, 1, 1)] },
    { slots: [S(1, 1, 1, 1), S(2, 1, 1, 1), S(3, 1, 1, 1), S(1, 2, 1, 1), S(2, 2, 2, 1), S(3, 2, 1, 1), S(1, 3, 1, 1), S(2, 3, 2, 1)] },
  ],
  9: [
    { slots: [S(1, 1, 1, 1), S(2, 1, 1, 1), S(3, 1, 1, 1), S(1, 2, 1, 1), S(2, 2, 1, 1), S(3, 2, 1, 1), S(1, 3, 1, 1), S(2, 3, 1, 1), S(3, 3, 1, 1)] },
    { slots: [S(1, 1, 1, 1), S(1, 2, 1, 1), S(1, 3, 1, 1), S(2, 1, 1, 1), S(2, 2, 1, 1), S(2, 3, 1, 1), S(3, 1, 1, 1), S(3, 2, 1, 1), S(3, 3, 1, 1)] },
    { slots: [S(1, 1, 1, 1), S(2, 1, 1, 1), S(3, 1, 1, 1), S(3, 2, 1, 1), S(2, 2, 1, 1), S(1, 2, 1, 1), S(1, 3, 1, 1), S(2, 3, 1, 1), S(3, 3, 1, 1)] },
  ],
};

function getLayoutKey(slug: string, count: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % count;
}

function slotAspectRatio(slot: SlotRect): number {
  return slot.colSpan / slot.rowSpan;
}

function aspectDistance(ar1: number, ar2: number): number {
  return Math.abs(Math.log(Math.max(ar1, 0.01) / Math.max(ar2, 0.01)));
}

function getDefaultRatio(ratio: ProjectGalleryItem["ratio"]): number {
  if (ratio === "wide") return 1.8;
  if (ratio === "tall") return 0.6;
  if (ratio === "featured") return 1.2;
  return 1;
}

function arrangeTiles(tiles: BentoTile[], layout: BentoLayout) {
  const remaining = [...tiles];
  const arranged = Array.from<BentoTile | null>({ length: layout.slots.length }).fill(null);
  const scores: number[] = [];

  const impactOrder = layout.slots
    .map((slot, i) => ({ index: i, cells: slot.colSpan * slot.rowSpan, ratio: slotAspectRatio(slot) }))
    .sort((a, b) => b.cells - a.cells || Math.abs(Math.log(b.ratio)) - Math.abs(Math.log(a.ratio)));

  const impactTiles = remaining
    .map((t, i) => ({ index: i, impact: Math.abs(Math.log(t.aspectRatio)) }))
    .sort((a, b) => b.impact - a.impact);

  for (let si = 0; si < impactOrder.length; si++) {
    const slotIdx = impactOrder[si].index;
    const slotRatio = slotAspectRatio(layout.slots[slotIdx]);
    let best = 0;
    let bestDist = Infinity;
    for (let ti = 0; ti < remaining.length; ti++) {
      const dist = aspectDistance(remaining[ti].aspectRatio, slotRatio);
      if (dist < bestDist) {
        bestDist = dist;
        best = ti;
      }
    }
    arranged[slotIdx] = remaining.splice(best, 1)[0];
    scores[slotIdx] = bestDist;
  }

  const totalScore = scores.reduce((a, b) => a + b, 0);
  return { tiles: arranged as BentoTile[], score: totalScore };
}

function getBestLayout(tiles: BentoTile[], slug: string): { layout: BentoLayout; tiles: BentoTile[] } {
  const count = tiles.length;
  const available = LAYOUTS[count] ?? [{ slots: [S(1, 1, 3, 3)] }];
  const layouts = available.length > 1
    ? [...available].sort(() => 0.5 - (getLayoutKey(slug + "seed", 100) / 100))
    : available;
  let best = { layout: layouts[0], tiles: arrangeTiles(tiles, layouts[0]).tiles, score: Infinity };
  for (const layout of layouts) {
    const result = arrangeTiles(tiles, layout);
    if (result.score < best.score) {
      best = { layout, tiles: result.tiles, score: result.score };
    }
  }
  return best;
}

type BentoShowcaseProps = {
  project: Project;
  openLightbox: (index: number) => void;
};

export function BentoShowcase({ project, openLightbox }: BentoShowcaseProps) {
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);

  const sourceTiles = useMemo(() => {
    return project.gallery
      .map((item, index) => {
        const src = getProjectGalleryImage(project, item);
        return src ? { src, item, index } : null;
      })
      .filter((t): t is { src: string; item: ProjectGalleryItem; index: number } => t !== null);
  }, [project]);

  useEffect(() => {
    if (sourceTiles.length === 0) return;
    setLoaded(false);
    setImageRatios({});
    let cancelled = false;

    Promise.all(
      sourceTiles.map(
        ({ src }) =>
          new Promise<[string, number]>((resolve) => {
            const img = new Image();
            img.onload = () => resolve([src, img.naturalWidth / img.naturalHeight]);
            img.onerror = () => resolve([src, 0]);
            img.src = src;
          }),
      ),
    ).then((results) => {
      if (!cancelled) {
        setImageRatios(Object.fromEntries(results));
        setLoaded(true);
      }
    });

    return () => { cancelled = true; };
  }, [sourceTiles]);

  const tiles: BentoTile[] = useMemo(() => {
    return sourceTiles.map((t) => ({
      ...t,
      aspectRatio: imageRatios[t.src] ?? getDefaultRatio(t.item.ratio),
    }));
  }, [sourceTiles, imageRatios]);

  const { layout, tiles: arranged } = useMemo(() => {
    if (tiles.length === 0) {
      return { layout: { slots: [S(1, 1, 3, 3)] }, tiles: [] as BentoTile[] };
    }
    return getBestLayout(tiles, project.slug);
  }, [tiles, project.slug]);

  if (tiles.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-white/[0.06] bg-black/40 p-12 text-center">
        <p className="font-display text-lg text-muted-foreground">No showcase images available</p>
      </div>
    );
  }

  return (
    <div
      className="mt-10 grid w-full gap-2.5 sm:gap-3"
      style={{
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        aspectRatio: "1 / 1",
      }}
    >
      {arranged.map((tile, index) => {
        const slot = layout.slots[index];
        const tileRatio = imageRatios[tile.src] ?? getDefaultRatio(tile.item.ratio);
        const isLoaded = loaded || imageRatios[tile.src] !== undefined;

        return (
          <BentoCard
            key={`${tile.src}-${index}`}
            tile={tile}
            slot={slot}
            tileRatio={tileRatio}
            isLoaded={isLoaded}
            onClick={() => openLightbox(tile.index)}
          />
        );
      })}
    </div>
  );
}

type BentoCardProps = {
  tile: BentoTile;
  slot: SlotRect;
  tileRatio: number;
  isLoaded: boolean;
  onClick: () => void;
};

function BentoCard({ tile, slot, tileRatio, isLoaded, onClick }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "100px" });
  const [imgLoaded, setImgLoaded] = useState(false);

  const bgColor = tile.item.color ?? "from-slate-600/50 to-slate-800/50";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay: 0.06 }}
      className="group relative min-h-0 overflow-hidden rounded-xl sm:rounded-2xl"
      style={{
        gridColumn: `${slot.col} / span ${slot.colSpan}`,
        gridRow: `${slot.row} / span ${slot.rowSpan}`,
      }}
    >
      {!imgLoaded && (
        <div
          className={cn(
            "absolute inset-0 animate-pulse bg-gradient-to-br",
            bgColor,
          )}
        />
      )}
      {inView && (
        <button
          type="button"
          onClick={onClick}
          className="relative block h-full w-full overflow-hidden"
          aria-label={`Open ${tile.item.label}`}
        >
          <img
            src={tile.src}
            alt={tile.item.label}
            onLoad={() => setImgLoaded(true)}
            className={cn(
              "h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-105",
              imgLoaded ? "opacity-100" : "opacity-0",
            )}
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="pointer-events-none absolute right-2 top-2 rounded-full border border-white/10 bg-black/50 p-1.5 text-white/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 sm:right-3 sm:top-3 sm:p-2">
            <ZoomIn size={14} />
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-4">
            <p className="truncate text-left text-xs font-medium text-white/90 drop-shadow-lg sm:text-sm">
              {tile.item.label}
            </p>
          </div>
          <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
        </button>
      )}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.06] transition-all duration-300 sm:rounded-2xl",
          "group-hover:ring-white/[0.12] group-hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6)]",
        )}
      />
    </motion.div>
  );
}
