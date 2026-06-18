import { useCallback, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  GraduationCap,
  Sparkles,
  Users,
} from "lucide-react";
import credentialCybersecurity from "@/assets/about/badges/it-specialist-cybersecurity.png";
import credentialDatabases from "@/assets/about/badges/it-specialist-databases.png";
import { GlassDome } from "@/components/site/GlassDome";
import { GitHubContributions } from "@/components/site/GitHubContributions";
import { Reveal } from "@/components/site/Reveal";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { education } from "@/data/about";
import { tools, type ToolCategory } from "@/data/home";

type AboutHubSectionProps = {
  reducedMotion: boolean;
};

type AboutItem = {
  label: string;
  eyebrow: string;
  blurb: string;
  accent: string;
  stats: string[];
  icon: typeof Sparkles;
  content: JSX.Element;
};

const categoryInfo: { label: string; key: ToolCategory }[] = [
  { label: "Frontend", key: "frontend" },
  { label: "Backend", key: "backend" },
  { label: "Tools", key: "tools" },
];

const aboutItems: AboutItem[] = [
  {
    label: "Experience",
    eyebrow: "Career path",
    blurb: "A quick timeline of product, visual, and freelance work across creative and technical roles.",
    accent: "from-[#f6c65b]/22 via-transparent to-transparent",
    stats: ["3+ years building", "Product + visual design"],
    icon: BriefcaseBusiness,
    content: (
      <div className="space-y-4">
        {[
          {
            year: "2024 - Now",
            role: "Freelance Designer & VA",
            place: "Remote",
            note: "Handling design systems, client visuals, and operations support.",
          },
          {
            year: "2022 - 2024",
            role: "UI/UX & Social Media Graphics Lead",
            place: "Technology Organization",
            note: "Led interface design and digital campaigns for student-facing initiatives.",
          },
          {
            year: "2020 - 2022",
            role: "Junior Designer",
            place: "Creative Collective",
            note: "Built early branding, layouts, and visual assets across multiple formats.",
          },
        ].map((item, index) => (
          <div
            key={`${item.year}-${item.role}`}
            className="group relative border-b border-white/10 pb-4 pl-5 last:border-b-0 last:pb-0"
          >
            <motion.div
              aria-hidden
              initial={false}
              animate={{ height: index === 0 ? 64 : 48 }}
              className="absolute left-0 top-1 w-px bg-gradient-to-b from-yellow via-white/20 to-transparent"
              style={{ opacity: index === 0 ? 1 : 0.7 }}
            />
            <span className="font-mono text-[10px] uppercase tracking-widest text-yellow">
              {item.year}
            </span>
            <h4 className="mt-1 font-display text-base font-bold transition-transform duration-300 group-hover:translate-x-1">
              {item.role}
            </h4>
            <p className="text-sm text-muted-foreground">{item.place}</p>
            <p className="mt-2 text-sm leading-6 text-white/55">{item.note}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: "Leadership",
    eyebrow: "Community work",
    blurb: "Programs, promotion, and student-led initiatives shaped by collaboration and momentum.",
    accent: "from-[#7dd3fc]/22 via-transparent to-transparent",
    stats: ["5+ org roles", "Events and partnerships"],
    icon: Users,
    content: (
      <div className="space-y-4">
        {[
          {
            title: "President",
            org: "UM Student Developers Community (UMSDC)",
            period: "2025 - Present",
            desc: "Leading community programs, technical initiatives, partnerships, and student development.",
          },
          {
            title: "Chief of Marketing and Promotions",
            org: "CCE-CSG",
            period: "2024 - 2025",
            desc: "Oversaw marketing strategy and promotional campaigns for the college student government.",
          },
          {
            title: "Secretary",
            org: "DOST Agilas Association - UM",
            period: "2024 - 2025",
            desc: "Managed documentation and coordination for DOST scholars at University of Mindanao.",
          },
        ].map((item) => (
          <div
            key={`${item.period}-${item.title}`}
            className="group border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-yellow">
                  {item.period}
                </span>
                <h4 className="mt-1 font-display text-base font-bold transition-transform duration-300 group-hover:translate-x-1">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">{item.org}</p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/55">
                Lead
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/55">{item.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: "Expertise",
    eyebrow: "Creative + technical",
    blurb: "A layered mix of design craft, front-end execution, and people-facing leadership skills.",
    accent: "from-[#f97316]/18 via-transparent to-transparent",
    stats: ["Design to code", "Strategy to execution"],
    icon: Sparkles,
    content: (
      <div className="space-y-6">
        {[
          {
            category: "Design",
            tone: "from-[#f6c65b]/18 to-transparent",
            items: [
              "UI/UX Design",
              "Brand Identity",
              "Social Media Graphics",
              "Prototyping",
              "UX Research",
            ],
          },
          {
            category: "Development",
            tone: "from-[#7dd3fc]/18 to-transparent",
            items: [
              "Front-End",
              "React / TypeScript",
              "Tailwind CSS",
              "PHP / MySQL",
              "Responsive Web",
            ],
          },
          {
            category: "Leadership",
            tone: "from-[#fb7185]/18 to-transparent",
            items: [
              "Student Leadership",
              "Event Management",
              "Community Building",
              "Marketing Strategy",
              "Public Speaking",
            ],
          },
        ].map((group, index) => (
          <div
            key={group.category}
            className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                {group.category}
              </span>
              <span className="text-xs text-white/35">0{index + 1}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <motion.span
                  key={item}
                  whileHover={{ y: -2, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="rounded-full border border-white/10 px-2.5 py-1.5 text-xs text-white/78"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: "Education",
    eyebrow: "Learning track",
    blurb: "Formal study and training that shaped both systems thinking and interface design instincts.",
    accent: "from-[#a78bfa]/20 via-transparent to-transparent",
    stats: ["Academic foundation", "Continuous learning"],
    icon: GraduationCap,
    content: (
      <div className="space-y-4">
        {education.slice(0, 4).map((item) => (
          <div
            key={`${item.period}-${item.title}`}
            className="group border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-yellow">
              {item.period}
            </span>
            <h4 className="mt-1 font-display text-base font-bold transition-transform duration-300 group-hover:translate-x-1">
              {item.title}
            </h4>
            <p className="text-sm text-muted-foreground">{item.subtitle}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: "Certifications",
    eyebrow: "Verified skills",
    blurb: "Industry credentials that back up practical work in databases and cybersecurity.",
    accent: "from-[#34d399]/20 via-transparent to-transparent",
    stats: ["Credly verified", "Technical certifications"],
    icon: BadgeCheck,
    content: (
      <div className="grid grid-cols-2 gap-4">
        <a
          href="https://www.credly.com/badges/b0b94a15-957c-4196-99cc-e3cfbf9cf462/public_url"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] p-5 transition-transform duration-300 hover:-translate-y-1"
        >
          <img src={credentialDatabases} alt="IT Specialist - Databases" className="h-24 w-24 object-contain" />
          <div className="text-center">
            <p className="text-sm font-semibold">IT Specialist - Databases</p>
            <p className="mt-1 text-xs text-muted-foreground">Verified on Credly</p>
          </div>
        </a>
        <a
          href="https://www.credly.com/badges/1f4a95a9-9918-44e9-9073-f81501ed452b/public_url"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] p-5 transition-transform duration-300 hover:-translate-y-1"
        >
          <img
            src={credentialCybersecurity}
            alt="IT Specialist - Cybersecurity"
            className="h-24 w-24 object-contain"
          />
          <div className="text-center">
            <p className="text-sm font-semibold">IT Specialist - Cybersecurity</p>
            <p className="mt-1 text-xs text-muted-foreground">Verified on Credly</p>
          </div>
        </a>
      </div>
    ),
  },
];

export function AboutHubSection({ reducedMotion }: AboutHubSectionProps) {
  const [active, setActive] = useState(0);
  const [clickedCategory, setClickedCategory] = useState<ToolCategory | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<ToolCategory | null>(null);
  const [hoveredToolSlug, setHoveredToolSlug] = useState<string | null>(null);
  const activeCategory = hoveredCategory ?? clickedCategory;
  const activeToolSlug = hoveredCategory || clickedCategory ? null : hoveredToolSlug;

  const handleDomeToolHover = useCallback((slug: string | null) => {
    setHoveredToolSlug(slug);
  }, []);

  const activeItem = aboutItems[active];
  const ActiveIcon = activeItem.icon;

  return (
    <section className="relative -mx-6 isolate overflow-hidden px-6 py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.018), transparent 24%, transparent 76%, rgba(255,255,255,0.012)), repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 8px)",
          backgroundColor: "#070808",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.025),transparent_65%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden mix-blend-screen"
      >
        {[
          { w: 480, t: "-8%", l: "-12%", o: 0.13, d: 0 },
          { w: 420, t: "18%", l: "", o: 0.11, r: "-12%", d: 2 },
          { w: 340, t: "8%", l: "32%", o: 0.1, d: -5 },
          { w: 300, t: "34%", l: "8%", o: 0.08, d: -4 },
          { w: 380, t: "48%", l: "", o: 0.09, r: "12%", d: -10 },
          { w: 260, t: "", o: 0.07, r: "-2%", b: "18%", d: -8 },
          { w: 330, t: "60%", l: "-4%", o: 0.13, d: -3 },
          { w: 260, t: "70%", o: 0.09, r: "2%", d: -7 },
          { w: 400, l: "-8%", b: "4%", o: 0.12, d: -6 },
          { w: 280, o: 0.08, r: "4%", b: "10%", d: -9 },
        ].map((orb, i) => (
          <div
            key={i}
            className={`glow-orb ${reducedMotion ? "" : i % 3 === 0 ? "animate-float" : i % 3 === 1 ? "animate-float-2" : "animate-float-3"}`}
            style={{
              width: orb.w,
              height: orb.w,
              top: orb.t,
              left: orb.l,
              right: orb.r,
              bottom: orb.b,
              background: "rgb(255, 255, 255)",
              opacity: orb.o,
              animationDelay: `${orb.d}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="py-10 sm:py-12">
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-yellow/80">About</span>

          <h2 className="mt-5 max-w-4xl font-display text-5xl font-semibold italic leading-[0.98] tracking-[-0.05em] text-foreground sm:text-6xl lg:text-[5.1rem]">
            I design and develop digital products that are clear, functional, and built with intention.
          </h2>

          <p className="mt-6 max-w-2xl text-[15px] leading-8 text-muted-foreground sm:text-base">
            I combine UI/UX design, full-stack development, and community leadership to build products that solve
            real-world problems. I design for clarity, build for scale, and lead with empathy whether crafting
            interfaces or architecting back-end systems.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["10+", "Projects Built"],
              ["3+", "Years Designing"],
              ["5+", "Organizations Led"],
              ["2", "Industry Certifications"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-4 text-center"
              >
                <p className="font-display text-2xl font-bold italic text-foreground">{value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-[minmax(0,0.88fr)_28rem] lg:gap-8">
            <div className="min-w-0">
              <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
                <h3 className="font-display text-3xl italic tracking-[-0.04em] text-white sm:text-5xl">
                  Exploring layers.
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/45">
                  0{aboutItems.length} sections
                </span>
              </div>
              <nav className="border-t border-white/10" role="tablist" aria-label="About sections">
                {aboutItems.map((item, i) => (
                  <motion.button
                    key={item.label}
                    role="tab"
                    type="button"
                    aria-selected={active === i}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    whileHover={reducedMotion ? undefined : { paddingLeft: 26 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className={`group relative flex w-full items-center justify-between gap-4 border-b border-white/10 py-5 text-left transition-colors md:py-7 ${
                      active === i
                        ? "text-white"
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    <div
                      className={`absolute inset-y-2 left-0 w-px bg-gradient-to-b ${item.accent} ${
                        active === i ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                      }`}
                    />
                    <span className="w-8 shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                      0{i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-2xl tracking-[-0.04em] sm:text-4xl">{item.label}</div>
                      <p className="mt-1 text-sm text-white/55">{item.eyebrow}</p>
                    </div>
                    <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-white/35 md:block">
                      {item.stats[0]}
                    </span>
                    <span
                      className={`text-2xl transition-opacity duration-200 ${
                        active === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      →
                    </span>
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="lg:w-[28rem]">
              <div className="lg:sticky lg:top-32">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#19110c] via-[#0b0b0d] to-[#070808]"
                  >
                    <div className={`relative overflow-hidden p-6 sm:p-8 ${activeItem.accent}`}>
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_42%)]" />
                      <div className="relative min-h-[12rem] sm:min-h-[14rem]">
                        <div>
                          <div className="inline-flex items-center gap-2 text-white/40">
                            <ActiveIcon size={14} />
                          </div>
                          <div className="mt-6 font-display text-4xl italic leading-none tracking-[-0.05em] text-white sm:text-5xl">
                            {activeItem.label}
                          </div>
                          <p className="mt-4 text-sm uppercase tracking-[0.22em] text-white/55">
                            {activeItem.stats[0]}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 p-5 sm:p-6">{activeItem.content}</div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              to="/works"
              className="metal-cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Explore works <ArrowRight size={14} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              More about me <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="mt-20 pt-8">
          <div className="grid gap-24">
            <Reveal>
              <span className="metal-kicker">GitHub</span>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{accentLastWord("Code Activity")}</h2>
              <div className="mt-8">
                <GitHubContributions username="Feliciety02" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid gap-8 lg:grid-cols-5 lg:items-center">
                <div className="lg:col-span-3">
                  <GlassDome
                    tools={tools}
                    reducedMotion={reducedMotion}
                    activeCategory={activeCategory}
                    activeToolSlug={activeToolSlug}
                    onDomeToolHover={handleDomeToolHover}
                  />
                </div>
                <div className="lg:col-span-2">
                  <span className="metal-kicker">Tools I use</span>
                  <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                    {accentLastWord("Tech Stack")}
                  </h2>
                  <div className="mt-6 space-y-5">
                    {categoryInfo.map((cat) => {
                      const categoryTools = tools.filter((t) => t.category === cat.key);
                      const isActive = activeCategory === cat.key;

                      return (
                        <div key={cat.key}>
                          <button
                            type="button"
                            onClick={() => setClickedCategory(clickedCategory === cat.key ? null : cat.key)}
                            onMouseEnter={() => {
                              setHoveredCategory(cat.key);
                              setHoveredToolSlug(null);
                            }}
                            onMouseLeave={() => setHoveredCategory(null)}
                            className="flex items-center gap-2 text-left"
                          >
                            <span
                              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
                              style={{
                                background: isActive ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                                color: isActive ? "white" : "rgba(255,255,255,0.5)",
                                border: isActive
                                  ? "1px solid rgba(255,255,255,0.25)"
                                  : "1px solid rgba(255,255,255,0.08)",
                              }}
                            >
                              {cat.label}
                            </span>
                          </button>
                          <div
                            className="mt-2 flex flex-wrap gap-x-3.5 gap-y-1 pl-1 transition-all duration-300"
                            style={{
                              opacity: isActive ? 1 : 0.5,
                            }}
                          >
                            {categoryTools.map((tool) => {
                              const isToolHighlighted = hoveredToolSlug === tool.slug;
                              return (
                                <span
                                  key={tool.slug}
                                  onMouseEnter={() => {
                                    setHoveredToolSlug(tool.slug);
                                    setHoveredCategory(null);
                                  }}
                                  onMouseLeave={() => setHoveredToolSlug(null)}
                                  className="cursor-default text-sm transition-all duration-300"
                                  style={{
                                    color: isToolHighlighted ? "white" : "rgba(255,255,255,0.5)",
                                    textShadow: isToolHighlighted ? "0 0 12px rgba(255,255,255,0.25)" : "none",
                                  }}
                                >
                                  {tool.name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <ul aria-label="Design tools I use every day" className="sr-only">
                {tools.map((tool) => (
                  <li key={tool.slug}>{tool.name}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
