import { useCallback, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import aboutFeImage from "@/assets/about/about-fe.png";
import credentialCybersecurity from "@/assets/about/badges/it-specialist-cybersecurity.png";
import credentialDatabases from "@/assets/about/badges/it-specialist-databases.png";
import { PortfolioStats } from "@/components/about/PortfolioStats";
import { GlassDome } from "@/components/site/GlassDome";
import { GitHubContributions } from "@/components/site/GitHubContributions";
import { accentLastWord } from "@/components/site/HeadingAccent";
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
  const activeCategory = hoveredCategory ?? clickedCategory;

  const handleToolHover = useCallback(
    (slug: string | null) => {
      if (!slug) {
        setHoveredCategory(null);
        return;
      }
      const tool = tools.find((t) => t.slug === slug);
      if (tool) {
        setHoveredCategory(tool.category as ToolCategory);
      }
    },
    [],
  );
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.06), transparent 60%), repeating-linear-gradient(45deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 12px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-5 md:items-center">
          <Reveal className="md:col-span-2">
            <div className="metal-panel relative aspect-[4/5] overflow-hidden">
              <img
                src={aboutFeImage}
                alt="Fe Anne Malasarte portrait"
                className="satin-photo h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/42 via-transparent to-white/8" />
              <div className="absolute bottom-5 left-5 right-5 border-t border-white/12 pt-4">
                <div className="metal-microcopy">Designer / Storyteller</div>
                <div className="mt-1 font-display text-lg font-semibold">Fe Anne Malasarte</div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/works"
                className="metal-cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                See my work <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="metal-ghost inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
              >
                Say hi
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-3">
            <span className="metal-kicker">About</span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              {accentLastWord("Who is Fe Anne?")}
            </h1>
            <div className="mt-7 space-y-5 text-base leading-7 text-muted-foreground">
              <p>
                I&apos;m Fe Anne L. Malasarte, a DOST-SEI Scholar and Computer Science candidate at
                the University of Mindanao, where I specialize in UI/UX design, web development,
                branding, and creative strategy. My work bridges technical rigor with design
                thinking to deliver user-centered digital experiences.
              </p>
              <p>
                Beyond academic pursuits, I contribute to technology communities and innovation
                initiatives across Mindanao through leadership roles, volunteer engagement, and
                cross-functional collaboration. I bring the same structured approach to every
                project — whether designing an interface, building an application, or crafting a
                brand identity.
              </p>
            </div>

            <PortfolioStats />

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <a
                href="https://www.credly.com/badges/b0b94a15-957c-4196-99cc-e3cfbf9cf962/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="metal-panel group flex items-center gap-4 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
              >
                <img
                  src={credentialDatabases}
                  alt="IT Specialist – Databases"
                  className="h-16 w-16 shrink-0"
                  loading="lazy"
                />
                <div>
                  <p className="font-display text-sm font-bold">IT Specialist – Databases</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Verify on Credly</p>
                </div>
              </a>
              <a
                href="https://www.credly.com/badges/1f4a95a9-9918-44e9-9073-f81501ed452b/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="metal-panel group flex items-center gap-4 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
              >
                <img
                  src={credentialCybersecurity}
                  alt="IT Specialist – Cybersecurity"
                  className="h-16 w-16 shrink-0"
                  loading="lazy"
                />
                <div>
                  <p className="font-display text-sm font-bold">IT Specialist – Cybersecurity</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Verify on Credly</p>
                </div>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 border-t border-white/8 pt-16">
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
                    onToolHover={handleToolHover}
                  />
                </div>
                <div className="lg:col-span-2">
                  <span className="metal-kicker">Tools I use</span>
                  <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                    My everyday stack
                  </h2>
                  <p className="mt-3 max-w-xl text-base text-muted-foreground">
                    Drag the tools inside the metal dome and they respond with real weight, soft
                    collisions, and a natural settle at rest.
                  </p>
                  <div className="mt-6 space-y-4">
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
                            onMouseEnter={() => setHoveredCategory(cat.key)}
                            onMouseLeave={() => setHoveredCategory(null)}
                            className="flex items-center gap-2 text-left"
                          >
                            <span
                              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300"
                              style={{
                                background: isActive
                                  ? "rgba(255,255,255,0.1)"
                                  : "rgba(255,255,255,0.04)",
                                color: isActive ? "white" : "rgba(255,255,255,0.5)",
                                border: isActive
                                  ? "1px solid rgba(255,255,255,0.2)"
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
                            {categoryTools.map((tool) => (
                              <span
                                key={tool.slug}
                                className="text-[11px] text-muted-foreground/70"
                              >
                                {tool.name}
                              </span>
                            ))}
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
