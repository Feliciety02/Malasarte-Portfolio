export type ProjectCategory =
  | "UI/UX Design"
  | "Publication"
  | "Logo & Branding"
  | "Front End Development"
  | "Writing / VA";

export type ProjectKind =
  | "uiux"
  | "publication"
  | "branding"
  | "frontend"
  | "writing";

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

export type ProjectFocusArea = {
  title: string;
  text: string;
};

export type Project = {
  slug: string;
  title: string;
  cat: ProjectCategory;
  kind: ProjectKind;
  categories?: ProjectCategory[];
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
  nextProjectSlug?: string;
};

export const categoryDescriptions: Record<"All" | ProjectCategory, string> = {
  All: "A curated mix of interfaces, identity systems, publication assets, front-end builds, and writing support work.",
  "UI/UX Design": "Apps, dashboards, wireframes, flows, prototypes, and systems shaped around usability and clarity.",
  Publication: "Pubmats, campaign assets, eBook layouts, social graphics, and publication systems with strong visual direction.",
  "Logo & Branding": "Logos, brand boards, identity systems, mockups, palettes, and typography-led brand work.",
  "Front End Development": "Responsive page builds, interface implementation, and front-end systems translated from design into working screens.",
  "Writing / VA": "Writing systems, content deliverables, support workflows, organization processes, and virtual assistant tasks.",
};

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
      { title: "Brand Overview", text: "Clarified the group's positioning around professionalism, structure, and long-term trust." },
      { title: "Design Direction", text: "Developed a cleaner corporate direction with sharper type, disciplined spacing, and restrained color use." },
      { title: "Concept Development", text: "Explored multiple mark structures before refining the strongest symbol and wordmark relationship." },
      { title: "Logo Meaning", text: "Shaped the final identity to communicate steadiness, leadership, and professional clarity." },
      { title: "Color Palette", text: "Defined a palette that balances authority with approachability for both screen and print use." },
      { title: "Typography", text: "Used a firm typographic system to support corporate communications and brand consistency." },
      { title: "Brand Applications", text: "Extended the identity into stationery, presentation covers, and executive-facing mockups." },
    ],
    process: [
      { title: "Research", text: "Reviewed competitor identities and collected references for more credible corporate visual language." },
      { title: "Concept", text: "Built several logo directions and tested how each would behave in formal communication materials." },
      { title: "Design", text: "Refined the symbol, typography system, and supporting brand assets into one cohesive system." },
      { title: "Deliver", text: "Prepared a reusable identity package with placeholder applications for print and digital outputs." },
    ],
    challenges: [
      {
        title: "Professional Without Feeling Cold",
        challenge: "The brand needed authority without becoming visually stiff or dated.",
        solution: "Used a sharper system with controlled contrast and cleaner spacing instead of relying on overly conservative visual tropes.",
      },
      {
        title: "Versatility",
        challenge: "The logo had to work across presentations, documents, and digital channels.",
        solution: "Built multiple lockups and spacing rules to keep the system usable in different contexts.",
      },
    ],
    outcome:
      "The final identity gives Odara Management Group a clearer and more professional visual foundation that can scale across core business touchpoints.",
    gallery: [
      { color: "from-fuchsia-500/50 to-violet-500/30", label: "Primary Mark", ratio: "square", note: "Placeholder for the final logo and alternate lockups." },
      { color: "from-violet-500/40 to-indigo-500/30", label: "Brand Board", ratio: "wide", note: "Placeholder for palette, typography, and visual rules." },
      { color: "from-pink-500/40 to-purple-500/30", label: "Stationery", ratio: "tall", note: "Placeholder for business card and document applications." },
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
      { title: "Brand Overview", text: "Positioned the brand around confidence, polish, and an editorial sense of self-presentation." },
      { title: "Design Direction", text: "Used a softer luxury direction with deliberate spacing, elegant type, and clean contrast." },
      { title: "Concept Development", text: "Explored monograms, initials, and signature-based directions before refining the strongest route." },
      { title: "Logo Meaning", text: "Built a mark that feels personal, polished, and easy to use across digital formats." },
      { title: "Color Palette", text: "Selected a palette that feels sophisticated without being overly rigid." },
      { title: "Typography", text: "Paired display and supporting type to keep the brand expressive but controlled." },
      { title: "Brand Applications", text: "Applied the system to profile visuals, covers, and self-promotional assets." },
    ],
    process: [
      { title: "Research", text: "Collected references from editorial and personal branding spaces to define a stronger visual tone." },
      { title: "Concept", text: "Tested initials, wordmarks, and signature-inspired forms before narrowing the identity route." },
      { title: "Design", text: "Built the logo, typography pairings, and digital-ready brand applications." },
      { title: "Deliver", text: "Prepared a mini brand kit with placeholder social and presentation mockups." },
    ],
    challenges: [
      {
        title: "Personal But Polished",
        challenge: "The identity needed to feel individual without looking informal.",
        solution: "Used stronger typographic control and a more restrained system rather than decorative branding tricks.",
      },
      {
        title: "Digital Adaptability",
        challenge: "The brand would live mostly across small digital touchpoints.",
        solution: "Prioritized clarity, clean spacing, and simplified applications for better consistency online.",
      },
    ],
    outcome:
      "The final system gives Lian Monley a cleaner and more intentional personal brand that can scale across public-facing materials.",
    gallery: [
      { color: "from-rose-500/50 to-pink-500/30", label: "Identity Mark", ratio: "square", note: "Placeholder for primary logo and personal monogram." },
      { color: "from-pink-500/40 to-fuchsia-500/30", label: "Profile System", ratio: "wide", note: "Placeholder for social headers and branded profile assets." },
      { color: "from-amber-300/30 to-rose-400/30", label: "Presentation Cover", ratio: "tall", note: "Placeholder for deck and personal introduction layouts." },
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
      { title: "Brand Overview", text: "Positioned the business around reliability, service trust, and local recognizability." },
      { title: "Design Direction", text: "Built a stronger and more direct visual system suited to service branding and physical visibility." },
      { title: "Concept Development", text: "Explored icon and wordmark combinations that could feel clear even at signage scale." },
      { title: "Logo Meaning", text: "Used a more practical mark structure to support fast recognition and brand memorability." },
      { title: "Color Palette", text: "Chose high-visibility colors suited to real-world application use." },
      { title: "Brand Applications", text: "Extended the identity into vehicle, uniform, and signage mockups." },
    ],
    process: [
      { title: "Research", text: "Reviewed category competitors and studied practical constraints of service-based branding." },
      { title: "Concept", text: "Developed mark directions that prioritized clarity and direct recognition." },
      { title: "Design", text: "Refined the final logo, palette, and utility-focused application set." },
      { title: "Deliver", text: "Prepared a practical brand package with placeholder field-use mockups." },
    ],
    challenges: [
      {
        title: "Utility Brand Perception",
        challenge: "The business needed to feel professional without overcomplicating the identity.",
        solution: "Focused on clarity, visibility, and simpler geometry instead of decorative branding language.",
      },
      {
        title: "Real-world Use",
        challenge: "The identity needed to survive physical applications and quick recognition.",
        solution: "Tested the logo against signage, uniforms, and branded operational materials early.",
      },
    ],
    outcome:
      "Pietyl LPG gained a more coherent and more visible brand identity suited to both business credibility and practical use.",
    gallery: [
      { color: "from-sky-500/50 to-blue-500/30", label: "Primary Identity", ratio: "square", note: "Placeholder for core logo and service lockups." },
      { color: "from-blue-500/40 to-cyan-500/30", label: "Vehicle Mockup", ratio: "wide", note: "Placeholder for transport and field-use branding." },
      { color: "from-cyan-400/40 to-sky-400/30", label: "Uniform Application", ratio: "tall", note: "Placeholder for apparel and service personnel mockups." },
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
      { title: "Brand Overview", text: "Clarified the brand around trust, labor, and dependable construction service." },
      { title: "Design Direction", text: "Built a more solid and industrial direction with stronger weight and direct visual language." },
      { title: "Concept Development", text: "Explored builder-related geometry and structural mark ideas before refining the final route." },
      { title: "Logo Meaning", text: "Used a mark that feels sturdy and practical while remaining easy to reproduce." },
      { title: "Color Palette", text: "Defined a more grounded, professional palette suited to real-world site applications." },
      { title: "Brand Applications", text: "Extended the identity into uniforms, equipment, and site-visible branding contexts." },
    ],
    process: [
      { title: "Research", text: "Reviewed construction identities and mapped what signals credibility in the category." },
      { title: "Concept", text: "Created heavier, more structural identity directions suited to construction branding." },
      { title: "Design", text: "Refined the final mark, palette, and supporting business applications." },
      { title: "Deliver", text: "Packaged the brand as a practical system with reusable mockup slots." },
    ],
    challenges: [
      {
        title: "Strong Without Feeling Generic",
        challenge: "Construction branding can quickly collapse into predictable icon choices.",
        solution: "Pushed for more ownable structure and typographic control instead of relying on cliché symbols alone.",
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
      { color: "from-indigo-500/50 to-sky-500/30", label: "Brand Mark", ratio: "square", note: "Placeholder for primary builder identity and supporting lockups." },
      { color: "from-sky-500/40 to-slate-500/30", label: "Equipment Branding", ratio: "wide", note: "Placeholder for on-site and vehicle branding." },
      { color: "from-slate-400/40 to-indigo-500/30", label: "Uniform System", ratio: "tall", note: "Placeholder for apparel and contractor-facing brand use." },
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
      { title: "Brand Overview", text: "Defined a stronger health-product position built around trust, efficacy, and polish." },
      { title: "Design Direction", text: "Used a cleaner, more clinical-leaning system balanced with enough softness to stay approachable." },
      { title: "Concept Development", text: "Explored logotype and symbol routes that would feel product-ready across packaging and campaigns." },
      { title: "Logo Meaning", text: "Built a mark that communicates progress, care, and treatment structure." },
      { title: "Color Palette", text: "Chose fresher but controlled tones to support product messaging and shelf clarity." },
      { title: "Brand Applications", text: "Extended the system into packaging and branded marketing visuals to prove usability." },
    ],
    process: [
      { title: "Research", text: "Reviewed adjacent health and treatment product brands to find the right balance between science and accessibility." },
      { title: "Concept", text: "Developed typographic and icon-led routes aimed at stronger credibility and cleaner packaging use." },
      { title: "Design", text: "Refined the final mark, palette, and applications into a concise product identity system." },
      { title: "Deliver", text: "Prepared presentation-ready placeholders for packaging, promo visuals, and product-facing materials." },
    ],
    challenges: [
      {
        title: "Science and Warmth",
        challenge: "The product needed to feel credible without becoming visually cold or overly clinical.",
        solution: "Built a more controlled system that used cleaner geometry with approachable color and spacing.",
      },
      {
        title: "Packaging Readiness",
        challenge: "The identity needed to hold up well on packaging and marketing visuals.",
        solution: "Tested the mark and system against product-oriented layouts early in the process.",
      },
    ],
    outcome:
      "Trichomend+ now has a more polished product identity direction that can scale into packaging and campaign assets.",
    gallery: [
      { color: "from-emerald-500/50 to-teal-500/30", label: "Product Mark", ratio: "square", note: "Placeholder for core product mark and supporting lockups." },
      { color: "from-teal-500/40 to-cyan-500/30", label: "Packaging Concept", ratio: "tall", note: "Placeholder for bottle, box, or treatment packaging visuals." },
      { color: "from-green-400/40 to-emerald-500/30", label: "Promo Layout", ratio: "wide", note: "Placeholder for digital campaign or product promo mockups." },
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
      { title: "Research", text: "Mapped emotional and practical pain points in adoption journeys to inform tone and interface decisions." },
      { title: "User Flow", text: "Connected browse, filter, profile review, inquiry, and status-tracking flows into one clearer system." },
      { title: "Wireframes", text: "Validated the listing and profile structure before introducing polished UI treatments." },
      { title: "Final UI", text: "Built a softer and more human interface system focused on trust, readability, and supportive pacing." },
      { title: "Prototype", text: "Linked the critical adoption steps into a realistic experience for review and testing." },
      { title: "Components", text: "Created reusable cards, status indicators, and messaging patterns for future growth." },
    ],
    process: [
      { title: "Research", text: "Reviewed adoption platform patterns and user frustrations to identify trust gaps and navigation pain points." },
      { title: "Concept", text: "Built a simpler content hierarchy around listings, eligibility cues, and action steps." },
      { title: "Design", text: "Developed the end-to-end interface flow, reusable UI patterns, and polished screen designs." },
      { title: "Deliver", text: "Prepared a structured case study and placeholder gallery areas for future production visuals." },
    ],
    challenges: [
      {
        title: "Emotional Clarity",
        challenge: "Adoption platforms need to feel supportive without overwhelming users with dense information.",
        solution: "Structured content around progressive disclosure and made critical actions more visible and reassuring.",
      },
      {
        title: "Trust in a Digital Flow",
        challenge: "Users needed clearer signals around process legitimacy and next steps.",
        solution: "Used profile clarity, status structure, and guided inquiry flows to reduce uncertainty.",
      },
    ],
    outcome:
      "Adoptify demonstrates a more compassionate and more organized product direction for adoption-centered digital experiences.",
    gallery: [
      { color: "from-violet-500/50 to-indigo-500/30", label: "Listing Flow", ratio: "wide", note: "Placeholder for browse, filter, and profile overview screens." },
      { color: "from-indigo-500/40 to-purple-500/30", label: "Profile Detail", ratio: "square", note: "Placeholder for animal or applicant profile layouts." },
      { color: "from-purple-500/40 to-pink-500/30", label: "Inquiry Journey", ratio: "square", note: "Placeholder for application and follow-up interface states." },
    ],
    nextProjectSlug: "pietyl-management-system",
  },
  {
    slug: "pietyl-management-system",
    title: "Pietyl Management System",
    cat: "UI/UX Design",
    kind: "uiux",
    tag: "Management System",
    color: "from-sky-500/50 to-indigo-500/30",
    desc: "System design for a business management platform.",
    role: "Product Designer",
    tools: ["Figma", "FigJam"],
    year: "2025",
    client: "Pietyl",
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
      { title: "Research", text: "Mapped operational tasks and user roles to decide what information mattered most in the core system view." },
      { title: "User Flow", text: "Structured movement between dashboard, records, workflows, and monitoring sections." },
      { title: "Wireframes", text: "Explored low-fidelity structures to reduce complexity before visual refinement." },
      { title: "Final UI", text: "Created a cleaner management environment with stronger hierarchy and reusable modules." },
      { title: "Prototype", text: "Connected the core flows to demonstrate navigation logic and task-based transitions." },
      { title: "Components", text: "Built reusable tables, form patterns, cards, and status modules for scale." },
    ],
    process: [
      { title: "Research", text: "Observed system needs and grouped them into clearer operational categories." },
      { title: "Concept", text: "Defined a management structure that reduced menu friction and improved task visibility." },
      { title: "Design", text: "Built dashboards, monitoring views, record systems, and reusable operational UI patterns." },
      { title: "Deliver", text: "Prepared a modular case study with placeholder screens for future system expansion." },
    ],
    challenges: [
      {
        title: "Dense Operational Content",
        challenge: "The system needed to support many functions without becoming visually heavy.",
        solution: "Used modular grouping and clearer hierarchy to separate tasks and reduce cognitive load.",
      },
      {
        title: "Scalable Structure",
        challenge: "The system needed to remain flexible as more business modules were added.",
        solution: "Designed reusable layouts and navigation patterns instead of solving each view separately.",
      },
    ],
    outcome:
      "The resulting concept gives Pietyl a more scalable management-system direction built around clarity and long-term usability.",
    gallery: [
      { color: "from-sky-500/50 to-indigo-500/30", label: "Dashboard", ratio: "wide", note: "Placeholder for overview metrics and key actions." },
      { color: "from-indigo-500/40 to-blue-500/30", label: "Records Module", ratio: "square", note: "Placeholder for lists, forms, and record-detail screens." },
      { color: "from-cyan-500/40 to-sky-500/30", label: "Workflow Tracking", ratio: "square", note: "Placeholder for operational status and monitoring views." },
    ],
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
      { title: "Research", text: "Reviewed public-sector information patterns and usability issues around clarity, access, and structure." },
      { title: "User Flow", text: "Mapped key navigation and service flows to reduce confusion and dead-end states." },
      { title: "Wireframes", text: "Organized large content structures into clearer low-fidelity page systems." },
      { title: "Final UI", text: "Built a cleaner and more accessible interface language with stronger hierarchy and structure." },
      { title: "Prototype", text: "Connected service pages and informational flows to validate user understanding." },
      { title: "Components", text: "Created reusable interface sections for content blocks, navigation, and service actions." },
    ],
    process: [
      { title: "Research", text: "Analyzed public information flows and user pain points around finding relevant content quickly." },
      { title: "Concept", text: "Defined a cleaner information architecture focused on better service discoverability." },
      { title: "Design", text: "Built interface layouts, content structures, and reusable page sections for core flows." },
      { title: "Deliver", text: "Prepared structured screens and placeholder gallery areas for future refinement." },
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
      { color: "from-blue-500/50 to-cyan-500/30", label: "Landing View", ratio: "wide", note: "Placeholder for homepage and access-entry layout." },
      { color: "from-cyan-500/40 to-sky-500/30", label: "Service Pages", ratio: "square", note: "Placeholder for service and program detail screens." },
      { color: "from-indigo-500/40 to-cyan-500/30", label: "Navigation System", ratio: "square", note: "Placeholder for menus, page structure, and content modules." },
    ],
    nextProjectSlug: "cosmic-remedies-by-sia",
  },
  {
    slug: "cosmic-remedies-by-sia",
    title: "Cosmic Remedies by Sia",
    cat: "UI/UX Design",
    categories: ["Front End Development"],
    kind: "frontend",
    tag: "UI + Front End",
    color: "from-violet-500/50 to-cyan-500/30",
    desc: "A digital product and front-end experience for Cosmic Remedies by Sia.",
    role: "UI/UX Designer and Front-End Developer",
    tools: ["Figma", "React", "Tailwind CSS"],
    year: "2025",
    client: "Cosmic Remedies by Sia",
    overview:
      "Cosmic Remedies by Sia combines interface direction and front-end implementation for a more immersive digital experience rooted in storytelling, product presentation, and responsive build quality.",
    goals: [
      "Design a cohesive digital experience that matches the brand's unique personality.",
      "Translate the interface into a working responsive front-end build.",
      "Keep the experience polished across both design and implementation layers.",
    ],
    impact: [
      { value: "1", label: "Design-to-build flow" },
      { value: "100%", label: "Responsive coverage" },
      { value: "20+", label: "Implemented sections" },
    ],
    focusAreas: [
      { title: "Layout Strategy", text: "Defined the page rhythm, content structure, and sequencing before development started." },
      { title: "Page Sections", text: "Built a flexible composition for hero, product, story, and CTA sections." },
      { title: "Responsive Design", text: "Adjusted spacing, hierarchy, and visual treatment across desktop and mobile breakpoints." },
      { title: "Animation Ideas", text: "Added controlled motion and transitions to preserve personality without hurting readability." },
      { title: "Final Screens", text: "Created high-fidelity UI before translating the work into a front-end build." },
      { title: "Front-End Build", text: "Implemented the interface using reusable components and responsive front-end structure." },
    ],
    process: [
      { title: "Research", text: "Reviewed the brand direction and audience mood to shape both interface and implementation decisions." },
      { title: "Concept", text: "Defined the visual narrative and translated it into a buildable page system." },
      { title: "Design", text: "Created the final screens, motion direction, and reusable design patterns." },
      { title: "Deliver", text: "Implemented the front end with placeholder assets and reusable sections ready for iteration." },
    ],
    challenges: [
      {
        title: "Design to Development Consistency",
        challenge: "Maintaining the intended mood while translating the interface into code required careful simplification.",
        solution: "Used reusable section logic and controlled motion so the build preserved the design language.",
      },
      {
        title: "Atmosphere Across Breakpoints",
        challenge: "The experience needed to remain expressive on smaller screens without becoming cluttered.",
        solution: "Restructured sections responsively and simplified visual density for mobile states.",
      },
    ],
    outcome:
      "Cosmic Remedies by Sia stands as both a UI/UX project and a front-end implementation case, showing continuity from concept to working experience.",
    gallery: [
      { color: "from-violet-500/50 to-cyan-500/30", label: "Hero Section", ratio: "wide", note: "Placeholder for landing hero design and implementation state." },
      { color: "from-cyan-500/40 to-indigo-500/30", label: "Product Layout", ratio: "square", note: "Placeholder for product or content section screens." },
      { color: "from-indigo-500/40 to-purple-500/30", label: "Responsive Build", ratio: "square", note: "Placeholder for mobile and desktop implementation comparisons." },
    ],
    nextProjectSlug: "umunity",
  },
  {
    slug: "umunity",
    title: "UMunity",
    cat: "UI/UX Design",
    kind: "uiux",
    tag: "School Org UX System",
    color: "from-cyan-500/50 to-blue-500/30",
    desc: "A school organization management system designed for clearer student workflows and easier coordination.",
    role: "UI/UX Designer",
    tools: ["Figma", "Miro", "Notion"],
    year: "2025",
    client: "UMunity",
    overview:
      "UMunity is a school organization management system focused on events, communication, records, and coordination. This case study centers on the UX structure, interface logic, and product flow for student members and organization officers.",
    goals: [
      "Simplify school organization workflows for members and officers.",
      "Create a system that feels organized and easy to navigate.",
      "Design a dashboard and module system that supports faster task completion.",
    ],
    impact: [
      { value: "6", label: "Core modules" },
      { value: "30+", label: "UI screens" },
      { value: "3", label: "Main user flows" },
    ],
    focusAreas: [
      { title: "Research", text: "Mapped common student-organization pain points around announcements, records, and task coordination." },
      { title: "User Flow", text: "Connected login, dashboard, event, records, and communication flows into one structured system." },
      { title: "Wireframes", text: "Used early structural layouts to align modules before moving into polished UI and code." },
      { title: "Final UI", text: "Created a more organized dashboard environment for student and officer tasks." },
      { title: "Prototype", text: "Defined clearer transitions between dashboard, events, announcements, and records states." },
      { title: "Components", text: "Built repeatable panels, cards, tables, and navigation modules to support future scale." },
    ],
    process: [
      { title: "Research", text: "Observed school organization workflows and identified repeated friction in coordination tasks." },
      { title: "Concept", text: "Defined a system structure that made officer and member actions easier to find and complete." },
      { title: "Design", text: "Built the dashboard, module layouts, and reusable interface system." },
      { title: "Deliver", text: "Prepared the case study and interface system for future implementation and testing." },
    ],
    challenges: [
      {
        title: "Multi-role Complexity",
        challenge: "The system had to support both student members and organization officers with different needs.",
        solution: "Built a clearer dashboard and module structure with more readable role-oriented actions.",
      },
      {
        title: "Information Density",
        challenge: "Announcements, records, and event tools could quickly become overwhelming in one dashboard.",
        solution: "Grouped actions into clearer modules and used stronger visual hierarchy to reduce scanning effort.",
      },
    ],
    outcome:
      "UMunity shows a clearer UX direction for a school organization system, with structured flows and a more manageable dashboard experience for student-led operations.",
    gallery: [
      { color: "from-cyan-500/50 to-blue-500/30", label: "Dashboard", ratio: "wide", note: "Placeholder for main dashboard and overview state." },
      { color: "from-blue-500/40 to-indigo-500/30", label: "Module Screens", ratio: "square", note: "Placeholder for records, events, or announcement modules." },
      { color: "from-indigo-500/40 to-cyan-500/30", label: "Wireframes and Flow", ratio: "square", note: "Placeholder for wireframes, navigation map, and core UX paths." },
    ],
    nextProjectSlug: "umunity-school-org-management-system",
  },
  {
    slug: "umunity-school-org-management-system",
    title: "UMunity School Org Management System",
    cat: "Front End Development",
    kind: "frontend",
    tag: "Front-End System Build",
    color: "from-blue-500/50 to-cyan-500/30",
    desc: "A responsive front-end implementation for the UMunity school organization management system.",
    role: "Front-End Developer",
    tools: ["React", "Tailwind CSS", "TypeScript", "Figma"],
    year: "2025",
    client: "UMunity",
    overview:
      "This case study focuses on translating the UMunity product design into a working front-end system with reusable components, responsive layouts, and clearer student-facing interactions.",
    goals: [
      "Turn the designed interface into a working front-end experience.",
      "Keep the dashboard and modules responsive across devices.",
      "Build reusable UI patterns that support future iteration.",
    ],
    impact: [
      { value: "1", label: "Working build" },
      { value: "50+", label: "Implemented states" },
      { value: "100%", label: "Responsive coverage" },
    ],
    focusAreas: [
      { title: "Layout Strategy", text: "Mapped the dashboard, module pages, and action areas into reusable layout patterns." },
      { title: "Page Sections", text: "Implemented distinct views for announcements, events, records, and overview modules." },
      { title: "Responsive Design", text: "Adjusted navigation, spacing, and card density to preserve usability on smaller screens." },
      { title: "Animation Ideas", text: "Used controlled transitions and hover states to make the interface feel more polished without adding noise." },
      { title: "Final Screens", text: "Aligned the built interface closely with the design while keeping the implementation maintainable." },
      { title: "Front-End Build", text: "Created reusable components and responsive screen logic to support a scalable student system." },
    ],
    process: [
      { title: "Plan", text: "Reviewed the approved UI and broke the system into reusable layouts, cards, and navigation patterns." },
      { title: "Structure", text: "Built the dashboard shell, module views, and page relationships before refining detail states." },
      { title: "Implement", text: "Translated the visual system into code with consistent spacing, components, and interaction states." },
      { title: "Refine", text: "Adjusted responsiveness and component behavior to keep the system usable across breakpoints." },
    ],
    challenges: [
      {
        title: "Complex Module Coverage",
        challenge: "The system included multiple page types and student tasks that could become inconsistent during implementation.",
        solution: "Relied on repeatable layout patterns and reusable UI pieces instead of one-off page structures.",
      },
      {
        title: "Responsive Density",
        challenge: "Dashboards can become cramped quickly on tablet and mobile widths.",
        solution: "Reduced density, reflowed content blocks, and simplified action grouping at smaller breakpoints.",
      },
    ],
    outcome:
      "The front-end build gives UMunity a more complete and scalable implementation layer, preserving the product direction while making the system usable in code.",
    gallery: [
      { color: "from-blue-500/50 to-cyan-500/30", label: "Built Dashboard", ratio: "wide", note: "Placeholder for the implemented dashboard and summary modules." },
      { color: "from-cyan-500/40 to-sky-500/30", label: "Responsive Screens", ratio: "square", note: "Placeholder for mobile and desktop front-end comparisons." },
      { color: "from-indigo-500/40 to-blue-500/30", label: "Component Set", ratio: "square", note: "Placeholder for tables, cards, forms, and navigation patterns in code." },
    ],
    nextProjectSlug: "umsdc-publication-materials-and-assets",
  },
  {
    slug: "umsdc-publication-materials-and-assets",
    title: "UMSDC Publication Materials and Assets",
    cat: "Publication",
    kind: "publication",
    tag: "Org Publication System",
    color: "from-pink-500/50 to-orange-400/30",
    desc: "Publication materials and visual assets for UMSDC.",
    role: "Publication Designer",
    tools: ["Figma", "Photoshop", "Canva"],
    year: "2024",
    client: "UMSDC",
    overview:
      "UMSDC Publication Materials and Assets gathers social posts, organization graphics, event visuals, and campaign-ready publication outputs under one reusable visual system.",
    goals: [
      "Support organization communication with clear and cohesive publication materials.",
      "Create reusable assets for recurring announcements and campaigns.",
      "Keep the materials flexible enough for fast student-organization workflows.",
    ],
    impact: [
      { value: "15+", label: "Assets produced" },
      { value: "1", label: "Visual system" },
      { value: "5", label: "Recurring formats" },
    ],
    focusAreas: [
      { title: "Campaign Goal", text: "Defined how the publication assets should support visibility, announcement clarity, and event participation." },
      { title: "Visual Direction", text: "Built a graphic language that could work across org posts, event graphics, and digital campaigns." },
      { title: "Typography", text: "Used headline-led hierarchy to improve quick reading and visual consistency." },
      { title: "Layout System", text: "Prepared repeatable templates for announcements, recaps, and static campaign assets." },
      { title: "Final Pubmats", text: "Delivered a stronger and more reusable publication system for organization use." },
    ],
    process: [
      { title: "Research", text: "Reviewed the organization's communication needs and previous asset inconsistencies." },
      { title: "Concept", text: "Defined a more flexible visual direction that could scale across multiple post formats." },
      { title: "Design", text: "Created reusable publication assets, event graphics, and announcement compositions." },
      { title: "Deliver", text: "Packaged the system with placeholder examples for future org campaigns and updates." },
    ],
    challenges: [
      {
        title: "Fast Content Turnaround",
        challenge: "Student organization timelines often required quick asset creation with limited revision windows.",
        solution: "Built more reusable structures so new outputs could be produced faster without losing consistency.",
      },
      {
        title: "Cross-format Consistency",
        challenge: "The materials needed to remain cohesive across posts, story sizes, and campaign assets.",
        solution: "Used a defined visual system and recurring type behavior across all formats.",
      },
    ],
    outcome:
      "UMSDC now has a cleaner, more reusable publication system for organization materials and digital assets.",
    gallery: [
      { color: "from-pink-500/50 to-orange-400/30", label: "Announcement Asset", ratio: "tall", note: "Placeholder for publication post and key announcement layout." },
      { color: "from-rose-500/40 to-pink-500/30", label: "Campaign Set", ratio: "wide", note: "Placeholder for event or campaign visual system." },
      { color: "from-orange-400/40 to-amber-400/30", label: "Org Graphics", ratio: "wide", note: "Placeholder for recurring organization assets and social support materials." },
    ],
    nextProjectSlug: "eat-well-live-well-nutrition-ebook",
  },
  {
    slug: "eat-well-live-well-nutrition-ebook",
    title: "Eat Well, Live Well Nutrition eBook Writing and Cover Design",
    cat: "Writing / VA",
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
      { title: "Task Overview", text: "Combined educational writing with a simple but polished publication cover direction." },
      { title: "Workflow", text: "Planned the chapter structure, key topics, drafting sequence, and cover-design process together." },
      { title: "Content Samples", text: "Developed clear sections, summaries, and practical nutrition guidance for readers." },
      { title: "Organization Process", text: "Structured the content to keep the eBook readable and balanced from start to finish." },
      { title: "Final Deliverables", text: "Delivered both the written content and a supporting cover design as one complete package." },
    ],
    process: [
      { title: "Research", text: "Reviewed reliable nutrition references and benchmarked how similar eBooks structure educational content." },
      { title: "Concept", text: "Mapped the writing flow, section order, and visual tone of the cover before production." },
      { title: "Design", text: "Drafted the content and created the eBook cover with a clearer reader-facing presentation." },
      { title: "Deliver", text: "Organized the work into a polished eBook structure with placeholder visuals for internal pages and cover use." },
    ],
    challenges: [
      {
        title: "Educational Clarity",
        challenge: "The information needed to stay accurate while still being approachable and easy to read.",
        solution: "Used simpler phrasing, tighter section flow, and more practical organization throughout the writing.",
      },
      {
        title: "Writing and Design Alignment",
        challenge: "The cover needed to feel connected to the tone of the written content.",
        solution: "Treated the visual direction as part of the same communication system rather than a separate task.",
      },
    ],
    outcome:
      "The final output delivered a clearer educational eBook experience with both content and cover design working together cohesively.",
    gallery: [
      { color: "from-emerald-400/50 to-lime-500/30", label: "Cover Design", ratio: "tall", note: "Placeholder for the final eBook cover design." },
      { color: "from-lime-400/40 to-green-500/30", label: "Chapter Layout", ratio: "wide", note: "Placeholder for internal content and chapter structure." },
      { color: "from-green-400/40 to-emerald-500/30", label: "Content Sample", ratio: "wide", note: "Placeholder for writing samples or page spreads." },
    ],
    nextProjectSlug: "thriving-mind-mental-wellness-ebook",
  },
  {
    slug: "thriving-mind-mental-wellness-ebook",
    title: "Thriving Mind Mental Wellness eBook Writing and Cover Design",
    cat: "Writing / VA",
    kind: "writing",
    tag: "eBook Writing",
    color: "from-violet-500/50 to-pink-500/30",
    desc: "Writing and cover design for a mental wellness eBook.",
    role: "Content Writer and Layout Designer",
    tools: ["Google Docs", "Canva", "Figma"],
    year: "2024",
    client: "Mental Wellness eBook Project",
    overview:
      "Thriving Mind is a mental wellness eBook project that combined written educational content and cover design into one calm, reader-friendly digital publication.",
    goals: [
      "Write clearer and more supportive content around mental wellness topics.",
      "Create a cover design that feels calm, professional, and accessible.",
      "Organize the eBook into a structure that supports sustained reading.",
    ],
    impact: [
      { value: "1", label: "Completed eBook" },
      { value: "1", label: "Cover design" },
      { value: "7+", label: "Key sections" },
    ],
    focusAreas: [
      { title: "Task Overview", text: "Combined writing and cover design around a more supportive and accessible mental wellness resource." },
      { title: "Workflow", text: "Planned the topics, section order, writing tone, and visual identity as one unified process." },
      { title: "Content Samples", text: "Prepared reader-friendly sections designed to feel clear, calm, and useful." },
      { title: "Organization Process", text: "Structured the eBook for better pacing, readability, and consistent tone." },
      { title: "Final Deliverables", text: "Delivered the completed written content and an aligned eBook cover design." },
    ],
    process: [
      { title: "Research", text: "Reviewed mental wellness content approaches and organized the material into more supportive sections." },
      { title: "Concept", text: "Defined tone, pacing, and visual direction before final drafting and cover design work." },
      { title: "Design", text: "Wrote the content and created the supporting eBook cover as one communication package." },
      { title: "Deliver", text: "Prepared the final structure with placeholder visuals for cover and interior content previews." },
    ],
    challenges: [
      {
        title: "Tone Sensitivity",
        challenge: "Mental wellness content needs care in both wording and presentation.",
        solution: "Used calmer language, gentler pacing, and more measured visual direction throughout the project.",
      },
      {
        title: "Maintaining Reader Flow",
        challenge: "Longer educational content can lose attention if the structure is too dense.",
        solution: "Broke ideas into clearer sections and supported the reading experience with cleaner formatting logic.",
      },
    ],
    outcome:
      "Thriving Mind became a more cohesive eBook project where tone, structure, and design all support the same calm reading experience.",
    gallery: [
      { color: "from-violet-500/50 to-pink-500/30", label: "Cover Design", ratio: "tall", note: "Placeholder for the final mental wellness eBook cover." },
      { color: "from-pink-500/40 to-purple-500/30", label: "Interior Structure", ratio: "wide", note: "Placeholder for section layouts and chapter organization." },
      { color: "from-indigo-500/40 to-violet-500/30", label: "Writing Sample", ratio: "wide", note: "Placeholder for sample pages and content excerpts." },
    ],
    nextProjectSlug: "odara-management-group",
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const matchesProjectCategory = (
  project: Project,
  category: "All" | ProjectCategory,
) => {
  if (category === "All") return true;
  return project.cat === category || project.categories?.includes(category) === true;
};

export const getProjectsByCategory = (category: "All" | ProjectCategory) =>
  projects.filter((project) => matchesProjectCategory(project, category));

export const getNextProject = (slug: string) => {
  const current = getProject(slug);
  if (!current) return undefined;

  if (current.nextProjectSlug) {
    return getProject(current.nextProjectSlug);
  }

  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
};
