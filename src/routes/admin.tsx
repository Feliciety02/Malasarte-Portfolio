import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MetallicPage } from "@/components/site/MetallicPage";
import { supportsProjectCollaborators, type ProjectCategory } from "@/data/projects";
import {
  getAdminBootstrapServerFn,
  loginAdminServerFn,
  logoutAdminServerFn,
  saveAdminProjectServerFn,
} from "@/features/admin/server";
import type { AdminBootstrap, AdminProjectRecord } from "@/features/admin/types";
import { Lock, LogOut, RefreshCw, Save, Server, ShieldCheck } from "lucide-react";

const categoryOptions: ProjectCategory[] = [
  "UI/UX Design",
  "Software Development",
  "Logo & Branding",
  "Social Media Graphics",
  "Creative Assets",
  "Writing / VA",
];

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin | Fe Anne Malasarte" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminPage,
});

function createDraft(project: AdminProjectRecord | null) {
  if (!project) return null;
  return {
    ...project,
    secondaryCategories: [...project.secondaryCategories],
    collaboratorsText: project.collaborators.join(", "),
    toolsText: project.tools.join(", "),
  };
}

function normalizeCommaList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeTools(value: string) {
  return normalizeCommaList(value);
}

function projectsEqual(a: AdminProjectRecord | null, b: ReturnType<typeof createDraft>) {
  if (!a || !b) return a === b;
  return (
    JSON.stringify(a) ===
    JSON.stringify({
      ...b,
      collaborators: normalizeCommaList(b.collaboratorsText),
      tools: normalizeTools(b.toolsText),
    })
  );
}

function AdminPage() {
  const [bootstrap, setBootstrap] = useState<AdminBootstrap | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [draft, setDraft] = useState<ReturnType<typeof createDraft>>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function refreshBootstrap() {
    setLoading(true);
    setError(null);
    try {
      const next = await getAdminBootstrapServerFn();
      setBootstrap(next);
      const nextSelectedSlug =
        selectedSlug && next.projects.some((project) => project.slug === selectedSlug)
          ? selectedSlug
          : next.projects[0]?.slug ?? null;
      setSelectedSlug(nextSelectedSlug);
      const selectedProject =
        next.projects.find((project) => project.slug === nextSelectedSlug) ?? null;
      setDraft(createDraft(selectedProject));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshBootstrap();
  }, []);

  useEffect(() => {
    if (!bootstrap?.authenticated) return;
    const selectedProject =
      bootstrap.projects.find((project) => project.slug === selectedSlug) ?? null;
    setDraft(createDraft(selectedProject));
  }, [selectedSlug, bootstrap]);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus(null);
    setLoading(true);
    try {
      const next = await loginAdminServerFn({
        data: {
          username,
          password,
        },
      });
      setBootstrap(next);
      setSelectedSlug(next.projects[0]?.slug ?? null);
      setDraft(createDraft(next.projects[0] ?? null));
      setUsername("");
      setPassword("");
      setStatus("Signed in.");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    setError(null);
    setStatus(null);
    try {
      const next = await logoutAdminServerFn();
      setBootstrap(next);
      setSelectedSlug(null);
      setDraft(null);
      setStatus("Signed out.");
    } catch (logoutError) {
      setError(logoutError instanceof Error ? logoutError.message : "Unable to sign out.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!draft || !bootstrap?.authenticated) return;
    setSaving(true);
    setError(null);
    setStatus(null);
    try {
      const result = await saveAdminProjectServerFn({
        data: {
          project: {
            slug: draft.slug,
            title: draft.title.trim(),
            directoryTitle: draft.directoryTitle.trim(),
            primaryCategory: draft.primaryCategory,
            secondaryCategories: draft.secondaryCategories,
            kind: draft.kind,
            tag: draft.tag.trim(),
            description: draft.description.trim(),
            role: draft.role.trim(),
            collaborators: normalizeCommaList(draft.collaboratorsText),
            tools: normalizeTools(draft.toolsText),
            year: draft.year.trim(),
            client: draft.client.trim(),
            overview: draft.overview.trim(),
            outcome: draft.outcome.trim(),
            hasServerRecord: draft.hasServerRecord,
          },
        },
      });

      if (!result.project) {
        throw new Error("Saved, but the updated project could not be loaded.");
      }

      const nextProjects = result.projects;
      setBootstrap((current) =>
        current
          ? {
              ...current,
              projects: nextProjects,
            }
          : current,
      );
      setSelectedSlug(result.project.slug);
      setDraft(createDraft(result.project));
      setStatus("Project saved to the server.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save project.");
    } finally {
      setSaving(false);
    }
  }

  const selectedProject =
    bootstrap?.projects.find((project) => project.slug === selectedSlug) ?? null;
  const hasUnsavedChanges = !projectsEqual(selectedProject, draft);
  const showCollaboratorsField = draft
    ? supportsProjectCollaborators({
        cat: draft.primaryCategory,
        categories: draft.secondaryCategories,
      })
    : false;

  if (loading && !bootstrap) {
    return (
      <MetallicPage variant="contact" className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <RefreshCw className="mx-auto mb-4 h-6 w-6 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading admin workspace...</p>
        </div>
      </MetallicPage>
    );
  }

  if (!bootstrap?.authenticated) {
    if (!bootstrap) {
      return (
        <MetallicPage variant="contact" className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-md text-center">
            <p className="text-sm text-muted-foreground">
              Admin bootstrap failed before the page could initialize.
            </p>
            {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
          </div>
        </MetallicPage>
      );
    }

    return (
      <MetallicPage variant="contact" className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black/20 p-8 backdrop-blur-xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
              <Lock className="h-6 w-6 text-muted-foreground" />
            </div>
            <h1 className="font-display text-2xl font-semibold">Admin Access</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Server-authenticated admin for portfolio project content.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Username
              </span>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/50"
                placeholder="admin"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/50"
                placeholder="Enter password"
              />
            </label>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            {!bootstrap.credentialsConfigured ? (
              <p className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
                `ADMIN_USERNAME` and `ADMIN_PASSWORD` are not set. In development, the fallback is
                `admin / admin123`. Set real server env vars before deploying.
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="metal-cta w-full rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-muted-foreground underline hover:text-white">
              Back to site
            </Link>
          </div>
        </div>
      </MetallicPage>
    );
  }

  return (
    <MetallicPage variant="contact" className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              Server-backed admin
            </div>
            <h1 className="font-display text-3xl font-semibold">Portfolio Admin</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Signed in as {bootstrap.username}. Changes save to Supabase and power the live
              portfolio routes that already read server data.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => void refreshBootstrap()}
              disabled={loading}
              className="metal-ghost inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <Link
              to="/works"
              className="metal-ghost inline-flex items-center rounded-full px-4 py-2 text-sm font-medium"
            >
              View portfolio
            </Link>
            <button
              onClick={() => void handleLogout()}
              className="metal-ghost inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-3">
          <StatusCard
            icon={<Server className="h-4 w-4" />}
            title="Server Session"
            value="Active"
            hint="Authentication is handled by an HTTP-only server cookie."
          />
          <StatusCard
            icon={<ShieldCheck className="h-4 w-4" />}
            title="Credentials"
            value={bootstrap.credentialsConfigured ? "Configured" : "Dev fallback"}
            hint={
              bootstrap.credentialsConfigured
                ? "Server env credentials are in use."
                : "Set ADMIN_USERNAME and ADMIN_PASSWORD before production."
            }
          />
          <StatusCard
            icon={<Save className="h-4 w-4" />}
            title="Persistence"
            value={bootstrap.persistenceConfigured ? "Supabase ready" : "Not configured"}
            hint={
              bootstrap.persistenceConfigured
                ? "Project saves write to Supabase using the server role key."
                : "Set SUPABASE_SERVICE_ROLE_KEY to enable saving."
            }
          />
        </div>

        {error ? (
          <div className="mb-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        {status ? (
          <div className="mb-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {status}
          </div>
        ) : null}

        {!bootstrap.persistenceConfigured ? (
          <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            Saving is disabled until `SUPABASE_SERVICE_ROLE_KEY` is configured on the server.
            Reads still work, but edits cannot be persisted.
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-white/10 bg-black/20 p-4 backdrop-blur-xl">
            <h2 className="mb-3 px-2 text-sm font-semibold text-foreground">Projects</h2>
            <div className="space-y-2">
              {bootstrap.projects.map((project) => {
                const active = project.slug === selectedSlug;
                return (
                  <button
                    key={project.slug}
                    onClick={() => setSelectedSlug(project.slug)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      active
                        ? "border-primary/40 bg-primary/10"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{project.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {project.primaryCategory} · {project.kind}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.14em] ${
                          project.hasServerRecord
                            ? "bg-emerald-500/10 text-emerald-200"
                            : "bg-amber-500/10 text-amber-200"
                        }`}
                      >
                        {project.hasServerRecord ? "Live" : "Base"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
            {draft ? (
              <div className="space-y-6">
                <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Editing
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-semibold">{draft.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Update the fields the live works listing and server-backed case-study pages
                      already consume.
                    </p>
                  </div>
                  <button
                    onClick={() => void handleSave()}
                    disabled={saving || !hasUnsavedChanges || !bootstrap.persistenceConfigured}
                    className="metal-cta inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : hasUnsavedChanges ? "Save Changes" : "Saved"}
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Title">
                    <input
                      value={draft.title}
                      onChange={(event) =>
                        setDraft((current) => (current ? { ...current, title: event.target.value } : current))
                      }
                      className={inputClassName}
                    />
                  </Field>
                  <Field label="Directory Title">
                    <input
                      value={draft.directoryTitle}
                      onChange={(event) =>
                        setDraft((current) =>
                          current ? { ...current, directoryTitle: event.target.value } : current,
                        )
                      }
                      className={inputClassName}
                    />
                  </Field>
                  <Field label="Primary Category">
                    <select
                      value={draft.primaryCategory}
                      onChange={(event) =>
                        setDraft((current) =>
                          current
                            ? {
                                ...current,
                                primaryCategory: event.target.value as ProjectCategory,
                                secondaryCategories: current.secondaryCategories.filter(
                                  (category) => category !== event.target.value,
                                ),
                              }
                            : current,
                        )
                      }
                      className={inputClassName}
                    >
                      {categoryOptions.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Secondary Categories">
                    <div className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      {categoryOptions
                        .filter((category) => category !== draft.primaryCategory)
                        .map((category) => {
                          const checked = draft.secondaryCategories.includes(category);
                          return (
                            <label
                              key={category}
                              className="flex items-center gap-3 text-sm text-foreground"
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(event) =>
                                  setDraft((current) => {
                                    if (!current) return current;
                                    const nextCategories = event.target.checked
                                      ? [...current.secondaryCategories, category]
                                      : current.secondaryCategories.filter(
                                          (item) => item !== category,
                                        );
                                    return { ...current, secondaryCategories: nextCategories };
                                  })
                                }
                              />
                              {category}
                            </label>
                          );
                        })}
                    </div>
                  </Field>
                  <Field label="Tag">
                    <input
                      value={draft.tag}
                      onChange={(event) =>
                        setDraft((current) => (current ? { ...current, tag: event.target.value } : current))
                      }
                      className={inputClassName}
                    />
                  </Field>
                  <Field label="Role">
                    <input
                      value={draft.role}
                      onChange={(event) =>
                        setDraft((current) => (current ? { ...current, role: event.target.value } : current))
                      }
                      className={inputClassName}
                    />
                  </Field>
                  {showCollaboratorsField ? (
                    <Field label="Collaborators">
                      <input
                        value={draft.collaboratorsText}
                        onChange={(event) =>
                          setDraft((current) =>
                            current ? { ...current, collaboratorsText: event.target.value } : current,
                          )
                        }
                        className={inputClassName}
                        placeholder="Jane Doe | UI/UX Designer, John Smith | Frontend Developer | https://image.url/profile.jpg"
                      />
                    </Field>
                  ) : null}
                  <Field label="Client">
                    <input
                      value={draft.client}
                      onChange={(event) =>
                        setDraft((current) => (current ? { ...current, client: event.target.value } : current))
                      }
                      className={inputClassName}
                    />
                  </Field>
                  <Field label="Year">
                    <input
                      value={draft.year}
                      onChange={(event) =>
                        setDraft((current) => (current ? { ...current, year: event.target.value } : current))
                      }
                      className={inputClassName}
                    />
                  </Field>
                </div>

                <Field label="Description">
                  <textarea
                    value={draft.description}
                    onChange={(event) =>
                      setDraft((current) =>
                        current ? { ...current, description: event.target.value } : current,
                      )
                    }
                    rows={4}
                    className={textareaClassName}
                  />
                </Field>

                <Field label="Overview">
                  <textarea
                    value={draft.overview}
                    onChange={(event) =>
                      setDraft((current) =>
                        current ? { ...current, overview: event.target.value } : current,
                      )
                    }
                    rows={6}
                    className={textareaClassName}
                  />
                </Field>

                <Field label="Outcome">
                  <textarea
                    value={draft.outcome}
                    onChange={(event) =>
                      setDraft((current) =>
                        current ? { ...current, outcome: event.target.value } : current,
                      )
                    }
                    rows={5}
                    className={textareaClassName}
                  />
                </Field>

                <Field label="Tools">
                  <input
                    value={draft.toolsText}
                    onChange={(event) =>
                      setDraft((current) =>
                        current ? { ...current, toolsText: event.target.value } : current,
                      )
                    }
                    className={inputClassName}
                    placeholder="Figma, React, Supabase"
                  />
                </Field>
              </div>
            ) : (
              <div className="py-16 text-center text-sm text-muted-foreground">
                Select a project to begin editing.
              </div>
            )}
          </section>
        </div>
      </div>
    </MetallicPage>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function StatusCard({
  icon,
  title,
  value,
  hint,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-5 backdrop-blur-xl">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-muted-foreground">
        {icon}
      </div>
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{title}</p>
      <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
    </div>
  );
}

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-primary/50";

const textareaClassName = `${inputClassName} min-h-[7rem] resize-y`;
