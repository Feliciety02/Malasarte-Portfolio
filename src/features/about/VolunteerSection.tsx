import { useState } from "react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { volunteer, volunteerImages } from "@/data/about";
import { ConferenceGallery } from "./ConferenceGallery";

export function VolunteerSection() {
  const [selectedVolunteer, setSelectedVolunteer] = useState(0);

  const volunteerEntries = volunteer
    .map((v, i) => ({ ...v, images: volunteerImages[i], originalIndex: i }))
    .sort((a, b) => {
      if (a.images && !b.images) return -1;
      if (!a.images && b.images) return 1;
      return 0;
    });

  return (
    <Reveal className="mt-20">
      <section className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Service"
          title="Volunteer Experience"
          description="Contributing time and skills to tech events, communities, and meaningful causes."
        />
        <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
          <div className="space-y-3 md:max-h-[34rem] md:overflow-y-auto md:pr-2">
            {volunteerEntries.map((v, i) => (
              <button
                key={v.originalIndex}
                onClick={() => setSelectedVolunteer(i)}
                className={`w-full rounded-xl p-4 text-left transition-all duration-200 metal-panel ${
                  selectedVolunteer === i ? "ring-2 ring-primary" : "hover:bg-white/5"
                }`}
              >
                <span className="font-mono text-sm uppercase tracking-widest text-primary">
                  {v.date}
                </span>
                <h3 className="mt-1 font-display text-base font-bold leading-snug text-balance">
                  {v.event}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.role}</p>
              </button>
            ))}
          </div>
          <ConferenceGallery
            images={volunteerEntries[selectedVolunteer].images}
            conferenceIndex={selectedVolunteer}
          />
        </div>
      </section>
    </Reveal>
  );
}
