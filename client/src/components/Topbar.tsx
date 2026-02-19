// @ts-nocheck
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

type TopbarProps = {
  onToggleSidebar?: () => void;
  [key: string]: any;
};

const barStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 40,
  height: 56,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 16px",
  boxSizing: "border-box",
  background:
    "linear-gradient(to bottom, rgba(5,5,5,0.95), rgba(5,5,5,0.75), transparent)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  borderBottom: "1px solid rgba(148,163,184,0.3)",
};

const brandStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const brandDotStyle: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: "999px",
  background: "#22c55e",
  boxShadow: "0 0 12px rgba(34,197,94,0.9)",
};

const brandTextStyle: React.CSSProperties = {
  fontSize: 14,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#e5e7eb",
  fontWeight: 600,
};

const rightBlockStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const iconButtonStyle: React.CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: "999px",
  border: "1px solid rgba(148,163,184,0.5)",
  background: "rgba(15,23,42,0.85)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#e5e7eb",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(15,23,42,0.7)",
};

export default function Topbar(_props: TopbarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isProfile = location.pathname === "/profile";

  const handleProfileClick = () => {
    if (!isProfile) {
      navigate("/profile");
    }
  };

  return (
    <header style={barStyle}>
      {/* Левый блок: бренд */}
      <div style={brandStyle}>
        <span style={brandDotStyle} />
        <span style={brandTextStyle}>AXIRO PROFILE</span>
      </div>

      {/* Правый блок: язык + профиль */}
      <div style={rightBlockStyle}>
        <LanguageSwitcher />

        <button
          type="button"
          onClick={handleProfileClick}
          style={{
            ...iconButtonStyle,
            borderColor: isProfile
              ? "rgba(56,189,248,0.9)"
              : "rgba(148,163,184,0.5)",
            boxShadow: isProfile
              ? "0 0 0 1px rgba(56,189,248,0.7), 0 12px 28px rgba(15,23,42,0.9)"
              : iconButtonStyle.boxShadow,
          }}
          title={isProfile ? "Ваш профиль" : "Открыть профиль"}
        >
          <span style={{ fontSize: 18 }}>👤</span>
        </button>
      </div>
    </header>
  );
}
