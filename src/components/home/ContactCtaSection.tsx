import { ArrowRight } from "lucide-react";
import { AccentText } from "@/components/site/HeadingAccent";
import { LinkButton } from "@/components/site/LinkButton";
import { Reveal } from "@/components/site/Reveal";

export function ContactCtaSection() {
  return (
    <section className="relative -mx-6 isolate overflow-hidden border-y border-white/[0.05] px-6 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.018), transparent 28%, transparent 72%, rgba(255,255,255,0.012)), repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 8px)",
          backgroundColor: "#070808",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.025),transparent_62%)]"
      />

      <Reveal className="mx-auto max-w-5xl text-center">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Have a project in mind?
        </span>

        <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
          Let&apos;s create something <AccentText>thoughtful.</AccentText>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          Share your idea, timeline, and goals. I&apos;ll get back to you with a clear next step.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <LinkButton to="/contact" className="group">
            Start a conversation
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </LinkButton>

          <a
            href="mailto:feannemlsrte@gmail.com"
            className="text-xs text-white/40 transition-colors hover:text-white/70"
          >
            feannemlsrte@gmail.com
          </a>
        </div>
      </Reveal>
    </section>
  );
}
