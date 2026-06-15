import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import credentialCybersecurity from "@/assets/about/badges/it-specialist-cybersecurity.png";
import credentialDatabases from "@/assets/about/badges/it-specialist-databases.png";

export function CredentialsSection() {
  return (
    <Reveal className="mt-20">
      <section className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Credentials"
          title="Licenses & Certifications"
          description="Verified IT Specialist certifications — click to verify on Credly."
        />
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <a
            href="https://www.credly.com/badges/b0b94a15-957c-4196-99cc-e3cfbf9cf962/public_url"
            target="_blank"
            rel="noopener noreferrer"
            className="metal-panel group flex flex-col items-center gap-5 rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.02] sm:p-8"
          >
            <img
              src={credentialDatabases}
              alt="IT Specialist – Databases"
              className="h-56 w-56 shrink-0"
              loading="lazy"
            />
            <div>
              <p className="font-display text-lg font-bold">IT Specialist – Databases</p>
              <p className="mt-1 text-sm text-muted-foreground">Click to verify on Credly</p>
            </div>
          </a>
          <a
            href="https://www.credly.com/badges/1f4a95a9-9918-44e9-9073-f81501ed452b/public_url"
            target="_blank"
            rel="noopener noreferrer"
            className="metal-panel group flex flex-col items-center gap-5 rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.02] sm:p-8"
          >
            <img
              src={credentialCybersecurity}
              alt="IT Specialist – Cybersecurity"
              className="h-56 w-56 shrink-0"
              loading="lazy"
            />
            <div>
              <p className="font-display text-base font-bold">IT Specialist – Cybersecurity</p>
              <p className="mt-1 text-sm text-muted-foreground">Click to verify on Credly</p>
            </div>
          </a>
        </div>
      </section>
    </Reveal>
  );
}
