import { CONFERENCE_GRADIENTS } from "@/data/about";

export function ConferenceGallery({
  images,
  conferenceIndex,
}: {
  images: string[] | null;
  conferenceIndex: number;
}) {
  if (images && images.length === 1) {
    return (
      <div className="metal-panel aspect-square overflow-hidden rounded-lg">
        <img src={images[0]} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  if (images && images.length === 2) {
    return (
      <div className="flex aspect-square flex-col gap-2">
        {images.map((src, i) => (
          <div key={i} className="metal-panel flex-1 overflow-hidden rounded-lg">
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
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
            {(conferenceIndex * 4 + i + 1).toString().padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>
  );
}
