import type { Mood } from "../../types/mood";
import { motion } from "framer-motion";
import { useEditorStore } from "../../store/editorStore";

interface MoodSelectorProps {
  selectedMood?: Mood | null;
  onSelectMood?: (mood: Mood | null) => void;
}

const MoodIcon = ({
  mood,
  isSelected,
}: {
  mood: Mood;
  isSelected: boolean;
}) => {
  const strokeColor = isSelected ? "#3E2723" : "#8D6E63";
  const strokeWidth = isSelected ? 2.5 : 2;
  const fill = isSelected ? "#EFEBE9" : "transparent";
  const commonProps = {
    width: 40,
    height: 40,
    viewBox: "0 0 100 100",
    fill: fill,
    stroke: strokeColor,
    strokeWidth: strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "transition-all duration-300 ease-out",
  };

  const faces = {
    happy: (
      <svg {...commonProps}>
        <circle cx="50" cy="50" r="45" />
        <path d="M30 40 Q30 35 35 35" />
        <path d="M65 35 Q70 35 70 40" />
        <path d="M30 65 Q50 85 70 65" />
      </svg>
    ),
    calm: (
      <svg {...commonProps}>
        <circle cx="50" cy="50" r="45" />
        <path d="M25 45 Q35 35 45 45" />
        <path d="M55 45 Q65 35 75 45" />
        <line x1="35" y1="70" x2="65" y2="70" />
      </svg>
    ),
    thoughtful: (
      <svg {...commonProps}>
        <circle cx="50" cy="50" r="45" />
        <circle cx="35" cy="40" r="3" fill={strokeColor} stroke="none" />
        <circle cx="65" cy="40" r="3" fill={strokeColor} stroke="none" />
        <line x1="35" y1="70" x2="65" y2="65" />
      </svg>
    ),
    sad: (
      <svg {...commonProps}>
        <circle cx="50" cy="50" r="45" />
        <circle cx="35" cy="40" r="2" fill={strokeColor} stroke="none" />
        <circle cx="65" cy="40" r="2" fill={strokeColor} stroke="none" />
        <path d="M30 75 Q50 55 70 75" />
      </svg>
    ),
    stressed: (
      <svg {...commonProps}>
        <circle cx="50" cy="50" r="45" />
        <path d="M25 35 L35 45 L45 35" />
        <path d="M55 35 L65 45 L75 35" />
        <path d="M35 70 Q40 60 45 70 T55 70 T65 70" />
      </svg>
    ),
  };

  return faces[mood];
};

export function MoodSelector({
  selectedMood,
  onSelectMood,
}: MoodSelectorProps) {
  // Get state from store if not provided via props
  const storeMood = useEditorStore((state) => state.mood);
  const setStoreMood = useEditorStore((state) => state.setMood) as (
    mood: Mood | null
  ) => void;

  const moods: Mood[] = ["happy", "calm", "thoughtful", "sad", "stressed"];

  // Use props if provided, otherwise use store
  const currentMood = selectedMood !== undefined ? selectedMood : storeMood;
  const handleMoodSelect = onSelectMood || setStoreMood;

  const handleMoodClick = (mood: Mood) => {
    if (currentMood === mood) {
      // Deselect if clicking the same mood
      handleMoodSelect(null);
    } else {
      handleMoodSelect(mood);
    }
  };

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-4 sm:gap-6 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {moods.map((mood, index) => (
        <motion.button
          key={mood}
          onClick={() => handleMoodClick(mood)}
          className={`
            group flex flex-col items-center gap-2 p-2 rounded-full transition-all duration-300 cursor-pointer
            ${
              currentMood === mood
                ? "transform scale-110"
                : "hover:scale-105 opacity-70 hover:opacity-100"
            }
          `}
          aria-label={`Select ${mood} mood`}
          aria-pressed={currentMood === mood}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.05,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className={`
              rounded-full p-1 transition-all duration-300
              ${currentMood === mood ? "bg-[#8D6E63]/10 shadow-sm" : ""}
            `}
            animate={{
              rotate: currentMood === mood ? [0, 5, -5, 0] : 0,
            }}
            transition={{
              rotate: {
                duration: 0.5,
                times: [0, 0.25, 0.75, 1],
              },
            }}
          >
            <MoodIcon mood={mood} isSelected={currentMood === mood} />
          </motion.div>
          <motion.span
            className={`
              text-sm font-hand tracking-wide capitalize transition-colors
              ${
                currentMood === mood
                  ? "text-[#3E2723] font-bold"
                  : "text-[#8D6E63]"
              }
            `}
            animate={{
              y: currentMood === mood ? [0, -2, 0] : 0,
            }}
            transition={{
              y: {
                duration: 0.3,
                times: [0, 0.5, 1],
              },
            }}
          >
            {mood}
          </motion.span>
        </motion.button>
      ))}
    </motion.div>
  );
}
