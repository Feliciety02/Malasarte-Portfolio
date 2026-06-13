import { accentLastWord } from "@/components/site/HeadingAccent";

export function PortfolioHero() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
      <span className="metal-kicker">Portfolio / Selected Works</span>

      <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">
        {accentLastWord("Selected Works")}
      </h1>

      <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
        A curated collection of digital products, brands, interfaces, and creative systems.
      </p>
    </section>
  );
}
