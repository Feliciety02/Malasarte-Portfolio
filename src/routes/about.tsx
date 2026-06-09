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
              <h3 className="mt-1 font-display text-lg font-bold">{item.title}</h3>
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

type TimelineItem = {
  period: string;
  title: string;
  subtitle: string;
  desc?: string;
  logo?: string;
};

function About() {
  const [awardsOpen, setAwardsOpen] = useState(false);
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [conferencesOpen, setConferencesOpen] = useState(false);

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
    { period: "2023 – Present", title: "BS Computer Science", subtitle: "University of Mindanao", logo: logoUMindanao, desc: "Dean's Lister • DOST-SEI Undergraduate Scholar" },
    { period: "2021 – 2023", title: "Senior High School – STEM Strand", subtitle: "Notre Dame of Esperanza", logo: logoNotreDame, desc: "With High Honors • Excellence in Science and Technology Award" },
    { period: "2017 – 2021", title: "Junior High School", subtitle: "Notre Dame of Esperanza", logo: logoNotreDame, desc: "With Honors" },
    { period: "2010 – 2016", title: "Special Science Elementary School (SSES)", subtitle: "Guihing Central Elementary School", logo: logoGuihing },
  ];

  const awards = [
    { title: "DOST-SEI Undergraduate Scholarship", detail: "2023 – Present" },
    { title: "Dean's Lister – Second Honors", detail: "A.Y. 2023 – 2024" },
    { title: "Dean's Lister – Second Honors", detail: "A.Y. 2024 – 2025" },
    { title: "Marketing Strategy Excellence Award", detail: "CCE-CSG • 2025" },
    { title: "Most Active Volunteer Award", detail: "UM Student Developers Community • 2025" },
    { title: "National Technovation Summit 2025 – Finalist", detail: "Team Hackaton Aces • Cebu City" },
    { title: "DOST STTP Region XI 2025 – 2nd Runner-Up", detail: "Team Trichomend • Davao City" },
    { title: "Excellence in Science and Technology", detail: "Notre Dame of Esperanza • S.Y. 2022 – 2023" },
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

  const visibleVolunteer = volunteer.slice(0, 3);
  const hiddenVolunteer = volunteer.slice(3);
  const visibleConferences = conferences.slice(0, 4);
  const hiddenConferences = conferences.slice(4);
  const visibleAwards = awards.slice(0, 4);
  const hiddenAwards = awards.slice(4);

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
                {["UI/UX Design", "Design Systems", "Branding & Identity", "Graphic Design", "Figma"].map((s) => (
                  <span key={s} className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">Development</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Front-End", "Responsive Web", "HTML / CSS", "JavaScript", "PHP", "MySQL"].map((s) => (
                  <span key={s} className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">Leadership</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Student Leadership", "Public Speaking", "Event Management", "Marketing Strategy", "Community Building", "Technical Volunteering"].map((s) => (
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
          <ul className="mt-10 space-y-3">
            {visibleAwards.map((a) => (
              <li key={a.title} className="flex items-start gap-3 metal-panel rounded-xl p-5">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="font-display text-sm font-bold">{a.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{a.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <Collapsible open={awardsOpen} onOpenChange={setAwardsOpen}>
            <CollapsibleContent>
              <ul className="mt-3 space-y-3">
                {hiddenAwards.map((a) => (
                  <li key={a.title} className="flex items-start gap-3 metal-panel rounded-xl p-5">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <div>
                      <p className="font-display text-sm font-bold">{a.title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{a.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
            <CollapsibleTrigger className="group mt-4 inline-flex items-center gap-1.5 text-sm uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-colors">
              {awardsOpen ? "Show less" : `Show ${hiddenAwards.length} more`}
              <ChevronDown size={14} className={cn("transition-transform", awardsOpen && "rotate-180")} />
            </CollapsibleTrigger>
          </Collapsible>
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
          <div className="metal-panel mt-10 rounded-xl p-6 sm:p-8">
            <span className="font-mono text-sm uppercase tracking-widest text-primary">January 24, 2025</span>
            <h3 className="mt-2 font-display text-lg font-bold">UMSDC Internal Training – Basics of Figma</h3>
            <p className="mt-1 text-base font-medium text-primary">Speaker</p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Delivered a training session covering UI/UX fundamentals, design thinking, wireframing, prototyping, and Figma workflows.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <SectionHeader
            eyebrow="Service"
            title="Volunteer Experience"
            description="Contributing time and skills to tech events, communities, and meaningful causes."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {visibleVolunteer.map((v) => (
              <div key={v.event} className="metal-panel rounded-xl p-5">
                <span className="font-mono text-sm uppercase tracking-widest text-primary">{v.date}</span>
                <h3 className="mt-1.5 font-display text-base font-bold">{v.event}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{v.role}</p>
              </div>
            ))}
          </div>
          <Collapsible open={volunteerOpen} onOpenChange={setVolunteerOpen}>
            <CollapsibleContent>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {hiddenVolunteer.map((v) => (
                  <div key={v.event} className="metal-panel rounded-xl p-5">
                    <span className="font-mono text-sm uppercase tracking-widest text-primary">{v.date}</span>
                    <h3 className="mt-1.5 font-display text-base font-bold">{v.event}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{v.role}</p>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
            <CollapsibleTrigger className="group mt-4 inline-flex items-center gap-1.5 text-sm uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-colors">
              {volunteerOpen ? "Show less" : `Show ${hiddenVolunteer.length} more`}
              <ChevronDown size={14} className={cn("transition-transform", volunteerOpen && "rotate-180")} />
            </CollapsibleTrigger>
          </Collapsible>
        </Reveal>

        <Reveal className="mt-20">
          <SectionHeader
            eyebrow="Engagement"
            title="Conferences, Trainings & Community"
            description="Continuous learning through workshops, meetups, and national programs."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {visibleConferences.map((c) => (
              <div key={c.event} className="metal-panel rounded-xl p-5">
                <span className="font-mono text-sm uppercase tracking-widest text-primary">
                  {c.date}{c.location ? ` • ${c.location}` : ""}
                </span>
                <h3 className="mt-1.5 font-display text-base font-bold">{c.event}</h3>
                {c.org && <p className="mt-0.5 text-sm text-muted-foreground">{c.org}</p>}
              </div>
            ))}
          </div>
          <Collapsible open={conferencesOpen} onOpenChange={setConferencesOpen}>
            <CollapsibleContent>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {hiddenConferences.map((c) => (
                  <div key={c.event} className="metal-panel rounded-xl p-5">
                    <span className="font-mono text-sm uppercase tracking-widest text-primary">
                      {c.date}{c.location ? ` • ${c.location}` : ""}
                    </span>
                    <h3 className="mt-1.5 font-display text-base font-bold">{c.event}</h3>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
            <CollapsibleTrigger className="group mt-4 inline-flex items-center gap-1.5 text-sm uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-colors">
              {conferencesOpen ? "Show less" : `Show ${hiddenConferences.length} more`}
              <ChevronDown size={14} className={cn("transition-transform", conferencesOpen && "rotate-180")} />
            </CollapsibleTrigger>
          </Collapsible>
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
