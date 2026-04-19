import { useEffect, useState } from "react";
import {
  PROMPTS,
  VIBES,
  VIBE_LABELS,
  VIBE_COLORS,
  SUGGESTED_TAGS,
  calcXP,
  calcLevel,
} from "./constants.js";
import { uiColors as c } from "./uiColors.js";

function TagBadge({ tag, onRemove }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: c.surfaceRaised, color: c.textSecondary, borderRadius: 999, padding: "3px 12px", fontSize: 12, fontWeight: 500 }}>
      {tag}{onRemove && <span onClick={onRemove} style={{ cursor: "pointer", marginLeft: 2, fontWeight: 700 }}>×</span>}
    </span>
  );
}

export function XPBar({ entries }) {
  const xp = calcXP(entries), level = calcLevel(xp), lxp = (level - 1) * 200, nxp = level * 200;
  const pct = Math.min(100, Math.round(((xp - lxp) / (nxp - lxp)) * 100));
  return (
    <div style={{ background: c.surfaceRaised, borderRadius: 14, padding: "12px 16px", marginBottom: 12, border: `2px solid ${c.borderSubtle}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontWeight: 800, fontSize: 14, color: c.textSecondary }}>⚔️ Level {level}</span>
        <span style={{ fontSize: 12, color: c.textSecondary, fontWeight: 600 }}>{xp} XP</span>
      </div>
      <div style={{ background: c.surfaceRaised, borderRadius: 999, height: 12, overflow: "hidden" }}>
        <div style={{ background: `linear-gradient(90deg, ${c.accentHover}, ${c.accent})`, height: "100%", width: `${pct}%`, borderRadius: 999, transition: "width 0.5s" }} />
      </div>
      <p style={{ fontSize: 10, color: c.textSecondary, margin: "4px 0 0", textAlign: "right" }}>{nxp - xp} XP to Level {level + 1}</p>
    </div>
  );
}

function AiPanel({ entry, onClose }) {
  const [result, setResult] = useState(null), [loading, setLoading] = useState(true), [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const s = entry.reflections.filter(Boolean).map((r, i) => `Q:${PROMPTS[entry.type][i]}\nA:${r}`).join("\n");
        const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 400, messages: [{ role: "user", content: `You are an encouraging coach for a 9-13 year old who just logged a ${entry.type} session. Give: 1) A fun compliment 2) One simple tip 3) A short hype message. Short, fun, emoji-filled.\n\nSession:\"${entry.title}\"\nVibe:${VIBE_LABELS[entry.mood]}\n${s}` }] }) });
        const data = await res.json();
        setResult(data.content?.filter(b => b.type === "text").map(b => b.text).join("\n") || "No response.");
      } catch { setError("Couldn't connect. Try again!"); }
      finally { setLoading(false); }
    })();
  }, []);
  return (
    <div style={{ background: c.surfaceRaised, border: `2px solid ${c.accent}`, borderRadius: 14, padding: 14, marginTop: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: c.textPrimary }}>🤖 Coach Says...</span>
        <span onClick={onClose} style={{ cursor: "pointer", color: c.textPrimary, fontSize: 18 }}>×</span>
      </div>
      {loading && <p style={{ color: c.textPrimary, fontSize: 13, margin: 0 }}>Thinking... 🤔</p>}
      {error && <p style={{ color: c.textMuted, fontSize: 13, margin: 0 }}>{error}</p>}
      {result && <p style={{ fontSize: 13, lineHeight: 1.8, color: c.textPrimary, margin: 0, whiteSpace: "pre-wrap" }}>{result}</p>}
    </div>
  );
}

export function WeeklyReflection({ entries, onClose }) {
  const [result, setResult] = useState(null), [loading, setLoading] = useState(true), [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const wa = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const rc = entries.filter(e => new Date(e.date).getTime() > wa);
        if (!rc.length) { setError("No sessions this week yet! 📝"); setLoading(false); return; }
        const s = rc.map(e => `[${e.type.toUpperCase()}]\"${e.title}\"—vibe:${VIBE_LABELS[e.mood]}\n${e.reflections.filter(Boolean).join("|")}`).join("\n\n");
        const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 500, messages: [{ role: "user", content: `Fun coach for a 9-13 year old. Review their week: 1)Fun highlight 2)Getting better at 3)Challenge for next week 4)Hype message! Short, fun, emoji.\n\n${s}` }] }) });
        const data = await res.json();
        setResult(data.content?.filter(b => b.type === "text").map(b => b.text).join("\n") || "No response.");
      } catch { setError("Couldn't connect. Try again!"); }
      finally { setLoading(false); }
    })();
  }, []);
  return (
    <div style={{ background: c.surfaceRaised, border: `2px solid ${c.borderSubtle}`, borderRadius: 16, marginBottom: 16, overflow: "hidden" }}>
      <div style={{ background: c.surfaceRaised, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `2px solid ${c.borderSubtle}` }}>
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: c.textSecondary }}>✨ Weekly Report</p>
          <p style={{ margin: 0, fontSize: 12, color: c.textSecondary }}>Your coach reviews your week!</p>
        </div>
        <span onClick={onClose} style={{ cursor: "pointer", color: c.textSecondary, fontSize: 20 }}>×</span>
      </div>
      <div style={{ padding: 16, fontSize: 13, lineHeight: 1.8, color: c.textSecondary }}>
        {loading && <p style={{ margin: 0 }}>Reading your adventure log... 📖✨</p>}
        {error && <p style={{ margin: 0, color: c.textMuted }}>{error}</p>}
        {result && <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{result}</p>}
      </div>
    </div>
  );
}

export function EntryForm({ initial, onSave, onCancel }) {
  const [type, setType] = useState(initial?.type || "coding");
  const [mood, setMood] = useState(initial?.mood ?? 2);
  const [title, setTitle] = useState(initial?.title || "");
  const [reflections, setReflections] = useState(initial?.reflections?.length ? [...initial.reflections, ...Array(5).fill("")].slice(0, 5) : ["", "", "", "", ""]);
  const [tags, setTags] = useState(initial?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [showCoach, setShowCoach] = useState(false);
  const [saved, setSaved] = useState(false);
  const updateR = (i, v) => { const r = [...reflections]; r[i] = v; setReflections(r); };
  const addTag = t => { const tag = t.startsWith("#") ? t : "#" + t; if (tag.length > 1 && !tags.includes(tag)) setTags([...tags, tag]); setTagInput(""); };
  const save = () => {
    if (!title.trim()) return;
    setSaved(true);
    setTimeout(() => onSave({ ...(initial || {}), id: initial?.id || Date.now(), type, mood, title, reflections: reflections.filter(Boolean), tags, date: initial?.date || new Date().toISOString() }), 800);
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {["coding", "gaming"].map(t => (
          <button key={t} onClick={() => setType(t)} style={{ flex: 1, padding: "12px 0", borderRadius: 14, fontSize: 14, cursor: "pointer", fontWeight: 700, border: "2px solid", borderColor: type === t ? c.accent : c.borderSubtle, background: type === t ? c.accentSoft : c.surfaceBase, color: type === t ? c.accent : c.textPrimary }}>
            {t === "coding" ? "💻 Coding Quest" : "🎮 Gaming Quest"}
          </button>
        ))}
      </div>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Name your quest!"
        style={{ width: "100%", marginBottom: 16, boxSizing: "border-box", fontSize: 14, borderRadius: 12, border: `2px solid ${c.borderSubtle}`, padding: "10px 14px" }} />
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: c.textSecondary, marginBottom: 10 }}>Vibe Check ✌️</p>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          {VIBES.map((v, i) => (
            <button key={i} onClick={() => setMood(i)} style={{ fontSize: 26, background: "none", border: "2px solid", cursor: "pointer", borderRadius: 12, padding: "6px 10px", borderColor: mood === i ? VIBE_COLORS[i] : c.surfaceInteractive, backgroundColor: mood === i ? VIBE_COLORS[i] + "22" : "transparent", transform: mood === i ? "scale(1.2)" : "scale(1)", transition: "all 0.15s" }}>{v}</button>
          ))}
          <span style={{ fontSize: 13, fontWeight: 700, color: VIBE_COLORS[mood] }}>{VIBE_LABELS[mood]}</span>
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: c.textSecondary, marginBottom: 10 }}>Quest Log 📜</p>
        {PROMPTS[type].map((p, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, color: c.textPrimary, display: "block", marginBottom: 4, fontWeight: 500 }}>{p}</label>
            <textarea value={reflections[i]} onChange={e => updateR(i, e.target.value)} rows={2}
              style={{ width: "100%", boxSizing: "border-box", resize: "vertical", fontSize: 13, borderRadius: 10, border: `2px solid ${c.borderSubtle}`, padding: "8px 12px" }} placeholder="Write here..." />
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: c.textSecondary, marginBottom: 8 }}>Tags 🏷️</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          {SUGGESTED_TAGS[type].map(t => (
            <span key={t} onClick={() => addTag(t)} style={{ cursor: "pointer", fontSize: 12, padding: "4px 12px", borderRadius: 999, border: "2px solid", fontWeight: 500, borderColor: tags.includes(t) ? c.accent : c.borderSubtle, background: tags.includes(t) ? c.accentSoft : c.surfaceBase, color: tags.includes(t) ? c.accent : c.textPrimary }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={tagInput} onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); addTag(tagInput.trim()); } }}
            placeholder="Add your own tag..." style={{ flex: 1, fontSize: 13, borderRadius: 10, border: `2px solid ${c.borderSubtle}`, padding: "8px 12px" }} />
          <button onClick={() => addTag(tagInput.trim())} style={{ padding: "0 16px", cursor: "pointer", border: `2px solid ${c.accent}`, background: c.accentSoft, borderRadius: 10, color: c.accent, fontWeight: 700 }}>+</button>
        </div>
        {tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {tags.map(t => <TagBadge key={t} tag={t} onRemove={() => setTags(tags.filter(x => x !== t))} />)}
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
          <button onClick={save} style={{ padding: "10px 24px", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 14, border: `2px solid ${c.accent}`, background: c.accent, color: "#FFFFFF" }}>
            {initial ? "Save Changes ✅" : "Log Quest! ⚔️"}
          </button>
          {!initial && title && reflections.some(Boolean) && (
            <button onClick={() => setShowCoach(true)} style={{ padding: "10px 18px", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 14, border: `2px solid ${c.accent}`, background: c.surfaceRaised, color: c.textPrimary }}>Ask Coach 🤖</button>
          )}
          <button onClick={onCancel} style={{ padding: "10px 16px", borderRadius: 12, cursor: "pointer", border: `2px solid ${c.borderSubtle}`, background: c.surfaceBase, color: c.textPrimary, fontWeight: 500 }}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export function EntryCard({ entry, onDelete, onEdit }) {
  const [expanded, setExpanded] = useState(false);
  const [showCoach, setShowCoach] = useState(false);
  const d = new Date(entry.date);
  const dateStr = d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  return (
    <div style={{ border: `2px solid ${c.borderSubtle}`, borderRadius: 14, padding: "14px 16px", background: c.surfaceRaised, marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 18 }}>{entry.type === "coding" ? "💻" : "🎮"}</span>
            <span style={{ fontSize: 12, color: c.textMuted, fontWeight: 500 }}>{dateStr}</span>
            <span style={{ fontSize: 18, background: VIBE_COLORS[entry.mood] + "22", borderRadius: 8, padding: "1px 6px" }}>{VIBES[entry.mood]}</span>
          </div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: c.textPrimary }}>{entry.title}</p>
        </div>
        <button onClick={() => setExpanded(!expanded)} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 999, cursor: "pointer", border: `2px solid ${c.borderSubtle}`, background: expanded ? c.surfaceInteractive : c.surfaceInteractive, color: c.textPrimary, fontWeight: 600, flexShrink: 0 }}>
          {expanded ? "▲" : "▼"}
        </button>
      </div>
      {entry.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
          {entry.tags.map(t => <TagBadge key={t} tag={t} />)}
        </div>
      )}
      {expanded && (
        <div style={{ marginTop: 12, borderTop: `2px solid ${c.borderSubtle}`, paddingTop: 12 }}>
          {entry.reflections.map((r, i) => r && (
            <div key={i} style={{ marginBottom: 10 }}>
              <p style={{ fontSize: 12, color: c.textMuted, marginBottom: 2, fontWeight: 600 }}>{PROMPTS[entry.type][i]}</p>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: c.textPrimary }}>{r}</p>
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
