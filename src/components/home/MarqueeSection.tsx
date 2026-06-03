import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { Star } from "lucide-react";
import { marqueeItems } from "@/data/home";

type ReducedMotionProps = {
  reducedMotion: boolean;
};

export function MarqueeSection({ reducedMotion }: ReducedMotionProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 py-6">
      <Marquee items={marqueeItems} reducedMotion={reducedMotion} />
    </section>
  );
}

function Marquee({ items, reducedMotion }: { items: string[]; reducedMotion: boolean }) {
  const loopX = useMotionValue(reducedMotion ? 0 : -50);
  const boost = useSpring(1, { stiffness: 180, damping: 24, mass: 0.8 });
  const x = useMotionTemplate`${loopX}%`;
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useAnimationFrame((_, delta) => {
    if (reducedMotion) return;

    const speed = 2.8 * boost.get();
    let next = loopX.get() + (speed * delta) / 1000;

    if (next >= 0) next -= 50;

    loopX.set(next);
  });

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleWheel = (delta: number) => {
    if (reducedMotion) return;

    boost.set(Math.min(4.2, 1 + Math.abs(delta) / 120));

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      boost.set(1);
    }, 1000);
  };

  return (
    <div
      className="group relative overflow-hidden"
      onWheel={(event) => handleWheel(event.deltaY || event.deltaX)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent"
      />

      <motion.div
        style={reducedMotion ? undefined : { x }}
        className="flex w-max gap-12 whitespace-nowrap text-2xl font-display font-semibold text-muted-foreground/55 md:text-4xl"
      >
        {Array.from({ length: 2 }).map((_, loopIndex) => (
          <div key={loopIndex} className="flex items-center gap-12 pr-12">
            {items.map((item) => (
              <div key={`${loopIndex}-${item}`} className="flex items-center gap-12">
                <span>{item}</span>
                <span className="text-yellow">
                  <Star size={16} className="fill-yellow/70 text-yellow" strokeWidth={1.8} />
                </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
