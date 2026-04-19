import { useMemo, useState } from "react";
import PetStudio from "./PetStudio.jsx";
import { CalendarHeatmap, EntryCard, WeeklyReflection, XPBar } from "./DevLogFeatures.jsx";
import AppHeader from "./components/app/AppHeader.jsx";
import BadgesPanel from "./components/app/BadgesPanel.jsx";
import EmptyState from "./components/app/EmptyState.jsx";
import FilterTabs from "./components/app/FilterTabs.jsx";
import SearchBar from "./components/app/SearchBar.jsx";
import { useQuestLogData } from "./hooks/useQuestLogData.js";
import { exportEntriesAsMarkdown } from "./services/exportMarkdown.js";
import { uiColors as c } from "./uiColors.js";
import EntryEditorView from "./views/EntryEditorView.jsx";

export default function App() {
  const [view, setView] = useState("log");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingEntry, setEditingEntry] = useState(null);
  const [showWeekly, setShowWeekly] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showPet, setShowPet] = useState(true);

  const {
    entries,
    setEntries,
    pet,
    setPet,
    spentXP,
    setSpentXP,
    totalXP,
    loaded,
  } = useQuestLogData();

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      if (filter !== "all" && entry.type !== filter) return false;
      if (!search.trim()) return true;
      const query = search.toLowerCase();
      return (
        entry.title.toLowerCase().includes(query) ||
        entry.reflections.some((reflection) => reflection.toLowerCase().includes(query)) ||
        entry.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [entries, filter, search]);

  const addEntry = (entry) => {
    setEntries([entry, ...entries]);
    setView("log");
  };

  const updateEntry = (updated) => {
    setEntries(entries.map((entry) => (entry.id === updated.id ? updated : entry)));
    setEditingEntry(null);
    setView("log");
  };

  const deleteEntry = (id) => setEntries(entries.filter((entry) => entry.id !== id));

  if (!loaded) {
    return <div style={{ padding: 24, color: c.textMuted, fontSize: 14 }}>Loading your quest log... ⚔️</div>;
  }

  if (view === "new" || view === "edit") {
    return (
      <EntryEditorView
        view={view}
        editingEntry={editingEntry}
        onBack={() => {
          setEditingEntry(null);
          setView("log");
        }}
        onSave={view === "edit" ? updateEntry : addEntry}
        onCancel={() => {
          setEditingEntry(null);
          setView("log");
        }}
      />
    );
  }

  return (
    <div style={{ maxWidth: 660, margin: "0 auto", padding: "20px 16px" }}>
      <AppHeader
        showPet={showPet}
        onTogglePet={() => setShowPet(!showPet)}
        onToggleBadges={() => setShowBadges(!showBadges)}
        onToggleWeekly={() => setShowWeekly(!showWeekly)}
        onExport={() => exportEntriesAsMarkdown(entries)}
        onNew={() => setView("new")}
      />

      {entries.length > 0 && <XPBar entries={entries} />}
      {entries.length > 0 && <CalendarHeatmap entries={entries} />}
      {showPet && <PetStudio pet={pet} setPet={setPet} spentXP={spentXP} setSpentXP={setSpentXP} totalXP={totalXP} />}
      {showBadges && <BadgesPanel entries={entries} />}
      {showWeekly && <WeeklyReflection entries={entries} onClose={() => setShowWeekly(false)} />}

      <SearchBar value={search} onChange={setSearch} />
      <FilterTabs filter={filter} onChange={setFilter} search={search} count={filteredEntries.length} />

      {filteredEntries.length === 0 ? (
        <EmptyState hasEntries={entries.length > 0} />
      ) : (
        filteredEntries.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            onDelete={deleteEntry}
            onEdit={(selectedEntry) => {
              setEditingEntry(selectedEntry);
              setView("edit");
            }}
          />
        ))
      )}
    </div>
  );
}
