import React, { FunctionComponent } from "react";
import QUARTER_LATIN_ICON from "@project/components/src/assets/logo/quarter-latin.png";
import QUARTER_LATIN_MINI_ICON from "@project/components/src/assets/logo/quarter-latin-mini.png";

export const Logo: FunctionComponent = () => {
  return (
    <>
      <img className="hidden md:inline" src={QUARTER_LATIN_ICON} />
      <img className="inline md:hidden" src={QUARTER_LATIN_MINI_ICON} />
    </>
  );
};
