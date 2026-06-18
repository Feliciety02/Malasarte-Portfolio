import { Reveal } from "@/components/site/Reveal";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { GitHubContributions } from "@/components/site/GitHubContributions";

export function GitHubActivitySection() {
  return (
    <Reveal className="mt-20 pb-10">
      <section className="mx-auto max-w-6xl">
        <span className="metal-kicker">GitHub</span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
          {accentLastWord("Code Activity")}
        </h2>
        <div className="mt-8">
          <GitHubContributions username="Feliciety02" />
        </div>
      </section>
    </Reveal>
  );
}
