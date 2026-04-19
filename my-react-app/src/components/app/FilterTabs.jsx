import { uiColors as c } from "../../uiColors.js";

const FILTERS = ["all", "coding", "gaming"];

export default function FilterTabs({ filter, onChange, search, count }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
      {FILTERS.map((f) => (
        <button key={f} onClick={() => onChange(f)} style={{ fontSize: 13, padding: "6px 16px", borderRadius: 999, cursor: "pointer", fontWeight: 600, border: "2px solid", borderColor: filter === f ? c.accent : c.borderSubtle, background: filter === f ? c.accentSoft : c.surfaceBase, color: filter === f ? c.accent : c.textPrimary }}>
          {f === "all" ? "🧭 All" : f === "coding" ? "🧑‍💻 Coding" : "🕹️ Gaming"}
        </button>
      ))}
      {search && <span style={{ fontSize: 12, color: c.textMuted, alignSelf: "center", marginLeft: 4 }}>{count} found</span>}
    </div>
  );
}
