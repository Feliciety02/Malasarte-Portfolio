import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import aboutFeImage from "@/assets/about/about-fe.png";
import { PortfolioStats } from "@/components/about/PortfolioStats";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { Reveal } from "@/components/site/Reveal";

export function AboutHeroSection() {
  return (
    <section className="mx-auto max-w-6xl pt-12 md:pt-20">
      <div className="grid gap-14 md:grid-cols-5 md:items-start">
        <Reveal className="md:col-span-2">
          <div className="metal-panel relative mx-auto flex w-full max-w-md flex-col overflow-hidden md:max-w-[25rem] md:min-h-[39rem]">
            <div className="relative flex-1 overflow-hidden">
              <img
                src={aboutFeImage}
                alt="Fe Anne Malasarte portrait"
                className="satin-photo absolute inset-x-0 bottom-0 mx-auto h-[108%] w-auto max-w-none object-contain object-bottom"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/42 via-transparent to-white/8" />
            <div className="relative z-10 mx-5 mb-5 border-t border-white/12 pt-4">
              <div className="metal-microcopy">Designer / Storyteller</div>
              <div className="mt-1 font-display text-lg font-semibold">Fe Anne Malasarte</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="md:col-span-3">
          <span className="metal-kicker">About</span>
          <h1 className="section-title mt-4 font-medium text-foreground">
            {accentLastWord("Who is Fe Anne?")}
          </h1>
          <div className="mt-7 space-y-5 text-base leading-7 text-muted-foreground">
            <p>
              I&apos;m Fe Anne L. Malasarte, a DOST-SEI Scholar and Computer Science student at
              the University of Mindanao. I specialize in UI/UX Design, Software Development, Branding,
              and Creative Strategy, combining technical expertise with design thinking to build
              impactful digital experiences.
            </p>
            <p>
              Alongside my academic journey, I actively contribute to technology communities,
              student organizations, and innovation initiatives across Mindanao through
              leadership, volunteer work, and community engagement.
            </p>
          </div>

          <PortfolioStats />

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
    </section>
  );
}
