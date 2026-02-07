import { NavLink } from "react-router-dom";

const iconStyle = ({ isActive }: { isActive: boolean }) => ({
  padding: "8px 10px",
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
      <div style={{ display: "flex", gap: 8 }}>
        <NavLink to="/" style={iconStyle}>
          🏠
        </NavLink>
        <NavLink to="/reels" style={iconStyle}>
          🎬
        </NavLink>
        <NavLink to="/friends" style={iconStyle}>
          👥
        </NavLink>
        <NavLink to="/marketplace" style={iconStyle}>
          🛒
        </NavLink>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <NavLink to="/settings" style={iconStyle}>
          ⚙️
        </NavLink>
      </div>
    </div>
  );
}
