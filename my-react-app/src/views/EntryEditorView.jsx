import { EntryForm } from "../components/features/EntryForm.jsx";
import { uiColors as c } from "../uiColors.js";

export default function EntryEditorView({ view, editingEntry, onBack, onSave, onCancel }) {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 16px" }}>
      <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 16, cursor: "pointer", fontWeight: 600 }} onClick={onBack}>← Back to Quest Log</p>
      <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 800, color: c.textSecondary }}>{view === "edit" ? "Edit Quest ✏️" : "New Quest ⚔️"}</h2>
      <EntryForm initial={editingEntry} onSave={onSave} onCancel={onCancel} />
    </div>
  );
}
