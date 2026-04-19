import { useState } from "react";
import { PROMPTS, SUGGESTED_TAGS, VIBE_COLORS, VIBE_LABELS, VIBES } from "../../constants.js";
import { uiColors as c } from "../../uiColors.js";
import AiPanel from "./AiPanel.jsx";
import TagBadge from "./TagBadge.jsx";

export function EntryForm({ initial, onSave, onCancel }) {
  const [type, setType] = useState(initial?.type || "coding");
  const [mood, setMood] = useState(initial?.mood ?? 2);
  const [title, setTitle] = useState(initial?.title || "");
  const [reflections, setReflections] = useState(initial?.reflections?.length ? [...initial.reflections, ...Array(5).fill("")].slice(0, 5) : ["", "", "", "", ""]);
  const [tags, setTags] = useState(initial?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [showCoach, setShowCoach] = useState(false);
  const [saved, setSaved] = useState(false);

  const updateReflection = (index, value) => {
    const next = [...reflections];
    next[index] = value;
    setReflections(next);
  };

  const addTag = (value) => {
    const tag = value.startsWith("#") ? value : `#${value}`;
    if (tag.length > 1 && !tags.includes(tag)) setTags([...tags, tag]);
    setTagInput("");
  };

  const save = () => {
    if (!title.trim()) return;
    setSaved(true);
    setTimeout(() => {
      onSave({ ...(initial || {}), id: initial?.id || Date.now(), type, mood, title, reflections: reflections.filter(Boolean), tags, date: initial?.date || new Date().toISOString() });
    }, 800);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {["coding", "gaming"].map((entryType) => (
          <button key={entryType} onClick={() => setType(entryType)} style={{ flex: 1, padding: "12px 0", borderRadius: 14, fontSize: 14, cursor: "pointer", fontWeight: 700, border: "2px solid", borderColor: type === entryType ? c.accent : c.borderSubtle, background: type === entryType ? c.accentSoft : c.surfaceBase, color: type === entryType ? c.accent : c.textPrimary }}>
            {entryType === "coding" ? "💻 Coding Quest" : "🎮 Gaming Quest"}
          </button>
        ))}
      </div>

      <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Name your quest!" style={{ width: "100%", marginBottom: 16, boxSizing: "border-box", fontSize: 14, borderRadius: 12, border: `2px solid ${c.borderSubtle}`, padding: "10px 14px" }} />

      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: c.textSecondary, marginBottom: 10 }}>Vibe Check ✌️</p>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          {VIBES.map((vibe, index) => (
            <button key={index} onClick={() => setMood(index)} style={{ fontSize: 26, border: "2px solid", cursor: "pointer", borderRadius: 12, padding: "6px 10px", borderColor: mood === index ? VIBE_COLORS[index] : c.surfaceInteractive, backgroundColor: mood === index ? `${VIBE_COLORS[index]}22` : "transparent", transform: mood === index ? "scale(1.2)" : "scale(1)", transition: "all 0.15s" }}>{vibe}</button>
          ))}
          <span style={{ fontSize: 13, fontWeight: 700, color: VIBE_COLORS[mood] }}>{VIBE_LABELS[mood]}</span>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: c.textSecondary, marginBottom: 10 }}>Quest Log 📜</p>
        {PROMPTS[type].map((prompt, index) => (
          <div key={index} style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, color: c.textPrimary, display: "block", marginBottom: 4, fontWeight: 500 }}>{prompt}</label>
            <textarea value={reflections[index]} onChange={(event) => updateReflection(index, event.target.value)} rows={2} style={{ width: "100%", boxSizing: "border-box", resize: "vertical", fontSize: 13, borderRadius: 10, border: `2px solid ${c.borderSubtle}`, padding: "8px 12px" }} placeholder="Write here..." />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: c.textSecondary, marginBottom: 8 }}>Tags 🏷️</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          {SUGGESTED_TAGS[type].map((tag) => (
            <span key={tag} onClick={() => addTag(tag)} style={{ cursor: "pointer", fontSize: 12, padding: "4px 12px", borderRadius: 999, border: "2px solid", fontWeight: 500, borderColor: tags.includes(tag) ? c.accent : c.borderSubtle, background: tags.includes(tag) ? c.accentSoft : c.surfaceBase, color: tags.includes(tag) ? c.accent : c.textPrimary }}>{tag}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                addTag(tagInput.trim());
              }
            }}
            placeholder="Add your own tag..."
            style={{ flex: 1, fontSize: 13, borderRadius: 10, border: `2px solid ${c.borderSubtle}`, padding: "8px 12px" }}
          />
          <button onClick={() => addTag(tagInput.trim())} style={{ padding: "0 16px", cursor: "pointer", border: `2px solid ${c.accent}`, background: c.accentSoft, borderRadius: 10, color: c.accent, fontWeight: 700 }}>+</button>
        </div>
        {tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {tags.map((tag) => <TagBadge key={tag} tag={tag} onRemove={() => setTags(tags.filter((value) => value !== tag))} />)}
          </div>
        )}
      </div>

      {showCoach && title && <AiPanel entry={{ type, mood, title, reflections }} onClose={() => setShowCoach(false)} />}
      {saved ? (
        <div style={{ textAlign: "center", padding: 16, borderRadius: 14, background: c.surfaceRaised, border: `2px solid ${c.accent}` }}>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: c.textPrimary }}>🎉 Quest logged! +{50 + reflections.filter(Boolean).length * 5} XP</p>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={save} style={{ padding: "10px 24px", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 14, border: `2px solid ${c.accent}`, background: c.accent, color: c.onAccent }}>{initial ? "Save Changes ✅" : "Log Quest! ⚔️"}</button>
          {!initial && title && reflections.some(Boolean) && (
            <button onClick={() => setShowCoach(true)} style={{ padding: "10px 18px", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 14, border: `2px solid ${c.accent}`, background: c.surfaceRaised, color: c.textPrimary }}>Ask Coach 🤖</button>
          )}
          <button onClick={onCancel} style={{ padding: "10px 16px", borderRadius: 12, cursor: "pointer", border: `2px solid ${c.borderSubtle}`, background: c.surfaceBase, color: c.textPrimary, fontWeight: 500 }}>Cancel</button>
        </div>
      )}
    </div>
  );
}
