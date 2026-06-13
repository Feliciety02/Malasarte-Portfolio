import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";

type RelevanceScore = {
  project: Project;
  score: number;
};

export function getRelatedProjects(current: Project, count: number = 6): Project[] {
  const others = projects.filter((p) => p.slug !== current.slug);

  const scored: RelevanceScore[] = others.map((p) => ({
    project: p,
    score: calculateRelevance(current, p),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map((s) => s.project);
}

function calculateRelevance(current: Project, candidate: Project): number {
  let score = 0;

  if (candidate.cat === current.cat) score += 100;

  if (current.categories?.includes(candidate.cat) || candidate.categories?.includes(current.cat)) {
    score += 60;
  }

  const sharedTags = intersection(normalizeTags(current.tag), normalizeTags(candidate.tag));
  score += sharedTags.length * 30;

  const sharedTools = intersection(
    current.tools.map((t) => t.toLowerCase()),
    candidate.tools.map((t) => t.toLowerCase()),
  );
  score += sharedTools.length * 15;

  if (candidate.slug === current.nextProjectSlug) score += 80;
  if (current.slug === candidate.nextProjectSlug) score += 50;

  return score;
}

function intersection(a: string[], b: string[]): string[] {
  const setB = new Set(b);
  return a.filter((item) => setB.has(item));
}

function normalizeTags(tag: string): string[] {
  return tag
    .toLowerCase()
    .split(/[/,&\s]+/)
    .filter(Boolean);
}
