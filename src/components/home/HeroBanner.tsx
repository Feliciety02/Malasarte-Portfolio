import { useRef } from "react";
import heroPortrait from "@/assets/hero-portrait-cutout.png";
import { BrushedMetalBackground } from "@/components/site/BrushedMetalBackground";

export function HeroBanner() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section ref={sectionRef} className="hero-reference relative overflow-hidden bg-[#141516]">
      <BrushedMetalBackground interactiveTargetRef={sectionRef} />

      <div className="hero-reference__content relative z-10 mx-auto w-full max-w-[1440px] px-4 text-center sm:px-6">
        <h1 className="hero-reference__title" aria-label="Creative Portfolio">
          <span className="hero-reference__eyebrow" aria-hidden>
            Creative
          </span>
          <span className="hero-reference__word" aria-hidden>
            Portfolio
          </span>
        </h1>

        <img
          src={heroPortrait}
          width={697}
          height={896}
          alt="Fe Anne Malasarte"
          className="hero-reference__portrait pointer-events-none z-10 select-none"
          draggable={false}
        />
      </div>
    </section>
  );
}
