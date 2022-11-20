"use client";

import React, { useState } from "react";

import { LANG } from "common/constants";
import { Lang } from "common/types";

export default function LangSwitcher() {
  const [lang, setLang] = useState<Lang>(LANG.EN);

  return (
    <>
      {/* english */}
      <input
        className="hidden peer/en"
        type="radio"
        name="lang"
        id="english"
        value={LANG.EN}
        checked={lang == LANG.EN}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLang(e.target.value as Lang)
        }
      />
      <label
        htmlFor="english"
        className="text-slate-400 peer-checked/en:text-slate-900"
      >
        en
      </label>{" "}
      <span className="text-slate-400">/</span>
      {/* german */}
      <input
        className="hidden peer/de"
        type="radio"
        name="lang"
        id="german"
        value={LANG.DE}
        checked={lang == LANG.DE}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLang(e.target.value as Lang)
        }
      />
      <label
        htmlFor="german"
        className="text-slate-400 peer-checked/de:text-slate-900"
      >
        {" "}
        de
      </label>{" "}
      <span className="text-slate-400">/</span>
      {/* russian */}
      <input
        className="hidden peer/ru"
        type="radio"
        name="lang"
        id="russian"
        value={LANG.RU}
        checked={lang == LANG.RU}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLang(e.target.value as Lang)
        }
      />
      <label
        htmlFor="russian"
        className="text-slate-400 peer-checked/ru:text-slate-900"
      >
        {" "}
        ru
      </label>
    </>
  );
}
