import React, { FC, useEffect } from "react";
import { useObserver } from "mobx-react";
import { useRootStore } from "../../../utils/rootStoreUtils";
import { ManagerApplicationInfoDto } from "../../../interfaces/ManagerRpc";
import { ManagerApplicationStore } from "../../../stores/pages/managerStores/application/managerApplicationStore";

export const ManagerChat: FC<{ store: ManagerApplicationStore }> = ({ store }) => {
  useEffect(() => {
    const interval = setInterval(async () => {
      await store.loadMessages();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={`p-10 h-screen`}>
      <div className={`flex flex-col border h-full p-10`}>
        <div className={`border h-full mb-5`}>
          <pre>{JSON.stringify(store.messages, null, 2)}</pre>
        </div>
        <form className={`flex`}>
          <textarea className={`w-11/12 mr-10 resize-none border p-4`} />
          <button className={`button`}>Send</button>
        </form>
      </div>
    </div>
  );
};

export const ManagerApplicationInfo: FC<{ info: ManagerApplicationInfoDto; openInfo: boolean }> = ({
  info,
  openInfo,
}) => {
  return (
    <div
      className={`flex flex-col h-screen max-w-sm w-full bg-blue-600 pt-8 text-white px-10 pb-10 fixed top-0 right-0 transform transition duration-300 ${
        openInfo ? "" : "-translate-y-full"
      }`}
    >
      <div className={`flex justify-between mb-2`}>
        <div className={`flex flex-col`}>
          <span>Type: {info.type}</span>
          <span>Status: {info.status}</span>
        </div>
        <div className={`flex flex-col text-right	`}>
          <span>Id: {info.id}</span>
          <span>Entity id: {info.entityId}</span>
        </div>
      </div>
      <div className={`flex flex-col`}>
        <span>{JSON.stringify(info.commonApplicationInfo, null, 2)}</span>
        <span>{JSON.stringify(info.entityTypeSpecificApplicationInfo, null, 2)}</span>
      </div>
    </div>
  );
};

export const ApplicationPage = () => {
  const { mangerApplicationPage: s } = useRootStore();
  return useObserver(() => (
    <div className={`flex flex-col w-full relative`}>
      <ManagerChat store={s} />
      <ManagerApplicationInfo info={s.application} openInfo={s.openInfo} />
    </div>
  ));
};
