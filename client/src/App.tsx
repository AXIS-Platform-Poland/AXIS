import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import HomePage from "./pages/HomePage";
import FriendsPage from "./pages/FriendsPage";
import ReelsPage from "./pages/ReelsPage";
import MarketplacePage from "./pages/MarketplacePage";
import SettingsPage from "./pages/SettingsPage";
import AuthPage from "./pages/AuthPage"; // ✅ ДОБАВИЛИ

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <div className="flex">
        {/* Sidebar всегда поверх */}
        <Sidebar />

        {/* Правая часть */}
        <div className="flex-1 min-w-0 relative z-0">
          <Topbar />

          {/* ВАЖНО: чтобы кликабельные элементы не перекрывались сайдбаром */}
          <main className="relative z-0 px-4 pb-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/reels" element={<ReelsPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/settings" element={<SettingsPage />} />

              {/* ✅ ДОБАВИЛИ страницу логина/регистрации */}
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}
