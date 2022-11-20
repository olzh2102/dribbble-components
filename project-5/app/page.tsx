import React from "react";

import LangSwitcher from "~components/lang-switcher";
import RoundedCorner from "~components/rounded-corner";

export default function Page() {
  return (
    <RoundedCorner>
      <div>Hi there</div>
      <LangSwitcher />
    </RoundedCorner>
  );
}
