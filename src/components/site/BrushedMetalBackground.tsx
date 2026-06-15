import { useEffect, useRef, type RefObject } from "react";

type BrushedMetalBackgroundProps = {
  interactiveTargetRef?: RefObject<HTMLElement | null>;
};

function buildNoiseTexture(size = 192) {
  const texture = document.createElement("canvas");
  texture.width = size;
  texture.height = size;

  const ctx = texture.getContext("2d");
  if (!ctx) return texture;

  const image = ctx.createImageData(size, size);

  for (let i = 0; i < image.data.length; i += 4) {
    const value = 18 + Math.random() * 68;
    const alpha = 8 + Math.random() * 14;

    image.data[i] = value;
    image.data[i + 1] = value;
    image.data[i + 2] = value;
    image.data[i + 3] = alpha;
  }

  ctx.putImageData(image, 0, 0);

  ctx.globalAlpha = 0.1;
  for (let y = 0; y < size; y += 3) {
    ctx.fillStyle = y % 9 === 0 ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.18)";
    ctx.fillRect(0, y, size, 1);
  }

  ctx.globalAlpha = 0.055;
  for (let i = 0; i < 70; i += 1) {
    const y = Math.random() * size;
    const x = Math.random() * size;
    const w = 20 + Math.random() * 110;
    ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.2)";
    ctx.fillRect(x, y, w, 1);
  }

  return texture;
}

export function BrushedMetalBackground(_props: BrushedMetalBackgroundProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || typeof window === "undefined") return;

    const texture = buildNoiseTexture();
    const pattern = ctx.createPattern(texture, "repeat");

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const base = ctx.createLinearGradient(0, 0, 0, height);
      base.addColorStop(0, "#1b1c1d");
      base.addColorStop(0.18, "#111213");
      base.addColorStop(0.5, "#08090a");
      base.addColorStop(0.82, "#121314");
      base.addColorStop(1, "#050506");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);

      const drawSpotlight = (x: number, y: number, radius: number, alpha: number) => {
        if (alpha <= 0 || radius <= 0) return;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(210, 216, 220, ${alpha})`);
        gradient.addColorStop(0.36, `rgba(145, 152, 158, ${alpha * 0.34})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      };

      ctx.globalCompositeOperation = "screen";
      drawSpotlight(width * 0.24, height * 0.2, width * 0.48, 0.09);
      drawSpotlight(width * 0.72, height * 0.56, width * 0.58, 0.078);
      drawSpotlight(width * 0.5, height * 1.06, width * 0.62, 0.055);

      if (pattern) {
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.38;
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
