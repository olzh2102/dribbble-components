"use client";

import React from "react";
import RoundedCorner from "~components/rounded-corner";

export default function Page() {
  const [lang, setLang] = React.useState("en");

  return (
    <RoundedCorner>
      <div>Hi there</div>
      <input
        className="hidden peer/en"
        type="radio"
        name="lang"
        id="english"
        value="en"
        checked={lang == "en"}
        onChange={() => {
          setLang("en");
          console.log("change");
        }}
      />
      <label
        htmlFor="english"
        className="text-slate-100 peer-checked/en:text-slate-900"
      >
        en
      </label>{" "}
      <span className="text-slate-200">/</span>
      <input
        className="hidden peer/de"
        type="radio"
        name="lang"
        id="german"
        value="de"
        checked={lang == "de"}
        onChange={() => {
          setLang("de");
          console.log("change");
        }}
      />
      <label
        htmlFor="german"
        className="text-slate-100 peer-checked/de:text-slate-900"
      >
        {" "}
        de
      </label>{" "}
      <span className="text-slate-200">/</span>
      <input
        className="hidden peer/ru"
        type="radio"
        name="lang"
        id="russian"
        value="ru"
        checked={lang == "ru"}
        onChange={() => {
          setLang("ru");
          console.log("change");
        }}
      />
      <label
        htmlFor="russian"
        className="text-slate-100 peer-checked/ru:text-slate-900"
      >
        {" "}
        ru
      </label>
    </RoundedCorner>
  );
}
