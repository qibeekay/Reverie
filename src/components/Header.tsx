import { CalendarIcon, Download, ListIcon } from "lucide-react";
import { ReverieLogo } from "./Logo";
import { useEditorStore } from "../store/editorStore";
import { exportJournalAsMarkdown } from "../utils/exportUtils";
import { toast } from "sonner";

const Header = () => {
  const { isEditorOpen, entries, viewMode, setViewMode } = useEditorStore();

  const handleExport = () => {
    if (entries.length === 0) {
      toast.info("No entries to export yet!");
      return;
    }
    exportJournalAsMarkdown(entries);
  };
  return (
    <header className="flex items-center justify-between w-full py-4 border-b border-line-color">
      <ReverieLogo />

      <nav className="flex items-center justify-between gap-4">
        {/* export */}
        {!isEditorOpen && (
          <button
            className="flex items-center gap-2 text-sm cursor-pointer"
            onClick={handleExport}
          >
            <Download className="w-4 h-4" />
            <p className="hidden md:block">Export Journal</p>
          </button>
        )}

        {/* view mode */}
        {!isEditorOpen && (
          <div className="flex bg-[#FAF7F0] rounded-full p-1 border border-[#E0D6CC] shadow-sm gap-x-1">
            {/* currently active style */}
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full transition-all shadow-sm cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#3E2723] text-white"
                  : "text-[#8D6E63] hover:bg-[#8D6E63]/10"
              }
            `}
            >
              <ListIcon size={20} />
            </button>

            {/* inactive style */}
            <button
              onClick={() => setViewMode("calendar")}
              className={`p-2 rounded-full transition-all shadow-sm cursor-pointer ${
                viewMode === "calendar"
                  ? "bg-[#3E2723] text-white"
                  : "text-[#8D6E63] hover:bg-[#8D6E63]/10"
              }
            `}
            >
              <CalendarIcon size={20} />
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
