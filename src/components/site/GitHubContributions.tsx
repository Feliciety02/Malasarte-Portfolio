import { useState, useEffect, useRef } from "react";
import { Github } from "lucide-react";

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: Contribution[];
}

const LEVEL_COLORS: Record<number, string> = {
  0: "oklch(0.24 0 0 / 46%)",
  1: "oklch(0.38 0.04 296)",
  2: "oklch(0.48 0.08 296)",
  3: "oklch(0.6 0.13 298)",
  4: "oklch(0.76 0.04 298)",
};

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Gap between cells (px) — fixed, cell size is derived dynamically
const GAP = 3;
// Width of the day-label column (px) + the flex gap between it and the grid
const DAY_COL = 26;
const DAY_GAP = 8;
const FALLBACK_DAYS = 365;

const getCacheKey = (username: string) => `github-contributions:${username}`;

function isApiResponse(value: unknown): value is ApiResponse {
  if (!value || typeof value !== "object") return false;
  const candidate = value as ApiResponse;
  return Array.isArray(candidate.contributions) && typeof candidate.total === "object";
}

function readCachedData(username: string) {
  if (typeof window === "undefined") return null;
  try {
    const cached = window.localStorage.getItem(getCacheKey(username));
    if (!cached) return null;
    const parsed = JSON.parse(cached);
    return isApiResponse(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeCachedData(username: string, data: ApiResponse) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(getCacheKey(username), JSON.stringify(data));
  } catch {
    // Storage is optional; keep the live render even if caching fails.
  }
}

function createFallbackData(): ApiResponse {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const contributions = Array.from({ length: FALLBACK_DAYS }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (FALLBACK_DAYS - 1 - index));
    return {
      date: date.toISOString().slice(0, 10),
      count: 0,
      level: 0 as const,
    };
  });

  return {
    total: { lastYear: 0 },
    contributions,
  };
}

function groupByWeek(contribs: Contribution[]) {
  if (!contribs.length) return [];
  const firstDow = new Date(contribs[0].date + "T00:00:00").getDay();
  const weeks: (Contribution | null)[][] = [];
  let week: (Contribution | null)[] = Array(firstDow).fill(null);
  for (const c of contribs) {
    week.push(c);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

function getMonthLabels(weeks: (Contribution | null)[][]) {
  const labels: { label: string; col: number }[] = [];
  let last = -1;
  weeks.forEach((week, wi) => {
    const first = week.find(Boolean) as Contribution | undefined;
    if (first) {
      const m = new Date(first.date + "T00:00:00").getMonth();
      if (m !== last) {
        labels.push({ label: MONTH_NAMES[m], col: wi });
        last = m;
      }
    }
  });
  return labels;
}

export function GitHubContributions({ username }: { username: string }) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "fallback">("loading");
  const [cell, setCell] = useState(14);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d: ApiResponse) => {
        if (!isMounted) return;
        setData(d);
        setStatus("ok");
        writeCachedData(username, d);
      })
      .catch(() => {
        if (!isMounted) return;
        const cached = readCachedData(username);
        setData(cached ?? createFallbackData());
        setStatus(cached ? "ok" : "fallback");
      });

    return () => {
      isMounted = false;
    };
  }, [username]);

  const weeks = data ? groupByWeek(data.contributions) : [];
  const nWeeks = weeks.length;

  // Recompute cell size whenever the container resizes or data arrives
  useEffect(() => {
    if (!containerRef.current || !nWeeks) return;
    const el = containerRef.current;
    const compute = () => {
      const available = el.offsetWidth - DAY_COL - DAY_GAP;
      const size = Math.floor((available - GAP * (nWeeks - 1)) / nWeeks);
      setCell(Math.max(10, size));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [nWeeks]);

  if (status === "loading") return <Skeleton />;
  if (!data) return null;

  const monthLabels = getMonthLabels(weeks);
  const total = Object.values(data.total).reduce((a, b) => a + b, 0);
  const step = cell + GAP;
  const isFallback = status === "fallback";

  return (
    <div className="metal-panel p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm text-foreground/80">
          {isFallback ? (
            <span className="font-display text-lg font-bold text-gradient">Contribution grid</span>
          ) : (
            <>
              <span className="font-display text-lg font-bold text-gradient">
                {total.toLocaleString()}
              </span>{" "}
              contributions in the last year
            </>
          )}
        </p>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/70 transition-colors"
        >
          <Github size={13} />@{username}
        </a>
      </div>

      {/* Grid — ref here so ResizeObserver gets the full available width */}
      <div ref={containerRef} className="mt-4 overflow-x-auto pb-1 scrollbar-contrib">
        <div className="flex" style={{ gap: DAY_GAP }}>
          {/* Day labels */}
          <div className="flex flex-col pt-[22px]" style={{ gap: GAP }}>
            {DAY_LABELS.map((label, i) => (
              <div
                key={i}
                style={{ height: cell, width: DAY_COL, fontSize: 10, lineHeight: `${cell}px` }}
                className="text-muted-foreground text-right select-none"
              >
                {label}
              </div>
            ))}
          </div>

          {/* Weeks */}
          <div style={{ position: "relative", width: nWeeks * step - GAP }}>
            {/* Month labels */}
            <div style={{ height: 18, position: "relative", marginBottom: 4 }}>
              {monthLabels.map(({ label, col }) => (
                <span
                  key={col}
                  style={{
                    position: "absolute",
                    left: col * step,
                    fontSize: 10,
                    lineHeight: "18px",
                  }}
                  className="text-muted-foreground select-none"
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="flex" style={{ gap: GAP }}>
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                  {week.map((day, di) => (
                    <div
                      key={di}
                      title={
                        day
                          ? `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`
                          : undefined
                      }
                      style={{
                        width: cell,
                        height: cell,
                        borderRadius: 3,
                        background: day !== null ? LEVEL_COLORS[day.level] : "transparent",
                        border:
                          day !== null && day.level > 0
                            ? "1px solid oklch(1 0 0 / 10%)"
                            : day !== null
                              ? "1px solid oklch(1 0 0 / 4%)"
                              : "none",
                        transition: "filter 0.12s",
                      }}
                      onMouseEnter={(e) => {
                        if (day !== null && day.level > 0)
                          (e.currentTarget as HTMLDivElement).style.filter =
                            "brightness(1.4) saturate(1.2)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.filter = "";
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 mt-4">
        <span className="text-[9px] text-muted-foreground select-none">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            style={{
              width: cell,
              height: cell,
              borderRadius: 3,
              background: LEVEL_COLORS[level],
              border: level > 0 ? "1px solid oklch(1 0 0 / 10%)" : "1px solid oklch(1 0 0 / 4%)",
            }}
          />
        ))}
        <span className="text-[9px] text-muted-foreground select-none">More</span>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="metal-panel animate-pulse p-6">
      <div className="flex justify-between mb-1">
        <div className="h-5 w-56 rounded-md bg-muted" />
        <div className="h-4 w-24 rounded-md bg-muted" />
      </div>
      <div className="mt-4 h-[130px] rounded-lg bg-muted" />
      <div className="flex justify-end gap-1.5 mt-4 items-center">
        <div className="h-2.5 w-5 rounded bg-muted" />
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: 3 }} className="bg-muted" />
        ))}
        <div className="h-2.5 w-5 rounded bg-muted" />
      </div>
    </div>
  );
}
