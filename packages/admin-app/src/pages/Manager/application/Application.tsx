import React from "react";
import { useObserver } from "mobx-react";

export const ApplicationPage = () => {
  return useObserver(() => <div className={`flex flex-col p-10 w-full`}></div>);
};
