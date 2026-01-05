import { useEditorStore } from "../../store/editorStore";

export function EntryEditor() {
  const { content, setContent } = useEditorStore();
  return (
    <div className="relative w-full h-full min-h-100 bg-transparent">
      {/* Paper Background with Lines */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 79px, #EF9A9A 79px, #EF9A9A 81px, transparent 81px),
            linear-gradient(#E0D6CC .1em, transparent .1em)
          `,
          backgroundSize: "100% 1.5rem",
        }}
      />

      {/* Text Area */}
      <textarea
        placeholder="Dear Journal ..."
        className="
          w-full h-full min-h-100
          bg-transparent
          text-[#3E2723] text-lg leading-6
          font-serif
          pl-24 pr-8 py-0
          resize-none outline-none border-none
          placeholder:text-[#8D6E63]/40 placeholder:italic
          focus:ring-0
        "
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          marginTop: "0.1em",
        }}
        spellCheck={false}
      />
    </div>
  );
}
