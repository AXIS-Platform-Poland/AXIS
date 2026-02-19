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

  const [postsCount, setPostsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [friendsCount, setFriendsCount] = useState(0);

  const [avatarPreviewOpen, setAvatarPreviewOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // --- адаптация под мобильный экран ---
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      const { count: posts } = await supabase
        .from("freed_posts")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      setPostsCount(posts || 0);
      // пока заглушки
      setLikesCount(0);
      setCommentsCount(0);
      setFriendsCount(0);
    };

    loadProfile();
    loadCounters();
  }, [user]);

  // --- навигация ---
  const goBack = () => navigate(-1);
  const goToPosts = () => navigate("/posts");     // «Создать пост»
  const goToFeed = () => navigate("/posts");      // пока туда же
  const goToReels = () => navigate("/reels");
  const goToEditProfile = () => navigate("/edit-profile");

  const displayName =
    fullName && fullName.trim().length > 0
      ? fullName
      : user?.email || "Без имени";

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: isMobile ? "16px 12px 24px" : "24px",
        paddingTop: isMobile ? "80px" : "88px",
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
            padding: isMobile ? "16px" : "20px 24px",
            border: `1px solid ${borderColor}`,
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.9)",
            marginBottom: isMobile ? 16 : 20,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* левая часть */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              width: "100%",
            }}
          >
            {/* аватар */}
            <div
              style={{
                width: isMobile ? 64 : 72,
                height: isMobile ? 64 : 72,
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
                flexShrink: 0,
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? 18 : 20,
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    wordBreak: "break-word",
                  }}
                >
                  {displayName}
                </div>

                {/* бейдж */}
                <span
                  style={{
                    alignSelf: "flex-start",
                    padding: "2px 8px",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(59,130,246,0.08))",
                    border: "1px solid rgba(56,189,248,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                    fontSize: 11,
                    color: "#e5e7eb",
                  }}
                >
                  Owner • INGVARR Sp. z o.o.
                </span>
              </div>

              {/* ID */}
              {user && (
                <div
                  style={{
                    fontSize: 11,
                    color: "#9ca3af",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 4,
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ opacity: 0.8 }}>ID:</span>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 11,
                      background: "rgba(15,23,42,0.9)",
                      padding: "3px 6px",
                      borderRadius: 6,
                      border: "1px solid rgba(148,163,184,0.5)",
                    }}
                  >
                    {user.id}
                  </span>
                </div>
              )}

              {/* короткое "о себе" под именем (только текст, без редактирования) */}
              {about && about.trim().length > 0 && (
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 12,
                    color: "#e5e7eb",
                    maxWidth: isMobile ? "100%" : 480,
                    opacity: 0.9,
                  }}
                >
                  {about}
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
              justifyContent: isMobile ? "flex-start" : "flex-end",
              width: isMobile ? "100%" : "auto",
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
                fontSize: 13,
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
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Поделиться
            </button>

            <button
              onClick={goToEditProfile}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                border: "none",
                background:
                  "linear-gradient(135deg, #fb923c, #f97316, #facc15)",
                color: "#111827",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Редактировать
            </button>
          </div>
        </div>

        {/* нижняя часть: счётчики + посты пользователя */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "minmax(0, 1fr)"
              : "minmax(0, 2fr) minmax(0, 2fr)",
            gap: 16,
          }}
        >
          {/* левая колонка — счётчики + быстрые действия */}
          <div
            style={{
              background: cardBg,
              borderRadius: 24,
              padding: isMobile ? 14 : 16,
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
                gridTemplateColumns: isMobile
                  ? "repeat(2, minmax(0, 1fr))"
                  : "repeat(4, minmax(0, 1fr))",
                gap: 10,
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

            {/* быстрые действия */}
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "flex-start" : "center",
                justifyContent: "space-between",
                gap: 8,
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

          {/* правая колонка — посты пользователя */}
          <div
            style={{
              background: cardBg,
              borderRadius: 24,
              padding: isMobile ? 14 : 18,
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

            <div
              style={{
                fontSize: 13,
                color: "#e5e7eb",
                lineHeight: 1.5,
              }}
            >
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
                <li>ролики;</li>
                <li>ссылки на соцсети.</li>
              </ul>
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
