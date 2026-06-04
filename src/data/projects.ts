export type ProjectCategory =
  | "UI/UX Design"
  | "Social Media Graphics"
  | "Creative Assets"
  | "Logo & Branding"
  | "Web Development"
  | "Writing / VA";

export type ProjectKind = "uiux" | "publication" | "branding" | "frontend" | "gallery" | "writing";

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
  imageTitle?: string;
  imageLabel?: string;
  ratio: "square" | "wide" | "tall";
  note: string;
};

export type ProjectFocusArea = {
  title: string;
  text: string;
};

export type ProjectFigmaEmbed = {
  shareUrl: string;
  embedUrl?: string;
  prototypeUrl?: string;
  title?: string;
  note?: string;
};

export type ProjectFlipbookEmbed = {
  src: string;
  title: string;
};

export type Project = {
  slug: string;
  title: string;
  imageTitle?: string;
  directoryTitle?: string;
  cat: ProjectCategory;
  kind: ProjectKind;
  categories?: ProjectCategory[];
  categoryLabels?: Partial<Record<ProjectCategory, string>>;
  categoryTitles?: Partial<Record<ProjectCategory, string>>;
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
  focusAreas: ProjectFocusArea[];
  process: ProjectProcessStep[];
  challenges: ProjectChallenge[];
  outcome: string;
  gallery: ProjectGalleryItem[];
  figmaEmbed?: ProjectFigmaEmbed;
  flipbookEmbed?: ProjectFlipbookEmbed;
  nextProjectSlug?: string;
};

export const categoryDescriptions: Record<"All" | ProjectCategory, string> = {
  All: "A simple directory of the clients, brands, and projects represented in this portfolio.",
  "UI/UX Design":
    "Apps, dashboards, wireframes, flows, prototypes, and systems shaped around usability and clarity.",
  "Social Media Graphics":
    "Campaign posts, announcement layouts, social graphics, and pubmat systems with strong visual direction.",
  "Creative Assets":
    "Reusable visual assets, campaign kits, event graphics, templates, and digital collateral for fast-moving teams.",
  "Logo & Branding":
    "Logos, brand boards, identity systems, mockups, palettes, and typography-led brand work.",
  "Web Development":
    "Responsive page builds, interface implementation, and web systems translated from design into working screens.",
  "Writing / VA":
    "Writing systems, content deliverables, support workflows, organization processes, and virtual assistant tasks.",
};

type SimpleProjectInput = {
  slug: string;
  title: string;
  cat: ProjectCategory;
  tag: string;
  desc: string;
  directoryTitle?: string;
  categories?: ProjectCategory[];
  categoryLabels?: Partial<Record<ProjectCategory, string>>;
  categoryTitles?: Partial<Record<ProjectCategory, string>>;
  kind?: ProjectKind;
  color?: string;
  role?: string;
  tools?: string[];
  year?: string;
  client?: string;
  overview?: string;
  gallery?: ProjectGalleryItem[];
  imageTitle?: string;
  nextProjectSlug?: string;
};

const defaultGallery = (
  title: string,
  color = "from-fuchsia-500/50 to-violet-500/30",
): ProjectGalleryItem[] => [
  {
    color,
    label: "Primary Asset",
    ratio: "wide",
    note: `Showcase slot for ${title}'s main visual direction.`,
  },
  {
    color: "from-cyan-500/40 to-blue-500/30",
    label: "Supporting Layout",
    ratio: "square",
    note: `Showcase slot for additional ${title} layouts and variations.`,
  },
  {
    color: "from-amber-400/40 to-rose-500/30",
    label: "Application Preview",
    ratio: "square",
    note: `Showcase slot for ${title} mockups or campaign applications.`,
  },
];

const simpleProcess: ProjectProcessStep[] = [
  {
    title: "Direction",
    text: "Clarified the visual direction and project context before production.",
  },
  {
    title: "Design",
    text: "Created the core layouts, assets, or interface screens for the selected format.",
  },
  {
    title: "Refine",
    text: "Adjusted hierarchy, consistency, and presentation details for portfolio-ready output.",
  },
];

const createSimpleProject = ({
  slug,
  title,
  cat,
  tag,
  desc,
  directoryTitle,
  categories,
  categoryLabels,
  categoryTitles,
  kind = "gallery",
  color = "from-fuchsia-500/50 to-violet-500/30",
  role = "Designer",
  tools = ["Figma", "Canva"],
  year = "2025",
  client = directoryTitle ?? title,
  overview = desc,
  gallery,
  imageTitle,
  nextProjectSlug,
}: SimpleProjectInput): Project => ({
  slug,
  title,
  imageTitle,
  directoryTitle: directoryTitle ?? title,
  cat,
  kind,
  categories,
  categoryLabels,
  categoryTitles,
  tag,
  color,
  desc,
  role,
  tools,
  year,
  client,
  overview,
  goals: [
    `Create a clear ${tag.toLowerCase()} direction for ${title}.`,
    "Keep the output flexible enough for portfolio and client presentation.",
    "Prepare a visual system that can expand as more assets are added.",
  ],
  impact: [
    { value: "1", label: "Project direction" },
    { value: "3+", label: "Showcase pieces" },
    { value: "1", label: "Reusable system" },
  ],
  focusAreas: [
    {
      title: "Visual Direction",
      text: "Defined the mood, hierarchy, and composition system for the work.",
    },
    {
      title: "Asset Structure",
      text: "Organized the deliverables into reusable portfolio-ready pieces.",
    },
    {
      title: "Presentation",
      text: "Prepared the work for quick scanning and stronger visual review.",
    },
  ],
  process: simpleProcess,
  challenges: [],
  outcome: `${title} now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.`,
  gallery: gallery ?? defaultGallery(title, color),
  nextProjectSlug,
});

export const projects: Project[] = [
  {
    slug: "odara-management-group",
    title: "Odara Management Group",
    cat: "Logo & Branding",
    kind: "branding",
    tag: "Brand Identity",
    color: "from-fuchsia-500/50 to-violet-500/30",
    desc: "Corporate identity system for a management group.",
    role: "Brand Designer",
    tools: ["Illustrator", "Figma", "Photoshop"],
    year: "2025",
    client: "Odara Management Group",
    overview:
      "Odara Management Group required a more polished and trustworthy identity system that could support presentations, digital communications, and formal business collateral.",
    goals: [
      "Build a corporate identity that feels credible and modern.",
      "Create a logo system that works across print and digital touchpoints.",
      "Establish a color and typography direction that feels premium but practical.",
    ],
    impact: [
      { value: "1", label: "Primary identity" },
      { value: "6", label: "Core applications" },
      { value: "3", label: "Logo lockups" },
    ],
    focusAreas: [
      {
        title: "Brand Overview",
        text: "Clarified the group's positioning around professionalism, structure, and long-term trust.",
      },
      {
        title: "Design Direction",
        text: "Developed a cleaner corporate direction with sharper type, disciplined spacing, and restrained color use.",
      },
      {
        title: "Concept Development",
        text: "Explored multiple mark structures before refining the strongest symbol and wordmark relationship.",
      },
      {
        title: "Logo Meaning",
        text: "Shaped the final identity to communicate steadiness, leadership, and professional clarity.",
      },
      {
        title: "Color Palette",
        text: "Defined a palette that balances authority with approachability for both screen and print use.",
      },
      {
        title: "Typography",
        text: "Used a firm typographic system to support corporate communications and brand consistency.",
      },
      {
        title: "Brand Applications",
        text: "Extended the identity into stationery, presentation covers, and executive-facing mockups.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Reviewed competitor identities and collected references for more credible corporate visual language.",
      },
      {
        title: "Concept",
        text: "Built several logo directions and tested how each would behave in formal communication materials.",
      },
      {
        title: "Design",
        text: "Refined the symbol, typography system, and supporting brand assets into one cohesive system.",
      },
      {
        title: "Deliver",
        text: "Prepared a reusable identity package with placeholder applications for print and digital outputs.",
      },
    ],
    challenges: [
      {
        title: "Professional Without Feeling Cold",
        challenge: "The brand needed authority without becoming visually stiff or dated.",
        solution:
          "Used a sharper system with controlled contrast and cleaner spacing instead of relying on overly conservative visual tropes.",
      },
      {
        title: "Versatility",
        challenge: "The logo had to work across presentations, documents, and digital channels.",
        solution:
          "Built multiple lockups and spacing rules to keep the system usable in different contexts.",
      },
    ],
    outcome:
      "The final identity gives Odara Management Group a clearer and more professional visual foundation that can scale across core business touchpoints.",
    gallery: [
      {
        color: "from-fuchsia-500/50 to-violet-500/30",
        label: "Primary Mark",
        ratio: "square",
        note: "Placeholder for the final logo and alternate lockups.",
      },
      {
        color: "from-violet-500/40 to-indigo-500/30",
        label: "Brand Board",
        ratio: "wide",
        note: "Placeholder for palette, typography, and visual rules.",
      },
      {
        color: "from-pink-500/40 to-purple-500/30",
        label: "Stationery",
        ratio: "tall",
        note: "Placeholder for business card and document applications.",
      },
    ],
    nextProjectSlug: "lian-monley",
  },
  {
    slug: "lian-monley",
    title: "Lian Monley",
    cat: "Logo & Branding",
    kind: "branding",
    tag: "Personal Brand",
    color: "from-rose-500/50 to-pink-500/30",
    desc: "Personal branding system with a polished editorial feel.",
    role: "Brand Designer",
    tools: ["Illustrator", "Figma"],
    year: "2025",
    client: "Lian Monley",
    overview:
      "Lian Monley needed a more refined personal identity that could support social presence, presentation materials, and professional self-branding across digital touchpoints.",
    goals: [
      "Create a memorable personal identity with elegant positioning.",
      "Build a logo and visual language suited for online visibility.",
      "Support multiple applications from profile graphics to documents.",
    ],
    impact: [
      { value: "1", label: "Identity system" },
      { value: "5", label: "Brand assets" },
      { value: "4", label: "Mockup studies" },
    ],
    focusAreas: [
      {
        title: "Brand Overview",
        text: "Positioned the brand around confidence, polish, and an editorial sense of self-presentation.",
      },
      {
        title: "Design Direction",
        text: "Used a softer luxury direction with deliberate spacing, elegant type, and clean contrast.",
      },
      {
        title: "Concept Development",
        text: "Explored monograms, initials, and signature-based directions before refining the strongest route.",
      },
      {
        title: "Logo Meaning",
        text: "Built a mark that feels personal, polished, and easy to use across digital formats.",
      },
      {
        title: "Color Palette",
        text: "Selected a palette that feels sophisticated without being overly rigid.",
      },
      {
        title: "Typography",
        text: "Paired display and supporting type to keep the brand expressive but controlled.",
      },
      {
        title: "Brand Applications",
        text: "Applied the system to profile visuals, covers, and self-promotional assets.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Collected references from editorial and personal branding spaces to define a stronger visual tone.",
      },
      {
        title: "Concept",
        text: "Tested initials, wordmarks, and signature-inspired forms before narrowing the identity route.",
      },
      {
        title: "Design",
        text: "Built the logo, typography pairings, and digital-ready brand applications.",
      },
      {
        title: "Deliver",
        text: "Prepared a mini brand kit with placeholder social and presentation mockups.",
      },
    ],
    challenges: [
      {
        title: "Personal But Polished",
        challenge: "The identity needed to feel individual without looking informal.",
        solution:
          "Used stronger typographic control and a more restrained system rather than decorative branding tricks.",
      },
      {
        title: "Digital Adaptability",
        challenge: "The brand would live mostly across small digital touchpoints.",
        solution:
          "Prioritized clarity, clean spacing, and simplified applications for better consistency online.",
      },
    ],
    outcome:
      "The final system gives Lian Monley a cleaner and more intentional personal brand that can scale across public-facing materials.",
    gallery: [
      {
        color: "from-rose-500/50 to-pink-500/30",
        label: "Identity Mark",
        ratio: "square",
        note: "Placeholder for primary logo and personal monogram.",
      },
      {
        color: "from-pink-500/40 to-fuchsia-500/30",
        label: "Profile System",
        ratio: "wide",
        note: "Placeholder for social headers and branded profile assets.",
      },
      {
        color: "from-amber-300/30 to-rose-400/30",
        label: "Presentation Cover",
        ratio: "tall",
        note: "Placeholder for deck and personal introduction layouts.",
      },
    ],
    nextProjectSlug: "pietyl-lpg",
  },
  {
    slug: "pietyl-lpg",
    title: "Pietyl LPG",
    cat: "Logo & Branding",
    kind: "branding",
    tag: "Business Branding",
    color: "from-sky-500/50 to-blue-500/30",
    desc: "Brand identity for an LPG business.",
    role: "Brand Designer",
    tools: ["Illustrator", "Photoshop"],
    year: "2024",
    client: "Pietyl LPG",
    overview:
      "Pietyl LPG needed a stronger visual identity that could feel dependable, recognizable, and easier to apply across signage, uniforms, and business materials.",
    goals: [
      "Create a recognizable visual identity for a utility-focused business.",
      "Make the brand feel dependable and practical.",
      "Prepare a system that works well across physical applications.",
    ],
    impact: [
      { value: "1", label: "Business identity" },
      { value: "4", label: "Application mockups" },
      { value: "2", label: "Logo variations" },
    ],
    focusAreas: [
      {
        title: "Brand Overview",
        text: "Positioned the business around reliability, service trust, and local recognizability.",
      },
      {
        title: "Design Direction",
        text: "Built a stronger and more direct visual system suited to service branding and physical visibility.",
      },
      {
        title: "Concept Development",
        text: "Explored icon and wordmark combinations that could feel clear even at signage scale.",
      },
      {
        title: "Logo Meaning",
        text: "Used a more practical mark structure to support fast recognition and brand memorability.",
      },
      {
        title: "Color Palette",
        text: "Chose high-visibility colors suited to real-world application use.",
      },
      {
        title: "Brand Applications",
        text: "Extended the identity into vehicle, uniform, and signage mockups.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Reviewed category competitors and studied practical constraints of service-based branding.",
      },
      {
        title: "Concept",
        text: "Developed mark directions that prioritized clarity and direct recognition.",
      },
      {
        title: "Design",
        text: "Refined the final logo, palette, and utility-focused application set.",
      },
      {
        title: "Deliver",
        text: "Prepared a practical brand package with placeholder field-use mockups.",
      },
    ],
    challenges: [
      {
        title: "Utility Brand Perception",
        challenge:
          "The business needed to feel professional without overcomplicating the identity.",
        solution:
          "Focused on clarity, visibility, and simpler geometry instead of decorative branding language.",
      },
      {
        title: "Real-world Use",
        challenge: "The identity needed to survive physical applications and quick recognition.",
        solution:
          "Tested the logo against signage, uniforms, and branded operational materials early.",
      },
    ],
    outcome:
      "Pietyl LPG gained a more coherent and more visible brand identity suited to both business credibility and practical use.",
    gallery: [
      {
        color: "from-sky-500/50 to-blue-500/30",
        label: "Primary Identity",
        ratio: "square",
        note: "Placeholder for core logo and service lockups.",
      },
      {
        color: "from-blue-500/40 to-cyan-500/30",
        label: "Vehicle Mockup",
        ratio: "wide",
        note: "Placeholder for transport and field-use branding.",
      },
      {
        color: "from-cyan-400/40 to-sky-400/30",
        label: "Uniform Application",
        ratio: "tall",
        note: "Placeholder for apparel and service personnel mockups.",
      },
    ],
    nextProjectSlug: "blue-collar-builders",
  },
  {
    slug: "blue-collar-builders",
    title: "Blue Collar Builders",
    cat: "Logo & Branding",
    kind: "branding",
    tag: "Construction Identity",
    color: "from-indigo-500/50 to-sky-500/30",
    desc: "Brand identity for a builders and construction business.",
    role: "Brand Designer",
    tools: ["Illustrator", "Figma"],
    year: "2024",
    client: "Blue Collar Builders",
    overview:
      "Blue Collar Builders needed a visual identity that looked durable, professional, and trustworthy across contracts, uniforms, and construction-site branding.",
    goals: [
      "Create a strong and durable-looking brand mark.",
      "Support clear recognition across uniforms and equipment.",
      "Balance professionalism with a more grounded working-class tone.",
    ],
    impact: [
      { value: "1", label: "Identity system" },
      { value: "5", label: "Brand mockups" },
      { value: "3", label: "Logo explorations" },
    ],
    focusAreas: [
      {
        title: "Brand Overview",
        text: "Clarified the brand around trust, labor, and dependable construction service.",
      },
      {
        title: "Design Direction",
        text: "Built a more solid and industrial direction with stronger weight and direct visual language.",
      },
      {
        title: "Concept Development",
        text: "Explored builder-related geometry and structural mark ideas before refining the final route.",
      },
      {
        title: "Logo Meaning",
        text: "Used a mark that feels sturdy and practical while remaining easy to reproduce.",
      },
      {
        title: "Color Palette",
        text: "Defined a more grounded, professional palette suited to real-world site applications.",
      },
      {
        title: "Brand Applications",
        text: "Extended the identity into uniforms, equipment, and site-visible branding contexts.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Reviewed construction identities and mapped what signals credibility in the category.",
      },
      {
        title: "Concept",
        text: "Created heavier, more structural identity directions suited to construction branding.",
      },
      {
        title: "Design",
        text: "Refined the final mark, palette, and supporting business applications.",
      },
      {
        title: "Deliver",
        text: "Packaged the brand as a practical system with reusable mockup slots.",
      },
    ],
    challenges: [
      {
        title: "Strong Without Feeling Generic",
        challenge: "Construction branding can quickly collapse into predictable icon choices.",
        solution:
          "Pushed for more ownable structure and typographic control instead of relying on cliché symbols alone.",
      },
      {
        title: "Field Use",
        challenge: "The brand needed to remain readable in rugged, practical contexts.",
        solution: "Tested simplified forms and stronger contrast across physical use cases.",
      },
    ],
    outcome:
      "The identity now feels more established and durable, with clearer real-world applications across construction-related touchpoints.",
    gallery: [
      {
        color: "from-indigo-500/50 to-sky-500/30",
        label: "Brand Mark",
        ratio: "square",
        note: "Placeholder for primary builder identity and supporting lockups.",
      },
      {
        color: "from-sky-500/40 to-slate-500/30",
        label: "Equipment Branding",
        ratio: "wide",
        note: "Placeholder for on-site and vehicle branding.",
      },
      {
        color: "from-slate-400/40 to-indigo-500/30",
        label: "Uniform System",
        ratio: "tall",
        note: "Placeholder for apparel and contractor-facing brand use.",
      },
    ],
    nextProjectSlug: "trichomend-plus",
  },
  {
    slug: "trichomend-plus",
    title: "Trichomend+",
    cat: "Logo & Branding",
    kind: "branding",
    tag: "Product Identity",
    color: "from-emerald-500/50 to-teal-500/30",
    desc: "Brand identity direction for a treatment-focused product.",
    role: "Brand Designer",
    tools: ["Illustrator", "Figma", "Photoshop"],
    year: "2025",
    client: "Trichomend+",
    overview:
      "Trichomend+ needed a cleaner and more credible product-facing identity that could feel science-led, professional, and consumer-friendly at the same time.",
    goals: [
      "Create a product identity that feels credible and clear.",
      "Support packaging and digital marketing applications.",
      "Balance wellness cues with a more science-forward presentation.",
    ],
    impact: [
      { value: "1", label: "Product identity" },
      { value: "4", label: "Application studies" },
      { value: "2", label: "Lockup formats" },
    ],
    focusAreas: [
      {
        title: "Brand Overview",
        text: "Defined a stronger health-product position built around trust, efficacy, and polish.",
      },
      {
        title: "Design Direction",
        text: "Used a cleaner, more clinical-leaning system balanced with enough softness to stay approachable.",
      },
      {
        title: "Concept Development",
        text: "Explored logotype and symbol routes that would feel product-ready across packaging and campaigns.",
      },
      {
        title: "Logo Meaning",
        text: "Built a mark that communicates progress, care, and treatment structure.",
      },
      {
        title: "Color Palette",
        text: "Chose fresher but controlled tones to support product messaging and shelf clarity.",
      },
      {
        title: "Brand Applications",
        text: "Extended the system into packaging and branded marketing visuals to prove usability.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Reviewed adjacent health and treatment product brands to find the right balance between science and accessibility.",
      },
      {
        title: "Concept",
        text: "Developed typographic and icon-led routes aimed at stronger credibility and cleaner packaging use.",
      },
      {
        title: "Design",
        text: "Refined the final mark, palette, and applications into a concise product identity system.",
      },
      {
        title: "Deliver",
        text: "Prepared presentation-ready placeholders for packaging, promo visuals, and product-facing materials.",
      },
    ],
    challenges: [
      {
        title: "Science and Warmth",
        challenge:
          "The product needed to feel credible without becoming visually cold or overly clinical.",
        solution:
          "Built a more controlled system that used cleaner geometry with approachable color and spacing.",
      },
      {
        title: "Packaging Readiness",
        challenge: "The identity needed to hold up well on packaging and marketing visuals.",
        solution:
          "Tested the mark and system against product-oriented layouts early in the process.",
      },
    ],
    outcome:
      "Trichomend+ now has a more polished product identity direction that can scale into packaging and campaign assets.",
    gallery: [
      {
        color: "from-emerald-500/50 to-teal-500/30",
        label: "Product Mark",
        ratio: "square",
        note: "Placeholder for core product mark and supporting lockups.",
      },
      {
        color: "from-teal-500/40 to-cyan-500/30",
        label: "Packaging Concept",
        ratio: "tall",
        note: "Placeholder for bottle, box, or treatment packaging visuals.",
      },
      {
        color: "from-green-400/40 to-emerald-500/30",
        label: "Promo Layout",
        ratio: "wide",
        note: "Placeholder for digital campaign or product promo mockups.",
      },
    ],
    nextProjectSlug: "adoptify",
  },
  {
    slug: "adoptify",
    title: "Adoptify",
    cat: "UI/UX Design",
    kind: "uiux",
    tag: "App Design",
    color: "from-violet-500/50 to-indigo-500/30",
    desc: "UI/UX concept for an adoption-focused digital platform.",
    role: "UI/UX Designer",
    tools: ["Figma", "FigJam", "Notion"],
    year: "2025",
    client: "Concept Project",
    overview:
      "Adoptify is a product design concept centered on making adoption journeys clearer, friendlier, and easier to trust across mobile and web touchpoints.",
    goals: [
      "Design a friendlier adoption experience that feels safe and organized.",
      "Simplify the path from browsing to inquiry and follow-through.",
      "Create a reusable interface language for listings, profiles, and communication flows.",
    ],
    impact: [
      { value: "45+", label: "Screens designed" },
      { value: "5", label: "Core flows" },
      { value: "1", label: "Reusable system" },
    ],
    focusAreas: [
      {
        title: "Research",
        text: "Mapped emotional and practical pain points in adoption journeys to inform tone and interface decisions.",
      },
      {
        title: "User Flow",
        text: "Connected browse, filter, profile review, inquiry, and status-tracking flows into one clearer system.",
      },
      {
        title: "Wireframes",
        text: "Validated the listing and profile structure before introducing polished UI treatments.",
      },
      {
        title: "Final UI",
        text: "Built a softer and more human interface system focused on trust, readability, and supportive pacing.",
      },
      {
        title: "Prototype",
        text: "Linked the critical adoption steps into a realistic experience for review and testing.",
      },
      {
        title: "Components",
        text: "Created reusable cards, status indicators, and messaging patterns for future growth.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Reviewed adoption platform patterns and user frustrations to identify trust gaps and navigation pain points.",
      },
      {
        title: "Concept",
        text: "Built a simpler content hierarchy around listings, eligibility cues, and action steps.",
      },
      {
        title: "Design",
        text: "Developed the end-to-end interface flow, reusable UI patterns, and polished screen designs.",
      },
      {
        title: "Deliver",
        text: "Prepared a structured case study and placeholder gallery areas for future production visuals.",
      },
    ],
    challenges: [
      {
        title: "Emotional Clarity",
        challenge:
          "Adoption platforms need to feel supportive without overwhelming users with dense information.",
        solution:
          "Structured content around progressive disclosure and made critical actions more visible and reassuring.",
      },
      {
        title: "Trust in a Digital Flow",
        challenge: "Users needed clearer signals around process legitimacy and next steps.",
        solution:
          "Used profile clarity, status structure, and guided inquiry flows to reduce uncertainty.",
      },
    ],
    outcome:
      "Adoptify demonstrates a more compassionate and more organized product direction for adoption-centered digital experiences.",
    gallery: [
      {
        color: "from-violet-500/50 to-indigo-500/30",
        label: "Listing Flow",
        ratio: "wide",
        note: "Placeholder for browse, filter, and profile overview screens.",
      },
      {
        color: "from-indigo-500/40 to-purple-500/30",
        label: "Profile Detail",
        ratio: "square",
        note: "Placeholder for animal or applicant profile layouts.",
      },
      {
        color: "from-purple-500/40 to-pink-500/30",
        label: "Inquiry Journey",
        ratio: "square",
        note: "Placeholder for application and follow-up interface states.",
      },
    ],
    figmaEmbed: {
      shareUrl: "https://www.figma.com/design/ld5OWQ10gzn8veCSgct4SK/Adoptify?node-id=113-3016",
      embedUrl:
        "https://embed.figma.com/design/ld5OWQ10gzn8veCSgct4SK/Adoptify?node-id=113-3016&embed-host=share",
      title: "Adoptify interactive workspace",
      note: "Explore the Adoptify screens, flows, and prototype structure inside the embedded Figma file.",
    },
    nextProjectSlug: "pietyl-management-system",
  },
  {
    slug: "pietyl-management-system",
    title: "Pietyl DigiLPG",
    imageTitle: "Pietyl Management System",
    directoryTitle: "Pietyl DigiLPG",
    cat: "UI/UX Design",
    categories: ["Web Development"],
    kind: "uiux",
    tag: "Management System",
    color: "from-sky-500/50 to-indigo-500/30",
    desc: "System design for a business management platform.",
    role: "Product Designer",
    tools: ["Figma", "FigJam"],
    year: "2025",
    client: "Pietyl DigiLPG",
    overview:
      "Pietyl Management System is a structured interface system designed to support internal operations, records, workflow management, and monitoring inside a business environment.",
    goals: [
      "Organize complex operations into a clearer dashboard experience.",
      "Make monitoring, records, and workflow tracking easier to manage.",
      "Build a system that can scale with added modules over time.",
    ],
    impact: [
      { value: "8", label: "Modules planned" },
      { value: "50+", label: "Interface screens" },
      { value: "1", label: "System foundation" },
    ],
    focusAreas: [
      {
        title: "Research",
        text: "Mapped operational tasks and user roles to decide what information mattered most in the core system view.",
      },
      {
        title: "User Flow",
        text: "Structured movement between dashboard, records, workflows, and monitoring sections.",
      },
      {
        title: "Wireframes",
        text: "Explored low-fidelity structures to reduce complexity before visual refinement.",
      },
      {
        title: "Final UI",
        text: "Created a cleaner management environment with stronger hierarchy and reusable modules.",
      },
      {
        title: "Prototype",
        text: "Connected the core flows to demonstrate navigation logic and task-based transitions.",
      },
      {
        title: "Components",
        text: "Built reusable tables, form patterns, cards, and status modules for scale.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Observed system needs and grouped them into clearer operational categories.",
      },
      {
        title: "Concept",
        text: "Defined a management structure that reduced menu friction and improved task visibility.",
      },
      {
        title: "Design",
        text: "Built dashboards, monitoring views, record systems, and reusable operational UI patterns.",
      },
      {
        title: "Deliver",
        text: "Prepared a modular case study with placeholder screens for future system expansion.",
      },
    ],
    challenges: [
      {
        title: "Dense Operational Content",
        challenge: "The system needed to support many functions without becoming visually heavy.",
        solution:
          "Used modular grouping and clearer hierarchy to separate tasks and reduce cognitive load.",
      },
      {
        title: "Scalable Structure",
        challenge: "The system needed to remain flexible as more business modules were added.",
        solution:
          "Designed reusable layouts and navigation patterns instead of solving each view separately.",
      },
    ],
    outcome:
      "The resulting concept gives Pietyl a more scalable management-system direction built around clarity and long-term usability.",
    gallery: [
      {
        color: "from-sky-500/50 to-indigo-500/30",
        label: "Dashboard",
        ratio: "wide",
        note: "Placeholder for overview metrics and key actions.",
      },
      {
        color: "from-indigo-500/40 to-blue-500/30",
        label: "Records Module",
        ratio: "square",
        note: "Placeholder for lists, forms, and record-detail screens.",
      },
      {
        color: "from-cyan-500/40 to-sky-500/30",
        label: "Workflow Tracking",
        ratio: "square",
        note: "Placeholder for operational status and monitoring views.",
      },
    ],
    figmaEmbed: {
      shareUrl:
        "https://www.figma.com/design/7bbWU9ch4rwaouInhEarZ6/Pietyl-DigiLPG?node-id=1-12331",
      embedUrl:
        "https://embed.figma.com/design/7bbWU9ch4rwaouInhEarZ6/Pietyl-DigiLPG?node-id=1-12331&embed-host=share",
      title: "Pietyl DigiLPG interactive workspace",
      note: "Explore the Pietyl DigiLPG website view and interface concept directly inside Figma.",
    },
    nextProjectSlug: "dost-laon",
  },
  {
    slug: "dost-laon",
    title: "DOST Laon",
    cat: "UI/UX Design",
    kind: "uiux",
    tag: "Platform Design",
    color: "from-blue-500/50 to-cyan-500/30",
    desc: "UI/UX work for a DOST-centered digital platform concept.",
    role: "UI/UX Designer",
    tools: ["Figma", "FigJam", "Miro"],
    year: "2025",
    client: "DOST Laon",
    overview:
      "DOST Laon focuses on building a more structured and accessible digital experience around information, programs, or public-facing services tied to the DOST context.",
    goals: [
      "Improve clarity and usability of service-related information.",
      "Create a more accessible interface for diverse users.",
      "Organize content and flows in a more scalable system.",
    ],
    impact: [
      { value: "1", label: "Core platform concept" },
      { value: "40+", label: "Interface layouts" },
      { value: "3", label: "Primary user flows" },
    ],
    focusAreas: [
      {
        title: "Research",
        text: "Reviewed public-sector information patterns and usability issues around clarity, access, and structure.",
      },
      {
        title: "User Flow",
        text: "Mapped key navigation and service flows to reduce confusion and dead-end states.",
      },
      {
        title: "Wireframes",
        text: "Organized large content structures into clearer low-fidelity page systems.",
      },
      {
        title: "Final UI",
        text: "Built a cleaner and more accessible interface language with stronger hierarchy and structure.",
      },
      {
        title: "Prototype",
        text: "Connected service pages and informational flows to validate user understanding.",
      },
      {
        title: "Components",
        text: "Created reusable interface sections for content blocks, navigation, and service actions.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Analyzed public information flows and user pain points around finding relevant content quickly.",
      },
      {
        title: "Concept",
        text: "Defined a cleaner information architecture focused on better service discoverability.",
      },
      {
        title: "Design",
        text: "Built interface layouts, content structures, and reusable page sections for core flows.",
      },
      {
        title: "Deliver",
        text: "Prepared structured screens and placeholder gallery areas for future refinement.",
      },
    ],
    challenges: [
      {
        title: "Information Overload",
        challenge: "Public-facing systems can become dense and difficult to scan.",
        solution: "Used stronger hierarchy, chunked content, and clearer pathing between sections.",
      },
      {
        title: "Accessibility and Structure",
        challenge: "The experience needed to support clarity for a broad audience base.",
        solution: "Focused on readable UI patterns and more predictable information flow.",
      },
    ],
    outcome:
      "DOST Laon shows a more accessible and more structured direction for an information-heavy digital platform.",
    gallery: [
      {
        color: "from-blue-500/50 to-cyan-500/30",
        label: "Landing View",
        ratio: "wide",
        note: "Placeholder for homepage and access-entry layout.",
      },
      {
        color: "from-cyan-500/40 to-sky-500/30",
        label: "Service Pages",
        ratio: "square",
        note: "Placeholder for service and program detail screens.",
      },
      {
        color: "from-indigo-500/40 to-cyan-500/30",
        label: "Navigation System",
        ratio: "square",
        note: "Placeholder for menus, page structure, and content modules.",
      },
    ],
    figmaEmbed: {
      shareUrl: "https://www.figma.com/design/7nHC4DDibMbUwZdo0MDSvV/DOST-LAON?node-id=0-1",
      embedUrl:
        "https://embed.figma.com/design/7nHC4DDibMbUwZdo0MDSvV/DOST-LAON?node-id=0-1&embed-host=share",
      title: "DOST LAON interactive workspace",
      note: "Review the DOST Project LAON interface system, frames, and navigation direction inside Figma.",
    },
    nextProjectSlug: "cosmic-remedies-by-sia",
  },
  {
    slug: "cosmic-remedies-by-sia",
    title: "Cosmic Remedies by Sia",
    cat: "UI/UX Design",
    categories: ["Web Development"],
    kind: "frontend",
    tag: "UI + Front End",
    color: "from-violet-500/50 to-cyan-500/30",
    desc: "A digital product and web experience for Cosmic Remedies by Sia.",
    role: "UI/UX Designer and Web Developer",
    tools: ["Figma", "React", "Tailwind CSS"],
    year: "2025",
    client: "Cosmic Remedies by Sia",
    overview:
      "Cosmic Remedies by Sia combines interface direction and web implementation for a more immersive digital experience rooted in storytelling, product presentation, and responsive build quality.",
    goals: [
      "Design a cohesive digital experience that matches the brand's unique personality.",
      "Translate the interface into a working responsive web build.",
      "Keep the experience polished across both design and implementation layers.",
    ],
    impact: [
      { value: "1", label: "Design-to-build flow" },
      { value: "100%", label: "Responsive coverage" },
      { value: "20+", label: "Implemented sections" },
    ],
    focusAreas: [
      {
        title: "Layout Strategy",
        text: "Defined the page rhythm, content structure, and sequencing before development started.",
      },
      {
        title: "Page Sections",
        text: "Built a flexible composition for hero, product, story, and CTA sections.",
      },
      {
        title: "Responsive Design",
        text: "Adjusted spacing, hierarchy, and visual treatment across desktop and mobile breakpoints.",
      },
      {
        title: "Animation Ideas",
        text: "Added controlled motion and transitions to preserve personality without hurting readability.",
      },
      {
        title: "Final Screens",
        text: "Created high-fidelity UI before translating the work into a web build.",
      },
      {
        title: "Web Build",
        text: "Implemented the interface using reusable components and responsive web structure.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Reviewed the brand direction and audience mood to shape both interface and implementation decisions.",
      },
      {
        title: "Concept",
        text: "Defined the visual narrative and translated it into a buildable page system.",
      },
      {
        title: "Design",
        text: "Created the final screens, motion direction, and reusable design patterns.",
      },
      {
        title: "Deliver",
        text: "Implemented the front end with placeholder assets and reusable sections ready for iteration.",
      },
    ],
    challenges: [
      {
        title: "Design to Development Consistency",
        challenge:
          "Maintaining the intended mood while translating the interface into code required careful simplification.",
        solution:
          "Used reusable section logic and controlled motion so the build preserved the design language.",
      },
      {
        title: "Atmosphere Across Breakpoints",
        challenge:
          "The experience needed to remain expressive on smaller screens without becoming cluttered.",
        solution:
          "Restructured sections responsively and simplified visual density for mobile states.",
      },
    ],
    outcome:
      "Cosmic Remedies by Sia stands as both a UI/UX project and a web implementation case, showing continuity from concept to working experience.",
    gallery: [
      {
        color: "from-violet-500/50 to-cyan-500/30",
        label: "Hero Section",
        ratio: "wide",
        note: "Placeholder for landing hero design and implementation state.",
      },
      {
        color: "from-cyan-500/40 to-indigo-500/30",
        label: "Product Layout",
        ratio: "square",
        note: "Placeholder for product or content section screens.",
      },
      {
        color: "from-indigo-500/40 to-purple-500/30",
        label: "Responsive Build",
        ratio: "square",
        note: "Placeholder for mobile and desktop implementation comparisons.",
      },
    ],
    nextProjectSlug: "umunity",
  },
  {
    slug: "umunity",
    title: "UMunity",
    cat: "UI/UX Design",
    categories: ["Web Development"],
    kind: "frontend",
    tag: "UI/UX + Web System",
    color: "from-cyan-500/50 to-blue-500/30",
    desc: "A school organization management system shaped in Figma and translated into a responsive web build.",
    role: "UI/UX Designer and Web Developer",
    tools: ["Figma", "React", "Tailwind CSS", "TypeScript", "Miro", "Notion"],
    year: "2025",
    client: "UMunity",
    overview:
      "UMunity is a school organization management system focused on events, communication, records, and coordination. This merged case study covers both the Figma product design and the responsive web implementation for student members and organization officers.",
    goals: [
      "Simplify school organization workflows for members and officers.",
      "Design a dashboard and module system that supports faster task completion.",
      "Translate the approved interface into a responsive and reusable web system.",
    ],
    impact: [
      { value: "6", label: "Core modules" },
      { value: "50+", label: "Designed and built states" },
      { value: "2", label: "Design and code phases" },
    ],
    focusAreas: [
      {
        title: "Research",
        text: "Mapped common student-organization pain points around announcements, records, and task coordination.",
      },
      {
        title: "User Flow",
        text: "Connected login, dashboard, event, records, and communication flows into one structured system.",
      },
      {
        title: "Figma System",
        text: "Created the dashboard, modules, reusable components, and prototype logic before implementation.",
      },
      {
        title: "Web Build",
        text: "Translated the interface into React, Tailwind CSS, and TypeScript with reusable screen patterns.",
      },
      {
        title: "Responsive Design",
        text: "Adjusted navigation, spacing, and card density to preserve usability on smaller screens.",
      },
      {
        title: "Component Structure",
        text: "Built repeatable panels, cards, tables, and navigation modules to support future scale.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Observed school organization workflows and identified repeated friction in coordination tasks.",
      },
      {
        title: "Concept",
        text: "Defined a system structure that made officer and member actions easier to find and complete.",
      },
      {
        title: "Design",
        text: "Built the dashboard, module layouts, reusable interface system, and Figma prototype direction.",
      },
      {
        title: "Implement",
        text: "Translated the visual system into responsive web screens with reusable components.",
      },
      {
        title: "Refine",
        text: "Adjusted responsiveness, spacing, and interaction states to keep the system usable across breakpoints.",
      },
    ],
    challenges: [
      {
        title: "Multi-role Complexity",
        challenge:
          "The system had to support both student members and organization officers with different needs.",
        solution:
          "Built a clearer dashboard and module structure with more readable role-oriented actions.",
      },
      {
        title: "Design to Development Consistency",
        challenge:
          "The web build needed to preserve the Figma system without creating inconsistent one-off screens.",
        solution:
          "Relied on repeatable layout patterns, reusable components, and responsive rules shared across modules.",
      },
    ],
    outcome:
      "UMunity now reads as one complete design-to-build case study, showing both the Figma system and the web implementation layer for a student organization management platform.",
    gallery: [
      {
        color: "from-cyan-500/50 to-blue-500/30",
        label: "Figma Dashboard",
        imageLabel: "Dashboard",
        ratio: "wide",
        note: "Main dashboard direction from the product design phase.",
      },
      {
        color: "from-blue-500/40 to-indigo-500/30",
        label: "Module Screens",
        ratio: "square",
        note: "Records, events, and announcement module screens for student workflows.",
      },
      {
        color: "from-indigo-500/40 to-cyan-500/30",
        label: "Responsive Build",
        imageTitle: "UMunity School Org Management System",
        imageLabel: "Responsive Screens",
        ratio: "square",
        note: "Mobile and desktop implementation states from the web phase.",
      },
      {
        color: "from-cyan-500/40 to-sky-500/30",
        label: "Component Set",
        imageTitle: "UMunity School Org Management System",
        ratio: "wide",
        note: "Reusable tables, cards, forms, and navigation patterns in code.",
      },
    ],
    figmaEmbed: {
      shareUrl: "https://www.figma.com/design/zw7EIzr4RSkhabog08oVBK/UMUnuty?node-id=13-350",
      embedUrl:
        "https://embed.figma.com/design/zw7EIzr4RSkhabog08oVBK/UMUnuty?node-id=13-350&embed-host=share",
      title: "UMunity interactive workspace",
      note: "Explore the UMunity Figma system and interface screens inside the embedded workspace.",
    },
    nextProjectSlug: "umsdc-publication-materials-and-assets",
  },
  {
    slug: "umsdc-publication-materials-and-assets",
    title: "UMSDC",
    imageTitle: "UMSDC Publication Materials and Assets",
    directoryTitle: "UMSDC",
    cat: "Social Media Graphics",
    categories: ["Creative Assets"],
    kind: "gallery",
    tag: "Social Media Asset System",
    color: "from-pink-500/50 to-orange-400/30",
    desc: "Social media graphics and creative assets for UMSDC.",
    role: "Social Media Graphic Designer",
    tools: ["Figma", "Photoshop", "Canva"],
    year: "2024",
    client: "UMSDC",
    overview:
      "UMSDC Social Media Graphics and Creative Assets gathers social posts, organization graphics, event visuals, and campaign-ready assets under one reusable visual system.",
    goals: [
      "Support organization communication with clear and cohesive social media graphics.",
      "Create reusable assets for recurring announcements and campaigns.",
      "Keep the materials flexible enough for fast student-organization workflows.",
    ],
    impact: [
      { value: "15+", label: "Assets produced" },
      { value: "1", label: "Visual system" },
      { value: "5", label: "Recurring formats" },
    ],
    focusAreas: [
      {
        title: "Campaign Goal",
        text: "Defined how the social media graphics should support visibility, announcement clarity, and event participation.",
      },
      {
        title: "Visual Direction",
        text: "Built a graphic language that could work across org posts, event graphics, and digital campaigns.",
      },
      {
        title: "Typography",
        text: "Used headline-led hierarchy to improve quick reading and visual consistency.",
      },
      {
        title: "Layout System",
        text: "Prepared repeatable templates for announcements, recaps, and static campaign assets.",
      },
      {
        title: "Final Assets",
        text: "Delivered a stronger and more reusable creative asset system for organization use.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Reviewed the organization's communication needs and previous asset inconsistencies.",
      },
      {
        title: "Concept",
        text: "Defined a more flexible visual direction that could scale across multiple post formats.",
      },
      {
        title: "Design",
        text: "Created reusable social graphics, event visuals, and announcement compositions.",
      },
      {
        title: "Deliver",
        text: "Packaged the system with placeholder examples for future org campaigns and updates.",
      },
    ],
    challenges: [
      {
        title: "Fast Content Turnaround",
        challenge:
          "Student organization timelines often required quick asset creation with limited revision windows.",
        solution:
          "Built more reusable structures so new outputs could be produced faster without losing consistency.",
      },
      {
        title: "Cross-format Consistency",
        challenge:
          "The materials needed to remain cohesive across posts, story sizes, and campaign assets.",
        solution: "Used a defined visual system and recurring type behavior across all formats.",
      },
    ],
    outcome:
      "UMSDC now has a cleaner, more reusable social media graphics system for organization materials and digital assets.",
    gallery: [
      {
        color: "from-pink-500/50 to-orange-400/30",
        label: "Announcement Asset",
        ratio: "tall",
        note: "Placeholder for social media post and key announcement layout.",
      },
      {
        color: "from-rose-500/40 to-pink-500/30",
        label: "Campaign Set",
        ratio: "wide",
        note: "Placeholder for event or campaign visual system.",
      },
      {
        color: "from-orange-400/40 to-amber-400/30",
        label: "Org Graphics",
        ratio: "wide",
        note: "Placeholder for recurring organization assets and social support materials.",
      },
    ],
    nextProjectSlug: "eat-well-live-well-nutrition-ebook",
  },
  {
    slug: "eat-well-live-well-nutrition-ebook",
    title: "Eat Well, Live Well Nutrition eBook Writing and Cover Design",
    cat: "Writing / VA",
    categoryTitles: {
      "Writing / VA": "Eat Well, Live Well Nutrition eBook",
    },
    kind: "writing",
    tag: "eBook Writing",
    color: "from-emerald-400/50 to-lime-500/30",
    desc: "Writing and cover design for a nutrition-focused eBook.",
    role: "Content Writer and Layout Designer",
    tools: ["Google Docs", "Canva", "Figma"],
    year: "2024",
    client: "Nutrition eBook Project",
    overview:
      "This project combined eBook writing and cover design for a wellness-focused digital publication centered on nutrition, healthier habits, and accessible educational content.",
    goals: [
      "Write content that feels useful, clear, and approachable for readers.",
      "Create a cover design that supports the topic with stronger visual appeal.",
      "Organize the eBook into a readable and well-paced format.",
    ],
    impact: [
      { value: "1", label: "Completed eBook" },
      { value: "1", label: "Cover design" },
      { value: "8+", label: "Structured sections" },
    ],
    focusAreas: [
      {
        title: "Task Overview",
        text: "Combined educational writing with a simple but polished publication cover direction.",
      },
      {
        title: "Workflow",
        text: "Planned the chapter structure, key topics, drafting sequence, and cover-design process together.",
      },
      {
        title: "Content Samples",
        text: "Developed clear sections, summaries, and practical nutrition guidance for readers.",
      },
      {
        title: "Organization Process",
        text: "Structured the content to keep the eBook readable and balanced from start to finish.",
      },
      {
        title: "Final Deliverables",
        text: "Delivered both the written content and a supporting cover design as one complete package.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Reviewed reliable nutrition references and benchmarked how similar eBooks structure educational content.",
      },
      {
        title: "Concept",
        text: "Mapped the writing flow, section order, and visual tone of the cover before production.",
      },
      {
        title: "Design",
        text: "Drafted the content and created the eBook cover with a clearer reader-facing presentation.",
      },
      {
        title: "Deliver",
        text: "Organized the work into a polished eBook structure with placeholder visuals for internal pages and cover use.",
      },
    ],
    challenges: [
      {
        title: "Educational Clarity",
        challenge:
          "The information needed to stay accurate while still being approachable and easy to read.",
        solution:
          "Used simpler phrasing, tighter section flow, and more practical organization throughout the writing.",
      },
      {
        title: "Writing and Design Alignment",
        challenge: "The cover needed to feel connected to the tone of the written content.",
        solution:
          "Treated the visual direction as part of the same communication system rather than a separate task.",
      },
    ],
    outcome:
      "The final output delivered a clearer educational eBook experience with both content and cover design working together cohesively.",
    gallery: [],
    flipbookEmbed: {
      src: "https://heyzine.com/flip-book/751c8a6bdc.html",
      title: "Eat Well, Live Well Nutrition eBook flipbook",
    },
    nextProjectSlug: "thriving-mind-mental-wellness-ebook",
  },
  {
    slug: "thriving-mind-mental-wellness-ebook",
    title: "Thriving Minds: Understanding Your Mental Health Journey",
    imageTitle: "Thriving Mind Mental Wellness eBook Writing and Cover Design",
    directoryTitle: "Thriving Minds: Understanding Your Mental Health Journey",
    cat: "Writing / VA",
    categoryTitles: {
      "Writing / VA": "Thriving Minds: Understanding Your Mental Health Journey",
    },
    kind: "writing",
    tag: "Mental Wellness Guide",
    color: "from-violet-500/50 to-pink-500/30",
    desc: "A beginner-friendly mental wellness guide about awareness, coping skills, self-management, and personal growth.",
    role: "Content Writer and Layout Designer",
    tools: ["Google Docs", "Canva", "Figma"],
    year: "2024",
    client: "Mental Wellness eBook Project",
    overview:
      "Thriving Minds: Understanding Your Mental Health Journey is a comprehensive mental wellness guide designed to educate readers about mental health from awareness to self-management and personal growth. The book follows a structured progression that helps readers understand mental health challenges, develop practical coping skills, and build a sustainable wellness plan.",
    goals: [
      "Educate readers on mental health from basic awareness to practical self-management.",
      "Explain stress, anxiety, depression, sleep, mindfulness, resilience, relationships, lifestyle habits, and professional support in accessible language.",
      "Guide readers toward a personalized wellness plan built around self-awareness, self-care, resilience, and growth.",
    ],
    impact: [
      { value: "11", label: "Learning sections" },
      { value: "9", label: "Educational chapters" },
      { value: "1", label: "Wellness plan" },
    ],
    focusAreas: [
      {
        title: "Mental Health Awareness",
        text: "Introduced mental well-being, common misconceptions, and the role mental health plays in overall quality of life.",
      },
      {
        title: "Stress and Anxiety Education",
        text: "Explained the mind-body connection, stress triggers, anxiety symptoms, and practical relaxation techniques.",
      },
      {
        title: "Depression and Recovery",
        text: "Covered warning signs, contributing factors, treatment pathways, support systems, and the message that recovery is possible.",
      },
      {
        title: "Daily Wellness Habits",
        text: "Connected sleep, mindfulness, nutrition, exercise, and social connection to emotional balance and resilience.",
      },
      {
        title: "Personal Growth Plan",
        text: "Closed the guide with self-care planning, achievable wellness goals, and sustainable habits for long-term mental well-being.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Reviewed mental wellness education themes and shaped the language to feel informative, supportive, and non-stigmatizing.",
      },
      {
        title: "Structure",
        text: "Organized the eBook from awareness and core mental health challenges into coping skills and a long-term wellness plan.",
      },
      {
        title: "Writing",
        text: "Drafted chapters on stress, anxiety, depression, sleep, mindfulness, resilience, relationships, nutrition, exercise, and professional help.",
      },
      {
        title: "Deliver",
        text: "Prepared the final written content with a calm cover direction that matched the guide's educational and wellness-focused tone.",
      },
    ],
    challenges: [
      {
        title: "Sensitive Educational Tone",
        challenge: "Mental wellness content needed to be clear and helpful without sounding clinical, alarming, or dismissive.",
        solution:
          "Used plain, supportive, non-stigmatizing language and kept the pacing calm throughout the guide.",
      },
      {
        title: "Broad Topic Scope",
        challenge: "The eBook covered many mental health topics, which could become overwhelming without a strong sequence.",
        solution:
          "Built a chapter progression that moves from understanding challenges to practicing coping skills and building daily habits.",
      },
      {
        title: "Actionable Ending",
        challenge: "The guide needed to leave readers with next steps instead of only general awareness.",
        solution:
          "Ended with a personalized wellness plan focused on self-care routines, achievable goals, and sustainable mental health habits.",
      },
    ],
    outcome:
      "The final eBook became a beginner-friendly mental health education and self-help resource that combines psychological awareness, scientific understanding, and practical wellness strategies. Its central message is that mental health is an ongoing journey of self-awareness, self-care, resilience, and growth.",
    gallery: [],
    flipbookEmbed: {
      src: "https://heyzine.com/flip-book/5331d1f97c.html",
      title: "Thriving Minds: Understanding Your Mental Health Journey flipbook",
    },
    nextProjectSlug: "odara-management-group",
  },
  createSimpleProject({
    slug: "sidlac-co-branding",
    title: "Sidlac Co.",
    cat: "Logo & Branding",
    kind: "branding",
    tag: "Logo & Branding",
    desc: "Logo and brand identity direction for Sidlac Co.",
    role: "Brand Designer",
    tools: ["Illustrator", "Figma"],
    color: "from-amber-400/45 to-orange-500/30",
    year: "2025",
  }),
  createSimpleProject({
    slug: "adoptify-logo",
    title: "Adoptify",
    directoryTitle: "Adoptify",
    cat: "Logo & Branding",
    kind: "branding",
    categoryLabels: { "Logo & Branding": "Logo" },
    tag: "Logo",
    desc: "Logo direction for the Adoptify product concept.",
    role: "Logo Designer",
    tools: ["Illustrator", "Figma"],
    color: "from-violet-500/50 to-indigo-500/30",
    year: "2025",
  }),
  createSimpleProject({
    slug: "pietyl-management-system-logo",
    title: "Pietyl Management System",
    directoryTitle: "Pietyl Management System",
    cat: "Logo & Branding",
    kind: "branding",
    tag: "Logo & Branding",
    desc: "Logo and brand identity direction for the Pietyl management system.",
    role: "Brand Designer",
    tools: ["Illustrator", "Figma"],
    color: "from-sky-500/50 to-indigo-500/30",
    year: "2025",
  }),
  createSimpleProject({
    slug: "dost-laon-logo",
    title: "DOST Laon",
    directoryTitle: "DOST Laon",
    cat: "Logo & Branding",
    kind: "branding",
    categoryLabels: { "Logo & Branding": "Logo" },
    tag: "Logo",
    desc: "Logo direction for the DOST Laon platform concept.",
    role: "Logo Designer",
    tools: ["Illustrator", "Figma"],
    color: "from-blue-500/50 to-cyan-500/30",
    year: "2025",
  }),
  createSimpleProject({
    slug: "cosmic-remedies-by-sia-logo",
    title: "Cosmic Remedies by Sia",
    directoryTitle: "Cosmic Remedies by Sia",
    cat: "Logo & Branding",
    kind: "branding",
    categoryLabels: { "Logo & Branding": "Logo" },
    tag: "Logo",
    desc: "Logo direction for Cosmic Remedies by Sia.",
    role: "Logo Designer",
    tools: ["Illustrator", "Figma"],
    color: "from-violet-500/50 to-cyan-500/30",
    year: "2025",
  }),
  createSimpleProject({
    slug: "umunity-logo",
    title: "UMunity",
    directoryTitle: "UMunity",
    cat: "Logo & Branding",
    kind: "branding",
    categoryLabels: { "Logo & Branding": "Logo" },
    tag: "Logo",
    desc: "Logo direction for the UMunity school organization management system.",
    role: "Logo Designer",
    tools: ["Illustrator", "Figma"],
    color: "from-cyan-500/50 to-blue-500/30",
    year: "2025",
  }),
  createSimpleProject({
    slug: "blockchain-campus-conference-2024",
    title: "Blockchain Campus Conference 2024",
    cat: "Social Media Graphics",
    tag: "Event Graphics",
    desc: "Social media graphics for Blockchain Campus Conference 2024.",
    role: "Social Media Graphic Designer",
    color: "from-indigo-500/50 to-cyan-500/30",
    year: "2024",
  }),
  createSimpleProject({
    slug: "sidlac-co-social-media",
    title: "Sidlac Co.",
    directoryTitle: "Sidlac Co.",
    cat: "Social Media Graphics",
    tag: "Social Media Graphics",
    desc: "Social media graphics and campaign layouts for Sidlac Co.",
    role: "Social Media Graphic Designer",
    color: "from-orange-400/45 to-rose-500/30",
    year: "2025",
  }),
  createSimpleProject({
    slug: "odara-management-group-social-media",
    title: "Odara Management Group",
    directoryTitle: "Odara Management Group",
    cat: "Social Media Graphics",
    tag: "Social Media Graphics",
    desc: "Social media graphics and digital layouts for Odara Management Group.",
    role: "Social Media Graphic Designer",
    color: "from-fuchsia-500/50 to-violet-500/30",
    year: "2025",
  }),
  createSimpleProject({
    slug: "wound-care",
    title: "Wound Care",
    cat: "Social Media Graphics",
    tag: "Health Graphics",
    desc: "Social media graphics for a wound care content series.",
    role: "Social Media Graphic Designer",
    color: "from-emerald-500/45 to-cyan-500/30",
    year: "2024",
  }),
  createSimpleProject({
    slug: "the-digital-income",
    title: "The Digital Income",
    cat: "Social Media Graphics",
    tag: "Social Media Graphics",
    desc: "Digital income themed social media graphics and layouts.",
    role: "Social Media Graphic Designer",
    color: "from-amber-400/45 to-green-500/30",
    year: "2024",
  }),
  createSimpleProject({
    slug: "tech-nexus-devcon-philippines",
    title: "Tech Nexus DevCon Philippines",
    cat: "Social Media Graphics",
    tag: "Event Graphics",
    desc: "Event social media graphics for Tech Nexus DevCon Philippines.",
    role: "Social Media Graphic Designer",
    color: "from-blue-500/50 to-violet-500/30",
    year: "2024",
  }),
  createSimpleProject({
    slug: "pyconf-mini-davao-2024",
    title: "PyConF Mini Davao 2024",
    cat: "Social Media Graphics",
    tag: "Event Graphics",
    desc: "Conference graphics and social media layouts for PyConF Mini Davao 2024.",
    role: "Social Media Graphic Designer",
    color: "from-yellow-400/40 to-blue-500/30",
    year: "2024",
  }),
  createSimpleProject({
    slug: "enigma",
    title: "ENIGMA",
    cat: "Social Media Graphics",
    categories: ["Creative Assets"],
    tag: "Social Media Graphics",
    desc: "Social media graphics and creative assets for ENIGMA.",
    role: "Creative Designer",
    tools: ["Figma", "Canva", "Photoshop"],
    color: "from-purple-500/50 to-pink-500/30",
    year: "2024",
  }),
  createSimpleProject({
    slug: "salin-salin",
    title: "Salin-Salin",
    cat: "Web Development",
    kind: "frontend",
    tag: "Web Development",
    desc: "Responsive web development project for Salin-Salin.",
    role: "Web Developer",
    tools: ["React", "Tailwind CSS", "TypeScript"],
    color: "from-teal-500/45 to-blue-500/30",
    year: "2025",
  }),
  createSimpleProject({
    slug: "handyman",
    title: "HandyMan",
    cat: "Web Development",
    kind: "frontend",
    tag: "Web Development",
    desc: "Responsive web development project for HandyMan.",
    role: "Web Developer",
    tools: ["React", "Tailwind CSS", "TypeScript"],
    color: "from-orange-400/45 to-cyan-500/30",
    year: "2025",
  }),
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export type ProjectFilter = "All" | ProjectCategory;

const categoryProjectOrder: Partial<Record<ProjectCategory, string[]>> = {
  "Logo & Branding": [
    "odara-management-group",
    "lian-monley",
    "pietyl-lpg",
    "sidlac-co-branding",
    "blue-collar-builders",
    "trichomend-plus",
    "adoptify-logo",
    "pietyl-management-system-logo",
    "dost-laon-logo",
    "cosmic-remedies-by-sia-logo",
    "umunity-logo",
  ],
  "UI/UX Design": [
    "cosmic-remedies-by-sia",
    "umunity",
    "dost-laon",
    "pietyl-management-system",
    "adoptify",
  ],
  "Social Media Graphics": [
    "blockchain-campus-conference-2024",
    "sidlac-co-social-media",
    "odara-management-group-social-media",
    "wound-care",
    "the-digital-income",
    "tech-nexus-devcon-philippines",
    "pyconf-mini-davao-2024",
    "umsdc-publication-materials-and-assets",
    "enigma",
  ],
  "Creative Assets": ["enigma", "umsdc-publication-materials-and-assets"],
  "Writing / VA": ["eat-well-live-well-nutrition-ebook", "thriving-mind-mental-wellness-ebook"],
  "Web Development": [
    "cosmic-remedies-by-sia",
    "umunity",
    "pietyl-management-system",
    "salin-salin",
    "handyman",
  ],
};

const directoryTitleOrder = [
  "Odara Management Group",
  "Lian Monley",
  "Pietyl LPG",
  "Sidlac Co.",
  "Blue Collar Builders",
  "Trichomend+",
  "Adoptify",
  "Pietyl Management System",
  "DOST Laon",
  "Cosmic Remedies by Sia",
  "UMunity",
  "Pietyl DigiLPG",
  "Blockchain Campus Conference 2024",
  "Wound Care",
  "The Digital Income",
  "Tech Nexus DevCon Philippines",
  "PyConF Mini Davao 2024",
  "UMSDC",
  "ENIGMA",
  "Eat Well, Live Well Nutrition eBook Writing and Cover Design",
  "Thriving Minds: Understanding Your Mental Health Journey",
  "Salin-Salin",
  "HandyMan",
] as const;

export const getProjectDirectoryTitle = (project: Project) =>
  project.directoryTitle ?? project.client ?? project.title;

export const getProjectDisplayTitle = (project: Project, category: ProjectFilter = "All") => {
  if (category === "All") return getProjectDirectoryTitle(project);
  return project.categoryTitles?.[category] ?? project.title;
};

export const getProjectCategoryLabel = (
  project: Project,
  category: ProjectFilter = project.cat,
) => {
  if (category === "All") return project.categoryLabels?.[project.cat] ?? project.cat;
  return project.categoryLabels?.[category] ?? (project.cat === category ? project.cat : category);
};

export const getDirectoryProjects = (sourceProjects: Project[] = projects) =>
  directoryTitleOrder
    .map((title) => sourceProjects.find((project) => getProjectDirectoryTitle(project) === title))
    .filter((project): project is Project => Boolean(project));

export const directoryProjects = getDirectoryProjects(projects);

export const matchesProjectCategory = (project: Project, category: ProjectFilter) => {
  if (category === "All") return true;
  return project.cat === category || project.categories?.includes(category) === true;
};

export const getProjectsByCategoryFrom = (sourceProjects: Project[], category: ProjectFilter) => {
  const filtered = sourceProjects.filter((project) => matchesProjectCategory(project, category));
  if (category === "All") return filtered;

  const order = categoryProjectOrder[category];
  if (!order) return filtered;

  const orderIndex = new Map(order.map((slug, index) => [slug, index]));
  return [...filtered].sort(
    (a, b) =>
      (orderIndex.get(a.slug) ?? Number.MAX_SAFE_INTEGER) -
      (orderIndex.get(b.slug) ?? Number.MAX_SAFE_INTEGER),
  );
};

export const getProjectsByCategory = (category: ProjectFilter) =>
  getProjectsByCategoryFrom(projects, category);

export const getNextProject = (slug: string) => {
  const current = getProject(slug);
  if (!current) return undefined;

  if (current.nextProjectSlug) {
    return getProject(current.nextProjectSlug);
  }

  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
};
