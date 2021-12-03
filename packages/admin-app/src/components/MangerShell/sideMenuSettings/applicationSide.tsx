import React from "react";
import { useRootStore } from "../../../utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import { AdminInputBox } from "../../common/AdminInputBox";

export const ApplicationSide = () => {
  const { mangerApplicationPage: s } = useRootStore();
  return useObserver(() => (
    <div className={`flex flex-col`}>
      <button className={`border mt-2 p-2 hover:border-gray-300`} onClick={() => (s.openInfo = !s.openInfo)}>
        Application Info
      </button>
    </div>
  ));
};
