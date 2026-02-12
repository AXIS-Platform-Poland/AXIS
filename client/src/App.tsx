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

import { useAuth } from "./AuthContext";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    // кидаем на /auth и запоминаем откуда пришёл
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}

export default function App() {
  const location = useLocation();
  const { user, loading } = useAuth();

  const isAuthRoute = location.pathname.startsWith("/auth");

  // ✅ Страница /auth — БЕЗ Sidebar/Topbar
  if (isAuthRoute) {
    // если уже залогинен — на settings
    if (!loading && user) {
      return <Navigate to="/settings" replace />;
    }

    return (
      <div className="min-h-screen bg-[#0b0b0f] text-white">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </div>
    );
  }

  // ✅ Все остальные страницы — только после логина
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <div className="flex">
        {/* Sidebar слева */}
        <Sidebar />

        {/* Правая часть */}
        <div className="flex-1 min-w-0 relative z-0">
          <Topbar />

          <main className="relative z-0 px-4 pb-10">
            <RequireAuth>
              <Routes>
                {/* если зайти на / — перекинет на /settings (или поменяй на /posts если хочешь) */}
                <Route path="/" element={<Navigate to="/settings" replace />} />

                <Route path="/posts" element={<HomePage />} />
                <Route path="/friends" element={<FriendsPage />} />
                <Route path="/reels" element={<ReelsPage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/settings" element={<SettingsPage />} />

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
