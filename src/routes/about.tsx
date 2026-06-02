import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { FloatingOrbs, Reveal } from "@/components/site/Reveal";
import { GitHubContributions } from "@/components/site/GitHubContributions";

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
    <div className="relative overflow-hidden px-6 pb-10">
      <FloatingOrbs />
      <div
        aria-hidden
        className="page-midshade pointer-events-none absolute inset-x-0 top-0 h-[34rem]"
      />
      <section className="relative mx-auto max-w-6xl pt-12">
        <div className="grid gap-12 md:grid-cols-5 md:items-center">
          <Reveal className="md:col-span-2">
            <motion.div
              whileHover={{ rotate: -2 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] glass-strong"
            >
              <div className="absolute inset-0 bg-gradient-hero opacity-70" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-[9rem] font-bold leading-none text-white/15 sm:text-[11rem] md:text-[14rem]">
                  Fe
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl glass p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Designer · Storyteller
                </div>
                <div className="mt-1 font-display text-lg font-semibold">Fe Anne Malasarte</div>
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-3">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              About
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl md:text-6xl">
              Hi, I&apos;m <span className="text-gradient">Fe Anne</span>.
            </h1>
            <div className="mt-6 space-y-4 text-sm text-muted-foreground md:text-base">
              <p>
                I&apos;m a creative designer who fell in love with the quiet details - the kerning
                of a headline, the curve of an icon, the way a color palette can feel like a breath
                of air.
              </p>
              <p>
                My journey started in tech and design organizations, where I learned to build
                pubmats, brand identities, and digital products that actually serve people. Today, I
                work across UI/UX, branding, publication design, and a bit of writing - bridging
                strategy and aesthetic.
              </p>
              <p>
                Outside of pixels, I love reading, journaling, and helping creators bring their ideas
                to life - whether through design or virtual support.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { k: "5+", v: "Years designing" },
                { k: "40+", v: "Projects shipped" },
                { k: "10+", v: "Happy clients" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl glass p-4 text-center">
                  <div className="font-display text-2xl font-bold text-gradient md:text-3xl">
                    {s.k}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/works"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                See my work <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-white/10"
              >
                Say hi
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-24">
          <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-4xl">Experience</h2>
          <div className="mt-8 space-y-4">
            {[
              { year: "2024 - Now", role: "Freelance Designer & VA", place: "Remote" },
              { year: "2022 - 2024", role: "UI/UX & Publication Lead", place: "Tech Organization" },
              { year: "2020 - 2022", role: "Junior Designer", place: "Creative Collective" },
            ].map((e) => (
              <div
                key={e.role}
                className="flex flex-col gap-2 rounded-2xl glass p-6 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="font-display text-lg font-semibold">{e.role}</div>
                  <div className="text-sm text-muted-foreground">{e.place}</div>
                </div>
                <span className="text-xs uppercase tracking-wider text-primary">{e.year}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-24 pb-10">
          <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-4xl">Code Activity</h2>
          <div className="mt-8">
            <GitHubContributions username="Feliciety02" />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
