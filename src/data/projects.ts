export type ProjectCategory =
  | "UI/UX Design"
  | "Publication"
  | "Logo & Branding"
  | "Web Design"
  | "Writing / VA";

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectProcessStep = {
  title: string;
  text: string;
};

export type ProjectChallenge = {
  title: string;
  challenge: string;
  solution: string;
};

export type ProjectGalleryItem = {
  color: string;
  label: string;
  ratio: "square" | "wide" | "tall";
  note: string;
};

export type Project = {
  slug: string;
  title: string;
  cat: ProjectCategory;
  tag: string;
  color: string;
  desc: string;
  role: string;
  tools: string[];
  year: string;
  client: string;
  overview: string;
  goals: string[];
  impact: ProjectMetric[];
  process: ProjectProcessStep[];
  challenges: ProjectChallenge[];
  outcome: string;
  gallery: ProjectGalleryItem[];
  nextProjectSlug?: string;
};

export const projects: Project[] = [
  {
    slug: "lumen-banking",
    title: "Lumen Banking",
    cat: "UI/UX Design",
    tag: "Mobile App · Figma",
    color: "from-violet-500/50 to-fuchsia-500/30",
    desc: "A calm, trustworthy mobile banking experience.",
    role: "Lead Product Designer",
    tools: ["Figma", "Principle", "Notion"],
    year: "2025",
    client: "Lumen Financial (Concept)",
    overview:
      "Lumen reimagines daily banking as a calm and intentional digital space. The case study follows the product from onboarding to dashboard, transactions, and budgeting, with a strong focus on trust, clarity, and polished motion.",
    goals: [
      "Make first-time banking flows feel simple and reassuring.",
      "Reduce visual noise without making the interface feel empty.",
      "Create a scalable UI language that can support future financial features.",
    ],
    impact: [
      { value: "+38%", label: "Onboarding completion" },
      { value: "4.8/5", label: "Usability test rating" },
      { value: "60+", label: "Screens designed" },
    ],
    process: [
      {
        title: "Research",
        text: "Interviewed 12 first-time banking users and reviewed competing finance apps to understand hesitation points around trust, security, and mental overload.",
      },
      {
        title: "Concept",
        text: "Explored three visual directions before landing on a softer interface system with high hierarchy and restrained motion to feel premium but approachable.",
      },
      {
        title: "Design",
        text: "Built the end-to-end mobile flow, reusable UI patterns, accessibility-conscious color pairings, and a prototype that demonstrated key interactions.",
      },
      {
        title: "Deliver",
        text: "Prepared component specs, handoff notes, annotated prototypes, and placeholder mockup slots that can later be swapped with production screens.",
      },
    ],
    challenges: [
      {
        title: "Trust Without Clutter",
        challenge:
          "Finance apps often overuse dense data and alerts, which makes onboarding feel heavy.",
        solution:
          "Used progressive disclosure, clear card groupings, and calmer default states so users only see what matters first.",
      },
      {
        title: "Balancing Calm and Utility",
        challenge: "A quiet visual direction risked feeling too minimal for a banking product.",
        solution:
          "Introduced stronger hierarchy, richer status states, and subtle motion feedback to keep the product informative and alive.",
      },
    ],
    outcome:
      "The resulting concept demonstrates a reusable mobile banking system that feels elegant, easy to follow, and ready for deeper product expansion. Gallery areas below are placeholders for onboarding, dashboard, and budgeting mockups.",
    gallery: [
      {
        color: "from-violet-500/50 to-fuchsia-500/30",
        label: "Onboarding Flow",
        ratio: "tall",
        note: "Placeholder for welcome, verification, and first-deposit mockups.",
      },
      {
        color: "from-indigo-500/50 to-violet-500/30",
        label: "Dashboard",
        ratio: "wide",
        note: "Placeholder for account overview, balances, and spending cards.",
      },
      {
        color: "from-fuchsia-500/40 to-pink-500/30",
        label: "Transactions",
        ratio: "square",
        note: "Placeholder for list states, filtering, and transaction detail screens.",
      },
      {
        color: "from-purple-500/50 to-blue-500/30",
        label: "Budgeting",
        ratio: "square",
        note: "Placeholder for goals, savings buckets, and monthly progress visuals.",
      },
      {
        color: "from-violet-600/50 to-indigo-500/30",
        label: "Card Details",
        ratio: "wide",
        note: "Placeholder for card controls, freeze states, and spending insights.",
      },
    ],
    nextProjectSlug: "aurora-brand",
  },
  {
    slug: "wavefront-dashboard",
    title: "Wavefront Dashboard",
    cat: "UI/UX Design",
    tag: "SaaS · Web",
    color: "from-blue-500/50 to-cyan-500/30",
    desc: "Analytics dashboard for a marketing platform.",
    role: "Senior UI Designer",
    tools: ["Figma", "FigJam"],
    year: "2025",
    client: "Wavefront Analytics",
    overview:
      "Wavefront needed a dashboard system that could scale across multiple analytics products without losing clarity. This reusable case study documents the structure, decision-making, and UI patterns behind the system.",
    goals: [
      "Unify 14 data products under one dashboard experience.",
      "Shorten the time it takes users to surface meaningful insights.",
      "Support both light and dark themes with consistent chart behavior.",
    ],
    impact: [
      { value: "-42%", label: "Time-to-insight" },
      { value: "14", label: "Products unified" },
      { value: "2", label: "Supported themes" },
    ],
    process: [
      {
        title: "Research",
        text: "Mapped jobs-to-be-done across analysts, managers, and marketers to understand which metrics required immediate visibility and which could sit deeper in the product.",
      },
      {
        title: "Concept",
        text: "Defined a widget grid and chart taxonomy that could grow with the platform rather than forcing every product into one rigid screen pattern.",
      },
      {
        title: "Design",
        text: "Created a token-driven dashboard language with reusable charts, filter modules, comparison panels, and layout variants.",
      },
      {
        title: "Deliver",
        text: "Packaged the work as a reusable system with placeholder gallery areas for overview, data visualization, settings, and team workflows.",
      },
    ],
    challenges: [
      {
        title: "Complex Data Density",
        challenge:
          "The product needed to show a large volume of information without overwhelming first-time users.",
        solution:
          "Used modular cards, cleaner visual rhythm, and meaningful defaults to keep the first view digestible.",
      },
      {
        title: "System Flexibility",
        challenge:
          "The dashboard had to serve multiple product teams with different metrics and visualization needs.",
        solution:
          "Built extensible chart patterns and container rules that could be remixed without redesigning the entire experience.",
      },
    ],
    outcome:
      "The final system gives Wavefront a reusable dashboard foundation that is easier to scale and easier to read. The gallery below uses placeholders that can later be replaced with final screens or mockups.",
    gallery: [
      {
        color: "from-blue-500/50 to-cyan-500/30",
        label: "Overview Screen",
        ratio: "wide",
        note: "Placeholder for primary metrics, summary cards, and account health.",
      },
      {
        color: "from-sky-500/50 to-blue-500/30",
        label: "Chart Library",
        ratio: "square",
        note: "Placeholder for bar, line, area, and mixed chart states.",
      },
      {
        color: "from-cyan-500/50 to-teal-500/30",
        label: "Filters",
        ratio: "square",
        note: "Placeholder for advanced filters, date ranges, and saved views.",
      },
      {
        color: "from-indigo-500/40 to-blue-500/40",
        label: "Settings",
        ratio: "wide",
        note: "Placeholder for permissions, theme settings, and team preferences.",
      },
    ],
    nextProjectSlug: "orgweek-pubmats",
  },
  {
    slug: "nimbus-wireframes",
    title: "Nimbus Wireframes",
    cat: "UI/UX Design",
    tag: "Wireframes",
    color: "from-indigo-500/50 to-violet-500/30",
    desc: "Low-fi exploration for a productivity app.",
    role: "UX Designer",
    tools: ["Figma", "Whimsical"],
    year: "2024",
    client: "Nimbus Studio",
    overview:
      "Nimbus is a focus and planning app for creatives. This case study captures the discovery sprint, information architecture work, and early wireframe direction that shaped the later high-fidelity phase.",
    goals: [
      "Clarify the core user flows before visual design started.",
      "Translate open-ended product ideas into concrete user journeys.",
      "Create a wireframe base that the team could iterate on quickly.",
    ],
    impact: [
      { value: "60+", label: "Wireframe screens" },
      { value: "5", label: "Flows mapped" },
      { value: "3wk", label: "Discovery sprint" },
    ],
    process: [
      {
        title: "Research",
        text: "Ran diary studies and interviews to understand how creatives structure focus, planning, and task switching.",
      },
      {
        title: "Concept",
        text: "Mapped task flows and information hierarchy with the founding team before introducing interface structure.",
      },
      {
        title: "Design",
        text: "Built low-fidelity wireframes, iterated on navigation patterns, and validated interactions through click tests.",
      },
      {
        title: "Deliver",
        text: "Packaged the wireframes as a reusable foundation with placeholder screens for future high-fidelity exploration.",
      },
    ],
    challenges: [
      {
        title: "Ambiguous Feature Scope",
        challenge: "Early product ideas were broad and often overlapped with one another.",
        solution:
          "Converted concepts into flow-first exercises so the team could align on behavior before visuals.",
      },
      {
        title: "Maintaining Momentum",
        challenge:
          "Low-fi work can stall if the team treats it as disposable instead of foundational.",
        solution:
          "Added annotations and reusable structural patterns so the wireframes remained useful during later phases.",
      },
    ],
    outcome:
      "Nimbus left the discovery phase with a cleaner structure, stronger product alignment, and a reusable wireframe system that could scale into high-fidelity design. The gallery uses placeholders for flows, maps, and screens.",
    gallery: [
      {
        color: "from-indigo-500/50 to-violet-500/30",
        label: "Primary Flows",
        ratio: "wide",
        note: "Placeholder for onboarding, planning, and review-flow wireframes.",
      },
      {
        color: "from-violet-500/50 to-purple-500/30",
        label: "IA Map",
        ratio: "square",
        note: "Placeholder for sitemap and navigation architecture.",
      },
      {
        color: "from-blue-500/40 to-indigo-500/40",
        label: "Key Screens",
        ratio: "square",
        note: "Placeholder for daily planner and focus mode wireframes.",
      },
    ],
    nextProjectSlug: "lumen-banking",
  },
  {
    slug: "orgweek-pubmats",
    title: "OrgWeek Pubmats",
    cat: "Publication",
    tag: "Social Posters",
    color: "from-pink-500/50 to-rose-500/30",
    desc: "Series of pubmats for an organization week.",
    role: "Publication Designer",
    tools: ["Figma", "Photoshop", "After Effects"],
    year: "2024",
    client: "Tech Org Council",
    overview:
      "OrgWeek Pubmats is a campaign system built for a student organization celebration week. The work focused on visual consistency, fast iteration, and a flexible template approach for multiple daily announcements.",
    goals: [
      "Create a cohesive visual campaign across multiple event announcements.",
      "Keep the system flexible enough for quick daily updates.",
      "Increase engagement compared with the previous year's materials.",
    ],
    impact: [
      { value: "10", label: "Pubmats produced" },
      { value: "+120%", label: "Engagement uplift" },
      { value: "1wk", label: "Average turnaround" },
    ],
    process: [
      {
        title: "Research",
        text: "Reviewed prior campaigns, audience behavior, and existing brand materials to identify what needed more energy and clarity.",
      },
      {
        title: "Concept",
        text: "Built a type-led system with gradient variations so each post could feel fresh while remaining recognizably part of one campaign.",
      },
      {
        title: "Design",
        text: "Created static posts, story variants, and reusable composition rules that could scale across multiple event days.",
      },
      {
        title: "Deliver",
        text: "Prepared editable placeholder mockups for social, story, and countdown formats so future updates could happen faster.",
      },
    ],
    challenges: [
      {
        title: "Fast Turnarounds",
        challenge: "Campaign materials needed to be released quickly while still feeling polished.",
        solution:
          "Designed a reusable set of layout rules and interchangeable assets to reduce redesign work.",
      },
      {
        title: "Consistency Across Formats",
        challenge: "Square posts, stories, and animated graphics needed to feel like one system.",
        solution:
          "Locked in recurring type scales, alignment principles, and gradient families across every asset.",
      },
    ],
    outcome:
      "The campaign delivered a clearer and more memorable visual identity for the event week. The gallery below intentionally uses placeholders for final poster, story, and animated asset mockups.",
    gallery: [
      {
        color: "from-pink-500/50 to-rose-500/30",
        label: "Day 1 Poster",
        ratio: "tall",
        note: "Placeholder for launch-day poster mockup.",
      },
      {
        color: "from-rose-500/50 to-orange-400/30",
        label: "Day 2 Poster",
        ratio: "tall",
        note: "Placeholder for speaker or activity announcement.",
      },
      {
        color: "from-fuchsia-500/40 to-pink-500/40",
        label: "Day 3 Poster",
        ratio: "tall",
        note: "Placeholder for event recap or challenge post.",
      },
      {
        color: "from-pink-400/40 to-amber-400/30",
        label: "Story Set",
        ratio: "wide",
        note: "Placeholder for animated story and countdown assets.",
      },
    ],
    nextProjectSlug: "echo-magazine",
  },
  {
    slug: "echo-magazine",
    title: "Echo Magazine",
    cat: "Publication",
    tag: "Editorial Layout",
    color: "from-amber-400/50 to-orange-500/30",
    desc: "Editorial layout exploration.",
    role: "Editorial Designer",
    tools: ["InDesign", "Illustrator"],
    year: "2024",
    client: "Self-initiated",
    overview:
      "Echo Magazine is a self-initiated editorial layout exploration focused on typographic rhythm, pacing, and image-led storytelling across a multi-page publication system.",
    goals: [
      "Develop a polished editorial language with clear rhythm and hierarchy.",
      "Explore how grid tension can support narrative pacing.",
      "Create spreads that feel modern but tactile and human.",
    ],
    impact: [
      { value: "32pg", label: "Editorial layout" },
      { value: "3", label: "Type pairings tested" },
      { value: "12", label: "Spreads designed" },
    ],
    process: [
      {
        title: "Research",
        text: "Studied contemporary indie magazines to understand pacing, white-space usage, and editorial tone.",
      },
      {
        title: "Concept",
        text: "Defined a 12-column grid system with deliberate moments of compression and release across spreads.",
      },
      {
        title: "Design",
        text: "Built title systems, pull-quote structures, and image-first compositions that could flex across features.",
      },
      {
        title: "Deliver",
        text: "Prepared print-ready layouts and placeholder spread mockups for cover, features, and article openers.",
      },
    ],
    challenges: [
      {
        title: "Visual Rhythm",
        challenge:
          "Editorial pieces can feel repetitive if every spread follows the same structure.",
        solution:
          "Varied scale, whitespace, and composition while keeping the underlying grid consistent.",
      },
      {
        title: "Balancing Type and Image",
        challenge:
          "The layout needed to feel expressive without letting images overpower the content.",
        solution:
          "Created a modular text system that could hold strong images while maintaining readability.",
      },
    ],
    outcome:
      "Echo Magazine became a strong editorial study with reusable layout principles that can support future long-form publication work. The gallery shows placeholders for cover and spread mockups.",
    gallery: [
      {
        color: "from-amber-400/50 to-orange-500/30",
        label: "Cover",
        ratio: "tall",
        note: "Placeholder for cover composition and masthead treatment.",
      },
      {
        color: "from-orange-400/50 to-rose-500/30",
        label: "Feature Spread A",
        ratio: "wide",
        note: "Placeholder for opening spread and image-led article design.",
      },
      {
        color: "from-yellow-400/40 to-amber-500/30",
        label: "Feature Spread B",
        ratio: "wide",
        note: "Placeholder for quote system and secondary article layout.",
      },
    ],
    nextProjectSlug: "wavefront-dashboard",
  },
  {
    slug: "aurora-brand",
    title: "Aurora Brand",
    cat: "Logo & Branding",
    tag: "Identity System",
    color: "from-fuchsia-500/50 to-pink-500/30",
    desc: "Brand identity for a wellness studio.",
    role: "Brand Designer",
    tools: ["Illustrator", "Figma", "Photoshop"],
    year: "2025",
    client: "Aurora Studio",
    overview:
      "Aurora Brand is a full identity system for a wellness studio centered on calm, softness, and emotional clarity. The system includes logo work, typography, palette direction, and real-world applications.",
    goals: [
      "Create a distinctive identity rooted in softness and ritual.",
      "Build a cohesive system that works across print, digital, and merchandise.",
      "Give the client a brand foundation that feels premium and memorable.",
    ],
    impact: [
      { value: "1", label: "Cohesive identity" },
      { value: "8", label: "Core applications" },
      { value: "20+", label: "Mockups delivered" },
    ],
    process: [
      {
        title: "Research",
        text: "Ran a brand workshop to define the studio's values, visual references, and emotional positioning.",
      },
      {
        title: "Concept",
        text: "Explored three identity directions before selecting a softer monogram and supporting visual language.",
      },
      {
        title: "Design",
        text: "Developed the logo system, palette, typography, and application mockups across multiple touchpoints.",
      },
      {
        title: "Deliver",
        text: "Compiled the work into a reusable brand package with placeholders for stationery, signage, and social applications.",
      },
    ],
    challenges: [
      {
        title: "Soft But Distinctive",
        challenge:
          "Wellness branding can easily become generic if it leans too heavily on familiar visual cues.",
        solution:
          "Built a custom mark and more controlled art direction so the system felt calm without becoming anonymous.",
      },
      {
        title: "Multi-surface Consistency",
        challenge:
          "The identity needed to work equally well on digital screens, print collateral, and merchandise.",
        solution:
          "Defined clear logo lockups, spacing rules, and palette behaviors across all application contexts.",
      },
    ],
    outcome:
      "Aurora emerged with a more mature and cohesive visual identity that can scale across customer touchpoints. The gallery below contains reusable placeholders for logo, palette, and brand application mockups.",
    gallery: [
      {
        color: "from-fuchsia-500/50 to-pink-500/30",
        label: "Logo System",
        ratio: "square",
        note: "Placeholder for primary mark, alternate lockups, and spacing rules.",
      },
      {
        color: "from-pink-500/40 to-rose-500/40",
        label: "Palette",
        ratio: "wide",
        note: "Placeholder for brand colors, type pairings, and moodboard visuals.",
      },
      {
        color: "from-rose-400/40 to-fuchsia-500/30",
        label: "Packaging Mockup",
        ratio: "tall",
        note: "Placeholder for packaging and product application render.",
      },
      {
        color: "from-pink-400/40 to-purple-400/30",
        label: "Stationery",
        ratio: "wide",
        note: "Placeholder for cards, forms, and printed collateral.",
      },
    ],
    nextProjectSlug: "studio-folio-site",
  },
  {
    slug: "verdant-mark",
    title: "Verdant Mark",
    cat: "Logo & Branding",
    tag: "Logo & Mockups",
    color: "from-emerald-400/50 to-teal-500/30",
    desc: "Botanical brand mark.",
    role: "Brand Designer",
    tools: ["Illustrator", "Figma"],
    year: "2024",
    client: "Verdant Co.",
    overview:
      "Verdant Mark is a botanical identity exercise built around a custom wordmark, monogram, and packaging studies. The focus was on crafting an identity that felt grounded, fresh, and tactile.",
    goals: [
      "Design a custom wordmark with a strong sense of character.",
      "Create a monogram that can scale to small brand touchpoints.",
      "Test how the identity performs on packaging and signage.",
    ],
    impact: [
      { value: "1", label: "Custom wordmark" },
      { value: "1", label: "Monogram lockup" },
      { value: "6", label: "Packaging mockups" },
    ],
    process: [
      {
        title: "Research",
        text: "Collected botanical references and reviewed competitor identities to map visual cliches to avoid.",
      },
      {
        title: "Concept",
        text: "Sketched a wide range of mark directions before narrowing into the strongest vector candidates.",
      },
      {
        title: "Design",
        text: "Refined the selected wordmark, created the monogram, and tested the system on physical applications.",
      },
      {
        title: "Deliver",
        text: "Prepared a brand mini-kit with placeholder applications for packaging, signage, and product labels.",
      },
    ],
    challenges: [
      {
        title: "Avoiding Overused Visual Cues",
        challenge:
          "Botanical branding often defaults to the same leaf motifs and serif combinations.",
        solution:
          "Focused on typographic personality and structure first, then used supporting visuals more selectively.",
      },
      {
        title: "Mark Versatility",
        challenge: "The identity needed to work at both packaging scale and small digital sizes.",
        solution:
          "Built a simplified monogram system alongside the fuller wordmark to preserve clarity.",
      },
    ],
    outcome:
      "Verdant Mark became a compact but flexible identity system with enough range to extend into packaging and environmental branding. The mockup gallery below is intentionally placeholder-based for future asset updates.",
    gallery: [
      {
        color: "from-emerald-400/50 to-teal-500/30",
        label: "Primary Mark",
        ratio: "square",
        note: "Placeholder for the main wordmark presentation.",
      },
      {
        color: "from-teal-500/40 to-green-500/30",
        label: "Packaging",
        ratio: "tall",
        note: "Placeholder for label and box mockups.",
      },
      {
        color: "from-green-400/40 to-emerald-500/30",
        label: "Signage",
        ratio: "wide",
        note: "Placeholder for storefront or wayfinding application.",
      },
    ],
    nextProjectSlug: "cafe-lumen-web",
  },
  {
    slug: "studio-folio-site",
    title: "Studio Folio Site",
    cat: "Web Design",
    tag: "Landing Page",
    color: "from-cyan-400/50 to-blue-500/30",
    desc: "Premium landing page for a design studio.",
    role: "Web Designer",
    tools: ["Figma", "Framer"],
    year: "2025",
    client: "Folio Studio",
    overview:
      "Studio Folio Site is a premium landing page concept designed to help a studio present work, process, and personality through a more editorial web experience.",
    goals: [
      "Create a narrative-driven landing page with strong visual pacing.",
      "Design a system that remains responsive without losing its atmosphere.",
      "Blend web performance goals with a more premium motion language.",
    ],
    impact: [
      { value: "+64%", label: "Avg. time on page" },
      { value: "1.0s", label: "LCP target" },
      { value: "100%", label: "Responsive coverage" },
    ],
    process: [
      {
        title: "Research",
        text: "Reviewed best-in-class studio sites to identify pacing, hierarchy, and storytelling patterns worth adapting.",
      },
      {
        title: "Concept",
        text: "Created a multi-section narrative with five distinct visual moments to carry users through the site.",
      },
      {
        title: "Design",
        text: "Built high-fidelity layouts and motion cues for hero sections, portfolio reveals, and calls to action.",
      },
      {
        title: "Deliver",
        text: "Documented responsive behavior and created placeholder website mockup zones that can later hold final screens.",
      },
    ],
    challenges: [
      {
        title: "Balancing Atmosphere and Clarity",
        challenge: "A cinematic landing page can easily sacrifice usability for style.",
        solution:
          "Maintained strong type hierarchy and predictable navigation anchors beneath the expressive visuals.",
      },
      {
        title: "Responsive Storytelling",
        challenge: "Large hero moments needed to remain effective on smaller screens.",
        solution:
          "Designed content blocks that could stack cleanly while preserving the rhythm of the scroll narrative.",
      },
    ],
    outcome:
      "The final concept shows how a studio landing page can feel immersive without losing structure. The gallery includes placeholders for hero, content sections, and footer mockups.",
    gallery: [
      {
        color: "from-cyan-400/50 to-blue-500/30",
        label: "Hero",
        ratio: "wide",
        note: "Placeholder for landing hero, navigation, and headline system.",
      },
      {
        color: "from-blue-500/40 to-indigo-500/30",
        label: "Section A",
        ratio: "square",
        note: "Placeholder for studio story and featured-work block.",
      },
      {
        color: "from-sky-400/40 to-cyan-500/30",
        label: "Section B",
        ratio: "square",
        note: "Placeholder for service or case study teaser section.",
      },
      {
        color: "from-blue-400/40 to-violet-500/30",
        label: "Footer",
        ratio: "wide",
        note: "Placeholder for CTA and final navigation footer.",
      },
    ],
    nextProjectSlug: "va-toolkit",
  },
  {
    slug: "cafe-lumen-web",
    title: "Cafe Lumen Web",
    cat: "Web Design",
    tag: "Web UI",
    color: "from-rose-400/50 to-amber-400/30",
    desc: "Marketing site for a specialty cafe.",
    role: "Web Designer",
    tools: ["Figma", "Webflow"],
    year: "2024",
    client: "Cafe Lumen",
    overview:
      "Cafe Lumen Web is a marketing site concept designed around warmth, editorial storytelling, and a more tactile presentation of menu and location content.",
    goals: [
      "Translate the cafe's in-person atmosphere into a digital experience.",
      "Make menu and location details easier to find.",
      "Support future content updates through a CMS-ready structure.",
    ],
    impact: [
      { value: "12", label: "Page templates" },
      { value: "1", label: "CMS-ready menu" },
      { value: "+28%", label: "Reservation clicks" },
    ],
    process: [
      {
        title: "Research",
        text: "Visited the cafe and gathered references from both the space and its regular customers.",
      },
      {
        title: "Concept",
        text: "Shaped a warmer editorial direction with imagery, softer serif accents, and storytelling-led sections.",
      },
      {
        title: "Design",
        text: "Built responsive page templates for home, menu, location, and supporting brand storytelling sections.",
      },
      {
        title: "Deliver",
        text: "Defined CMS placeholders and reusable page mockups so the site can expand with future campaigns.",
      },
    ],
    challenges: [
      {
        title: "Atmosphere Online",
        challenge:
          "The cafe's strongest qualities were sensory and spatial, which are difficult to express on a flat screen.",
        solution:
          "Used imagery, pacing, and editorial sections to make the site feel more immersive and memorable.",
      },
      {
        title: "Practical Information Flow",
        challenge:
          "Marketing pages still needed to support functional tasks like finding the menu or a branch location quickly.",
        solution:
          "Kept key actions visible and used content grouping to balance storytelling with direct utility.",
      },
    ],
    outcome:
      "Cafe Lumen Web establishes a warmer digital identity while keeping practical content accessible. The gallery below contains placeholders for homepage, menu, and location screens.",
    gallery: [
      {
        color: "from-rose-400/50 to-amber-400/30",
        label: "Home",
        ratio: "wide",
        note: "Placeholder for homepage hero and brand storytelling sections.",
      },
      {
        color: "from-amber-400/40 to-orange-500/30",
        label: "Menu",
        ratio: "tall",
        note: "Placeholder for menu listing and category navigation.",
      },
      {
        color: "from-rose-300/40 to-pink-400/30",
        label: "Locations",
        ratio: "square",
        note: "Placeholder for branch finder and map module.",
      },
    ],
    nextProjectSlug: "nimbus-wireframes",
  },
  {
    slug: "voice-and-captions",
    title: "Voice & Captions",
    cat: "Writing / VA",
    tag: "Content Writing",
    color: "from-purple-500/50 to-indigo-500/30",
    desc: "Captions and blog content for creators.",
    role: "Content Writer",
    tools: ["Notion", "Grammarly"],
    year: "2024",
    client: "Indie Founder",
    overview:
      "Voice & Captions focuses on messaging systems for an indie founder building in public. The project blends tone-of-voice strategy with a repeatable workflow for blog and social content.",
    goals: [
      "Define a consistent writing voice across platforms.",
      "Make content production easier to sustain week after week.",
      "Support both long-form and short-form writing with one system.",
    ],
    impact: [
      { value: "12", label: "Blog drafts" },
      { value: "60+", label: "Captions written" },
      { value: "1", label: "Voice guide" },
    ],
    process: [
      {
        title: "Research",
        text: "Audited existing writing, comments, and audience responses to identify what language patterns felt most authentic.",
      },
      {
        title: "Concept",
        text: "Defined a tone framework and repeatable caption formula that could scale across different kinds of posts.",
      },
      {
        title: "Design",
        text: "Drafted blog structures, social caption systems, and reusable writing prompts for ongoing use.",
      },
      {
        title: "Deliver",
        text: "Organized everything into a shared content hub with placeholders for future campaign content and article expansions.",
      },
    ],
    challenges: [
      {
        title: "Consistency Across Formats",
        challenge: "The founder's blog voice and social voice were drifting apart over time.",
        solution:
          "Defined tone pillars and example phrasing so both long and short content stayed aligned.",
      },
      {
        title: "Sustainable Production",
        challenge:
          "Content creation slowed whenever the workflow depended on starting from a blank page.",
        solution: "Built templates and prompts that reduced friction while preserving personality.",
      },
    ],
    outcome:
      "The final system made content creation more repeatable and helped the founder sound more consistent across channels. Gallery slots below act as placeholders for guide pages, sample captions, and blog layouts.",
    gallery: [
      {
        color: "from-purple-500/50 to-indigo-500/30",
        label: "Voice Guide",
        ratio: "wide",
        note: "Placeholder for tone pillars, sample phrasing, and content rules.",
      },
      {
        color: "from-indigo-500/40 to-blue-500/30",
        label: "Captions",
        ratio: "square",
        note: "Placeholder for sample caption sets and content themes.",
      },
      {
        color: "from-violet-500/40 to-fuchsia-500/30",
        label: "Blog Drafts",
        ratio: "square",
        note: "Placeholder for article structure and draft excerpts.",
      },
    ],
    nextProjectSlug: "verdant-mark",
  },
  {
    slug: "va-toolkit",
    title: "VA Toolkit",
    cat: "Writing / VA",
    tag: "Client Support",
    color: "from-slate-500/40 to-violet-500/30",
    desc: "File systems and client support workflows.",
    role: "Virtual Assistant",
    tools: ["Notion", "Google Workspace"],
    year: "2024",
    client: "Small Studio",
    overview:
      "VA Toolkit is an operations-focused project centered on clearer file systems, faster onboarding, and easier day-to-day client support. The work is documented here using the same reusable case study structure as the visual projects.",
    goals: [
      "Reduce time wasted on file lookup and inconsistent naming.",
      "Create a more durable onboarding system for new collaborators.",
      "Turn scattered operational habits into reusable workflows.",
    ],
    impact: [
      { value: "-50%", label: "File lookup time" },
      { value: "1", label: "Onboarding doc" },
      { value: "5", label: "Templates shipped" },
    ],
    process: [
      {
        title: "Research",
        text: "Mapped the studio's current operations and identified repeated friction around files, tasks, and handoffs.",
      },
      {
        title: "Concept",
        text: "Designed a single source of truth that combined structure, naming conventions, and reusable support templates.",
      },
      {
        title: "Design",
        text: "Built Notion templates, file organization rules, and simple documentation that the team could actually maintain.",
      },
      {
        title: "Deliver",
        text: "Rolled out the toolkit with placeholder workflow visuals that can later be replaced with real dashboards and docs.",
      },
    ],
    challenges: [
      {
        title: "Scattered Operational Knowledge",
        challenge: "Too much of the workflow lived in memory or disconnected files.",
        solution:
          "Centralized documentation and built templates that reduced dependence on ad hoc knowledge transfer.",
      },
      {
        title: "Team Adoption",
        challenge: "Even a cleaner system can fail if it asks the team to change too much at once.",
        solution:
          "Kept the toolkit lightweight, familiar, and directly tied to the team's existing tasks.",
      },
    ],
    outcome:
      "VA Toolkit created a more consistent support foundation for the studio and showed that operational projects can live inside the same reusable case study format. The gallery placeholders can later be replaced with workflow screenshots and onboarding visuals.",
    gallery: [
      {
        color: "from-slate-500/40 to-violet-500/30",
        label: "Notion Hub",
        ratio: "wide",
        note: "Placeholder for central dashboard and operating home.",
      },
      {
        color: "from-violet-400/40 to-purple-500/30",
        label: "Templates",
        ratio: "square",
        note: "Placeholder for request, tracking, and checklist templates.",
      },
      {
        color: "from-slate-400/40 to-blue-500/30",
        label: "Onboarding",
        ratio: "square",
        note: "Placeholder for onboarding guide and process documents.",
      },
    ],
    nextProjectSlug: "voice-and-captions",
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const getNextProject = (slug: string) => {
  const current = getProject(slug);
  if (!current) return undefined;

  if (current.nextProjectSlug) {
    return getProject(current.nextProjectSlug);
  }

  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
};
