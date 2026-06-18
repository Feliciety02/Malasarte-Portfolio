/* eslint-disable @typescript-eslint/no-explicit-any, no-empty */
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useRef, useState, useEffect, useCallback } from "react";
import { MetallicPage } from "@/components/site/MetallicPage";
import {
  getMergedProject,
  getAllTags,
  getProjectTags,
  exportContentJson,
  type ContentScreenshot,
  type ContentTimelineEntry,
} from "@/lib/contentLoader";
import { generateOptimizedSizes, formatFileSize } from "@/lib/imageOptimizer";
import { projects, getProject } from "@/data/projects";
import { getProjectCoverImage } from "@/data/projectImages";
import { Lock, Eye, EyeOff } from "lucide-react";

const ADMIN_USERNAME_KEY = "admin_username";
const ADMIN_PASSWORD_KEY = "admin_password";
const ADMIN_SESSION_KEY = "admin_session";

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "admin123";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — Fe Anne Malasarte" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

function useAuth() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(ADMIN_SESSION_KEY) === "true");

  const login = (username: string, password: string): boolean => {
    const storedUsername = localStorage.getItem(ADMIN_USERNAME_KEY) || DEFAULT_USERNAME;
    const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem(ADMIN_SESSION_KEY, "true");
      setAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setAuthed(false);
  };

  const setCredentials = (username: string, password: string) => {
    localStorage.setItem(ADMIN_USERNAME_KEY, username);
    localStorage.setItem(ADMIN_PASSWORD_KEY, password);
  };

  return { authed, login, logout, setCredentials };
}

function AdminPage() {
  const { authed, login, logout, setCredentials } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [setupDone, setSetupDone] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(false);
    if (login(username, password)) {
      setUsername("");
      setPassword("");
    } else {
      setLoginError(true);
    }
  };

  const handleSetup = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUsername && newPassword) {
      setCredentials(newUsername, newPassword);
      setSetupDone(true);
      setTimeout(() => setSetupDone(false), 2000);
      setShowSetup(false);
    }
  };

  if (!authed) {
    return (
      <MetallicPage
        variant="contact"
        className="flex min-h-screen items-center justify-center px-4"
      >
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
              <Lock size={28} className="text-muted-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold">Admin Access</h1>
            <p className="mt-1 text-sm text-muted-foreground">Click the logo 5 times to get here</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-yellow/50 focus:outline-none"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-10 text-sm text-white placeholder:text-white/30 focus:border-yellow/50 focus:outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {loginError && <p className="text-sm text-red-400">Invalid username or password.</p>}

            <button
              type="submit"
              className="metal-cta w-full rounded-full py-3 text-sm font-semibold"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowSetup(!showSetup)}
              className="text-xs text-muted-foreground underline hover:text-white"
            >
              Set up credentials
            </button>
          </div>

          {showSetup && (
            <form
              onSubmit={handleSetup}
              className="mt-4 space-y-3 rounded-xl border border-white/10 p-4"
            >
              <p className="text-xs text-muted-foreground">
                Default credentials: admin / admin123. Set your own below.
              </p>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  New Username
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-yellow/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-yellow/50 focus:outline-none"
                />
              </div>
              {setupDone && (
                <p className="text-xs text-green-400">
                  Credentials saved! Sign in with your new credentials.
                </p>
              )}
              <button
                type="submit"
                className="w-full rounded-full bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20"
              >
                Save Credentials
              </button>
            </form>
          )}

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
    <MetallicPage variant="contact" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold">Admin</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage portfolio content</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-muted-foreground underline hover:text-foreground">
              View site
            </Link>
            <button
              onClick={logout}
              className="metal-ghost rounded-full px-4 py-1.5 text-xs font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>

        <AdminDashboard />
      </div>
    </MetallicPage>
  );
}

type Section = "dashboard" | "hero" | "cards" | "pages" | "media" | "export";

function AdminDashboard() {
  const [section, setSection] = useState<Section>("dashboard");

  const nav: { id: Section; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "hero", label: "Hero Sections" },
    { id: "cards", label: "Project Cards" },
    { id: "pages", label: "Case Study Pages" },
    { id: "media", label: "Media & Uploads" },
    { id: "export", label: "Export" },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {nav.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setSection(id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              section === id ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {section === "dashboard" && <DashboardSection />}
      {section === "hero" && <HeroSectionEditor />}
      {section === "cards" && <CardEditor />}
      {section === "pages" && <PageEditor />}
      {section === "media" && <UploadManager />}
      {section === "export" && <ExportManager />}
    </div>
  );
}

function DashboardSection() {
  const allTags = getAllTags();
  const totalProjects = projects.length;
  const categories = [...new Set(projects.map((p) => p.cat))];

  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-bold">Overview</h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-3xl font-bold">{totalProjects}</p>
          <p className="text-xs text-muted-foreground">Total Projects</p>
        </div>
        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-3xl font-bold">{categories.length}</p>
          <p className="text-xs text-muted-foreground">Categories</p>
        </div>
        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-3xl font-bold">{allTags.length}</p>
          <p className="text-xs text-muted-foreground">Tags</p>
        </div>
        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-3xl font-bold">
            {projects.filter((p) => p.figmaPreviewUrl || p.vercelLiveUrl).length}
          </p>
          <p className="text-xs text-muted-foreground">Live Previews</p>
        </div>
      </div>

      <h3 className="mb-3 font-display text-lg font-semibold">All Tags</h3>
      <div className="mb-8 flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>

      <h3 className="mb-3 font-display text-lg font-semibold">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <span
            key={cat}
            className="rounded-full bg-yellow/10 px-3 py-1 text-xs font-medium text-yellow/80"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}

function HeroSectionEditor() {
  const [content, setContent] = useState<Record<string, any>>(() => {
    try {
      return JSON.parse(localStorage.getItem("admin_hero_content") || "{}");
    } catch {
      return {};
    }
  });

  const fields = [
    { key: "headline", label: "Hero Headline", type: "text" },
    { key: "subheadline", label: "Hero Subheadline", type: "text" },
    { key: "ctaText", label: "CTA Button Text", type: "text" },
    { key: "ctaLink", label: "CTA Link", type: "text" },
    { key: "statsText", label: "Stats Text (comma-separated)", type: "text" },
  ];

  const save = () => {
    localStorage.setItem("admin_hero_content", JSON.stringify(content));
    alert("Hero content saved to localStorage!");
  };

  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-bold">Hero Section</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Edit home page hero section content. These values are used across the hero banners.
      </p>

      <div className="max-w-lg space-y-4">
        {fields.map(({ key, label, type }) => (
          <div key={key}>
            <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {label}
            </label>
            <input
              type="text"
              value={content[key] || ""}
              onChange={(e) =>
                setContent((prev: Record<string, any>) => ({ ...prev, [key]: e.target.value }))
              }
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-yellow/50 focus:outline-none"
            />
          </div>
        ))}

        <button onClick={save} className="metal-cta rounded-full px-6 py-2.5 text-sm font-semibold">
          Save Hero Content
        </button>
      </div>
    </div>
  );
}

function CardEditor() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [localContent, setLocalContent] = useState<Record<string, any>>(() => {
    try {
      return JSON.parse(localStorage.getItem("admin_card_content") || "{}");
    } catch {
      return {};
    }
  });

  const saveCard = () => {
    localStorage.setItem("admin_card_content", JSON.stringify(localContent));
    alert("Card content saved!");
  };

  useEffect(() => {
    const stored = localStorage.getItem("admin_card_content");
    if (stored) {
      try {
        setLocalContent(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const getContent = (slug: string) => localContent[slug] || {};
  const updateField = (slug: string, field: string, value: any) => {
    setLocalContent((prev: Record<string, any>) => ({
      ...prev,
      [slug]: { ...(prev[slug] || {}), [field]: value },
    }));
  };

  if (selectedSlug) {
    const project = getMergedProject(selectedSlug);
    if (!project) return null;
    const content = getContent(selectedSlug);

    return (
      <div>
        <button
          onClick={() => setSelectedSlug(null)}
          className="mb-4 text-sm text-muted-foreground underline hover:text-white"
        >
          &larr; Back to cards
        </button>

        <div className="mb-6 flex items-start gap-6">
          <div className="w-48 shrink-0 overflow-hidden rounded-xl border border-white/10">
            {getProjectCoverImage(project) ? (
              <img
                src={getProjectCoverImage(project)}
                alt={project.title}
                className="aspect-video w-full object-cover"
              />
            ) : (
              <div className="flex aspect-video items-center justify-center bg-white/5 text-xs text-muted-foreground">
                No cover
              </div>
            )}
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold">{project.title}</h3>
            <span className="text-xs text-muted-foreground">
              {project.cat} &middot; {project.year}
            </span>
          </div>
        </div>

        <div className="max-w-lg space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Card Title
            </label>
            <input
              type="text"
              value={content.title ?? project.title}
              onChange={(e) => updateField(selectedSlug, "title", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-yellow/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Card Description
            </label>
            <textarea
              value={content.desc ?? project.desc}
              onChange={(e) => updateField(selectedSlug, "desc", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-yellow/50 focus:outline-none"
              rows={3}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Category Label
            </label>
            <input
              type="text"
              value={content.cat ?? project.cat}
              onChange={(e) => updateField(selectedSlug, "cat", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-yellow/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {getProjectTags(selectedSlug).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-yellow/10 px-2 py-0.5 text-[10px] text-yellow/80"
                >
                  {tag}
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add tags in the Case Study Pages editor"
              className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-yellow/50 focus:outline-none"
              disabled
            />
          </div>
          <button
            onClick={saveCard}
            className="metal-cta rounded-full px-6 py-2.5 text-sm font-semibold"
          >
            Save Card Content
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 font-display text-xl font-semibold">Project Cards</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Edit how each project appears on the portfolio grid cards.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <button
            key={p.slug}
            onClick={() => setSelectedSlug(p.slug)}
            className="metal-card group rounded-xl p-4 text-left transition-colors hover:bg-white/5"
          >
            <div className="mb-2 flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/10">
                {getProjectCoverImage(p) ? (
                  <img
                    src={getProjectCoverImage(p)}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-white/5 text-[9px] text-muted-foreground">
                    SVG
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="truncate font-display text-base font-semibold">{p.title}</h3>
                <p className="truncate text-[11px] text-muted-foreground">{p.cat}</p>
              </div>
            </div>
            <p className="line-clamp-2 text-xs text-muted-foreground">{p.desc}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {getProjectTags(p.slug).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-yellow/10 px-2 py-0.5 text-[9px] text-yellow/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PageEditor() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [localContent, setLocalContent] = useState<Record<string, any>>(() => {
    try {
      return JSON.parse(localStorage.getItem("admin_page_content") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const stored = localStorage.getItem("admin_page_content");
    if (stored) {
      try {
        setLocalContent(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const getContent = (slug: string) => localContent[slug] || {};
  const updateField = (slug: string, field: string, value: any) => {
    setLocalContent((prev: Record<string, any>) => ({
      ...prev,
      [slug]: { ...(prev[slug] || {}), [field]: value },
    }));
  };

  const savePage = () => {
    localStorage.setItem("admin_page_content", JSON.stringify(localContent));
    alert("Page content saved to localStorage!");
  };

  const allTags = getAllTags();

  if (selectedSlug) {
    const project = getMergedProject(selectedSlug);
    if (!project) return null;
    const content = getContent(selectedSlug);

    const textFields: { key: string; label: string; type: "text" | "textarea" }[] = [
      { key: "title", label: "Page Title", type: "text" },
      { key: "overview", label: "Overview / Summary", type: "textarea" },
      { key: "role", label: "Role", type: "text" },
      { key: "client", label: "Client", type: "text" },
      { key: "year", label: "Year", type: "text" },
      { key: "outcome", label: "Outcome", type: "textarea" },
    ];

    return (
      <div>
        <button
          onClick={() => setSelectedSlug(null)}
          className="mb-4 text-sm text-muted-foreground underline hover:text-white"
        >
          &larr; Back to project pages
        </button>

        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold">{project.title}</h2>
          <p className="text-sm text-muted-foreground">Editing case study page content</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold">Basic Info</h3>
            {textFields.map(({ key, label, type }) => (
              <div key={key}>
                <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {label}
                </label>
                {type === "textarea" ? (
                  <textarea
                    value={content[key] ?? (project as any)[key] ?? ""}
                    onChange={(e) => updateField(selectedSlug, key, e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-yellow/50 focus:outline-none"
                    rows={4}
                  />
                ) : (
                  <input
                    type="text"
                    value={content[key] ?? (project as any)[key] ?? ""}
                    onChange={(e) => updateField(selectedSlug, key, e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-yellow/50 focus:outline-none"
                  />
                )}
              </div>
            ))}

            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Tags
              </label>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => {
                  const currentTags: string[] = content.tags ?? getProjectTags(selectedSlug);
                  const active = currentTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => {
                        const current = [...currentTags];
                        const idx = current.indexOf(tag);
                        if (idx >= 0) current.splice(idx, 1);
                        else current.push(tag);
                        updateField(selectedSlug, "tags", current);
                      }}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        active
                          ? "bg-yellow/20 text-yellow"
                          : "bg-white/5 text-muted-foreground hover:text-white"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
              <input
                type="text"
                value={(content.tags ?? getProjectTags(selectedSlug)).join(", ")}
                onChange={(e) =>
                  updateField(
                    selectedSlug,
                    "tags",
                    e.target.value
                      .split(",")
                      .map((t: string) => t.trim())
                      .filter(Boolean),
                  )
                }
                placeholder="Or type comma-separated tags"
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-yellow/50 focus:outline-none"
              />
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">Tools</h4>
              <input
                type="text"
                value={(content.tools ?? project.tools).join(", ")}
                onChange={(e) =>
                  updateField(
                    selectedSlug,
                    "tools",
                    e.target.value
                      .split(",")
                      .map((t: string) => t.trim())
                      .filter(Boolean),
                  )
                }
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-yellow/50 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 font-display text-lg font-semibold">Goals</h3>
              {((content.goals ?? project.goals) as string[]).map((goal: string, i: number) => (
                <div key={i} className="mb-2 flex gap-2">
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => {
                      const goals = [...(content.goals ?? project.goals)];
                      goals[i] = e.target.value;
                      updateField(selectedSlug, "goals", goals);
                    }}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-yellow/50 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      const goals = [...(content.goals ?? project.goals)];
                      goals.splice(i, 1);
                      updateField(selectedSlug, "goals", goals);
                    }}
                    className="rounded-lg bg-red-500/20 px-3 text-sm text-red-400 hover:bg-red-500/30"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const goals = [...(content.goals ?? project.goals), ""];
                  updateField(selectedSlug, "goals", goals);
                }}
                className="mt-1 text-sm text-yellow/70 hover:text-yellow"
              >
                + Add goal
              </button>
            </div>

            <TimelineEditor
              entries={content.timeline ?? []}
              onChange={(timeline) => updateField(selectedSlug, "timeline", timeline)}
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={savePage}
            className="metal-cta rounded-full px-6 py-2.5 text-sm font-semibold"
          >
            Save Page Content
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 font-display text-xl font-semibold">Case Study Pages</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Edit the full case study page content for each project.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <button
            key={p.slug}
            onClick={() => setSelectedSlug(p.slug)}
            className="metal-card group rounded-xl p-4 text-left transition-colors hover:bg-white/5"
          >
            <h3 className="font-display text-base font-semibold">{p.title}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.desc}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                {p.cat}
              </span>
              {getProjectTags(p.slug).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-yellow/10 px-2 py-0.5 text-[10px] text-yellow/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TimelineEditor({
  entries,
  onChange,
}: {
  entries: ContentTimelineEntry[];
  onChange: (entries: ContentTimelineEntry[]) => void;
}) {
  const addEntry = () => {
    onChange([...entries, { phase: "", date: "", description: "" }]);
  };

  const updateEntry = (i: number, field: keyof ContentTimelineEntry, value: string) => {
    const updated = entries.map((e, idx) => (idx === i ? { ...e, [field]: value } : e));
    onChange(updated);
  };

  const removeEntry = (i: number) => {
    onChange(entries.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <h3 className="mb-3 font-display text-lg font-semibold">Timeline</h3>
      {entries.length === 0 && (
        <p className="text-sm text-muted-foreground">No timeline entries yet.</p>
      )}
      {entries.map((entry, i) => (
        <div key={i} className="mb-3 flex flex-wrap gap-2 rounded-lg border border-white/10 p-3">
          <input
            type="text"
            placeholder="Phase (e.g. Research)"
            value={entry.phase}
            onChange={(e) => updateEntry(i, "phase", e.target.value)}
            className="flex-1 rounded border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white placeholder:text-white/30 focus:border-yellow/50 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Date (e.g. Jan 2025)"
            value={entry.date}
            onChange={(e) => updateEntry(i, "date", e.target.value)}
            className="w-36 rounded border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white placeholder:text-white/30 focus:border-yellow/50 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Description"
            value={entry.description}
            onChange={(e) => updateEntry(i, "description", e.target.value)}
            className="min-w-[200px] flex-[2] rounded border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white placeholder:text-white/30 focus:border-yellow/50 focus:outline-none"
          />
          <button
            onClick={() => removeEntry(i)}
            className="rounded bg-red-500/20 px-2 text-sm text-red-400 hover:bg-red-500/30"
          >
            &times;
          </button>
        </div>
      ))}
      <button onClick={addEntry} className="mt-1 text-sm text-yellow/70 hover:text-yellow">
        + Add timeline entry
      </button>
    </div>
  );
}

function UploadManager() {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<{ slug: string; screenshots: ContentScreenshot[] }[]>(
    () => {
      try {
        return JSON.parse(localStorage.getItem("admin_uploads") || "[]");
      } catch {
        return [];
      }
    },
  );
  const [selectedProject, setSelectedProject] = useState("");
  const [label, setLabel] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async () => {
    if (!selectedProject || !label || !fileRef.current?.files?.length) return;
    setUploading(true);
    try {
      const file = fileRef.current.files[0];
      const sizes = await generateOptimizedSizes(file);
      const screenshot: ContentScreenshot = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        label,
        fileName: file.name,
        sizes,
        projectSlug: selectedProject,
        uploadedAt: new Date().toISOString(),
      };
      const updated = [...uploaded];
      const existing = updated.find((u) => u.slug === selectedProject);
      if (existing) {
        existing.screenshots.push(screenshot);
      } else {
        updated.push({ slug: selectedProject, screenshots: [screenshot] });
      }
      setUploaded(updated);
      localStorage.setItem("admin_uploads", JSON.stringify(updated));
      setLabel("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }, [selectedProject, label, uploaded]);

  const removeScreenshot = (projectSlug: string, screenshotId: string) => {
    const updated = uploaded
      .map((u) => {
        if (u.slug !== projectSlug) return u;
        return { ...u, screenshots: u.screenshots.filter((s) => s.id !== screenshotId) };
      })
      .filter((u) => u.screenshots.length > 0);
    setUploaded(updated);
    localStorage.setItem("admin_uploads", JSON.stringify(updated));
  };

  const getTotalSize = (screenshots: ContentScreenshot[]) => {
    let total = 0;
    for (const s of screenshots) {
      total += s.sizes.thumb.length + s.sizes.medium.length + s.sizes.full.length;
    }
    return formatFileSize(total);
  };

  return (
    <div>
      <h2 className="mb-4 font-display text-xl font-semibold">Media & Uploads</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Upload screenshots and assign them to projects. Images are automatically optimized into
        three sizes: thumb (150px), medium (600px), full (1200px).
      </p>

      <div className="mb-8 rounded-xl border border-white/10 p-6">
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Assign to Project
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-yellow/50 focus:outline-none"
            >
              <option value="">Select a project...</option>
              {projects.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Screenshot Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Home Screen, Dashboard View"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-yellow/50 focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Image File
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="w-full text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-white/20"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={uploading || !selectedProject || !label}
          className="metal-cta rounded-full px-6 py-2.5 text-sm font-semibold disabled:opacity-50"
        >
          {uploading ? "Optimizing..." : "Upload & Optimize"}
        </button>
      </div>

      <h3 className="mb-4 font-display text-lg font-semibold">Uploaded Screenshots</h3>
      {uploaded.length === 0 ? (
        <p className="text-sm text-muted-foreground">No screenshots uploaded yet.</p>
      ) : (
        <div className="space-y-6">
          {uploaded.map((group) => {
            const project = getMergedProject(group.slug);
            return (
              <div key={group.slug} className="rounded-xl border border-white/10 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-display text-base font-semibold">
                    {project?.title ?? group.slug}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {group.screenshots.length} screenshot{group.screenshots.length !== 1 ? "s" : ""}{" "}
                    &middot; {getTotalSize(group.screenshots)}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.screenshots.map((ss) => (
                    <div
                      key={ss.id}
                      className="group relative rounded-lg border border-white/10 overflow-hidden"
                    >
                      <img
                        src={ss.sizes.medium}
                        alt={ss.label}
                        className="aspect-video w-full object-cover"
                      />
                      <div className="p-2">
                        <p className="truncate text-xs font-medium">{ss.label}</p>
                        <p className="text-[10px] text-muted-foreground">{ss.fileName}</p>
                        <div className="mt-1 flex gap-1">
                          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-muted-foreground">
                            T:{formatFileSize(ss.sizes.thumb.length)}
                          </span>
                          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-muted-foreground">
                            M:{formatFileSize(ss.sizes.medium.length)}
                          </span>
                          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-muted-foreground">
                            F:{formatFileSize(ss.sizes.full.length)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeScreenshot(group.slug, ss.id)}
                        className="absolute right-1 top-1 rounded bg-red-500/70 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ExportManager() {
  const [copied, setCopied] = useState(false);

  const buildFullExport = () => {
    const base = JSON.parse(exportContentJson());
    try {
      const hero = JSON.parse(localStorage.getItem("admin_hero_content") || "{}");
      (base as any).hero = hero;
    } catch {}
    try {
      const cardContent = JSON.parse(localStorage.getItem("admin_card_content") || "{}");
      (base as any).cardContent = cardContent;
    } catch {}
    try {
      const pageContent = JSON.parse(localStorage.getItem("admin_page_content") || "{}");
      (base as any).pageContent = pageContent;
    } catch {}
    try {
      const uploads = JSON.parse(localStorage.getItem("admin_uploads") || "[]");
      (base as any).uploads = uploads;
    } catch {}
    return JSON.stringify(base, null, 2);
  };

  const handleExport = () => {
    const json = buildFullExport();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-content.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildFullExport());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div>
      <h2 className="mb-4 font-display text-xl font-semibold">Export Content</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Export all edited content as a single JSON file. Copy the contents to{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">src/content/projects.json</code>{" "}
        to make changes live.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleExport}
          className="metal-cta rounded-full px-6 py-2.5 text-sm font-semibold"
        >
          Export All Content
        </button>
        <button
          onClick={handleCopy}
          className="metal-ghost rounded-full px-6 py-2.5 text-sm font-semibold"
        >
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
      </div>
      <div className="mt-6">
        <h3 className="mb-3 font-display text-base font-semibold">Preview</h3>
        <pre className="max-h-96 overflow-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-muted-foreground">
          {buildFullExport().slice(0, 2000)}
          {buildFullExport().length > 2000 ? "\n..." : ""}
        </pre>
      </div>
    </div>
  );
}
