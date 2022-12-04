import { NextPage } from "next";

export type Lang = "en" | "de" | "ru";

export type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export type Theme = "light" | "dark";
export type Page<T = {}> = NextPage & T;
export type PageWithWaveCanvas = Page<{ waveBackground: boolean }>;
