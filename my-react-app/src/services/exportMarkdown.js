import { PROMPTS, VIBES, VIBE_LABELS } from "../constants.js";

export function exportEntriesAsMarkdown(entries) {
  if (!entries.length) return;

  const lines = [
    "# My Quest Log 📖\n",
    `Exported ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}\n`,
    "---\n",
  ];

  [...entries]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .forEach((entry) => {
      const date = new Date(entry.date);
      lines.push(`## ${entry.title}`);
      lines.push(
        `**Date:** ${date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} | **Type:** ${entry.type === "coding" ? "💻" : "🎮"} | **Vibe:** ${VIBES[entry.mood]} ${VIBE_LABELS[entry.mood]}`,
      );
      if (entry.tags.length) lines.push(`**Tags:** ${entry.tags.join(" ")}`);
      if (entry.reflections.length) {
        lines.push("\n### Quest Log\n");
        entry.reflections.forEach((reflection, index) => {
          if (reflection) lines.push(`**${PROMPTS[entry.type][index]}**\n${reflection}\n`);
        });
      }
      lines.push("\n---\n");
    });

  const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "my-quest-log.md";
  anchor.click();
  URL.revokeObjectURL(url);
}
