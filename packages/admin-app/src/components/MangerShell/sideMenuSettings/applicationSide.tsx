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
      <label className={`text-center border mt-4 p-2 hover:border-gray-300 cursor-pointer`}>
        <input
          type="file"
          onChange={(e) => s.postFile(e.target.files)}
          style={{ width: "1px", height: "1px", opacity: "0" }}
          className={"left-0 top-0 absolute"}
        />
        Upload File in chat
      </label>
      <button className={`border mt-4 p-2 hover:border-gray-300`} onClick={() => s.IsAnswered()}>
        Application Ansewered
      </button>
    </div>
  ));
};
