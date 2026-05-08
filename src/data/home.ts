import { FileText, Globe, Layers, Lightbulb, Megaphone, PenTool, Pencil, Rocket, Search } from "lucide-react";

export const featuredSlugs = [
  "lumen-banking",
  "aurora-brand",
  "wavefront-dashboard",
  "echo-magazine",
] as const;

export const marqueeItems = [
  "UI/UX Design",
  "Branding",
  "Visual Storytelling",
  "Publication",
  "Web Design",
];

export const skillHighlights = [
  { name: "UI/UX Design", level: 95 },
  { name: "Branding", level: 88 },
  { name: "Publication", level: 90 },
  { name: "Web Design", level: 86 },
];

export const servicePreviews = [
  { icon: Layers, title: "UI/UX Design", desc: "Mobile and web product design from research to handoff." },
  { icon: PenTool, title: "Branding", desc: "Identity systems with personality and clarity." },
  { icon: Megaphone, title: "Publication", desc: "Editorial layouts and pubmat campaigns." },
  { icon: Globe, title: "Web Design", desc: "Responsive marketing sites with motion." },
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
  { name: "Illustrator", slug: "adobeillustrator", color: "FF9A00" },
  { name: "Photoshop", slug: "adobephotoshop", color: "31A8FF" },
  { name: "InDesign", slug: "adobeindesign", color: "FF3366" },
  { name: "After Effects", slug: "adobeaftereffects", color: "9999FF" },
  { name: "Framer", slug: "framer", color: "0055FF" },
  { name: "Webflow", slug: "webflow", color: "146EF5" },
  { name: "Notion", slug: "notion", color: "FFFFFF" },
  { name: "Miro", slug: "miro", color: "FFD02F" },
  { name: "Canva", slug: "canva", color: "00C4CC" },
] as const;
