export function MoodTrends() {
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
  return (
    <div className="bg-white p-6 rounded-2xl border border-line-color shadow-xs">
      <h3 className="text-xl font-bold text-[#3E2723] mb-4 font-serif">
        Mood Trends
      </h3>

      <div className="space-y-4">
        <div className="relative">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-[#5D4037]">
              {getMoodLabel("happy")}
            </span>
            <span className="text-[#8D6E63]">100%</span>
          </div>
          <div className="h-3 w-full bg-[#FAF7F0] rounded-full overflow-hidden border border-[#E0D6CC]">
            <div
              className="h-full rounded-full opacity-80"
              style={{
                width: `100%`,
                backgroundColor: getMoodColor("happy"),
                transition: "width 1s ease-in-out",
              }}
            />
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-[#8D6E63] mt-6 font-hand italic">
        "Feelings come and go like clouds in a windy sky..."
      </p>
    </div>
  );
}
