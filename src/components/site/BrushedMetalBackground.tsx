import { useEffect, useRef, type RefObject } from "react";

type Size = {
  width: number;
  height: number;
  dpr: number;
};

type Pulse = {
  x: number;
  y: number;
  startedAt: number;
};

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

export function BrushedMetalBackground({ interactiveTargetRef }: BrushedMetalBackgroundProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || typeof window === "undefined") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const texture = buildNoiseTexture();
    const pattern = ctx.createPattern(texture, "repeat");
    const state: Size = { width: 0, height: 0, dpr: 1 };
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
    let pulses: Pulse[] = [];
    let frame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      state.width = Math.max(1, rect.width);
      state.height = Math.max(1, rect.height);
      state.dpr = Math.min(window.devicePixelRatio || 1, 1.75);

      canvas.width = Math.floor(state.width * state.dpr);
      canvas.height = Math.floor(state.height * state.dpr);
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    };

    const drawSpotlight = (x: number, y: number, radius: number, alpha: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(190, 198, 205, ${alpha})`);
      gradient.addColorStop(0.42, `rgba(145, 152, 158, ${alpha * 0.34})`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, state.width, state.height);
    };

    const getInteractiveRect = () => interactiveTargetRef?.current?.getBoundingClientRect();
    const canInteract = () =>
      Boolean(interactiveTargetRef?.current) && !reducedMotion.matches && !coarsePointer.matches;

    const handlePointerMove = (event: PointerEvent) => {
      if (!canInteract()) return;

      const rect = getInteractiveRect();
      if (!rect) return;

      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      pointer.active = inside;
      pointer.targetX = inside ? ((event.clientX - rect.left) / rect.width - 0.5) * 2 : 0;
      pointer.targetY = inside ? ((event.clientY - rect.top) / rect.height - 0.5) * 2 : 0;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!canInteract()) return;

      const targetRect = getInteractiveRect();
      const canvasRect = canvas.getBoundingClientRect();
      if (!targetRect) return;

      const inside =
        event.clientX >= targetRect.left &&
        event.clientX <= targetRect.right &&
        event.clientY >= targetRect.top &&
        event.clientY <= targetRect.bottom;

      if (!inside) return;

      pulses = [
        ...pulses.slice(-2),
        {
          x: event.clientX - canvasRect.left,
          y: event.clientY - canvasRect.top,
          startedAt: performance.now(),
        },
      ];
    };

    const draw = (timestamp = 0) => {
      const { width, height } = state;
      const time = reducedMotion.matches ? 0 : timestamp * 0.001;
      const lightRangeX = Math.min(width * 0.024, 20);
      const lightRangeY = Math.min(height * 0.024, 16);

      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;

      const base = ctx.createLinearGradient(0, 0, 0, height);
      base.addColorStop(0, "#18191a");
      base.addColorStop(0.18, "#101112");
      base.addColorStop(0.5, "#0a0b0c");
      base.addColorStop(0.82, "#111213");
      base.addColorStop(1, "#060607");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "screen";
      drawSpotlight(
        width * 0.24 + pointer.x * lightRangeX,
        height * 0.2 + pointer.y * lightRangeY,
        width * 0.48,
        0.09,
      );
      drawSpotlight(
        width * 0.72 - pointer.x * lightRangeX * 0.7,
        height * 0.56 + pointer.y * lightRangeY * 0.7,
        width * 0.58,
        0.075,
      );
      drawSpotlight(
        width * 0.5 + pointer.x * lightRangeX * 0.45,
        height * 1.06 - pointer.y * lightRangeY * 0.45,
        width * 0.62,
        0.055,
      );

      if (pointer.active) {
        drawSpotlight(
          width * (0.5 + pointer.x * 0.5),
          height * (0.5 + pointer.y * 0.5),
          Math.min(width, height) * 0.42,
          0.026,
        );
      }

      pulses = pulses.filter((pulse) => timestamp - pulse.startedAt < 680);
      for (const pulse of pulses) {
        const progress = Math.max(0, Math.min(1, (timestamp - pulse.startedAt) / 680));
        const radius = 42 + progress * Math.min(width, height) * 0.34;
        const alpha = 0.07 * (1 - progress) * (1 - progress);
        drawSpotlight(pulse.x, pulse.y, radius, alpha);
      }

      const bands = 9;
      for (let i = 0; i < bands; i += 1) {
        const phase = i * 1.618;
        const pointerDrift = pointer.x * Math.min(width * 0.012, 14) * (i % 2 === 0 ? 1 : -0.7);
        const drift = Math.sin(time * 0.16 + phase) * width * 0.07 + pointerDrift;
        const center = ((i + 0.35) / bands) * width + drift;
        const bandWidth = width * (0.055 + (i % 3) * 0.018);
        const gradient = ctx.createLinearGradient(center - bandWidth, 0, center + bandWidth, 0);

        gradient.addColorStop(0, "rgba(255,255,255,0)");
        gradient.addColorStop(0.42, "rgba(185,193,200,0.014)");
        gradient.addColorStop(0.5, "rgba(230,235,240,0.034)");
        gradient.addColorStop(0.58, "rgba(105,112,118,0.016)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(center - bandWidth, 0, bandWidth * 2, height);
      }

      ctx.globalCompositeOperation = "multiply";
      for (let i = 0; i < 5; i += 1) {
        const phase = i * 2.21;
        const pointerDrift = pointer.x * Math.min(width * 0.01, 12) * (i % 2 === 0 ? -1 : 0.8);
        const drift = Math.sin(time * 0.11 + phase) * width * 0.045 + pointerDrift;
        const center = ((i + 0.8) / 5) * width + drift;
        const bandWidth = width * 0.09;
        const gradient = ctx.createLinearGradient(center - bandWidth, 0, center + bandWidth, 0);

        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(0.5, "rgba(0,0,0,0.11)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(center - bandWidth, 0, bandWidth * 2, height);
      }

      if (pattern) {
        const offsetX = Math.sin(time * 0.08) * 12 + pointer.x * 4;
        const offsetY = Math.cos(time * 0.06) * 6 + pointer.y * 3;

        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.38;
        ctx.translate(offsetX, offsetY);
        ctx.fillStyle = pattern;
        ctx.fillRect(-32, -32, width + 64, height + 64);
        ctx.restore();
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      if (!reducedMotion.matches) {
        frame = requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    if (!reducedMotion.matches) {
      frame = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [interactiveTargetRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
