import React, { useEffect } from "react";
import { SearchBar } from "./SearchBar";
import Analytics from "./Analytics";
import JournalCards from "./JournalCards";
import { MoodTrends } from "./MoodTrends";
import { useEditorStore } from "../store/editorStore";
import JournalSkeleton from "./editor/JournalSkeleton";
import { CalendarView } from "./CalendarView";

const Body = () => {
  const {
    entries,
    fetchEntries,
    isLoading,
    searchQuery,
    setSearchQuery,
    viewMode,
  } = useEditorStore();

  useEffect(() => {
    fetchEntries();
  }, []);

  // Filter logic: match content, tags, or mood
  const filteredEntries = entries.filter((e) => {
    const query = searchQuery.toLowerCase();
    return (
      e.content.toLowerCase().includes(query) ||
      e.tags.some((t) => t.toLowerCase().includes(query)) ||
      (e.mood && e.mood.toLowerCase().includes(query))
    );
  });

  return (
    <div className="w-full py-10">
      {/* search */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        {/* journals */}
        <div className="">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <JournalSkeleton key={i} />)
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-12 opacity-60">
              <p className="font-hand text-2xl text-[#8D6E63] -rotate-2">
                {searchQuery
                  ? "No memories match your search..."
                  : "Your journal is waiting for its first story..."}
              </p>
            </div>
          ) : viewMode === "calendar" ? (
            <CalendarView />
          ) : (
            filteredEntries.map((entry) => (
              <JournalCards key={entry.id} entry={entry} />
            ))
          )}
        </div>

        {/* analytics and trends */}
        <div className="flex flex-col gap-y-6">
          <MoodTrends />

          <Analytics />
        </div>
      </div>
    </div>
  );
};

export default Body;
