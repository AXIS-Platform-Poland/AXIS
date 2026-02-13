export type Lang = "ru" | "en" | "pl";
const SUPPORTED: Lang[] = ["ru", "en", "pl"];

export function detectLang(): Lang {
  // 1) сохранённый выбор
  const saved = localStorage.getItem("lang") as Lang | null;
  if (saved && SUPPORTED.includes(saved)) return saved;

  // 2) язык браузера
  const nav = (navigator.language || "ru").toLowerCase();
  if (nav.startsWith("ru")) return "ru";
  if (nav.startsWith("pl")) return "pl";
  return "en";
}
