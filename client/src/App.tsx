import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./App.css";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import FriendsPage from "./pages/FriendsPage";
import ReelsPage from "./pages/ReelsPage";
import MarketplacePage from "./pages/MarketplacePage";
import SettingsPage from "./pages/SettingsPage";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { useAuth } from "./AuthContext";

export default function App() {
  const { user } = useAuth();
  const location = useLocation();

  // Drawer (моб. меню)
  const [drawerOpen, setDrawerOpen] = useState(false);

  // закрывать drawer при смене страницы
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // закрывать по Esc
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const isAuthed = !!user;

  // стили layout
  const shellStyle: React.CSSProperties = {
    minHeight: "100vh",
    color: "white",
    position: "relative",
    overflow: "hidden",
  };

  const bgStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 0,
    background:
      "radial-gradient(circle at 20% 20%, rgba(128,119,198,0.18), transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,0,128,0.12), transparent 40%), #070A10",
  };

  const contentWrapStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
    display: "flex",
    minHeight: "100vh",
  };

  // Desktop sidebar
  const desktopSidebarStyle: React.CSSProperties = {
    display: "none",
  };

  // Desktop включаем через медиазапрос (inline нельзя), поэтому через маленький трюк:
  // покажем desktop sidebar через className и css в App.css (ниже напишу)
  // Но чтобы без правок css тоже работало — оставим и моб-лейаут.
  // Мы сделаем так: sidebar для desktop будет visible начиная с 1024px через CSS.

  const mainStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
  };

  const pageStyle: React.CSSProperties = {
    padding: 16,
  };

  // Роуты только после логина
  const appRoutes = (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/friends" element={<FriendsPage />} />
      <Route path="/reels" element={<ReelsPage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  return (
    <div style={shellStyle}>
      <div style={bgStyle} />

      {/* Если не залогинен — только Auth */}
      {!isAuthed ? (
        <div style={{ position: "relative", zIndex: 1 }}>
          <AuthPage />
        </div>
      ) : (
        <div style={contentWrapStyle}>
          {/* DESKTOP SIDEBAR (виден только на больших экранах через CSS) */}
          <div className="axis-desktop-sidebar" style={desktopSidebarStyle}>
            <Sidebar />
          </div>

          {/* MOBILE DRAWER */}
          {drawerOpen && (
            <div
              className="axis-drawer-overlay"
              onClick={() => setDrawerOpen(false)}
              role="button"
              aria-label="Close menu"
            />
          )}

          <div
            className={`axis-drawer ${drawerOpen ? "open" : ""}`}
            role="dialog"
            aria-modal="true"
          >
            <Sidebar variant="mobile" onNavigate={() => setDrawerOpen(false)} />
          </div>

          {/* MAIN */}
          <div style={mainStyle}>
            <Topbar
              onMenuClick={() => setDrawerOpen((v) => !v)}
              showMenuButton
            />
            <div style={pageStyle}>{appRoutes}</div>
          </div>
        </div>
      )}
    </div>
  );
}
