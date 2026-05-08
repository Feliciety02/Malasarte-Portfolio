import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationControls, useMotionValue, useSpring, useTransform } from "motion/react";

type Tool = { name: string; slug: string; color: string };

export function GlassDome({ tools, reducedMotion }: { tools: Tool[]; reducedMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(560);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [6, -6]), { stiffness: 80, damping: 20 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 80, damping: 20 });
  const px = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 60, damping: 20 });
  const py = useSpring(useTransform(my, [-1, 1], [-12, 12]), { stiffness: 60, damping: 20 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      setSize(Math.min(w, 720));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Place tools around a circle inside the dome
  const radius = size * 0.32;
  const positions = useMemo(
    () =>
      tools.map((_, i) => {
        const a = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
        return { x: Math.cos(a) * radius, y: Math.sin(a) * radius };
      }),
    [tools, radius],
  );

  // Ambient particles
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        size: 2 + Math.random() * 5,
        // Within a unit circle
        r: Math.sqrt(Math.random()) * 0.85,
        a: Math.random() * Math.PI * 2,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 10,
        hue: Math.random() < 0.5 ? "var(--glow-purple)" : Math.random() < 0.5 ? "var(--glow-blue)" : "var(--glow-pink)",
      })),
    [],
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto aspect-square w-full max-w-[640px]"
      style={{ perspective: 1200 }}
    >
      {/* Dome */}
      <motion.div
        style={{ rotateX: reducedMotion ? 0 : rx, rotateY: reducedMotion ? 0 : ry, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {/* Outer glow */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--glow-purple) 35%, transparent), transparent 70%)",
          }}
        />

        {/* Glass sphere */}
        <div
          aria-hidden
          className="absolute inset-[6%] overflow-hidden rounded-full border border-white/15"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.18), rgba(255,255,255,0.04) 35%, rgba(0,0,0,0.25) 70%), radial-gradient(circle at 70% 80%, color-mix(in oklab, var(--glow-blue) 25%, transparent), transparent 55%), radial-gradient(circle at 30% 80%, color-mix(in oklab, var(--glow-pink) 22%, transparent), transparent 55%)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            boxShadow:
              "inset 0 0 80px rgba(255,255,255,0.08), inset 0 0 200px rgba(0,0,0,0.45), 0 30px 80px -20px rgba(0,0,0,0.6)",
          }}
        >
          {/* Inner refraction rings */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 120deg, transparent, rgba(255,255,255,0.05), transparent 30%, rgba(255,255,255,0.04), transparent 60%)",
              mixBlendMode: "screen",
            }}
          />

          {/* Ambient particles */}
          {particles.map((p) => {
            const cx = 50 + Math.cos(p.a) * p.r * 50;
            const cy = 50 + Math.sin(p.a) * p.r * 50;
            return (
              <motion.span
                key={p.id}
                aria-hidden
                className="absolute rounded-full"
                style={{
                  left: `${cx}%`,
                  top: `${cy}%`,
                  width: p.size,
                  height: p.size,
                  background: p.hue,
                  boxShadow: `0 0 ${p.size * 4}px ${p.hue}`,
                  filter: "blur(0.4px)",
                  opacity: 0.7,
                }}
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        x: [0, 14, -10, 0],
                        y: [0, -12, 8, 0],
                        opacity: [0.35, 0.9, 0.5, 0.35],
                      }
                }
                transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            );
          })}

          {/* Light streak */}
          <motion.div
            aria-hidden
            className="absolute -inset-[20%] opacity-40"
            style={{
              background:
                "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
              mixBlendMode: "screen",
            }}
            animate={reducedMotion ? undefined : { x: ["-30%", "30%"] }}
            transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />

          {/* Top specular highlight */}
          <div
            aria-hidden
            className="absolute left-[12%] right-[35%] top-[8%] h-[18%] rounded-full opacity-70"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.55), rgba(255,255,255,0) 70%)",
              filter: "blur(2px)",
            }}
          />
          {/* Bottom soft reflection */}
          <div
            aria-hidden
            className="absolute bottom-[6%] left-[22%] right-[22%] h-[10%] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.35), rgba(255,255,255,0) 70%)",
              filter: "blur(3px)",
            }}
          />
        </div>

        {/* Tool capsules layer (above glass) */}
        <motion.div
          style={{ x: reducedMotion ? 0 : px, y: reducedMotion ? 0 : py }}
          className="absolute inset-0"
        >
          <div className="absolute left-1/2 top-1/2 h-0 w-0">
            {tools.map((t, i) => (
              <ToolCapsule
                key={t.slug}
                tool={t}
                origin={positions[i]}
                bounds={containerRef}
                reducedMotion={reducedMotion}
                index={i}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ToolCapsule({
  tool,
  origin,
  bounds,
  reducedMotion,
  index,
}: {
  tool: Tool;
  origin: { x: number; y: number };
  bounds: React.RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
  index: number;
}) {
  const [failed, setFailed] = useState(false);
  const controls = useAnimationControls();
  const [dragging, setDragging] = useState(false);

  return (
    <motion.button
      type="button"
      aria-label={`${tool.name} — drag me`}
      title={tool.name}
      drag
      dragConstraints={bounds}
      dragElastic={0.6}
      dragTransition={{ bounceStiffness: 220, bounceDamping: 14, power: 0.4, timeConstant: 280 }}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => {
        setDragging(false);
        controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 140, damping: 16, mass: 0.6 } });
      }}
      animate={controls}
      whileHover={reducedMotion ? undefined : { scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, scale: 0.6 }}
      style={{
        position: "absolute",
        left: origin.x,
        top: origin.y,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: dragging ? 50 : 10,
        touchAction: "none",
      }}
    >
      <motion.div
        animate={
          reducedMotion || dragging
            ? undefined
            : { y: [0, -6, 0, 5, 0], rotate: [0, 1.5, 0, -1.5, 0] }
        }
        transition={{ duration: 6 + (index % 4), repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
        className="group relative grid h-14 w-14 cursor-grab place-items-center rounded-2xl border border-white/15 bg-white/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md outline-none transition-colors hover:bg-white/10 active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-primary"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25), rgba(255,255,255,0) 60%)",
        }}
      >
        {/* Hover glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-70"
          style={{ background: `#${tool.color}33` }}
        />
        {failed ? (
          <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-hero text-[11px] font-bold text-primary-foreground">
            {tool.name.charAt(0)}
          </span>
        ) : (
          <img
            src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color}`}
            alt=""
            aria-hidden
            width={26}
            height={26}
            draggable={false}
            onError={() => setFailed(true)}
            className="h-[26px] w-[26px] select-none"
          />
        )}
        {/* Label */}
        <span className="pointer-events-none absolute -bottom-7 whitespace-nowrap rounded-full glass px-2.5 py-0.5 text-[10px] font-medium text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {tool.name}
        </span>
      </motion.div>
    </motion.button>
  );
}