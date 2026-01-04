import { Edit2Icon, Trash2Icon } from "lucide-react";
import React from "react";

const JournalCards = () => {
  return (
    <div
      className="
        group relative bg-[#FAF7F0] p-6
        border border-line-color shadow-xs
        hover:shadow-[4px_4px_8px_rgba(62,39,35,0.1)]
        transition-all duration-300 ease-out
        transform hover:-translate-y-1 hover:rotate-1
        cursor-pointer
      "
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-hand text-xl text-[#3E2723] font-bold">Sunday</h3>

          <p className="text-sm text-[#8D6E63] font-serif italic">
            January 6 2026
          </p>
        </div>

        <p className="text-2xl opacity-80">😊</p>
      </div>

      <p className="text-[#5D4037] font-serif leading-relaxed line-clamp-3 mb-4 opacity-90 mt-4">
        <span className="italic opacity-50">Empty entry...</span>
      </p>

      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="p-2 text-[#8D6E63] hover:text-[#3E2723] hover:bg-[#8D6E63]/10 rounded-full transition-colors cursor-pointer"
          aria-label="Edit entry"
        >
          <Edit2Icon size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="p-2 text-[#8D6E63] hover:text-red-800 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
          aria-label="Delete entry"
        >
          <Trash2Icon size={16} />
        </button>
      </div>
    </div>
  );
};

export default JournalCards;
