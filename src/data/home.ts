import { Globe, Layers, Lightbulb, Megaphone, Pencil, Rocket, Search } from "lucide-react";

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
  "Web Development",
  "Social Media Graphics",
  "Brand Identity",
  "Visual Storytelling",
  "Creative Direction",
];

export const skillHighlights = [
  { name: "UI/UX Design", level: 95 },
  { name: "Web Development", level: 88 },
  { name: "Social Media Graphics", level: 90 },
  { name: "Brand Identity", level: 86 },
];

export const experienceStats = [
  { value: "5+", label: "Years of experience" },
  { value: "40+", label: "Projects delivered" },
  { value: "10+", label: "Clients served" },
] as const;

export const experienceTimeline = [
  { year: "2024 — Present", role: "Freelance Designer & Developer", place: "Remote" },
  {
    year: "2022 — 2024",
    role: "UI/UX & Social Media Graphics Lead",
    place: "Technology Organization",
  },
  { year: "2020 — 2022", role: "Junior Designer", place: "Creative Agency" },
] as const;

export const servicePreviews = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "Full-stack development of responsive, performant web applications using modern frameworks and industry best practices — from system architecture through deployment and optimization.",
    stars: 5 as const,
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    desc: "Comprehensive user experience design encompassing research, information architecture, wireframing, high-fidelity prototyping, and usability testing to deliver intuitive digital products.",
    stars: 5 as const,
  },
  {
    icon: Megaphone,
    title: "Social Media Graphics",
    desc: "Strategic visual content tailored for multi-platform campaigns, brand storytelling, and audience engagement across social media channels.",
    stars: 5 as const,
  },
] as const;

export const processSteps = [
  { icon: Search, title: "Research" },
  { icon: Lightbulb, title: "Concept" },
  { icon: Pencil, title: "Design" },
  { icon: Rocket, title: "Deliver" },
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
  { name: "Vue.js", slug: "vuedotjs", color: "4FC08D", category: "frontend" },
  { name: "GSAP", slug: "gsap", color: "88CE02", category: "frontend" },
  { name: "Three.js", slug: "threedotjs", color: "000000", category: "frontend" },
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E", category: "frontend" },
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
  { name: "Express", slug: "express", color: "000000", category: "backend" },
  { name: "MongoDB", slug: "mongodb", color: "47A248", category: "backend" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1", category: "backend" },
  { name: "Firebase", slug: "firebase", color: "FFCA28", category: "backend" },
  { name: "Supabase", slug: "supabase", color: "3FCF8E", category: "backend" },
  { name: "Docker", slug: "docker", color: "2496ED", category: "backend" },
  { name: "Git", slug: "git", color: "F05032", category: "tools" },
  { name: "GitHub", slug: "github", color: "181717", category: "tools" },
  { name: "VS Code", slug: "vscode", color: "007ACC", category: "tools" },
  { name: "IntelliJ IDEA", slug: "intellijidea", color: "000000", category: "tools" },
  { name: "Wireshark", slug: "wireshark", color: "1679A7", category: "tools" },
  { name: "Burp Suite", slug: "burpsuite", color: "FF6633", category: "tools" },
];
