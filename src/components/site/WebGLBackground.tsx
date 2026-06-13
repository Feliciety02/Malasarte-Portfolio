import { useEffect, useRef } from "react";
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";
import { fragmentShader } from "@/shaders/fragment";
import { vertexShader } from "@/shaders/vertex";

/**
 * Full-screen WebGL background powered by Three.js.
 * Uses domain-warped FBM shaders for a cinematic, turbulent gradient.
 * Fixed behind all content; responds to mouse and scroll.
 */
export function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;

    const isMobile = window.innerWidth < 768;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    // ── Orthographic scene (2-unit fullscreen quad) ───────────────────────────
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
    };

    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new Mesh(new PlaneGeometry(2, 2), material);
    scene.add(mesh);

    // ── Mouse tracking (plain refs — no React re-renders) ─────────────────────
    const mTarget = { x: 0.5, y: 0.5 };
    const mSmooth = { x: 0.5, y: 0.5 };

    const onMouseMove = (e: MouseEvent) => {
      mTarget.x = e.clientX / window.innerWidth;
      mTarget.y = 1.0 - e.clientY / window.innerHeight;
    };
    if (!prefersReduced) {
      document.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // ── Animation loop ────────────────────────────────────────────────────────
    let rafId = 0;
    let lastTime = 0;
    const timeScale = prefersReduced ? 0.05 : 1.0; // nearly-frozen when reduced-motion

    const animate = (now: number) => {
      rafId = requestAnimationFrame(animate);

      const delta = Math.min((now - lastTime) / 1000, 0.05); // cap spike frames
      lastTime = now;

      // Delta-time-correct smooth lerp (~6% per frame at 60 fps)
      const lf = 1 - Math.pow(0.94, delta * 60);
      mSmooth.x += (mTarget.x - mSmooth.x) * lf;
      mSmooth.y += (mTarget.y - mSmooth.y) * lf;

      uniforms.uTime.value += delta * timeScale;
      uniforms.uMouse.value.set(mSmooth.x, mSmooth.y);
      uniforms.uScroll.value = window.scrollY / Math.max(window.innerHeight, 1);

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(animate);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
