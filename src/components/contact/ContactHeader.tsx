import { Reveal } from "@/components/site/Reveal";

export function ContactHeader() {
  return (
    <Reveal>
      <div className="mx-auto max-w-2xl text-center">
        <span className="metal-kicker">Contact</span>
        <h1 className="editorial-display mt-5 bg-gradient-to-r from-white via-white to-yellow bg-clip-text text-5xl font-semibold text-transparent sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          Start a project.
        </h1>
        <p className="editorial-subtitle mx-auto mt-5 max-w-lg text-sm md:text-base">
          Have a project, idea, or collaboration in mind? Send the essentials and I&apos;ll reply
          with scope, timing, and next steps.
        </p>
      </div>
    </Reveal>
  );
}
