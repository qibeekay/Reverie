import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import { useEffect } from "react";
import { supabase } from "./lib/supabase";
import { useAuth } from "./store/authStore";
import { Toaster } from "sonner";

function App() {
  useEffect(() => {
    supabase.auth
      .getUser()
      .then(({ data }) => useAuth.getState().setUser(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_, session) =>
      useAuth.getState().setUser(session?.user ?? null)
    );
    return () => sub.subscription.unsubscribe();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboard" element={<Onboarding />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}

export default App;
