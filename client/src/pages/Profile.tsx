import React, {
  useEffect,
  useMemo,
  useState,
  CSSProperties,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { supabase } from "../supabaseClient";

// ---------- СТИЛИ (футуристичные неоновые карточки) ----------

const pageWrapper: CSSProperties = {
  width: "100%",
  maxWidth: 1200,
  margin: "40px auto",
  padding: "0 16px 48px",
  boxSizing: "border-box",
};

const glassPanel: CSSProperties = {
  position: "relative",
  borderRadius: 24,
  padding: 24,
  background:
    "radial-gradient(circle at 0% 0%, rgba(56,189,248,0.18), transparent 55%)," +
    "radial-gradient(circle at 100% 0%, rgba(244,114,182,0.2), transparent 55%)," +
    "rgba(15,23,42,0.92)",
  boxShadow:
    "0 0 0 1px rgba(148,163,184,0.25), 0 28px 60px rgba(15,23,42,0.85)",
  backdropFilter: "blur(22px)",
  border: "1px solid rgba(148,163,184,0.35)",
};

const headerRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 24,
  alignItems: "center",
  justifyContent: "space-between",
};

const headerLeft: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 20,
  minWidth: 0,
};

const avatarOuterGlow: CSSProperties = {
  position: "relative",
  width: 88,
  height: 88,
  borderRadius: "999px",
  padding: 3,
  background:
    "conic-gradient(from 180deg, #22d3ee, #6366f1, #a855f7, #ec4899, #22d3ee)",
  boxShadow:
    "0 0 25px rgba(56,189,248,0.55), 0 0 45px rgba(168,85,247,0.55)",
};

const avatarInner: CSSProperties = {
  width: "100%",
  height: "100%",
  borderRadius: "999px",
  overflow: "hidden",
  background:
    "radial-gradient(circle at 30% 20%, #1f2937, #020617 70%, #000 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#e5e7eb",
  fontSize: 32,
  fontWeight: 700,
};

const avatarImg: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const nameBlock: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  minWidth: 0,
};

const nameRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
};

const displayName: CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  letterSpacing: "0.03em",
  color: "#f9fafb",
  textShadow: "0 0 16px rgba(59,130,246,0.65)",
};

const userIdLine: CSSProperties = {
  fontSize: 12,
  color: "#9ca3af",
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  alignItems: "center",
};

const pillMuted: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 10px",
  borderRadius: 999,
  backgroundColor: "rgba(15,23,42,0.9)",
  border: "1px solid rgba(148,163,184,0.5)",
  fontSize: 12,
  color: "#e5e7eb",
};

const headerButtons: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
};

const baseBtn: CSSProperties = {
  borderRadius: 999,
  padding: "8px 16px",
  fontSize: 13,
  fontWeight: 500,
  border: "1px solid transparent",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  transition:
    "background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.12s ease, box-shadow 0.12s ease",
};

const ghostBtn: CSSProperties = {
  ...baseBtn,
  backgroundColor: "rgba(15,23,42,0.9)",
  borderColor: "rgba(148,163,184,0.5)",
  color: "#e5e7eb",
};

const primaryBtn: CSSProperties = {
  ...baseBtn,
  background: "linear-gradient(90deg, #22c55e, #4ade80, #22c55e)",
  color: "#052e16",
  boxShadow: "0 0 18px rgba(34,197,94,0.45)",
};

const warnBtn: CSSProperties = {
  ...baseBtn,
  background: "linear-gradient(90deg, #f97316, #fb923c, #f97316)",
  color: "#451a03",
  boxShadow: "0 0 18px rgba(249,115,22,0.45)",
};

const statsRow: CSSProperties = {
  marginTop: 24,
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0,1fr))",
  gap: 16,
};

const statCard: CSSProperties = {
  borderRadius: 18,
  padding: "10px 12px 12px",
  background:
    "radial-gradient(circle at 0% 0%, rgba(56,189,248,0.18), transparent 55%), rgba(15,23,42,0.9)",
  border: "1px solid rgba(148,163,184,0.4)",
  boxShadow: "0 16px 30px rgba(15,23,42,0.75)",
};

const statLabel: CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.16em",
  color: "#9ca3af",
  marginBottom: 4,
};

const statValue: CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  color: "#e5e7eb",
};

const mainGrid: CSSProperties = {
  marginTop: 26,
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
  gap: 20,
};

const cardSection: CSSProperties = {
  borderRadius: 20,
  padding: 18,
  backgroundColor: "rgba(15,23,42,0.96)",
  border: "1px solid rgba(75,85,99,0.75)",
  boxShadow: "0 16px 36px rgba(15,23,42,0.9)",
};

const sectionTitleRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 10,
};

const sectionTitle: CSSProperties = {
  fontSize: 14,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  color: "#9ca3af",
};

const sectionHint: CSSProperties = {
  fontSize: 11,
  color: "#6b7280",
};

const formGrid: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const fieldLabel: CSSProperties = {
  fontSize: 12,
  color: "#9ca3af",
  marginBottom: 4,
};

const textInput: CSSProperties = {
  width: "100%",
  borderRadius: 12,
  border: "1px solid rgba(55,65,81,0.9)",
  padding: "8px 12px",
  backgroundColor: "rgba(15,23,42,0.96)",
  color: "#e5e7eb",
  fontSize: 14,
  outline: "none",
};

const textArea: CSSProperties = {
  ...textInput,
  resize: "vertical",
  minHeight: 80,
};

const fileInputRow: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const subtleText: CSSProperties = {
  fontSize: 11,
  color: "#6b7280",
};

const saveRow: CSSProperties = {
  marginTop: 12,
  display: "flex",
  gap: 10,
  alignItems: "center",
  flexWrap: "wrap",
};

const saveStatusOk: CSSProperties = {
  fontSize: 12,
  color: "#4ade80",
};

const saveStatusErr: CSSProperties = {
  fontSize: 12,
  color: "#f97373",
};

const postsPlaceholder: CSSProperties = {
  marginTop: 12,
  padding: 14,
  borderRadius: 14,
  background:
    "linear-gradient(120deg, rgba(52,211,153,0.06), rgba(59,130,246,0.06))",
  border: "1px dashed rgba(55,65,81,0.8)",
  fontSize: 13,
  color: "#9ca3af",
  lineHeight: 1.5,
};

// ---------- КОМПОНЕНТ ----------

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const stats = useMemo(
    () => ({
      posts: 0,
      likes: 0,
      comments: 0,
      friends: 0,
    }),
    []
  );

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? "");
      setBio(profile.bio ?? "");
      if (!avatarFile) {
        setAvatarPreview(profile.avatar_url ?? null);
      }
    }
  }, [profile, avatarFile]);

  const displayNameSafe = fullName.trim() || "Без имени";

  const initials = useMemo(() => {
    if (!displayNameSafe) return "U";
    const parts = displayNameSafe.split(" ").filter(Boolean);
    if (!parts.length) return displayNameSafe[0]?.toUpperCase() ?? "U";
    if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "U";
    return (
      (parts[0][0]?.toUpperCase() ?? "") +
      (parts[1][0]?.toUpperCase() ?? "")
    );
  }, [displayNameSafe]);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

  const handleCancel = () => {
    if (profile) {
      setFullName(profile.full_name ?? "");
      setBio(profile.bio ?? "");
      setAvatarPreview(profile.avatar_url ?? null);
      setAvatarFile(null);
      setSaveError(null);
      setSaveSuccess(false);
    }
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setSaveSuccess(true);
      setSaveError(null);
      setTimeout(() => setSaveSuccess(false), 1500);
    } catch {
      setSaveError("Не удалось скопировать ссылку.");
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      let avatarUrl = profile?.avatar_url ?? null;

      if (avatarFile) {
        const ext = avatarFile.name.split(".").pop() ?? "jpg";
        const filePath = `${user.id}/${Date.now()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile, {
            upsert: true,
          });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(filePath);

        avatarUrl = publicUrl;
      }

      const { error: upsertError } = await supabase.from("profiles").upsert(
        {
          user_id: user.id,
          email: user.email,
          full_name: fullName.trim() || null,
          bio: bio.trim() || null,
          avatar_url: avatarUrl,
        },
        { onConflict: "user_id" }
      );

      if (upsertError) throw upsertError;

      if (refreshProfile) {
        await refreshProfile();
      }

      setAvatarFile(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err: any) {
      console.error("profile save error", err);
      setSaveError(
        err?.message || "Не удалось сохранить профиль. Попробуй ещё раз."
      );
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div style={pageWrapper}>
        <div style={glassPanel}>
          <p style={{ color: "#e5e7eb" }}>
            Чтобы увидеть профиль, нужно войти в систему.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrapper}>
      <div style={glassPanel}>
        {/* Верхняя часть — аватар + имя + кнопки */}
        <div style={headerRow}>
          <div style={headerLeft}>
            <div style={avatarOuterGlow}>
              <div style={avatarInner}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" style={avatarImg} />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
            </div>

            <div style={nameBlock}>
              <div style={nameRow}>
                <span style={displayName}>{displayNameSafe}</span>
              </div>

              <div style={userIdLine}>
                <span>ID:</span>
                <code
                  style={{
                    padding: "2px 8px",
                    borderRadius: 999,
                    backgroundColor: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(75,85,99,0.9)",
                  }}
                >
                  {user.id}
                </code>
                <button
                  style={{
                    ...ghostBtn,
                    padding: "3px 10px",
                    fontSize: 11,
                  }}
                  onClick={() => navigator.clipboard.writeText(user.id)}
                >
                  Copy
                </button>
              </div>

              <div style={{ fontSize: 12, color: "#9ca3af" }}>
                Пока нет описания.
              </div>
            </div>
          </div>

          <div style={headerButtons}>
            <button style={ghostBtn} onClick={() => navigate(-1)}>
              ← Назад
            </button>

            <button style={ghostBtn} onClick={handleShare}>
              Поделиться
            </button>

            <button
              style={warnBtn}
              onClick={() =>
                document
                  .getElementById("profile-edit-form")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              Редактировать
            </button>
          </div>
        </div>

        {/* Статистика */}
        <div style={statsRow}>
          <div style={statCard}>
            <div style={statLabel}>Посты</div>
            <div style={statValue}>{stats.posts}</div>
          </div>
          <div style={statCard}>
            <div style={statLabel}>Лайки</div>
            <div style={statValue}>{stats.likes}</div>
          </div>
          <div style={statCard}>
            <div style={statLabel}>Комментарии</div>
            <div style={statValue}>{stats.comments}</div>
          </div>
          <div style={statCard}>
            <div style={statLabel}>Друзья</div>
            <div style={statValue}>{stats.friends}</div>
          </div>
        </div>

        {/* Основная сетка: слева форма, справа — блок про посты */}
        <div style={mainGrid}>
          {/* Левая колонка — редактирование */}
          <section id="profile-edit-form" style={cardSection}>
            <div style={sectionTitleRow}>
              <div style={sectionTitle}>Редактировать профиль</div>
            </div>

            <div style={formGrid}>
              <div>
                <div style={fieldLabel}>Полное имя</div>
                <input
                  type="text"
                  style={textInput}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Например: Ihor Nepomiashchyi"
                />
              </div>

              <div>
                <div style={fieldLabel}>О себе</div>
                <textarea
                  style={textArea}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Коротко о себе..."
                />
              </div>

              <div style={fileInputRow}>
                <div style={fieldLabel}>Аватар (файл)</div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    ...textInput,
                    padding: 6,
                    cursor: "pointer",
                  }}
                />
                <div style={subtleText}>
                  Поддерживаются обычные картинки (JPG, PNG и т.п.). Файл
                  загрузится в Supabase Storage → bucket <code>avatars</code>.
                </div>
              </div>

              <div style={saveRow}>
                <button
                  style={primaryBtn}
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Сохраняю..." : "Сохранить"}
                </button>

                <button style={ghostBtn} onClick={handleCancel}>
                  Отмена
                </button>

                {saveSuccess && (
                  <span style={saveStatusOk}>Сохранено ✔</span>
                )}
                {saveError && (
                  <span style={saveStatusErr}>{saveError}</span>
                )}
              </div>
            </div>
          </section>

          {/* Правая колонка — блок про посты/будущие фичи */}
          <section style={cardSection}>
            <div style={sectionTitleRow}>
              <div style={sectionTitle}>Посты пользователя</div>
              <div style={sectionHint}>AXIRO feed</div>
            </div>

            <div style={postsPlaceholder}>
              Пока нет постов. Создай первый пост на странице{" "}
              <strong>«Посты»</strong>. <br />
              В будущем сюда можно будет вывести:
              <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                <li>последние публикации пользователя;</li>
                <li>быстрые ссылки на ролики / ленту;</li>
                <li>кнопку «Поделиться профилем» в соцсетях.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
