import { NavLink } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

const iconStyle = ({ isActive }: { isActive: boolean }) => ({
  padding: "8px 12px",
  borderRadius: 10,
  textDecoration: "none",
  color: "white",
  background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
  cursor: "pointer",
});

export default function Topbar() {
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
      }}
    >
      {/* LEFT ICONS */}
      <div style={{ display: "flex", gap: 8 }}>
        <NavLink to="/" style={iconStyle} title="Посты">
          🏠
        </NavLink>

        <NavLink to="/friends" style={iconStyle} title="Друзья">
          👥
        </NavLink>

        <NavLink to="/reels" style={iconStyle} title="Рилсы">
          🎬
        </NavLink>

        <NavLink to="/marketplace" style={iconStyle} title="Маркетплейс">
          🛒
        </NavLink>
      </div>

      {/* RIGHT ICONS */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {/* LANGUAGE SWITCHER */}
        <LanguageSwitcher />

        {/* PERSON (login/register) */}
        <NavLink to="/auth" style={iconStyle} title="Вход / Регистрация">
          👤
        </NavLink>

        {/* SETTINGS */}
        <NavLink to="/settings" style={iconStyle} title="Настройки">
          ⚙️
        </NavLink>
      </div>
    </div>
  );
}
