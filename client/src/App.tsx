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

/* ---------------- PROTECTED ROUTE ---------------- */

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
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}

/* ---------------- MAIN APP ---------------- */

export default function App() {
  const location = useLocation();
  const { user } = useAuth();

  const isAuthRoute = location.pathname.startsWith("/auth");

  /* ---------------- AUTH PAGE ---------------- */

  if (isAuthRoute) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */

  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      {/* ===== ГЛУБИННЫЙ ФОН ===== */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 20%, rgba(0,200,255,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,0,200,0.15), transparent 40%), #0b0b0f",
          zIndex: 0
        }}
      />

      {/* ===== КОНТЕНТ ===== */}
      <div className="relative z-10 min-h-screen flex">

        {/* SIDEBAR */}
        <Sidebar />

        {/* RIGHT SIDE */}
        <div
          className="flex-1 min-w-0 relative"
          style={{
            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.04)",
            borderLeft: "1px solid rgba(255,255,255,0.08)"
          }}
        >
          <Topbar />

          <main className="p-6">
            <RequireAuth>
              <Routes>
                <Route path="/" element={<Navigate to="/settings" replace />} />
                <Route path="/posts" element={<HomePage />} />
                <Route path="/friends" element={<FriendsPage />} />
                <Route path="/reels" element={<ReelsPage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/ui" element={<UIPreviewPage />} />
                <Route path="*" element={<Navigate to="/settings" replace />} />
              </Routes>
            </RequireAuth>
          </main>
        </div>
      </div>
    </div>
  );
}
