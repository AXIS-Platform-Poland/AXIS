import React from "react";
import { NavLink } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

const itemStyle = ({ isActive }: { isActive: boolean }) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  borderRadius: 10,
  textDecoration: "none",
  color: "white",
  background: isActive ? "rgba(255,255,255,0.10)" : "transparent",
});

export default function Sidebar() {
  const { t } = useI18n();

  return (
    <div
      style={{
        width: 240,
        padding: 12,
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Тут можешь оставить свой логотип/название */}
      <div style={{ marginBottom: 14, fontWeight: 700 }}>
        Ingvarr Sp. z o.o.
        <div style={{ fontWeight: 400, opacity: 0.8, fontSize: 12 }}>
          Professional services • Poland
        </div>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <NavLink to="/" style={itemStyle}>
          <span>🏠</span>
          <span>{t.nav.posts}</span>
        </NavLink>

        <NavLink to="/friends" style={itemStyle}>
          <span>👥</span>
          <span>{t.nav.friends}</span>
        </NavLink>

        <NavLink to="/reels" style={itemStyle}>
          <span>🎞️</span>
          <span>{t.nav.reels}</span>
        </NavLink>

        <NavLink to="/marketplace" style={itemStyle}>
          <span>🛒</span>
          <span>{t.nav.marketplace}</span>
        </NavLink>

        <NavLink to="/settings" style={itemStyle}>
          <span>⚙️</span>
          <span>{t.nav.settings}</span>
        </NavLink>
      </div>
    </div>
  );
}
