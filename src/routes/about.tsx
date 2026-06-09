import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import aboutFeImage from "@/assets/about/about-fe.png";
import credentialCybersecurity from "@/assets/about/it-specialist-cybersecurity.png";
import credentialDatabases from "@/assets/about/it-specialist-databases.png";
import logoCCECSG from "@/assets/about/CCE CSG.svg";
import logoDataOwls from "@/assets/about/Data Owls.svg";
import logoDOSTAgilas from "@/assets/about/DOST Agilas Association.svg";
import logoJBECP from "@/assets/about/JBECP.svg";
import logoStudentAdvisoryCouncil from "@/assets/about/Student Advisory Council.svg";
import logoUMEnigma from "@/assets/about/UM Enigma.svg";
import logoUMSDC from "@/assets/about/UM Student Developers Community (UMSDC).svg";
import logoUMindanao from "@/assets/about/University of Mindanao.svg";
import logoNotreDame from "@/assets/about/Notre Dame of Esperanza.svg";
import logoGuihing from "@/assets/about/Guihing Central Elementary School.svg";
import nstw1 from "@/assets/Events/nstw 1.jpg";
import nstw2 from "@/assets/Events/nstw 2.jpg";
import nstw3 from "@/assets/Events/nstw 3.jpg";
import nstw4 from "@/assets/Events/nstw 4.jpg";
import caraga1 from "@/assets/Events/caraga 1.jpg";
import caraga2 from "@/assets/Events/caraga 2.jpg";
import caraga3 from "@/assets/Events/caraga 3.jpg";
import caraga4 from "@/assets/Events/caraga 4.jpg";
import govtech1 from "@/assets/Events/govtech 1.jpg";
import govtech2 from "@/assets/Events/govtech 2.jpg";
import govtech3 from "@/assets/Events/govtech 3.jpg";
import govtech4 from "@/assets/Events/govtech 4.jpg";
import trichomend1 from "@/assets/Events/trichomend 1.jpg";
import trichomend2 from "@/assets/Events/trichomend 2.jpg";
import trichomend3 from "@/assets/Events/trichomend 3.jpg";
import trichomend4 from "@/assets/Events/trichomend 4.jpg";
import technovation1 from "@/assets/Events/technovation summit 1.jpg";
import technovation2 from "@/assets/Events/technovation summit 2.jpg";
import technovation3 from "@/assets/Events/technovation summit 3.jpg";
import technovation4 from "@/assets/Events/technovation summit 4.jpg";
import sui1 from "@/assets/Events/sui 1.jpg";
import sui2 from "@/assets/Events/sui 2.jpg";
import psits from "@/assets/Events/PSITS.jpg";
import marketingStrategy from "@/assets/Events/Marketing Strategy Excellence Award.jpg";
import mostActiveVolunteer from "@/assets/Events/Most Active Volunteer Award.jpg";
import aptos from "@/assets/Events/aptos hours.jpg";
import aptosHours2 from "@/assets/Events/aptos hours 2.jpg";
import devfest2024 from "@/assets/Events/devfest 2024.jpg";
import umsdcTraining from "@/assets/Events/UMSDC Internal Training – Basics of Figma.jpg";
import dostCamp1 from "@/assets/Events/DOST Student Leadership Camp 1.jpg";
import dostCamp2 from "@/assets/Events/DOST Student Leadership Camp 2.jpg";
import pycon2024 from "@/assets/Events/pycon 2024.jpg";
import blockchainCampus from "@/assets/Events/Davao Blockchain Campus Conference.jpg";
import buildstation1 from "@/assets/Events/Buildstation solana radar 1.jpg";
import buildstation2 from "@/assets/Events/Buildstation solana radar 2.jpg";
import solanaIRL1 from "@/assets/Events/Solana IRL 1.jpg";
import solanaIRL2 from "@/assets/Events/Solana IRL 2.jpg";
import vana1 from "@/assets/Events/vana 1.jpg";
import vana2 from "@/assets/Events/vana 2.jpg";
import dostKickstart from "@/assets/Events/DOST KickStart.jpg";
import blooming1 from "@/assets/Events/Blooming Fridays UIUX Workshop Series 1.jpg";
import blooming2 from "@/assets/Events/Blooming Fridays UIUX Workshop Series 2.jpg";
import designThinking1 from "@/assets/Events/design thinking 1.jpg";
import designThinking2 from "@/assets/Events/design thinking 2.jpg";
import designThinking3 from "@/assets/Events/design thinking 3.jpg";
import designThinking4 from "@/assets/Events/design thinking 4.jpg";
import { GitHubContributions } from "@/components/site/GitHubContributions";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MetallicPage } from "@/components/site/MetallicPage";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Fe Anne Malasarte" },
      {
        name: "description",
        content:
          "Meet Fe Anne - a creative designer with roots in tech orgs, branding, and storytelling.",
      },
      { property: "og:title", content: "Fe Anne Malasarte" },
      {
        property: "og:description",
        content: "A short, honest introduction to a designer who loves quiet details.",
      },
    ],
  }),
  component: About,
});

function TimelineSection({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative border-l border-white/10">
      {items.map((item, i) => (
        <div key={i} className="relative pl-8 pb-8 last:pb-0">
          <div className="absolute left-0 top-[5px] -translate-x-1/2 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background" />
          <div className="flex gap-4">
            {item.logo && (
              <div className="mt-1 flex shrink-0 items-start">
                <img src={item.logo} alt="" className="h-20 w-20 object-contain lg:h-28 lg:w-28" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <span className="font-mono text-sm uppercase tracking-widest text-primary">{item.period}</span>
              <h3 className="mt-1 font-display text-lg font-bold">{item.title}</ h3>
              <p className="text-base text-muted-foreground">{item.subtitle}</p>
              {item.desc && <p className="mt-2 text-base leading-relaxed text-muted-foreground/80">{item.desc}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ShowMore({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleContent>{children}</CollapsibleContent>
      <CollapsibleTrigger className="group mt-4 inline-flex items-center gap-1.5 text-sm uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-colors">
        {open ? "Show less" : label}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </CollapsibleTrigger>
    </Collapsible>
  );
}

const CONFERENCE_GRADIENTS = [
  "from-primary/20 to-primary/5",
  "from-blue-500/20 to-purple-500/5",
  "from-amber-500/20 to-orange-500/5",
  "from-rose-500/20 to-pink-500/5",
];

const conferenceImages: (string[] | null)[] = [
  [nstw1, nstw2, nstw3, nstw4],
  [dostCamp1, dostCamp2],
  [dostKickstart],
  [designThinking1, designThinking2, designThinking3, designThinking4],
  [sui1, sui2],
  null,
  null,
  null,
  [solanaIRL1, solanaIRL2],
  null,
  null,
  [blooming1, blooming2],
  null,
  null,
  [vana1, vana2],
  [devfest2024],
  [aptos, aptosHours2],
];

const volunteerImages: (string[] | null)[] = [
  null,
  [govtech1, govtech2, govtech3, govtech4],
  [caraga1, caraga2, caraga3, caraga4],
  [buildstation1, buildstation2],
  null,
  [pycon2024],
  [blockchainCampus],
  null,
  null,
];

const awardImages: (string[] | null)[] = [
  null,
  [marketingStrategy],
  [mostActiveVolunteer],
  [technovation1, technovation2, technovation3, technovation4],
  [trichomend1, trichomend2, trichomend3, trichomend4],
  null,
  [psits],
];

function AwardsGallery({ images }: { images: string[] | null }) {
  if (images && images.length === 1) {
    return (
      <div className="metal-panel rounded-lg overflow-hidden aspect-square">
        <img src={images[0]} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  if (images) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {images.map((src, i) => (
          <div key={i} className="aspect-square rounded-lg metal-panel overflow-hidden">
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {CONFERENCE_GRADIENTS.map((g, i) => (
        <div
          key={i}
          className={`aspect-square rounded-lg bg-gradient-to-br ${g} metal-panel flex items-center justify-center`}
        >
          <span className="text-[10px] font-medium text-muted-foreground/40">
            {(i + 1).toString().padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>
  );
}

function ConferenceGallery({ images, conferenceIndex }: { images: string[] | null; conferenceIndex: number }) {
  if (images && images.length === 1) {
    return (
      <div className="metal-panel rounded-lg overflow-hidden aspect-square">
        <img src={images[0]} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  if (images && images.length === 2) {
    return (
      <div className="flex flex-col gap-2 aspect-square">
        {images.map((src, i) => (
          <div key={i} className="flex-1 metal-panel overflow-hidden rounded-lg">
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    );
  }

  if (images) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {images.map((src, i) => (
          <div key={i} className="aspect-square rounded-lg metal-panel overflow-hidden">
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {CONFERENCE_GRADIENTS.map((g, i) => (
        <div
          key={i}
          className={`aspect-square rounded-lg bg-gradient-to-br ${g} metal-panel flex items-center justify-center`}
        >
          <span className="text-[10px] font-medium text-muted-foreground/40">
            {(conferenceIndex * 4 + i + 1).toString().padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>
  );
}

type TimelineItem = {
  period: string;
  title: string;
  subtitle: string;
  desc?: string;
  logo?: string;
};

function About() {
  const [selectedConference, setSelectedConference] = useState(0);
  const [selectedAward, setSelectedAward] = useState(0);
  const [selectedVolunteer, setSelectedVolunteer] = useState(0);

  const leadership: TimelineItem[] = [
    { period: "2025 – Present", title: "President", subtitle: "UM Student Developers Community (UMSDC)", logo: logoUMSDC, desc: "Leading one of the University's premier technology organizations, overseeing community programs, technical initiatives, partnerships, events, and student development activities." },
    { period: "2024 – 2025", title: "Chief of Marketing and Promotions", subtitle: "College of Computing Education Student Government (CCE-CSG)", logo: logoCCECSG },
    { period: "2024 – 2025", title: "Secretary", subtitle: "DOST Agilas Association – University of Mindanao", logo: logoDOSTAgilas },
    { period: "2024 – 2025", title: "Computer Science Representative", subtitle: "UM Student Developers Community (UMSDC)", logo: logoUMSDC },
    { period: "2024 – 2025", title: "Records Keeper", subtitle: "Data Owls – University of Mindanao", logo: logoDataOwls },
    { period: "2024 – 2025", title: "Creatives Committee Member", subtitle: "UM Student Developers Community (UMSDC)", logo: logoUMSDC },
    { period: "2024 – 2025", title: "Creatives Committee Member", subtitle: "UM Enigma", logo: logoUMEnigma },
    { period: "2024 – 2025", title: "Creatives Committee Member", subtitle: "Junior Blockchain Education Consortium of the Philippines (JBECP)", logo: logoJBECP },
    { period: "2022 – 2023", title: "Business Manager", subtitle: "Student Advisory Council – Notre Dame of Esperanza", logo: logoStudentAdvisoryCouncil },
  ];

  const education: TimelineItem[] = [
    { period: "2023 – Present", title: "BS Computer Science", subtitle: "University of Mindanao", logo: logoUMindanao },
    { period: "A.Y. 2023 – 2024", title: "Dean's Lister – Second Honors", subtitle: "University of Mindanao" },
    { period: "A.Y. 2024 – 2025", title: "Dean's Lister – First Honors", subtitle: "University of Mindanao" },
    { period: "2021 – 2023", title: "Senior High School – STEM Strand", subtitle: "Notre Dame of Esperanza", logo: logoNotreDame },
    { period: "2017 – 2021", title: "Junior High School", subtitle: "Notre Dame of Esperanza", logo: logoNotreDame },
    { period: "2010 – 2016", title: "Special Science Elementary School (SSES)", subtitle: "Guihing Central Elementary School", logo: logoGuihing },
  ];

  const awards = [
    { title: "DOST-SEI Undergraduate Scholarship", detail: "2023 – Present" },
    { title: "Marketing Strategy Excellence Award", detail: "CCE-CSG • 2025" },
    { title: "Most Active Volunteer Award", detail: "UM Student Developers Community • 2025" },
    { title: "National Technovation Summit 2025 – Finalist", detail: "Team Hackaton Aces • Cebu City" },
    { title: "DOST STTP Region XI 2025 – 2nd Runner-Up", detail: "Team Trichomend • Davao City" },
    { title: "Excellence in Science and Technology", detail: "Notre Dame of Esperanza • S.Y. 2022 – 2023" },
    { title: "PSITS Word Factory Champion", detail: "2025" },
  ];

  const volunteer = [
    { event: "Google I/O Extended 2025", role: "Creatives Committee", date: "May 2025" },
    { event: "GovTech Summit 2025", role: "Volunteer", date: "Sep 25, 2025" },
    { event: "Disaster Relief Operations for CARAGA", role: "Volunteer", date: "Oct 25, 2025" },
    { event: "Buildstation: Solana Radar", role: "Registrations Committee", date: "Aug 10, 2024" },
    { event: "Campus DevCon: Tech Nexus", role: "Creatives Committee", date: "Dec 7, 2024" },
    { event: "PyCon Mini Davao", role: "Creatives Committee", date: "Sep 26, 2024" },
    { event: "Davao Blockchain Campus Conference", role: "Creatives Committee", date: "Oct 10, 2024" },
    { event: "Davao Innovation & Startup Championship", role: "Usherettes Team", date: "Sep 30, 2024" },
    { event: "DICT Regional Startup Pitching Competition", role: "Documentary Committee", date: "Sep 22, 2024" },
  ];

  const conferences = [
    { event: "National Science and Technology Week", org: "NSTW 2025", date: "Nov 19–22, 2025", location: "Ilocos Norte" },
    { event: "DOST Student Leadership Camp", date: "Jul 2–6, 2025" },
    { event: "DOST KickSTART", date: "Jul 6, 2025" },
    { event: "Design Thinking Workshop", date: "2025" },
    { event: "Sui Meetup Davao", role: "Community Participant", date: "Jul 26, 2025" },
    { event: "AWS: A Deep Dive Into Machine Learning Engineering", date: "Jul 26, 2024" },
    { event: "DurianPy: Getting Started in Data Engineering with Python", date: "Jul 27, 2024" },
    { event: "Hedera Davao Meetup", date: "Aug 10, 2024" },
    { event: "Solana Ecosystem Call IRL", date: "Aug 10, 2024 / Nov 9, 2024" },
    { event: "Davao Startup Week Volunteer Convening", date: "Aug 29, 2024" },
    { event: "PIT Davao: Level Up Your Prototyping", date: "Sep 7, 2024" },
    { event: "Blooming Fridays UI/UX Workshop Series", date: "Sep–Oct 2024" },
    { event: "Lean Coffee Meetup Davao: NoCode PH 2024", date: "Sep 18, 2024" },
    { event: "Founder Forum: The Blockchain Heroes", date: "Sep 21, 2024" },
    { event: "Vana Community Meetup", date: "Oct 8, 2024" },
    { event: "Google DevFest Davao", date: "Nov 23, 2024" },
    { event: "Aptos Hours: Introducing Aptos and Hiraya Network", date: "Apr 27, 2025" },
  ];



  return (
    <MetallicPage variant="about" className="px-6 pb-20">
      <section className="mx-auto max-w-6xl pt-12 md:pt-20">
        <div className="grid gap-14 md:grid-cols-5 md:items-end">
          <Reveal className="md:col-span-2">
            <div className="metal-panel relative aspect-[4/5] overflow-hidden">
              <img
                src={aboutFeImage}
                alt="Fe Anne Malasarte portrait"
                className="satin-photo h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/42 via-transparent to-white/8" />
              <div className="absolute bottom-5 left-5 right-5 border-t border-white/12 pt-4">
                <div className="metal-microcopy">Designer / Storyteller</div>
                <div className="mt-1 font-display text-lg font-semibold">Fe Anne Malasarte</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-3">
            <span className="metal-kicker">About</span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              {accentLastWord("Who is Fe Anne?")}
            </h1>
            <div className="mt-7 space-y-5 text-base leading-7 text-muted-foreground">
              <p>
                I&apos;m Fe Anne L. Malasarte, a DOST-SEI Scholar and Computer Science student at the
                University of Mindanao. I specialize in UI/UX Design, Web Development, Branding, and
                Creative Strategy, combining technical expertise with design thinking to build impactful
                digital experiences.
              </p>
              <p>
                Alongside my academic journey, I actively contribute to technology communities, student
                organizations, and innovation initiatives across Mindanao through leadership, volunteer
                work, and community engagement.
              </p>
            </div>

            <div className="mt-10 grid border-y border-white/10 py-6 sm:grid-cols-3">
              {[
                { k: "5+", v: "Years designing" },
                { k: "40+", v: "Projects shipped" },
                { k: "10+", v: "Happy clients" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="py-4 sm:border-r sm:border-white/10 sm:px-6 sm:first:pl-0 sm:last:border-r-0"
                >
                  <div className="font-display text-3xl font-bold text-gradient">{s.k}</div>
                  <div className="mt-2 text-sm uppercase tracking-[0.16em] text-muted-foreground">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/works"
                className="metal-cta inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                See my work <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="metal-ghost inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold hover:bg-white/10"
              >
                Say hi
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="metal-kicker">Experience</span>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
                {accentLastWord("Recent roles")}
              </h2>
            </div>
            <p className="max-w-md text-base leading-6 text-muted-foreground">
              A concise timeline of the roles and environments that shaped the portfolio work.
            </p>
          </div>
          <div className="mt-10 border-t border-white/10">
            {[
              { year: "2024 - Now", role: "Freelance Designer & VA", place: "Remote" },
              { year: "2022 - 2024", role: "UI/UX & Social Media Graphics Lead", place: "Tech Organization" },
              { year: "2020 - 2022", role: "Junior Designer", place: "Creative Collective" },
            ].map((e) => (
              <div
                key={e.role}
                className="grid gap-3 border-b border-white/10 py-6 md:grid-cols-[10rem_minmax(0,1fr)_12rem] md:items-center"
              >
                <span className="font-mono text-sm uppercase tracking-[0.16em] text-primary">{e.year}</span>
                <div className="font-display text-xl font-semibold">{e.role}</div>
                <div className="text-base text-muted-foreground md:text-right">{e.place}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <SectionHeader
            eyebrow="Leadership"
            title="Organizational Experience"
            description="Roles that shaped my leadership, collaboration, and community-building skills."
          />
          <div className="mt-10">
            <TimelineSection items={leadership} />
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <SectionHeader
            eyebrow="Education"
            title="Academic Background"
            description="A journey from special science education to a degree in computer science."
          />
          <div className="mt-10">
            <TimelineSection items={education} />
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <SectionHeader
            eyebrow="Expertise"
            title="Areas of Expertise"
            description="The disciplines and tools I work with daily."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">Design</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {["UI/UX Design", "Graphic Design", "Logo Design", "Branding & Identity", "Brand Strategy", "Creative Strategy", "Product Design", "Social Media Graphics", "UX Research", "Wireframing", "Prototyping"].map((s) => (
                  <span key={s} className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">Development</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Front-End", "Responsive Web", "HTML / CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "PHP", "MySQL"].map((s) => (
                  <span key={s} className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">Leadership & Content</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Student Leadership", "Public Speaking", "Event Management", "Marketing Strategy", "Community Building", "Technical Volunteering", "Content Writing / Copywriting"].map((s) => (
                  <span key={s} className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <SectionHeader
            eyebrow="Recognition"
            title="Awards & Honors"
            description="Academic, leadership, and competitive achievements."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 items-start">
            <div className="aspect-[1/1] overflow-y-auto space-y-3 pr-2">
              {awards.map((a, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedAward(i)}
                  className={`w-full text-left metal-panel rounded-xl p-4 transition-all duration-200 ${
                    selectedAward === i ? "ring-2 ring-primary" : "hover:bg-white/5"
                  }`}
                >
                  <p className="font-display text-sm font-bold">{a.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{a.detail}</p>
                </button>
              ))}
            </div>
            <AwardsGallery images={awardImages[selectedAward]} />
          </div>
        </Reveal>

        <Reveal className="mt-20">
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
              <img src={credentialDatabases} alt="IT Specialist – Databases" className="h-56 w-56 shrink-0" loading="lazy" />
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
              <img src={credentialCybersecurity} alt="IT Specialist – Cybersecurity" className="h-56 w-56 shrink-0" loading="lazy" />
              <div>
                <p className="font-display text-base font-bold">IT Specialist – Cybersecurity</p>
                <p className="mt-1 text-sm text-muted-foreground">Click to verify on Credly</p>
              </div>
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <SectionHeader
            eyebrow="Speaking"
            title="Speaking Engagements"
            description="Sharing knowledge through talks and workshops."
          />
          <div className="metal-panel mt-10 rounded-xl p-6 sm:p-8 flex gap-6 items-start">
            <img src={umsdcTraining} alt="" className="h-48 w-48 shrink-0 rounded-lg object-cover metal-panel" />
            <div>
              <span className="font-mono text-sm uppercase tracking-widest text-primary">January 24, 2025</span>
              <h3 className="mt-2 font-display text-lg font-bold">UMSDC Internal Training – Basics of Figma</h3>
              <p className="mt-1 text-base font-medium text-primary">Speaker</p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Delivered a training session covering UI/UX fundamentals, design thinking, wireframing, prototyping, and Figma workflows.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <SectionHeader
            eyebrow="Service"
            title="Volunteer Experience"
            description="Contributing time and skills to tech events, communities, and meaningful causes."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 items-start">
            <div className="aspect-[1/1] overflow-y-auto space-y-3 pr-2">
              {volunteer.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedVolunteer(i)}
                  className={`w-full text-left metal-panel rounded-xl p-4 transition-all duration-200 ${
                    selectedVolunteer === i ? "ring-2 ring-primary" : "hover:bg-white/5"
                  }`}
                >
                  <span className="font-mono text-sm uppercase tracking-widest text-primary">{v.date}</span>
                  <h3 className="mt-1 font-display text-base font-bold">{v.event}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{v.role}</p>
                </button>
              ))}
            </div>
            <ConferenceGallery images={volunteerImages[selectedVolunteer]} conferenceIndex={selectedVolunteer} />
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <SectionHeader
            eyebrow="Engagement"
            title="Conferences, Trainings & Community"
            description="Continuous learning through workshops, meetups, and national programs."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 items-start">
            <div className="aspect-[1/1] overflow-y-auto space-y-3 pr-2">
              {conferences.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedConference(i)}
                  className={`w-full text-left metal-panel rounded-xl p-4 transition-all duration-200 ${
                    selectedConference === i ? "ring-2 ring-primary" : "hover:bg-white/5"
                  }`}
                >
                  <span className="font-mono text-sm uppercase tracking-widest text-primary">
                    {c.date}{c.location ? ` • ${c.location}` : ""}
                  </span>
                  <h3 className="mt-1 font-display text-base font-bold">{c.event}</h3>
                  {c.org && <p className="mt-0.5 text-sm text-muted-foreground">{c.org}</p>}
                </button>
              ))}
            </div>
            <ConferenceGallery images={conferenceImages[selectedConference]} conferenceIndex={selectedConference} />
          </div>
        </Reveal>

        <Reveal className="mt-20 pb-10">
          <span className="metal-kicker">Code Activity</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("GitHub signal")}
          </h2>
          <div className="mt-8">
            <GitHubContributions username="Feliciety02" />
          </div>
        </Reveal>
      </section>
    </MetallicPage>
  );
}
