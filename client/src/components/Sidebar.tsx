import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  display: "flex",
  gap: 10,
  alignItems: "center",
  padding: "10px 12px",
  borderRadius: 10,
  textDecoration: "none",
  color: "white",
  background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
  cursor: "pointer",
});

export default function Sidebar() {
  return (
    <div
      style={{
        width: 260,
        background: "#111",
        color: "white",
        padding: 12,
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ marginBottom: 14, opacity: 0.9, fontWeight: 600 }}>
        Ingvvar Sp. z o.o.
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <NavLink to="/" style={linkStyle}>
          🏠 <span>Home</span>
        </NavLink>

        <NavLink to="/friends" style={linkStyle}>
          👥 <span>Friends</span>
        </NavLink>

        <NavLink to="/reels" style={linkStyle}>
          🎬 <span>Reels</span>
        </NavLink>

        <NavLink to="/marketplace" style={linkStyle}>
          🛒 <span>Marketplace</span>
        </NavLink>

        <NavLink to="/settings" style={linkStyle}>
          ⚙️ <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
}
