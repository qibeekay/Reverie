import { create } from "zustand";
import type { Mood } from "../types/mood";

interface EditorState {
  isEditorOpen: boolean;
  photoUrl: string | undefined;
  isImageTaped: boolean;
  tags: string[];
  mood: Mood | null; // Updated type
  content: string;
  title: string;

  // Actions
  openEditor: () => void;
  closeEditor: () => void;
  toggleEditor: () => void;
  setPhotoUrl: (url: string | undefined) => void;
  setIsImageTaped: (taped: boolean) => void;
  setTags: (tags: string[]) => void;
  setMood: (mood: Mood | null) => void; // Updated type
  setContent: (content: string) => void;
  setTitle: (title: string) => void;
  clearAll: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  isEditorOpen: false,
  photoUrl: undefined,
  isImageTaped: false,
  tags: [],
  mood: null,
  content: "",
  title: "",

  openEditor: () => set({ isEditorOpen: true }),
  closeEditor: () => set({ isEditorOpen: false }),
  toggleEditor: () => set((state) => ({ isEditorOpen: !state.isEditorOpen })),
  setPhotoUrl: (photoUrl) => set({ photoUrl }),
  setIsImageTaped: (isImageTaped) => set({ isImageTaped }),
  setTags: (tags) => set({ tags }),
  setMood: (mood) => set({ mood }),
  setContent: (content) => set({ content }),
  setTitle: (title) => set({ title }),
  clearAll: () =>
    set({
      photoUrl: undefined,
      isImageTaped: false,
      tags: [],
      mood: null,
      content: "",
      title: "",
    }),
}));
