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
import caraga1 from "@/assets/Events/caraga 1.jpg";
import caraga2 from "@/assets/Events/caraga 2.jpg";
import govtech1 from "@/assets/Events/govtech 1.jpg";
import govtech2 from "@/assets/Events/govtech 2.jpg";
import trichomend1 from "@/assets/Events/trichomend 1.jpg";
import trichomend2 from "@/assets/Events/trichomend 2.jpg";
import technovation1 from "@/assets/Events/technovation summit 1.jpg";
import technovation2 from "@/assets/Events/technovation summit 2.jpg";
import sui1 from "@/assets/Events/sui 1.jpg";
import sui2 from "@/assets/Events/sui 2.jpg";
import psits from "@/assets/Events/PSITS.jpg";
import marketingStrategy from "@/assets/Events/Marketing Strategy Excellence Award.jpg";
import mostActiveVolunteer from "@/assets/Events/Most Active Volunteer Award.jpg";
import dostOrientation1 from "@/assets/Events/DOST-SEI Scholarship Orientation 2024 1.jpg";
import dostOrientation2 from "@/assets/Events/DOST-SEI Scholarship Orientation 2.jpg";
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
  [nstw1, nstw2],
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
  [govtech1, govtech2],
  [caraga1, caraga2],
  [buildstation1, buildstation2],
  null,
  [pycon2024],
  [blockchainCampus],
  null,
  null,
  [dostOrientation1, dostOrientation2],
];

export const awardImages: (string[] | null)[] = [
  [trichomend1, trichomend2],
  [technovation1, technovation2],
  [marketingStrategy],
  [mostActiveVolunteer],
  null,
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
