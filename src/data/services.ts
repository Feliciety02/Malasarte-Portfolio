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
    title: "Social Media Graphics",
    color: "from-amber-400/40 to-orange-500/30",
    desc: "Campaign posts, pubmats, and creative assets designed around a cohesive visual story.",
    bullets: ["Social campaigns", "Announcement assets", "Story templates"],
  },
  {
    icon: Globe,
    title: "Software Development",
    color: "from-cyan-400/40 to-blue-500/30",
    desc: "Responsive web builds that turn polished UI into structured, maintainable screens.",
    bullets: ["Responsive interfaces", "Component-based builds", "Design-to-code execution"],
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
