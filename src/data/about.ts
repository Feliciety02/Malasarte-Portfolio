import logoCCECSG from "@/assets/about/org-logos/cce-csg.svg";
import logoDataOwls from "@/assets/about/org-logos/data-owls.svg";
import logoDOSTAgilas from "@/assets/about/org-logos/dost-agilas-association.svg";
import logoJBECP from "@/assets/about/org-logos/JBECP.svg";
import logoStudentAdvisoryCouncil from "@/assets/about/org-logos/student-advisory-council.svg";
import logoUMEnigma from "@/assets/about/org-logos/um-enigma.svg";
import logoUMSDC from "@/assets/about/org-logos/um-student-developers-community-umsdc.svg";
import logoUMindanao from "@/assets/about/org-logos/university-of-mindanao.svg";
import logoNotreDame from "@/assets/about/org-logos/notre-dame-of-esperanza.svg";
import logoGuihing from "@/assets/about/org-logos/guihing-central-elementary-school.svg";
import nstw1 from "@/assets/events/nstw/nstw-1.webp";
import nstw2 from "@/assets/events/nstw/nstw-2.webp";
import nstw3 from "@/assets/events/nstw/nstw-3.webp";
import nstw4 from "@/assets/events/nstw/nstw-4.webp";
import caraga1 from "@/assets/events/caraga/caraga-1.webp";
import caraga2 from "@/assets/events/caraga/caraga-2.webp";
import caraga3 from "@/assets/events/caraga/caraga-3.webp";
import caraga4 from "@/assets/events/caraga/caraga-4.webp";
import govtech1 from "@/assets/events/govtech/govtech-1.webp";
import govtech2 from "@/assets/events/govtech/govtech-2.webp";
import govtech3 from "@/assets/events/govtech/govtech-3.webp";
import govtech4 from "@/assets/events/govtech/govtech-4.webp";
import trichomend1 from "@/assets/events/trichomend/trichomend-1.webp";
import trichomend2 from "@/assets/events/trichomend/trichomend-2.webp";
import trichomend3 from "@/assets/events/trichomend/trichomend-3.webp";
import trichomend4 from "@/assets/events/trichomend/trichomend-4.webp";
import technovation1 from "@/assets/events/technovation-summit/technovation-summit-1.webp";
import technovation2 from "@/assets/events/technovation-summit/technovation-summit-2.webp";
import technovation3 from "@/assets/events/technovation-summit/technovation-summit-3.webp";
import technovation4 from "@/assets/events/technovation-summit/technovation-summit-4.webp";
import sui1 from "@/assets/events/sui/sui-1.webp";
import sui2 from "@/assets/events/sui/sui-2.webp";
import psits from "@/assets/events/psits/PSITS.webp";
import marketingStrategy from "@/assets/events/marketing-excellence/marketing-strategy-excellence-award.webp";
import mostActiveVolunteer from "@/assets/events/most-active-volunteer/most-active-volunteer-award.webp";
import dostOrientation1 from "@/assets/events/dost-sei-orientation/dost-sei-scholarship-orientation-2024-1.webp";
import dostOrientation2 from "@/assets/events/dost-sei-orientation/dost-sei-scholarship-orientation-2.webp";
import aptos from "@/assets/events/aptos-hours/aptos-hours.webp";
import aptosHours2 from "@/assets/events/aptos-hours/aptos-hours-2.webp";
import devfest2024 from "@/assets/events/devfest/devfest-2024.webp";
import umsdcTraining from "@/assets/events/umsdc-training/umsdc-internal-training-basics-of-figma.webp";
import dostCamp1 from "@/assets/events/dost-leadership-camp/dost-student-leadership-camp-1.webp";
import dostCamp2 from "@/assets/events/dost-leadership-camp/dost-student-leadership-camp-2.webp";
import pycon2024 from "@/assets/events/pycon/pycon-2024.webp";
import blockchainCampus from "@/assets/events/davao-blockchain/davao-blockchain-campus-conference.webp";
import buildstation1 from "@/assets/events/buildstation-solana-radar/buildstation-solana-radar-1.webp";
import buildstation2 from "@/assets/events/buildstation-solana-radar/buildstation-solana-radar-2.webp";
import solanaIRL1 from "@/assets/events/solana-irl/solana-irl-1.webp";
import solanaIRL2 from "@/assets/events/solana-irl/solana-irl-2.webp";
import vana1 from "@/assets/events/vana/vana-1.webp";
import vana2 from "@/assets/events/vana/vana-2.webp";
import dostKickstart from "@/assets/events/dost-kickstart/dost-kickstart.webp";
import blooming1 from "@/assets/events/blooming-fridays/blooming-fridays-uiux-workshop-series-1.webp";
import blooming2 from "@/assets/events/blooming-fridays/blooming-fridays-uiux-workshop-series-2.webp";
import designThinking1 from "@/assets/events/design-thinking/design-thinking-1.webp";
import designThinking2 from "@/assets/events/design-thinking/design-thinking-2.webp";

export type TimelineItem = {
  period: string;
  title: string;
  subtitle: string;
  desc?: string;
  logo?: string;
};

export const CONFERENCE_GRADIENTS = [
  "from-primary/20 to-primary/5",
  "from-blue-500/20 to-purple-500/5",
  "from-amber-500/20 to-orange-500/5",
  "from-rose-500/20 to-pink-500/5",
];

export const conferenceImages: (string[] | null)[] = [
  [nstw1, nstw2, nstw3, nstw4],
  [dostCamp1, dostCamp2],
  [dostKickstart],
  [designThinking1, designThinking2],
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

export const volunteerImages: (string[] | null)[] = [
  null,
  [govtech1, govtech2, govtech3, govtech4],
  [caraga1, caraga2, caraga3, caraga4],
  [buildstation1, buildstation2],
  null,
  [pycon2024],
  [blockchainCampus],
  null,
  null,
  [dostOrientation1, dostOrientation2],
];

export const awardImages: (string[] | null)[] = [
  [trichomend1, trichomend2, trichomend3, trichomend4],
  [technovation1, technovation2, technovation3, technovation4],
  [marketingStrategy],
  [mostActiveVolunteer],
  [dostOrientation1, dostOrientation2],
  [psits],
];

export const leadership: TimelineItem[] = [
  {
    period: "2025 – Present",
    title: "President",
    subtitle: "UM Student Developers Community (UMSDC)",
    logo: logoUMSDC,
    desc: "Leading one of the University's premier technology organizations, overseeing community programs, technical initiatives, partnerships, events, and student development activities.",
  },
  {
    period: "2024 – 2025",
    title: "Chief of Marketing and Promotions",
    subtitle: "College of Computing Education Student Government (CCE-CSG)",
    logo: logoCCECSG,
  },
  {
    period: "2024 – 2025",
    title: "Secretary",
    subtitle: "DOST Agilas Association – University of Mindanao",
    logo: logoDOSTAgilas,
  },
  {
    period: "2024 – 2025",
    title: "Computer Science Representative",
    subtitle: "UM Student Developers Community (UMSDC)",
    logo: logoUMSDC,
  },
  {
    period: "2024 – 2025",
    title: "Records Keeper",
    subtitle: "Data Owls – University of Mindanao",
    logo: logoDataOwls,
  },
  {
    period: "2024 – 2025",
    title: "Creatives Committee Member",
    subtitle: "UM Student Developers Community (UMSDC)",
    logo: logoUMSDC,
  },
  {
    period: "2024 – 2025",
    title: "Creatives Committee Member",
    subtitle: "UM Enigma",
    logo: logoUMEnigma,
  },
  {
    period: "2024 – 2025",
    title: "Creatives Committee Member",
    subtitle: "Junior Blockchain Education Consortium of the Philippines (JBECP)",
    logo: logoJBECP,
  },
  {
    period: "2022 – 2023",
    title: "Business Manager",
    subtitle: "Student Advisory Council – Notre Dame of Esperanza",
    logo: logoStudentAdvisoryCouncil,
  },
];

export const education: TimelineItem[] = [
  {
    period: "2023 – Present",
    title: "BS Computer Science",
    subtitle: "University of Mindanao",
    logo: logoUMindanao,
  },
  { period: "A.Y. 2023 – 2024", title: "Dean's Lister – Second Honors", subtitle: "University of Mindanao" },
  { period: "A.Y. 2024 – 2025", title: "Dean's Lister – First Honors", subtitle: "University of Mindanao" },
  { period: "2021 – 2023", title: "Senior High School – STEM Strand", subtitle: "Notre Dame of Esperanza", logo: logoNotreDame },
  { period: "2017 – 2021", title: "Junior High School", subtitle: "Notre Dame of Esperanza", logo: logoNotreDame },
  { period: "2010 – 2016", title: "Special Science Elementary School (SSES)", subtitle: "Guihing Central Elementary School", logo: logoGuihing },
];

export const awards = [
  { title: "DOST STTP Region XI 2025 – 2nd Runner-Up", detail: "Team Trichomend • Davao City" },
  { title: "National Technovation Summit 2025 – Finalist", detail: "Team Hackaton Aces • Cebu City" },
  { title: "Marketing Strategy Excellence Award", detail: "CCE-CSG • 2025" },
  { title: "Most Active Volunteer Award", detail: "UM Student Developers Community • 2025" },
  { title: "DOST-SEI Undergraduate Scholarship", detail: "2023 – Present" },
  { title: "PSITS Word Factory Champion", detail: "2025" },
];

export const volunteer = [
  { event: "Google I/O Extended 2025", role: "Creatives Committee", date: "May 2025" },
  { event: "GovTech Summit 2025", role: "Volunteer", date: "Sep 25, 2025" },
  { event: "Disaster Relief Operations for CARAGA", role: "Volunteer", date: "Oct 25, 2025" },
  { event: "Buildstation: Solana Radar", role: "Registrations Committee", date: "Aug 10, 2024" },
  { event: "Campus DevCon: Tech Nexus", role: "Creatives Committee", date: "Dec 7, 2024" },
  { event: "PyCon Mini Davao", role: "Creatives Committee", date: "Sep 26, 2024" },
  { event: "Davao Blockchain Campus Conference", role: "Creatives Committee", date: "Oct 10, 2024" },
  { event: "Davao Innovation & Startup Championship", role: "Usherettes Team", date: "Sep 30, 2024" },
  { event: "DICT Regional Startup Pitching Competition", role: "Documentary Committee", date: "Sep 22, 2024" },
  { event: "DOST-SEI Scholarship Orientation 2024", role: "Volunteer", date: "2024" },
];

export const conferences = [
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

export const experienceRoles = [
  { year: "2024 - Now", role: "Freelance Designer & VA", place: "Remote" },
  { year: "2022 - 2024", role: "UI/UX & Social Media Graphics Lead", place: "Tech Organization" },
  { year: "2020 - 2022", role: "Junior Designer", place: "Creative Collective" },
];

export const expertiseAreas: Record<string, string[]> = {
  Design: [
    "UI/UX Design", "Graphic Design", "Logo Design", "Branding & Identity",
    "Brand Strategy", "Creative Strategy", "Product Design",
    "Social Media Graphics", "UX Research", "Wireframing", "Prototyping",
  ],
  Development: [
    "Front-End", "Responsive Web", "HTML / CSS", "JavaScript",
    "TypeScript", "React", "Tailwind CSS", "PHP", "MySQL",
  ],
  "Leadership & Content": [
    "Student Leadership", "Public Speaking", "Event Management",
    "Marketing Strategy", "Community Building", "Technical Volunteering",
    "Content Writing / Copywriting",
  ],
};
