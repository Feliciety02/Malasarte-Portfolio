import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import aboutFeImage from "@/assets/about-fe.png";
import { GitHubContributions } from "@/components/site/GitHubContributions";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { MetallicPage } from "@/components/site/MetallicPage";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - Fe Anne Malasarte" },
      {
        name: "description",
        content:
          "Meet Fe Anne - a creative designer with roots in tech orgs, branding, and storytelling.",
      },
      { property: "og:title", content: "About - Fe Anne Malasarte" },
      {
        property: "og:description",
        content: "A short, honest introduction to a designer who loves quiet details.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <MetallicPage variant="about" className="px-6 pb-20">
      <section className="mx-auto max-w-6xl pt-12 md:pt-20">
        <div className="grid gap-14 md:grid-cols-5 md:items-end">
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
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-3">
            <span className="metal-kicker">About</span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              {accentLastWord("Who is Fe Anne?")}
            </h1>
            <div className="mt-7 space-y-5 text-sm leading-7 text-muted-foreground md:text-base">
              <p>
                I&apos;m a creative designer who fell in love with the quiet details: the spacing of
                a headline, the edge of a mark, and the way a layout can make information feel
                calmer.
              </p>
              <p>
                My work grew through tech and design organizations, where I built social media
                graphics, creative assets, identities, and digital products that had to be clear,
                fast to use, and easy to maintain.
              </p>
              <p>
                Today I work across UI/UX, branding, social media graphics, content, and virtual
                support, connecting strategy with visual craft.
              </p>
            </div>

            <div className="mt-10 grid border-y border-white/10 py-6 sm:grid-cols-3">
              {[
                { k: "5+", v: "Years designing" },
                { k: "40+", v: "Projects shipped" },
                { k: "10+", v: "Happy clients" },
              ].map((s) => (
                <div key={s.v} className="py-4 sm:border-r sm:border-white/10 sm:px-6 sm:first:pl-0 sm:last:border-r-0">
                  <div className="font-display text-3xl font-bold text-gradient">{s.k}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/works"
                className="metal-cta inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                See my work <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="metal-ghost inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold hover:bg-white/10"
              >
                Say hi
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-24">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="metal-kicker">Experience</span>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
                {accentLastWord("Recent roles")}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              A concise timeline of the roles and environments that shaped the portfolio work.
            </p>
          </div>
          <div className="mt-10 border-t border-white/10">
            {[
              { year: "2024 - Now", role: "Freelance Designer & VA", place: "Remote" },
              { year: "2022 - 2024", role: "UI/UX & Social Media Graphics Lead", place: "Tech Organization" },
              { year: "2020 - 2022", role: "Junior Designer", place: "Creative Collective" },
            ].map((e) => (
              <div
                key={e.role}
                className="grid gap-3 border-b border-white/10 py-6 md:grid-cols-[10rem_minmax(0,1fr)_12rem] md:items-center"
              >
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
                  {e.year}
                </span>
                <div className="font-display text-xl font-semibold">{e.role}</div>
                <div className="text-sm text-muted-foreground md:text-right">{e.place}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-24 pb-10">
          <span className="metal-kicker">Code Activity</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("GitHub signal")}
          </h2>
          <div className="mt-8">
            <GitHubContributions username="Feliciety02" />
          </div>
        </Reveal>
      </section>
    </MetallicPage>
  );
}
