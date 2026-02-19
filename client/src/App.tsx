import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import FriendsPage from "./pages/FriendsPage";
import ReelsPage from "./pages/ReelsPage";
import MarketplacePage from "./pages/MarketplacePage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/Profile";
import EditProfilePage from "./pages/EditProfile";
import UIPreviewPage from "./pages/UIPreviewPage";

import { useAuth } from "./AuthContext";

export default function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // небольшой прелоадер при старте приложения
  const [bootReady, setBootReady] = useState(false);
  // режим «UI дизайн» (включается хоткеем, просто красивый бейдж)
  const [designMode, setDesignMode] = useState(false);

  // блокируем скролл пока грузится приложение, потом включаем
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setBootReady(true);
      document.body.style.overflow = prev || "auto";
    }, 300);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prev || "auto";
    };
  }, []);

  // хоткей Ctrl+Shift+D — включить / выключить «UI Design Mode»
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyD") {
        e.preventDefault();
        setDesignMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // глобальный лоадер, пока проверяется сессия / стартует приложение
  if (!bootReady || loading) {
    return (
      <div
        className="app-shell"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: "white",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "999px",
              border: "3px solid rgba(255,255,255,0.15)",
              borderTopColor: "rgba(255,255,255,0.9)",
              margin: "0 auto 16px",
              animation: "spin 1s linear infinite",
            }}
          />
          <div style={{ fontSize: 18, fontWeight: 500 }}>AXIS Platform</div>
          <div style={{ opacity: 0.6, marginTop: 4 }}>Загрузка интерфейса…</div>
        </div>
      </div>
    );
  }

  // если юзер не залогинен и это не /auth — кидаем на авторизацию
  if (!user && location.pathname !== "/auth") {
    return <Navigate to="/auth" replace />;
  }

  // если юзер залогинен и открыл /auth — редирект в посты
  if (user && location.pathname === "/auth") {
    return <Navigate to="/posts" replace />;
  }

  return (
    <div className="app-root">
      <div className="app-layout">
        {/* Сайдбар слева (на мобиле он сам адаптируется внутри компонента) */}
        {user && (
          <aside className="app-sidebar">
            <Sidebar />
          </aside>
        )}

        {/* Правая часть: топбар + контент */}
        <div className="app-main">
          {user && (
            <header className="app-topbar">
              <Topbar />
            </header>
          )}

          <main className="app-content">
            <Routes>
              {/* Авторизация */}
              <Route path="/auth" element={<AuthPage />} />

              {/* Главная лента / посты */}
              <Route path="/posts" element={<HomePage />} />

              {/* Друзья / ролики / маркетплейс / настройки */}
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/reels" element={<ReelsPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/settings" element={<SettingsPage />} />

              {/* Профиль и отдельная страница редактирования профиля */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/edit-profile" element={<EditProfilePage />} />

              {/* Страница для тестов интерфейса */}
              <Route path="/ui-preview" element={<UIPreviewPage />} />

              {/* Редиректы по умолчанию */}
              <Route
                path="/"
                element={<Navigate to={user ? "/posts" : "/auth"} replace />}
              />
              <Route
                path="*"
                element={<Navigate to={user ? "/posts" : "/auth"} replace />}
              />
            </Routes>
          </main>
        </div>
      </div>

      {/* Бейдж «UI Design Mode» — чисто визуальная штука */}
      {designMode && (
        <div
          style={{
            position: "fixed",
            right: 16,
            bottom: 16,
            padding: "10px 16px",
            borderRadius: 999,
            background:
              "linear-gradient(135deg, rgba(0,199,255,0.25), rgba(255,140,0,0.45))",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.25)",
            fontSize: 11,
            letterSpacing: 0.7,
            textTransform: "uppercase",
            color: "white",
            zIndex: 80,
          }}
        >
          UI Design Mode • Ctrl+Shift+D
        </div>
      )}
    </div>
  );
}
