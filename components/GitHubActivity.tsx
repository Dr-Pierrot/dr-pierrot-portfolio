"use client";
import React, { useEffect, useState } from "react";
import { T } from "@/lib/theme";

type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type ContributionResponse = {
  total: Record<string, number>;
  contributions: Contribution[];
};

const GITHUB_USERNAME = "Dr-Pierrot";

// Dot radius per contribution level, in SVG viewBox units (each cell is
// a 10x10 unit square) — size encodes intensity, rather than GitHub's
// usual color-only encoding.
const DOT_RADIUS: Record<number, number> = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
};

const DOT_OPACITY: Record<number, number> = {
  0: 0.25,
  1: 0.55,
  2: 0.75,
  3: 0.9,
  4: 1,
};

/** Groups a flat list of days into week-columns (7 rows each), GitHub-grid style. */
function toWeeks(days: Contribution[]): Contribution[][] {
  const weeks: Contribution[][] = [];
  let current: Contribution[] = [];

  days.forEach((day, i) => {
    const weekday = new Date(day.date + "T00:00:00").getDay();
    if (i === 0) {
      for (let pad = 0; pad < weekday; pad++) {
        current.push({ date: "", count: 0, level: 0 });
      }
    }
    current.push(day);
    if (weekday === 6) {
      weeks.push(current);
      current = [];
    }
  });
  if (current.length) weeks.push(current);
  return weeks;
}

const GitHubActivity = () => {
  const [data, setData] = useState<ContributionResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((json: ContributionResponse) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const totalCount = data ? (Object.values(data.total)[0] ?? 0) : null;
  const weeks = data ? toWeeks(data.contributions) : [];

  return (
    <div
      style={{
        background: T.color.gradientDark,
        border: `1px solid ${T.color.darkBorder}`,
        borderRadius: "12px",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "18px",
          flexWrap: "wrap" as const,
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: T.font.mono,
            fontSize: "11px",
            color: T.color.darkTextSecondary,
            letterSpacing: "0.5px",
          }}
        >
          {"// github.activity"}
        </span>
        {totalCount !== null && (
          <span
            style={{
              fontFamily: T.font.mono,
              fontSize: "11px",
              color: T.color.accentBorder,
            }}
          >
            {totalCount.toLocaleString()} contributions in the last year
          </span>
        )}
      </div>

      {error && (
        <p
          style={{
            fontFamily: T.font.body,
            fontSize: "13px",
            color: T.color.darkTextSecondary,
            margin: 0,
          }}
        >
          Couldn&apos;t load GitHub activity right now.
        </p>
      )}

      {!error && !data && (
        <svg
          viewBox="0 0 520 70"
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          {Array.from({ length: 52 }).map((_, i) =>
            Array.from({ length: 7 }).map((_, j) => (
              <circle
                key={`${i}-${j}`}
                cx={i * 10 + 5}
                cy={j * 10 + 5}
                r={2}
                fill="rgba(255,255,255,0.06)"
              />
            )),
          )}
        </svg>
      )}

      {!error && data && (
        <svg
          viewBox={`0 0 ${weeks.length * 10} 70`}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          {weeks.map((week, wi) =>
            week.map((day, di) => {
              if (!day.date) return null;
              return (
                <circle
                  key={`${wi}-${di}`}
                  cx={wi * 10 + 5}
                  cy={di * 10 + 5}
                  r={DOT_RADIUS[day.level]}
                  fill={T.color.accentBorder}
                  opacity={DOT_OPACITY[day.level]}
                >
                  <title>{`${day.count} contributions on ${day.date}`}</title>
                </circle>
              );
            }),
          )}
        </svg>
      )}
    </div>
  );
};

export default GitHubActivity;
