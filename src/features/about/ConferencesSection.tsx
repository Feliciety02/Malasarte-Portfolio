import { useState } from "react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { conferences, conferenceImages } from "@/data/about";
import { ConferenceGallery } from "./ConferenceGallery";

export function ConferencesSection() {
  const [selectedConference, setSelectedConference] = useState(0);

  const conferenceEntries = conferences
    .map((c, i) => ({ ...c, images: conferenceImages[i], originalIndex: i }))
    .sort((a, b) => {
      if (a.images && !b.images) return -1;
      if (!a.images && b.images) return 1;
      return 0;
    });

  return (
    <Reveal className="mt-20">
      <section className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Engagement"
          title="Conferences, Trainings & Community"
          description="Continuous learning through workshops, meetups, and national programs."
        />
        <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
          <div className="space-y-3 md:max-h-[34rem] md:overflow-y-auto md:pr-2">
            {conferenceEntries.map((c, i) => (
              <button
                key={c.originalIndex}
                onClick={() => setSelectedConference(i)}
                className={`w-full rounded-xl p-4 text-left transition-all duration-200 metal-panel ${
                  selectedConference === i ? "ring-2 ring-primary" : "hover:bg-white/5"
                }`}
              >
                <span className="font-mono text-sm uppercase tracking-widest text-primary">
                  {c.date}
                  {c.location ? ` • ${c.location}` : ""}
                </span>
                <h3 className="mt-1 font-display text-base font-bold leading-snug text-balance">
                  {c.event}
                </h3>
                {c.org && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.org}</p>}
              </button>
            ))}
          </div>
          <ConferenceGallery
            images={conferenceEntries[selectedConference].images}
            conferenceIndex={selectedConference}
          />
        </div>
      </section>
    </Reveal>
  );
}
