import React from "react";

export type TabId = "feed" | "reels" | "chats" | "profile" | "settings";

type BottomNavProps = {
  currentTab: TabId;
  onChange(tab: TabId): void;
};

const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChange }) => {
  const makeItem = (tab: TabId, label: string, icon: string) => {
    const isActive = currentTab === tab;
    return (
      <button
        key={tab}
        className={`nav-item ${isActive ? "nav-item-active" : ""}`}
        onClick={() => onChange(tab)}
      >
        <div className="nav-icon">{icon}</div>
        <span>{label}</span>
      </button>
    );
  };

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-inner">
        {makeItem("feed", "Лента", "🏠")}
        {makeItem("reels", "Видео", "▶️")}
        {makeItem("chats", "Чаты", "✉️")}
        {makeItem("profile", "Профиль", "👤")}
        {makeItem("settings", "Настройки", "⚙️")}
      </div>
    </nav>
  );
};

export default BottomNav;
