// client/src/pages/Profile.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

type ProfileRow = {
  user_id: string;
  email?: string | null;
  full_name?: string | null;
  about?: string | null;
  avatar_url?: string | null;
};

function s(v: any) {
  return typeof v === "string" ? v : "";
}

export default function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  // это “сохранённые” значения (то, что показываем вверху)
  const [profile, setProfile] = useState<ProfileRow>({
    user_id: "",
    email: "",
    full_name: "",
    about: "",
    avatar_url: "",
  });

  // режим редактирования + черновики
  const [isEditing, setIsEditing] = useState(false);
  const [draftFullName, setDraftFullName] = useState("");
  const [draftAbout, setDraftAbout] = useState("");
  const [draftAvatarUrl, setDraftAvatarUrl] = useState("");

  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const titleName = useMemo(() => {
    const name = s(profile.full_name).trim();
    return name ? name : "Без имени";
  }, [profile.full_name]);

  const avatar = useMemo(() => s(profile.avatar_url).trim(), [profile.avatar_url]);

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

      const { data: rows, error: selErr } = await supabase
        .from("profiles")
        .select("user_id,email,full_name,about,avatar_url")
        .eq("user_id", u.id)
        .limit(1);

      if (selErr) throw selErr;

      const row = (rows?.[0] as ProfileRow) || null;

      const next: ProfileRow = {
        user_id: u.id,
        email: row?.email ?? u.email ?? "",
        full_name: row?.full_name ?? "",
        about: row?.about ?? "",
        avatar_url: row?.avatar_url ?? "",
      };

      setProfile(next);

      // черновики заполняем текущими значениями
      setDraftFullName(s(next.full_name));
      setDraftAbout(s(next.about));
      setDraftAvatarUrl(s(next.avatar_url));
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
      // upsert = вставит или обновит по user_id
      const payload: ProfileRow = {
        user_id: userId,
        email: email || null,
        full_name: draftFullName.trim() || null,
        about: draftAbout.trim() || null,
        avatar_url: draftAvatarUrl.trim() || null,
      };

      const { error: upErr } = await supabase
        .from("profiles")
        .upsert(payload, { onConflict: "user_id" });

      if (upErr) throw upErr;

      // применяем черновик как “сохранённое”
      setProfile(payload);
      setIsEditing(false);

      setOk("Сохранено ✅");
    } catch (e: any) {
      setError(e?.message || "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  }

  function startEdit() {
    setDraftFullName(s(profile.full_name));
    setDraftAbout(s(profile.about));
    setDraftAvatarUrl(s(profile.avatar_url));
    setIsEditing(true);
    setOk("");
    setError("");
  }

  function cancelEdit() {
    setDraftFullName(s(profile.full_name));
    setDraftAbout(s(profile.about));
    setDraftAvatarUrl(s(profile.avatar_url));
    setIsEditing(false);
    setOk("");
    setError("");
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
      const ext = file.name.split(".").pop() || "jpg";
      const filePath = `${userId}/${Date.now()}.${ext}`;

      // bucket должен быть avatars
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

      // кладём в черновик (чтобы сохранить кнопкой)
      setDraftAvatarUrl(url);

      setOk("Аватар загружен ✅ (нажми «Сохранить»)");
      setIsEditing(true);
    } catch (e: any) {
      setError(e?.message || "Ошибка загрузки аватара");
    } finally {
      setSaving(false);
    }
  }

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

  if (loading) {
    return (
      <div style={{ color: "white", padding: 16 }}>
        <div style={card}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ color: "white", padding: 16, maxWidth: 1100 }}>
      {/* TOP */}
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
            {s(profile.about).trim() ? s(profile.about).trim() : "Пока нет описания."}
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

      {/* STATUS */}
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
            value={draftAbout}
            onChange={(e) => setDraftAbout(e.target.value)}
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
