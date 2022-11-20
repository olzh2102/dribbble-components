import { Lang } from "common/types";
import { useRouter } from "next/router";
import { createContext, ReactNode } from "react";

export const LangContext = createContext<any>({});

export default function LangProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const locale = router.locale;

  function setLang(lang: Lang) {
    router.push("/", "/", { locale: lang });
  }

  return (
    <LangContext.Provider value={{ lang: locale, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
