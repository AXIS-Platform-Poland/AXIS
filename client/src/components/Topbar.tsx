// client/src/components/Topbar.tsx
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";

type TopbarProps = {
  onToggleSidebar?: () => void; // оставляем проп, чтобы не ломались вызовы
};

const glass: React.CSSProperties = {
  background: "rgba(15,23,42,0.92)",
  borderRadius: 999,
  border: "1px solid rgba(148,163,184,0.55)",
  boxShadow:
    "0 18px 45px rgba(15,23,42,0.9), 0 0 40px rgba(59,130,246,0.35)",
  backdropFilter: "blur(22px)",
};

const iconButtonBase: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 999,
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  background: "transparent",
  color: "#e5e7eb",
  fontSize: 18,
  transition: "all 0.25s ease",
};

export default function Topbar(_props: TopbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [isDesktop, setIsDesktop] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const onResize = () => {
      if (typeof window === "undefined") return;
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const go = (path: string) => {
    if (location.pathname === path) return;
    navigate(path);
  };

  const isActive = (path: string) =>
    location.pathname === path ||
    (path === "/" && location.pathname === "/home");

  // ----- DESKTOP TOP BAR -----
  if (isDesktop) {
    return (
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          height: 56,
          display: "flex",
          alignItems: "center",
          padding: "8px 24px",
          boxSizing: "border-box",
          background:
            "linear-gradient(to bottom, rgba(3,7,18,0.92), rgba(3,7,18,0.75), transparent)",
        }}
      >
        {/* Слева — логотип / текст */}
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#e5e7eb",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#22c55e",
              boxShadow: "0 0 10px rgba(34,197,94,0.8)",
            }}
          />
          <span>AXIRO PROFILE</span>
        </div>

        {/* Справа — иконки */}
        <nav
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* Домой */}
          <button
            type="button"
            onClick={() => go("/")}
            style={{
              ...iconButtonBase,
              ...(isActive("/") && {
                background:
                  "radial-gradient(circle at 30% 0%, rgba(56,189,248,0.35), rgba(15,23,42,0.95))",
                boxShadow: "0 0 16px rgba(59,130,246,0.65)",
              }),
            }}
            title="Домой"
          >
            <span className="material-icons-round">home</span>
          </button>

          {/* Видео / Рилсы */}
          <button
            type="button"
            onClick={() => go("/reels")}
            style={{
              ...iconButtonBase,
              ...(isActive("/reels") && {
                background:
                  "radial-gradient(circle at 30% 0%, rgba(56,189,248,0.35), rgba(15,23,42,0.95))",
                boxShadow: "0 0 16px rgba(56,189,248,0.6)",
              }),
            }}
            title="Видео / Ролики"
          >
            <span className="material-icons-round">slideshow</span>
          </button>

          {/* Плюс — создать пост */}
          <button
            type="button"
            onClick={() => go("/posts")}
            style={{
              ...iconButtonBase,
              width: 40,
              height: 40,
              background:
                "radial-gradient(circle at 30% 0%, #3b82f6, #0ea5e9)",
              boxShadow:
                "0 0 22px rgba(37,99,235,0.85), 0 0 35px rgba(59,130,246,0.75)",
              color: "#e5e7eb",
            }}
            title="Создать пост"
          >
            <span className="material-icons-round">add</span>
          </button>

          {/* Чаты */}
          <button
            type="button"
            onClick={() => go("/friends")}
            style={{
              ...iconButtonBase,
              ...(isActive("/friends") && {
                background:
                  "radial-gradient(circle at 30% 0%, rgba(59,130,246,0.35), rgba(15,23,42,0.95))",
                boxShadow: "0 0 16px rgba(59,130,246,0.6)",
              }),
            }}
            title="Чаты / Друзья"
          >
            <span className="material-icons-round">chat</span>
          </button>

          {/* Языки (глобус) */}
          <div
            style={{
              ...iconButtonBase,
              padding: 0,
              width: "auto",
              height: "auto",
              background: "transparent",
              boxShadow: "none",
            }}
            title="Язык"
          >
            <LanguageSwitcher />
          </div>

          {/* Профиль */}
          <button
            type="button"
            onClick={() => go("/profile")}
            style={{
              ...iconButtonBase,
              ...(isActive("/profile") && {
                boxShadow: "0 0 18px rgba(251,191,36,0.7)",
                background:
                  "radial-gradient(circle at 30% 0%, rgba(251,191,36,0.35), rgba(15,23,42,0.95))",
              }),
              padding: 0,
            }}
            title="Мой профиль"
          >
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="avatar"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid rgba(248,250,252,0.85)",
                }}
              />
            ) : (
              <span className="material-icons-round">account_circle</span>
            )}
          </button>
        </nav>
      </header>
    );
  }

  // ----- MOBILE: ВЕРХНИЙ БАР + НИЖНИЙ ДОК -----
  return (
    <>
      {/* Верхний бар (только логотип + язык) */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          height: 48,
          padding: "8px 14px",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            "linear-gradient(to bottom, rgba(3,7,18,0.96), rgba(3,7,18,0.84), transparent)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#e5e7eb",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: "#22c55e",
              boxShadow: "0 0 10px rgba(34,197,94,0.8)",
            }}
          />
          <span>AXIRO PROFILE</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Нижний док с 5 иконками */}
      <nav
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 10,
          zIndex: 40,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            ...glass,
            pointerEvents: "auto",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            maxWidth: 360,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {/* Домой */}
          <button
            type="button"
            onClick={() => go("/")}
            style={{
              ...iconButtonBase,
              fontSize: 20,
              ...(isActive("/") && {
                background:
                  "radial-gradient(circle at 30% 0%, rgba(56,189,248,0.45), rgba(15,23,42,0.98))",
                boxShadow: "0 0 18px rgba(56,189,248,0.7)",
              }),
            }}
            title="Домой"
          >
            <span className="material-icons-round">home</span>
          </button>

          {/* Рилсы / Видео */}
          <button
            type="button"
            onClick={() => go("/reels")}
            style={{
              ...iconButtonBase,
              fontSize: 20,
              ...(isActive("/reels") && {
                background:
                  "radial-gradient(circle at 30% 0%, rgba(56,189,248,0.45), rgba(15,23,42,0.98))",
                boxShadow: "0 0 18px rgba(56,189,248,0.7)",
              }),
            }}
            title="Ролики"
          >
            <span className="material-icons-round">slideshow</span>
          </button>

          {/* Плюс — центр дока */}
          <button
            type="button"
            onClick={() => go("/posts")}
            style={{
              ...iconButtonBase,
              width: 44,
              height: 44,
              fontSize: 24,
              background:
                "radial-gradient(circle at 30% 0%, #3b82f6, #0ea5e9)",
              boxShadow:
                "0 0 26px rgba(37,99,235,0.9), 0 0 40px rgba(59,130,246,0.9)",
              color: "#f9fafb",
              transform: "translateY(-4px)",
            }}
            title="Создать пост"
          >
            <span className="material-icons-round">add</span>
          </button>

          {/* Чаты */}
          <button
            type="button"
            onClick={() => go("/friends")}
            style={{
              ...iconButtonBase,
              fontSize: 20,
              ...(isActive("/friends") && {
                background:
                  "radial-gradient(circle at 30% 0%, rgba(56,189,248,0.45), rgba(15,23,42,0.98))",
                boxShadow: "0 0 18px rgba(56,189,248,0.7)",
              }),
            }}
            title="Чаты / Друзья"
          >
            <span className="material-icons-round">chat</span>
          </button>

          {/* Профиль */}
          <button
            type="button"
            onClick={() => go("/profile")}
            style={{
              ...iconButtonBase,
              fontSize: 20,
              padding: 0,
              ...(isActive("/profile") && {
                boxShadow: "0 0 18px rgba(251,191,36,0.75)",
                background:
                  "radial-gradient(circle at 30% 0%, rgba(251,191,36,0.35), rgba(15,23,42,0.98))",
              }),
            }}
            title="Мой профиль"
          >
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="avatar"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid rgba(248,250,252,0.9)",
                }}
              />
            ) : (
              <span className="material-icons-round">account_circle</span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
