import { FileText, Globe, Layers, Megaphone, PenTool, Star } from "lucide-react";

export const serviceCategories = [
  {
    icon: Layers,
    title: "UI/UX Design",
    color: "from-violet-500/40 to-fuchsia-500/30",
    desc: "End-to-end product design - from research and wireframes to polished, accessible interfaces.",
    bullets: ["Mobile & web apps", "Design systems", "Prototyping in Figma"],
  },
  {
    icon: PenTool,
    title: "Branding & Logo",
    color: "from-pink-500/40 to-rose-500/30",
    desc: "Identity systems with personality - logos, color, type, and brand boards that carry across touchpoints.",
    bullets: ["Logo systems", "Brand guidelines", "Applied mockups"],
  },
  {
    icon: Megaphone,
    title: "Publication & Pubmats",
    color: "from-amber-400/40 to-orange-500/30",
    desc: "Editorial layouts, social campaigns, and pubmats designed around a cohesive visual story.",
    bullets: ["Editorial spreads", "Social campaigns", "Story templates"],
  },
  {
    icon: Globe,
    title: "Web Design",
    color: "from-cyan-400/40 to-blue-500/30",
    desc: "Responsive marketing sites and landing pages with motion, narrative, and crisp handoff.",
    bullets: ["Landing pages", "Marketing sites", "Framer / dev specs"],
  },
  {
    icon: FileText,
    title: "Content Writing",
    color: "from-purple-500/40 to-indigo-500/30",
    desc: "Captions, blogs, and tone-of-voice guides that sound like you - only sharper.",
    bullets: ["Long-form articles", "Caption frameworks", "Voice guides"],
  },
  {
    icon: Star,
    title: "Virtual Assistance",
    color: "from-emerald-400/40 to-teal-500/30",
    desc: "Notion systems, file organization, and creator support that keeps the studio running.",
    bullets: ["Notion templates", "File systems", "Client onboarding"],
  },
] as const;
