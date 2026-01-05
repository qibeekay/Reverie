import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { logIn, signUp } from "../api";
import { useAuth } from "../store/authStore";

const AuthModal = () => {
  const { showAuthModal, isLogin, closeAuth, signUp, logIn, loading, error } =
    useAuth();
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  /* close on Escape only when no error */
  useEffect(() => {
    if (!showAuthModal) return;
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !error) closeAuth();
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [showAuthModal, error, closeAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || pin.length < 6) return;
    try {
      isLogin ? await logIn(username, pin) : await signUp(username, pin);
      console.log(error);

      /* success -> close */
      closeAuth();
      console.log(error);
    } catch {}
  };

  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop – click closes only on success */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            onClick={() => !error && closeAuth()}
          />

          {/* card */}
          <motion.form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* close button – hidden while error */}
            {!error && (
              <button
                type="button"
                onClick={closeAuth}
                className="absolute top-3 right-3 text-[#8D6E63] hover:text-black"
              >
                <XIcon size={18} />
              </button>
            )}

            <h2 className="text-xl font-serif text-[#3E2723] mb-4">
              {isLogin ? "Welcome back" : "Create account"}
            </h2>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              type="email"
              placeholder="Username"
              className="w-full mb-3 px-3 py-2 border border-line-color rounded"
              required
            />

            {/* password field with eye toggle */}
            <div className="relative mb-4">
              <input
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                type={showPin ? "text" : "password"}
                inputMode="numeric"
                minLength={6}
                placeholder="6-digit or more PIN"
                className="w-full px-3 py-2 pr-10 border border-line-color rounded"
                required
              />
              <button
                type="button"
                onClick={() => setShowPin((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8D6E63] hover:text-black"
              >
                {showPin ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-coffee-light text-white py-2 rounded cursor-pointer disabled:opacity-70"
            >
              {loading ? "loading…" : isLogin ? "Log in" : "Sign up"}
            </button>

            <p className="text-center text-sm mt-3 text-[#8D6E63]">
              {isLogin ? "New here?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => useAuth.setState({ isLogin: !isLogin })}
                className="underline cursor-pointer"
              >
                {isLogin ? "Create one" : "Sign in"}
              </button>
            </p>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
