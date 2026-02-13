import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Кнопка глобуса */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "10px",
          padding: "8px 10px",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        🌍
      </button>

      {/* Выпадающее меню */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "45px",
            right: 0,
            background: "#111",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            minWidth: "120px",
            zIndex: 1000,
          }}
        >
          <button onClick={() => changeLanguage("ru")} className="lang-item">
            🇷🇺 Русский
          </button>

          <button onClick={() => changeLanguage("en")} className="lang-item">
            🇬🇧 English
          </button>

          <button onClick={() => changeLanguage("pl")} className="lang-item">
            🇵🇱 Polski
          </button>
        </div>
      )}
    </div>
  );
}
