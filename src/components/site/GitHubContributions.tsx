import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronRight, Github } from "lucide-react";

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
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const FALLBACK_DAYS = 365;

type GraphMetrics = {
  cell: number;
  gap: number;
  dayCol: number;
  dayGap: number;
};

function clampNumber(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

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

function groupByMonth(contribs: Contribution[]) {
  const months: { month: number; days: Contribution[] }[] = [];
  let current: Contribution[] = [];
  let currentMonth = -1;
  for (const c of contribs) {
    const m = new Date(c.date + "T00:00:00").getMonth();
    if (m !== currentMonth) {
      if (current.length > 0) months.push({ month: currentMonth, days: current });
      current = [];
      currentMonth = m;
    }
    current.push(c);
  }
  if (current.length > 0) months.push({ month: currentMonth, days: current });
  return months;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function GitHubContributions({
  username,
  containerWidth = 0,
}: {
  username: string;
  containerWidth?: number;
}) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "fallback">("loading");
  const [metrics, setMetrics] = useState<GraphMetrics>({ cell: 14, gap: 3, dayCol: 26, dayGap: 8 });
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Desktop/tablet metrics
  useEffect(() => {
    if (!containerRef.current || !nWeeks) return;
    const el = containerRef.current;
    const compute = () => {
      const width = Math.max(0, el.clientWidth || containerWidth);
      const gap = width < 380 ? 1 : width < 640 ? 2 : 3;
      const dayCol = width < 420 ? 0 : width < 640 ? 18 : 26;
      const dayGap = dayCol === 0 ? 0 : width < 640 ? 5 : 8;
      const minCell = width < 380 ? 4 : width < 480 ? 5 : width < 640 ? 6 : 8;
      const maxCell = width < 380 ? 7 : width < 480 ? 8 : width < 760 ? 11 : 14;
      const available = Math.max(0, width - dayCol - dayGap);
      const size = Math.floor((available - gap * (nWeeks - 1)) / nWeeks);
      setMetrics({ cell: clampNumber(size, minCell, maxCell), gap, dayCol, dayGap });
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerWidth, nWeeks]);

  const containerWidthActual = containerRef.current?.clientWidth ?? containerWidth;
  const isMobileLayout = containerWidthActual > 0 && containerWidthActual < 480;
  const isTabletLayout = containerWidthActual >= 480 && containerWidthActual < 768;

  const months = useMemo(
    () => (data ? groupByMonth(data.contributions) : []),
    [data],
  );

  // Count contributions per month
  const monthlyTotals = useMemo(() => {
    const totals: Record<number, number> = {};
    for (const c of data?.contributions ?? []) {
      const m = new Date(c.date + "T00:00:00").getMonth();
      totals[m] = (totals[m] ?? 0) + c.count;
    }
    return totals;
  }, [data]);

  if (status === "loading") return <Skeleton />;
  if (!data) return null;

  const monthLabels = getMonthLabels(weeks);
  const total = Object.values(data.total).reduce((a, b) => a + b, 0);
  const { cell, gap, dayCol, dayGap } = metrics;
  const step = cell + gap;
  const isFallback = status === "fallback";
  let lastMonthLeft = -Infinity;
  const monthMinDistance = cell < 6 ? 42 : cell < 8 ? 36 : 34;
  const visibleMonthLabels = monthLabels.filter(({ col }) => {
    const left = col * step;
    if (left - lastMonthLeft < monthMinDistance) return false;
    lastMonthLeft = left;
    return true;
  });

  const sharedHeader = (
    <div className="mb-1 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
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
        className="flex items-center gap-1.5 text-xs text-primary transition-colors hover:text-primary/70"
      >
        <Github size={13} />@{username}
      </a>
    </div>
  );

  const sharedLegend = (
    <div className="mt-4 flex flex-wrap items-center justify-end gap-1.5">
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
  );

  // ---------- MOBILE MONTHLY STACK ----------
  if (isMobileLayout) {
    return (
      <div className="metal-panel w-full min-w-0 max-w-full overflow-hidden p-4">
        {sharedHeader}

        <div ref={containerRef} className="mt-4 space-y-3">
          {months.map(({ month, days }) => {
            const isExpanded = expandedMonth === month;
            const monthTotal = monthlyTotals[month] ?? 0;
            const monthName = MONTH_NAMES[month];

            // Lay out days in a compact per-week grid
            const daySize = 7;
            const dayGap = 2;

            return (
              <div key={month} className="overflow-hidden rounded-lg border border-white/6 bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => setExpandedMonth(isExpanded ? null : month)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors hover:bg-white/[0.03]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-display text-sm font-semibold text-white/90">{monthName}</span>
                    <span className="font-mono text-[10px] text-white/40">{days.length} days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-primary/80">{formatCount(monthTotal)}</span>
                    <ChevronRight
                      size={12}
                      className="text-white/30 transition-transform duration-200"
                      style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-white/6 px-3 pb-3 pt-2">
                    <div className="flex flex-wrap gap-[3px]">
                      {days.map((day) => (
                        <div
                          key={day.date}
                          title={`${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`}
                          style={{
                            width: daySize,
                            height: daySize,
                            borderRadius: 2,
                            background: LEVEL_COLORS[day.level],
                            border: day.level > 0
                              ? "1px solid oklch(1 0 0 / 10%)"
                              : "1px solid oklch(1 0 0 / 4%)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {sharedLegend}
      </div>
    );
  }

  // ---------- TABLET SWIPEABLE TIMELINE ----------
  if (isTabletLayout) {
    return (
      <div className="metal-panel w-full min-w-0 max-w-full overflow-hidden p-4 sm:p-5">
        {sharedHeader}

        <div ref={containerRef} className="relative mt-4">
          <div
            ref={scrollRef}
            className="scrollbar-contrib max-w-full overflow-x-auto overscroll-x-contain pb-2"
          >
            <div className="flex min-w-0" style={{ gap: dayGap }}>
              {dayCol > 0 ? (
                <div className="flex shrink-0 flex-col pt-[18px]" style={{ gap }}>
                  {DAY_LABELS.map((label, i) => (
                    <div
                      key={i}
                      style={{ height: cell, width: dayCol, fontSize: cell < 8 ? 8 : 10, lineHeight: `${cell}px` }}
                      className="select-none text-right text-muted-foreground"
                    >
                      {label}
                    </div>
                  ))}
                </div>
              ) : null}

              <div style={{ position: "relative", width: nWeeks * step - gap }}>
                <div style={{ height: 16, position: "relative", marginBottom: 4 }}>
                  {visibleMonthLabels.map(({ label, col }) => (
                    <span
                      key={col}
                      style={{
                        position: "absolute",
                        left: col * step,
                        fontSize: cell < 8 ? 8 : 10,
                        lineHeight: "16px",
                      }}
                      className="select-none text-muted-foreground"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div className="flex" style={{ gap }}>
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col" style={{ gap }}>
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

          {/* Fade hint at right edge */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0f1011] to-transparent" />
          <div className="pointer-events-none absolute bottom-1 right-2 text-[9px] text-white/20 select-none">
            Swipe &rarr;
          </div>
        </div>

        {sharedLegend}
      </div>
    );
  }

  // ---------- FULL DESKTOP LAYOUT ----------
  return (
    <div className="metal-panel w-full min-w-0 max-w-full overflow-hidden p-4 sm:p-6">
      {sharedHeader}

      <div ref={containerRef} className="scrollbar-contrib mt-4 max-w-full overflow-x-auto overscroll-x-contain pb-1">
        <div className="flex min-w-0" style={{ gap: dayGap }}>
          {dayCol > 0 ? (
            <div className="flex shrink-0 flex-col pt-[22px]" style={{ gap }}>
              {DAY_LABELS.map((label, i) => (
                <div
                  key={i}
                  style={{ height: cell, width: dayCol, fontSize: cell < 8 ? 8 : 10, lineHeight: `${cell}px` }}
                  className="select-none text-right text-muted-foreground"
                >
                  {label}
                </div>
              ))}
            </div>
          ) : null}

          <div style={{ position: "relative", width: nWeeks * step - gap }}>
            <div style={{ height: 18, position: "relative", marginBottom: 4 }}>
              {visibleMonthLabels.map(({ label, col }) => (
                <span
                  key={col}
                  style={{
                    position: "absolute",
                    left: col * step,
                    fontSize: cell < 8 ? 8 : 10,
                    lineHeight: "18px",
                  }}
                  className="select-none text-muted-foreground"
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="flex" style={{ gap }}>
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col" style={{ gap }}>
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

      {sharedLegend}
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
