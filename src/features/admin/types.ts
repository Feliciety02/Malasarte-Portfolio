import type { ProjectCategory, ProjectKind } from "@/data/projects";

export type AdminProjectRecord = {
  slug: string;
  title: string;
  directoryTitle: string;
  primaryCategory: ProjectCategory;
  secondaryCategories: ProjectCategory[];
  kind: ProjectKind;
  tag: string;
  description: string;
  role: string;
  collaborators: string[];
  tools: string[];
  year: string;
  client: string;
  overview: string;
  outcome: string;
  hasServerRecord: boolean;
};

export type AdminBootstrap = {
  authenticated: boolean;
  username?: string;
  credentialsConfigured: boolean;
  persistenceConfigured: boolean;
  projects: AdminProjectRecord[];
};

export type AdminLoginInput = {
  username: string;
  password: string;
};

export type AdminSaveProjectInput = {
  project: AdminProjectRecord;
};
