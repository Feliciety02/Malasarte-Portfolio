import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BrushedMetalBackground } from "@/components/site/BrushedMetalBackground";
import { LinkButton } from "@/components/site/LinkButton";
import { ProjectCard } from "@/components/site/ProjectCard";
import { SectionHeader } from "@/components/site/SectionHeader";
import { featuredSlugs } from "@/data/home";
import { projects, type Project } from "@/data/projects";

const featuredProjects = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

const lastProjectIndex = featuredProjects.length - 1;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function ProcessPreviewSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const procWidth = useRef(1);

  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { stiffness: 35, damping: 20, mass: 0.8 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const reduce = prefersReducedMotion || isMobile;

  /* ── scroll tracking ── */
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
        procWidth.current = Math.max(
          1,
          trackRef.current.scrollWidth - viewportRef.current.clientWidth,
        );
      }

      const sp = clamp((p - 0.1) / (0.75 - 0.1), 0, 1);
      setActiveIndex((c) => {
        const n = clamp(Math.floor(sp * featuredProjects.length * 0.999), 0, lastProjectIndex);
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

  /* ── derived transforms ── */
  const barScale = useTransform(smoothProgress, (v) => {
    const sp = Math.max(0, Math.min(1, (v - 0.08) / (0.75 - 0.08)));
    return sp;
  });
  const trackX = useTransform(smoothProgress, (v) => {
    const sp = Math.max(0, Math.min(1, (v - 0.08) / (0.75 - 0.08)));
    return -sp * procWidth.current;
  });

  return (
    <section ref={containerRef} className="relative">
      {/* Mobile / reduced-motion fallback */}
      <div className={reduce ? "block" : "md:hidden"}>
        <div className="relative overflow-hidden px-6 py-20">
          <div className="absolute inset-0 z-0 bg-[#141516]" />
          <div className="absolute inset-0 z-0 opacity-40">
            <BrushedMetalBackground interactiveTargetRef={containerRef} />
          </div>
          <div className="relative z-10 mx-auto max-w-2xl">
            <SectionHeader
              eyebrow="Selected Work"
              title="Featured projects"
              description="A selection of products, platforms, and digital experiences spanning UI/UX, development, branding, and research."
              className="mb-10"
            />
          </div>
          <div className="mobile-thin-x-scrollbar relative z-10 -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4">
            {featuredProjects.map((project, i) => (
              <div key={project.slug} className="w-[82vw] shrink-0 snap-center">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
          <div className="relative z-10 mx-auto mt-8 max-w-2xl">
            <LinkButton to="/works" variant="text" className="inline-flex items-center">
              View all works <ArrowRight size={14} />
            </LinkButton>
          </div>
        </div>
      </div>

      {/* Desktop: scroll-driven carousel */}
      <div
        className={
          reduce
            ? "hidden"
            : "hidden md:block sticky top-0 z-50 h-screen flex-col overflow-hidden"
        }
      >
        <div className="absolute inset-0 z-0 bg-[#141516]" />
        <div aria-hidden className="absolute inset-0 z-0 opacity-40">
          <BrushedMetalBackground interactiveTargetRef={containerRef} />
        </div>

        <motion.div className="relative z-10 flex h-full flex-col" style={{ opacity: 1 }}>
          <div className="mx-auto w-full max-w-7xl px-8 pt-[clamp(2.5rem,5vh,3.5rem)]">
            <div className="flex items-end justify-between gap-8">
              <SectionHeader
                eyebrow="Selected Work"
                title="Featured projects"
                description="A selection of products, platforms, and digital experiences spanning UI/UX, development, branding, and research."
                className="mb-0"
                contentClassName="max-w-xl"
              />
              <LinkButton
                to="/works"
                variant="text"
                className="hidden shrink-0 items-center pb-2 lg:inline-flex"
              >
                View all works <ArrowRight size={14} />
              </LinkButton>
            </div>

            <div className="mt-[clamp(1.25rem,2.5vh,2rem)] flex items-center gap-4">
              <div className="relative h-px flex-1 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="absolute inset-y-0 left-0 origin-left bg-gradient-to-r from-yellow/60 via-white/40 to-yellow/60"
                  style={{ scaleX: barScale, width: "100%" }}
                />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/35">
                <span className="text-white/60">0{activeIndex + 1}</span>
                <span className="text-white/20"> / 0{featuredProjects.length}</span>
              </div>
            </div>
          </div>

          <div
            ref={viewportRef}
            data-process-viewport
            className="relative mt-[clamp(1.5rem,3vh,2.5rem)] flex-1 overflow-hidden"
          >
            <motion.div
              ref={trackRef}
              data-process-track
              className="relative flex h-full w-max items-center gap-[clamp(1.25rem,2vw,2rem)] px-[clamp(2rem,7vw,8rem)] will-change-transform"
              style={{ x: trackX }}
            >
              {featuredProjects.map((project, i) => (
                <div
                  key={project.slug}
                  className="h-[clamp(24rem,62vh,38rem)] w-[min(62vw,32rem)] shrink-0 lg:w-[min(48vw,36rem)] xl:w-[min(42vw,38rem)]"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
