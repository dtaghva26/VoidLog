import { uiColors as c } from "../../uiColors.js";

export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="🔍 Search your quests..."
        style={{ width: "100%", boxSizing: "border-box", fontSize: 13, borderRadius: 12, border: `2px solid ${c.borderSubtle}`, padding: "10px 14px", color: c.textPrimary, background: c.surfaceBase }}
      />
    </div>
  );
}
