export type ProjectCategory =
  | "UI/UX Design"
  | "Publication"
  | "Logo & Branding"
  | "Web Design"
  | "Writing / VA";

export type Project = {
  slug: string;
  title: string;
  cat: ProjectCategory;
  tag: string;
  color: string;
  desc: string;
  details: string;
  role: string;
  tools: string;
  year: string;
  client: string;
  impact: { k: string; v: string }[];
  process: { title: string; text: string }[];
  gallery: { color: string; label: string; ratio: "square" | "wide" | "tall" }[];
};

export const projects: Project[] = [
  {
    slug: "lumen-banking",
    title: "Lumen Banking",
    cat: "UI/UX Design",
    tag: "Mobile App · Figma",
    color: "from-violet-500/50 to-fuchsia-500/30",
    desc: "A calm, trustworthy mobile banking experience.",
    details:
      "Lumen reimagines daily banking as a quiet, intentional space. I designed the end-to-end onboarding, dashboard, transactions and budgeting flows for a next-gen neobank — focused on clarity, micro-interactions, and an inclusive color palette.",
    role: "Lead Product Designer",
    tools: "Figma · Principle · Notion",
    year: "2025",
    client: "Lumen Financial (Concept)",
    impact: [
      { k: "+38%", v: "Onboarding completion" },
      { k: "4.8★", v: "Usability test rating" },
      { k: "60+", v: "Screens shipped" },
    ],
    process: [
      { title: "Research", text: "Interviewed 12 first-time banking users and audited 8 competitor apps to find tension points around trust and clarity." },
      { title: "Concept", text: "Explored 3 visual directions; picked a soft, low-contrast system with strong typographic hierarchy to feel calm — not corporate." },
      { title: "Design", text: "Built a 60-screen Figma library with auto-layout, semantic tokens, and accessible color pairings (WCAG AA+)." },
      { title: "Deliver", text: "Handoff doc + animated prototype + dev-ready component specs. Shadowed first sprint to support implementation." },
    ],
    gallery: [
      { color: "from-violet-500/50 to-fuchsia-500/30", label: "Onboarding", ratio: "tall" },
      { color: "from-indigo-500/50 to-violet-500/30", label: "Dashboard", ratio: "wide" },
      { color: "from-fuchsia-500/40 to-pink-500/30", label: "Transactions", ratio: "square" },
      { color: "from-purple-500/50 to-blue-500/30", label: "Budgeting", ratio: "square" },
      { color: "from-violet-600/50 to-indigo-500/30", label: "Card details", ratio: "wide" },
    ],
  },
  {
    slug: "wavefront-dashboard",
    title: "Wavefront Dashboard",
    cat: "UI/UX Design",
    tag: "SaaS · Web",
    color: "from-blue-500/50 to-cyan-500/30",
    desc: "Analytics dashboard for a marketing platform.",
    details:
      "Wavefront needed a dashboard that scaled across 14 data products. I owned wireframes through high-fidelity mockups, including an extensible data-viz system and dark/light theming.",
    role: "Senior UI Designer",
    tools: "Figma · FigJam",
    year: "2025",
    client: "Wavefront Analytics",
    impact: [
      { k: "−42%", v: "Time-to-insight" },
      { k: "14", v: "Data products unified" },
      { k: "2", v: "Themes (light + dark)" },
    ],
    process: [
      { title: "Research", text: "Workshops with PMs + analysts to map 30+ jobs-to-be-done across 5 personas." },
      { title: "Concept", text: "Defined a modular widget grid + a chart taxonomy that supports future data products." },
      { title: "Design", text: "Built a token-driven design system with semantic colors and 24 chart variants." },
      { title: "Deliver", text: "Storybook handoff with usage docs and motion specs." },
    ],
    gallery: [
      { color: "from-blue-500/50 to-cyan-500/30", label: "Overview", ratio: "wide" },
      { color: "from-sky-500/50 to-blue-500/30", label: "Charts", ratio: "square" },
      { color: "from-cyan-500/50 to-teal-500/30", label: "Filters", ratio: "square" },
      { color: "from-indigo-500/40 to-blue-500/40", label: "Settings", ratio: "wide" },
    ],
  },
  {
    slug: "nimbus-wireframes",
    title: "Nimbus Wireframes",
    cat: "UI/UX Design",
    tag: "Wireframes",
    color: "from-indigo-500/50 to-violet-500/30",
    desc: "Low-fi exploration for a productivity app.",
    details:
      "Nimbus is a focus & planning app for creatives. I ran the discovery sprint and produced 60+ wireframes that became the foundation for a 3-month design phase.",
    role: "UX Designer",
    tools: "Figma · Whimsical",
    year: "2024",
    client: "Nimbus Studio",
    impact: [
      { k: "60+", v: "Wireframe screens" },
      { k: "5", v: "User flows mapped" },
      { k: "3wk", v: "Discovery sprint" },
    ],
    process: [
      { title: "Research", text: "Diary studies with 8 creators to surface friction in their planning rituals." },
      { title: "Concept", text: "Co-designed IA + flows in FigJam with the founding team." },
      { title: "Design", text: "Iterated low-fi screens through 3 critique rounds, validated with click-tests." },
      { title: "Deliver", text: "Annotated wireframe doc + flow map shipped as the brief for hi-fi." },
    ],
    gallery: [
      { color: "from-indigo-500/50 to-violet-500/30", label: "Flows", ratio: "wide" },
      { color: "from-violet-500/50 to-purple-500/30", label: "IA map", ratio: "square" },
      { color: "from-blue-500/40 to-indigo-500/40", label: "Screens", ratio: "square" },
    ],
  },
  {
    slug: "orgweek-pubmats",
    title: "OrgWeek Pubmats",
    cat: "Publication",
    tag: "Social Posters",
    color: "from-pink-500/50 to-rose-500/30",
    desc: "Series of pubmats for an organization week.",
    details:
      "A 10-piece social campaign celebrating an org's anniversary week. Built around a cohesive type system, gradient palette, and animated story templates.",
    role: "Publication Designer",
    tools: "Figma · Photoshop · After Effects",
    year: "2024",
    client: "Tech Org Council",
    impact: [
      { k: "10", v: "Pubmats produced" },
      { k: "+120%", v: "Engagement vs prior year" },
      { k: "1wk", v: "Turnaround per piece" },
    ],
    process: [
      { title: "Research", text: "Studied past campaigns + audited brand for consistent visual language." },
      { title: "Concept", text: "Set a type-led system with rotating gradient backdrops to keep visuals cohesive but fresh." },
      { title: "Design", text: "Designed 10 pubmats + 6 animated story templates in shared components." },
      { title: "Deliver", text: "Handoff with editable templates so the team could continue posting." },
    ],
    gallery: [
      { color: "from-pink-500/50 to-rose-500/30", label: "Day 1", ratio: "tall" },
      { color: "from-rose-500/50 to-orange-400/30", label: "Day 2", ratio: "tall" },
      { color: "from-fuchsia-500/40 to-pink-500/40", label: "Day 3", ratio: "tall" },
      { color: "from-pink-400/40 to-amber-400/30", label: "Story set", ratio: "wide" },
    ],
  },
  {
    slug: "echo-magazine",
    title: "Echo Magazine",
    cat: "Publication",
    tag: "Editorial Layout",
    color: "from-amber-400/50 to-orange-500/30",
    desc: "Editorial layout exploration.",
    details:
      "A 32-page editorial layout exploring grid tension, typographic rhythm, and image-led storytelling for a self-initiated magazine.",
    role: "Editorial Designer",
    tools: "InDesign · Illustrator",
    year: "2024",
    client: "Self-initiated",
    impact: [
      { k: "32pg", v: "Editorial layout" },
      { k: "3", v: "Type pairings" },
      { k: "12", v: "Spreads designed" },
    ],
    process: [
      { title: "Research", text: "Studied modern indie magazines (Kinfolk, Wallpaper*) to inform grid + voice." },
      { title: "Concept", text: "Defined a 12-column grid with intentional 'breath' moments." },
      { title: "Design", text: "12 spreads, custom drop caps, and a flexible quote system." },
      { title: "Deliver", text: "Print-ready PDF + a dieline doc for cover finishing." },
    ],
    gallery: [
      { color: "from-amber-400/50 to-orange-500/30", label: "Cover", ratio: "tall" },
      { color: "from-orange-400/50 to-rose-500/30", label: "Spread A", ratio: "wide" },
      { color: "from-yellow-400/40 to-amber-500/30", label: "Spread B", ratio: "wide" },
    ],
  },
  {
    slug: "aurora-brand",
    title: "Aurora Brand",
    cat: "Logo & Branding",
    tag: "Identity System",
    color: "from-fuchsia-500/50 to-pink-500/30",
    desc: "Brand identity for a wellness studio.",
    details:
      "A complete identity system for Aurora — a slow-living wellness studio. Logo, brand board, color palette, and applied mockups across print, web and merchandise.",
    role: "Brand Designer",
    tools: "Illustrator · Figma · Photoshop",
    year: "2025",
    client: "Aurora Studio",
    impact: [
      { k: "1", v: "Cohesive identity" },
      { k: "8", v: "Brand applications" },
      { k: "20+", v: "Mockups delivered" },
    ],
    process: [
      { title: "Research", text: "Brand workshop to define values, audience, and emotional territory." },
      { title: "Concept", text: "Three logo directions explored; picked a soft monogram with breath-like curves." },
      { title: "Design", text: "Logo, color, typography, brand board + voice guidelines." },
      { title: "Deliver", text: "Brand book PDF + asset library + applied mockups." },
    ],
    gallery: [
      { color: "from-fuchsia-500/50 to-pink-500/30", label: "Logo", ratio: "square" },
      { color: "from-pink-500/40 to-rose-500/40", label: "Palette", ratio: "wide" },
      { color: "from-rose-400/40 to-fuchsia-500/30", label: "Mockup", ratio: "tall" },
      { color: "from-pink-400/40 to-purple-400/30", label: "Stationery", ratio: "wide" },
    ],
  },
  {
    slug: "verdant-mark",
    title: "Verdant Mark",
    cat: "Logo & Branding",
    tag: "Logo & Mockups",
    color: "from-emerald-400/50 to-teal-500/30",
    desc: "Botanical brand mark.",
    details:
      "A custom wordmark + monogram for a botanical brand, with material studies on packaging and signage.",
    role: "Brand Designer",
    tools: "Illustrator · Figma",
    year: "2024",
    client: "Verdant Co.",
    impact: [
      { k: "1", v: "Custom wordmark" },
      { k: "1", v: "Monogram lockup" },
      { k: "6", v: "Packaging mockups" },
    ],
    process: [
      { title: "Research", text: "Botanical references + competitor scan." },
      { title: "Concept", text: "Hand-sketched 30+ marks; refined to 3 in vector." },
      { title: "Design", text: "Final mark, lockup variants, and color exploration." },
      { title: "Deliver", text: "Logo kit + signage and packaging mockups." },
    ],
    gallery: [
      { color: "from-emerald-400/50 to-teal-500/30", label: "Mark", ratio: "square" },
      { color: "from-teal-500/40 to-green-500/30", label: "Packaging", ratio: "tall" },
      { color: "from-green-400/40 to-emerald-500/30", label: "Signage", ratio: "wide" },
    ],
  },
  {
    slug: "studio-folio-site",
    title: "Studio Folio Site",
    cat: "Web Design",
    tag: "Landing Page",
    color: "from-cyan-400/50 to-blue-500/30",
    desc: "Premium landing page for a design studio.",
    details:
      "A fully responsive landing page with parallax, scroll narrative, and a custom cursor system. Designed and prototyped in Figma; specced for dev.",
    role: "Web Designer",
    tools: "Figma · Framer",
    year: "2025",
    client: "Folio Studio",
    impact: [
      { k: "+64%", v: "Avg time on page" },
      { k: "1.0s", v: "Largest contentful paint (target)" },
      { k: "100%", v: "Responsive" },
    ],
    process: [
      { title: "Research", text: "Studied 12 best-in-class studio sites for layout patterns." },
      { title: "Concept", text: "Defined a scroll narrative with 5 hero moments." },
      { title: "Design", text: "Hi-fi mockups + Framer prototype with parallax + cursor states." },
      { title: "Deliver", text: "Responsive specs, motion notes, and asset library." },
    ],
    gallery: [
      { color: "from-cyan-400/50 to-blue-500/30", label: "Hero", ratio: "wide" },
      { color: "from-blue-500/40 to-indigo-500/30", label: "Section A", ratio: "square" },
      { color: "from-sky-400/40 to-cyan-500/30", label: "Section B", ratio: "square" },
      { color: "from-blue-400/40 to-violet-500/30", label: "Footer", ratio: "wide" },
    ],
  },
  {
    slug: "cafe-lumen-web",
    title: "Cafe Lumen Web",
    cat: "Web Design",
    tag: "Web UI",
    color: "from-rose-400/50 to-amber-400/30",
    desc: "Marketing site for a specialty cafe.",
    details:
      "Marketing site with menu architecture, location finder, and storytelling sections built around the brand voice.",
    role: "Web Designer",
    tools: "Figma · Webflow",
    year: "2024",
    client: "Cafe Lumen",
    impact: [
      { k: "12", v: "Page templates" },
      { k: "1", v: "CMS-ready menu" },
      { k: "+28%", v: "Reservation clicks" },
    ],
    process: [
      { title: "Research", text: "Visited the cafe + interviewed regulars for tone." },
      { title: "Concept", text: "Warm, editorial direction — heavy on imagery and serif accents." },
      { title: "Design", text: "12 templates, menu CMS structure, and a location finder pattern." },
      { title: "Deliver", text: "Webflow-ready specs and CMS schema." },
    ],
    gallery: [
      { color: "from-rose-400/50 to-amber-400/30", label: "Home", ratio: "wide" },
      { color: "from-amber-400/40 to-orange-500/30", label: "Menu", ratio: "tall" },
      { color: "from-rose-300/40 to-pink-400/30", label: "Locations", ratio: "square" },
    ],
  },
  {
    slug: "voice-and-captions",
    title: "Voice & Captions",
    cat: "Writing / VA",
    tag: "Content Writing",
    color: "from-purple-500/50 to-indigo-500/30",
    desc: "Captions and blog content for creators.",
    details:
      "Long-form blog drafts, social captions, and a tone-of-voice mini guide for an indie founder building in public.",
    role: "Content Writer",
    tools: "Notion · Grammarly",
    year: "2024",
    client: "Indie Founder",
    impact: [
      { k: "12", v: "Blog drafts" },
      { k: "60+", v: "Captions written" },
      { k: "1", v: "Voice guide" },
    ],
    process: [
      { title: "Research", text: "Audited founder's existing posts + audience comments." },
      { title: "Concept", text: "Defined 5 tone pillars + a caption framework." },
      { title: "Design", text: "Drafted long-form articles + 60 captions across 3 themes." },
      { title: "Deliver", text: "Notion content hub + voice guide PDF." },
    ],
    gallery: [
      { color: "from-purple-500/50 to-indigo-500/30", label: "Voice guide", ratio: "wide" },
      { color: "from-indigo-500/40 to-blue-500/30", label: "Captions", ratio: "square" },
      { color: "from-violet-500/40 to-fuchsia-500/30", label: "Blog", ratio: "square" },
    ],
  },
  {
    slug: "va-toolkit",
    title: "VA Toolkit",
    cat: "Writing / VA",
    tag: "Client Support",
    color: "from-slate-500/40 to-violet-500/30",
    desc: "File systems & client support workflows.",
    details:
      "Notion templates, file naming conventions, and onboarding docs that streamlined VA operations for a small studio.",
    role: "Virtual Assistant",
    tools: "Notion · Google Workspace",
    year: "2024",
    client: "Small Studio",
    impact: [
      { k: "−50%", v: "Time on file lookup" },
      { k: "1", v: "Onboarding doc" },
      { k: "5", v: "Templates shipped" },
    ],
    process: [
      { title: "Research", text: "Mapped existing workflows + interviewed team members." },
      { title: "Concept", text: "Designed a single source of truth for files + tasks." },
      { title: "Design", text: "Built 5 Notion templates + naming conventions." },
      { title: "Deliver", text: "Rolled out with a 1-hour training session." },
    ],
    gallery: [
      { color: "from-slate-500/40 to-violet-500/30", label: "Notion hub", ratio: "wide" },
      { color: "from-violet-400/40 to-purple-500/30", label: "Templates", ratio: "square" },
      { color: "from-slate-400/40 to-blue-500/30", label: "Onboarding", ratio: "square" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
