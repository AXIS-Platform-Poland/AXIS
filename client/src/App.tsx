// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import FriendsPage from "./pages/FriendsPage";
import ReelsPage from "./pages/ReelsPage";
import MarketplacePage from "./pages/MarketplacePage";
import SettingsPage from "./pages/SettingsPage";
import UIPreviewPage from "./pages/UIPreviewPage";
import ProfilePage from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

import { useAuth } from "./AuthContext";

export default function App() {
  const { user, loading, profile } = useAuth(); // profile — если есть в контексте
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // определяем мобильный экран
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // при смене страницы закрываем боковое меню
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // блокируем скролл под выезжающим меню
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
  }, [isSidebarOpen]);

  // загрузка
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#020617",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#e5e7eb",
        }}
      >
        Загрузка…
      </div>
    );
  }

  // если не залогинен — только AuthPage
  if (!user) {
    return (
      <div
        className="app-shell"
        style={{ minHeight: "100vh", background: "#020617", color: "#e5e7eb" }}
      >
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </div>
    );
  }

  // ==== функции переходов для нижнего бара ====
  const goHome = () => navigate("/posts");
  const goReels = () => navigate("/reels");
  const goCreate = () => navigate("/posts"); // позже можно сделать /posts?create=1
  const goMessenger = () => navigate("/friends");
  const goProfile = () => navigate("/profile");

  // маленький аватар для нижнего бара
  const avatarUrl = profile?.avatar_url;

  // основное приложение
  return (
    <div
      className="app-shell"
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#e5e7eb",
        display: "flex",
      }}
    >
      {/* Сайдбар слева на десктопе */}
      {!isMobile && (
        <aside
          style={{
            width: 260,
            flexShrink: 0,
            borderRight: "1px solid rgba(15,23,42,0.9)",
            background: "#020617",
          }}
        >
          <Sidebar />
        </aside>
      )}

      {/* Правая колонка: топбар + контент */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Верхняя полоса на мобиле: бургер + Topbar в одной линии */}
        {isMobile && (
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 12px",
              background:
                "linear-gradient(to right, rgba(15,23,42,0.98), rgba(15,23,42,0.9))",
              borderBottom: "1px solid rgba(31,41,55,0.9)",
            }}
          >
            <button
              onClick={() => setIsSidebarOpen(true)}
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                border: "1px solid rgba(148,163,184,0.6)",
                background: "rgba(15,23,42,0.9)",
                color: "#e5e7eb",
                fontSize: 16,
                lineHeight: 1,
                cursor: "pointer",
              }}
            >
              ☰
            </button>
            <div style={{ flex: 1, marginLeft: 8 }}>
              <Topbar />
            </div>
          </div>
        )}

        {/* Топбар на десктопе */}
        {!isMobile && (
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 20,
              borderBottom: "1px solid rgba(15,23,42,0.9)",
              background:
                "linear-gradient(to right, rgba(15,23,42,0.98), rgba(15,23,42,0.9))",
            }}
          >
            <Topbar />
          </div>
        )}

        {/* Основной контент с роутами */}
        <main
          style={{
            flex: 1,
            padding: "16px",
            paddingTop: isMobile ? 12 : 24,
            paddingBottom: isMobile ? 72 : 24, // отступ под нижний бар
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/posts" replace />} />
            <Route path="/posts" element={<HomePage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/reels" element={<ReelsPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/ui-preview" element={<UIPreviewPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="*" element={<Navigate to="/posts" replace />} />
          </Routes>
        </main>
      </div>

      {/* Выезжающий сайдбар на мобиле */}
      {isMobile && isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(15,23,42,0.85)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 260,
              maxWidth: "80vw",
              height: "100%",
              background: "#020617",
              borderRight: "1px solid rgba(31,41,55,0.9)",
              paddingTop: 8,
            }}
          >
            <Sidebar />
          </div>
        </div>
      )}

      {/* Нижняя мобильная навигация */}
      {isMobile && (
        <nav
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: 56,
            zIndex: 35,
            background:
              "linear-gradient(to top, rgba(15,23,42,0.98), rgba(15,23,42,0.95))",
            borderTop: "1px solid rgba(31,41,55,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            paddingInline: 12,
          }}
        >
          {/* Домой */}
          <button
            onClick={goHome}
            style={bottomBtnStyle(location.pathname.startsWith("/posts"))}
          >
            <span style={{ fontSize: 18 }}>🏠</span>
          </button>

          {/* Рилсы */}
          <button
            onClick={goReels}
            style={bottomBtnStyle(location.pathname.startsWith("/reels"))}
          >
            <span style={{ fontSize: 18 }}>🎬</span>
          </button>

          {/* Плюс */}
          <button
            onClick={goCreate}
            style={{
              ...bottomBtnStyle(false),
              width: 44,
              height: 44,
              borderRadius: 999,
              background:
                "linear-gradient(135deg, #38bdf8, #6366f1, #f97316)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 18px rgba(0,0,0,0.5)",
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 26, color: "#020617", marginTop: -2 }}>
              ＋
            </span>
          </button>

          {/* Мессенджер */}
          <button
            onClick={goMessenger}
            style={bottomBtnStyle(location.pathname.startsWith("/friends"))}
          >
            <span style={{ fontSize: 18 }}>💬</span>
          </button>

          {/* Профиль с аватаром */}
          <button
            onClick={goProfile}
            style={bottomBtnStyle(location.pathname.startsWith("/profile"))}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="me"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 999,
                  objectFit: "cover",
                  border: "2px solid #38bdf8",
                }}
              />
            ) : (
              <span style={{ fontSize: 18 }}>👤</span>
            )}
          </button>
        </nav>
      )}
    </div>
  );
}

// общий стиль для кнопок нижнего бара
function bottomBtnStyle(active: boolean) {
  return {
    width: 40,
    height: 40,
    borderRadius: 999,
    border: active
      ? "1px solid rgba(148,163,184,0.9)"
      : "1px solid rgba(31,41,55,0.9)",
    background: active ? "rgba(15,23,42,0.95)" : "rgba(15,23,42,0.9)",
    color: active ? "#e5e7eb" : "#9ca3af",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    cursor: "pointer",
  } as React.CSSProperties;
}
