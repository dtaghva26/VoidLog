import { calcLevel, calcXP } from "../../constants.js";
import { uiColors as c } from "../../uiColors.js";

export default function XPBar({ entries }) {
  const xp = calcXP(entries);
  const level = calcLevel(xp);
  const levelXP = (level - 1) * 200;
  const nextXP = level * 200;
  const pct = Math.min(100, Math.round(((xp - levelXP) / (nextXP - levelXP)) * 100));

  return (
    <div style={{ background: c.surfaceRaised, borderRadius: 14, padding: "12px 16px", marginBottom: 12, border: `2px solid ${c.borderSubtle}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontWeight: 800, fontSize: 14, color: c.textSecondary }}>⚔️ Level {level}</span>
        <span style={{ fontSize: 12, color: c.textSecondary, fontWeight: 600 }}>{xp} XP</span>
      </div>
      <div style={{ background: c.surfaceRaised, borderRadius: 999, height: 12, overflow: "hidden" }}>
        <div style={{ background: `linear-gradient(90deg, ${c.accentHover}, ${c.accent})`, height: "100%", width: `${pct}%`, borderRadius: 999, transition: "width 0.5s" }} />
      </div>
      <p style={{ fontSize: 10, color: c.textSecondary, margin: "4px 0 0", textAlign: "right" }}>{nextXP - xp} XP to Level {level + 1}</p>
    </div>
  );
}
