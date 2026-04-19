import { useEffect, useState } from "react";
import { BADGES, PROMPTS, VIBES, VIBE_LABELS, calcXP } from "./constants.js";
import PetStudio from "./PetStudio.jsx";
import { EntryCard, EntryForm, WeeklyReflection, XPBar } from "./DevLogFeatures.jsx";
import { uiColors as c } from "./uiColors.js";

export default function App() {
  // --- Local UI state ---
  // `view` controls whether we render the list or the entry form flows.
  const [view, setView] = useState("log");
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [showWeekly, setShowWeekly] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showPet, setShowPet] = useState(true);
  const [pet, setPet] = useState({ type: "dragon", name: "Sparky", growth: 0 });
  const [spentXP, setSpentXP] = useState(0);

  // Hydrate persisted data once; we still render with defaults if storage is unavailable.
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("devgamelog_entries"); if (r?.value) setEntries(JSON.parse(r.value));
        const p = await window.storage.get("devgamelog_pet"); if (p?.value) setPet(JSON.parse(p.value));
        const x = await window.storage.get("devgamelog_spentxp"); if (x?.value) setSpentXP(JSON.parse(x.value));
      } catch { }
      setLoaded(true);
    })();
  }, []);

  // Update local state first so the UI remains responsive, then persist best-effort.
  const saveEntries = async n => { setEntries(n); try { await window.storage.set("devgamelog_entries", JSON.stringify(n)); } catch { } };
  const savePet = async p => { setPet(p); try { await window.storage.set("devgamelog_pet", JSON.stringify(p)); } catch { } };
  const saveSpentXP = async x => { setSpentXP(x); try { await window.storage.set("devgamelog_spentxp", JSON.stringify(x)); } catch { } };
  const addEntry = e => { saveEntries([e, ...entries]); setView("log"); };
  const updateEntry = u => { saveEntries(entries.map(e => e.id === u.id ? u : e)); setEditingEntry(null); setView("log"); };
  const deleteEntry = id => saveEntries(entries.filter(e => e.id !== id));

  // Export sorts chronologically so the markdown reads like a timeline, not insertion order.
  const exportMarkdown = () => {
    if (!entries.length) return;
    const lines = ["# My Quest Log 📖\n", `Exported ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}\n`, "---\n"];
    [...entries].sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(e => {
      const d = new Date(e.date);
      lines.push(`## ${e.title}`);
      lines.push(`**Date:** ${d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} | **Type:** ${e.type === "coding" ? "💻" : "🎮"} | **Vibe:** ${VIBES[e.mood]} ${VIBE_LABELS[e.mood]}`);
      if (e.tags.length) lines.push(`**Tags:** ${e.tags.join(" ")}`);
      if (e.reflections.length) { lines.push("\n### Quest Log\n"); e.reflections.forEach((r, i) => r && lines.push(`**${PROMPTS[e.type][i]}**\n${r}\n`)); }
      lines.push("\n---\n");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "my-quest-log.md"; a.click(); URL.revokeObjectURL(url);
  };

  // `totalXP` is reused by pet progression and should always reflect the full log.
  const totalXP = calcXP(entries);
  // Search is intentionally broad across title/body/tags for quick recall.
  const filtered = entries.filter(e => {
    if (filter !== "all" && e.type !== filter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return e.title.toLowerCase().includes(q) || e.reflections.some(r => r.toLowerCase().includes(q)) || e.tags.some(t => t.toLowerCase().includes(q));
  });

  // Avoid rendering empty-state flashes before async hydration finishes.
  if (!loaded) return <div style={{ padding: 24, color: c.textMuted, fontSize: 14 }}>Loading your quest log... ⚔️</div>;

  // Keep create/edit in a dedicated branch to simplify list-view JSX below.
  if (view === "new" || view === "edit") {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 16px" }}>
        <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 16, cursor: "pointer", fontWeight: 600 }} onClick={() => { setEditingEntry(null); setView("log"); }}>← Back to Quest Log</p>
        <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 800, color: c.textSecondary }}>{view === "edit" ? "Edit Quest ✏️" : "New Quest ⚔️"}</h2>
        <EntryForm initial={editingEntry} onSave={view === "edit" ? updateEntry : addEntry} onCancel={() => { setEditingEntry(null); setView("log"); }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 660, margin: "0 auto", padding: "20px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: c.textSecondary }}>⚔️ Quest Log</h1>
          <p style={{ margin: "2px 0 0", fontSize: 13, color: c.textMuted }}>your coding & gaming diary</p>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button onClick={() => setShowPet(!showPet)} style={{ padding: "7px 12px", borderRadius: 10, cursor: "pointer", fontSize: 13, border: `2px solid ${c.borderSubtle}`, background: showPet ? c.accentSoft : c.surfaceBase, color: c.textSecondary, fontWeight: 700 }}>🐾 Pet</button>
          <button onClick={() => setShowBadges(!showBadges)} style={{ padding: "7px 12px", borderRadius: 10, cursor: "pointer", fontSize: 13, border: `2px solid ${c.borderSubtle}`, background: c.accentSoft, color: c.textPrimary, fontWeight: 700 }}>🏅</button>
          <button onClick={() => setShowWeekly(!showWeekly)} style={{ padding: "7px 12px", borderRadius: 10, cursor: "pointer", fontSize: 13, border: `2px solid ${c.borderSubtle}`, background: c.accentSoft, color: c.textSecondary, fontWeight: 700 }}>✨</button>
          <button onClick={exportMarkdown} style={{ padding: "7px 12px", borderRadius: 10, cursor: "pointer", fontSize: 13, border: `2px solid ${c.borderSubtle}`, background: c.accentSoft, color: c.textSecondary, fontWeight: 700 }}>⬇</button>
          <button onClick={() => setView("new")} style={{ padding: "7px 16px", borderRadius: 10, cursor: "pointer", fontWeight: 800, fontSize: 14, border: `2px solid ${c.accent}`, background: c.accent, color: "#FFFFFF" }}>+ Quest</button>
        </div>
      </div>

      {entries.length > 0 && <XPBar entries={entries} />}
      {showPet && <PetStudio pet={pet} setPet={savePet} spentXP={spentXP} setSpentXP={saveSpentXP} totalXP={totalXP} />}

      {/* Badge unlock state is derived each render so new entries immediately reflect progress. */}
      {showBadges && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: c.textSecondary, marginBottom: 10 }}>🏅 Badges</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {BADGES.map(b => {
              const earned = b.check(entries);
              return (
                <div key={b.id} style={{ background: earned ? c.accentSoft : c.surfaceBase, border: `2px solid ${earned ? c.accent : c.borderSubtle}`, borderRadius: 12, padding: "6px 14px", fontSize: 13, fontWeight: 600, color: earned ? c.accent : c.textMuted, opacity: earned ? 1 : 0.7 }}>
                  {earned ? b.icon : "🔒"} {b.label}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showWeekly && <WeeklyReflection entries={entries} onClose={() => setShowWeekly(false)} />}

      <div style={{ marginBottom: 12 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search your quests..."
          style={{ width: "100%", boxSizing: "border-box", fontSize: 13, borderRadius: 12, border: `2px solid ${c.borderSubtle}`, padding: "10px 14px", color: c.textPrimary, background: c.surfaceBase }} />
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {["all", "coding", "gaming"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ fontSize: 13, padding: "6px 16px", borderRadius: 999, cursor: "pointer", fontWeight: 600, border: "2px solid", borderColor: filter === f ? c.accent : c.borderSubtle, background: filter === f ? c.accentSoft : c.surfaceBase, color: filter === f ? c.accent : c.textPrimary }}>
            {f === "all" ? "⚔️ All" : f === "coding" ? "💻 Coding" : "🎮 Gaming"}
          </button>
        ))}
        {search && <span style={{ fontSize: 12, color: c.textMuted, alignSelf: "center", marginLeft: 4 }}>{filtered.length} found</span>}
      </div>

      {/* Empty state distinguishes between "no data yet" and "filters removed all matches". */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 16px", border: `2px dashed ${c.borderSubtle}`, borderRadius: 16 }}>
          <p style={{ fontSize: 28, margin: "0 0 8px" }}>🗺️</p>
          <p style={{ fontSize: 14, color: c.textMuted, margin: 0, fontWeight: 600 }}>{entries.length === 0 ? "No quests yet — start your adventure!" : "No quests match your search!"}</p>
        </div>
      ) : filtered.map(e => (
        <EntryCard key={e.id} entry={e} onDelete={deleteEntry} onEdit={entry => { setEditingEntry(entry); setView("edit"); }} />
      ))}
    </div>
  );
}
