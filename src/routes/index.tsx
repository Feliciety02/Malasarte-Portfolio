import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { ArrowRight, Quote, Sparkles } from "lucide-react";
import { GalacticGrid } from "@/components/site/GalacticGrid";
import { GlassDome } from "@/components/site/GlassDome";
import { LinkButton } from "@/components/site/LinkButton";
import { ProjectCard } from "@/components/site/ProjectCard";
import { FloatingOrbs, Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ServiceCard } from "@/components/site/ServiceCard";
import { SkillHighlightCard } from "@/components/site/SkillHighlightCard";
import {
  featuredSlugs,
  marqueeItems,
  processSteps,
  servicePreviews,
  skillHighlights,
  testimonials,
  tools,
} from "@/data/home";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fe Anne Malasarte - Creative Designer & UI/UX Storyteller" },
      { name: "description", content: "Portfolio home of Fe Anne Malasarte - UI/UX, branding, and creative design." },
      { property: "og:title", content: "Fe Anne Malasarte - Creative Designer" },
      { property: "og:description", content: "Crafting meaningful, beautifully animated digital experiences." },
    ],
  }),
  component: Home,
});

const featured = featuredSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is NonNullable<typeof project> => !!project);

function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], prefersReducedMotion ? [1, 1] : [1, 0]);

  return (
    <div className="overflow-x-hidden">
      <section ref={ref} className="relative px-6 py-16 md:py-20">
        <FloatingOrbs />
        <motion.div style={{ y: y2 }} aria-hidden className="absolute inset-0 -z-10 opacity-50" />

        <motion.div style={{ y: y1, opacity }} className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <Sparkles size={14} className="text-primary" />
            Available for select projects · 2026
          </motion.div>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-[7.5rem]">
            <SplitText text="Creative Designer" />
            <br />
            <span className="text-gradient">
              <SplitText text="& UI/UX Storyteller" delay={0.4} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg"
          >
            I&apos;m <span className="font-medium text-foreground">Fe Anne Malasarte</span> - a multidisciplinary designer
            blending UI/UX, branding, and visual storytelling into experiences that feel human, intentional, and quietly
            magical.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <LinkButton to="/works">
              View Portfolio
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </LinkButton>
            <LinkButton to="/about" variant="glass">
              About me
            </LinkButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-12 flex items-center gap-2 text-xs text-muted-foreground"
          >
            <span className="h-px w-10 bg-border" />
            Scroll to explore
            <span className="h-px w-10 bg-border" />
          </motion.div>
        </motion.div>

        <motion.div aria-hidden style={{ y: y2 }} className="absolute left-8 top-1/3 hidden h-20 w-20 rounded-3xl glass md:block" />
        <motion.div
          aria-hidden
          style={{ y: y1 }}
          className="absolute right-12 top-40 hidden h-14 w-14 rotate-12 rounded-2xl bg-gradient-hero shadow-glow md:block"
        />
        <motion.div
          aria-hidden
          style={{ y: y2 }}
          className="absolute bottom-20 right-1/4 hidden h-10 w-10 rounded-full bg-accent/40 blur-xl md:block"
        />
      </section>

      <section className="relative overflow-hidden border-y border-border/50 py-6">
        <Marquee items={marqueeItems} reducedMotion={!!prefersReducedMotion} />
      </section>

      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader
              eyebrow="Selected Work"
              title="Featured projects"
              description="A small slice of recent case studies - tap into any project to read the full story."
              action={
                <LinkButton to="/works" variant="text" className="hidden items-center md:inline-flex">
                  View all works <ArrowRight size={14} />
                </LinkButton>
              }
              className="mb-16"
              contentClassName="max-w-xl"
            />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <LinkButton to="/works" variant="glass">
              View all works <ArrowRight size={14} />
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-24 pt-8 md:pb-24 md:pt-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader
              eyebrow="Toolkit"
              title="Skill highlights"
              action={
                <LinkButton to="/skills" variant="text" className="hidden items-center md:inline-flex">
                  All skills <ArrowRight size={14} />
                </LinkButton>
              }
              className="mb-12"
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {skillHighlights.map((skill, index) => (
              <Reveal key={skill.name} delay={index * 0.06}>
                <SkillHighlightCard name={skill.name} level={skill.level} delay={0.2 + index * 0.06} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServicesScroller services={servicePreviews} reducedMotion={!!prefersReducedMotion} />

      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader
              eyebrow="Workflow"
              title="A glimpse of my process"
              action={
                <LinkButton to="/process" variant="text" className="hidden items-center md:inline-flex">
                  Full process <ArrowRight size={14} />
                </LinkButton>
              }
              className="mb-12"
            />
          </Reveal>

          <div className="grid gap-5 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.07}>
                <div className="group relative h-full overflow-hidden rounded-3xl glass p-6 hover-lift">
                  <div className="font-display text-5xl font-bold text-white/10">0{index + 1}</div>
                  <div className="mt-2 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-hero shadow-glow">
                    <step.icon size={16} className="text-primary-foreground" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-5 md:items-center">
            <Reveal className="md:col-span-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] glass-strong">
                <div className="absolute inset-0 bg-gradient-hero opacity-70" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-[10rem] font-bold leading-none text-white/15">Fe</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-3">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">About</span>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Designer with a soft spot for quiet details.</h2>
              <p className="mt-5 text-muted-foreground">
                I&apos;m a multidisciplinary designer working across UI/UX, branding, publication, and content. I love building
                things that feel intentional, human, and a little bit magical.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { k: "5+", v: "Years" },
                  { k: "40+", v: "Projects" },
                  { k: "10+", v: "Clients" },
                ].map((stat) => (
                  <div key={stat.v} className="rounded-2xl glass p-4 text-center">
                    <div className="font-display text-2xl font-bold text-gradient">{stat.k}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{stat.v}</div>
                  </div>
                ))}
              </div>
              <LinkButton to="/about" variant="glass" className="mt-8">
                Read full story <ArrowRight size={14} />
              </LinkButton>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, color-mix(in oklab, var(--glow-purple) 18%, transparent), transparent 60%), linear-gradient(180deg, transparent, color-mix(in oklab, var(--glow-blue) 8%, transparent), transparent)",
          }}
        />
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeader
              eyebrow="Tools I use"
              title={
                <>
                  My everyday <span className="text-gradient">stack</span>
                </>
              }
              description="Drag the tools inside the glass globe and they respond with real weight, soft collisions, and a natural settle at rest."
              centered
              className="mb-10"
              contentClassName="max-w-xl"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <GlassDome tools={tools} reducedMotion={!!prefersReducedMotion} />
          </Reveal>
          <ul aria-label="Design tools I use every day" className="sr-only">
            {tools.map((tool) => (
              <li key={tool.slug}>{tool.name}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeader
              eyebrow="Kind words"
              title="Collaboration highlights"
              centered
              className="mb-12"
            />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.08}>
                <motion.div whileHover={{ y: -4 }} className="relative h-full rounded-3xl glass-strong p-7 hover-lift">
                  <Quote size={20} className="text-primary" />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">&quot;{testimonial.quote}&quot;</p>
                  <div className="mt-6 border-t border-border/60 pt-4">
                    <div className="font-display text-base font-semibold">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24">
        <Reveal className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] glass-strong p-12 text-center md:p-20">
          <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-20" />
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Let&apos;s create something <span className="text-gradient">meaningful</span> together.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">Have a project in mind? I&apos;d love to hear your story.</p>
          <LinkButton to="/contact" className="mt-10">
            Start a project <ArrowRight size={16} />
          </LinkButton>
        </Reveal>
      </section>
    </div>
  );
}

function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block">
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden pr-[0.25em] align-bottom">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: delay + wordIndex * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Marquee({
  items,
  reducedMotion,
}: {
  items: string[];
  reducedMotion: boolean;
}) {
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
    <div className="group relative overflow-hidden" onWheel={(event) => handleWheel(event.deltaY || event.deltaX)}>
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
            {items.map((item, itemIndex) => (
              <div key={`${loopIndex}-${item}`} className="flex items-center gap-12">
                <span>{item}</span>
                {itemIndex < items.length - 1 ? (
                  <span className="text-primary/90">
                    <Sparkles size={16} strokeWidth={1.8} />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ServicesScroller({
  services,
  reducedMotion,
}: {
  services: typeof servicePreviews;
  reducedMotion: boolean;
}) {
  const featuredServices = services.slice(0, 3);

  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,8,27,0.12) 0%, rgba(8,10,24,0.3) 100%), radial-gradient(circle at 18% 16%, rgba(162, 92, 255, 0.24), transparent 28%), radial-gradient(circle at 82% 18%, rgba(74, 168, 255, 0.18), transparent 24%), radial-gradient(circle at 50% 100%, rgba(255, 78, 187, 0.12), transparent 32%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,transparent,rgba(7,10,28,0.24)_28%,rgba(6,8,22,0.62)_100%)]" />
      <GalacticGrid reducedMotion={reducedMotion} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="What I do"
            title="Services preview"
            description="Scroll through a clean galactic grid to explore the services I design, build, and shape."
            action={
              <LinkButton to="/services" variant="text" className="hidden items-center md:inline-flex">
                All services <ArrowRight size={14} />
              </LinkButton>
            }
            className="mb-12"
            contentClassName="max-w-xl"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredServices.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.07}>
              <ServiceCard {...service} reducedMotion={reducedMotion} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
