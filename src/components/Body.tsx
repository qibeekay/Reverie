import React from "react";
import { SearchBar } from "./SearchBar";
import Analytics from "./Analytics";
import JournalCards from "./JournalCards";
import { MoodTrends } from "./MoodTrends";

const Body = () => {
  return (
    <div className="w-full py-10">
      {/* search */}
      <SearchBar />

      <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        {/* journals */}
        <div className="">
          <JournalCards />
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
