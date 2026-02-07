import {
  Home,
  Users,
  Clapperboard,
  ShoppingBag,
  Settings,
} from "lucide-react";
import type { NavKey } from "../App";

export default function Sidebar({
  active,
  onChange,
  variant = "desktop",
}: {
  active: NavKey;
  onChange: (k: NavKey) => void;
  variant?: "desktop" | "mobile";
}) {
  const items: { key: NavKey; label: string; icon: any }[] = [
    { key: "home", label: "Posts", icon: Home },
    { key: "friends", label: "Friends", icon: Users },
    { key: "reels", label: "Reels", icon: Clapperboard },
    { key: "marketplace", label: "Marketplace", icon: ShoppingBag },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  const base =
    "w-full rounded-2xl border border-neutral-900 bg-neutral-950/60";
  const pad = variant === "mobile" ? "p-2" : "p-3";

  return (
    <div className={`${base} ${pad}`}>
      <div className="mb-2 flex items-center gap-2 px-2 py-2">
        <div className="h-10 w-10 rounded-xl bg-neutral-800" />
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">Ingvarr Sp. z o.o.</div>
          <div className="text-xs text-neutral-400">Professional services • Poland</div>
        </div>
      </div>

      <div className={variant === "mobile" ? "grid grid-cols-2 gap-2" : "grid gap-2"}>
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = active === it.key;

          return (
            <button
              key={it.key}
              onClick={() => onChange(it.key)}
              className={[
                "flex items-center gap-3 rounded-2xl border px-3 py-3 text-left text-sm transition",
                isActive
                  ? "border-neutral-700 bg-neutral-900"
                  : "border-neutral-900 bg-neutral-950/40 hover:bg-neutral-900/60",
              ].join(" ")}
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-neutral-900">
                <Icon size={18} />
              </span>
              <span className="font-medium">{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
