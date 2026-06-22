// Run with: node scripts/update-collaborators.mjs
// Requires SUPABASE_SERVICE_ROLE_KEY env var

const SUPABASE_URL = "https://klmihgudayigtlvxqfcb.supabase.co";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable.");
  process.exit(1);
}

const UPDATES = [
  {
    slug: "pietyl-digilpg-web",
    collaborators: [
      "Joevan Capote | Quality Assurance Engineer | /placeholders/collaborators/collab-01.svg",
      "Fe Anne Malasarte | Fullstack Developer | /placeholders/collaborators/collab-02.png",
      "Jorge Macabenta | Backend Developer | | https://portfolio-school-fawn.vercel.app/#projects",
    ],
  },
  {
    slug: "umunity",
    collaborators: [
      "Joevan Capote | Quality Assurance Engineer | /placeholders/collaborators/collab-01.svg",
      "Fe Anne Malasarte | Fullstack Developer | /placeholders/collaborators/collab-02.png",
    ],
  },
  {
    slug: "umunity-web",
    collaborators: [
      "Joevan Capote | Quality Assurance Engineer | /placeholders/collaborators/collab-01.svg",
      "Fe Anne Malasarte | Fullstack Developer | /placeholders/collaborators/collab-02.png",
    ],
  },
];

async function main() {
  for (const update of UPDATES) {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/portfolio_projects?slug=eq.${update.slug}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "apikey": SERVICE_ROLE_KEY,
          "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({ collaborators: update.collaborators }),
      },
    );

    if (!res.ok) {
      const text = await res.text();
      console.error(`Failed to update ${update.slug}: ${res.status} ${text}`);
    } else {
      console.log(`Updated collaborators for ${update.slug}`);
    }
  }
}

main().catch(console.error);
