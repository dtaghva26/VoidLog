import { uiColors as c } from "../../uiColors.js";

export default function EmptyState({ hasEntries }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 16px", border: `2px dashed ${c.borderSubtle}`, borderRadius: 16 }}>
      <p style={{ fontSize: 28, margin: "0 0 8px" }}>🗺️</p>
      <p style={{ fontSize: 14, color: c.textMuted, margin: 0, fontWeight: 600 }}>
        {hasEntries ? "No quests match your search!" : "No quests yet — start your adventure!"}
      </p>
    </div>
  );
}
