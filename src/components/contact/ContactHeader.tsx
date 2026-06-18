import { Reveal } from "@/components/site/Reveal";

export function ContactHeader() {
  return (
    <Reveal>
      <div className="mx-auto max-w-2xl text-center">
        <span className="metal-kicker">Contact</span>
        <h1 className="section-title mt-5 bg-gradient-to-r from-white via-white to-yellow bg-clip-text font-semibold text-transparent">
          Start a project.
        </h1>
        <p className="editorial-subtitle section-subtitle mx-auto mt-5 max-w-lg">
          Have a project, idea, or collaboration in mind? Send the essentials and I&apos;ll reply
          with scope, timing, and next steps.
        </p>
      </div>
    </Reveal>
  );
}
