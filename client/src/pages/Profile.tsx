// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { supabase } from "../supabaseClient";

const cardBg = "rgba(15, 23, 42, 0.9)";
const accent = "#38bdf8";
const borderColor = "rgba(148, 163, 184, 0.4)";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [fullName, setFullName] = useState("");
  const [about, setAbout] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [postsCount, setPostsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [friendsCount, setFriendsCount] = useState(0);

  const [avatarPreviewOpen, setAvatarPreviewOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ----- responsive: определяем мобильный экран -----
  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 900);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ----- загрузка профиля и счётчиков -----
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
        // если в контексте есть профиль — хотя бы его покажем
        if (profile) {
          setFullName(profile.full_name || "");
          setAbout(profile.bio || "");
          setAvatarUrl(profile.avatar_url || "");
        }
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

      // лайки / комментарии / друзья — заглушки
      setLikesCount(0);
      setCommentsCount(0);
      setFriendsCount(0);
    };

    loadProfile();
    loadCounters();
  }, [user, profile]);

  // ----- навигация -----
  const goBack = () => navigate(-1);
  const goToPosts = () => navigate("/posts");
  const goToFeed = () => navigate("/posts");
  const goToReels = () => navigate("/reels");
  const goToEdit = () => navigate("/edit-profile");

  const displayName =
    fullName && fullName.trim().length > 0
      ? fullName
      : user?.email || "Без имени";

  // ----- UI -----
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: isMobile ? "12px 8px 24px" : "24px",
        paddingTop: isMobile ? "72px" : "96px",
        boxSizing: "border-box",
        background:
          "radial-gradient(circle at top left, #0f172a 0, #020617 45%, #000 100%)",
        color: "white",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: isMobile ? 640 : 1120, // как в инсте — не на весь монитор
          margin: "0 auto",
        }}
      >
        {/* верхняя карточка с аватаром и кнопками */}
        <div
          style={{
            background: cardBg,
            borderRadius: isMobile ? 18 : 24,
            padding: isMobile ? "14px 14px" : "20px 24px",
            border: `1px solid ${borderColor}`,
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.9)",
            marginBottom: isMobile ? 14 : 20,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: isMobile ? 12 : 16,
          }}
        >
          {/* левая часть */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 12 : 16,
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
                fontSize: isMobile ? 24 : 28,
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

            {/* имя + статус + ID */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? 17 : 20,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                {displayName}
              </div>

              {/* бейдж Owner */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 10,
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
                    fontSize: 10,
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
                      fontSize: 10,
                      background: "rgba(15,23,42,0.9)",
                      padding: "2px 6px",
                      borderRadius: 6,
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
              justifyContent: isMobile ? "flex-start" : "flex-end",
            }}
          >
            <button
              onClick={goBack}
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
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid rgba(148,163,184,0.6)",
                background:
                  "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(96,165,250,0.15))",
                color: "#e5e7eb",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Поделиться
            </button>

            <button
              onClick={goToEdit}
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                border: "none",
                background:
                  "linear-gradient(135deg, #fb923c, #f97316, #facc15)",
                color: "#111827",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Редактировать
            </button>
          </div>
        </div>

        {/* нижний блок: счётчики + быстрые действия + посты */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "minmax(0, 1fr)"
              : "minmax(0, 2fr) minmax(0, 2fr)",
            gap: isMobile ? 12 : 20,
          }}
        >
          {/* левая колонка: счётчики + быстрые действия */}
          <div
            style={{
              background: cardBg,
              borderRadius: isMobile ? 18 : 24,
              padding: isMobile ? 14 : 18,
              border: `1px solid ${borderColor}`,
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
                marginBottom: 10,
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
                    borderRadius: 16,
                    padding: isMobile ? "8px 8px" : "10px 10px",
                    border: `1px solid rgba(148,163,184,0.4)`,
                    background:
                      "radial-gradient(circle at top, rgba(56,189,248,0.16), rgba(15,23,42,0.96))",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? 16 : 18,
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
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                flexWrap: "wrap",
                marginTop: 4,
              }}
            >
              <div
                style={{
                  fontSize: 10,
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
                  style={quickBtnStyle(false)}
                >
                  Создать пост
                </button>
                <button
                  onClick={goToFeed}
                  style={quickBtnStyle(true)}
                >
                  Перейти к ленте
                </button>
                <button
                  onClick={goToReels}
                  style={quickBtnStyle(false)}
                >
                  Открыть ролики
                </button>
              </div>
            </div>
          </div>

          {/* правая колонка: посты пользователя */}
          <div
            style={{
              background: cardBg,
              borderRadius: isMobile ? 18 : 24,
              padding: isMobile ? 14 : 18,
              border: `1px solid ${borderColor}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  fontSize: 12,
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
                  fontSize: 10,
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
                lineHeight: 1.4,
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
                  marginTop: 4,
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

function quickBtnStyle(primary: boolean): React.CSSProperties {
  return {
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 12,
    cursor: "pointer",
    border: primary
      ? "1px solid rgba(59,130,246,0.8)"
      : "1px solid rgba(148,163,184,0.6)",
    background: primary
      ? "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(14,116,144,0.25))"
      : "rgba(15,23,42,0.9)",
    color: "#e5e7eb",
  };
}
