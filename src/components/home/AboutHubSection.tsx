import { useCallback, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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

const categoryInfo: { label: string; key: ToolCategory }[] = [
  { label: "Frontend", key: "frontend" },
  { label: "Backend", key: "backend" },
  { label: "Tools", key: "tools" },
];

export function AboutHubSection({ reducedMotion }: AboutHubSectionProps) {
  const [clickedCategory, setClickedCategory] = useState<ToolCategory | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<ToolCategory | null>(null);
  const [hoveredToolSlug, setHoveredToolSlug] = useState<string | null>(null);
  const activeCategory = hoveredCategory ?? clickedCategory;
  const activeToolSlug = hoveredCategory || clickedCategory ? null : hoveredToolSlug;

  const handleDomeToolHover = useCallback((slug: string | null) => {
    setHoveredToolSlug(slug);
  }, []);
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
        <div
          className={`glow-orb ${reducedMotion ? "" : "animate-float"}`}
          style={{
            width: 480,
            height: 480,
            top: "-8%",
            left: "-12%",
            background: "rgb(255, 255, 255)",
            opacity: 0.13,
          }}
        />
        <div
          className={`glow-orb ${reducedMotion ? "" : "animate-float-2"}`}
          style={{
            width: 420,
            height: 420,
            top: "18%",
            right: "-12%",
            background: "rgb(255, 255, 255)",
            opacity: 0.11,
          }}
        />
        <div
          className={`glow-orb ${reducedMotion ? "" : "animate-float-3"}`}
          style={{
            width: 340,
            height: 340,
            bottom: "8%",
            left: "32%",
            background: "rgb(255, 255, 255)",
            opacity: 0.1,
            animationDelay: "-5s",
          }}
        />
        <div
          className={`glow-orb ${reducedMotion ? "" : "animate-float-2"}`}
          style={{
            width: 300,
            height: 300,
            top: "34%",
            left: "8%",
            background: "rgb(255, 255, 255)",
            opacity: 0.08,
            animationDelay: "-4s",
          }}
        />
        <div
          className={`glow-orb ${reducedMotion ? "" : "animate-float-3"}`}
          style={{
            width: 380,
            height: 380,
            top: "48%",
            right: "12%",
            background: "rgb(255, 255, 255)",
            opacity: 0.09,
            animationDelay: "-10s",
          }}
        />
        <div
          className={`glow-orb ${reducedMotion ? "" : "animate-float"}`}
          style={{
            width: 260,
            height: 260,
            right: "-2%",
            bottom: "18%",
            background: "rgb(255, 255, 255)",
            opacity: 0.07,
            animationDelay: "-8s",
          }}
        />
        <div
          className={`glow-orb ${reducedMotion ? "" : "animate-float"}`}
          style={{
            width: 330,
            height: 330,
            top: "60%",
            left: "-4%",
            background: "rgb(255, 255, 255)",
            opacity: 0.13,
            animationDelay: "-3s",
          }}
        />
        <div
          className={`glow-orb ${reducedMotion ? "" : "animate-float-2"}`}
          style={{
            width: 260,
            height: 260,
            top: "70%",
            right: "2%",
            background: "rgb(255, 255, 255)",
            opacity: 0.09,
            animationDelay: "-7s",
          }}
        />
        <div
          className={`glow-orb ${reducedMotion ? "" : "animate-float-3"}`}
          style={{
            width: 400,
            height: 400,
            left: "-8%",
            bottom: "4%",
            background: "rgb(255, 255, 255)",
            opacity: 0.12,
            animationDelay: "-6s",
          }}
        />
        <div
          className={`glow-orb ${reducedMotion ? "" : "animate-float"}`}
          style={{
            width: 280,
            height: 280,
            right: "4%",
            bottom: "10%",
            background: "rgb(255, 255, 255)",
            opacity: 0.08,
            animationDelay: "-9s",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="py-10 sm:py-12">
          <div className="grid gap-12 lg:grid-cols-[minmax(15rem,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
            <Reveal className="lg:border-r lg:border-white/10 lg:pr-14">
              <div className="mx-auto w-full max-w-md">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
                    Education
                  </div>
                  <div className="space-y-2">
                    {education.slice(0, 3).map((item, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-3.5"
                      >
                        {item.logo ? (
                          <div className="flex gap-3">
                            <img
                              src={item.logo}
                              alt=""
                              className="mt-0.5 h-10 w-10 shrink-0 object-contain"
                            />
                            <div className="min-w-0 flex-1">
                              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                                {item.period}
                              </span>
                              <h3 className="mt-0.5 font-display text-sm font-bold text-foreground">
                                {item.title}
                              </h3>
                              <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                              {item.period}
                            </span>
                            <h3 className="mt-0.5 font-display text-sm font-bold text-foreground">
                              {item.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
                    Certifications
                  </div>
                  <div className="space-y-2">
                    <a
                      href="https://www.credly.com/badges/b0b94a15-957c-4196-99cc-e3cfbf9cf962/public_url"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] p-3.5 transition-colors hover:bg-white/[0.04]"
                    >
                      <img
                        src={credentialDatabases}
                        alt="IT Specialist - Databases"
                        className="h-9 w-9 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground">
                          IT Specialist - Databases
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">Verified on Credly</p>
                      </div>
                    </a>
                    <a
                      href="https://www.credly.com/badges/1f4a95a9-9918-44e9-9073-f81501ed452b/public_url"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] p-3.5 transition-colors hover:bg-white/[0.04]"
                    >
                      <img
                        src={credentialCybersecurity}
                        alt="IT Specialist - Cybersecurity"
                        className="h-9 w-9 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground">
                          IT Specialist - Cybersecurity
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">Verified on Credly</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="lg:pl-14">
              <span className="text-sm font-medium text-yellow">About</span>

              <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-[3.4rem]">
                I design and develop digital products that are clear, functional, and built with intention.
              </h2>

              <p className="mt-5 max-w-2xl text-[15px] leading-8 text-muted-foreground sm:text-base">
                I combine UI/UX design, full-stack development, and community leadership to build products that solve real-world problems. I design for clarity, build for scale, and lead with empathy whether crafting interfaces or architecting back-end systems.
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
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-4 text-center"
                  >
                    <p className="font-display text-2xl font-bold text-foreground">{value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  to="/works"
                  className="metal-cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                >
                  View selected work <ArrowRight size={14} />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  More about me <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
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
                            onClick={() =>
                              setClickedCategory(clickedCategory === cat.key ? null : cat.key)
                            }
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
                                background: isActive
                                  ? "rgba(255,255,255,0.12)"
                                  : "rgba(255,255,255,0.04)",
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
                                    textShadow: isToolHighlighted
                                      ? `0 0 12px rgba(255,255,255,0.25)`
                                      : "none",
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
