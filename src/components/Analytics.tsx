import React from "react";

const Analytics = () => {
  return (
    <div className="border border-line-color rounded-2xl p-6 shadow-xs">
      <h3 className="text-xl font-bold text-[#3E2723] mb-4 font-serif">
        Journal Stats
      </h3>

      <div className="flex flex-col gap-y-2 text-[#5D4037]">
        <p>
          Total Entries: <span className="font-bold">1</span>
        </p>
        <p>
          Words Written: <span className="font-bold">1</span>
        </p>
        <p>
          First Entry: <span className="font-bold">1-4-2026</span>
        </p>
      </div>
    </div>
  );
};

export default Analytics;
