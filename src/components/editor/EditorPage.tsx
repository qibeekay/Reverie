import { ArrowLeft, ImagePlusIcon, Save, XIcon, Sparkles } from "lucide-react";
import React, { useRef, useState } from "react";
import TagInput from "./TagInput";
import { MoodSelector } from "./MoodIcon";
import { EntryEditor } from "./EntryEditor";
import { AnimatePresence, motion } from "framer-motion";
import { useEditorStore } from "../../store/editorStore";
import { toast } from "sonner";

const EditorPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { saveJournal, editingId } = useEditorStore();
  const [isSaving, setIsSaving] = useState(false);

  // Get state and actions from store
  const {
    photoUrl,
    isImageTaped,
    closeEditor,
    setPhotoUrl,
    setIsImageTaped,
    setPhoto,
    clearAll,
  } = useEditorStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simply pass the file to the store
      setPhoto(file);
      setIsImageTaped(true);
    }
  };

  const handleClearPhoto = () => {
    setPhotoUrl(undefined);
    setIsImageTaped(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBack = () => {
    closeEditor();
    clearAll(); // Clear editor state when closing
  };

  const handleSave = async () => {
    if (isSaving) return; // Prevent multiple clicks

    try {
      setIsSaving(true); // 3. Start loading
      await saveJournal();
      toast.success(editingId ? "Entry updated!" : "Entry sealed and saved!");
    } catch (e) {
      toast.error("Failed to save entry");
    } finally {
      setIsSaving(false); // 4. Stop loading
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="py-10"
    >
      {/* Editor header */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="flex items-center justify-between border border-line-color shadow-xs px-4 py-2  rounded-md bg-white"
      >
        <motion.button
          onClick={handleBack}
          className="flex items-center gap-1 cursor-pointer"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <p className="text-lg font-hand">Back</p>
        </motion.button>

        {/* save button */}
        <motion.button
          onClick={handleSave}
          className="flex items-center gap-1 text-white px-4 py-2 bg-coffee-light cursor-pointer rounded-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Save size={20} />
          <p className="text-lg">{isSaving ? "Sealing..." : "Seal and Save"}</p>
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-10 relative"
      >
        {/* text editor */}
        <motion.div
          className="bg-white shadow-2xl rounded-sm overflow-hidden relative min-h-150"
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="h-4 bg-[#EFEBE9] border-b border-[#D7CCC8]"></div>

          <div className="p-4 md:p-8 bg-[#FAF7F0] h-full">
            <div className="mb-6 text-center">
              <span className="text-[#8D6E63] font-hand text-lg mb-2 block">
                How are you feeling today?
              </span>
              <MoodSelector />
            </div>

            <div className="relative">
              {/* Taped image overlay */}
              <AnimatePresence>
                {photoUrl && isImageTaped && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 2 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    whileHover={{ rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="absolute top-4 right-4 z-10"
                  >
                    <div className="relative">
                      <div className="bg-white p-3 pb-6 shadow-md border border-[#E0D6CC] max-w-50">
                        <img
                          src={photoUrl}
                          alt="Memory"
                          className="w-full h-auto max-h-37.5 object-cover filter sepia-[0.2]"
                        />
                        <motion.button
                          onClick={handleClearPhoto}
                          className="
                            absolute -top-2 -right-2 
                            bg-[#3E2723] text-white 
                            rounded-full p-1 
                            shadow-md
                          "
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <XIcon size={14} />
                        </motion.button>
                      </div>
                      {/* Tape effect */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-[#E0E0E0]/80 -rotate-2 shadow-sm backdrop-blur-sm"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <TagInput />
            </div>

            {/* Action buttons before editor */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex md:hidden gap-2 mb-4 relative"
            >
              <motion.button
                onClick={() => fileInputRef.current?.click()}
                className="
                  flex items-center gap-2 
                  px-4 py-2 
                  border border-[#E0D6CC] rounded-md
                  hover:bg-[#8D6E63]/5 hover:border-[#8D6E63]
                  transition-all duration-300
                  cursor-pointer
                  bg-white
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ImagePlusIcon size={18} className="text-[#8D6E63]" />
                <span className="text-[#8D6E63] font-hand">Add Image</span>
              </motion.button>

              <motion.button
                className="
                  flex items-center gap-2 
                  px-4 py-2 
                  border border-[#E0D6CC] rounded-md
                  hover:bg-[#8D6E63]/5 hover:border-[#8D6E63]
                  transition-all duration-300
                  cursor-pointer
                  bg-white
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={18} className="text-[#8D6E63]" />
                <span className="text-[#8D6E63] font-hand">
                  Generate Prompt
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative rounded-sm overflow-hidden border border-[#E0D6CC]/50 mb-6"
            >
              <EntryEditor />
            </motion.div>
          </div>
        </motion.div>

        {/* tools */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:block"
        >
          <div className="border border-[#E0D6CC] rounded-sm p-4 bg-white">
            <h3 className="text-[#8D6E63] font-hand text-lg mb-2">Tools</h3>
            <div className="space-y-4">
              <motion.button
                onClick={() => fileInputRef.current?.click()}
                className="
                  w-full flex items-center justify-center gap-2 
                  px-4 py-3 
                  border border-[#E0D6CC] rounded-md
                  hover:bg-[#8D6E63]/5 hover:border-[#8D6E63]
                  transition-all duration-300
                  cursor-pointer
                  bg-white
                "
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <ImagePlusIcon size={20} className="text-[#8D6E63]" />
                <span className="text-[#8D6E63]">Add Photo</span>
              </motion.button>

              <motion.button
                className="
                  w-full flex items-center justify-center gap-2 
                  px-4 py-3 
                  border border-[#E0D6CC] rounded-md
                  hover:bg-[#8D6E63]/5 hover:border-[#8D6E63]
                  transition-all duration-300
                  cursor-pointer
                  bg-white
                "
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles size={20} className="text-[#8D6E63]" />
                <span className="text-[#8D6E63]">Generate Journal Prompt</span>
              </motion.button>
            </div>
          </div>

          {/* hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EditorPage;
