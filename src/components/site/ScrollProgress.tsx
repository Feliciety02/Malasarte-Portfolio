import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 h-[2px] md:bottom-auto md:left-0 md:top-0 md:h-full md:w-[2px]">
      <motion.div
        className="h-full w-full origin-top bg-gradient-to-b from-primary/60 via-primary/30 to-transparent md:origin-left"
        style={{ scaleY }}
      />
    </div>
  );
}
