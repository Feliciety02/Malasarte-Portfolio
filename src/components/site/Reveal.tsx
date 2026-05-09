import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function FloatingOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="glow-orb animate-float"
        style={{
          background: "var(--glow-purple)",
          width: 420,
          height: 420,
          top: "-10%",
          left: "-8%",
        }}
      />
      <div
        className="glow-orb animate-float-2"
        style={{
          background: "var(--glow-blue)",
          width: 380,
          height: 380,
          top: "30%",
          right: "-10%",
        }}
      />
      <div
        className="glow-orb animate-float"
        style={{
          background: "var(--glow-pink)",
          width: 320,
          height: 320,
          bottom: "-10%",
          left: "30%",
          animationDelay: "-4s",
        }}
      />
    </div>
  );
}
