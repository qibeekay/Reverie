const JournalSkeleton = () => (
  <div className="bg-[#FAF7F0]/50 p-6 border border-line-color rounded-2xl animate-pulse mb-4">
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <div className="h-5 w-32 bg-[#D7CCC8] rounded" />
        <div className="h-4 w-24 bg-[#D7CCC8]/60 rounded" />
      </div>
      <div className="h-8 w-8 bg-[#D7CCC8] rounded-full" />
    </div>
    <div className="mt-6 space-y-2">
      <div className="h-4 w-full bg-[#D7CCC8]/40 rounded" />
      <div className="h-4 w-5/6 bg-[#D7CCC8]/40 rounded" />
    </div>
  </div>
);

export default JournalSkeleton;
