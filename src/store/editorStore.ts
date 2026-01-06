import { create } from "zustand";
import type { Mood } from "../types/mood";
import { journalApi, type JournalEntry } from "../api/journal";
import { supabase } from "../lib/supabase";

interface EditorState {
  isEditorOpen: boolean;
  photoUrl: string | undefined;
  isImageTaped: boolean;
  tags: string[];
  mood: Mood | null; // Updated type
  content: string;
  entries: JournalEntry[];
  editingId: string | null;
  photoFile: File | null;
  isLoading: boolean;
  searchQuery: string;
  viewMode: "list" | "calendar";

  // Actions
  openEditor: () => void;
  closeEditor: () => void;
  toggleEditor: () => void;
  setPhotoUrl: (url: string | undefined) => void;
  setIsImageTaped: (taped: boolean) => void;
  setTags: (tags: string[]) => void;
  setMood: (mood: Mood | null) => void; // Updated type
  setContent: (content: string) => void;
  clearAll: () => void;
  setEntryToEdit: (entry: any) => void;
  saveJournal: () => Promise<void>;
  setPhoto: (file: File | null) => void;
  fetchEntries: () => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  setSearchQuery: (q: string) => void;
  setViewMode: (mode: "list" | "calendar") => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  entries: [],
  isLoading: false,
  editingId: null,
  isEditorOpen: false,
  photoFile: null,
  photoUrl: undefined,
  isImageTaped: false,
  tags: [],
  mood: null,
  content: "",
  searchQuery: "",
  viewMode: "list",

  openEditor: () => set({ isEditorOpen: true }),
  closeEditor: () => set({ isEditorOpen: false }),
  toggleEditor: () => set((state) => ({ isEditorOpen: !state.isEditorOpen })),
  setPhotoUrl: (photoUrl) => set({ photoUrl }),
  setIsImageTaped: (isImageTaped) => set({ isImageTaped }),
  setTags: (tags) => set({ tags }),
  setMood: (mood) => set({ mood }),
  setContent: (content) => set({ content }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setViewMode: (viewMode) => set({ viewMode }),
  setPhoto: (file) => {
    if (!file) {
      set({ photoFile: null, photoUrl: undefined });
      return;
    }
    // Create a local temporary URL for instant UI preview
    const previewUrl = URL.createObjectURL(file);
    set({ photoFile: file, photoUrl: previewUrl });
  },

  setEntryToEdit: (entry) =>
    set({
      editingId: entry.id,
      content: entry.content,
      mood: entry.mood,
      tags: entry.tags,
      photoUrl: entry.photo_url,
      isImageTaped: !!entry.photo_url,
      isEditorOpen: true,
    }),

  fetchEntries: async () => {
    set({ isLoading: true }); // Start loading
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) set({ entries: data });
    set({ isLoading: false }); // End loading
  },

  deleteEntry: async (id) => {
    const { error } = await supabase
      .from("journal_entries")
      .delete()
      .eq("id", id);

    if (!error) {
      // Option: Filter local state immediately for a snappy UI
      set((state) => ({
        entries: state.entries.filter((e) => e.id !== id),
      }));
    }
  },

  saveJournal: async () => {
    const { editingId, content, mood, tags, photoFile, photoUrl } = get();
    let finalPhotoUrl = photoUrl;

    // 1. If there is a new file, upload it first
    if (photoFile) {
      finalPhotoUrl = await journalApi.uploadImage(photoFile);
    }

    // 2. Save the database record with the permanent URL
    await journalApi.saveEntry({
      id: editingId || undefined,
      content,
      mood,
      tags,
      photo_url: finalPhotoUrl,
    });

    get().clearAll();
    get().closeEditor();
  },

  clearAll: () => {
    // Clean up temporary object URLs to prevent memory leaks
    const url = get().photoUrl;
    if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
    set({
      editingId: null,
      content: "",
      mood: null,
      tags: [],
      photoUrl: undefined,
      isImageTaped: false,
    });
  },
}));
