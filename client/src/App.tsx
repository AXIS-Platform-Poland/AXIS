import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FriendsPage from "./pages/FriendsPage";
import MarketplacePage from "./pages/MarketplacePage";
import ReelsPage from "./pages/ReelsPage";
import SettingsPage from "./pages/SettingsPage";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default function App() {
  return (
    <Router>
      <div className="flex w-full h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Topbar />

          <div className="p-4 overflow-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/reels" element={<ReelsPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
