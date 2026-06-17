import { AccentText } from "@/components/site/HeadingAccent";

type StatItem = {
  value: string;
  label: string;
};

type PortfolioHeroProps = {
  stats: StatItem[];
};

export function PortfolioHero({ stats }: PortfolioHeroProps) {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
      <span className="metal-kicker">Portfolio</span>

      <div className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
        <div>Selected</div>
        <div>
          <AccentText>Works</AccentText>
        </div>
      </div>

      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
        A curated collection of digital products, brands, interfaces, and creative
        systems shaped across categories, clients, and disciplines.
      </p>

      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-1.5">
            <span className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
              {stat.value}
            </span>
            <span className="text-xs text-muted-foreground sm:text-sm">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
