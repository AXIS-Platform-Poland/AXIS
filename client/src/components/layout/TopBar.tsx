import React from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
        background: "rgba(6,11,24,0.9)",
        backdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* ЛОГОТИП AXIRO (без картинки, кружок + текст) */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        onClick={() => navigate("/feed")}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 12,
            background:
              "radial-gradient(circle at 30% 20%, #46f0ff 0, #2d7dff 35%, #7b2dff 100%)",
            boxShadow: "0 0 18px rgba(80,120,255,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          AX
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
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
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            сеть для исполнителей
          </span>
        </div>
      </div>

      {/* КНОПКА МЕНЮ (три полоски, ведёт в Настройки) */}
      <button
        onClick={() => navigate("/settings")}
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
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
