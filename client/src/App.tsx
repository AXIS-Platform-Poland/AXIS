import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./App.css";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import FriendsPage from "./pages/FriendsPage";
import ReelsPage from "./pages/ReelsPage";
import MarketplacePage from "./pages/MarketplacePage";
import SettingsPage from "./pages/SettingsPage";

import { useAuth } from "./AuthContext";
import ProfilePage from "./pages/Profile";

export default function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  // Закрывать мобильное меню при смене страницы
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // ESC закрывает меню
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Блокируем скролл фона когда меню открыто
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  if (loading) {
    return (
      <div className="appRoot">
        <div className="contentShell" style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
          Loading...
        </div>
      </div>
    );
  }

  // Если не залогинен — показываем только /auth
  if (!user) {
    return (
      <div className="appRoot">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className={`appRoot ${menuOpen ? "isMenuOpen" : ""}`}>
      {/* overlay + drawer только для мобилки (CSS сам скрывает на десктопе) */}
      <div className="mobileOverlay" onClick={() => setMenuOpen(false)} />
      <aside className="mobileDrawer" aria-hidden={!menuOpen}>
        <Sidebar />
      </aside>

      <div className="appLayout">
        {/* Десктопный сайдбар */}
        <aside className="sidebarShell">
          <Sidebar />
        </aside>

        <div className="mainShell">
          <header className="topbarShell">
            {/* В Topbar добавляем слева бургер.
                Если у тебя Topbar уже рисует свои кнопки — просто покажет рядом. */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button
                type="button"
                className="burgerBtn"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Menu"
                title="Menu"
              >
                {/* простая иконка (без зависимостей) */}
                <span style={{ fontSize: 18, lineHeight: 1 }}>☰</span>
              </button>

              <div style={{ flex: 1, minWidth: 0 }}>
                <Topbar />
              </div>
            </div>
          </header>

          <main className="contentShell">
            <Routes>
              <Route path="/" element={<Navigate to="/posts" replace />} />

              <Route path="/posts" element={<HomePage />} />
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/reels" element={<ReelsPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
<Route path="/profile/:id" element={<ProfilePage />} />

              <Route path="*" element={<Navigate to="/posts" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}
