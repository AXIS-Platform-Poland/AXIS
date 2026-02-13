import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

type Lang = "ru" | "en" | "pl";

const LANGS: Array<{ code: Lang; label: string; sub: string }> = [
  { code: "ru", label: "RU", sub: "Русский" },
  { code: "en", label: "EN", sub: "English" },
  { code: "pl", label: "PL", sub: "Polski" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);

  const current = (i18n.language || "en").slice(0, 2) as Lang;

  const setLang = async (lang: Lang) => {
    try {
      await i18n.changeLanguage(lang);
      localStorage.setItem("axis_lang", lang);
    } finally {
      setOpen(false);
    }
  };

  // Закрытие по клику вне меню
  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (!open) return;
      const target = e.target as Node;
      if (rootRef.current && !rootRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  // Закрытие по Esc
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative z-[9999]">
      {/* Кнопка-глобус */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10 active:scale-[0.98] transition"
        aria-haspopup="menu"
        aria-expanded={open}
        title="Language"
      >
        <Globe size={18} />
        <span className="text-xs font-semibold opacity-90">{current.toUpperCase()}</span>
      </button>

      {/* Меню */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-white/12 bg-[#0b0f14]/95 backdrop-blur-xl shadow-2xl"
          style={{ pointerEvents: "auto" }}
        >
          <div className="p-1">
            {LANGS.map((l) => {
              const active = current === l.code;
              return (
                <button
                  key={l.code}
                  type="button"
                  role="menuitem"
                  onClick={() => setLang(l.code)}
                  className={[
                    "w-full text-left rounded-xl px-3 py-2 transition",
                    "hover:bg-white/10 active:bg-white/15",
                    "flex items-center justify-between gap-3",
                    active ? "bg-white/10" : "bg-transparent",
                  ].join(" ")}
                >
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-white/95">{l.label}</span>
                    <span className="text-xs text-white/60">{l.sub}</span>
                  </div>

                  {active && (
                    <span className="text-xs px-2 py-1 rounded-lg bg-white/10 text-white/80 border border-white/10">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
