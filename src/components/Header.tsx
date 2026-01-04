import { CalendarIcon, Download, ListIcon } from "lucide-react";
import { ReverieLogo } from "./Logo";
import { useEditorStore } from "../store/editorStore";

const Header = () => {
  const { isEditorOpen } = useEditorStore();
  return (
    <header className="flex items-center justify-between w-full py-4 border-b border-line-color">
      <ReverieLogo />

      <nav className="flex items-center justify-between gap-4">
        {/* export */}
        {!isEditorOpen && (
          <button className="flex items-center gap-2 text-sm cursor-pointer">
            <Download className="w-4 h-4" />
            <p>Export Journal</p>
          </button>
        )}

        {/* view mode */}
        {!isEditorOpen && (
          <div className="flex bg-[#FAF7F0] rounded-full p-1 border border-[#E0D6CC] shadow-sm gap-x-1">
            {/* currently active style */}
            <button
              className={`p-2 rounded-full transition-all  bg-[#3E2723] text-white  cursor-pointer
            `}
            >
              <ListIcon size={20} />
            </button>

            {/* inactive style */}
            <button
              className={`p-2 rounded-full transition-all text-[#8D6E63] hover:bg-[#8D6E63]/10 shadow-sm cursor-pointer
              
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
