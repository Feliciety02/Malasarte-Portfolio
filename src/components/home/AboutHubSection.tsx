import { useCallback, useMemo, useState } from "react";
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
import credentialAiSkillsFest from "@/assets/about/badges/ai-skills-fest-2026.png";
import cceCsgLogo from "@/assets/about/CCE CSG.svg";
import dostAgilasAssociationLogo from "@/assets/about/DOST Agilas Association.svg";
import notreDameOfEsperanzaLogo from "@/assets/about/Notre Dame of Esperanza.svg";
import umsdcLogo from "@/assets/about/UM Student Developers Community (UMSDC).svg";
import universityOfMindanaoLogo from "@/assets/about/University of Mindanao.svg";
import { GlassDome } from "@/components/site/GlassDome";
import { GitHubContributions } from "@/components/site/GitHubContributions";
import { Reveal } from "@/components/site/Reveal";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { tools, type ToolCategory } from "@/data/home";

type AboutHubSectionProps = {
  reducedMotion: boolean;
};

type AboutItem = {
  id: "experience" | "leadership" | "expertise" | "education" | "certifications";
  label: string;
  summary: string;
  blurb: string;
  icon: typeof Sparkles;
};

type TimelineEntry = {
  period: string;
  title: string;
  subtitle: string;
  description?: string;
  logo?: string;
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
    summary: "3+ Years Building",
    blurb: "A focused timeline of product, freelance, and visual work across creative and technical roles.",
    icon: BriefcaseBusiness,
  },
  {
    id: "leadership",
    label: "Leadership",
    summary: "5+ Organizations",
    blurb: "Community leadership shaped through strategy, partnerships, promotions, and student development.",
    icon: Users,
  },
  {
    id: "expertise",
    label: "Expertise",
    summary: "Design + Development",
    blurb: "Core strengths across interface design, implementation, and people-facing execution.",
    icon: Sparkles,
  },
  {
    id: "education",
    label: "Education",
    summary: "Academic Journey",
    blurb: "Formal study and milestones that support both systems thinking and product craft.",
    icon: GraduationCap,
  },
  {
    id: "certifications",
    label: "Certifications",
    summary: "3 Credentials",
    blurb: "Technical credentials in databases, cybersecurity, and AI skills.",
    icon: BadgeCheck,
  },
];

const experienceEntries: TimelineEntry[] = [
  {
    period: "2024 - Present",
    title: "Freelance Designer & VA",
    subtitle: "Remote",
  },
  {
    period: "2022 - 2024",
    title: "UI/UX & Social Media Graphics Lead",
    subtitle: "Technology Organization",
  },
  {
    period: "2020 - 2022",
    title: "Junior Designer",
    subtitle: "Creative Collective",
  },
];

const leadershipEntries: TimelineEntry[] = [
  {
    period: "2025 - Present",
    title: "President",
    subtitle: "UM Student Developers Community",
    logo: umsdcLogo,
  },
  {
    period: "2024 - 2025",
    title: "Chief of Marketing and Promotions",
    subtitle: "CCE-CSG",
    logo: cceCsgLogo,
  },
  {
    period: "2024 - 2025",
    title: "Secretary",
    subtitle: "DOST Agilas Association - UM",
    logo: dostAgilasAssociationLogo,
  },
];

const expertiseColumns = [
  {
    title: "Design",
    items: ["UI/UX Design", "Brand Identity", "User Research", "Prototyping"],
  },
  {
    title: "Development",
    items: ["React", "Next.js", "Tailwind CSS", "PHP", "MySQL"],
  },
  {
    title: "Leadership",
    items: ["Project Management", "Community Building", "Marketing Strategy", "Public Speaking"],
  },
];

const educationGroups = [
  {
    institution: "University of Mindanao",
    program: "BS Computer Science",
    period: "2023 - Present",
    logo: universityOfMindanaoLogo,
    achievements: ["Dean's Lister (A.Y. 2023 - 2024)", "Dean's Lister (A.Y. 2024 - 2025)"],
  },
  {
    institution: "Notre Dame of Esperanza",
    program: "STEM Strand",
    period: "2021 - 2023",
    logo: notreDameOfEsperanzaLogo,
    achievements: [],
  },
];

const certificationCards = [
  {
    title: "AI Skills Fest 2026",
    href: "https://www.credly.com/badges/f3f47c04-f607-4740-9b08-1131f9c2a77f/public_url",
    image: credentialAiSkillsFest,
  },
  {
    title: "IT Specialist - Databases",
    href: "https://www.credly.com/badges/b0b94a15-957c-4196-99cc-e3cfbf9cf462/public_url",
    image: credentialDatabases,
  },
  {
    title: "IT Specialist - Cybersecurity",
    href: "https://www.credly.com/badges/1f4a95a9-9918-44e9-9073-f81501ed452b/public_url",
    image: credentialCybersecurity,
  },
];

const transitionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const contentTransition = { duration: 0.5, ease: transitionEase };

function TimelineBlock({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="space-y-16">
      {entries.map((entry, index) => (
        <motion.article
          key={`${entry.period}-${entry.title}`}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...contentTransition, delay: index * 0.12 }}
          className="relative pl-8"
        >
          <div className="absolute left-0 top-1 h-full">
            <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border border-[rgba(187,145,255,0.65)] bg-[rgba(187,145,255,0.2)]">
              <span className="absolute inset-[3px] rounded-full bg-[rgba(187,145,255,0.95)]" />
            </span>
            {index < entries.length - 1 ? (
              <span className="absolute left-[7px] top-7 h-[calc(100%+2.75rem)] w-px bg-[rgba(154,111,255,0.65)]" />
            ) : null}
          </div>

          <div className="mt-4 flex items-start gap-5">
              {entry.logo ? (
                <img src={entry.logo} alt={`${entry.subtitle} logo`} className="h-14 w-14 shrink-0 object-contain" />
              ) : null}
              <div className="min-w-0 flex-1">
                <h4 className="font-display text-[1.45rem] leading-tight tracking-[-0.03em] text-white sm:text-[1.6rem]">
                  {entry.title}
                </h4>
                <div className="mt-1 flex w-full flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <p className="text-[14px] text-white/52 sm:text-[15px]">{entry.subtitle}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgba(211,188,255,0.78)] sm:ml-auto sm:text-right">
                    {entry.period}
                  </p>
                </div>
                {entry.description ? (
                  <p className="mt-3 max-w-xl text-[14px] leading-7 text-white/66 sm:text-[15px]">{entry.description}</p>
                ) : null}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function ExpertiseBlock() {
  return (
    <div className="grid gap-10 md:grid-cols-3">
      {expertiseColumns.map((column, index) => (
        <motion.div
          key={column.title}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...contentTransition, delay: index * 0.1 }}
        >
          <h4 className="font-display text-[1.55rem] leading-tight tracking-[-0.03em] text-white">
            {column.title}
          </h4>
          <ul className="mt-6 space-y-4 text-[15px] leading-8 text-white/66">
            {column.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-[rgba(188,144,255,0.88)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

function EducationBlock() {
  return (
    <div className="space-y-10">
      {educationGroups.map((group, index) => (
        <motion.article
          key={group.institution}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...contentTransition, delay: index * 0.12 }}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1rem] border border-white/8 bg-white/[0.04] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <img src={group.logo} alt={`${group.institution} logo`} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <h4 className="font-display text-[1.7rem] leading-tight tracking-[-0.03em] text-white">
                  {group.institution}
                </h4>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgba(211,188,255,0.78)] sm:ml-auto sm:pt-1 sm:text-right">
                  {group.period}
                </p>
              </div>
              <p className="mt-3 text-lg text-white/82">{group.program}</p>
            </div>
          </div>

          {group.achievements.length > 0 ? (
            <div className="mt-6 pl-[4.5rem]">
              <ul className="space-y-3 text-[15px] leading-8 text-white/66">
                {group.achievements.map((achievement) => (
                  <li key={achievement} className="flex items-start gap-3">
                    <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-[rgba(188,144,255,0.88)]" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {index < educationGroups.length - 1 ? (
            <div className="mt-8 h-px bg-gradient-to-r from-white/10 via-white/6 to-transparent" />
          ) : null}
        </motion.article>
      ))}
    </div>
  );
}

function CertificationsBlock() {
  return (
    <div className="space-y-5">
      {certificationCards.map((card, index) => (
        <motion.a
          key={card.title}
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...contentTransition, delay: index * 0.1 }}
          whileHover={{ x: 4 }}
          className="flex items-center gap-5 rounded-[1.45rem] border border-white/8 bg-white/[0.03] px-5 py-5 transition-colors hover:bg-white/[0.05]"
        >
          <img src={card.image} alt={card.title} className="h-[4.5rem] w-[4.5rem] shrink-0 object-contain" />
          <div className="min-w-0">
            <p className="font-display text-[1.9rem] leading-tight tracking-[-0.03em] text-white">{card.title}</p>
          </div>
        </motion.a>
      ))}
    </div>
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

  const activeContent = useMemo(() => {
    switch (activeItem.id) {
      case "experience":
        return <TimelineBlock entries={experienceEntries} />;
      case "leadership":
        return <TimelineBlock entries={leadershipEntries} />;
      case "expertise":
        return <ExpertiseBlock />;
      case "education":
        return <EducationBlock />;
      case "certifications":
        return <CertificationsBlock />;
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
          <span className="metal-kicker">About</span>

          <h2 className="section-title mt-5 max-w-4xl font-semibold text-foreground">
            {accentLastWord(
              "I design and develop digital products that are clear, functional, and built with intention.",
            )}
          </h2>

          <p className="mt-5 max-w-2xl text-[14px] leading-7 text-muted-foreground sm:text-[15px]">
            I combine UI/UX design, full-stack development, and community leadership to build products that solve
            real-world problems. I design for clarity, build for scale, and lead with empathy whether crafting
            interfaces or architecting back-end systems.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
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

          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["10+", "Projects Built"],
              ["3+", "Years Designing"],
              ["5+", "Organizations Led"],
              ["2", "Industry Certifications"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-center"
              >
                <p className="font-display text-xl font-bold italic text-foreground">{value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:items-stretch">
            <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-6 lg:h-[40rem]">
              <div className="flex h-full flex-col">
                <div className="border-b border-white/8 pb-4">
                  <h3 className="font-display text-[2rem] italic tracking-[-0.05em] text-white sm:text-[3.5rem]">
                    Exploring layers.
                  </h3>
                </div>

                <nav className="mt-6 space-y-2.5" role="tablist" aria-label="About sections">
                  {aboutItems.map((item, index) => {
                    const isActive = active === index;

                    return (
                      <motion.button
                        key={item.id}
                        role="tab"
                        type="button"
                        aria-selected={isActive}
                        onClick={() => setActive(index)}
                        onMouseEnter={() => setActive(index)}
                        onFocus={() => setActive(index)}
                        whileHover={reducedMotion ? undefined : { y: -4 }}
                        animate={{ y: isActive ? -2 : 0 }}
                        transition={{ duration: 0.45, ease: transitionEase }}
                        className={`group relative w-full overflow-hidden rounded-[1.35rem] border px-5 py-5 text-left ${
                          isActive
                            ? "border-[rgba(181,138,255,0.3)] bg-[rgba(255,255,255,0.06)] shadow-[0_18px_40px_rgba(0,0,0,0.24),0_0_28px_rgba(143,92,255,0.16)]"
                            : "border-transparent bg-transparent hover:border-white/8 hover:bg-white/[0.03]"
                        }`}
                      >
                        <motion.div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 rounded-[inherit]"
                          animate={{ opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.45, ease: transitionEase }}
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(161,102,255,0.14), rgba(255,255,255,0.02) 42%, rgba(255,255,255,0.01) 100%)",
                          }}
                        />

                        <div className="relative flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-3">
                              <item.icon size={18} className={isActive ? "text-[rgb(211,188,255)]" : "text-white/36"} />
                              <span
                                className={`font-display text-[1.6rem] tracking-[-0.045em] sm:text-[1.85rem] ${
                                  isActive ? "text-white" : "text-white/74"
                                }`}
                              >
                                {item.label}
                              </span>
                            </div>
                          </div>
                          <motion.span
                            initial={false}
                            animate={{ x: isActive ? 0 : -8, opacity: isActive ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: transitionEase }}
                            className="self-center text-white/64"
                          >
                            <ArrowRight size={18} />
                          </motion.span>
                        </div>
                      </motion.button>
                    );
                  })}
                </nav>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(158,105,255,0.18),transparent_30%),linear-gradient(165deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] lg:h-[40rem]">
              <div className="relative flex h-full flex-col">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.045]"
                  style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.65) 0.7px, transparent 0.7px)",
                    backgroundSize: "8px 8px",
                  }}
                />
                <span className="pointer-events-none absolute right-6 top-5 font-display text-[7rem] italic leading-none tracking-[-0.08em] text-white/[0.05]">
                  {String(active + 1).padStart(2, "0")}
                </span>

                <div className="relative border-b border-white/8 px-6 py-6 sm:px-8 sm:py-6">
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs uppercase tracking-[0.26em] text-[rgba(211,188,255,0.82)]">
                    <ActiveIcon size={14} />
                    {activeItem.label}
                  </span>
                  <h3 className="mt-5 max-w-xl font-display text-[2.55rem] italic leading-[0.94] tracking-[-0.055em] text-white sm:text-[3.35rem]">
                    {activeItem.summary}
                  </h3>
                  <p className="mt-4 max-w-2xl text-[14px] leading-6 text-white/62 sm:text-[15px]">
                    {activeItem.blurb}
                  </p>
                </div>

                <div className="relative flex-1 overflow-hidden px-6 py-5 sm:px-8 sm:py-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.id}
                      initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
                      transition={contentTransition}
                      className="h-full"
                    >
                      {activeContent}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-20 pt-8">
          <div className="grid gap-24">
            <Reveal>
              <span className="metal-kicker">GitHub</span>
              <h2 className="section-title mt-4 font-medium text-foreground">{accentLastWord("Code Activity")}</h2>
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
                  <h2 className="section-title mt-4 font-medium text-foreground">
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
