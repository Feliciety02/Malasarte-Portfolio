export type ProjectCategory =
  | "UI/UX Design"
  | "Social Media Graphics"
  | "Creative Assets"
  | "Logo & Branding"
  | "Web Development"
  | "Writing / VA";

export type ProjectKind =
  | "uiux"
  | "publication"
  | "branding"
  | "frontend"
  | "gallery"
  | "writing"
  | "logo";

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
  imageUrl?: string;
  assetPath?: string;
  ratio: "square" | "wide" | "tall";
  note: string;
};

export type ProjectFocusArea = {
  title: string;
  text: string;
};

export type ProjectFlipbookEmbed = {
  src: string;
  title: string;
};

export type ProjectCaseStudyOutcome = {
  value: string;
  label: string;
};

export type ProjectCaseStudyModule = {
  title: string;
  desc: string;
};

export type ProjectCaseStudyContent = {
  duration?: string;
  team?: string;
  overview?: string;
  problem?: string;
  approach?: string;
  contributions?: string[];
  outcomes?: ProjectCaseStudyOutcome[];
  modules?: ProjectCaseStudyModule[];
  nextLabel?: string;
};

export type ResolvedProjectCaseStudyContent = {
  duration: string;
  team: string;
  overview: string;
  problem: string;
  approach: string;
  contributions: string[];
  outcomes: ProjectCaseStudyOutcome[];
  modules: ProjectCaseStudyModule[];
  nextLabel: string;
};

export type ProjectBrandColor = {
  name: string;
  hex: string;
  meaning: string[];
};

export type ProjectBrandSymbol = {
  title: string;
  image?: string;
  items: { name: string; meaning: string }[];
};

export type ProjectBrandTypography = {
  name: string;
  family: string;
  reasons: string[];
};

export type ProjectBrandResearch = {
  title?: string;
  body: string;
  insights: string[];
};

export type ProjectBrandIdentityImage = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
};

export type ProjectMissionValues = {
  mission: string;
  vision: string;
  values: { title: string; text: string }[];
  stats?: { value: string; label: string }[];
};

export type ProjectBranding = {
  mode?: "full" | "logo";
  challenge?: string;
  solution?: string;
  highlights?: string[];
  research?: ProjectBrandResearch;
  symbol?: ProjectBrandSymbol;
  identityImages?: ProjectBrandIdentityImage[];
  colors?: ProjectBrandColor[];
  typography?: ProjectBrandTypography;
  personality?: string[];
  applications?: string[];
  deliverables?: string[];
  outcome?: string;
};

export type Project = {
  slug: string;
  title: string;
  imageTitle?: string;
  directoryTitle?: string;
  cat: ProjectCategory;
  kind: ProjectKind;
  /** Preferred card size in portfolio grid. Matches cover image aspect ratio. */
  cardSize?: "large" | "tall" | "wide" | "medium";
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
  figmaPreviewUrl?: string;
  flipbookEmbed?: ProjectFlipbookEmbed;
  vercelLiveUrl?: string;
  hideLiveWorkspace?: boolean;
  caseStudy?: ProjectCaseStudyContent;
  branding?: ProjectBranding;
  missionVisionValues?: ProjectMissionValues;
  nextProjectSlug?: string;
  categoryVariants?: Partial<Record<ProjectCategory, Partial<Project>>>;
};

const getOptionalEnvUrl = (value: unknown) => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
};

const defaultCosmicRemediesLiveUrl = "https://cosmic-remidies-by-sia-website.vercel.app";
const cosmicRemediesLiveUrl =
  getOptionalEnvUrl(import.meta.env.VITE_COSMIC_REMEDIES_LIVE_URL) ?? defaultCosmicRemediesLiveUrl;

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
  cardSize?: "large" | "tall" | "wide" | "medium";
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
  cardSize,
  nextProjectSlug,
}: SimpleProjectInput): Project => ({
  slug,
  title,
  imageTitle,
  cardSize,
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
    imageTitle: "Odara Management Group",
    cat: "Logo & Branding",
    kind: "branding",
    cardSize: "medium",
    categoryLabels: { "Logo & Branding": "Logo" },
    tag: "Brand Identity",
    color: "from-fuchsia-500/50 to-violet-500/30",
    desc: "Corporate identity system for a management group.",
    role: "Brand Designer",
    tools: ["Figma"],
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
    branding: {
      mode: "full",
      symbol: {
        title: "Odara Management brand identity",
        image: "/src/assets/projects/covers/Odara Brand Kit.png",
        items: [],
      },
    },
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
    imageTitle: "Lian Monley Logo",
    cardSize: "medium",
    cat: "Logo & Branding",
    kind: "branding",
    categoryLabels: { "Logo & Branding": "Logo" },
    tag: "Personal Brand",
    color: "from-rose-500/50 to-pink-500/30",
    desc: "Commissioned personal brand identity developed through multiple logo explorations and a refined wellness-focused system.",
    role: "Brand Designer",
    tools: ["Figma"],
    year: "2025",
    client: "Lian Monley",
    overview:
      "Lian Monley commissioned a personal identity for her work as a holistic gut health expert. The engagement included several distinct logo directions before one route was selected and developed into a calm, credible, and wellness-focused brand system for digital content, consultations, and professional materials.",
    goals: [
      "Explore several logo concepts before committing to a final identity direction.",
      "Balance professional health expertise with a calm and approachable wellness tone.",
      "Create a recognizable LM monogram that remains clear at small digital sizes.",
      "Build a visual language suited for social content, consultations, and educational materials.",
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
        text: "Presented six commissioned logo directions using monograms, organic symbols, letterforms, and wellness-inspired forms before refining the strongest route.",
      },
      {
        title: "Logo Meaning",
        text: "The selected LM monogram combines the client's initials with a centered droplet-like form, suggesting balance, care, and holistic wellbeing.",
      },
      {
        title: "Color Palette",
        text: "A composed blue and soft-neutral palette was chosen to communicate trust, calm, clarity, and professional guidance.",
      },
      {
        title: "Typography",
        text: "Medino and Gotham establish a modern, highly legible hierarchy that feels refined without becoming overly clinical.",
      },
      {
        title: "Brand Applications",
        text: "The identity was prepared for profile visuals, consultation materials, wellness content, educational covers, and social media touchpoints.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Reviewed holistic health, wellness, and expert-led personal brands to define a tone that felt trustworthy, calm, and distinctive.",
      },
      {
        title: "Logo Explorations",
        text: "Developed and presented six varied concepts so the client could compare typographic, symbolic, and monogram-led approaches.",
      },
      {
        title: "Selection & Refinement",
        text: "Refined the chosen LM monogram, improved its proportions, and developed supporting submarks and color variations.",
      },
      {
        title: "Brand Kit",
        text: "Prepared the final logo system, submarks, palette, typography direction, visual references, and practical export files.",
      },
    ],
    challenges: [
      {
        title: "Choosing One Direction",
        challenge:
          "The client wanted to see many possibilities before selecting a visual direction that felt personal and credible.",
        solution:
          "Presented six clearly differentiated concepts, then evaluated them against recognition, relevance, scalability, and professional fit.",
      },
      {
        title: "Wellness Without Cliches",
        challenge:
          "The identity needed to communicate holistic care without relying on generic leaves, medical symbols, or overly decorative wellness imagery.",
        solution:
          "Focused the final direction on a custom LM monogram, controlled geometry, calm color, and subtle symbolism.",
      },
    ],
    outcome:
      "The final system gives Lian Monley a distinctive and professional identity built through a transparent exploration process, with a flexible monogram, supporting submarks, and a calm visual foundation for future wellness content.",
    branding: {
      mode: "full",
      identityImages: [
        {
          src: "/src/assets/projects/covers/Lian Monley Logo Iterations.svg",
          alt: "Six commissioned logo concepts explored for Lian Monley",
          title: "Commissioned logo explorations",
          description:
            "Six distinct directions were presented to compare monogram structures, organic forms, typography, and wellness symbolism before selecting the final route.",
        },
        {
          src: "/src/assets/projects/covers/Lian Monley Brand Kit.svg",
          alt: "Final Lian Monley holistic gut health expert brand kit",
          title: "Selected identity system",
          description:
            "The approved LM monogram was developed into primary and secondary marks, submarks, color variations, a calm visual direction, and a practical typography system.",
        },
      ],
      deliverables: [
        "Six initial logo concepts",
        "Refined primary LM monogram",
        "Secondary logo and submark set",
        "Brand color palette",
        "Typography direction",
        "Mini brand identity guide",
        "Digital-ready logo export package",
      ],
    },
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
    title: "PIEYTL Marketing",
    imageTitle: "Pietyl DigiLPG Logo",
    cardSize: "medium",
    directoryTitle: "PIEYTL Marketing",
    cat: "Logo & Branding",
    kind: "branding",
    categoryLabels: { "Logo & Branding": "Logo" },
    tag: "Brand Identity & Logo Design",
    color: "from-cyan-400/55 to-teal-500/30",
    desc: "PIETYL Marketing is an LPG-focused business identity designed for clarity, trust, and strong local brand recognition.",
    role: "Logo Designer • Brand Strategist",
    tools: ["Figma"],
    year: "2024",
    client: "PIEYTL Marketing",
    overview:
      "PIEYTL Marketing is an LPG-focused business that required a professional visual identity capable of establishing trust, improving brand recognition, and creating consistency across both digital and physical touchpoints. The project involved designing the company's logo, defining its visual language, and creating a complete branding system that would serve as the foundation for future marketing materials and digital products.",
    goals: [
      "Reflect the LPG industry.",
      "Build customer trust.",
      "Stand out from competitors.",
      "Remain scalable across print and digital platforms.",
      "Create a consistent visual experience.",
    ],
    impact: [
      { value: "1", label: "Logo system" },
      { value: "3", label: "Brand colors" },
      { value: "7+", label: "Application surfaces" },
    ],
    focusAreas: [
      {
        title: "Industry Reading",
        text: "Studied how utility and energy brands communicate trust, scale, and modernity.",
      },
      {
        title: "Symbol Direction",
        text: "Explored cylinder, flame, and wordmark combinations suited to LPG identity.",
      },
      {
        title: "System Building",
        text: "Defined color, typography, and personality rules that extend beyond the logo.",
      },
    ],
    process: [
      {
        title: "Research & Discovery",
        text: "Reviewed the LPG category, mapped competitor identities, and identified white space.",
      },
      {
        title: "Concept",
        text: "Sketched symbol + wordmark combinations that read as energy, reliability, and modernity.",
      },
      {
        title: "Design",
        text: "Refined the cylinder + flame mark, wordmark, color palette, and typography system.",
      },
      {
        title: "Deliver",
        text: "Packaged the identity into logo lockups, color and type guides, and application assets.",
      },
    ],
    challenges: [
      {
        title: "Generic Category Codes",
        challenge: "Most LPG businesses rely on generic logos and inconsistent branding.",
        solution:
          "Combined a simplified cylinder mark with a modern wordmark to lift the brand out of the commodity space.",
      },
      {
        title: "Trust at a Glance",
        challenge: "The identity had to communicate trust, energy, and professionalism instantly.",
        solution:
          "Used a bold geometric wordmark paired with a focused palette of Federal Blue and Canary.",
      },
      {
        title: "Cross-surface Consistency",
        challenge: "The brand had to look right on signage, vehicles, and digital touchpoints.",
        solution:
          "Built the system around clear hierarchy, scalable marks, and high-contrast color pairings.",
      },
    ],
    outcome:
      "The final identity successfully establishes PIEYTL Marketing as a modern LPG brand with a professional visual presence that is scalable, memorable, and adaptable across multiple platforms.",
    missionVisionValues: {
      mission:
        "Simplify daily LPG operations through practical tools that improve efficiency, accuracy, and service reliability.",
      vision:
        "Empower LPG businesses to scale confidently through connected operations and smarter decision-making.",
      values: [
        {
          title: "Clarity",
          text: "Transparent communication and straightforward solutions that eliminate confusion.",
        },
        {
          title: "Accountability",
          text: "Ownership of outcomes and commitment to delivering on every promise.",
        },
        {
          title: "Safety",
          text: "Prioritising secure and compliant operations across every touchpoint.",
        },
        {
          title: "Reliability",
          text: "Dependable systems and support that businesses can count on daily.",
        },
        {
          title: "Operational Excellence",
          text: "Continuous improvement through precision, process, and attention to detail.",
        },
      ],
      stats: [
        { value: "10+", label: "Years Industry Experience" },
        { value: "99%", label: "Operational Accuracy" },
        { value: "24/7", label: "Platform Availability" },
      ],
    },
    branding: {
      mode: "full",
      research: {
        title: "Opportunity",
        body: "Industry analysis revealed that most LPG businesses rely heavily on generic logos and inconsistent branding. The opportunity was to create a recognizable identity that immediately communicates energy, reliability, professionalism, safety, and modernization.",
        insights: ["Energy", "Reliability", "Professionalism", "Safety", "Modernization"],
      },
      symbol: {
        title: "Symbol meaning",
        image: "/src/assets/projects/covers/Pieytl Branding.svg",
        items: [
          {
            name: "LPG Cylinder",
            meaning: "Represents the company's core service and industry.",
          },
          {
            name: "Flame Icon",
            meaning: "Symbolizes energy, fuel, and business growth.",
          },
          {
            name: "Bold Typography",
            meaning: "Communicates reliability and professionalism.",
          },
        ],
      },
      colors: [
        {
          name: "Canary",
          hex: "#1FFEF2",
          meaning: ["Innovation", "Energy", "Visibility"],
        },
        {
          name: "Federal Blue",
          hex: "#0F8A8D",
          meaning: ["Trust", "Stability", "Professionalism"],
        },
        {
          name: "White",
          hex: "#FFFFFF",
          meaning: ["Clarity", "Simplicity", "Transparency"],
        },
      ],
      typography: {
        name: "Poppins",
        family: "Poppins, sans-serif",
        reasons: [
          "Modern appearance",
          "Excellent readability",
          "Digital friendliness",
          "Professional character",
        ],
      },
      personality: ["Professional", "Reliable", "Modern", "Customer-focused", "Trustworthy"],
      applications: [
        "Business documents",
        "Company presentations",
        "Social media assets",
        "Marketing materials",
        "Signage",
        "Website interfaces",
        "Mobile platforms",
      ],
      deliverables: [
        "Primary Logo",
        "Secondary Logo Variations",
        "Icon Mark",
        "Color System",
        "Typography System",
        "Brand Guidelines",
        "Visual Identity Assets",
      ],
      outcome:
        "The final identity successfully establishes PIEYTL Marketing as a modern LPG brand with a professional visual presence that is scalable, memorable, and adaptable across multiple platforms.",
    },
    gallery: [
      {
        color: "from-cyan-400/55 to-teal-500/30",
        label: "Primary Identity",
        ratio: "square",
        note: "Placeholder for the LPG cylinder + flame mark and full lockup.",
      },
      {
        color: "from-teal-500/40 to-sky-500/30",
        label: "Color System",
        ratio: "wide",
        note: "Placeholder for Canary, Federal Blue, and White palette applications.",
      },
      {
        color: "from-cyan-500/40 to-blue-500/30",
        label: "Vehicle & Signage",
        ratio: "tall",
        note: "Placeholder for transport and field-use branding mockups.",
      },
    ],
    nextProjectSlug: "sidlac-co-branding",
  },
  {
    slug: "blue-collar-builders",
    title: "Blue Collar Builders",
    imageTitle: "Blue Collar Builders Logo",
    cardSize: "medium",
    cat: "Logo & Branding",
    kind: "branding",
    categoryLabels: { "Logo & Branding": "Logo" },
    tag: "Construction Identity",
    color: "from-indigo-500/50 to-sky-500/30",
    desc: "Brand identity for a builders and construction business.",
    role: "Brand Designer",
    tools: ["Figma"],
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
    imageTitle: "Trichomend Plus Logo",
    cardSize: "wide",
    cat: "Logo & Branding",
    kind: "branding",
    categoryLabels: { "Logo & Branding": "Logo" },
    tag: "Product Identity",
    color: "from-emerald-500/50 to-teal-500/30",
    desc: "Brand identity direction for a treatment-focused product.",
    role: "Brand Designer",
    tools: ["Figma"],
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
    branding: {
      mode: "full",
      symbol: {
        title: "Trichomend+ brand identity",
        image: "/src/assets/projects/covers/Trichomend Brand Kit.png",
        items: [],
      },
    },
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
    imageTitle: "adoptify ui ux",
    directoryTitle: "Adoptify",
    cardSize: "wide",
    cat: "UI/UX Design",
    kind: "uiux",
    tag: "App Design",
    color: "from-violet-500/50 to-indigo-500/30",
    desc: "UI/UX concept for a pet adoption platform designed to connect shelters, rescuers, and adopters through a more transparent and accessible adoption experience.",
    role: "UI/UX Designer",
    tools: ["Figma", "FigJam", "Notion"],
    year: "2025",
    client: "Concept Project",
    overview:
      "Adoptify is a pet adoption platform concept that helps potential adopters discover pets, understand adoption requirements, and navigate the adoption process with greater confidence. The experience prioritizes trust, accessibility, and meaningful connections between animals and their future homes.",
    goals: [
      "Design a friendlier adoption experience that feels safe and organized.",
      "Simplify the path from browsing to inquiry and follow-through.",
      "Create a reusable interface language for listings, profiles, and communication flows.",
    ],
    impact: [
      { value: "45+", label: "Interface Screens" },
      { value: "5", label: "End-to-End Adoption Journeys" },
      { value: "1", label: "Unified Design System" },
    ],
    caseStudy: {
      contributions: [
        "Research",
        "User Journey Mapping",
        "Information Architecture",
        "Wireframing",
        "UI Design",
        "Interactive Prototyping",
        "Usability Evaluation",
      ],
      modules: [
        { title: "Progressive Disclosure", desc: "Information revealed step by step to reduce cognitive load during the adoption flow." },
        { title: "Trust Signals", desc: "Visual cues and status indicators that reinforce process legitimacy and next-step clarity." },
        { title: "Guided Adoption Flow", desc: "A structured pathway from browsing to application with clear progress awareness." },
        { title: "Accessible Navigation", desc: "Keyboard‑friendly interactions, readable contrast, and screen‑reader support throughout." },
      ],
    },
    focusAreas: [
      {
        title: "Research",
        text: "Mapped emotional and practical pain points in adoption journeys to inform tone and interface decisions.",
      },
      {
        title: "User Journey Mapping",
        text: "Charted the full adopter and shelter journey across browse, inquiry, application, and follow-up stages.",
      },
      {
        title: "Information Architecture",
        text: "Organized pet profiles, shelter data, and adoption requirements into clear, scannable information hierarchies.",
      },
      {
        title: "Wireframing",
        text: "Validated the listing and profile structure before introducing polished UI treatments.",
      },
      {
        title: "UI Design",
        text: "Built a softer and more human interface system focused on trust, readability, and supportive pacing.",
      },
      {
        title: "Interactive Prototyping",
        text: "Linked critical adoption steps into a realistic clickable experience for usability review and stakeholder feedback.",
      },
      {
        title: "Usability Evaluation",
        text: "Conducted feedback sessions to refine navigation, clarify CTAs, and improve overall adoption flow confidence.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Analyzed existing adoption platforms, user expectations, and common barriers faced by shelters, rescuers, and adopters throughout the adoption journey.",
      },
      {
        title: "Strategy",
        text: "Defined user flows, adoption pathways, information priorities, and trust-building mechanisms to reduce uncertainty and improve engagement.",
      },
      {
        title: "Design",
        text: "Created end-to-end mobile and web experiences covering pet discovery, detailed pet profiles, adoption applications, shelter communication, and account management.",
      },
      {
        title: "Validation",
        text: "Refined the interface through iterative feedback, improved accessibility considerations, and prepared a complete design system and prototype for presentation.",
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
    figmaPreviewUrl:
      "https://embed.figma.com/design/ld5OWQ10gzn8veCSgct4SK/Adoptify?node-id=113-3016&embed-host=share",
    nextProjectSlug: "pietyl-management-system",
  },
  {
    slug: "pietyl-management-system",
    title: "Pietyl DigiLPG",
    imageTitle: "Pietyl ui ux card",
    cardSize: "wide",
    directoryTitle: "Pietyl DigiLPG",
    cat: "UI/UX Design",
    kind: "uiux",
    tag: "Management System",
    color: "from-sky-500/50 to-indigo-500/30",
    desc: "Product design system for Pietyl DigiLPG's internal management dashboard covering records, workflow, and operations monitoring.",
    role: "Product Designer",
    tools: ["Figma", "FigJam"],
    year: "2025",
    client: "Pietyl DigiLPG",
    overview:
      "Pietyl DigiLPG required a structured interface system for managing internal operations, records, workflow tracking, and monitoring. The design focused on building a clean, intuitive management dashboard that digitizes decades of operational knowledge into a modern, easy-to-use platform.",
    goals: [
      "Design a management dashboard that simplifies complex operational data.",
      "Create intuitive navigation for records, workflow, and monitoring modules.",
      "Build a scalable interface system that adapts to future business needs.",
    ],
    impact: [
      { value: "1", label: "System design" },
      { value: "6+", label: "Interface modules" },
      { value: "30+", label: "Years of business legacy" },
    ],
    focusAreas: [
      {
        title: "User Research",
        text: "Studied the client's operational workflows and staff interactions to understand pain points and data management needs.",
      },
      {
        title: "Information Architecture",
        text: "Structured navigation and content hierarchy across dashboard, records, workflow, and monitoring sections.",
      },
      {
        title: "Wireframing",
        text: "Explored low-fidelity layouts to optimize screen density and task flow before moving to high-fidelity design.",
      },
      {
        title: "Visual Design",
        text: "Applied a cohesive color system, typography, and spacing to create a professional, trustworthy interface.",
      },
      {
        title: "Prototyping",
        text: "Connected core user flows to demonstrate how staff would navigate between tasks and modules.",
      },
      {
        title: "Design System",
        text: "Built reusable UI components including tables, forms, cards, and navigation modules for long-term scalability.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Mapped the client's operational needs, data structures, and user roles to define the system requirements.",
      },
      {
        title: "Concept",
        text: "Defined the interface structure and visual direction for the management dashboard and supporting modules.",
      },
      {
        title: "Design",
        text: "Created wireframes, high-fidelity mockups, and an interactive prototype covering core workflows.",
      },
      {
        title: "Deliver",
        text: "Prepared a modular case study with placeholder screens to protect confidential operational data.",
      },
    ],
    challenges: [
      {
        title: "Confidential Data Handling",
        challenge:
          "The management system screens contain sensitive business data that cannot be shown publicly.",
        solution:
          "Designed the case study with placeholder content and mock data to demonstrate functionality without exposing real information.",
      },
      {
        title: "Bridging Analog to Digital",
        challenge:
          "Transitioning a business with decades of paper-based workflows into a digital system required thoughtful UX.",
        solution:
          "Focused on simplicity and familiarity, using clear navigation patterns that felt intuitive for non-tech-savvy users.",
      },
    ],
    outcome:
      "Pietyl DigiLPG now has a comprehensive management system design built around clarity, trust, and long-term usability, with a scalable interface system ready for future modules.",
    gallery: [
      {
        color: "from-sky-500/50 to-indigo-500/30",
        label: "Landing Page",
        ratio: "wide",
        note: "Low-fidelity wireframes exploring the main dashboard layout, data hierarchy, and navigation structure for the management system.",
      },
      {
        color: "from-indigo-500/40 to-blue-500/30",
        label: "Admin Product Catalog",
        ratio: "square",
        note: "Refined UI mockups for the records module, showing the visual design system, typography, and color application.",
      },
      {
        color: "from-cyan-500/40 to-sky-500/30",
        label: "Accountant Sales",
        ratio: "square",
        note: "Connected prototype flows demonstrating how staff navigate between dashboard, records, and workflow monitoring tasks.",
      },
      {
        color: "from-teal-500/40 to-emerald-500/30",
        label: "Cashier POS",
        ratio: "square",
        note: "Point-of-sale wireframes showing order processing and payment flow design.",
      },
      {
        color: "from-amber-400/40 to-orange-500/30",
        label: "Rider App",
        ratio: "square",
        note: "Rider delivery management screen design for dispatch and delivery tracking workflows.",
      },
    ],
    figmaPreviewUrl:
      "https://embed.figma.com/design/7bbWU9ch4rwaouInhEarZ6/Pietyl-DigiLPG?node-id=534-2&embed-host=share",
    nextProjectSlug: "pietyl-digilpg-web",
  },
  {
    slug: "pietyl-digilpg-web",
    title: "Pietyl DigiLPG",
    imageTitle: "pietyl LPG landing page",
    cardSize: "wide",
    directoryTitle: "Pietyl DigiLPG",
    cat: "Web Development",
    kind: "frontend",
    tag: "Web Development",
    color: "from-sky-500/50 to-indigo-500/30",
    desc: "Full-stack implementation of Pietyl DigiLPG's landing page and management system, built with Laravel, React, and MySQL.",
    role: "Full-Stack Developer",
    tools: [
      "PHP 8.2",
      "Laravel 12",
      "React 18",
      "Inertia.js",
      "Tailwind CSS 4",
      "Vite 7",
      "MySQL",
      "Pest",
    ],
    year: "2025",
    client: "Pietyl DigiLPG",
    overview:
      "Pietyl DigiLPG, a long-standing LPG business operating since the 90s, needed a stronger digital presence. This full-stack project delivered two key pieces: a clean landing page for store publicity and a functional management system to streamline internal operations. The landing page serves as the public face of the business, while the management system handles records, workflow, and monitoring behind the scenes.",
    goals: [
      "Build a simple, professional landing page for store publicity and customer outreach.",
      "Develop a management system to support the business's long-standing operational needs.",
      "Create a cohesive digital identity that reflects decades of industry trust.",
    ],
    impact: [
      { value: "1", label: "Landing page" },
      { value: "1", label: "Management system" },
      { value: "30+", label: "Years of business legacy" },
    ],
    focusAreas: [
      {
        title: "Landing Page",
        text: "Built a clean, straightforward landing page focused on store publicity and customer trust signals.",
      },
      {
        title: "Management System",
        text: "Developed a back-end interface to digitize workflows, records, and operational monitoring for the LPG business.",
      },
      {
        title: "Placeholder Strategy",
        text: "Used image placeholders throughout the showcase to protect confidential business data.",
      },
    ],
    process: [
      {
        title: "Requirements",
        text: "Reviewed the client's existing workflows, store operations, and LPG industry landscape to define technical specifications.",
      },
      {
        title: "Architecture",
        text: "Set up the Laravel backend, database schema, and Inertia.js front-end structure for the landing page and management modules.",
      },
      {
        title: "Implementation",
        text: "Developed the landing page and management system with Laravel, React, Inertia.js, Tailwind CSS 4, and MySQL.",
      },
      {
        title: "Deployment",
        text: "Deployed the project with placeholder assets in sensitive sections to protect client confidentiality.",
      },
    ],
    challenges: [
      {
        title: "Confidential Data Handling",
        challenge:
          "The management system contains sensitive client and operational data that could not be shown publicly.",
        solution:
          "Used placeholders and mock data in the showcase to demonstrate functionality without exposing real business information.",
      },
      {
        title: "Bridging Old and New",
        challenge:
          "Transitioning a decades-old business into digital workflows required careful adaptation.",
        solution:
          "Focused on simplicity and ease of use, designing interfaces that felt familiar while introducing modern efficiency.",
      },
    ],
    outcome:
      "Pietyl DigiLPG now has a professional landing page for customer-facing publicity and a streamlined management system to support daily operations, all built on a modern full-stack web stack with room to grow.",
    gallery: [
      {
        color: "from-sky-500/50 to-indigo-500/30",
        label: "Landing Page",
        ratio: "wide",
        note: "Implemented landing page with Laravel Blade and Inertia.js, featuring store information, service overview, and customer contact section.",
      },
      {
        color: "from-indigo-500/40 to-blue-500/30",
        label: "Admin Product Catalog",
        ratio: "square",
        note: "Product catalog management screen built with React and Inertia.js for adding, editing, and organizing LPG product listings.",
      },
      {
        color: "from-cyan-500/40 to-sky-500/30",
        label: "Accountant Sales",
        ratio: "square",
        note: "Sales overview and accounting dashboard showing revenue tracking, transaction summaries, and financial reporting.",
      },
      {
        color: "from-teal-500/40 to-emerald-500/30",
        label: "Cashier POS",
        ratio: "square",
        note: "Point-of-sale interface for processing customer orders, payments, and generating receipts in real time.",
      },
      {
        color: "from-amber-400/40 to-orange-500/30",
        label: "Rider App",
        ratio: "square",
        note: "Rider delivery interface displaying delivery assignments, route information, and order status tracking.",
      },
    ],
    hideLiveWorkspace: true,
    nextProjectSlug: "dost-laon",
  },
  {
    slug: "dost-laon",
    title: "DOST Laon",
    imageTitle: "DOST LAON ui ux",
    cardSize: "wide",
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
    figmaPreviewUrl:
      "https://embed.figma.com/design/7nHC4DDibMbUwZdo0MDSvV/DOST-LAON?node-id=0-1&embed-host=share",
    nextProjectSlug: "cosmic-remedies-by-sia",
  },
  {
    slug: "cosmic-remedies-by-sia",
    title: "Cosmic Remedies by Sia",
    cat: "Web Development",
    kind: "frontend",
    cardSize: "wide",
    tag: "Web Development",
    color: "from-violet-500/50 to-cyan-500/30",
    desc: "A responsive web build of the Cosmic Remedies by Sia digital product experience.",
    role: "Web Developer",
    tools: ["React", "Tailwind CSS"],
    year: "2025",
    client: "Cosmic Remedies by Sia",
    overview:
      "A responsive web implementation of the Cosmic Remedies by Sia brand experience, translating the product vision into a working site with polished layout, storytelling sections, and cross-device coverage.",
    goals: [
      "Build a responsive web experience that captures the brand's unique personality.",
      "Implement clean, maintainable code with reusable components.",
      "Ensure polished layout and interaction across desktop and mobile breakpoints.",
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
      "Cosmic Remedies by Sia is a fully implemented web experience that brings the brand's vision to life through responsive design, reusable components, and polished front-end execution.",
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
    vercelLiveUrl: cosmicRemediesLiveUrl || undefined,
    nextProjectSlug: "umunity",
  },
  {
    slug: "umunity",
    title: "UMunity",
    imageTitle: "UMunity ui ux card",
    cat: "UI/UX Design",
    kind: "uiux",
    cardSize: "wide",
    tag: "Product Design",
    color: "from-cyan-500/50 to-blue-500/30",
    desc: "Product design system for a school organization management platform covering events, communication, records, and coordination.",
    role: "UI/UX Designer",
    tools: ["Figma", "FigJam", "Miro", "Notion"],
    year: "2025",
    client: "UMunity",
    overview:
      "UMunity is a product design concept focused on school organization management — dashboards, events, records, announcements, and communication flows shaped for both student members and organization officers.",
    goals: [
      "Simplify school organization workflows for members and officers.",
      "Design a dashboard and module system that supports faster task completion.",
      "Create a scalable interface system for future modules.",
    ],
    impact: [
      { value: "6", label: "Core modules" },
      { value: "50+", label: "Designed states" },
      { value: "1", label: "Reusable system" },
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
        text: "Created the dashboard, modules, reusable components, and prototype logic.",
      },
      {
        title: "Visual Design",
        text: "Applied a cohesive color system, typography, and spacing to create a trustworthy interface.",
      },
      {
        title: "Prototyping",
        text: "Connected core user flows to demonstrate how users navigate between tasks and modules.",
      },
      {
        title: "Design System",
        text: "Built reusable UI components including tables, cards, forms, and navigation modules for long-term scalability.",
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
        text: "Built the dashboard, module layouts, reusable interface system, and Figma prototype.",
      },
      {
        title: "Deliver",
        text: "Prepared the case study with structured screens and placeholder areas for future refinement.",
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
        title: "Information Density",
        challenge:
          "Dashboards risk becoming cluttered when serving multiple data sources and user types.",
        solution:
          "Used progressive disclosure and organized content into focused module views.",
      },
    ],
    outcome:
      "UMunity now reads as a complete product design case study, showing the Figma system, user flows, reusable components, and prototype direction for a student organization management platform.",
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
        label: "Interface States",
        ratio: "square",
        note: "Various interface states and interaction patterns across the system.",
      },
    ],
    figmaPreviewUrl:
      "https://embed.figma.com/design/zw7EIzr4RSkhabog08oVBK/UMUnuty?node-id=13-350&embed-host=share",
    nextProjectSlug: "umunity-web",
  },
  {
    slug: "umunity-web",
    title: "UMunity",
    directoryTitle: "UMunity",
    cat: "Web Development",
    kind: "frontend",
    cardSize: "wide",
    tag: "Web Development",
    color: "from-cyan-500/50 to-blue-500/30",
    desc: "Responsive web implementation of the UMunity school organization management system with dashboard, modules, and reusable screen patterns.",
    role: "Web Developer",
    tools: ["React", "Tailwind CSS", "TypeScript"],
    year: "2025",
    client: "UMunity",
    overview:
      "The UMunity web build translates the product design system into a responsive front-end implementation using React, Tailwind CSS, and TypeScript — covering the dashboard, event modules, records, announcements, and navigation structure.",
    goals: [
      "Translate the approved Figma system into a responsive web implementation.",
      "Build reusable components for dashboard, events, records, and communication modules.",
      "Ensure the interface is usable across desktop and mobile breakpoints.",
    ],
    impact: [
      { value: "6", label: "Core modules" },
      { value: "50+", label: "Implemented states" },
      { value: "100%", label: "Responsive coverage" },
    ],
    focusAreas: [
      {
        title: "Dashboard",
        text: "Implemented the main dashboard with key metrics, announcements, and quick-action modules.",
      },
      {
        title: "Module System",
        text: "Built reusable page patterns for events, records, announcements, and communication flows.",
      },
      {
        title: "Responsive Design",
        text: "Adjusted navigation, spacing, and card density to preserve usability on smaller screens.",
      },
      {
        title: "Component Library",
        text: "Created repeatable panels, tables, cards, forms, and navigation components for future scale.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Reviewed the Figma system and component specifications to plan the implementation approach.",
      },
      {
        title: "Design",
        text: "Set up the component architecture, styling system, and responsive breakpoint strategy.",
      },
      {
        title: "Develop",
        text: "Built the dashboard and module screens using React, Tailwind CSS, and TypeScript.",
      },
      {
        title: "Deliver",
        text: "Deployed the web build with placeholder data and prepared it for future backend integration.",
      },
    ],
    challenges: [
      {
        title: "Design to Development Consistency",
        challenge:
          "The web build needed to preserve the Figma system without creating inconsistent one-off screens.",
        solution:
          "Relied on repeatable layout patterns, reusable components, and responsive rules shared across modules.",
      },
      {
        title: "Multi-role Interface",
        challenge:
          "The system had to distinguish between member-facing and officer-facing views.",
        solution:
          "Created role-aware component variants that adapt content and actions based on user type.",
      },
    ],
    outcome:
      "UMunity now has a fully implemented web build that faithfully translates the Figma design system into a responsive, component-driven front end.",
    gallery: [
      {
        color: "from-cyan-500/50 to-blue-500/30",
        label: "Dashboard",
        imageTitle: "UMunity School Org Management System",
        imageLabel: "Dashboard",
        ratio: "wide",
        note: "Main dashboard implementation with key metrics and announcements.",
      },
      {
        color: "from-blue-500/40 to-indigo-500/30",
        label: "Module Screens",
        imageTitle: "UMunity School Org Management System",
        ratio: "square",
        note: "Events, records, and announcement module screens.",
      },
      {
        color: "from-indigo-500/40 to-cyan-500/30",
        label: "Component Library",
        imageTitle: "UMunity School Org Management System",
        ratio: "square",
        note: "Reusable tables, cards, forms, and navigation patterns.",
      },
      {
        color: "from-cyan-500/40 to-sky-500/30",
        label: "Responsive Build",
        imageTitle: "UMunity School Org Management System",
        imageLabel: "Responsive Screens",
        ratio: "wide",
        note: "Mobile and desktop implementation comparisons.",
      },
    ],
    vercelLiveUrl: "https://u-munity-organization-management-sy.vercel.app/",
    nextProjectSlug: "umsdc-publication-materials-and-assets",
  },
  {
    slug: "umsdc-publication-materials-and-assets",
    title: "UMSDC",
    imageTitle: "UMSDC Publication Materials and Assets",
    cardSize: "medium",
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
        label: "UMSDC Brand Graphic",
        assetPath: "umsdc-publication-materials-and-assets/umsdc 1",
        ratio: "square",
        note: "Organization graphic introducing the UMSDC visual identity.",
      },
      {
        color: "from-rose-500/40 to-pink-500/30",
        label: "Leadership Profile Frame",
        assetPath: "umsdc-publication-materials-and-assets/umsdc 2",
        ratio: "tall",
        note: "Portrait profile template for organization leadership features.",
      },
      {
        color: "from-orange-400/40 to-amber-400/30",
        label: "Exam Campaign Post",
        assetPath: "umsdc-publication-materials-and-assets/umsdc 3",
        ratio: "square",
        note: "Student-focused social post for the examination period.",
      },
      {
        color: "from-cyan-500/40 to-blue-500/30",
        label: "Who Knows Wednesday",
        assetPath: "umsdc-publication-materials-and-assets/umsdc 4",
        ratio: "square",
        note: "Interactive weekly quiz template for community engagement.",
      },
    ],
    nextProjectSlug: "eat-well-live-well-nutrition-ebook",
  },
  {
    slug: "eat-well-live-well-nutrition-ebook",
    title: "Eat Well, Live Well: Your Complete Food & Nutrition Guide",
    imageTitle: "Eat Well, Live Well Nutrition eBook Writing and Cover Design",
    cardSize: "tall",
    directoryTitle: "Eat Well, Live Well: Your Complete Food & Nutrition Guide",
    cat: "Writing / VA",
    categoryTitles: {
      "Writing / VA": "Eat Well, Live Well: Your Complete Food & Nutrition Guide",
    },
    kind: "writing",
    tag: "Nutrition Guide",
    color: "from-emerald-400/50 to-lime-500/30",
    desc: "A practical nutrition and healthy lifestyle guide for sustainable eating habits without restrictive dieting.",
    role: "Content Writer and Layout Designer",
    tools: ["Google Docs", "Canva", "Figma"],
    year: "2024",
    client: "Nutrition eBook Project",
    overview:
      "Eat Well, Live Well: Your Complete Food & Nutrition Guide is a practical nutrition and healthy lifestyle guide designed to help readers develop sustainable eating habits without relying on restrictive diets, calorie obsession, or unrealistic wellness trends. The book combines nutritional science, meal planning, recipes, and behavior change strategies into an easy-to-follow roadmap for building a healthier relationship with food.",
    goals: [
      "Teach nutrition basics in a clear, beginner-friendly way without promoting restrictive dieting.",
      "Help readers understand macronutrients, micronutrients, balanced plates, meal planning, and healthy recipes.",
      "Encourage long-term health, energy, mental clarity, and overall well-being through consistent food choices.",
    ],
    impact: [
      { value: "9", label: "Educational chapters" },
      { value: "5", label: "Quick recipes" },
      { value: "7", label: "Meal-plan days" },
    ],
    focusAreas: [
      {
        title: "Food as Health Foundation",
        text: "Introduced food as a major influence on physical health, mental performance, energy, and disease prevention.",
      },
      {
        title: "Nutrition Basics",
        text: "Explained carbohydrates, proteins, fats, vitamins, minerals, and nutrient-dense foods in practical language.",
      },
      {
        title: "Balanced Plate Planning",
        text: "Built simple frameworks for portion control, meal composition, grocery planning, batch cooking, and food routines.",
      },
      {
        title: "Recipes and Meal Plan",
        text: "Included five quick healthy recipes and a flexible seven-day meal plan to help readers apply the lessons.",
      },
      {
        title: "Energy, Mood, and Habits",
        text: "Connected nutrition to energy, concentration, mood, productivity, mindful eating, and long-term habit building.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Reviewed beginner nutrition education themes and shaped the guide around balanced eating, mindful habits, and practical lifestyle change.",
      },
      {
        title: "Structure",
        text: "Organized the book from food foundations and nutrient education into meal planning, recipes, a seven-day plan, and long-term habit support.",
      },
      {
        title: "Writing",
        text: "Drafted chapters on food as medicine, macronutrients, micronutrients, balanced plates, meal planning, healthy recipes, energy, mood, and next-step goals.",
      },
      {
        title: "Deliver",
        text: "Prepared the final written content and cover direction as one approachable guide for sustainable healthy eating.",
      },
    ],
    challenges: [
      {
        title: "Avoiding Diet Culture",
        challenge:
          "The nutrition guide needed to encourage healthier choices without relying on strict dieting, calorie obsession, or unrealistic wellness claims.",
        solution:
          "Framed the content around balanced nutrition, consistency, mindful eating, and sustainable habits instead of perfection.",
      },
      {
        title: "Making Nutrition Practical",
        challenge:
          "Nutrition science can feel complicated when readers are introduced to nutrients, meal structure, and planning all at once.",
        solution:
          "Used simple explanations, plate-method guidance, quick recipes, grocery planning, and a flexible meal plan to make the ideas easier to apply.",
      },
      {
        title: "Supporting Long-term Change",
        challenge:
          "The book needed to move beyond short-term motivation and help readers continue after the meal plan.",
        solution:
          "Ended the guide with realistic goals, personalized healthy living habits, and the message that progress starts one meal at a time.",
      },
    ],
    outcome:
      "The final eBook became a beginner-friendly nutrition education and wellness guide that teaches informed food choices, practical meal planning, healthy recipes, behavior change, and sustainable lifestyle habits. Its central message is that lasting health is built through consistent, informed food choices made one meal at a time.",
    gallery: [],
    flipbookEmbed: {
      src: "https://heyzine.com/flip-book/751c8a6bdc.html",
      title: "Eat Well, Live Well: Your Complete Food & Nutrition Guide flipbook",
    },
    nextProjectSlug: "thriving-mind-mental-wellness-ebook",
  },
  {
    slug: "thriving-mind-mental-wellness-ebook",
    title: "Thriving Minds: Understanding Your Mental Health Journey",
    imageTitle: "Thriving Mind Mental Wellness eBook Writing and Cover Design",
    cardSize: "tall",
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
        challenge:
          "Mental wellness content needed to be clear and helpful without sounding clinical, alarming, or dismissive.",
        solution:
          "Used plain, supportive, non-stigmatizing language and kept the pacing calm throughout the guide.",
      },
      {
        title: "Broad Topic Scope",
        challenge:
          "The eBook covered many mental health topics, which could become overwhelming without a strong sequence.",
        solution:
          "Built a chapter progression that moves from understanding challenges to practicing coping skills and building daily habits.",
      },
      {
        title: "Actionable Ending",
        challenge:
          "The guide needed to leave readers with next steps instead of only general awareness.",
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
    imageTitle: "Sidlac Co Logo",
    cat: "Logo & Branding",
    kind: "branding",
    categoryLabels: { "Logo & Branding": "Logo" },
    tag: "Logo & Branding",
    desc: "Logo and brand identity direction for Sidlac Co.",
    role: "Brand Designer",
    tools: ["Figma"],
    color: "from-amber-400/45 to-orange-500/30",
    year: "2025",
    cardSize: "medium",
  }),
  createSimpleProject({
    slug: "adoptify-logo",
    title: "Adoptify",
    imageTitle: "Adoptify Logo",
    directoryTitle: "Adoptify",
    cat: "Logo & Branding",
    kind: "branding",
    categoryLabels: { "Logo & Branding": "Logo" },
    tag: "Logo",
    desc: "Logo direction for the Adoptify product concept.",
    role: "Logo Designer",
    tools: ["Figma"],
    color: "from-violet-500/50 to-indigo-500/30",
    year: "2025",
    cardSize: "medium",
  }),
  createSimpleProject({
    slug: "dost-laon-logo",
    title: "DOST Laon",
    imageTitle: "DOST Laon Logo",
    directoryTitle: "DOST Laon",
    cat: "Logo & Branding",
    kind: "branding",
    categoryLabels: { "Logo & Branding": "Logo" },
    tag: "Logo",
    desc: "Logo direction for the DOST Laon platform concept.",
    role: "Logo Designer",
    tools: ["Figma"],
    color: "from-blue-500/50 to-cyan-500/30",
    year: "2025",
    cardSize: "tall",
  }),
  createSimpleProject({
    slug: "umunity-logo",
    title: "UMunity",
    imageTitle: "UMunity Logo",
    directoryTitle: "UMunity",
    cat: "Logo & Branding",
    kind: "branding",
    categoryLabels: { "Logo & Branding": "Logo" },
    tag: "Logo",
    desc: "Logo direction for the UMunity school organization management system.",
    role: "Logo Designer",
    tools: ["Figma"],
    color: "from-cyan-500/50 to-blue-500/30",
    year: "2025",
    cardSize: "medium",
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
    cardSize: "medium",
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
    cardSize: "medium",
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
    cardSize: "medium",
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
    cardSize: "medium",
  }),
  {
    slug: "the-digital-income",
    title: "The Digital Income",
    cardSize: "medium",
    cat: "Social Media Graphics",
    kind: "gallery",
    categories: ["Creative Assets"],
    tag: "Digital Income Series",
    color: "from-amber-400/45 to-green-500/30",
    desc: "Digital income themed social media graphics and layouts.",
    role: "Social Media Graphic Designer",
    tools: ["Canva"],
    year: "2024",
    client: "The Digital Income",
    overview:
      "Social media graphics and visual content for The Digital Income, focused on digital income education, online business growth, and financial literacy themes.",
    goals: [
      "Create engaging social media graphics that communicate digital income concepts clearly.",
      "Develop a consistent visual language for online business and financial literacy content.",
      "Produce reusable templates for ongoing social media content creation.",
    ],
    impact: [
      { value: "7", label: "Hero graphics" },
      { value: "1", label: "Visual system" },
      { value: "1", label: "Content series" },
    ],
    focusAreas: [
      {
        title: "Visual Direction",
        text: "Defined a clean, modern aesthetic with warm tones to communicate success, growth, and accessibility.",
      },
      {
        title: "Content Structure",
        text: "Organized hero images around key digital income themes such as passive income, online business, and financial freedom.",
      },
      {
        title: "Typography",
        text: "Used bold, headline-driven layouts to make key messages scannable and impactful on social feeds.",
      },
    ],
    process: [
      {
        title: "Research",
        text: "Reviewed digital income content trends and competitor visual styles to define a standout direction.",
      },
      {
        title: "Concept",
        text: "Developed a visual system around wealth-building imagery paired with clean typography and warm gradients.",
      },
      {
        title: "Design",
        text: "Created seven hero image layouts covering core digital income topics with consistent branding elements.",
      },
      {
        title: "Deliver",
        text: "Prepared the series as portfolio-ready assets with room for future content expansion.",
      },
    ],
    challenges: [
      {
        title: "Complex Topics Made Simple",
        challenge:
          "Digital income concepts like passive income and online business can feel abstract in a single image.",
        solution:
          "Used metaphor-driven visuals, clean layouts, and strong headlines to make each concept immediately understandable.",
      },
      {
        title: "Visual Consistency",
        challenge:
          "Each hero image had to feel part of the same series while covering different topics.",
        solution:
          "Applied a consistent color palette, typography system, and compositional template across all seven graphics.",
      },
    ],
    outcome:
      "The Digital Income now has a polished visual content series with seven hero graphics built around a consistent system, ready for social media publishing and future campaign expansion.",
    gallery: [
      {
        assetPath: "the-digital-income/The Digital Income - Hero Image 1",
        color: "from-amber-400/45 to-green-500/30",
        label: "Hero Image 1",
        ratio: "wide",
        note: "Hero visual introducing digital income concepts with bold typography and warm gradient treatment.",
      },
      {
        assetPath: "the-digital-income/The Digital Income - Hero Image 2",
        color: "from-green-500/40 to-teal-500/30",
        label: "Hero Image 2",
        ratio: "square",
        note: "Content graphic focusing on passive income strategies and financial growth messaging.",
      },
      {
        assetPath: "the-digital-income/The Digital Income - Hero Image 3",
        color: "from-amber-400/40 to-orange-500/30",
        label: "Hero Image 3",
        ratio: "wide",
        note: "Online business themed layout with clean composition and motivational headline hierarchy.",
      },
      {
        assetPath: "the-digital-income/The Digital Income - Hero Image 4",
        color: "from-teal-500/40 to-cyan-500/30",
        label: "Hero Image 4",
        ratio: "square",
        note: "Wealth-building visual combining metaphor-driven imagery with clear call-to-action framing.",
      },
      {
        assetPath: "the-digital-income/The Digital Income - Hero Image 5",
        color: "from-amber-400/40 to-yellow-500/30",
        label: "Hero Image 5",
        ratio: "wide",
        note: "Digital freedom concept graphic with modern typography and aspirational visual language.",
      },
      {
        assetPath: "the-digital-income/The Digital Income - Hero Image 6",
        color: "from-emerald-500/40 to-amber-400/30",
        label: "Hero Image 6",
        ratio: "square",
        note: "Financial literacy hero highlighting smart money management and income growth principles.",
      },
      {
        assetPath: "the-digital-income/The Digital Income - Hero Image 7",
        color: "from-amber-400/40 to-rose-500/30",
        label: "Hero Image 7",
        ratio: "square",
        note: "Closing hero reinforcing the digital income journey with motivational messaging and brand consistency.",
      },
    ],
  },
  createSimpleProject({
    slug: "tech-nexus-devcon-philippines",
    title: "Tech Nexus DevCon Philippines",
    cat: "Social Media Graphics",
    tag: "Event Graphics",
    desc: "Event social media graphics for Tech Nexus DevCon Philippines.",
    role: "Social Media Graphic Designer",
    color: "from-blue-500/50 to-violet-500/30",
    year: "2024",
    cardSize: "medium",
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
    cardSize: "medium",
    gallery: [
      {
        assetPath: "pyconf-mini-davao-2024/Community Partner ACCESS",
        color: "from-yellow-400/40 to-blue-500/30",
        label: "Community Partner",
        ratio: "wide",
        note: "Community partner acknowledgment graphic for the PyConF Mini event.",
      },
      {
        assetPath: "pyconf-mini-davao-2024/Group 256",
        color: "from-yellow-400/40 to-blue-500/30",
        label: "Event Graphic 1",
        ratio: "square",
        note: "Social media graphic for PyConF Mini Davao 2024.",
      },
      {
        assetPath: "pyconf-mini-davao-2024/Group 257",
        color: "from-yellow-400/40 to-blue-500/30",
        label: "Event Graphic 2",
        ratio: "square",
        note: "Promotional layout for the PyConF Mini conference.",
      },
      {
        assetPath: "pyconf-mini-davao-2024/Frame",
        color: "from-yellow-400/40 to-blue-500/30",
        label: "Frame Template",
        ratio: "square",
        note: "Branded frame template for PyConF Mini social content.",
      },
      {
        assetPath: "pyconf-mini-davao-2024/Group 258",
        color: "from-yellow-400/40 to-blue-500/30",
        label: "Event Graphic 3",
        ratio: "square",
        note: "Additional event graphic for the PyConF Mini series.",
      },
      {
        assetPath: "pyconf-mini-davao-2024/pyconf davao",
        color: "from-yellow-400/40 to-blue-500/30",
        label: "PyConF Davao",
        ratio: "wide",
        note: "PyConF Davao event graphic.",
      },
    ],
  }),
  createSimpleProject({
    slug: "google-io-extended-2025",
    title: "Google I/O Extended 2025",
    cat: "Social Media Graphics",
    tag: "Event Graphics",
    desc: "Event social media graphics for Google I/O Extended 2025.",
    role: "Social Media Graphic Designer",
    color: "from-blue-400/50 to-cyan-500/30",
    year: "2025",
    cardSize: "medium",
    gallery: [
      {
        assetPath: "google-io-extended-2025/google extend io 2025 1",
        color: "from-blue-400/50 to-cyan-500/30",
        label: "Hero Graphic",
        ratio: "wide",
        note: "Hero graphic for Google I/O Extended 2025.",
      },
      {
        assetPath: "google-io-extended-2025/google extend io 2025 2",
        color: "from-cyan-500/40 to-teal-500/30",
        label: "Speaker Announcement",
        ratio: "square",
        note: "Speaker announcement graphic.",
      },
      {
        assetPath: "google-io-extended-2025/google extend io 2025 3",
        color: "from-sky-400/40 to-blue-500/30",
        label: "Schedule Poster",
        ratio: "square",
        note: "Event schedule poster graphic.",
      },
      {
        assetPath: "google-io-extended-2025/google extend io 2025 4",
        color: "from-indigo-400/40 to-violet-500/30",
        label: "Registration",
        ratio: "square",
        note: "Registration call-to-action graphic.",
      },
      {
        assetPath: "google-io-extended-2025/google io 5",
        color: "from-blue-500/40 to-purple-500/30",
        label: "Social Post",
        ratio: "wide",
        note: "Social media post for Google I/O Extended.",
      },
    ],
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
    cardSize: "medium",
    gallery: [
      {
        color: "from-purple-500/50 to-pink-500/30",
        label: "Speaker Spotlight",
        assetPath: "enigma/Group 406",
        ratio: "wide",
        note: "Speaker feature graphic for the Figma Portfolio Masterclass.",
      },
      {
        color: "from-cyan-500/40 to-blue-500/30",
        label: "Event Announcement",
        assetPath: "enigma/Figma Masterclass _ Event Posting",
        ratio: "square",
        note: "Main event announcement for the Webvember masterclass.",
      },
      {
        color: "from-violet-500/40 to-fuchsia-500/30",
        label: "Feedback Form",
        assetPath: "enigma/Figma Masterclass _ Feedback Form",
        ratio: "square",
        note: "Post-event feedback form graphic.",
      },
      {
        color: "from-blue-500/40 to-violet-500/30",
        label: "Program Flow",
        assetPath: "enigma/Program Flow",
        ratio: "square",
        note: "Program schedule for the Figma Portfolio Masterclass.",
      },
    ],
  }),
  {
    slug: "salin-salin",
    title: "Salin-Salin",
    imageTitle: "salin webpage",
    cardSize: "medium",
    cat: "Web Development",
    kind: "frontend",
    tag: "Web Development",
    color: "from-teal-500/45 to-blue-500/30",
    desc: "Responsive web development project for Salin-Salin.",
    role: "Web Developer",
    tools: ["React 19", "TanStack Start", "TypeScript", "Vite 7", "Supabase"],
    year: "2025",
    client: "Salin-Salin",
    overview: "Responsive web development project for Salin-Salin.",
    goals: ["Build a responsive web experience.", "Ensure cross-device coverage."],
    impact: [
      { value: "1", label: "Web build" },
      { value: "100%", label: "Responsive coverage" },
    ],
    focusAreas: [],
    process: [],
    challenges: [],
    outcome: "Salin-Salin now has a responsive web build.",
    gallery: [
      {
        color: "from-teal-500/45 to-blue-500/30",
        label: "Primary View",
        ratio: "wide",
        note: "Showcase slot for Salin-Salin's main visual direction.",
      },
      {
        color: "from-cyan-500/40 to-teal-500/30",
        label: "Supporting Layout",
        ratio: "square",
        note: "Showcase slot for additional layouts and variations.",
      },
    ],
    vercelLiveUrl: "https://salin-salin.vercel.app/",
  },
  {
    slug: "handyman",
    title: "HandyMan",
    imageTitle: "handyman",
    cardSize: "medium",
    cat: "Web Development",
    kind: "frontend",
    tag: "Web Development",
    color: "from-orange-400/45 to-cyan-500/30",
    desc: "Java desktop application for booking services, hiring skilled workers, and renting tools.",
    role: "Java Developer",
    tools: ["Java", "JavaFX", "MySQL", "XAMPP", "Maven"],
    year: "2025",
    client: "HandyMan",
    overview:
      "HandyMan Tools and Services is a Java-based desktop application designed to streamline the process of booking services, hiring skilled workers, and renting tools. Built with JavaFX for a rich user interface and utilizing XAMPP for database management.",
    goals: [
      "Streamline service booking and tool rental processes.",
      "Provide a rich desktop UI experience with JavaFX.",
      "Manage user profiles, payments, and order history.",
    ],
    impact: [
      { value: "1", label: "Desktop application" },
      { value: "5+", label: "Core features" },
      { value: "1", label: "Database system" },
    ],
    focusAreas: [
      {
        title: "User Interface",
        text: "Built a rich JavaFX interface with screens for login, signup, profile management, service booking, and tool checkout.",
      },
      {
        title: "Database Management",
        text: "Designed and integrated a MySQL database via XAMPP to manage users, services, tools, bookings, and transactions.",
      },
      {
        title: "Feature System",
        text: "Implemented core features including employee directory with search filters, service booking with receipt generation, and tool rental checkout flow.",
      },
    ],
    process: [
      {
        title: "Planning",
        text: "Defined the application requirements, user flows, and database schema for the service booking and tool rental system.",
      },
      {
        title: "Design",
        text: "Created wireframes for the desktop application screens including login, profile, services, and checkout interfaces.",
      },
      {
        title: "Development",
        text: "Built the application using Java and JavaFX with MySQL database integration via XAMPP.",
      },
      {
        title: "Deliver",
        text: "Prepared the project repository with setup instructions and demo images for portfolio presentation.",
      },
    ],
    challenges: [
      {
        title: "Desktop UI Complexity",
        challenge:
          "Building an intuitive desktop UI that matches modern web application expectations required careful JavaFX layout design.",
        solution:
          "Used JavaFX's Scene Builder for visual layout design and implemented custom CSS styling for a polished look.",
      },
      {
        title: "Database Integration",
        challenge:
          "Setting up a reliable local database connection and schema that works across different environments.",
        solution:
          "Provided clear setup instructions for XAMPP and included the database schema export file in the repository.",
      },
    ],
    outcome:
      "HandyMan now has a fully functional Java desktop application for service booking and tool rental, with user authentication, profile management, and receipt generation features.",
    gallery: [
      {
        color: "from-orange-400/45 to-cyan-500/30",
        label: "Home Screen",
        ratio: "wide",
        note: "Main application landing page with service categories and quick access to booking features.",
      },
      {
        color: "from-cyan-500/40 to-teal-500/30",
        label: "About Us",
        ratio: "square",
        note: "About page detailing the HandyMan platform mission, vision, and service overview.",
      },
      {
        color: "from-blue-500/40 to-indigo-500/30",
        label: "Login",
        ratio: "square",
        note: "User authentication screen with email and password login for secure account access.",
      },
      {
        color: "from-emerald-500/40 to-teal-500/30",
        label: "Employee Directory",
        ratio: "square",
        note: "Browse skilled workers with search filters for specialization, availability, and location.",
      },
      {
        color: "from-cyan-500/40 to-orange-400/30",
        label: "Services Catalog",
        ratio: "square",
        note: "Service listings displaying available handyman services with pricing and duration details.",
      },
      {
        color: "from-orange-400/40 to-yellow-500/30",
        label: "Service Booking",
        ratio: "square",
        note: "Service booking and cart flow with receipt generation for booking confirmations.",
      },
      {
        color: "from-violet-500/40 to-purple-500/30",
        label: "Tool Cart",
        ratio: "square",
        note: "Tool rental cart with quantity selection, shipping address, and checkout options.",
      },
      {
        color: "from-orange-400/40 to-yellow-500/30",
        label: "Profile Management",
        ratio: "square",
        note: "User profile screen for managing personal information, payment methods, and saved addresses.",
      },
      {
        color: "from-rose-500/40 to-pink-500/30",
        label: "Order History",
        ratio: "square",
        note: "Complete history of past service bookings and tool rentals with status tracking.",
      },
    ],
    hideLiveWorkspace: true,
  },
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
    "dost-laon-logo",
    "umunity-logo",
  ],
  "UI/UX Design": ["umunity", "dost-laon", "pietyl-management-system", "adoptify"],
  "Web Development": [
    "cosmic-remedies-by-sia",
    "umunity-web",
    "pietyl-digilpg-web",
    "salin-salin",
    "handyman",
  ],
  "Social Media Graphics": [
    "blockchain-campus-conference-2024",
    "sidlac-co-social-media",
    "odara-management-group-social-media",
    "wound-care",
    "the-digital-income",
    "tech-nexus-devcon-philippines",
    "pyconf-mini-davao-2024",
    "google-io-extended-2025",
    "umsdc-publication-materials-and-assets",
    "enigma",
  ],
  "Creative Assets": ["enigma", "umsdc-publication-materials-and-assets"],
  "Writing / VA": ["eat-well-live-well-nutrition-ebook", "thriving-mind-mental-wellness-ebook"],
};

const directoryTitleOrder = [
  "Odara Management Group",
  "Lian Monley",
  "Pietyl DigiLPG",
  "Sidlac Co.",
  "Blue Collar Builders",
  "Trichomend+",
  "Adoptify",
  "Pietyl Management System",
  "DOST Laon",
  "Cosmic Remedies by Sia",
  "UMunity",
  "Blockchain Campus Conference 2024",
  "Wound Care",
  "The Digital Income",
  "Tech Nexus DevCon Philippines",
  "PyConF Mini Davao 2024",
  "UMSDC",
  "ENIGMA",
  "Eat Well, Live Well: Your Complete Food & Nutrition Guide",
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

export const getProjectBySlugAndCategory = (
  slug: string,
  category?: ProjectCategory,
): Project | undefined => {
  const base = getProject(slug);
  if (!base) return undefined;

  const cat = category ?? base.cat;

  const variant = base.categoryVariants?.[cat];
  const merged: Project = variant ? { ...base, ...variant } : { ...base };

  if (cat === "Web Development") merged.figmaPreviewUrl = undefined;
  if (cat === "UI/UX Design") merged.vercelLiveUrl = undefined;

  return merged;
};

const createCaseStudySummary = (project: Project) =>
  `This project focused on improving how ${project.title} communicates its value and works in practice.`;

const createCaseStudyApproach = (project: Project) =>
  `The solution centered on a clearer structure, stronger visual direction, and a presentation that fits the goals of ${project.title}.`;

const createCaseStudyContribution = (project: Project) =>
  `Supported the core direction and delivery of ${project.title}.`;

const normalizeCaseStudyProcessTitle = (step: ProjectProcessStep, index: number) =>
  step.title?.trim() || `Phase ${String(index + 1).padStart(2, "0")}`;

export const getProjectCaseStudyDuration = (project: Project) =>
  project.caseStudy?.duration?.trim() || "Timeline to be finalized";

export const getProjectCaseStudyTeam = (project: Project) =>
  project.caseStudy?.team?.trim() || "Team details to be updated";

export const getProjectCaseStudyProblem = (project: Project) =>
  project.caseStudy?.problem?.trim() ||
  project.challenges[0]?.challenge?.trim() ||
  createCaseStudySummary(project);

export const getProjectCaseStudyApproach = (project: Project) =>
  project.caseStudy?.approach?.trim() ||
  project.challenges[0]?.solution?.trim() ||
  createCaseStudyApproach(project);

export const getProjectCaseStudyContributions = (project: Project) => {
  const explicitContributions = project.caseStudy?.contributions?.filter(Boolean) ?? [];
  if (explicitContributions.length > 0) return explicitContributions;

  const focusAreaContributions = project.focusAreas
    .map((item) => item.title.trim())
    .filter(Boolean)
    .slice(0, 5);
  if (focusAreaContributions.length > 0) return focusAreaContributions;

  return [createCaseStudyContribution(project)];
};

export const getProjectCaseStudyOutcomes = (project: Project): ProjectCaseStudyOutcome[] => {
  const explicitOutcomes = project.caseStudy?.outcomes?.filter(
    (item) => item?.label?.trim() && item?.value?.trim(),
  );
  if (explicitOutcomes && explicitOutcomes.length > 0) return explicitOutcomes;

  if (project.impact.length > 0) {
    return project.impact.map((item) => ({ value: item.value, label: item.label }));
  }

  return [{ value: "In progress", label: "Final metrics" }];
};

export const getProjectCaseStudyModules = (project: Project): ProjectCaseStudyModule[] => {
  const explicitModules = project.caseStudy?.modules?.filter(
    (item) => item?.title?.trim() && item?.desc?.trim(),
  );
  if (explicitModules && explicitModules.length > 0) return explicitModules.slice(0, 4);

  if (project.gallery.length > 0) {
    return project.gallery.slice(0, 4).map((item) => ({
      title: item.label,
      desc: item.note,
    }));
  }

  if (project.process.length > 0) {
    return project.process.slice(0, 4).map((step, index) => ({
      title: normalizeCaseStudyProcessTitle(step, index),
      desc: step.text,
    }));
  }

  return [
    {
      title: "Overview screen",
      desc: `Introduces the primary structure and value of ${project.title}.`,
    },
  ];
};

export const getProjectCaseStudyContent = (
  project: Project,
): ResolvedProjectCaseStudyContent => ({
  duration: getProjectCaseStudyDuration(project),
  team: getProjectCaseStudyTeam(project),
  overview: project.caseStudy?.overview?.trim() || project.overview,
  problem: getProjectCaseStudyProblem(project),
  approach: getProjectCaseStudyApproach(project),
  contributions: getProjectCaseStudyContributions(project),
  outcomes: getProjectCaseStudyOutcomes(project),
  modules: getProjectCaseStudyModules(project),
  nextLabel: project.caseStudy?.nextLabel?.trim() || "Next project",
});
