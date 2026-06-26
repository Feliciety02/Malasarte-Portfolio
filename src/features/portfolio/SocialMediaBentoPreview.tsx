import { getSocialMediaProjectImages } from "@/data/projectImages";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { SmartCroppedImage } from "./SmartCroppedImage";

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

  const displayImages =
    images.length > 0 ? images.slice(0, 3) : fallbackImage ? [fallbackImage] : [];

  if (displayImages.length === 0) return null;

  return (
    <div className={cn("flex h-full gap-2 bg-black p-2", className)}>
      {displayImages.map((image, index) => (
        <div key={image} className="flex-1 overflow-hidden rounded-lg">
          <SmartCroppedImage
            src={image}
            alt={`${project.title} preview ${index + 1}`}
            className="transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      ))}
    </div>
  );
}
