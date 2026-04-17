import { useEffect, useState } from "react";
import { BADGES, PROMPTS, VIBES, VIBE_LABELS, calcXP } from "./constants.js";
import PetStudio from "./PetStudio.jsx";
import { EntryCard, EntryForm, WeeklyReflection, XPBar } from "./DevLogFeatures.jsx";

export default function App() {
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

  const saveEntries = async n => { setEntries(n); try { await window.storage.set("devgamelog_entries", JSON.stringify(n)); } catch { } };
  const savePet = async p => { setPet(p); try { await window.storage.set("devgamelog_pet", JSON.stringify(p)); } catch { } };
  const saveSpentXP = async x => { setSpentXP(x); try { await window.storage.set("devgamelog_spentxp", JSON.stringify(x)); } catch { } };
  const addEntry = e => { saveEntries([e, ...entries]); setView("log"); };
  const updateEntry = u => { saveEntries(entries.map(e => e.id === u.id ? u : e)); setEditingEntry(null); setView("log"); };
  const deleteEntry = id => saveEntries(entries.filter(e => e.id !== id));

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

  const totalXP = calcXP(entries);
  const filtered = entries.filter(e => {
    if (filter !== "all" && e.type !== filter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return e.title.toLowerCase().includes(q) || e.reflections.some(r => r.toLowerCase().includes(q)) || e.tags.some(t => t.toLowerCase().includes(q));
  });

  if (!loaded) return <div style={{ padding: 24, color: "#9ca3af", fontSize: 14 }}>Loading your quest log... ⚔️</div>;

  if (view === "new" || view === "edit") {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 16px" }}>
        <p style={{ fontSize: 13, color: "#8b5cf6", marginBottom: 16, cursor: "pointer", fontWeight: 600 }} onClick={() => { setEditingEntry(null); setView("log"); }}>← Back to Quest Log</p>
        <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 800, color: "#6d28d9" }}>{view === "edit" ? "Edit Quest ✏️" : "New Quest ⚔️"}</h2>
        <EntryForm initial={editingEntry} onSave={view === "edit" ? updateEntry : addEntry} onCancel={() => { setEditingEntry(null); setView("log"); }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 660, margin: "0 auto", padding: "20px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#6d28d9" }}>⚔️ Quest Log</h1>
          <p style={{ margin: "2px 0 0", fontSize: 13, color: "#9ca3af" }}>your coding & gaming diary</p>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button onClick={() => setShowPet(!showPet)} style={{ padding: "7px 12px", borderRadius: 10, cursor: "pointer", fontSize: 13, border: "2px solid #f0abfc", background: showPet ? "#fdf4ff" : "white", color: "#86198f", fontWeight: 700 }}>🐾 Pet</button>
          <button onClick={() => setShowBadges(!showBadges)} style={{ padding: "7px 12px", borderRadius: 10, cursor: "pointer", fontSize: 13, border: "2px solid #fde047", background: "#fefce8", color: "#854d0e", fontWeight: 700 }}>🏅</button>
          <button onClick={() => setShowWeekly(!showWeekly)} style={{ padding: "7px 12px", borderRadius: 10, cursor: "pointer", fontSize: 13, border: "2px solid #f0abfc", background: "#fdf4ff", color: "#86198f", fontWeight: 700 }}>✨</button>
          <button onClick={exportMarkdown} style={{ padding: "7px 12px", borderRadius: 10, cursor: "pointer", fontSize: 13, border: "2px solid #ddd6fe", background: "#f5f3ff", color: "#6d28d9", fontWeight: 700 }}>⬇</button>
          <button onClick={() => setView("new")} style={{ padding: "7px 16px", borderRadius: 10, cursor: "pointer", fontWeight: 800, fontSize: 14, border: "2px solid #8b5cf6", background: "#8b5cf6", color: "white" }}>+ Quest</button>
        </div>
      </div>

      {entries.length > 0 && <XPBar entries={entries} />}
      {showPet && <PetStudio pet={pet} setPet={savePet} spentXP={spentXP} setSpentXP={saveSpentXP} totalXP={totalXP} />}

      {showBadges && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#6d28d9", marginBottom: 10 }}>🏅 Badges</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {BADGES.map(b => {
              const earned = b.check(entries);
              return (
                <div key={b.id} style={{ background: earned ? "#fef9c3" : "#f3f4f6", border: `2px solid ${earned ? "#fde047" : "#e5e7eb"}`, borderRadius: 12, padding: "6px 14px", fontSize: 13, fontWeight: 600, color: earned ? "#854d0e" : "#9ca3af", opacity: earned ? 1 : 0.6 }}>
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
          style={{ width: "100%", boxSizing: "border-box", fontSize: 13, borderRadius: 12, border: "2px solid #e5e7eb", padding: "10px 14px" }} />
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {["all", "coding", "gaming"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ fontSize: 13, padding: "6px 16px", borderRadius: 999, cursor: "pointer", fontWeight: 600, border: "2px solid", borderColor: filter === f ? "#8b5cf6" : "#e5e7eb", background: filter === f ? "#ede9fe" : "white", color: filter === f ? "#6d28d9" : "#6b7280" }}>
            {f === "all" ? "⚔️ All" : f === "coding" ? "💻 Coding" : "🎮 Gaming"}
          </button>
        ))}
        {search && <span style={{ fontSize: 12, color: "#9ca3af", alignSelf: "center", marginLeft: 4 }}>{filtered.length} found</span>}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 16px", border: "2px dashed #e5e7eb", borderRadius: 16 }}>
          <p style={{ fontSize: 28, margin: "0 0 8px" }}>🗺️</p>
          <p style={{ fontSize: 14, color: "#9ca3af", margin: 0, fontWeight: 600 }}>{entries.length === 0 ? "No quests yet — start your adventure!" : "No quests match your search!"}</p>
        </div>
      ) : filtered.map(e => (
        <EntryCard key={e.id} entry={e} onDelete={deleteEntry} onEdit={entry => { setEditingEntry(entry); setView("edit"); }} />
      ))}
    </div>
  );
}
