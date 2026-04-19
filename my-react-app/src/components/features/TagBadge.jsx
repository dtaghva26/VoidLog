import { uiColors as c } from "../../uiColors.js";

export default function TagBadge({ tag, onRemove }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: c.surfaceRaised, color: c.textSecondary, borderRadius: 999, padding: "3px 12px", fontSize: 12, fontWeight: 500 }}>
      {tag}
      {onRemove && <span onClick={onRemove} style={{ cursor: "pointer", marginLeft: 2, fontWeight: 700 }}>×</span>}
    </span>
  );
}
