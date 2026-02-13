import React, { createContext, useContext, useMemo, useState } from "react";
import { ru } from "./ru";
import { en } from "./en";
import { pl } from "./pl";
import { detectLang, Lang } from "./detectLang";

const dict = { ru, en, pl };

type I18nContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof ru; // тип по русскому словарю
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectLang());

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const value = useMemo(
    () => ({ lang, setLang, t: dict[lang] }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
