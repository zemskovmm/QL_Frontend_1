import React from "react";
import { useObserver } from "mobx-react";
import { useRootStore } from "../../../utils/rootStoreUtils";

export const ManagerChat = () => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export const ManagerApplicationInfo = (info: any) => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export const ApplicationPage = () => {
  const { mangerApplicationPage: s } = useRootStore();
  return useObserver(() => (
    <div className={`flex flex-col p-10 w-full`}>
      <ManagerChat />
      <ManagerApplicationInfo info={s} />
    </div>
  ));
};
