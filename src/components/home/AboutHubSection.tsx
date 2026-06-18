import { useCallback, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
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
  id: "experience" | "leadership" | "expertise" | "education" | "certifications";
  label: string;
  eyebrow: string;
  blurb: string;
  accent: string;
  glow: string;
  surface: string;
  stats: [string, string];
  meta: string;
  icon: typeof Sparkles;
};

type ExperienceEntry = {
  year: string;
  role: string;
  place: string;
  note: string;
};

type LeadershipEntry = {
  period: string;
  title: string;
  org: string;
  desc: string;
};

const categoryInfo: { label: string; key: ToolCategory }[] = [
  { label: "Frontend", key: "frontend" },
  { label: "Backend", key: "backend" },
  { label: "Tools", key: "tools" },
];

const aboutItems: AboutItem[] = [
  {
    id: "experience",
    label: "Experience",
    eyebrow: "Career Journey",
    blurb: "A layered timeline of product, visual, and freelance work across creative and technical roles.",
    accent: "rgba(186, 132, 255, 0.92)",
    glow: "rgba(148, 93, 255, 0.22)",
    surface: "from-[rgba(66,34,128,0.34)] via-[rgba(14,14,22,0.96)] to-[rgba(7,8,12,0.98)]",
    stats: ["3+ Years Building", "Product + Visual Design"],
    meta: "Career Path",
    icon: BriefcaseBusiness,
  },
  {
    id: "leadership",
    label: "Leadership",
    eyebrow: "Community Leadership",
    blurb: "Programs, promotion, partnerships, and people-first initiatives shaped through collaboration and momentum.",
    accent: "rgba(174, 127, 255, 0.9)",
    glow: "rgba(126, 100, 255, 0.2)",
    surface: "from-[rgba(54,31,122,0.32)] via-[rgba(14,16,24,0.96)] to-[rgba(7,8,12,0.98)]",
    stats: ["5+ Org Roles", "Events + Partnerships"],
    meta: "Community Work",
    icon: Users,
  },
  {
    id: "expertise",
    label: "Expertise",
    eyebrow: "Creative + Technical",
    blurb: "A systems-level mix of design craft, front-end execution, strategy, and people-facing leadership.",
    accent: "rgba(202, 125, 255, 0.9)",
    glow: "rgba(189, 108, 255, 0.18)",
    surface: "from-[rgba(75,34,124,0.34)] via-[rgba(16,14,24,0.96)] to-[rgba(8,8,12,0.98)]",
    stats: ["Design to Code", "Strategy to Execution"],
    meta: "Capability Map",
    icon: Sparkles,
  },
  {
    id: "education",
    label: "Education",
    eyebrow: "Academic Roadmap",
    blurb: "Formal study and continuous learning that sharpened both systems thinking and interface instincts.",
    accent: "rgba(181, 132, 255, 0.9)",
    glow: "rgba(155, 108, 255, 0.18)",
    surface: "from-[rgba(63,34,116,0.32)] via-[rgba(15,15,23,0.96)] to-[rgba(8,8,12,0.98)]",
    stats: ["Academic Foundation", "Continuous Learning"],
    meta: "Learning Track",
    icon: GraduationCap,
  },
  {
    id: "certifications",
    label: "Certifications",
    eyebrow: "Verified Skills",
    blurb: "Industry credentials that support hands-on work in databases, cybersecurity, and technical systems.",
    accent: "rgba(168, 124, 255, 0.9)",
    glow: "rgba(136, 104, 255, 0.18)",
    surface: "from-[rgba(56,31,110,0.32)] via-[rgba(14,14,20,0.96)] to-[rgba(8,8,12,0.98)]",
    stats: ["Credly Verified", "Technical Credentials"],
    meta: "Verification Layer",
    icon: BadgeCheck,
  },
];

const experienceEntries: ExperienceEntry[] = [
  {
    year: "2024 - Now",
    role: "Freelance Designer & VA",
    place: "Remote",
    note: "Handling design systems, client visuals, and operations support across creative and technical workflows.",
  },
  {
    year: "2022 - 2024",
    role: "UI/UX & Social Media Graphics Lead",
    place: "Technology Organization",
    note: "Led interface design and digital campaigns for student-facing initiatives with a stronger product mindset.",
  },
  {
    year: "2020 - 2022",
    role: "Junior Designer",
    place: "Creative Collective",
    note: "Built early branding, layouts, and visual assets across multiple formats while sharpening execution craft.",
  },
];

const leadershipEntries: LeadershipEntry[] = [
  {
    title: "President",
    org: "UM Student Developers Community (UMSDC)",
    period: "2025 - Present",
    desc: "Leading community programs, technical initiatives, partnerships, and student development with a systems view.",
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
];

const expertiseGroups = [
  {
    label: "Design Systems",
    count: "05",
    items: ["UI/UX Design", "Brand Identity", "Social Media Graphics", "Prototyping", "UX Research"],
  },
  {
    label: "Build Layer",
    count: "05",
    items: ["Front-End", "React / TypeScript", "Tailwind CSS", "PHP / MySQL", "Responsive Web"],
  },
  {
    label: "Leadership Layer",
    count: "05",
    items: ["Student Leadership", "Event Management", "Community Building", "Marketing Strategy", "Public Speaking"],
  },
];

const certificationCards = [
  {
    title: "IT Specialist - Databases",
    note: "Verified on Credly",
    href: "https://www.credly.com/badges/b0b94a15-957c-4196-99cc-e3cfbf9cf462/public_url",
    image: credentialDatabases,
  },
  {
    title: "IT Specialist - Cybersecurity",
    note: "Verified on Credly",
    href: "https://www.credly.com/badges/1f4a95a9-9918-44e9-9073-f81501ed452b/public_url",
    image: credentialCybersecurity,
  },
];

const transitionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const contentTransition = { duration: 0.5, ease: transitionEase };
const staggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};
const staggerChild = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: contentTransition },
};

function ExperienceContent() {
  return (
    <motion.div variants={staggerParent} initial="hidden" animate="show" className="space-y-5">
      {experienceEntries.map((item, index) => (
        <motion.div
          key={`${item.year}-${item.role}`}
          variants={staggerChild}
          className="relative grid gap-3 pl-10"
        >
          <div className="absolute left-0 top-1.5 flex h-full flex-col items-center">
            <motion.span
              className="h-3.5 w-3.5 rounded-full border border-[rgba(199,154,255,0.92)] bg-[rgba(161,101,255,0.2)] shadow-[0_0_24px_rgba(146,94,255,0.35)]"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.12, duration: 0.35, ease: transitionEase }}
            />
            {index < experienceEntries.length - 1 ? (
              <motion.span
                className="mt-2 w-px flex-1 bg-gradient-to-b from-[rgba(188,140,255,0.72)] via-white/18 to-transparent"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: index * 0.12 + 0.08, duration: 0.42, ease: transitionEase }}
                style={{ transformOrigin: "top" }}
              />
            ) : null}
          </div>

          <div className="rounded-[1.55rem] border border-white/8 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[rgba(213,189,255,0.86)]">
                  {item.year}
                </span>
                <h4 className="mt-2 font-display text-[1.45rem] leading-tight tracking-[-0.03em] text-white">
                  {item.role}
                </h4>
                <p className="mt-1 text-sm text-white/52">{item.place}</p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/42">
                0{index + 1}
              </span>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/68">{item.note}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function LeadershipContent() {
  return (
    <motion.div variants={staggerParent} initial="hidden" animate="show" className="grid gap-4">
      {leadershipEntries.map((item, index) => (
        <motion.div
          key={`${item.period}-${item.title}`}
          variants={staggerChild}
          className="relative overflow-hidden rounded-[1.6rem] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-[rgba(190,145,255,0.75)] via-white/20 to-transparent" />
          <span className="pointer-events-none absolute right-5 top-4 font-mono text-[2.8rem] text-white/[0.06]">
            0{index + 1}
          </span>
          <div className="relative pl-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[rgba(213,189,255,0.86)]">
                  {item.period}
                </span>
                <h4 className="mt-2 font-display text-[1.35rem] leading-tight tracking-[-0.03em] text-white">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm text-white/52">{item.org}</p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/46">
                Lead
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/68">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function ExpertiseContent() {
  return (
    <motion.div variants={staggerParent} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-3">
      {expertiseGroups.map((group, index) => (
        <motion.div
          key={group.label}
          variants={staggerChild}
          className="relative overflow-hidden rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-5"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(181,124,255,0.18),transparent_48%)]" />
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/42">
                {group.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgba(213,189,255,0.84)]">
                {group.count} Skills
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {group.items.map((item, itemIndex) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.08 + itemIndex * 0.04,
                    duration: 0.32,
                    ease: transitionEase,
                  }}
                  whileHover={{ y: -3, scale: 1.03 }}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function EducationContent() {
  return (
    <motion.div variants={staggerParent} initial="hidden" animate="show" className="space-y-4">
      {education.slice(0, 4).map((item, index) => (
        <motion.div
          key={`${item.period}-${item.title}`}
          variants={staggerChild}
          className="relative rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5 pl-16"
        >
          <div className="absolute left-6 top-5 flex flex-col items-center">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-[rgba(196,149,255,0.86)] bg-[rgba(170,109,255,0.16)] font-mono text-[10px] text-[rgba(213,189,255,0.95)]">
              0{index + 1}
            </span>
            {index < 3 ? (
              <span className="mt-2 h-16 w-px bg-gradient-to-b from-[rgba(188,140,255,0.72)] via-white/20 to-transparent" />
            ) : null}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[rgba(213,189,255,0.86)]">
            {item.period}
          </span>
          <h4 className="mt-2 font-display text-[1.2rem] leading-tight tracking-[-0.03em] text-white">
            {item.title}
          </h4>
          <p className="mt-2 text-sm leading-7 text-white/65">{item.subtitle}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function CertificationsContent() {
  return (
    <motion.div variants={staggerParent} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2">
      {certificationCards.map((card) => (
        <motion.a
          key={card.title}
          variants={staggerChild}
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -4 }}
          className="group relative overflow-hidden rounded-[1.65rem] border border-white/8 bg-[linear-gradient(165deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.24)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,125,255,0.2),transparent_42%)] opacity-70" />
          <div className="relative flex h-full flex-col items-start">
            <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[rgba(213,189,255,0.84)]">
              Credential
            </span>
            <img
              src={card.image}
              alt={card.title}
              className="mt-6 h-24 w-24 object-contain transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <h4 className="mt-6 font-display text-xl leading-tight tracking-[-0.03em] text-white">
              {card.title}
            </h4>
            <p className="mt-2 text-sm text-white/60">{card.note}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[rgba(220,192,255,0.9)]">
              View Credential <ArrowUpRight size={14} />
            </span>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}

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
  const navIndicatorTop = useMemo(
    () => `${(active / Math.max(aboutItems.length - 1, 1)) * 100}%`,
    [active],
  );

  const activeContent = useMemo(() => {
    switch (activeItem.id) {
      case "experience":
        return <ExperienceContent />;
      case "leadership":
        return <LeadershipContent />;
      case "expertise":
        return <ExpertiseContent />;
      case "education":
        return <EducationContent />;
      case "certifications":
        return <CertificationsContent />;
      default:
        return null;
    }
  }, [activeItem.id]);

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

      <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] overflow-hidden mix-blend-screen">
        {[
          { w: 480, t: "-8%", l: "-12%", o: 0.13, d: 0 },
          { w: 420, t: "18%", o: 0.11, r: "-12%", d: 2 },
          { w: 340, t: "8%", l: "32%", o: 0.1, d: -5 },
          { w: 300, t: "34%", l: "8%", o: 0.08, d: -4 },
          { w: 380, t: "48%", o: 0.09, r: "12%", d: -10 },
          { w: 260, o: 0.07, r: "-2%", b: "18%", d: -8 },
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
            I <em>design</em> and <em>develop</em> digital products that are clear, functional, and built with <em>intention</em>.
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
                <p className="font-display text-2xl font-medium italic text-foreground">{value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:gap-8">
            <div className="min-w-0">
              <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
                <h3 className="font-display text-3xl italic tracking-[-0.04em] text-white sm:text-5xl">
                  Exploring <em>layers</em>.
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/45">
                  0{aboutItems.length} sections
                </span>
              </div>

              <nav className="relative" role="tablist" aria-label="About sections">
                <div className="pointer-events-none absolute bottom-6 left-[1.18rem] top-6 w-px bg-gradient-to-b from-white/10 via-white/12 to-transparent" />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute left-[0.64rem] z-[1] h-5 w-5 -translate-y-1/2 rounded-full border border-[rgba(191,147,255,0.74)] bg-[rgba(148,94,255,0.22)] shadow-[0_0_24px_rgba(148,94,255,0.4)]"
                  animate={{ top: navIndicatorTop }}
                  transition={{ duration: 0.55, ease: transitionEase }}
                />

                {aboutItems.map((item, i) => {
                  const isActive = active === i;

                  return (
                    <motion.button
                      key={item.id}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      animate={{ y: isActive ? -2 : 0, scale: isActive ? 1.01 : 1 }}
                      whileHover={reducedMotion ? undefined : { y: -4 }}
                      transition={{ duration: 0.5, ease: transitionEase }}
                      className={`group relative mb-4 flex w-full items-center gap-4 overflow-hidden rounded-[1.7rem] border px-5 py-5 text-left md:px-6 md:py-6 ${
                        isActive
                          ? "border-white/12 bg-white/[0.06] text-white shadow-[0_24px_50px_rgba(0,0,0,0.28),0_0_36px_rgba(123,84,255,0.18)]"
                          : "border-white/[0.05] bg-transparent text-white/42"
                      }`}
                      style={{
                        backdropFilter: isActive ? "blur(20px)" : "blur(0px)",
                        WebkitBackdropFilter: isActive ? "blur(20px)" : "blur(0px)",
                      }}
                    >
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-[inherit]"
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.45, ease: transitionEase }}
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(166,102,255,0.16), rgba(255,255,255,0.02) 35%, rgba(255,255,255,0.01) 100%)",
                          boxShadow: isActive ? `inset 0 0 0 1px ${item.accent}` : "none",
                        }}
                      />

                      <div className="relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/62">
                          0{i + 1}
                        </span>
                      </div>

                      <div className="relative z-[1] min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <item.icon size={16} className={isActive ? "text-[rgb(214,187,255)]" : "text-white/32"} />
                          <div className="font-display text-2xl tracking-[-0.04em] sm:text-[2rem]"><em>{item.label}</em></div>
                        </div>
                        <p className="mt-1 pl-7 text-sm text-white/52">{item.eyebrow}</p>
                      </div>

                      <motion.div
                        className="relative z-[1] ml-auto hidden text-right md:block"
                        initial={false}
                        animate={{ x: isActive ? 0 : 12, opacity: isActive ? 1 : 0.55 }}
                        transition={{ duration: 0.45, ease: transitionEase }}
                      >
                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">{item.stats[0]}</div>
                        <div className="mt-1 text-xs text-white/34">{item.stats[1]}</div>
                      </motion.div>

                      <motion.span
                        className="relative z-[1] text-xl text-white/74"
                        initial={false}
                        animate={{ x: isActive ? 0 : -6, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: transitionEase }}
                      >
                        <ArrowUpRight size={18} />
                      </motion.span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            <div className="min-w-0">
              <div className="h-full lg:sticky lg:top-32">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -28, filter: "blur(14px)" }}
                    transition={contentTransition}
                    className={`relative h-full min-h-[40rem] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${activeItem.surface}`}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,117,255,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_26%)]" />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)",
                        backgroundSize: "22px 22px",
                      }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.045]"
                      style={{
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 0.7px, transparent 0.7px)",
                        backgroundSize: "8px 8px",
                      }}
                    />
                    <span className="pointer-events-none absolute right-6 top-6 font-display text-[8rem] italic leading-none tracking-[-0.08em] text-white/[0.06] sm:text-[10rem]">
                      0{active + 1}
                    </span>

                    <div className="relative flex h-full flex-col p-6 sm:p-8">
                      <div className="min-h-[14rem]">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[rgba(212,186,255,0.82)]">
                          <ActiveIcon size={12} />
                          {activeItem.meta}
                        </span>
                        <h3 className="mt-6 max-w-xl font-display text-4xl italic leading-[0.94] tracking-[-0.05em] text-white sm:text-[3.7rem]">
                          {activeItem.label}
                        </h3>
                        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-white/55">
                          {activeItem.stats[0]}
                        </p>
                        <p className="mt-8 max-w-xl text-sm leading-7 text-white/62 sm:text-[15px]">
                          {activeItem.blurb}
                        </p>
                      </div>

                      <div className="mt-8 h-px bg-gradient-to-r from-white/12 via-white/6 to-transparent" />

                      <div className="mt-8 flex-1">{activeContent}</div>
                    </div>
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
                            style={{ opacity: isActive ? 1 : 0.5 }}
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
