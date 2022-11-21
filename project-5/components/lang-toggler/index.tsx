import { LANG } from "common/constants";
import { Lang } from "common/types";
import { useContext } from "react";
import { LangContext } from "~contexts/lang-provider";
import useLang from "~hooks/use-lang";

export default function LangToggler({ lang }: { lang: Lang }) {
  const setLang = useContext(LangContext);

  return (
    <>
      {/* english */}
      <input
        className={`hidden peer/en ${lang == LANG.EN ? "checked" : ""}`}
        type="radio"
        name="lang"
        id="english"
        role="radio-en"
        value={LANG.EN}
        checked={lang == LANG.EN}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLang(e.target.value as Lang)
        }
      />
      <label
        htmlFor="english"
        className="text-slate-400 peer-checked/en:text-slate-900 dark:peer-checked/en:text-white"
      >
        en
      </label>{" "}
      <span className="text-slate-400">/</span>
      {/* german */}
      <input
        className={`hidden peer/de ${lang == LANG.DE ? "checked" : ""}`}
        type="radio"
        name="lang"
        id="german"
        role="radio-de"
        value={LANG.DE}
        checked={lang == LANG.DE}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log("am i clicked?");
          setLang(e.target.value as Lang);
        }}
      />
      <label
        htmlFor="german"
        className="text-slate-400 peer-checked/de:text-slate-900 dark:peer-checked/de:text-white"
      >
        {" "}
        de
      </label>{" "}
      <span className="text-slate-400">/</span>
      {/* russian */}
      <input
        className={`hidden peer/ru ${lang == LANG.RU ? "checked" : ""}`}
        type="radio"
        name="lang"
        id="russian"
        role="radio-ru"
        value={LANG.RU}
        checked={lang == LANG.RU}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLang(e.target.value as Lang)
        }
      />
      <label
        htmlFor="russian"
        className="text-slate-400 peer-checked/ru:text-slate-900 dark:peer-checked/ru:text-white"
      >
        {" "}
        ru
      </label>
    </>
  );
}
