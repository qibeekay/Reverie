import { useEditorStore } from "../store/editorStore";

const Analytics = () => {
  const { entries } = useEditorStore();

  const totalWords = entries.reduce((acc, entry) => {
    return (
      acc +
      (entry.content.trim() ? entry.content.trim().split(/\s+/).length : 0)
    );
  }, 0);

  const firstEntryDate =
    entries.length > 0
      ? new Date(
          entries[entries.length - 1].created_at || new Date()
        ).toLocaleDateString()
      : "N/A";

  return (
    <div className="border border-line-color rounded-2xl p-6 shadow-xs bg-white">
      <h3 className="text-xl font-bold text-[#3E2723] mb-4 font-serif">
        Journal Stats
      </h3>
      <div className="flex flex-col gap-y-3 text-[#5D4037]">
        <div className="flex justify-between">
          <span>Total Entries:</span>
          <span className="font-bold">{entries.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Words Written:</span>
          <span className="font-bold">{totalWords.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>First Memory:</span>
          <span className="font-bold">{firstEntryDate}</span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
