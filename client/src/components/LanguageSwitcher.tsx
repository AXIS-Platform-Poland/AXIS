import React from "react";
import { useI18n } from "../i18n/I18nProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <button
        onClick={() => setLang("ru")}
        style={{
          padding: "6px 10px",
          borderRadius: 8,
          border: "1px solid #444",
          background: lang === "ru" ? "#2a2a2a" : "transparent",
          color: "white",
          cursor: "pointer",
        }}
      >
        RU
      </button>

      <button
        onClick={() => setLang("en")}
        style={{
          padding: "6px 10px",
          borderRadius: 8,
          border: "1px solid #444",
          background: lang === "en" ? "#2a2a2a" : "transparent",
          color: "white",
          cursor: "pointer",
        }}
      >
        EN
      </button>

      <button
        onClick={() => setLang("pl")}
        style={{
          padding: "6px 10px",
          borderRadius: 8,
          border: "1px solid #444",
          background: lang === "pl" ? "#2a2a2a" : "transparent",
          color: "white",
          cursor: "pointer",
        }}
      >
        PL
      </button>
    </div>
  );
}
