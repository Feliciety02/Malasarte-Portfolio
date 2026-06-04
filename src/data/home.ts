import {
  FileText,
  Globe,
  Layers,
  Lightbulb,
  Megaphone,
  PenTool,
  Pencil,
  Rocket,
  Search,
} from "lucide-react";

export const featuredSlugs = [
  "adoptify",
  "odara-management-group",
  "cosmic-remedies-by-sia",
  "umsdc-publication-materials-and-assets",
] as const;

export const marqueeItems = [
  "UI/UX Design",
  "Branding",
  "Visual Storytelling",
  "Social Media Graphics",
  "Creative Assets",
  "Web Development",
];

export const skillHighlights = [
  { name: "UI/UX Design", level: 95 },
  { name: "Branding", level: 88 },
  { name: "Social Media Graphics", level: 90 },
  { name: "Web Development", level: 86 },
];

export const experienceStats = [
  { value: "5+", label: "Years designing" },
  { value: "40+", label: "Projects shipped" },
  { value: "10+", label: "Clients supported" },
] as const;

export const experienceTimeline = [
  { year: "2024 - Now", role: "Freelance Designer & VA", place: "Remote" },
  { year: "2022 - 2024", role: "UI/UX & Social Media Graphics Lead", place: "Tech Organization" },
  { year: "2020 - 2022", role: "Junior Designer", place: "Creative Collective" },
] as const;

export const servicePreviews = [
  {
    icon: Layers,
    title: "UI/UX Design",
    desc: "Mobile and web product design from research to handoff.",
  },
  { icon: PenTool, title: "Branding", desc: "Identity systems with personality and clarity." },
  {
    icon: Megaphone,
    title: "Social Media Graphics",
    desc: "Campaign posts, pubmats, and creative asset systems.",
  },
  {
    icon: Globe,
    title: "Web Development",
    desc: "Responsive web experiences translated from design into polished builds.",
  },
  { icon: FileText, title: "Content & VA", desc: "Captions, blogs, and creator support." },
] as const;

export const processSteps = [
  { icon: Search, title: "Research" },
  { icon: Lightbulb, title: "Concept" },
  { icon: Pencil, title: "Design" },
  { icon: Rocket, title: "Deliver" },
] as const;

export const testimonials = [
  {
    quote: "Fe Anne brought clarity and warmth to our product - every screen feels intentional.",
    name: "Maya R.",
    role: "Founder · Lumen Financial",
  },
  {
    quote: "A rare designer who can hold brand strategy and pixel-level craft in the same hand.",
    name: "Jordan K.",
    role: "Creative Director · Folio Studio",
  },
  {
    quote: "Our org week campaign reached more people than any year prior. The visuals just sang.",
    name: "Sam T.",
    role: "Lead · Tech Org Council",
  },
] as const;

export const tools = [
  { name: "Figma", slug: "figma", color: "F24E1E" },
  { name: "FigJam", slug: "figjam", color: "F24E1E" },
  { name: "Framer", slug: "framer", color: "0055FF" },
  { name: "Webflow", slug: "webflow", color: "146EF5" },
  { name: "Miro", slug: "miro", color: "FFD02F" },
  { name: "Canva", slug: "canva", color: "00C4CC" },
  { name: "VS Code", slug: "vscode", color: "007ACC" },
  { name: "Android Studio", slug: "androidstudio", color: "3DDC84" },
  { name: "XAMPP", slug: "xampp", color: "FB7A24" },
  { name: "Git", slug: "git", color: "F05032" },
  { name: "GitHub", slug: "github", color: "181717" },
  { name: "GitHub Desktop", slug: "githubdesktop", color: "181717" },
  { name: "Postman", slug: "postman", color: "FF6C37" },
  { name: "MySQL Workbench", slug: "mysql", color: "4479A1" },
  { name: "phpMyAdmin", slug: "phpmyadmin", color: "6C78AF" },
  { name: "Jupyter", slug: "jupyter", color: "F37626" },
  { name: "Google Colab", slug: "googlecolab", color: "F9AB00" },
  { name: "Microsoft Office", slug: "msoffice", color: "D83B01" },
  { name: "Google Workspace", slug: "googleworkspace", color: "4285F4" },
  { name: "Wireshark", slug: "wireshark", color: "1679A7" },
  { name: "Burp Suite", slug: "burpsuite", color: "FF6633" },
] as const;
