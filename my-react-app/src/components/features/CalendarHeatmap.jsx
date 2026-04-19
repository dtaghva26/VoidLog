import { useMemo } from "react";
import { uiColors as c } from "../../uiColors.js";

const WEEKS_TO_SHOW = 12;
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

function toDayKey(dateLike) {
  const date = new Date(dateLike);
  if (Number.isNaN(date.getTime())) return null;
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfDay(dateLike) {
  const date = new Date(dateLike);
  date.setHours(0, 0, 0, 0);
  return date;
}

export default function CalendarHeatmap({ entries }) {
  const { cells, dayCounts, todayKey } = useMemo(() => {
    const counts = entries.reduce((acc, entry) => {
      const key = toDayKey(entry.date);
      if (!key) return acc;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const today = startOfDay(new Date());
    const start = startOfDay(today);
    start.setDate(start.getDate() - ((WEEKS_TO_SHOW * 7) - 1));

    const nextCells = [];
    for (let i = 0; i < WEEKS_TO_SHOW * 7; i += 1) {
      const date = startOfDay(start);
      date.setDate(start.getDate() + i);
      const key = toDayKey(date);
      nextCells.push({
        date,
        key,
        count: counts[key] || 0,
      });
    }

    return {
      cells: nextCells,
      dayCounts: counts,
      todayKey: toDayKey(today),
    };
  }, [entries]);

  const totalActiveDays = useMemo(() => Object.keys(dayCounts).length, [dayCounts]);

  const currentStreak = useMemo(() => {
    let streak = 0;
    const cursor = startOfDay(new Date());
    while (true) {
      const key = toDayKey(cursor);
      if (!dayCounts[key]) break;
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }, [dayCounts]);

  const colorFor = (count) => {
    if (count === 0) return c.surfaceBase;
    if (count === 1) return "#BBF7D0";
    if (count === 2) return "#4ADE80";
    return "#15803D";
  };

  return (
    <div
      style={{
        border: `2px solid ${c.borderSubtle}`,
        borderRadius: 14,
        padding: 12,
        background: c.surfaceRaised,
        marginBottom: 14,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, gap: 8, flexWrap: "wrap" }}>
        <p style={{ margin: 0, fontWeight: 800, color: c.textPrimary, fontSize: 14 }}>🔥 Activity Heatmap</p>
        <p style={{ margin: 0, fontSize: 12, color: c.textMuted }}>
          {totalActiveDays} active days • {currentStreak} day streak
        </p>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
        <div style={{ display: "grid", gridTemplateRows: "repeat(7, 1fr)", gap: 4, paddingTop: 1 }}>
          {DAYS.map((label, index) => (
            <span key={`${label}-${index}`} style={{ fontSize: 10, color: c.textMuted, height: 12, lineHeight: "12px" }}>{label}</span>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: `repeat(${WEEKS_TO_SHOW}, 1fr)`, gridTemplateRows: "repeat(7, 1fr)", gap: 4, flex: 1 }}>
          {cells.map((cell) => {
            const isToday = cell.key === todayKey;
            return (
              <div
                key={cell.key}
                title={`${cell.date.toLocaleDateString()} • ${cell.count} entr${cell.count === 1 ? "y" : "ies"}`}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  border: isToday ? `1px solid ${c.accent}` : `1px solid ${c.borderSubtle}`,
                  background: colorFor(cell.count),
                }}
              />
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 6, fontSize: 11, color: c.textMuted }}>
        <span>Less</span>
        {[0, 1, 2, 3].map((value) => (
          <span
            key={value}
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              display: "inline-block",
              border: `1px solid ${c.borderSubtle}`,
              background: colorFor(value),
            }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
