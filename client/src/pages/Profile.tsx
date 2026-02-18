import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../AuthContext";

type ProfileRow = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  updated_at?: string | null;
};

type PostRow = {
  id: string;
  user_id: string;
  content: string | null;
  created_at: string;
  likes_count?: number | null;
  comments_count?: number | null;
};

// 1) Bucket для аватаров в Supabase Storage (создадим ниже в инструкции)
const AVATAR_BUCKET = "avatars";

export default function ProfilePage() {
  const nav = useNavigate();
  const { user } = useAuth();
  const userId = user?.id || "";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState<ProfileRow | null>(null);

  // form
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // posts/stats
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [postsCount, setPostsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  // file upload
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // auto-detect profile table
  const profileTableRef = useRef<string | null>(null);

  const displayName = useMemo(() => {
    const n = (profile?.full_name || "").trim();
    return n.length ? n : "Без имени";
  }, [profile?.full_name]);

  const displayBio = useMemo(() => {
    const b = (profile?.bio || "").trim();
    return b.length ? b : "Пока нет описания.";
  }, [profile?.bio]);

  function setToast(text: string, ms = 1400) {
    setMsg(text);
    window.setTimeout(() => setMsg(null), ms);
  }

  async function resolveProfileTable(): Promise<string> {
    if (profileTableRef.current) return profileTableRef.current;

    // пробуем public_profiles
    {
      const r = await supabase.from("public_profiles").select("id", { head: true }).limit(1);
      if (!r.error) {
        profileTableRef.current = "public_profiles";
        return "public_profiles";
      }
    }

    // пробуем profiles
    {
      const r = await supabase.from("profiles").select("id", { head: true }).limit(1);
      if (!r.error) {
        profileTableRef.current = "profiles";
        return "profiles";
      }
    }

    // если обе не найдены — покажем нормальную ошибку
    throw new Error(
      "Не найдена таблица профилей. Создай в Supabase таблицу public_profiles или profiles (id, full_name, avatar_url, bio)."
    );
  }

  async function loadProfileAndPosts() {
    if (!userId) return;
    setLoading(true);
    setMsg(null);

    try {
      const table = await resolveProfileTable();

      // PROFILE
      const p = await supabase
        .from(table)
        .select("id, full_name, avatar_url, bio, updated_at")
        .eq("id", userId)
        .maybeSingle();

      if (p.error) throw new Error(p.error.message);

      const row: ProfileRow = p.data || {
        id: userId,
        full_name: null,
        avatar_url: null,
        bio: null,
      };

      setProfile(row);
      setFullName(row.full_name || "");
      setAvatarUrl(row.avatar_url || "");
      setBio(row.bio || "");

      // POSTS latest 10
      const postsRes = await supabase
        .from("freed_posts")
        .select("id, user_id, content, created_at, likes_count, comments_count")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);

      if (!postsRes.error && Array.isArray(postsRes.data)) {
        setPosts(postsRes.data as PostRow[]);
        const likes = (postsRes.data as any[]).reduce(
          (acc, x) => acc + (Number(x.likes_count) || 0),
          0
        );
        const comm = (postsRes.data as any[]).reduce(
          (acc, x) => acc + (Number(x.comments_count) || 0),
          0
        );
        setLikesCount(likes);
        setCommentsCount(comm);
      }

      // total count exact
      const countRes = await supabase
        .from("freed_posts")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId);

      if (!countRes.error && typeof countRes.count === "number") {
        setPostsCount(countRes.count);
      } else {
        setPostsCount(postsRes.data?.length || 0);
      }
    } catch (e: any) {
      setToast(`Ошибка загрузки: ${e?.message || String(e)}`, 3500);
      setProfile({ id: userId, full_name: null, avatar_url: null, bio: null });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfileAndPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function uploadAvatarIfNeeded(): Promise<string | null> {
    if (!avatarFile) return null;

    setUploading(true);
    try {
      const ext = avatarFile.name.split(".").pop()?.toLowerCase() || "jpg";
      const filePath = `${userId}/${Date.now()}.${ext}`;

      const up = await supabase.storage.from(AVATAR_BUCKET).upload(filePath, avatarFile, {
        upsert: true,
        contentType: avatarFile.type || "image/jpeg",
      });

      if (up.error) throw new Error(up.error.message);

      const pub = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(filePath);
      const url = pub.data.publicUrl;

      if (!url) throw new Error("Не удалось получить public URL аватара");

      // сразу обновим поле
      setAvatarUrl(url);
      setAvatarFile(null);

      return url;
    } finally {
      setUploading(false);
    }
  }

  async function saveProfile() {
    if (!userId) return;
    setSaving(true);
    setMsg(null);

    try {
      const table = await resolveProfileTable();

      // 1) если выбрано фото — сначала загрузим и возьмём url
      let finalAvatar = avatarUrl.trim() || null;
      const uploadedUrl = await uploadAvatarIfNeeded();
      if (uploadedUrl) finalAvatar = uploadedUrl;

      const payload: ProfileRow = {
        id: userId,
        full_name: fullName.trim() || null,
        avatar_url: finalAvatar,
        bio: bio.trim() || null,
      };

      const { error } = await supabase.from(table).upsert(payload, { onConflict: "id" });
      if (error) throw new Error(error.message);

      setProfile((p) => ({
        ...(p || { id: userId, full_name: null, avatar_url: null, bio: null }),
        ...payload,
        updated_at: new Date().toISOString(),
      }));

      setEditOpen(false);
      setToast("Сохранено ✅");
    } catch (e: any) {
      setToast(`Ошибка сохранения: ${e?.message || String(e)}`, 4500);
    } finally {
      setSaving(false);
    }
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setToast("Скопировано ✅", 1100);
    } catch {
      setToast("Не удалось скопировать", 1200);
    }
  }

  function shareProfile() {
    copy(window.location.href);
  }

  function timeAgo(iso: string) {
    const d = new Date(iso).getTime();
    const diff = Date.now() - d;
    const m = Math.floor(diff / 60000);
    if (m < 1) return "только что";
    if (m < 60) return `${m} мин назад`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h} ч назад`;
    const days = Math.floor(h / 24);
    return `${days} дн назад`;
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
      <div style={cover}>
        <div style={coverTopRow}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
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
              <div style={nameText}>{loading ? "Загрузка..." : displayName}</div>

              <div style={idRow}>
                <span style={mutedSmall}>ID:</span>
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
            <button style={btnGhost} onClick={shareProfile}>
              🔗 Поделиться
            </button>
            <button style={btnPrimary} onClick={() => setEditOpen(true)}>
              ✏️ Редактировать
            </button>
          </div>
        </div>

        <div style={bioBox}>{loading ? "..." : displayBio}</div>

        <div style={statsRow}>
          <div style={statCard}>
            <div style={statNum}>{postsCount}</div>
            <div style={statLbl}>Посты</div>
          </div>
          <div style={statCard}>
            <div style={statNum}>{likesCount}</div>
            <div style={statLbl}>Лайки</div>
          </div>
          <div style={statCard}>
            <div style={statNum}>{commentsCount}</div>
            <div style={statLbl}>Комментарии</div>
          </div>

          <div style={{ marginLeft: "auto" }}>{msg && <div style={toastSmall}>{msg}</div>}</div>
        </div>
      </div>

      <div style={grid}>
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
                  <button style={{ ...miniBtn, marginTop: 10 }} onClick={() => copy(profile.avatar_url || "")}>
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

        <div style={{ display: "grid", gap: 12 }}>
          <div style={card}>
            <div style={cardTitle}>Посты пользователя</div>

            {loading ? (
              <div style={muted}>Загрузка...</div>
            ) : posts.length === 0 ? (
              <div style={muted}>Пока нет постов. Создай первый пост на странице “Посты”.</div>
            ) : (
              <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                {posts.map((p) => (
                  <div key={p.id} style={postCard}>
                    <div style={postHead}>
                      <div style={postId}>{p.id.slice(0, 8)}…</div>
                      <div style={postTime}>{timeAgo(p.created_at)}</div>
                    </div>

                    <div style={postBody}>
                      {(p.content || "").trim().length ? p.content : <span style={muted}>—</span>}
                    </div>

                    <div style={postFoot}>
                      <span style={chip}>❤️ {Number(p.likes_count) || 0}</span>
                      <span style={chip}>💬 {Number(p.comments_count) || 0}</span>
                      <button style={{ ...miniBtn, marginLeft: "auto" }} onClick={() => copy(p.id)}>
                        Copy post id
                      </button>
                    </div>
                  </div>
                ))}

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button style={btnGhost} onClick={() => nav("/posts")}>
                    Перейти в ленту →
                  </button>
                </div>
              </div>
            )}
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

              {/* ✅ ВОТ ТУТ загрузка с галереи */}
              <label style={label}>
                Фото профиля (с галереи)
                <input
                  style={input}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                />
                <div style={mutedSmall}>
                  {avatarFile ? `Выбрано: ${avatarFile.name}` : "Файл не выбран"}
                </div>
              </label>

              {/* Оставим и поле ссылки — если захочешь вставить URL */}
              <label style={label}>
                Или ссылка на аватар (не обязательно)
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
                <button style={btnPrimary} onClick={saveProfile} disabled={saving || uploading}>
                  {uploading ? "Загрузка фото..." : saving ? "Сохранение..." : "Сохранить"}
                </button>
              </div>

              <div style={mutedSmall}>
                * Если появится ошибка про bucket/политику — см. инструкцию ниже (2 минуты).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== styles ===== */

const pageWrap: React.CSSProperties = { padding: 16, maxWidth: 1200, margin: "0 auto" };

const cover: React.CSSProperties = {
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
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

const avatarImg: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };
const avatarFallback: React.CSSProperties = { fontSize: 28, opacity: 0.9 };

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

const statsRow: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  marginTop: 12,
  flexWrap: "wrap",
};

const statCard: React.CSSProperties = {
  minWidth: 110,
  padding: "10px 12px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.06)",
  display: "grid",
  gap: 2,
};

const statNum: React.CSSProperties = { fontSize: 18, fontWeight: 900, color: "white" };
const statLbl: React.CSSProperties = { fontSize: 12, color: "rgba(255,255,255,0.70)" };

const grid: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 14 };

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

const toastSmall: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 12,
  border: "1px solid rgba(120,255,200,0.25)",
  background: "rgba(0,0,0,0.22)",
  color: "white",
  fontSize: 12,
};

const postCard: React.CSSProperties = {
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.22)",
  padding: 12,
};

const postHead: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 };
const postId: React.CSSProperties = { ...mono, opacity: 0.95 };
const postTime: React.CSSProperties = { fontSize: 12, color: "rgba(255,255,255,0.60)" };

const postBody: React.CSSProperties = {
  marginTop: 8,
  color: "rgba(255,255,255,0.90)",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

const postFoot: React.CSSProperties = { display: "flex", gap: 8, alignItems: "center", marginTop: 10, flexWrap: "wrap" };

const chip: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  fontSize: 12,
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

const modalHeader: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 };
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

const textarea: React.CSSProperties = { ...input, minHeight: 110, resize: "vertical" };
