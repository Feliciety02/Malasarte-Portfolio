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
  0: "oklch(0.26 0.06 285 / 40%)",
  1: "oklch(0.36 0.16 308)",
  2: "oklch(0.49 0.22 302)",
  3: "oklch(0.62 0.26 296)",
  4: "oklch(0.73 0.22 328)",
};

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Gap between cells (px) — fixed, cell size is derived dynamically
const GAP = 3;
// Width of the day-label column (px) + the flex gap between it and the grid
const DAY_COL = 26;
const DAY_GAP = 8;

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
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [cell, setCell] = useState(14);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d: ApiResponse) => {
        setData(d);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
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
  if (status === "error" || !data) return null;

  const monthLabels = getMonthLabels(weeks);
  const total = Object.values(data.total).reduce((a, b) => a + b, 0);
  const step = cell + GAP;

  return (
    <div className="rounded-2xl glass p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm text-foreground/80">
          <span className="font-display font-bold text-gradient text-lg">{total.toLocaleString()}</span>{" "}
          contributions in the last year
        </p>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/70 transition-colors"
        >
          <Github size={13} />
          @{username}
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
                  style={{ position: "absolute", left: col * step, fontSize: 10, lineHeight: "18px" }}
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
              border:
                level > 0 ? "1px solid oklch(1 0 0 / 10%)" : "1px solid oklch(1 0 0 / 4%)",
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
    <div className="rounded-2xl glass p-6 animate-pulse">
      <div className="flex justify-between mb-1">
        <div className="h-5 w-56 rounded-md bg-muted" />
        <div className="h-4 w-24 rounded-md bg-muted" />
      </div>
      <div className="mt-4 h-[130px] rounded-xl bg-muted" />
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
