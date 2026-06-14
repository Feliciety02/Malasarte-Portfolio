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
  "dost-laon",
  "pietyl-management-system",
  "umunity",
  "cosmic-remedies-by-sia",
  "salin-salin",
  "handyman",
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

export type ToolCategory = "frontend" | "backend" | "tools";

export const tools: readonly {
  name: string;
  slug: string;
  color: string;
  category: ToolCategory;
}[] = [
  { name: "HTML", slug: "html5", color: "E34F26", category: "frontend" },
  { name: "CSS", slug: "css3", color: "1572B6", category: "frontend" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E", category: "frontend" },
  { name: "TypeScript", slug: "typescript", color: "3178C6", category: "frontend" },
  { name: "React", slug: "react", color: "61DAFB", category: "frontend" },
  { name: "Next.js", slug: "nextdotjs", color: "000000", category: "frontend" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4", category: "frontend" },
  { name: "Figma", slug: "figma", color: "F24E1E", category: "frontend" },
  { name: "FigJam", slug: "figjam", color: "F24E1E", category: "frontend" },
  { name: "Framer", slug: "framer", color: "0055FF", category: "frontend" },
  { name: "Canva", slug: "canva", color: "00C4CC", category: "frontend" },
  { name: "PHP", slug: "php", color: "777BB4", category: "backend" },
  { name: "Laravel", slug: "laravel", color: "FF2D20", category: "backend" },
  { name: "Java", slug: "java", color: "007396", category: "backend" },
  { name: "Python", slug: "python", color: "3776AB", category: "backend" },
  { name: "MySQL", slug: "mysql", color: "4479A1", category: "backend" },
  { name: "XAMPP", slug: "xampp", color: "FB7A24", category: "backend" },
  { name: "Postman", slug: "postman", color: "FF6C37", category: "backend" },
  { name: "phpMyAdmin", slug: "phpmyadmin", color: "6C78AF", category: "backend" },
  { name: "Jupyter Notebook", slug: "jupyter", color: "F37626", category: "backend" },
  { name: "Google Colab", slug: "googlecolab", color: "F9AB00", category: "backend" },
  { name: "Git", slug: "git", color: "F05032", category: "tools" },
  { name: "GitHub", slug: "github", color: "181717", category: "tools" },
  { name: "VS Code", slug: "vscode", color: "007ACC", category: "tools" },
  { name: "IntelliJ IDEA", slug: "intellijidea", color: "000000", category: "tools" },
  { name: "Microsoft Office", slug: "msoffice", color: "D83B01", category: "tools" },
  { name: "Google Workspace", slug: "googleworkspace", color: "4285F4", category: "tools" },
  { name: "Wireshark", slug: "wireshark", color: "1679A7", category: "tools" },
  { name: "Burp Suite", slug: "burpsuite", color: "FF6633", category: "tools" },
];
