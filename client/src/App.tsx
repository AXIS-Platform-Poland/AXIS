// client/src/App.tsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import HomePage from "./pages/HomePage";
import FriendsPage from "./pages/FriendsPage";
import ReelsPage from "./pages/ReelsPage";
import MarketplacePage from "./pages/MarketplacePage";
import SettingsPage from "./pages/SettingsPage";
import AuthPage from "./pages/AuthPage";
import UIPreviewPage from "./pages/UIPreviewPage";

import { useAuth } from "./AuthContext";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}

export default function App() {
  const location = useLocation();
  const isAuthRoute = location.pathname.startsWith("/auth");

  // ✅ Страница /auth — без Sidebar/Topbar
  if (isAuthRoute) {
    return (
      <div className="min-h-screen text-white relative overflow-hidden">
        {/* Background gradient */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 20%, rgba(128,119,180,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,0,128,0.12), transparent 40%), #0b0b0f",
            zIndex: 0,
          }}
        />

        <div className="relative z-10 min-h-screen">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </div>
      </div>
    );
  }

  // ✅ Все остальные страницы — только после логина
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background gradient */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 20%, rgba(128,119,180,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,0,128,0.12), transparent 40%), #0b0b0f",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Sidebar слева */}
        <Sidebar />

        {/* Правая часть */}
        <div
          className="flex-1 min-w-0 relative"
          style={{
            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.03)",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Topbar />

          <main className="relative z-0 px-4 pb-10">
            <RequireAuth>
              <Routes>
                {/* если зайти на / — перекинет на /settings */}
                <Route path="/" element={<Navigate to="/settings" replace />} />

                <Route path="/posts" element={<HomePage />} />
                <Route path="/friends" element={<FriendsPage />} />
                <Route path="/reels" element={<ReelsPage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/settings" element={<SettingsPage />} />

                {/* если ты используешь страницу предпросмотра UI */}
                <Route path="/ui" element={<UIPreviewPage />} />

                {/* на всякий случай */}
                <Route path="*" element={<Navigate to="/settings" replace />} />
              </Routes>
            </RequireAuth>
          </main>
        </div>
      </div>
    </div>
  );
}
