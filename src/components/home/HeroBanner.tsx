import heroDesktopArtwork from "@/assets/hero-desktop.svg";
import heroMobileArtwork from "@/assets/hero-mobile.svg";
import { BrushedMetalBackground } from "@/components/site/BrushedMetalBackground";

export function HeroBanner() {
  return (
    <section className="hero-reference relative overflow-hidden bg-[#141516]">
      <BrushedMetalBackground />

      <h1 className="sr-only">Creative Portfolio</h1>

      <picture className="relative z-10 block">
        <source media="(max-width: 767px)" srcSet={heroMobileArtwork} />
        <img
          src={heroDesktopArtwork}
          width={1072}
          height={665}
          alt="Fe Anne Malasarte portrait in front of bold Creative Portfolio lettering"
          className="hero-reference__artwork pointer-events-none select-none"
          draggable={false}
        />
      </picture>
    </section>
  );
}
