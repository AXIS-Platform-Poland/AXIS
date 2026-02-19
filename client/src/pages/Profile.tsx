import React, {
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import supabase from "../supabaseClient";

type ProfileRow = {
  id?: string;
  user_id: string;
  email?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  created_at?: string | null;
};

const pageWrapper: CSSProperties = {
  padding: "24px 26px 32px",
  color: "#E5E7EB",
};

const cardBase: CSSProperties = {
  background:
    "radial-gradient(circle at 0 0, rgba(59,130,246,0.22), transparent 55%), rgba(17,24,39,0.96)",
  borderRadius: 24,
  border: "1px solid rgba(148,163,184,0.35)",
  boxShadow:
    "0 18px 45px rgba(15,23,42,0.8), 0 0 0 1px rgba(15,23,42,0.9)",
  padding: 20,
};

const headerCard: CSSProperties = {
  ...cardBase,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 20,
  padding: "18px 22px",
};

const headerLeft: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 16,
};

const avatarOuterGlow: CSSProperties = {
  width: 76,
  height: 76,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "radial-gradient(circle at 30% 0%, rgba(96,165,250,0.9), rgba(59,130,246,0.1))",
  boxShadow:
    "0 0 0 1px rgba(148,163,184,0.4), 0 0 40px rgba(59,130,246,0.55)",
};

const avatarInner: CSSProperties = {
  width: 68,
  height: 68,
  borderRadius: "50%",
  overflow: "hidden",
  background:
    "linear-gradient(145deg, rgba(31,41,55,1), rgba(15,23,42,1))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#9CA3AF",
  fontSize: 32,
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
};

const displayName: CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  letterSpacing: 0.3,
};

const statusBadge: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 0.12,
  background:
    "linear-gradient(90deg, rgba(34,197,94,0.18), rgba(59,130,246,0.16))",
  border: "1px solid rgba(55,65,81,0.9)",
  color: "#A5B4FC",
};

const idRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 11,
  color: "#9CA3AF",
};

const idBrick: CSSProperties = {
  padding: "3px 8px",
  borderRadius: 999,
  background: "rgba(15,23,42,0.85)",
  border: "1px solid rgba(55,65,81,0.9)",
};

const copyBtn: CSSProperties = {
  fontSize: 11,
  padding: "4px 8px",
  borderRadius: 999,
  border: "1px solid rgba(148,163,184,0.6)",
  background: "rgba(15,23,42,0.9)",
  cursor: "pointer",
  color: "#E5E7EB",
};

const headerRight: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 8,
};

const headerButtonsRow: CSSProperties = {
  display: "flex",
  gap: 8,
};

const ghostBtn: CSSProperties = {
  fontSize: 12,
  padding: "7px 14px",
  borderRadius: 999,
  border: "1px solid rgba(148,163,184,0.5)",
  background: "rgba(15,23,42,0.9)",
  cursor: "pointer",
  color: "#E5E7EB",
};

const primaryBtn: CSSProperties = {
  ...ghostBtn,
  background:
    "linear-gradient(135deg, rgba(249,115,22,1), rgba(234,88,12,1))",
  border: "1px solid rgba(248,250,252,0.25)",
};

const saveStatusOk: CSSProperties = {
  fontSize: 11,
  color: "#A7F3D0",
};

const statsRow: CSSProperties = {
  marginTop: 14,
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: 10,
};

const statCard: CSSProperties = {
  ...cardBase,
  padding: "10px 14px",
  borderRadius: 18,
  border: "1px solid rgba(51,65,85,0.9)",
  boxShadow:
    "0 10px 24px rgba(15,23,42,0.8), 0 0 0 1px rgba(15,23,42,0.95)",
};

const statLabel: CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 0.12,
  color: "#9CA3AF",
};

const statValue: CSSProperties = {
  marginTop: 4,
  fontSize: 22,
  fontWeight: 700,
};

const mainGrid: CSSProperties = {
  marginTop: 22,
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
  gap: 18,
};

const sectionCard: CSSProperties = {
  ...cardBase,
  borderRadius: 20,
  padding: 18,
};

const sectionTitleRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 10,
};

const sectionTitle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: 0.1,
};

const label: CSSProperties = {
  fontSize: 12,
  color: "#9CA3AF",
  marginBottom: 5,
};

const textInput: CSSProperties = {
  width: "100%",
  padding: "9px 11px",
  borderRadius: 10,
  border: "1px solid rgba(55,65,81,0.9)",
  background: "rgba(15,23,42,0.96)",
  color: "#E5E7EB",
  fontSize: 13,
  outline: "none",
};

const textArea: CSSProperties = {
  ...textInput,
  minHeight: 90,
  resize: "vertical",
};

const fileInputWrapper: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const fileLabel: CSSProperties = {
  fontSize: 12,
  color: "#9CA3AF",
};

const fastLinksList: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const fastLinkBtn: CSSProperties = {
  padding: "9px 11px",
  borderRadius: 12,
  border: "1px solid rgba(55,65,81,0.9)",
  background: "rgba(15,23,42,0.96)",
  color: "#E5E7EB",
  fontSize: 13,
  textAlign: "left" as const,
  cursor: "pointer",
};

const helpText: CSSProperties = {
  fontSize: 12,
  color: "#9CA3AF",
};

const footerRow: CSSProperties = {
  marginTop: 10,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
};

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();

  const [fullName, setFullName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!profile) return;
    setFullName(profile.full_name ?? "");
    setBio(profile.bio ?? "");
    setAvatarUrl(profile.avatar_url ?? null);
  }, [profile]);

  if (!user) {
    return (
      <div style={pageWrapper}>
        <div style={cardBase}>Нужно войти в аккаунт, чтобы увидеть профиль.</div>
      </div>
    );
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.id).catch(() => {});
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaveSuccess(false);

    try {
      const updates: Partial<ProfileRow> = {
        full_name: fullName.trim() || null,
        bio: bio.trim() || null,
      };

      const { error } = await supabase
        .from<ProfileRow>("profiles")
        .update(updates)
        .eq("user_id", user.id);

      if (error) throw error;

      await refreshProfile();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (error) {
      console.error("profile update error", error);
      alert("Ошибка сохранения профиля");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setSaving(true);
    setSaveSuccess(false);

    try {
      const ext = file.name.split(".").pop() || "jpg";
      const filePath = `${user.id}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;
      setAvatarUrl(publicUrl);

      const { error: updateError } = await supabase
        .from<ProfileRow>("profiles")
        .update({ avatar_url: publicUrl })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      await refreshProfile();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (error) {
      console.error("avatar upload error", error);
      alert("Не удалось загрузить аватар");
    } finally {
      setSaving(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const goBack = () => navigate(-1);
  const goToCreatePost = () => navigate("/posts");
  const goToFeed = () => navigate("/posts");
  const goToReels = () => navigate("/reels");

  const displayNameText =
    fullName.trim() || profile?.email || "Без имени";

  return (
    <div style={pageWrapper}>
      {/* HEADER */}
      <div style={headerCard}>
        <div style={headerLeft}>
          <div
            style={{ ...avatarOuterGlow, cursor: "pointer" }}
            onClick={handleAvatarClick}
            title="Нажми, чтобы сменить аватар"
          >
            <div style={avatarInner}>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  style={avatarImg}
                />
              ) : (
                <span>
                  {displayNameText.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          <div style={nameBlock}>
            <div style={displayName}>{displayNameText}</div>
            <div style={statusBadge}>
              <span>Owner</span>
              <span>•</span>
              <span>INGVARR Sp. z o.o.</span>
            </div>
            <div style={idRow}>
              <span>ID:</span>
              <span style={idBrick}>
                {user.id.slice(0, 8)}…{user.id.slice(-4)}
              </span>
              <button style={copyBtn} onClick={handleCopyId}>
                Copy
              </button>
            </div>
          </div>
        </div>

        <div style={headerRight}>
          <div style={headerButtonsRow}>
            <button style={ghostBtn} onClick={goBack}>
              ← Назад
            </button>
            <button
              style={ghostBtn}
              onClick={() => {
                navigator.clipboard
                  .writeText(window.location.href)
                  .catch(() => {});
              }}
            >
              Поделиться
            </button>
            <button
              style={primaryBtn}
              onClick={toggleEdit}
            >
              {isEditing ? "Отмена" : "Редактировать"}
            </button>
          </div>

          <div style={footerRow}>
            <div>
              {saveSuccess && (
                <span
                  style={{
                    ...saveStatusOk,
                    padding: "3px 9px",
                    borderRadius: 999,
                    backgroundColor: "rgba(22,163,74,0.15)",
                    border: "1px solid rgba(34,197,94,0.6)",
                  }}
                >
                  Сохранено ✔
                </span>
              )}
            </div>
            <button
              style={primaryBtn}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Сохраняю..." : "Сохранить"}
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={statsRow}>
        <div style={statCard}>
          <div style={statLabel}>Посты</div>
          <div style={statValue}>0</div>
        </div>
        <div style={statCard}>
          <div style={statLabel}>Лайки</div>
          <div style={statValue}>0</div>
        </div>
        <div style={statCard}>
          <div style={statLabel}>Комментарии</div>
          <div style={statValue}>0</div>
        </div>
        <div style={statCard}>
          <div style={statLabel}>Друзья</div>
          <div style={statValue}>0</div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={mainGrid}>
        {/* LEFT: EDIT FORM */}
        <div style={sectionCard}>
          <div style={sectionTitleRow}>
            <div style={sectionTitle}>Редактировать профиль</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div style={label}>Полное имя</div>
              <input
                type="text"
                style={textInput}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={!isEditing || saving}
                placeholder="Например: Ihor Nepomiashchyi"
              />
            </div>

            <div>
              <div style={label}>О себе</div>
              <textarea
                style={textArea}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={!isEditing || saving}
                placeholder="Коротко о себе..."
              />
            </div>

            <div style={fileInputWrapper}>
              <span style={fileLabel}>Аватар (файл)</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarFileChange}
                disabled={saving}
              />
              <span style={helpText}>
                Можно нажать прямо на аватар сверху, чтобы выбрать файл.
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: USER POSTS + FAST LINKS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={sectionCard}>
            <div style={sectionTitleRow}>
              <div style={sectionTitle}>Посты пользователя</div>
              <span style={{ fontSize: 11, color: "#9CA3AF" }}>
                AXIRO feed
              </span>
            </div>
            <div style={helpText}>
              Пока нет постов. Создай первый пост на странице{" "}
              <strong>«Посты»</strong>.
              <br />
              В будущем можно вывести:
              <br />– последние публикации пользователя;
              <br />– быстрые ссылки на ролики / ленту;
              <br />– кнопку «Поделиться профилем» в соцсети.
            </div>
          </div>

          <div style={sectionCard}>
            <div style={sectionTitleRow}>
              <div style={sectionTitle}>Быстрые действия</div>
            </div>

            <div style={fastLinksList}>
              <button style={fastLinkBtn} onClick={goToCreatePost}>
                ➕ Создать пост
              </button>
              <button style={fastLinkBtn} onClick={goToFeed}>
                📰 Перейти к ленте постов
              </button>
              <button style={fastLinkBtn} onClick={goToReels}>
                🎬 Открыть ролики
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
