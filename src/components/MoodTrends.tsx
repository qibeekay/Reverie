import { useEditorStore } from "../store/editorStore";
import type { Mood } from "../types/mood";

export function MoodTrends() {
  const { entries } = useEditorStore();
  const moods: Mood[] = ["happy", "calm", "thoughtful", "sad", "stressed"];
  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "happy":
        return "#FFD54F";
      case "calm":
        return "#81C784";
      case "thoughtful":
        return "#90CAF9";
      case "sad":
        return "#9FA8DA";
      case "stressed":
        return "#EF9A9A";
      default:
        return "#E0E0E0";
    }
  };

  const getMoodLabel = (mood: string) => {
    switch (mood) {
      case "happy":
        return "😊 Happy";
      case "calm":
        return "😌 Calm";
      case "thoughtful":
        return "🤔 Thoughtful";
      case "sad":
        return "😢 Sad";
      case "stressed":
        return "😫 Stressed";
      default:
        return mood;
    }
  };

  const getMoodStats = (mood: string) => {
    if (entries.length === 0) return 0;
    const count = entries.filter((e) => e.mood === mood).length;
    return Math.round((count / entries.length) * 100);
  };
  return (
    <div className="bg-white p-6 rounded-2xl border border-line-color shadow-xs">
      <h3 className="text-xl font-bold text-[#3E2723] mb-4 font-serif">
        Mood Trends
      </h3>
      <div className="space-y-4">
        {moods.map((mood) => {
          const percentage = getMoodStats(mood);
          return (
            <div key={mood}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-[#5D4037] capitalize">
                  {mood}
                </span>
                <span className="text-[#8D6E63]">{percentage}%</span>
              </div>
              <div className="h-2 w-full bg-[#FAF7F0] rounded-full border border-[#E0D6CC]">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: getMoodColor(mood), // use your existing color helper
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
