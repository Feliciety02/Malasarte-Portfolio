import { readdirSync, existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { join, extname, basename, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const ASSETS_DIR = join(fileURLToPath(new URL("..", import.meta.url)), "src", "assets");

const SUPPORTED = [".png", ".jpg", ".jpeg"];

const QUALITY = 85;

let totalOriginalBytes = 0;
let totalOptimizedBytes = 0;
let fileCount = 0;

async function* walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else if (entry.isFile()) {
      yield fullPath;
    }
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function main() {
  console.log("Optimizing images...\n");

  for await (const filePath of walk(ASSETS_DIR)) {
    const ext = extname(filePath).toLowerCase();
    if (!SUPPORTED.includes(ext)) continue;

    const outPath = join(dirname(filePath), `${basename(filePath, ext)}.webp`);

    if (existsSync(outPath)) {
      continue;
    }

    const buffer = await readFile(filePath);
    const originalSize = buffer.length;

    const optimized = await sharp(buffer)
      .withMetadata({ orientation: undefined })
      .webp({ quality: QUALITY });

    const optimizedBuffer = await optimized.toBuffer();

    await writeFile(outPath, optimizedBuffer);

    const optimizedSize = optimizedBuffer.length;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    totalOriginalBytes += originalSize;
    totalOptimizedBytes += optimizedSize;
    fileCount++;

    console.log(`  ${basename(filePath)} → ${basename(outPath)}  (${formatBytes(originalSize)} → ${formatBytes(optimizedSize)}, -${savings}%)`);
  }

  if (fileCount === 0) {
    console.log("  No new images to optimize. All already converted.");
    return;
  }

  const totalSavings = ((totalOriginalBytes - totalOptimizedBytes) / totalOriginalBytes * 100).toFixed(1);
  console.log(`\nDone. ${fileCount} images converted.`);
  console.log(`Total: ${formatBytes(totalOriginalBytes)} → ${formatBytes(totalOptimizedBytes)} (${totalSavings}% reduction)`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
