import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useEditorStore } from "../store/editorStore";

const JournalCards = ({ entry }: { entry: any }) => {
  const { setEntryToEdit, deleteEntry } = useEditorStore();

  // Helper to format date
  const date = new Date(entry.created_at);
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const fullDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Mood Emoji Map
  const moodEmojis: Record<string, string> = {
    happy: "😊",
    calm: "😌",
    thoughtful: "🤔",
    sad: "😢",
    stressed: "😫",
  };

  return (
    <div
      onClick={() => setEntryToEdit(entry)}
      className="group relative bg-[#FAF7F0] p-6 border border-line-color shadow-xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rounded-2xl cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-hand text-xl text-[#3E2723] font-bold">
            {dayName}
          </h3>
          <p className="text-sm text-[#8D6E63] font-serif italic">{fullDate}</p>
        </div>
        <p className="text-2xl">{entry.mood ? moodEmojis[entry.mood] : "📝"}</p>
      </div>

      <p className="text-[#5D4037] font-serif line-clamp-3 mb-4 mt-4 leading-relaxed">
        {entry.content || (
          <span className="italic opacity-50">Empty entry...</span>
        )}
      </p>

      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEntryToEdit(entry);
          }}
          className="p-2 text-[#8D6E63] hover:bg-[#8D6E63]/10 rounded-full"
        >
          <Edit2Icon size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteEntry(entry.id);
          }}
          className="p-2 text-[#8D6E63] hover:text-red-800 hover:bg-red-50 rounded-full"
        >
          <Trash2Icon size={16} />
        </button>
      </div>
    </div>
  );
};

export default JournalCards;
