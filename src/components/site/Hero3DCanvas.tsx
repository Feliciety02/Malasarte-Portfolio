import { useEffect, useRef } from "react";
import {
  AmbientLight,
  IcosahedronGeometry,
  Mesh,
  MeshStandardMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  TorusGeometry,
  WebGLRenderer,
} from "three";

interface Props {
  /** The outer 220vh scroll-wrapper div — used to compute pinned-scroll progress. */
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Transparent Three.js canvas that lives inside the sticky hero section.
 * The WebGLBackground shader shows through its cleared backdrop.
 * Scroll drives camera zoom-in + object drift for a turbulent.ca-style reveal.
 */
export function Hero3DCanvas({ wrapperRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;

    const isMobile = window.innerWidth < 768;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0); // fully transparent — shader bg shows through

    // ── Camera ────────────────────────────────────────────────────────────────
    const camera = new PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    // ── Scene ─────────────────────────────────────────────────────────────────
    const scene = new Scene();

    // ── Lights ────────────────────────────────────────────────────────────────
    scene.add(new AmbientLight(0x0d0824, 4));

    const purpleLight = new PointLight(0x8b5cf6, 10, 16);
    purpleLight.position.set(3, 3, 3);
    scene.add(purpleLight);

    const blueLight = new PointLight(0x3b82f6, 7, 14);
    blueLight.position.set(-3, -1, 4);
    scene.add(blueLight);

    const cyanLight = new PointLight(0x06b6d4, 5, 12);
    cyanLight.position.set(1, -3.5, 2);
    scene.add(cyanLight);

    // ── Materials ─────────────────────────────────────────────────────────────
    const purpleMat = new MeshStandardMaterial({
      color: 0x8b5cf6, emissive: 0x3b1ea8, emissiveIntensity: 0.55,
      metalness: 0.85, roughness: 0.08,
    });
    const blueMat = new MeshStandardMaterial({
      color: 0x3b82f6, emissive: 0x1a3d8f, emissiveIntensity: 0.45,
      metalness: 0.90, roughness: 0.05,
    });
    const cyanMat = new MeshStandardMaterial({
      color: 0x06b6d4, emissive: 0x035266, emissiveIntensity: 0.55,
      metalness: 0.80, roughness: 0.10,
    });
    const cyanRingMat = new MeshStandardMaterial({
      color: 0x06b6d4, emissive: 0x046a80, emissiveIntensity: 0.75,
      metalness: 0.60, roughness: 0.18,
      transparent: true, opacity: 0.60,
    });

    // ── Central tori ──────────────────────────────────────────────────────────
    const torus1 = new Mesh(new TorusGeometry(1.1, 0.23, 40, 120), purpleMat);
    torus1.rotation.x = Math.PI * 0.30;
    torus1.rotation.z = Math.PI * 0.05;
    scene.add(torus1);

    const torus2 = new Mesh(new TorusGeometry(1.9, 0.052, 20, 200), cyanRingMat);
    torus2.rotation.x = Math.PI * 0.44;
    torus2.rotation.z = Math.PI * 0.14;
    scene.add(torus2);

    // ── Icosahedrons (design crystals) ────────────────────────────────────────
    const icoData: Array<{ pos: [number, number, number]; mat: MeshStandardMaterial; r: number }> = [
      { pos: [-2.2,  1.3, -0.9], mat: blueMat,   r: 0.42 },
      { pos: [ 2.1, -1.1, -0.4], mat: blueMat,   r: 0.38 },
      { pos: [-1.4, -2.0,  0.6], mat: cyanMat,   r: 0.35 },
    ];
    icoData.forEach(({ pos, mat, r }) => {
      const m = new Mesh(new IcosahedronGeometry(r, 0), mat);
      m.position.set(...pos);
      scene.add(m);
    });

    // ── Octahedron diamonds ───────────────────────────────────────────────────
    const octData: Array<{ pos: [number, number, number]; mat: MeshStandardMaterial; r: number }> = [
      { pos: [ 2.0,  1.8,  0.2], mat: purpleMat, r: 0.36 },
      { pos: [-2.7, -0.3, -1.0], mat: cyanMat,   r: 0.30 },
    ];
    octData.forEach(({ pos, mat, r }) => {
      const m = new Mesh(new OctahedronGeometry(r, 0), mat);
      m.position.set(...pos);
      scene.add(m);
    });

    // ── Ambient glow particles ─────────────────────────────────────────────────
    const pColors = [0x8b5cf6, 0x3b82f6, 0x06b6d4];
    const pPos: Array<[number, number, number]> = [
      [ 0.9,  2.3,  1.0], [-1.1,  2.6, -0.3], [ 3.1,  0.5,  0.2],
      [-3.0,  1.2,  0.5], [ 2.4, -2.4, -0.8], [-0.4, -3.1,  0.9],
      [ 1.5,  0.3,  2.6],
    ];
    pPos.forEach((pos, i) => {
      const mat = new MeshStandardMaterial({
        color: pColors[i % 3], emissive: pColors[i % 3], emissiveIntensity: 2.8,
      });
      const m = new Mesh(new SphereGeometry(0.065, 8, 8), mat);
      m.position.set(...pos);
      scene.add(m);
    });

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener("resize", onResize, { passive: true });

    renderer.render(scene, camera);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, [wrapperRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
