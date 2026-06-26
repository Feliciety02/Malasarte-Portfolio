import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import credentialIntroAI from "@/assets/about/badges/introduction-to-modern-ai.webp";
import credentialAiSkillsFest from "@/assets/about/badges/ai-skills-fest-2026.webp";
import credentialDatabases from "@/assets/about/badges/it-specialist-databases.webp";
import credentialCybersecurity from "@/assets/about/badges/it-specialist-cybersecurity.webp";
import credentialMspAcademy from "@/assets/about/badges/msp-academy-starting-an-msp-breaking-free-from-the-.webp";
import credentialCloudSIEM from "@/assets/about/badges/cloud-security-engineer-cloud-siem-learning-path.webp";
import credentialBackendEngineer from "@/assets/about/badges/backend-engineer-learning-path.webp";

export function CredentialsSection() {
  return (
    <Reveal className="mt-20">
      <section className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Credentials"
          title="Badges & Certifications"
          description="Verified credentials you can verify on Credly."
        />
        <div className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-8">
          <a
            href="https://www.credly.com/badges/1762ed8e-7a83-4eb7-b89e-1093d95e0671/public_url"
            target="_blank"
            rel="noopener noreferrer"
            className="metal-panel group flex flex-col items-center gap-5 rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.02] sm:p-8"
          >
            <img
              src={credentialIntroAI}
              alt="Introduction to Modern AI"
              className="h-56 w-56 shrink-0 object-contain"
              loading="lazy"
            />
            <div>
              <p className="font-display text-lg font-bold">Introduction to Modern AI</p>
              <p className="mt-1 text-sm text-muted-foreground">Click to verify on Credly</p>
            </div>
          </a>
          <a
            href="https://www.credly.com/badges/7c5802fe-3acf-4036-9434-fcacc96ef50d/public_url"
            target="_blank"
            rel="noopener noreferrer"
            className="metal-panel group flex flex-col items-center gap-5 rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.02] sm:p-8"
          >
            <img
              src={credentialAiSkillsFest}
              alt="AI Skills Fest 2026"
              className="h-56 w-56 shrink-0 object-contain"
              loading="lazy"
            />
            <div>
              <p className="font-display text-lg font-bold">AI Skills Fest 2026</p>
              <p className="mt-1 text-sm text-muted-foreground">Click to verify on Credly</p>
            </div>
          </a>
          <a
            href="https://www.credly.com/badges/b0b94a15-957c-4196-99cc-e3cfbf9cf962/public_url"
            target="_blank"
            rel="noopener noreferrer"
            className="metal-panel group flex flex-col items-center gap-5 rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.02] sm:p-8"
          >
            <img
              src={credentialDatabases}
              alt="IT Specialist – Databases"
              className="h-56 w-56 shrink-0 object-contain"
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
              className="h-56 w-56 shrink-0 object-contain"
              loading="lazy"
            />
            <div>
              <p className="font-display text-base font-bold">IT Specialist – Cybersecurity</p>
              <p className="mt-1 text-sm text-muted-foreground">Click to verify on Credly</p>
            </div>
          </a>
          <a
            href="https://www.credly.com/badges/eab0e173-a659-456e-ac7f-9112931b694d/public_url"
            target="_blank"
            rel="noopener noreferrer"
            className="metal-panel group flex flex-col items-center gap-5 rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.02] sm:p-8"
          >
            <img
              src={credentialMspAcademy}
              alt="MSP Academy: Starting an MSP - Breaking Free from the Break-Fix Model"
              className="h-56 w-56 shrink-0 object-contain"
              loading="lazy"
            />
            <div>
              <p className="font-display text-lg font-bold">MSP Academy: Starting an MSP</p>
              <p className="mt-1 text-sm text-muted-foreground">Click to verify on Credly</p>
            </div>
          </a>
          <a
            href="https://www.credly.com/badges/41c3cad3-a398-4640-8cd1-754255583d8e/public_url"
            target="_blank"
            rel="noopener noreferrer"
            className="metal-panel group flex flex-col items-center gap-5 rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.02] sm:p-8"
          >
            <img
              src={credentialCloudSIEM}
              alt="Cloud Security Engineer - Cloud SIEM Learning Path"
              className="h-56 w-56 shrink-0 object-contain"
              loading="lazy"
            />
            <div>
              <p className="font-display text-lg font-bold">Cloud Security Engineer – Cloud SIEM Learning Path</p>
              <p className="mt-1 text-sm text-muted-foreground">Click to verify on Credly</p>
            </div>
          </a>
          <a
            href="https://www.credly.com/badges/e0a15835-e072-4a25-98c7-174a8943d80c/public_url"
            target="_blank"
            rel="noopener noreferrer"
            className="metal-panel group flex flex-col items-center gap-5 rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.02] sm:p-8"
          >
            <img
              src={credentialBackendEngineer}
              alt="Backend Engineer Learning Path"
              className="h-56 w-56 shrink-0 object-contain"
              loading="lazy"
            />
            <div>
              <p className="font-display text-lg font-bold">Backend Engineer Learning Path</p>
              <p className="mt-1 text-sm text-muted-foreground">Click to verify on Credly</p>
            </div>
          </a>
        </div>
      </section>
    </Reveal>
  );
}
