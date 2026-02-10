import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function AuthPage() {
  const nav = useNavigate();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    if (!email.trim() || !password.trim()) {
      setErr("Заполни email и пароль.");
      return;
    }
    if (password.length < 6) {
      setErr("Пароль минимум 6 символов.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        // Если включено подтверждение email — вход будет после подтверждения
        setMsg("Регистрация успешна. Проверь почту для подтверждения (если включено).");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        setMsg("Вход выполнен ✅");
        nav("/"); // редирект на ленту/главную
      }
    } catch (e: any) {
      setErr(e?.message ?? "Ошибка авторизации");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5">
        <div className="text-lg font-semibold">
          {mode === "signin" ? "Login" : "Register"}
        </div>
        <div className="mt-1 text-sm text-neutral-400">
          Вход и регистрация через Supabase (Email + Password)
        </div>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
          <div className="grid gap-1">
            <label className="text-sm text-neutral-300">Email</label>
            <input
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm outline-none focus:border-neutral-600"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm text-neutral-300">Password</label>
            <input
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-3 py-2 text-sm outline-none focus:border-neutral-600"
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />
            <div className="text-xs text-neutral-500">Минимум 6 символов</div>
          </div>

          {err && (
            <div className="rounded-xl border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-200">
              {err}
            </div>
          )}
          {msg && (
            <div className="rounded-xl border border-emerald-900 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-200">
              {msg}
            </div>
          )}

          <button
            disabled={loading}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm hover:bg-neutral-800 disabled:opacity-60"
            type="submit"
          >
            {loading
              ? "Подожди..."
              : mode === "signin"
              ? "Sign in"
              : "Sign up"}
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-left text-sm text-neutral-400 hover:text-neutral-200"
          >
            {mode === "signin"
              ? "Нет аккаунта? Зарегистрироваться →"
              : "Уже есть аккаунт? Войти →"}
          </button>
        </form>
      </div>
    </div>
  );
}
