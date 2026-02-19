// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import FriendsPage from "./pages/FriendsPage";
import ReelsPage from "./pages/ReelsPage";
import MarketplacePage from "./pages/MarketplacePage";
import ProfilePage from "./pages/Profile";
import SettingsPage from "./pages/SettingsPage";
import UIPreviewPage from "./pages/UIPreviewPage";
import EditProfilePage from "./pages/EditProfile";

import LanguageSwitcher from "./components/LanguageSwitcher";

const layoutCss = `
.axis-app-shell {
  min-height: 100vh;
  background: radial-gradient(circle at top, #020617, #020617 40%, #000 100%);
  color: #ffffff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  position: relative;
}

/* верхний угол – только утилиты (языки и т.д.) */
.axis-top-utility {
  position: fixed;
  right: 16px;
  top: 10px;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* контейнер для роутов */
.axis-app-content {
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 12px 96px;
}

/* на десктопе контент чуть шире и отступы больше */
@media (min-width: 1024px) {
  .axis-app-content {
    padding: 96px 24px 120px;
  }
}

/* ---------- ГЛОБАЛЬНЫЙ ДОК (НОВЫЙ) ---------- */

.axis-dock-shell {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 10px;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: 40;
}

/* на десктопе переносим док вверх */
@media (min-width: 1024px) {
  .axis-dock-shell {
    bottom: auto;
    top: 16px;
  }
}

.axis-dock {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 10px 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  max-width: 420px;
  width: calc(100% - 32px);
}

/* элементы дока */
.axis-dock-item {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 999px;
  border: 1px solid transparent;
  background: transparent;
  color: #e5e7eb;
  padding: 8px 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
  text-decoration: none;
}

.axis-dock-item i {
  font-size: 1rem;
}

/* центральная кнопка + (акцент) */
.axis-dock-item--primary {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: #020617;
  box-shadow: 0 10px 28px rgba(59, 130, 246, 0.8);
}

.axis-dock-item--primary i {
  color: #020617;
}

/* активная вкладка */
.axis-dock-item--active {
  background: rgba(15, 23, 42, 0.9);
  border-color: rgba(248, 250, 252, 0.5);
  color: #ffffff;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.9);
}

/* мини-аватар в доке */
.axis-dock-avatar {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid rgba(248, 250, 252, 0.8);
  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.95);
}

.axis-dock-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.axis-dock-item:hover {
  transform: translateY(-1px) scale(1.03);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.9);
}

.axis-dock-item:not(.axis-dock-item--primary):hover {
  background: rgba(15, 23, 42, 0.9);
  border-color: rgba(148, 163, 184, 0.8);
}
`;

function GlobalDock() {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;

  const go = (to: string) => {
    if (to === path) return;
    navigate(to);
  };

  return (
    <>
      <style>{layoutCss}</style>

      <div className="axis-dock-shell">
        <nav className="axis-dock" aria-label="AXIRO navigation">
          {/* Домой / лента */}
          <button
            type="button"
            className={
              "axis-dock-item" + (path === "/posts" || path === "/" ? " axis-dock-item--active" : "")
            }
            onClick={() => go("/posts")}
          >
            <i className="fas fa-house" />
          </button>

          {/* Reels */}
          <button
            type="button"
            className={"axis-dock-item" + (path === "/reels" ? " axis-dock-item--active" : "")}
            onClick={() => go("/reels")}
          >
            <i className="fas fa-clapperboard" />
          </button>

          {/* Плюс – создать пост */}
          <button
            type="button"
            className="axis-dock-item axis-dock-item--primary"
            onClick={() => go("/posts")}
          >
            <i className="fas fa-plus" />
          </button>

          {/* Сообщения / друзья */}
          <button
            type="button"
            className={"axis-dock-item" + (path === "/friends" ? " axis-dock-item--active" : "")}
            onClick={() => go("/friends")}
          >
            <i className="fas fa-comments" />
          </button>

          {/* Профиль */}
          <button
            type="button"
            className={"axis-dock-item" + (path === "/profile" ? " axis-dock-item--active" : "")}
            onClick={() => go("/profile")}
          >
            <div className="axis-dock-avatar">
              <img
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Profile"
              />
            </div>
          </button>
        </nav>
      </div>
    </>
  );
}

function AppInner() {
  const { user, loading } = useAuth();
  const location = useLocation();

  const isAuthed = !!user;

  if (!loading && !isAuthed && location.pathname !== "/auth") {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="axis-app-shell">
      {/* маленький блок сверху справа – только переключатель языка */}
      <div className="axis-top-utility">
        <LanguageSwitcher />
      </div>

      <div className="axis-app-content">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />

          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<HomePage />} />

          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/reels" element={<ReelsPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />

          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/ui-preview" element={<UIPreviewPage />} />

          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
      </div>

      {/* Новый стеклянный док – снизу на мобиле, сверху на десктопе */}
      <GlobalDock />
    </div>
  );
}

export default function App() {
  // здесь можно добавить любой "первый показ" / прелоадер, если тебе нужен
  return <AppInner />;
}
