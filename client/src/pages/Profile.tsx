// client/src/pages/Profile.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

type ProfileRow = {
  id?: string | null;
  user_id: string;
  email?: string | null;
  full_name?: string | null;
  about?: string | null;
  avatar_url?: string | null;
  updated_at?: string | null;
};

function safeText(v: any) {
  return typeof v === "string" ? v : "";
}

export default function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userId, setUserId] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [fullName, setFullName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [ok, setOk] = useState<string>("");

  const profileLabel = useMemo(() => {
    return fullName?.trim() ? fullName.trim() : "Без имени";
  }, [fullName]);

  const publicAvatar = useMemo(() => {
    // если avatarUrl уже public url — показываем его как есть
    return avatarUrl?.trim() || "";
  }, [avatarUrl]);

  async function load() {
    setLoading(true);
    setError("");
    setOk("");

    try {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr) throw userErr;
      if (!userData?.user) {
        navigate("/auth");
        return;
      }

      const u = userData.user;
      setUserId(u.id);
      setEmail(u.email ?? "");

      // ВАЖНО: таблица называется profiles (public.profiles)
      const { data: rows, error: selErr } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", u.id)
        .limit(1);

      if (selErr) throw selErr;

      const row = rows?.[0] as ProfileRow | undefined;

      setFullName(safeText(row?.full_name));
      setAbout(safeText(row?.about));
      setAvatarUrl(safeText(row?.avatar_url));
    } catch (e: any) {
      setError(e?.message || "Ошибка загрузки профиля");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveProfile() {
    if (!userId) return;

    setSaving(true);
    setError("");
    setOk("");

    try {
      // 1) проверим, есть ли строка
      const { data: existRows, error: selErr } = await supabase
        .from("profiles")
        .select("id,user_id")
        .eq("user_id", userId)
        .limit(1);

      if (selErr) throw selErr;

      const exists = !!existRows?.length;

      const payload: Partial<ProfileRow> = {
        full_name: fullName.trim() || null,
        about: about.trim() || null,
        avatar_url: avatarUrl.trim() || null,
        email: email || null,
        user_id: userId,
      };

      if (exists) {
        const { error: updErr } = await supabase
          .from("profiles")
          .update(payload)
          .eq("user_id", userId);

        if (updErr) throw updErr;
      } else {
        // если строки нет — создаём
        const { error: insErr } = await supabase.from("profiles").insert(payload);
        if (insErr) throw insErr;
      }

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
      setTimeout(() => setOk(""), 1500);
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
      // bucket должен называться EXACT: avatars
      const ext = file.name.split(".").pop() || "jpg";
      const filePath = `${userId}/${Date.now()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type || "image/*",
        });

      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from("avatars").getPublicUrl(filePath);
      const url = pub?.publicUrl || "";

      setAvatarUrl(url);

      // сразу сохраняем в profiles
      await saveProfile();

      setOk("Аватар обновлён ✅");
    } catch (e: any) {
      setError(e?.message || "Ошибка загрузки аватара");
    } finally {
      setSaving(false);
    }
  }

  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: 16,
    backdropFilter: "blur(10px)",
  };

  const btnStyle: React.CSSProperties = {
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    padding: "10px 12px",
    cursor: "pointer",
    fontWeight: 600,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.25)",
    color: "white",
    padding: "10px 12px",
    outline: "none",
  };

  if (loading) {
    return (
      <div style={{ color: "white", padding: 16 }}>
        <div style={cardStyle}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ color: "white", padding: 16, maxWidth: 1100 }}>
      {/* TOP CARD */}
      <div style={{ ...cardStyle, display: "flex", gap: 14, alignItems: "center" }}>
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
          {publicAvatar ? (
            <img
              src={publicAvatar}
              alt="avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ opacity: 0.8 }}>👤</span>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{profileLabel}</div>
          <div style={{ opacity: 0.8, fontSize: 12, display: "flex", gap: 8, alignItems: "center" }}>
            <span>ID: {userId}</span>
            <button onClick={copyId} style={{ ...btnStyle, padding: "6px 10px", fontWeight: 700 }}>
              Copy
            </button>
          </div>
          <div style={{ marginTop: 8, opacity: 0.9 }}>
            {about?.trim() ? about.trim() : "Пока нет описания."}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <button onClick={() => navigate(-1)} style={btnStyle}>
            ← Назад
          </button>

          <button
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url).then(
                () => setOk("Ссылка скопирована ✅"),
                () => setError("Не удалось скопировать ссылку")
              );
            }}
            style={btnStyle}
          >
            🔗 Поделиться
          </button>

          <button onClick={saveProfile} style={{ ...btnStyle, opacity: saving ? 0.6 : 1 }} disabled={saving}>
            ✏️ Сохранить
          </button>
        </div>
      </div>

      {/* STATUS */}
      {(error || ok) && (
        <div style={{ marginTop: 12, ...cardStyle }}>
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
        {/* LEFT: EDIT */}
        <div style={cardStyle}>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Редактировать профиль</div>

          <label style={{ display: "block", marginBottom: 8, opacity: 0.9 }}>Полное имя</label>
          <input
            style={inputStyle}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Например: Ihor Nepomiashchyi"
          />

          <div style={{ height: 12 }} />

          <label style={{ display: "block", marginBottom: 8, opacity: 0.9 }}>О себе</label>
          <textarea
            style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Коротко о себе..."
          />

          <div style={{ height: 12 }} />

          <label style={{ display: "block", marginBottom: 8, opacity: 0.9 }}>Аватар (из галереи / файла)</label>
          <input
            type="file"
            accept="image/*"
            style={{ width: "100%" }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) uploadAvatar(f);
              e.currentTarget.value = "";
            }}
          />

          <div style={{ height: 12 }} />

          <label style={{ display: "block", marginBottom: 8, opacity: 0.9 }}>
            Аватар URL (если нужно вручную)
          </label>
          <input
            style={inputStyle}
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://..."
          />

          <div style={{ height: 14 }} />

          <button
            onClick={saveProfile}
            style={{ ...btnStyle, width: "100%", opacity: saving ? 0.6 : 1 }}
            disabled={saving}
          >
            {saving ? "Сохраняю..." : "Сохранить изменения"}
          </button>

          <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
            Email: <b>{email || "-"}</b>
          </div>
        </div>

        {/* RIGHT: STATS + POSTS PLACEHOLDER */}
        <div style={{ display: "grid", gap: 12 }}>
          <div style={cardStyle}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <StatBox title="Посты" value="0" />
              <StatBox title="Лайки" value="0" />
              <StatBox title="Комментарии" value="0" />
            </div>
            <div style={{ marginTop: 10, opacity: 0.85 }}>
              Тут дальше можно подключить счётчики и посты пользователя.
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Посты пользователя</div>
            <div style={{ opacity: 0.85 }}>
              Пока нет постов. Создай первый пост на странице <b>"Посты"</b>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ title, value }: { title: string; value: string }) {
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
