import { CONFERENCE_GRADIENTS } from "@/data/about";

export function AwardsGallery({ images }: { images: string[] | null }) {
  if (images && images.length === 1) {
    return (
      <div className="metal-panel overflow-hidden rounded-lg">
        <img src={images[0]} alt="" className="aspect-square h-full w-full object-cover" />
      </div>
    );
  }

  if (images) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {images.map((src, i) => (
          <div key={i} className="metal-panel aspect-square overflow-hidden rounded-lg">
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {CONFERENCE_GRADIENTS.map((g, i) => (
        <div
          key={i}
          className={`metal-panel flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br ${g}`}
        >
          <span className="text-[10px] font-medium text-muted-foreground/40">
            {(i + 1).toString().padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>
  );
}
