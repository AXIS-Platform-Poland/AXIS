import { NavLink } from "react-router-dom";

const nav = [
  { to: "/", label: "Posts", icon: "🏠" },
  { to: "/friends", label: "Friends", icon: "👥" },
  { to: "/reels", label: "Reels", icon: "🎬" },
  { to: "/marketplace", label: "Marketplace", icon: "🛒" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  return (
    <aside
      className="
        w-[280px] shrink-0
        sticky top-0 h-screen
        z-[9999]
        pointer-events-auto
      "
      style={{ position: "sticky" }}
    >
      <div
        className="
          m-4 rounded-2xl border border-white/10
          bg-black/30 backdrop-blur-xl
          p-3
        "
      >
        <div className="mb-3 text-sm text-white/70">
          <div className="font-semibold text-white">Ingvvarr Sp. z o.o.</div>
          <div>Professional services • Poland</div>
        </div>

        <nav className="flex flex-col gap-2">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                rounded-xl px-3 py-2
                text-white/90
                hover:bg-white/10
                transition
                ${isActive ? "bg-white/10" : ""}
              `
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[15px]">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
