import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const { user, loading, signUpWithEmail, signInWithEmail } = useAuth();
  const nav = useNavigate();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // ✅ Если уже авторизован — сразу в аккаунт (например /settings или /)
  useEffect(() => {
    if (!loading && user) {
      nav("/settings");
    }
  }, [loading, user, nav]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    setBusy(true);

    try {
      if (mode === "signup") {
        const res = await signUpWithEmail(email.trim(), password);
        if (res.needsEmailConfirm) {
          setMsg("Письмо отправлено. Открой почту и подтвердите регистрацию (Confirm email).");
        } else {
          // если confirmations выключены — сразу войдёшь и редирект сработает
          setMsg("Готово! Вы вошли в аккаунт.");
        }
      } else {
        await signInWithEmail(email.trim(), password);
        setMsg("Вход выполнен.");
      }
    } catch (e: any) {
      setErr(e?.message ?? "Ошибка");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>{mode === "login" ? "Вход" : "Регистрация"}</h2>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
        <label>
          <div style={{ marginBottom: 4 }}>Email</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            style={{ width: "100%", padding: 10 }}
          />
        </label>

        <label>
          <div style={{ marginBottom: 4 }}>Пароль</div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            minLength={6}
            style={{ width: "100%", padding: 10 }}
          />
        </label>

        <button disabled={busy} style={{ padding: 10 }}>
          {busy ? "..." : mode === "login" ? "Войти" : "Создать аккаунт"}
        </button>

        <button
          type="button"
          onClick={() => {
            setErr(null);
            setMsg(null);
            setMode(mode === "login" ? "signup" : "login");
          }}
          style={{ padding: 10, opacity: 0.9 }}
        >
          {mode === "login" ? "Нет аккаунта? Регистрация" : "Уже есть аккаунт? Войти"}
        </button>

        {err && <div style={{ color: "crimson" }}>{err}</div>}
        {msg && <div style={{ color: "green" }}>{msg}</div>}
      </form>
    </div>
  );
}
