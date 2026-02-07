import { useEffect, useRef, useState } from "react";
import { Bell, MessageCircle, Menu, Search } from "lucide-react";

function useOutsideClick<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [onClose]);

  return ref;
}

function Dropdown({
  title,
  items,
  onClose,
}: {
  title: string;
  items: { label: string; hint?: string }[];
  onClose: () => void;
}) {
  const ref = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-12 z-50 w-[320px] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-xl"
    >
      <div className="border-b border-neutral-800 px-4 py-3 text-sm font-semibold">
        {title}
      </div>

      <div className="p-2">
        {items.map((it, idx) => (
          <button
            key={idx}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-neutral-800"
            onClick={onClose}
          >
            <span>{it.label}</span>
            {it.hint ? (
              <span className="text-xs text-neutral-400">{it.hint}</span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Topbar() {
  const [open, setOpen] = useState<"messages" | "notifications" | "menu" | null>(
    null
  );

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-900 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-900">
            <span className="text-sm font-bold">AX</span>
          </div>
          <div className="hidden text-sm font-semibold md:block">
            AXIS Platform
          </div>
        </div>

        <div className="ml-1 flex w-full max-w-[520px] items-center gap-2 rounded-2xl border border-neutral-900 bg-neutral-900/60 px-3 py-2">
          <Search size={18} className="text-neutral-400" />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-500"
            placeholder="Search AXIS..."
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <button
              className="grid h-10 w-10 place-items-center rounded-2xl border border-neutral-900 bg-neutral-900/60 hover:bg-neutral-900"
              onClick={() => setOpen(open === "messages" ? null : "messages")}
              aria-label="Messages"
              title="Messages"
            >
              <MessageCircle size={18} />
            </button>

            {open === "messages" ? (
              <Dropdown
                title="Messages"
                onClose={() => setOpen(null)}
                items={[
                  { label: "No new messages", hint: "—" },
                  { label: "Open Inbox", hint: "soon" },
                  { label: "New message", hint: "soon" },
                ]}
              />
            ) : null}
          </div>

          <div className="relative">
            <button
              className="grid h-10 w-10 place-items-center rounded-2xl border border-neutral-900 bg-neutral-900/60 hover:bg-neutral-900"
              onClick={() =>
                setOpen(open === "notifications" ? null : "notifications")
              }
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={18} />
            </button>

            {open === "notifications" ? (
              <Dropdown
                title="Notifications"
                onClose={() => setOpen(null)}
                items={[
                  { label: "Deployment successful ✅", hint: "today" },
                  { label: "New follower", hint: "soon" },
                  { label: "System update", hint: "soon" },
                ]}
              />
            ) : null}
          </div>

          <div className="relative">
            <button
              className="grid h-10 w-10 place-items-center rounded-2xl border border-neutral-900 bg-neutral-900/60 hover:bg-neutral-900"
              onClick={() => setOpen(open === "menu" ? null : "menu")}
              aria-label="Menu"
              title="Menu"
            >
              <Menu size={18} />
            </button>

            {open === "menu" ? (
              <Dropdown
                title="Quick menu"
                onClose={() => setOpen(null)}
                items={[
                  { label: "Create post", hint: "soon" },
                  { label: "Upload media", hint: "soon" },
                  { label: "Profile settings", hint: "soon" },
                ]}
              />
            ) : null}
          </div>

          <div className="ml-1 flex items-center gap-2 rounded-2xl border border-neutral-900 bg-neutral-900/60 px-2 py-1">
            <div className="h-8 w-8 overflow-hidden rounded-xl bg-neutral-800" />
            <div className="hidden text-xs text-neutral-300 md:block">
              Ingvarr Sp. z o.o.
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
