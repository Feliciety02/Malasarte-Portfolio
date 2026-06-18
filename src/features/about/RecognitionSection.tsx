import { useState } from "react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { awards, awardImages } from "@/data/about";
import { AwardsGallery } from "./AwardsGallery";

export function RecognitionSection() {
  const [selectedAward, setSelectedAward] = useState(0);

  const awardEntries = awards
    .map((a, i) => ({ ...a, images: awardImages[i], originalIndex: i }))
    .sort((a, b) => {
      if (a.images && !b.images) return -1;
      if (!a.images && b.images) return 1;
      return 0;
    });

  return (
    <Reveal className="mt-20">
      <section className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Recognition"
          title="Awards & Honors"
          description="Academic, leadership, and competitive achievements."
        />
        <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
          <div className="space-y-3 md:max-h-[34rem] md:overflow-y-auto md:pr-2">
            {awardEntries.map((a, i) => (
              <button
                key={a.originalIndex}
                onClick={() => setSelectedAward(i)}
                className={`w-full rounded-xl p-4 text-left transition-all duration-200 metal-panel ${
                  selectedAward === i ? "ring-2 ring-primary" : "hover:bg-white/5"
                }`}
              >
                <p className="font-display text-base font-bold leading-snug text-balance">{a.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.detail}</p>
              </button>
            ))}
          </div>
          <AwardsGallery images={awardEntries[selectedAward].images} />
        </div>
      </section>
    </Reveal>
  );
}
