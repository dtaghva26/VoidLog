import { useState } from "react";
import { PROMPTS, VIBE_COLORS, VIBES } from "../../constants.js";
import { uiColors as c } from "../../uiColors.js";
import AiPanel from "./AiPanel.jsx";
import TagBadge from "./TagBadge.jsx";

export function EntryCard({ entry, onDelete, onEdit }) {
  const [expanded, setExpanded] = useState(false);
  const [showCoach, setShowCoach] = useState(false);
  const date = new Date(entry.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  return (
    <div style={{ border: `2px solid ${c.borderSubtle}`, borderRadius: 14, padding: "14px 16px", background: c.surfaceRaised, marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 18 }}>{entry.type === "coding" ? "💻" : "🎮"}</span>
            <span style={{ fontSize: 12, color: c.textMuted, fontWeight: 500 }}>{date}</span>
            <span style={{ fontSize: 18, background: `${VIBE_COLORS[entry.mood]}22`, borderRadius: 8, padding: "1px 6px" }}>{VIBES[entry.mood]}</span>
          </div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: c.textPrimary }}>{entry.title}</p>
        </div>
        <button onClick={() => setExpanded(!expanded)} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 999, cursor: "pointer", border: `2px solid ${c.borderSubtle}`, background: c.surfaceInteractive, color: c.textPrimary, fontWeight: 600, flexShrink: 0 }}>
          {expanded ? "▲" : "▼"}
        </button>
      </div>

      {entry.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
          {entry.tags.map((tag) => <TagBadge key={tag} tag={tag} />)}
        </div>
      )}

      {expanded && (
        <div style={{ marginTop: 12, borderTop: `2px solid ${c.borderSubtle}`, paddingTop: 12 }}>
          {entry.reflections.map((reflection, index) => reflection && (
            <div key={index} style={{ marginBottom: 10 }}>
              <p style={{ fontSize: 12, color: c.textMuted, marginBottom: 2, fontWeight: 600 }}>{PROMPTS[entry.type][index]}</p>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: c.textPrimary }}>{reflection}</p>
            </div>
          ))}
          {showCoach && <AiPanel entry={entry} onClose={() => setShowCoach(false)} />}
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            <button onClick={() => setShowCoach(true)} style={{ fontSize: 12, padding: "5px 14px", borderRadius: 999, cursor: "pointer", border: `2px solid ${c.accent}`, background: c.surfaceRaised, color: c.textPrimary, fontWeight: 600 }}>🤖 Ask Coach</button>
            <button onClick={() => onEdit(entry)} style={{ fontSize: 12, padding: "5px 14px", borderRadius: 999, cursor: "pointer", border: `2px solid ${c.borderSubtle}`, background: c.surfaceRaised, color: c.textSecondary, fontWeight: 600 }}>✏️ Edit</button>
            <button onClick={() => onDelete(entry.id)} style={{ fontSize: 12, padding: "5px 14px", borderRadius: 999, cursor: "pointer", border: `2px solid ${c.borderSubtle}`, background: c.surfaceRaised, color: c.danger, fontWeight: 600 }}>🗑️ Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
