import { BADGES } from "../../constants.js";
import { uiColors as c } from "../../uiColors.js";

export default function BadgesPanel({ entries }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: c.textSecondary, marginBottom: 10 }}>🏅 Badges</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {BADGES.map((badge) => {
          const earned = badge.check(entries);
          return (
            <div key={badge.id} style={{ background: earned ? c.accentSoft : c.surfaceBase, border: `2px solid ${earned ? c.accent : c.borderSubtle}`, borderRadius: 12, padding: "6px 14px", fontSize: 13, fontWeight: 600, color: earned ? c.accent : c.textMuted, opacity: earned ? 1 : 0.7 }}>
              {earned ? badge.icon : "🔒"} {badge.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
