import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import HomePage from "./pages/HomePage";
import FriendsPage from "./pages/FriendsPage";
import ReelsPage from "./pages/ReelsPage";
import MarketplacePage from "./pages/MarketplacePage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Topbar />
          <div style={{ padding: 16 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/reels" element={<ReelsPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/settings" element={<SettingsPage />} />

              {/* запасной маршрут */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
