import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, Quote, Sparkles, Star } from "lucide-react";
import aboutFeImage from "@/assets/about-fe.png";
import heroBgAsset from "@/assets/hero-bg.png.asset.json";
import heroPortraitAsset from "@/assets/hero-portrait.png.asset.json";
import { GlassDome } from "@/components/site/GlassDome";
import { LinkButton } from "@/components/site/LinkButton";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal } from "@/components/site/Reveal";
import { GitHubContributions } from "@/components/site/GitHubContributions";
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="overflow-x-hidden">
      <HeroBanner />

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
                <img
                  src={aboutFeImage}
                  alt="Fe Anne Malasarte portrait"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/28 via-transparent to-white/5" />
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

      <section className="relative px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeader eyebrow="GitHub" title="Code Activity" className="mb-8" />
          </Reveal>
          <Reveal delay={0.1}>
            <GitHubContributions username="Feliciety02" />
          </Reveal>
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
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">Have a p roject in mind? I&apos;d love to hear your story.</p>
          <LinkButton to="/contact" className="mt-10">
            Start a project <ArrowRight size={16} />
          </LinkButton>
        </Reveal>
      </section>
    </div>
  );
}

function HeroBanner() {
  return (
    <section className="relative -mt-24 overflow-hidden pt-24">
      {/* Top brand bars */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-24 z-20 flex items-center">
        <span className="h-2 w-1/4 bg-[var(--yellow)]" />
        <span className="h-px flex-1 bg-border" />
        <span className="h-2 w-16 bg-muted/60" />
      </div>

      {/* Background texture */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBgAsset.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div aria-hidden className="absolute inset-0 z-0 bg-gradient-to-b from-background/40 via-background/10 to-background/80" />

      <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl flex-col px-6 pt-16 pb-40 md:pt-20">
        {/* Work with me + arrow */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="ml-auto flex items-center gap-4"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-black/40 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-md transition-all hover:border-[var(--yellow)]/60 hover:bg-black/60 hover:text-[var(--yellow)]"
          >
            Work with me
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground md:flex"
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>

        {/* Headline + portrait layered */}
        <div className="relative mt-10 flex-1">
          {/* CREATIVE small label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            CREATIVE
          </motion.div>

          {/* Curved tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="pointer-events-none absolute left-1/2 top-2 z-20 w-[320px] -translate-x-1/2 md:top-6 md:w-[420px]"
          >
            <CurvedTagline />
          </motion.div>

          {/* Big PORTFOLIO behind portrait */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            aria-label="Portfolio"
            className="font-display select-none text-center font-black uppercase leading-[0.85] tracking-[-0.04em] text-foreground"
            style={{
              fontSize: "clamp(5rem, 18vw, 18rem)",
              textShadow: "0 8px 60px rgba(0,0,0,0.35)",
            }}
          >
            PORTFOLIO
          </motion.div>

          {/* Portrait — sits on top center */}
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            src={heroPortraitAsset.url}
            alt="Fe Anne Malasarte portrait with the word Portfolio behind her"
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[58%] max-w-[640px] -translate-x-1/2 -translate-y-[42%] select-none object-contain md:w-[48%]"
            draggable={false}
          />

          {/* Sparkle accent */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="absolute right-[12%] top-2 text-[var(--yellow)]"
          >
            <Sparkles size={20} />
          </motion.div>
        </div>
      </div>

      {/* Bottom service pills bar — yellow strip */}
      <div className="relative z-20">
        <div
          aria-hidden
          className="absolute inset-x-0 -top-10 h-10 bg-[linear-gradient(180deg,transparent,var(--background))]"
        />
        <div className="bg-[var(--yellow)] text-[oklch(0.12_0.01_90)]">
          <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-5 text-sm font-semibold uppercase tracking-wide">
            {[
              "Branding & Identity Design",
              "Social Media Graphics",
              "Marketing & Print Materials",
              "Event & Merchandise Design",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span aria-hidden className="grid h-7 w-7 place-items-center rounded-md bg-black/10">
                  <Sparkles size={14} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CurvedTagline() {
  return (
    <svg viewBox="0 0 400 110" className="w-full">
      <defs>
        <path id="curve" d="M 20 95 Q 200 -10 380 95" fill="transparent" />
      </defs>
      <text className="font-sans" fontSize="16" fill="oklch(0.97 0.01 280)" letterSpacing="0.5">
        <textPath href="#curve" startOffset="50%" textAnchor="middle">
          designing ideas that speak{" "}
          <tspan fill="oklch(0.88 0.17 95)" fontStyle="italic" fontWeight="700">
            volumes
          </tspan>
        </textPath>
      </text>
    </svg>
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
                    <Star size={16} className="fill-primary/90 text-primary/90" strokeWidth={1.8} />
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
