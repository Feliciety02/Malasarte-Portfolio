import { useCallback, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import aboutFeImage from "@/assets/about/about-fe.png";
import credentialCybersecurity from "@/assets/about/badges/it-specialist-cybersecurity.png";
import credentialDatabases from "@/assets/about/badges/it-specialist-databases.png";
import { GlassDome } from "@/components/site/GlassDome";
import { GitHubContributions } from "@/components/site/GitHubContributions";
import { Reveal } from "@/components/site/Reveal";
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
        <div className="border-y border-white/10 py-10 sm:py-12">
          <div className="grid gap-12 lg:grid-cols-[minmax(17rem,0.82fr)_minmax(0,1.18fr)] lg:gap-0">
            <Reveal className="lg:border-r lg:border-white/10 lg:pr-14">
              <figure className="mx-auto w-full max-w-md">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.025]">
                  <div
                    aria-hidden
                    className="absolute inset-x-[12%] bottom-[8%] h-[58%] rounded-full bg-white/[0.055] blur-3xl"
                  />
                  <div
                    aria-hidden
                    className="absolute left-5 top-5 z-20 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45"
                  >
                    Profile / 01
                  </div>
                  <img
                    src={aboutFeImage}
                    alt="Fe Anne Malasarte"
                    className="satin-photo pointer-events-none absolute bottom-0 left-1/2 z-10 h-[106%] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-[0_28px_42px_rgba(0,0,0,0.48)]"
                  />
                </div>

                <figcaption className="grid gap-4 border-b border-white/10 py-5 sm:grid-cols-2">
                  <div>
                    <p className="font-display text-base font-semibold text-foreground">
                      Fe Anne Malasarte
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">Designer and developer</p>
                  </div>
                  <div className="sm:border-l sm:border-white/10 sm:pl-5">
                    <p className="text-sm font-medium text-foreground">BS Computer Science</p>
                    <p className="mt-1 text-sm text-muted-foreground">University of Mindanao</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.12} className="lg:pl-14">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-yellow">About</span>
                <span aria-hidden className="h-px w-12 bg-yellow/45" />
              </div>
              <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-[3.4rem]">
                I design with purpose and build with care.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-foreground/80">
                I turn early ideas into digital products that feel clear, useful, and considered.
              </p>

              <div className="mt-7 max-w-2xl space-y-4 text-[15px] leading-7 text-muted-foreground sm:text-base">
                <p>
                  I&apos;m a Computer Science student and DOST-SEI scholar working across UI/UX, web
                  development, and brand design. That mix lets me think through both how a product
                  should work and how it should feel to use.
                </p>
                <p>
                  Beyond project work, I help lead technology communities across Mindanao. I value
                  thoughtful collaboration, practical decisions, and work that holds up beyond the
                  first presentation.
                </p>
              </div>

              <div className="mt-9 grid border-y border-white/10 sm:grid-cols-3">
                {[
                  ["Design", "UI/UX and visual systems"],
                  ["Development", "Responsive front-end builds"],
                  ["Leadership", "President, UMSDC"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="border-t border-white/10 py-5 first:border-t-0 sm:border-t-0 sm:px-5 sm:first:pl-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-white/10"
                  >
                    <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-5 text-foreground">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  Selected credentials
                </p>
                <div className="mt-2 grid gap-x-6 sm:grid-cols-2">
                  <a
                    href="https://www.credly.com/badges/b0b94a15-957c-4196-99cc-e3cfbf9cf962/public_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 border-b border-white/10 py-4 transition-colors hover:border-white/30"
                  >
                    <img
                      src={credentialDatabases}
                      alt="IT Specialist - Databases"
                      className="h-11 w-11 shrink-0"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        IT Specialist - Databases
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">Verified on Credly</p>
                    </div>
                  </a>
                  <a
                    href="https://www.credly.com/badges/1f4a95a9-9918-44e9-9073-f81501ed452b/public_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 border-b border-white/10 py-4 transition-colors hover:border-white/30"
                  >
                    <img
                      src={credentialCybersecurity}
                      alt="IT Specialist - Cybersecurity"
                      className="h-11 w-11 shrink-0"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        IT Specialist - Cybersecurity
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">Verified on Credly</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-5">
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
          <div className="grid gap-12">
            <Reveal>
              <span className="metal-kicker">GitHub</span>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Code Activity</h2>
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
                    My everyday stack
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
