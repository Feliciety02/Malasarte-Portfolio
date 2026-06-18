import { accentLastWord } from "@/components/site/HeadingAccent";
import { Reveal } from "@/components/site/Reveal";
import { experienceRoles } from "@/data/about";

export function ExperienceSection() {
  return (
    <Reveal className="mt-20">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="metal-kicker">Experience</span>
          <h2 className="mt-3 font-display text-3xl font-medium md:text-5xl">
            {accentLastWord("Recent roles")}
          </h2>
        </div>
        <p className="max-w-md text-base leading-6 text-muted-foreground">
          A concise timeline of the roles and environments that shaped the portfolio work.
        </p>
      </div>
      <div className="mt-10 border-t border-white/10">
        {experienceRoles.map((e) => (
          <div
            key={e.role}
            className="grid gap-3 border-b border-white/10 py-6 md:grid-cols-[10rem_minmax(0,1fr)_12rem] md:items-center"
          >
            <span className="font-mono text-sm uppercase tracking-[0.16em] text-primary">
              {e.year}
            </span>
            <div className="font-display text-xl font-semibold">{e.role}</div>
            <div className="text-base text-muted-foreground md:text-right">{e.place}</div>
          </div>
        ))}
      </div>
      </section>
    </Reveal>
  );
}
