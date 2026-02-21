// src/components/layout/BottomNav.tsx
import React from "react";

export type TabId = "feed" | "reels" | "chats" | "profile" | "settings";

type BottomNavProps = {
  currentTab: TabId;
  onChange(tab: TabId): void;
};

/**
 * BottomNav — нижняя навигация AXIRO.
 * Отвечает только за отображение и выбор вкладки.
 * Какой экран показывать — решает App.tsx.
 */
const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChange }) => {
  const makeItem = (tab: TabId, label: string, icon: string) => {
    const isActive = currentTab === tab;

    return (
      <button
        key={tab}
        type="button"
        className={`nav-item ${isActive ? "nav-item-active" : ""}`}
        onClick={() => onChange(tab)}
      >
        <div className="nav-icon" aria-hidden="true">
          {icon}
        </div>
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
