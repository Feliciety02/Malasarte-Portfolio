import { createFileRoute, Link, notFound, useNavigate, useRouter } from "@tanstack/react-router";
import { MetallicPage } from "@/components/site/MetallicPage";
import { getProjectBySlugAndCategory } from "@/data/projects";
import { fetchPortfolioProjectFromSupabase } from "@/data/supabaseProjects";
import { CaseStudyPage } from "@/features/case-study/components/CaseStudyPage";
import type { Project, ProjectCategory } from "@/data/projects";
import { isValidRouteCategory } from "@/features/case-study/utils/routeUtils";
import { getTemplateByRouteCategory } from "@/features/case-study/templates/templateRegistry";
import type { RouteCategory } from "@/features/case-study/types/templates";

function CaseStudyError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <MetallicPage variant="project" className="px-6">
      <div className="mx-auto max-w-xl py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="metal-cta mt-6 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Retry
        </button>
      </div>
    </MetallicPage>
  );
}

export const Route = createFileRoute("/works/$category/$slug")({
  loader: async ({ params }) => {
    const { category, slug } = params;

    if (!isValidRouteCategory(category)) {
      const template = getTemplateByRouteCategory(category as RouteCategory);
      throw notFound();
    }

    const supabaseProject = await fetchPortfolioProjectFromSupabase(slug);
    const localProject = getProjectBySlugAndCategory(slug);

    if (!supabaseProject && !localProject) throw notFound();

    const baseProject = supabaseProject ?? localProject!;

    return baseProject;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: "Fe Anne Malasarte" },
          { name: "description", content: loaderData.overview },
          { property: "og:title", content: "Fe Anne Malasarte" },
          { property: "og:description", content: loaderData.desc },
        ]
      : [{ title: "Fe Anne Malasarte" }],
  }),
  component: CaseStudyRoute,
  errorComponent: CaseStudyError,
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

function CaseStudyRoute() {
  const project = Route.useLoaderData() as Project;
  const { category } = Route.useParams();

  return <CaseStudyPage project={project} routeCategory={category as RouteCategory} />;
}
