import React from "react";
import { NavLink } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

type NavItem = {
  to: string;
  key: "posts" | "friends" | "reels" | "marketplace" | "settings";
  icon: string;
};

export default function Sidebar() {
  const { t } = useI18n();

  const items: NavItem[] = [
    { to: "/", key: "posts", icon: "🏠" },
    { to: "/friends", key: "friends", icon: "👥" },
    { to: "/reels", key: "reels", icon: "🎬" },
    { to: "/marketplace", key: "marketplace", icon: "🛒" },
    { to: "/settings", key: "settings", icon: "⚙️" },
  ];

  const wrapStyle: React.CSSProperties = {
    width: 280,
    padding: 14,
    borderRight: "1px solid rgba(255,255,255,0.08)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
    backdropFilter: "blur(8px)",
  };

  const cardStyle: React.CSSProperties = {
    padding: 14,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(17,17,17,0.45)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    marginBottom: 12,
  };

  const brandTitle: React.CSSProperties = {
    fontWeight: 800,
    fontSize: 16,
    lineHeight: 1.1,
    marginBottom: 6,
  };

  const brandSub: React.CSSProperties = {
    opacity: 0.75,
    fontSize: 12,
  };

  const navStyle: React.CSSProperties = {
    display: "grid",
    gap: 8,
  };

  const linkBase: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 14,
    textDecoration: "none",
    color: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    transition: "transform .12s ease, background .12s ease, border-color .12s ease",
  };

  const iconStyle: React.CSSProperties = {
    width: 28,
    height: 28,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    fontSize: 14,
    flex: "0 0 28px",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.1,
  };

  const footerStyle: React.CSSProperties = {
    marginTop: 12,
    opacity: 0.6,
    fontSize: 12,
    padding: "0 4px",
  };

  return (
    <aside style={wrapStyle}>
      <div style={cardStyle}>
        <div style={brandTitle}>Ingvarr Sp. z o.o.</div>
        <div style={brandSub}>Professional services • Poland</div>
      </div>

      <div style={navStyle}>
        {items.map((it) => (
          <NavLink
            key={it.key}
            to={it.to}
            end={it.to === "/"}
            style={({ isActive }) => ({
              ...linkBase,
              background: isActive ? "rgba(255,255,255,0.09)" : (linkBase.background as string),
              borderColor: isActive ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)",
              transform: isActive ? "translateX(2px)" : "translateX(0px)",
              boxShadow: isActive ? "0 10px 24px rgba(0,0,0,0.25)" : "none",
            })}
          >
            <span style={iconStyle}>{it.icon}</span>
            <span style={labelStyle}>{t?.nav?.[it.key] ?? it.key}</span>
          </NavLink>
        ))}
      </div>

      <div style={footerStyle}>
        <div>AXIS Platform</div>
        <div style={{ marginTop: 4 }}>UI: Dark • v1</div>
      </div>
    </aside>
  );
}
