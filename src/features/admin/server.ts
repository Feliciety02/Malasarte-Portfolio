import { createServerFn } from "@tanstack/react-start";
import {
  clearAdminSession,
  getAdminCredentialsConfig,
  readAdminSession,
  requireAdminSession,
  setAdminSession,
} from "@/lib/server/adminAuth";
import { listAdminProjects, saveAdminProject } from "@/lib/server/adminProjects";
import { isAdminPersistenceConfigured } from "@/lib/server/adminSupabase";
import type {
  AdminBootstrap,
  AdminLoginInput,
  AdminProjectRecord,
  AdminSaveProjectInput,
} from "./types";

async function buildBootstrap(): Promise<AdminBootstrap> {
  const credentials = getAdminCredentialsConfig();
  const session = readAdminSession();

  if (!session) {
    return {
      authenticated: false,
      credentialsConfigured: credentials.configured,
      persistenceConfigured: isAdminPersistenceConfigured(),
      projects: [],
    };
  }

  return {
    authenticated: true,
    username: session.username,
    credentialsConfigured: credentials.configured,
    persistenceConfigured: isAdminPersistenceConfigured(),
    projects: await listAdminProjects(),
  };
}

export const getAdminBootstrapServerFn = createServerFn({ method: "GET" }).handler(async () => {
  return buildBootstrap();
});

export const loginAdminServerFn = createServerFn({ method: "POST" })
  .inputValidator((input: AdminLoginInput) => input)
  .handler(async ({ data }) => {
    const credentials = getAdminCredentialsConfig();

    if (!credentials.username || !credentials.password) {
      throw new Error("Admin credentials are not configured.");
    }

    if (
      data.username.trim() !== credentials.username ||
      data.password !== credentials.password
    ) {
      throw new Error("Invalid username or password.");
    }

    setAdminSession(credentials.username);
    return buildBootstrap();
  });

export const logoutAdminServerFn = createServerFn({ method: "POST" }).handler(async () => {
  clearAdminSession();
  return {
    authenticated: false,
    credentialsConfigured: getAdminCredentialsConfig().configured,
    persistenceConfigured: isAdminPersistenceConfigured(),
    projects: [],
  } satisfies AdminBootstrap;
});

export const saveAdminProjectServerFn = createServerFn({ method: "POST" })
  .inputValidator((input: AdminSaveProjectInput) => input)
  .handler(async ({ data }) => {
    requireAdminSession();
    await saveAdminProject(data.project);
    const projects = await listAdminProjects();
    const updatedProject =
      projects.find((project) => project.slug === data.project.slug) ?? null;

    return {
      project: updatedProject as AdminProjectRecord | null,
      projects,
    };
  });
