export type Lang = "en" | "de" | "ru";

export type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export type Theme = 'light' | 'dark'
