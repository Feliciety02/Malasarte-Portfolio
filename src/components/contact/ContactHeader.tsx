import { Reveal } from "@/components/site/Reveal";

export function ContactHeader() {
  return (
    <Reveal>
      <div className="mx-auto max-w-2xl text-center">
        <span className="metal-kicker text-xs tracking-[0.2em]">Contact</span>
        <h1 className="mt-4 bg-gradient-to-r from-purple-400 via-violet-300 to-yellow bg-clip-text font-display text-4xl font-bold leading-[1.04] tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Start a project.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
          Have a project, idea, or collaboration in mind? Send the essentials and I&apos;ll reply
          with scope, timing, and next steps.
        </p>
      </div>
    </Reveal>
  );
}
