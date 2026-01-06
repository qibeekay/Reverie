import { supabase } from "../lib/supabase";
import type { Mood } from "../types/mood";

export interface JournalEntry {
  id?: string;
  content: string;
  mood: Mood | null;
  tags: string[];
  photo_url?: string;
  user_id?: string;
  created_at?: string;
}

export const journalApi = {
  async uploadImage(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from("journal-photos")
      .upload(filePath, file);

    if (error) throw error;

    // Get the Public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("journal-photos").getPublicUrl(data.path);

    return publicUrl;
  },
  async saveEntry(entry: JournalEntry) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    // If we have an ID, we are updating
    if (entry.id) {
      const { data, error } = await supabase
        .from("journal_entries")
        .update({
          content: entry.content,
          mood: entry.mood,
          tags: entry.tags,
          photo_url: entry.photo_url,
          updated_at: new Date(),
        })
        .eq("id", entry.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }

    // If no ID, we are inserting.
    // DO NOT include the 'id' key at all in the object.
    else {
      const { data, error } = await supabase
        .from("journal_entries")
        .insert([
          {
            user_id: user.id,
            content: entry.content,
            mood: entry.mood,
            tags: entry.tags,
            photo_url: entry.photo_url,
            // created_at and id will be handled by Postgres defaults
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },
};
