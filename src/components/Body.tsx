import React, { useEffect } from "react";
import { SearchBar } from "./SearchBar";
import Analytics from "./Analytics";
import JournalCards from "./JournalCards";
import { MoodTrends } from "./MoodTrends";
import { useEditorStore } from "../store/editorStore";
import JournalSkeleton from "./editor/JournalSkeleton";

const Body = () => {
  const { entries, fetchEntries, isLoading } = useEditorStore();

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="w-full py-10">
      {/* search */}
      <SearchBar />

      <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        {/* journals */}
        <div className="">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <JournalSkeleton key={i} />)
          ) : entries.length === 0 ? (
            <div className="text-center py-12 opacity-60">
              <p className="font-hand text-2xl text-[#8D6E63] -rotate-2">
                Your journal is waiting for its first story...
              </p>
            </div>
          ) : (
            entries.map((entry) => (
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
