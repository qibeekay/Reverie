import { HashIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { useEditorStore } from "../../store/editorStore";

const TagInput = () => {
  const { tags, setTags } = useEditorStore();
  const [input, setInput] = useState("");

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput("");
    }
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#8D6E63]/10 text-[#5D4037] text-sm"
          >
            #{tag}
            <button onClick={() => setTags(tags.filter((t) => t !== tag))}>
              <XIcon size={12} />
            </button>
          </span>
        ))}
      </div>
      <div className="relative">
        <HashIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8D6E63]"
          size={16}
        />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={addTag}
          placeholder="Add tags..."
          className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-[#E0D6CC] font-hand outline-none"
        />
      </div>
    </div>
  );
};
export default TagInput;
