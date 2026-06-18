const MAX_THUMB_WIDTH = 150;
const MAX_THUMB_HEIGHT = 150;
const MAX_MEDIUM_WIDTH = 600;
const MAX_MEDIUM_HEIGHT = 600;
const MAX_FULL_WIDTH = 1200;
const MAX_FULL_HEIGHT = 1200;

const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number = 0.85,
): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Failed to create blob"));
        },
        "image/webp",
        quality,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });

export const blobToDataUrl = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

export const generateOptimizedSizes = async (
  file: File,
): Promise<{ thumb: string; medium: string; full: string }> => {
  const [thumbBlob, mediumBlob, fullBlob] = await Promise.all([
    resizeImage(file, MAX_THUMB_WIDTH, MAX_THUMB_HEIGHT, 0.7),
    resizeImage(file, MAX_MEDIUM_WIDTH, MAX_MEDIUM_HEIGHT, 0.8),
    resizeImage(file, MAX_FULL_WIDTH, MAX_FULL_HEIGHT, 0.9),
  ]);
  const [thumb, medium, full] = await Promise.all([
    blobToDataUrl(thumbBlob),
    blobToDataUrl(mediumBlob),
    blobToDataUrl(fullBlob),
  ]);
  return { thumb, medium, full };
};

export const generateSingleSize = async (
  file: File,
  maxWidth: number,
  maxHeight: number,
): Promise<string> => {
  const blob = await resizeImage(file, maxWidth, maxHeight);
  return blobToDataUrl(blob);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
