import React, { createRef, DOMElement, FC, MutableRefObject, RefObject, useEffect, useRef } from "react";
import { useObserver } from "mobx-react";
import { useRootStore } from "../../../utils/rootStoreUtils";
import { ManagerApplicationInfoDto } from "../../../interfaces/ManagerRpc";
import {
  ManagerApplicationStore,
  Message,
} from "../../../stores/pages/managerStores/application/managerApplicationStore";

const usePollMessages = (store: ManagerApplicationStore) =>
  useEffect(() => {
    store.pollMessages();
    return () => store.stopPolling();
  });

const MessageChatWindow: FC<{ store: ManagerApplicationStore }> = ({ store }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => ref.current?.scrollTo({ top: ref.current.scrollHeight }), []);
  return useObserver(() => (
    <div
      className={`border h-full mb-5 customScroll overflow-y-scroll`}
      onScroll={async (e: any) => {
        if (e.target.scrollTop < 300) await store.MoreLoadMessages();
      }}
      ref={ref}
    >
      {store.messages.map((el: Message, i: number) => (
        <div className={`flex w-max flex-col `}>
          <div className={`flex justify-between`}>
            <span className={`mr-5`}>{el.author}</span>
            <span>{new Date(el.date).toDateString()}</span>
          </div>
          <span>{el.text}</span>
        </div>
      ))}
    </div>
  ));
};

export const ManagerChat: FC<{ store: ManagerApplicationStore }> = ({ store }) => {
  usePollMessages(store);

  return useObserver(() => (
    <div className={`p-10 h-screen`}>
      <div className={`flex flex-col border h-full p-10`}>
        <MessageChatWindow store={store} />
        <form
          className={`flex`}
          onSubmit={async (e) => {
            e.preventDefault();
            await store.postMessages();
          }}
        >
          <input
            className={`w-11/12 mr-10 resize-none border p-4`}
            value={store.sms}
            onChange={(e) => (store.sms = e.target.value)}
          />
          <button className={`button`}>Send</button>
        </form>
      </div>
    </div>
  ));
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
