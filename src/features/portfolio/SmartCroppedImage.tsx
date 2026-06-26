import { useState, useEffect, useRef } from "react";
import { autoCropImage } from "@/lib/autoCropImage";
import { cn } from "@/lib/utils";

type SmartCroppedImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
};

export function SmartCroppedImage({ src, alt, className, loading = "lazy" }: SmartCroppedImageProps) {
  const [croppedSrc, setCroppedSrc] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    autoCropImage(src)
      .then((result) => {
        if (mountedRef.current) setCroppedSrc(result);
      })
      .catch(() => {
        if (mountedRef.current) setCroppedSrc(src);
      });
    return () => {
      mountedRef.current = false;
    };
  }, [src]);

  return (
    <img
      src={croppedSrc ?? src}
      alt={alt}
      className={cn("h-full w-full object-contain", className)}
      loading={loading}
    />
  );
}
