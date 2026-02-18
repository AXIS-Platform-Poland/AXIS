import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // если у тебя экспорт называется иначе (например supabaseClient) — скажи
import { useAuth } from "../AuthContext"; // если у тебя хук называется иначе — скажи, я поправлю

type ProfileRow = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  updated_at?: string | null;
};

export default function ProfilePage() {
  const nav = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState<ProfileRow | null>(null);

  // form state
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const userId = user?.id || "";

  const displayName = useMemo(() => {
    const n = (profile?.full_name || "").trim();
    return n.length ? n : "Без имени";
  }, [profile?.full_name]);

  const displayBio = useMemo(() => {
    const b = (profile?.bio || "").trim();
    return b.length ? b : "Пока нет описания.";
  }, [profile?.bio]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!userId) return;
      setLoading(true);
      setMsg(null);

      const { data, error } = await supabase
        .from("public_profiles")
        .select("id, full_name, avatar_url, bio, updated_at")
        .eq("id", userId)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        setMsg(`Ошибка загрузки профиля: ${error.message}`);
        setProfile({
          id: userId,
          full_name: null,
          avatar_url: null,
          bio: null,
        });
      } else {
        const row: ProfileRow =
          data || { id: userId, full_name: null, avatar_url: null, bio: null };

        setProfile(row);
        setFullName(row.full_name || "");
        setAvatarUrl(row.avatar_url || "");
        setBio(row.bio || "");
      }

      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  async function saveProfile() {
    if (!userId) return;
    setSaving(true);
    setMsg(null);

    const payload: ProfileRow = {
      id: userId,
      full_name: fullName.trim() || null,
      avatar_url: avatarUrl.trim() || null,
      bio: bio.trim() || null,
    };

    const { error } = await supabase.from("public_profiles").upsert(payload, {
      onConflict: "id",
    });

    if (error) {
      setMsg(`Ошибка сохранения: ${error.message}`);
      setSaving(false);
      return;
    }

    // reload local
    setProfile((p) => ({
      ...(p || { id: userId, full_name: null, avatar_url: null, bio: null }),
      ...payload,
      updated_at: new Date().toISOString(),
    }));

    setSaving(false);
    setEditOpen(false);
    setMsg("Сохранено ✅");
    setTimeout(() => setMsg(null), 1500);
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setMsg("Скопировано ✅");
      setTimeout(() => setMsg(null), 1200);
    } catch {
      setMsg("Не удалось скопировать");
      setTimeout(() => setMsg(null), 1200);
    }
  }

  if (!userId) {
    return (
      <div style={pageWrap}>
        <div style={card}>
          <div style={title}>Профиль</div>
          <div style={muted}>Нужно войти в аккаунт.</div>
          <div style={{ marginTop: 12 }}>
            <button style={btnPrimary} onClick={() => nav("/auth")}>
              Вход / Регистрация
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrap}>
      {/* HEADER / COVER */}
      <div style={cover}>
        <div style={coverTopRow}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={avatarWrap}>
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="avatar"
                  style={avatarImg}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div style={avatarFallback}>👤</div>
              )}
            </div>

            <div>
              <div style={nameRow}>
                <div style={nameText}>{loading ? "Загрузка..." : displayName}</div>
              </div>

              <div style={idRow}>
                <span style={mutedSmall}>ID: </span>
                <span style={mono}>{userId}</span>
                <button style={miniBtn} onClick={() => copy(userId)}>
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button style={btnGhost} onClick={() => nav(-1)}>
              ← Назад
            </button>

            <button style={btnPrimary} onClick={() => setEditOpen(true)}>
              ✏️ Редактировать
            </button>
          </div>
        </div>

        <div style={bioBox}>{loading ? "..." : displayBio}</div>
      </div>

      {/* CONTENT GRID */}
      <div style={grid}>
        {/* LEFT: Preview cards */}
        <div style={{ display: "grid", gap: 12 }}>
          <div style={card}>
            <div style={cardTitle}>О себе</div>
            <div style={cardText}>{loading ? "..." : displayBio}</div>
          </div>

          <div style={card}>
            <div style={cardTitle}>Аватар</div>
            <div style={cardText}>
              {profile?.avatar_url ? (
                <>
                  <div style={mutedSmall}>Ссылка:</div>
                  <div style={monoWrap}>{profile.avatar_url}</div>
                  <button
                    style={{ ...miniBtn, marginTop: 10 }}
                    onClick={() => copy(profile.avatar_url || "")}
                  >
                    Copy link
                  </button>
                </>
              ) : (
                <div style={muted}>Аватар не задан.</div>
              )}
            </div>
          </div>

          <div style={card}>
            <div style={cardTitle}>Статус</div>
            <div style={cardText}>
              <div style={pillOk}>✅ Logged in</div>
              <div style={{ marginTop: 10 }}>
                <span style={mutedSmall}>Последнее обновление: </span>
                <span style={mono}>
                  {profile?.updated_at ? new Date(profile.updated_at).toLocaleString() : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: message + edit hint */}
        <div style={{ display: "grid", gap: 12 }}>
          {msg && <div style={toast}>{msg}</div>}

          <div style={card}>
            <div style={cardTitle}>Профиль (будет красиво)</div>
            <div style={muted}>
              Дальше добавим сюда:
              <ul style={{ margin: "8px 0 0 18px" }}>
                <li>посты пользователя</li>
                <li>счетчики (посты / друзья / лайки)</li>
                <li>кнопку “Поделиться профилем”</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editOpen && (
        <div style={modalOverlay} onClick={() => setEditOpen(false)}>
          <div style={modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <div style={modalTitle}>Редактировать профиль</div>
              <button style={btnGhost} onClick={() => setEditOpen(false)}>
                ✕
              </button>
            </div>

            <div style={form}>
              <label style={label}>
                Полное имя
                <input
                  style={input}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Например: Ihor Nepomiashchyi"
                />
              </label>

              <label style={label}>
                Ссылка на аватар
                <input
                  style={input}
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://..."
                />
              </label>

              <label style={label}>
                О себе
                <textarea
                  style={textarea}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Коротко о себе..."
                />
              </label>

              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button style={btnGhost} onClick={() => setEditOpen(false)}>
                  Отмена
                </button>
                <button style={btnPrimary} onClick={saveProfile} disabled={saving}>
                  {saving ? "Сохранение..." : "Сохранить"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== styles ===== */

const pageWrap: React.CSSProperties = {
  padding: 16,
  maxWidth: 1100,
  margin: "0 auto",
};

const cover: React.CSSProperties = {
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.10)",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
  boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
  padding: 14,
  marginBottom: 14,
};

const coverTopRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
};

const avatarWrap: React.CSSProperties = {
  width: 64,
  height: 64,
  borderRadius: 16,
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const avatarImg: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const avatarFallback: React.CSSProperties = {
  fontSize: 28,
  opacity: 0.9,
};

const nameRow: React.CSSProperties = { display: "flex", alignItems: "center", gap: 10 };
const nameText: React.CSSProperties = { fontSize: 20, fontWeight: 800, color: "white" };

const idRow: React.CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "center",
  marginTop: 6,
  flexWrap: "wrap",
};

const bioBox: React.CSSProperties = {
  marginTop: 12,
  padding: "10px 12px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(0,0,0,0.25)",
  color: "rgba(255,255,255,0.88)",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 14,
};

const card: React.CSSProperties = {
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.06)",
  padding: 14,
};

const title: React.CSSProperties = { fontSize: 18, fontWeight: 800, color: "white" };
const cardTitle: React.CSSProperties = { fontSize: 14, fontWeight: 800, color: "white" };
const cardText: React.CSSProperties = { marginTop: 8, color: "rgba(255,255,255,0.88)" };

const muted: React.CSSProperties = { color: "rgba(255,255,255,0.65)" };
const mutedSmall: React.CSSProperties = { color: "rgba(255,255,255,0.65)", fontSize: 12 };

const mono: React.CSSProperties = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: 12,
  color: "rgba(255,255,255,0.85)",
};

const monoWrap: React.CSSProperties = {
  ...mono,
  marginTop: 6,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(0,0,0,0.25)",
  wordBreak: "break-all",
};

const miniBtn: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  cursor: "pointer",
  fontSize: 12,
};

const btnPrimary: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.12)",
  color: "white",
  cursor: "pointer",
  fontWeight: 700,
};

const btnGhost: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "transparent",
  color: "white",
  cursor: "pointer",
};

const pillOk: React.CSSProperties = {
  display: "inline-flex",
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(0,0,0,0.25)",
};

const toast: React.CSSProperties = {
  ...card,
  border: "1px solid rgba(120,255,200,0.25)",
};

const modalOverlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 14,
  zIndex: 200,
};

const modalCard: React.CSSProperties = {
  width: "min(720px, 100%)",
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(20,20,20,0.96)",
  boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
  padding: 14,
};

const modalHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
};

const modalTitle: React.CSSProperties = { fontSize: 16, fontWeight: 800, color: "white" };

const form: React.CSSProperties = { display: "grid", gap: 12, marginTop: 12 };

const label: React.CSSProperties = {
  display: "grid",
  gap: 6,
  color: "rgba(255,255,255,0.85)",
  fontSize: 13,
  fontWeight: 700,
};

const input: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  outline: "none",
};

const textarea: React.CSSProperties = {
  ...input,
  minHeight: 110,
  resize: "vertical",
};
