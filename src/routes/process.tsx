import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, Pencil, Rocket, Search } from "lucide-react";
import { motion } from "motion/react";
import { FloatingOrbs, Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process - Fe Anne Malasarte" },
      {
        name: "description",
        content: "How I approach every project: research, concept, design, deliver.",
      },
      { property: "og:title", content: "Process - Fe Anne Malasarte" },
      { property: "og:description", content: "A simple, intentional design workflow." },
    ],
  }),
  component: Process,
});

const steps = [
  {
    icon: Search,
    title: "Research",
    text: "I dive into your audience, goals, and competitors - listening before designing.",
    color: "from-violet-500/40 to-fuchsia-500/30",
  },
  {
    icon: Lightbulb,
    title: "Concept",
    text: "Sketches, moodboards, and direction. We align on the story before pixels.",
    color: "from-blue-500/40 to-cyan-500/30",
  },
  {
    icon: Pencil,
    title: "Design",
    text: "High-fidelity UI, branding, and prototypes - refined through honest feedback loops.",
    color: "from-pink-500/40 to-rose-500/30",
  },
  {
    icon: Rocket,
    title: "Deliver",
    text: "Polished assets, dev-ready files, and clear handoff. Built to scale beautifully.",
    color: "from-amber-400/40 to-emerald-400/30",
  },
];

function Process() {
  return (
    <div className="relative overflow-hidden px-6 pb-20">
      <FloatingOrbs />
      <div
        aria-hidden
        className="page-midshade pointer-events-none absolute inset-x-0 top-0 h-[34rem]"
      />
      <section className="relative mx-auto max-w-7xl pt-12">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Workflow
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl md:text-7xl">
            My <span className="text-gradient">process</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm text-muted-foreground md:text-base">
            A simple, intentional flow - focused on understanding, exploration, and craft.
          </p>
        </Reveal>

        <div className="relative mt-16 md:mt-20">
          <div
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block"
          />

          <ol className="space-y-12 md:space-y-24">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <li
                  className={`relative grid items-center gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
                >
                  <motion.div
                    whileHover={{ rotate: -2, scale: 1.02 }}
                    className="relative aspect-[5/4] overflow-hidden rounded-3xl glass-strong p-6 md:p-10"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-60`} />
                    <div className="relative grid h-full place-items-center">
                      <div className="grid h-20 w-20 place-items-center rounded-3xl bg-background/40 shadow-glow backdrop-blur md:h-24 md:w-24">
                        <s.icon size={32} className="text-foreground md:size-9" />
                      </div>
                    </div>
                    <div className="absolute left-5 top-5 font-display text-5xl font-bold text-white/10 md:left-6 md:top-6 md:text-7xl">
                      0{i + 1}
                    </div>
                  </motion.div>

                  <div>
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                      Step 0{i + 1}
                    </span>
                    <h3 className="mt-3 font-display text-3xl font-bold md:text-5xl">{s.title}</h3>
                    <p className="mt-4 max-w-md text-sm text-muted-foreground md:text-base">
                      {s.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
