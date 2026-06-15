import { getSocialMediaProjectImages } from "@/data/projectImages";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type SocialMediaBentoPreviewProps = {
  project: Project;
  fallbackImage?: string;
  className?: string;
};

export function SocialMediaBentoPreview({
  project,
  fallbackImage,
  className,
}: SocialMediaBentoPreviewProps) {
  const images = getSocialMediaProjectImages(project.slug).slice(0, 3);

  if (images.length < 2) {
    const image = images[0] ?? fallbackImage;

    return image ? (
      <img
        src={image}
        alt={`${project.title} preview`}
        className={cn(
          "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]",
          className,
        )}
        loading="lazy"
      />
    ) : null;
  }

  return (
    <div className={cn("grid h-full grid-cols-[1.35fr_0.65fr] gap-1.5 bg-black p-1.5", className)}>
      <div className="overflow-hidden rounded-xl">
        <img
          src={images[0]}
          alt={`${project.title} preview 1`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>

      <div className="grid grid-rows-2 gap-1.5">
        {images.slice(1).map((image, index) => (
          <div key={image} className="overflow-hidden rounded-lg">
            <img
              src={image}
              alt={`${project.title} preview ${index + 2}`}
              className={cn(
                "h-full w-full object-cover transition-transform duration-700",
                index === 0
                  ? "group-hover:-translate-x-1 group-hover:scale-[1.05]"
                  : "group-hover:translate-x-1 group-hover:scale-[1.05]",
              )}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
