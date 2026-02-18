import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

const iconStyle = (isActive: boolean): React.CSSProperties => ({
  padding: "8px 12px",
  borderRadius: 12,
  textDecoration: "none",
  color: "white",
  background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
});

type TopbarProps = {
  // если захочешь привязать к выезжающему меню на мобиле
  onMenuToggle?: () => void;
};

export default function Topbar({ onMenuToggle }: TopbarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const calc = () => setIsMobile(window.innerWidth <= 768);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <div
      style={{
        height: 56,
        background: "#141414",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {/* Hamburger (для мобилки) */}
        {isMobile && (
          <button
            type="button"
            onClick={() => onMenuToggle?.()}
            style={{
              padding: "8px 12px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "white",
              cursor: "pointer",
            }}
            aria-label="Menu"
            title="Menu"
          >
            ☰
          </button>
        )}

        {/* Icons */}
        <NavLink to="/" style={({ isActive }) => iconStyle(isActive)} title="Посты">
          🏠
        </NavLink>

        <NavLink
          to="/friends"
          style={({ isActive }) => iconStyle(isActive)}
          title="Друзья"
        >
          👥
        </NavLink>

        <NavLink to="/reels" style={({ isActive }) => iconStyle(isActive)} title="Рилсы">
          🎬
        </NavLink>

        <NavLink
          to="/marketplace"
          style={({ isActive }) => iconStyle(isActive)}
          title="Маркетплейс"
        >
          🛒
        </NavLink>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {/* Language */}
        <LanguageSwitcher />

        {/* Profile */}
        <NavLink
          to="/profile"
          style={({ isActive }) => iconStyle(isActive)}
          title="Профиль"
        >
          👤
        </NavLink>

        {/* Login/Register */}
        <NavLink
          to="/auth"
          style={({ isActive }) => iconStyle(isActive)}
          title="Вход / Регистрация"
        >
          🔑
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/settings"
          style={({ isActive }) => iconStyle(isActive)}
          title="Настройки"
        >
          ⚙️
        </NavLink>
      </div>
    </div>
  );
}
