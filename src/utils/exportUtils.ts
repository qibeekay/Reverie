// src/utils/exportUtils.ts

import type { JournalEntry } from "../api/journal";

export const exportJournalAsJSON = (entries: JournalEntry[]) => {
  const dataStr = JSON.stringify(entries, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  downloadBlob(
    blob,
    `reverie-export-${new Date().toISOString().split("T")[0]}.json`
  );
};

export const exportJournalAsMarkdown = (entries: JournalEntry[]) => {
  let markdown = "# My Reverie Journal\n\n";

  entries.forEach((entry) => {
    const date = new Date(entry.created_at || new Date()).toLocaleDateString();
    markdown += `## ${date}\n`;
    markdown += `**Mood:** ${entry.mood || "N/A"}\n`;
    markdown += `**Tags:** ${entry.tags.join(", ") || "None"}\n\n`;
    markdown += `${entry.content}\n\n`;
    if (entry.photo_url) markdown += `![Memory](${entry.photo_url})\n\n`;
    markdown += "---\n\n";
  });

  const blob = new Blob([markdown], { type: "text/markdown" });
  downloadBlob(blob, `my-journal-memories.md`);
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
