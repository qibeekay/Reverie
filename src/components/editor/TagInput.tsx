import { HashIcon, XIcon } from "lucide-react";
import React from "react";

const TagInput = () => {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2 mb-2">
        <span
          className="
              inline-flex items-center gap-1
              px-3 py-1 rounded-full
              bg-[#8D6E63]/10 text-[#5D4037]
              text-sm font-medium
              border border-[#8D6E63]/20
            "
        >
          #tags
          <button className="hover:text-[#3E2723] transition-colors">
            <XIcon size={12} />
          </button>
        </span>
      </div>

      <div className="relative">
        <HashIcon
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8D6E63]"
          size={16}
        />
        <input
          type="text"
          placeholder="Add tags (press enter)..."
          className="
            w-full pl-10 pr-4 py-2
            bg-transparent
            border-b border-[#E0D6CC]
            text-[#3E2723] placeholder:text-[#8D6E63]/50
            focus:outline-none focus:border-[#8D6E63]
            transition-colors
            font-hand
          "
        />
      </div>
    </div>
  );
};

export default TagInput;
