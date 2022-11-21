import { useContext } from "react";
import { useRouter } from "next/router";

import { LangContext } from "~contexts/lang-provider";

export default function useLang() {
  const lang = useRouter().locale;
  const { setLang } = useContext(LangContext);

  return { lang, setLang };
}
