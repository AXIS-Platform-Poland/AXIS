import React from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiroLogo from "../../assets/axiro-logo.png"; // Если у тебя другой путь – поправим

export default function TopBar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 999,
        height: "64px",
        background: "rgba(10,15,28,0.75)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}
    >
      {/* ЛОГОТИП AXIRO */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
        onClick={() => navigate("/feed")}
      >
        <img
          src={axiroLogo}
          alt="AXIRO"
          style={{ width: 36, height: 36, borderRadius: 10 }}
        />
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: 1,
          }}
        >
          AXIRO
        </span>
      </div>

      {/* КНОПКА МЕНЮ */}
      <button
        onClick={() => navigate("/settings")}
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Menu size={22} color="#ffffff" />
      </button>
    </div>
  );
}
