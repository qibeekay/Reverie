import { supabase } from "../lib/supabase";

const fakeDomain = "@myjournal.com"; // never shown to user

export async function signUp(email: string, pin: string) {
  // 1. create auth user
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: pin,
  });
  if (error) throw error;
  if (!data.user) throw new Error("Sign-up failed – no user returned");

  // 2. insert profile **as that user** – RLS now passes
  const { error: profError } = await supabase
    .from("user_profile")
    .insert({ user_id: data.user.id, username: email, pin }); // use the id Supabase gave us
  if (profError) throw profError;

  return data.user;
}

export async function logIn(email: string, pin: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: pin,
  });
  if (error) throw error;
  // 2. supabase returned 200 but no session → invalid credentials
  if (!data.user) throw new Error("Invalid username or PIN");
  return data.user;
}

export async function logOut() {
  return supabase.auth.signOut();
}

// current user (null if not logged in)
export const getUser = () => supabase.auth.getUser();
