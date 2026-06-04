import { Briefcase, Code2, Palette, Star } from "lucide-react";

export const skillGroups = [
  {
    icon: Palette,
    title: "Design",
    color: "from-fuchsia-500/40 to-pink-500/30",
    items: [
      { name: "UI/UX Design (Figma)", level: 95 },
      { name: "Branding", level: 88 },
      { name: "Logo Design", level: 86 },
      { name: "Social Media Graphics", level: 92 },
      { name: "Creative Assets", level: 90 },
    ],
  },
  {
    icon: Code2,
    title: "Tech",
    color: "from-blue-500/40 to-cyan-500/30",
    items: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 88 },
      { name: "Bootstrap", level: 80 },
      { name: "JavaScript (Basics)", level: 65 },
      { name: "WordPress", level: 78 },
    ],
  },
  {
    icon: Star,
    title: "Creative",
    color: "from-violet-500/40 to-indigo-500/30",
    items: [
      { name: "Typography", level: 92 },
      { name: "Layout Composition", level: 90 },
      { name: "Color Theory", level: 88 },
      { name: "Visual Storytelling", level: 93 },
    ],
  },
  {
    icon: Briefcase,
    title: "Work",
    color: "from-emerald-400/40 to-teal-500/30",
    items: [
      { name: "Virtual Assistance", level: 88 },
      { name: "Content Writing", level: 85 },
      { name: "Social Media Management", level: 87 },
      { name: "File Organization", level: 92 },
    ],
  },
] as const;
