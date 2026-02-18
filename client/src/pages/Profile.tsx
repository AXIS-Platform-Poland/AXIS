import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

type ProfileRow = {
  user_id: string;
  email?: string | null;
  full_name?: string | null;
  bio?: string | null;         // ВАЖНО: у тебя именно bio
  avatar_url?: string | null;
};

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 14,
  padding: 16,
  backdropFilter: "blur(10px)",
};

const btn: React.CSSProperties = {
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  padding: "10px 12px",
  cursor: "pointer",
  fontWeight: 700,
};

const input: React.CSSProperties = {
  width: "100%",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(0,0,0,0.25)",
  color: "white",
  padding: "10px 12px",
  outline: "none",
};

function str(v: any) {
  return typeof v === "string" ? v : "";
}

export default function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  // сохранённый профиль (то, что показываем вверху)
  const [profile, setProfile] = useState<ProfileRow>({
    user_id: "",
    email: "",
    full_name: "",
    bio: "",
    avatar_url: "",
  });

  // черновик для редактирования
  const [isEditing, setIsEditing] = useState(false);
  const [draftFullName, setDraftFullName] = useState("");
  const [draftBio, setDraftBio] = useState("");
  const [draftAvatarUrl, setDraftAvatarUrl] = useState("");

  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const titleName = useMemo(() => {
    const n = str(profile.full_name).trim();
    return n ? n : "Без имени";
  }, [profile.full_name]);

  const bioText = useMemo(() => str(profile.bio).trim(), [profile.bio]);
  const avatar = useMemo(() => str(profile.avatar_url).trim(), [profile.avatar_url]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    setLoading(true);
    setError("");
    setOk("");

    try {
      const { data, error: uErr } = await supabase.auth.getUser();
      if (uErr) throw uErr;

      const u = data?.user;
      if (!u) {
        navigate("/auth");
        return;
      }

      setUserId(u.id);
      setEmail(u.email ?? "");

      const { data: rows, error: selErr } = await supabase
        .from("profiles")
        .select("user_id,email,full_name,bio,avatar_url")
        .eq("user_id", u.id)
        .limit(1);

      if (selErr) throw selErr;

      const row = (rows?.[0] as ProfileRow) || null;

      const next: ProfileRow = {
        user_id: u.id,
        email: row?.email ?? u.email ?? "",
        full_name: row?.full_name ?? "",
        bio: row?.bio ?? "",
        avatar_url: row?.avatar_url ?? "",
      };

      setProfile(next);

      // заполняем черновики
      setDraftFullName(str(next.full_name));
      setDraftBio(str(next.bio));
      setDraftAvatarUrl(str(next.avatar_url));
    } catch (e: any) {
      setError(e?.message || "Ошибка загрузки профиля");
    } finally {
      setLoading(false);
    }
  }

  function startEdit() {
    setDraftFullName(str(profile.full_name));
    setDraftBio(str(profile.bio));
    setDraftAvatarUrl(str(profile.avatar_url));
    setIsEditing(true);
    setError("");
    setOk("");
  }

  function cancelEdit() {
    setDraftFullName(str(profile.full_name));
    setDraftBio(str(profile.bio));
    setDraftAvatarUrl(str(profile.avatar_url));
    setIsEditing(false);
    setError("");
    setOk("");
  }

  async function saveProfile() {
    if (!userId) return;

    setSaving(true);
    setError("");
    setOk("");

    try {
      const payload: ProfileRow = {
        user_id: userId,
        email: email || null,
        full_name: draftFullName.trim() || null,
        bio: draftBio.trim() || null,              // ВАЖНО: сохраняем в bio
        avatar_url: draftAvatarUrl.trim() || null,
      };

      const { error: upErr } = await supabase
        .from("profiles")
        .upsert(payload, { onConflict: "user_id" });

      if (upErr) throw upErr;

      setProfile(payload);
      setIsEditing(false);
      setOk("Сохранено ✅");
    } catch (e: any) {
      setError(e?.message || "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  }

  async function copyId() {
    try {
      await navigator.clipboard.writeText(userId);
      setOk("ID скопирован ✅");
      setTimeout(() => setOk(""), 1200);
    } catch {
      setError("Не удалось скопировать ID");
    }
  }

  async function uploadAvatar(file: File) {
    if (!userId) return;

    setSaving(true);
    setError("");
    setOk("");

    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${userId}/${Date.now()}.${ext}`;

      // bucket должен называться "avatars"
      const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type || "image/*",
      });

      if (upErr) throw upErr;

      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      const publicUrl = data?.publicUrl || "";

      // кладём в черновик, чтобы сохранить кнопкой
      setDraftAvatarUrl(publicUrl);
      setIsEditing(true);
      setOk("Аватар загружен ✅ (нажми «Сохранить»)");
    } catch (e: any) {
      setError(e?.message || "Ошибка загрузки аватара");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div style={{ color: "white", padding: 16 }}>
        <div style={card}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ color: "white", padding: 16, maxWidth: 1100 }}>
      {/* HEADER */}
      <div style={{ ...card, display: "flex", gap: 14, alignItems: "center" }}>
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          title="Аватар"
        >
          {avatar ? (
            <img src={avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ opacity: 0.8 }}>👤</span>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 900 }}>{titleName}</div>

          <div style={{ opacity: 0.8, fontSize: 12, display: "flex", gap: 8, alignItems: "center" }}>
            <span>ID: {userId}</span>
            <button onClick={copyId} style={{ ...btn, padding: "6px 10px" }}>
              Copy
            </button>
          </div>

          <div style={{ marginTop: 8, opacity: 0.9 }}>
            {bioText ? bioText : "Пока нет описания."}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <button onClick={() => navigate(-1)} style={btn}>
            ← Назад
          </button>

          <button
            onClick={() => {
              navigator.clipboard
                .writeText(window.location.href)
                .then(() => setOk("Ссылка скопирована ✅"))
                .catch(() => setError("Не удалось скопировать ссылку"));
            }}
            style={btn}
          >
            🔗 Поделиться
          </button>

          {!isEditing ? (
            <button onClick={startEdit} style={btn}>
              ✏️ Редактировать
            </button>
          ) : (
            <>
              <button onClick={cancelEdit} style={btn}>
                ✖ Отмена
              </button>
              <button onClick={saveProfile} style={{ ...btn, opacity: saving ? 0.6 : 1 }} disabled={saving}>
                ✅ Сохранить
              </button>
            </>
          )}
        </div>
      </div>

      {/* MESSAGES */}
      {(error || ok) && (
        <div style={{ marginTop: 12, ...card }}>
          {error ? <div style={{ color: "#ffb4b4" }}>Ошибка: {error}</div> : null}
          {ok ? <div style={{ color: "#bfffd2" }}>{ok}</div> : null}
        </div>
      )}

      {/* GRID */}
      <div
        style={{
          marginTop: 12,
          display: "grid",
          gridTemplateColumns: "minmax(320px, 420px) 1fr",
          gap: 12,
        }}
      >
        {/* LEFT */}
        <div style={card}>
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Редактировать профиль</div>

          <label style={{ display: "block", marginBottom: 8, opacity: 0.9 }}>Полное имя</label>
          <input
            style={input}
            value={draftFullName}
            onChange={(e) => setDraftFullName(e.target.value)}
            placeholder="Например: Ihor Nepomiashchyi"
            disabled={!isEditing}
          />

          <div style={{ height: 12 }} />

          <label style={{ display: "block", marginBottom: 8, opacity: 0.9 }}>О себе</label>
          <textarea
            style={{ ...input, minHeight: 90, resize: "vertical" }}
            value={draftBio}
            onChange={(e) => setDraftBio(e.target.value)}
            placeholder="Коротко о себе..."
            disabled={!isEditing}
          />

          <div style={{ height: 12 }} />

          <label style={{ display: "block", marginBottom: 8, opacity: 0.9 }}>Аватар (файл)</label>
          <input
            type="file"
            accept="image/*"
            style={{ width: "100%" }}
            disabled={!isEditing}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) uploadAvatar(f);
              e.currentTarget.value = "";
            }}
          />

          <div style={{ height: 12 }} />

          <label style={{ display: "block", marginBottom: 8, opacity: 0.9 }}>Аватар URL (опционально)</label>
          <input
            style={input}
            value={draftAvatarUrl}
            onChange={(e) => setDraftAvatarUrl(e.target.value)}
            placeholder="https://..."
            disabled={!isEditing}
          />

          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.75 }}>
            Email: <b>{email || "-"}</b>
          </div>

          {!isEditing && (
            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
              Нажми <b>«Редактировать»</b>, чтобы менять данные.
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ display: "grid", gap: 12 }}>
          <div style={card}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Stat title="Посты" value="0" />
              <Stat title="Лайки" value="0" />
              <Stat title="Комментарии" value="0" />
            </div>
            <div style={{ marginTop: 10, opacity: 0.85 }}>
              Тут дальше можно подключить счётчики и посты пользователя.
            </div>
          </div>

          <div style={card}>
            <div style={{ fontWeight: 900, marginBottom: 6 }}>Посты пользователя</div>
            <div style={{ opacity: 0.85 }}>
              Пока нет постов. Создай первый пост на странице <b>"Посты"</b>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        minWidth: 120,
        padding: "12px 14px",
        borderRadius: 14,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div style={{ fontSize: 24, fontWeight: 900 }}>{value}</div>
      <div style={{ opacity: 0.85 }}>{title}</div>
    </div>
  );
}
