// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import supabase from "../supabaseClient";

const cardBg = "rgba(15, 23, 42, 0.9)";
const accent = "#38bdf8";
const borderColor = "rgba(148, 163, 184, 0.4)";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [fullName, setFullName] = useState("");
  const [about, setAbout] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const [postsCount, setPostsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [friendsCount, setFriendsCount] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle"); // "idle" | "saving" | "success" | "error"
  const [avatarPreviewOpen, setAvatarPreviewOpen] = useState(false);

  // --- загрузка профиля и счётчиков ---
  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, bio, avatar_url")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("load profile error", error);
        return;
      }

      if (data) {
        setFullName(data.full_name || "");
        setAbout(data.bio || "");
        setAvatarUrl(data.avatar_url || "");
      }
    };

    const loadCounters = async () => {
      // посты
      const { count: posts } = await supabase
        .from("freed_posts")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      setPostsCount(posts || 0);

      // лайки / комментарии / друзья пока заглушки:
      setLikesCount(0);
      setCommentsCount(0);
      setFriendsCount(0);
    };

    loadProfile();
    loadCounters();
  }, [user]);

  // --- хэндлеры навигации ---
  const goBack = () => navigate(-1);
  const goToPosts = () => navigate("/posts");
  const goToFeed = () => navigate("/posts");
  const goToReels = () => navigate("/reels");

  // --- загрузка файла аватара ---
  const handleAvatarFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setAvatarFile(file);

    // локальный превью
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatarUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // --- сохранение профиля ---
  const handleSave = async () => {
    if (!user) return;

    setSaveStatus("saving");

    try {
      let uploadedAvatarUrl = avatarUrl;

      // если выбран новый файл — грузим в Supabase Storage
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile, {
            upsert: true,
          });

        if (uploadError) {
          console.error("avatar upload error", uploadError);
          setSaveStatus("error");
          return;
        }

        const { data: publicData } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        if (publicData && publicData.publicUrl) {
          uploadedAvatarUrl = publicData.publicUrl;
          setAvatarUrl(uploadedAvatarUrl);
        }
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          bio: about,
          avatar_url: uploadedAvatarUrl,
        })
        .eq("user_id", user.id);

      if (updateError) {
        console.error("profile update error", updateError);
        setSaveStatus("error");
        return;
      }

      setSaveStatus("success");
      setIsEditing(false);
      setAvatarFile(null);

      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (e) {
      console.error("profile save error", e);
      setSaveStatus("error");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setAvatarFile(null);
  };

  const displayName =
    fullName && fullName.trim().length > 0
      ? fullName
      : user?.email || "Без имени";

  // --- UI ---
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px",
        paddingTop: "88px",
        boxSizing: "border-box",
        background:
          "radial-gradient(circle at top left, #0f172a 0, #020617 45%, #000 100%)",
        color: "white",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1120px" }}>
        {/* верхняя карточка с аватаром */}
        <div
          style={{
            background: cardBg,
            borderRadius: "24px",
            padding: "20px 24px",
            border: `1px solid ${borderColor}`,
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.9)",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          {/* левая часть */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* аватар */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "999px",
                overflow: "hidden",
                border: `2px solid ${accent}`,
                cursor: avatarUrl ? "pointer" : "default",
                background:
                  "linear-gradient(135deg, #0f172a 0, #1e293b 40%, #0f172a 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
              }}
              onClick={() => {
                if (avatarUrl) setAvatarPreviewOpen(true);
              }}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span role="img" aria-label="user">
                  👤
                </span>
              )}
            </div>

            {/* имя + статус */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  {displayName}
                </div>
              </div>

              {/* статус / бейдж */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "11px",
                  color: "#e5e7eb",
                }}
              >
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(59,130,246,0.08))",
                    border: "1px solid rgba(56,189,248,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                  }}
                >
                  Owner • INGVARR Sp. z o.o.
                </span>
              </div>

              {/* ID */}
              {user && (
                <div
                  style={{
                    fontSize: "11px",
                    color: "#9ca3af",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span style={{ opacity: 0.8 }}>ID:</span>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "11px",
                      background: "rgba(15,23,42,0.9)",
                      padding: "3px 6px",
                      borderRadius: "6px",
                      border: "1px solid rgba(148,163,184,0.5)",
                    }}
                  >
                    {user.id}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* правый блок с кнопками */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={goBack}
              style={{
                padding: "8px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.6)",
                background: "rgba(15,23,42,0.9)",
                color: "#e5e7eb",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              ← Назад
            </button>

            <button
              onClick={() => {
                if (!user) return;
                const url = `${window.location.origin}/profile?id=${user.id}`;
                navigator.clipboard
                  .writeText(url)
                  .catch((e) => console.error(e));
              }}
              style={{
                padding: "8px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.6)",
                background:
                  "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(96,165,250,0.15))",
                color: "#e5e7eb",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Поделиться
            </button>

            <button
              onClick={() => setIsEditing((v) => !v)}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                border: "none",
                background:
                  "linear-gradient(135deg, #fb923c, #f97316, #facc15)",
                color: "#111827",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {isEditing ? "Отмена" : "Редактировать"}
            </button>

            {isEditing && (
              <button
                onClick={handleSave}
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  border: "none",
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "#ecfdf5",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {saveStatus === "saving" ? "Сохранение…" : "Сохранить"}
              </button>
            )}
          </div>
        </div>

        {/* индикатор сохранения */}
        {saveStatus === "success" && (
          <div
            style={{
              marginBottom: 16,
              padding: "8px 12px",
              borderRadius: 999,
              background: "rgba(22,163,74,0.12)",
              border: "1px solid rgba(22,163,74,0.6)",
              fontSize: 13,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ✅ Профиль сохранён
          </div>
        )}
        {saveStatus === "error" && (
          <div
            style={{
              marginBottom: 16,
              padding: "8px 12px",
              borderRadius: 999,
              background: "rgba(220,38,38,0.12)",
              border: "1px solid rgba(220,38,38,0.6)",
              fontSize: 13,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ⚠️ Ошибка при сохранении профиля
          </div>
        )}

        {/* нижняя сетка: слева — редактирование, справа — быстрые ссылки и посты */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 2fr)",
            gap: 20,
          }}
        >
          {/* левая колонка */}
          <div
            style={{
              background: cardBg,
              borderRadius: 24,
              padding: 20,
              border: `1px solid ${borderColor}`,
            }}
          >
            <div
              style={{
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#9ca3af",
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              Редактировать профиль
            </div>

            {/* полное имя */}
            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                Полное имя
              </div>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={!isEditing}
                placeholder="Например: Ihor Nepomiashchyi"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: `1px solid ${
                    isEditing ? accent : "rgba(55,65,81,0.8)"
                  }`,
                  background: "rgba(15,23,42,0.9)",
                  color: "white",
                  fontSize: 14,
                  outline: "none",
                }}
              />
            </div>

            {/* о себе */}
            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                О себе
              </div>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                disabled={!isEditing}
                placeholder="Коротко о себе..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: `1px solid ${
                    isEditing ? accent : "rgba(55,65,81,0.8)"
                  }`,
                  background: "rgba(15,23,42,0.9)",
                  color: "white",
                  fontSize: 14,
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>

            {/* аватар */}
            <div style={{ marginBottom: 4 }}>
              <div
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                Аватар (файл)
              </div>
              <input
                type="file"
                accept="image/*"
                disabled={!isEditing}
                onChange={handleAvatarFileChange}
                style={{
                  fontSize: 13,
                  color: "#e5e7eb",
                }}
              />
            </div>
          </div>

          {/* правая колонка */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* карточка счётчиков + быстрые ссылки */}
            <div
              style={{
                background: cardBg,
                borderRadius: 24,
                padding: 16,
                border: `1px solid ${borderColor}`,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {/* счётчики */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                {[
                  { label: "Посты", value: postsCount },
                  { label: "Лайки", value: likesCount },
                  { label: "Комментарии", value: commentsCount },
                  { label: "Друзья", value: friendsCount },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      borderRadius: 18,
                      padding: "10px 10px",
                      border: `1px solid rgba(148,163,184,0.4)`,
                      background:
                        "radial-gradient(circle at top, rgba(56,189,248,0.16), rgba(15,23,42,0.96))",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        color: "#9ca3af",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginBottom: 6,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* быстрые ссылки */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                  flexWrap: "wrap",
                  marginTop: 4,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                  }}
                >
                  Быстрые действия
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={goToPosts}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 999,
                      border: "1px solid rgba(148,163,184,0.6)",
                      background: "rgba(15,23,42,0.9)",
                      color: "#e5e7eb",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    Создать пост
                  </button>
                  <button
                    onClick={goToFeed}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 999,
                      border: "1px solid rgba(59,130,246,0.8)",
                      background:
                        "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(14,116,144,0.25))",
                      color: "#e5e7eb",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    Перейти к ленте
                  </button>
                  <button
                    onClick={goToReels}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 999,
                      border: "1px solid rgba(56,189,248,0.8)",
                      background:
                        "linear-gradient(135deg, rgba(8,47,73,0.9), rgba(17,24,39,0.95))",
                      color: "#e5e7eb",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    Открыть ролики
                  </button>
                </div>
              </div>
            </div>

            {/* карточка "Посты пользователя" */}
            <div
              style={{
                background: cardBg,
                borderRadius: 24,
                padding: 18,
                border: `1px solid ${borderColor}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "#9ca3af",
                    fontWeight: 600,
                  }}
                >
                  Посты пользователя
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                  }}
                >
                  AXIRO feed
                </div>
              </div>

              <div style={{ fontSize: 13, color: "#e5e7eb", lineHeight: 1.5 }}>
                Пока нет постов. Создай первый пост на странице{" "}
                <span
                  style={{
                    color: accent,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={goToPosts}
                >
                  «Посты».
                </span>
                <br />
                <br />
                В будущем здесь можно будет вывести:
                <ul
                  style={{
                    marginTop: 6,
                    paddingLeft: 18,
                    color: "#9ca3af",
                    fontSize: 12,
                  }}
                >
                  <li>последние публикации пользователя;</li>
                  <li>быстрые ссылки на ролики и ленту;</li>
                  <li>кнопку «Поделиться профилем» в соцсетях.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* полноэкранный просмотр аватара */}
        {avatarPreviewOpen && avatarUrl && (
          <div
            onClick={() => setAvatarPreviewOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              cursor: "zoom-out",
            }}
          >
            <img
              src={avatarUrl}
              alt="Avatar preview"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: 24,
                border: `2px solid ${accent}`,
                boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
                objectFit: "cover",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
