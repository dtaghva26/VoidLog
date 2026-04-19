import { useEffect, useState } from "react";
import { VIBE_LABELS } from "../../constants.js";
import { uiColors as c } from "../../uiColors.js";

export default function WeeklyReflection({ entries, onClose }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const recent = entries.filter((entry) => new Date(entry.date).getTime() > weekAgo);
        if (!recent.length) {
          setError("No sessions this week yet! 📝");
          setLoading(false);
          return;
        }
        const summary = recent.map((entry) => `[${entry.type.toUpperCase()}]\"${entry.title}\"—vibe:${VIBE_LABELS[entry.mood]}\n${entry.reflections.filter(Boolean).join("|")}`).join("\n\n");
        const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 500, messages: [{ role: "user", content: `Fun coach for a 9-13 year old. Review their week: 1)Fun highlight 2)Getting better at 3)Challenge for next week 4)Hype message! Short, fun, emoji.\n\n${summary}` }] }) });
        const data = await res.json();
        setResult(data.content?.filter((b) => b.type === "text").map((b) => b.text).join("\n") || "No response.");
      } catch {
        setError("Couldn't connect. Try again!");
      } finally {
        setLoading(false);
      }
    })();
  }, [entries]);

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
