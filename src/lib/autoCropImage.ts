const cropCache = new Map<string, string>();

type AutoCropOptions = {
  threshold?: number;
  padding?: number;
  sampleStep?: number;
};

function isContentPixel(
  r: number,
  g: number,
  b: number,
  a: number,
  threshold: number,
): boolean {
  if (a < 10) return false;
  const isWhite = r > 255 - threshold && g > 255 - threshold && b > 255 - threshold;
  return !isWhite;
}

export function autoCropImage(
  imageUrl: string,
  options: AutoCropOptions = {},
): Promise<string> {
  const { threshold = 30, padding = 4, sampleStep = 2 } = options;

  if (cropCache.has(imageUrl)) {
    return Promise.resolve(cropCache.get(imageUrl)!);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { data, width, height } = imageData;

      let top = 0;
      let bottom = height - 1;
      let left = 0;
      let right = width - 1;

      rowLoop: for (let y = 0; y < height; y += sampleStep) {
        for (let x = 0; x < width; x += sampleStep) {
          const idx = (y * width + x) * 4;
          if (isContentPixel(data[idx], data[idx + 1], data[idx + 2], data[idx + 3], threshold)) {
            top = y;
            break rowLoop;
          }
        }
      }

      rowLoop: for (let y = height - 1; y >= 0; y -= sampleStep) {
        for (let x = 0; x < width; x += sampleStep) {
          const idx = (y * width + x) * 4;
          if (isContentPixel(data[idx], data[idx + 1], data[idx + 2], data[idx + 3], threshold)) {
            bottom = y;
            break rowLoop;
          }
        }
      }

      colLoop: for (let x = 0; x < width; x += sampleStep) {
        for (let y = 0; y < height; y += sampleStep) {
          const idx = (y * width + x) * 4;
          if (isContentPixel(data[idx], data[idx + 1], data[idx + 2], data[idx + 3], threshold)) {
            left = x;
            break colLoop;
          }
        }
      }

      colLoop: for (let x = width - 1; x >= 0; x -= sampleStep) {
        for (let y = 0; y < height; y += sampleStep) {
          const idx = (y * width + x) * 4;
          if (isContentPixel(data[idx], data[idx + 1], data[idx + 2], data[idx + 3], threshold)) {
            right = x;
            break colLoop;
          }
        }
      }

      const cropLeft = Math.max(0, left - padding);
      const cropTop = Math.max(0, top - padding);
      const cropWidth = Math.min(width - cropLeft, right - left + 1 + padding * 2);
      const cropHeight = Math.min(height - cropTop, bottom - top + 1 + padding * 2);

      const croppedCanvas = document.createElement("canvas");
      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeight;
      const cropCtx = croppedCanvas.getContext("2d");
      if (!cropCtx) {
        reject(new Error("Could not get cropped canvas context"));
        return;
      }
      cropCtx.drawImage(
        canvas,
        cropLeft, cropTop, cropWidth, cropHeight,
        0, 0, cropWidth, cropHeight,
      );

      const result = croppedCanvas.toDataURL("image/webp", 0.92);
      cropCache.set(imageUrl, result);
      resolve(result);
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
    img.src = imageUrl;
  });
}
