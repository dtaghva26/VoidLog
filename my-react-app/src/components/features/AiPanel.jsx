import { useEffect, useState } from "react";
import { PROMPTS, VIBE_LABELS } from "../../constants.js";
import { uiColors as c } from "../../uiColors.js";

export default function AiPanel({ entry, onClose }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const summary = entry.reflections.filter(Boolean).map((r, i) => `Q:${PROMPTS[entry.type][i]}\nA:${r}`).join("\n");
        const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 400, messages: [{ role: "user", content: `You are an encouraging coach for a 9-13 year old who just logged a ${entry.type} session. Give: 1) A fun compliment 2) One simple tip 3) A short hype message. Short, fun, emoji-filled.\n\nSession:\"${entry.title}\"\nVibe:${VIBE_LABELS[entry.mood]}\n${summary}` }] }) });
        const data = await res.json();
        setResult(data.content?.filter((b) => b.type === "text").map((b) => b.text).join("\n") || "No response.");
      } catch {
        setError("Couldn't connect. Try again!");
      } finally {
        setLoading(false);
      }
    })();
  }, [entry]);

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
