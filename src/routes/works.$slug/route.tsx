import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { getProject } from "@/data/projects";
import { MetallicPage } from "@/components/site/MetallicPage";
import { getLegacyRedirect } from "@/features/case-study/routes/legacyRedirects";

export const Route = createFileRoute("/works/$slug")({
  loader: async ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();

    const redirectPath = getLegacyRedirect(params.slug);
    if (redirectPath) {
      throw redirect({ href: redirectPath });
    }

    throw notFound();
  },
  component: LegacyRedirectHandler,
  notFoundComponent: () => (
    <MetallicPage variant="project" className="px-6">
      <div className="mx-auto max-w-xl py-32 text-center">
        <h1 className="font-display text-5xl font-bold text-gradient">404</h1>
        <p className="mt-4 text-muted-foreground">That case study does not exist.</p>
        <Link
          to="/works"
          className="metal-cta mt-8 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Back to Works
        </Link>
      </div>
    </MetallicPage>
  ),
});

function LegacyRedirectHandler() {
  return null;
}
