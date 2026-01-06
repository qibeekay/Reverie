import React, { useState } from "react";
import { useEditorStore } from "../store/editorStore";

export function CalendarView() {
  const { entries, setEntryToEdit } = useEditorStore();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
  };

  const days = getDaysInMonth(currentMonth);
  const firstDayOffset = days[0].getDay();

  const getEntryForDate = (date: Date) => {
    return entries.find((e) => {
      const entryDate = new Date(e.created_at!); // Use created_at from Supabase
      return (
        entryDate.getDate() === date.getDate() &&
        entryDate.getMonth() === date.getMonth() &&
        entryDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const moodEmojis: Record<string, string> = {
    happy: "😊",
    calm: "😌",
    thoughtful: "🤔",
    sad: "😢",
    stressed: "😫",
  };

  return (
    <div className="bg-[#FAF7F0] p-6 rounded-2xl border border-line-color shadow-sm relative overflow-hidden">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() - 1,
                1
              )
            )
          }
          className="text-[#8D6E63] hover:text-[#3E2723] p-2 transition-colors"
        >
          &larr;
        </button>
        <h2 className="text-xl font-bold text-[#3E2723] font-serif">
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() + 1,
                1
              )
            )
          }
          className="text-[#8D6E63] hover:text-[#3E2723] p-2 transition-colors"
        >
          &rarr;
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-center text-[#8D6E63] font-hand text-sm font-bold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 relative z-10">
        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square"></div>
        ))}

        {days.map((date) => {
          const entry = getEntryForDate(date);
          const isToday = date.toDateString() === today.toDateString();

          return (
            <div
              key={date.toISOString()}
              onClick={() => entry && setEntryToEdit(entry)}
              className={`aspect-square p-1 relative transition-all duration-300 rounded-xl
                ${entry ? "cursor-pointer hover:scale-105 bg-[#3E2723]/5" : ""}
                ${isToday ? "ring-1 ring-[#3E2723]" : ""}
              `}
            >
              <div className="w-full h-full flex flex-col items-center justify-center">
                <span
                  className={`text-sm font-serif ${
                    entry ? "font-bold text-[#3E2723]" : "text-[#8D6E63]/40"
                  }`}
                >
                  {date.getDate()}
                </span>
                {entry?.mood && (
                  <span className="text-xs mt-0.5">
                    {moodEmojis[entry.mood]}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
