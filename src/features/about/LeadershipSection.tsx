import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { leadership } from "@/data/about";

const lastIndex = leadership.length - 1;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function LeadershipSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const trackWidth = useRef(1);

  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 35,
    damping: 20,
    mass: 0.8,
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const reduce = prefersReducedMotion || isMobile;

  useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;

    el.style.height = "200vh";

    let frame = 0;
    const tick = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = clamp(scrolled / scrollable, 0, 1);
      rawProgress.set(p);

      if (trackRef.current && viewportRef.current) {
        trackWidth.current = Math.max(
          1,
          trackRef.current.scrollWidth - viewportRef.current.clientWidth,
        );
      }

      const sp = clamp((p - 0.1) / (0.75 - 0.1), 0, 1);
      setActiveIndex((c) => {
        const n = clamp(Math.floor(sp * leadership.length * 0.999), 0, lastIndex);
        return c === n ? c : n;
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, [reduce, rawProgress]);

  const barScale = useTransform(smoothProgress, (v) => {
    return Math.max(0, Math.min(1, (v - 0.08) / (0.75 - 0.08)));
  });
  const trackX = useTransform(smoothProgress, (v) => {
    const sp = Math.max(0, Math.min(1, (v - 0.08) / (0.75 - 0.08)));
    return -sp * trackWidth.current;
  });

  return (
    <Reveal className="mt-20">
      {/* Mobile fallback */}
      <div className={reduce ? "block" : "md:hidden"}>
        <section className="mx-auto max-w-6xl px-6">
          <SectionHeader
            eyebrow="Leadership"
            title="Organizational Experience"
            description="Roles that shaped my leadership, collaboration, and community-building skills."
          />
          <div className="mobile-thin-x-scrollbar -mx-6 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4">
            {leadership.map((item) => (
              <div
                key={item.period + item.title}
                className="metal-panel w-[78vw] shrink-0 snap-center rounded-xl p-6"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  {item.period}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
                {item.desc && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground/80">
                    {item.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Desktop: horizontal scroll */}
      <section
        ref={containerRef}
        className={reduce ? "hidden" : "hidden md:block relative"}
      >
        <div className="sticky top-0 z-50 flex h-screen flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#0c0d0e] via-transparent to-[#0c0d0e]" />
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.04),transparent_60%)]" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pt-[clamp(2.5rem,5vh,3.5rem)]">
            <div className="flex items-end justify-between gap-8">
              <SectionHeader
                eyebrow="Leadership"
                title="Organizational Experience"
                description="Roles that shaped my leadership, collaboration, and community-building skills."
                className="mb-0"
                contentClassName="max-w-xl"
                titleClassName="md:text-3xl lg:text-4xl"
              />
            </div>

            <div className="mt-[clamp(1.25rem,2.5vh,2rem)] flex items-center gap-4">
              <div className="relative h-px flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 origin-left bg-gradient-to-r from-yellow via-white/70 to-yellow"
                  style={{ scaleX: barScale, width: "100%" }}
                />
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
                <span className="text-white">0{activeIndex + 1}</span>
                <span className="text-white/40"> / 0{leadership.length}</span>
              </div>
            </div>
          </div>

          <div
            ref={viewportRef}
            className="relative mt-[clamp(1.5rem,3vh,2.5rem)] flex-1 overflow-hidden"
          >
            <motion.div
              ref={trackRef}
              className="flex h-full w-max items-center gap-[clamp(1.25rem,2vw,2rem)] px-[clamp(2rem,7vw,8rem)] will-change-transform"
              style={{ x: trackX }}
            >
              {leadership.map((item, i) => (
                <motion.div
                  key={item.period + item.title}
                  className="metal-panel flex h-[clamp(16rem,40vh,24rem)] w-[min(62vw,28rem)] shrink-0 flex-col justify-center rounded-2xl border-t border-white/[0.06] p-8 lg:w-[min(48vw,30rem)] xl:w-[min(42vw,32rem)]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="flex items-start gap-5">
                    {item.logo && (
                      <div className="mt-1 shrink-0">
                        <img
                          src={item.logo}
                          alt=""
                          className="h-16 w-16 object-contain lg:h-20 lg:w-20"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <span className="font-mono text-xs uppercase tracking-widest text-primary">
                        {item.period}
                      </span>
                      <h3 className="mt-2 font-display text-xl font-bold lg:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground lg:text-base">
                        {item.subtitle}
                      </p>
                      {item.desc && (
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground/80">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
