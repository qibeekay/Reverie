import { SearchIcon } from "lucide-react";
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}
export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-[#8D6E63]" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search your memories..."
        className="
          block w-full pl-10 pr-3 py-2.5
          bg-[#FAF7F0] border border-[#E0D6CC]
          rounded-full
          text-[#3E2723] placeholder:text-[#8D6E63]/60
          focus:outline-none focus:ring-2 focus:ring-[#8D6E63]/20 focus:border-[#8D6E63]
          shadow-xs
          transition-all duration-200
          font-serif
        "
      />
    </div>
  );
}
