import { useMemo, useState } from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

import HomePage from "./pages/HomePage";
import FriendsPage from "./pages/FriendsPage";
import ReelsPage from "./pages/ReelsPage";
import MarketplacePage from "./pages/MarketplacePage";
import SettingsPage from "./pages/SettingsPage";

export type NavKey = "home" | "friends" | "reels" | "marketplace" | "settings";

export default function App() {
  const [active, setActive] = useState<NavKey>("home");

  const page = useMemo(() => {
    switch (active) {
      case "friends":
        return <FriendsPage />;
      case "reels":
        return <ReelsPage />;
      case "marketplace":
        return <MarketplacePage />;
      case "settings":
        return <SettingsPage />;
      case "home":
      default:
        return <HomePage />;
    }
  }, [active]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Topbar />

      <div className="mx-auto flex w-full max-w-[1400px] gap-4 px-3 pb-10 pt-3">
        <aside className="hidden w-[280px] shrink-0 md:block">
          <Sidebar active={active} onChange={setActive} />
        </aside>

        <main className="w-full">
          {/* Mobile nav */}
          <div className="mb-3 md:hidden">
            <Sidebar active={active} onChange={setActive} variant="mobile" />
          </div>

          {page}
        </main>
      </div>
    </div>
  );
}
