import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { logIn, logOut, signUp } from "../api";
import { toast } from "sonner";

interface AuthState {
  // UI
  showAuthModal: boolean;
  isLogin: boolean;
  // data
  user: User | null;
  loading: boolean;
  error: boolean;
  // actions
  openAuth: (login?: boolean) => void;
  closeAuth: () => void;
  setUser: (u: User | null) => void;
  signUp: (u: string, p: string) => Promise<void>;
  logIn: (u: string, p: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  showAuthModal: false,
  isLogin: true,
  user: null,
  loading: false,
  error: false,

  openAuth: (login = true) => set({ showAuthModal: true, isLogin: login }),
  closeAuth: () => set({ showAuthModal: false }),
  setUser: (user) => set({ user }),

  signUp: async (username, pin) => {
    set({ loading: true, error: false });
    try {
      const user = await signUp(username, pin);
      set({ user, loading: false, error: false });
      toast.success("Account created!");
    } catch (e: any) {
      set({ error: true, loading: false });
      toast.error(e.message || "Sign-up failed");
      throw e;
    }
  },

  logIn: async (username, pin) => {
    set({ loading: true });
    try {
      const user = await logIn(username, pin);
      set({ user, loading: false, error: false });
      toast.success("Welcome back!");
    } catch (e: any) {
      set({ error: true, loading: false });
      toast.error(e.message || "Login failed");
      throw e;
    }
  },

  logOut: async () => {
    await logOut();
    set({ user: null });
  },
}));
