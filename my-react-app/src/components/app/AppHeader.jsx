import { uiColors as c } from "../../uiColors.js";

export default function AppHeader({ showPet, onTogglePet, onToggleBadges, onToggleWeekly, onExport, onNew }) {
  const controlStyle = {
    padding: "7px 12px",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 13,
    border: `2px solid ${c.borderSubtle}`,
    background: c.accentSoft,
    color: c.textSecondary,
    fontWeight: 700,
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: c.textSecondary }}>⚔️ Quest Log</h1>
        <p style={{ margin: "2px 0 0", fontSize: 13, color: c.textMuted }}>your coding & gaming diary</p>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <button onClick={onTogglePet} style={{ ...controlStyle, background: showPet ? c.accentSoft : c.surfaceBase }}>🐾 Pet</button>
        <button onClick={onToggleBadges} style={controlStyle}>🏅</button>
        <button onClick={onToggleWeekly} style={controlStyle}>✨</button>
        <button onClick={onExport} style={controlStyle}>⬇</button>
        <button onClick={onNew} style={{ padding: "7px 16px", borderRadius: 10, cursor: "pointer", fontWeight: 800, fontSize: 14, border: `2px solid ${c.accent}`, background: c.accent, color: "#FFFFFF" }}>+ Quest</button>
      </div>
    </div>
  );
}
