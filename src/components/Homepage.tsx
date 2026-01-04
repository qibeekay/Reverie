import { PlusIcon } from "lucide-react";
import Header from "./Header";
import Body from "./Body";
import EditorPage from "./editor/EditorPage";
import { motion, AnimatePresence } from "framer-motion";
import { useEditorStore } from "../store/editorStore";

const Homepage = () => {
  const { isEditorOpen, openEditor } = useEditorStore();

  return (
    <div className="max-w-6xl mx-auto px-4 min-h-screen">
      {/* Add Button - Shows when editor is closed */}
      <AnimatePresence>
        {!isEditorOpen && (
          <motion.button
            onClick={openEditor}
            className="flex items-center justify-center w-20 aspect-square rounded-full fixed right-4 xl:right-40 bottom-10 bg-[#3E2723] text-white cursor-pointer z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <PlusIcon size={30} />
          </motion.button>
        )}
      </AnimatePresence>

      <Header />

      {/* Show Body or EditorPage based on state */}
      <AnimatePresence mode="wait">
        {!isEditorOpen ? (
          <motion.div
            key="body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Body />
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <EditorPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Homepage;
