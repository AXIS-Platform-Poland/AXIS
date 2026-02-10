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
      {/* LEFT ICONS */}
      <div style={{ display: "flex", gap: 8 }}>
        <NavLink to="/" style={iconStyle} title="Posts">
          🏠
        </NavLink>

        <NavLink to="/friends" style={iconStyle} title="Friends">
          👥
        </NavLink>

        <NavLink to="/reels" style={iconStyle} title="Reels">
          🎬
        </NavLink>

        <NavLink to="/marketplace" style={iconStyle} title="Marketplace">
          🛒
        </NavLink>
      </div>

      {/* RIGHT ICONS */}
      <div style={{ display: "flex", gap: 8 }}>
        {/* PERSON (login/register) */}
        <NavLink to="/auth" style={iconStyle} title="Login / Register">
          👤
        </NavLink>

        {/* SETTINGS */}
        <NavLink to="/settings" style={iconStyle} title="Settings">
          ⚙️
        </NavLink>
      </div>
    </div>
  );
}
