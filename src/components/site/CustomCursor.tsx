import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const rx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("cursor-none-all");
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      document.documentElement.classList.remove("cursor-none-all");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference hidden md:block"
        style={{ x: sx, y: sy }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/60 hidden md:block"
        style={{ x: rx, y: ry, width: hover ? 56 : 32, height: hover ? 56 : 32, backgroundColor: hover ? "oklch(0.65 0.25 295 / 0.15)" : "transparent" }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </>
  );
}
