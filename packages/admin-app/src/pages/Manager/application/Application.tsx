import React, { FC, MutableRefObject, useEffect, useRef } from "react";
import { useObserver } from "mobx-react";
import { useRootStore } from "src/utils/rootStoreUtils";
import { ManagerApplicationInfoDto } from "src/interfaces/ManagerRpc";
import { ManagerApplicationStore, Message } from "src/stores/pages/managerStores/application/managerApplicationStore";

const usePollMessages = (store: ManagerApplicationStore) =>
  useEffect(() => {
    store.pollMessages();
    return () => store.stopPolling();
  });

const managerMessages = "ml-auto text-right";

const MessageChatWindow: FC<{ store: ManagerApplicationStore }> = ({ store }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => ref.current?.scrollTo({ top: ref.current.scrollHeight }), []);
  return useObserver(() => (
    <div
      className={`border h-full mb-5 overflow-y-scroll customScroll py-10 px-5`}
      onScroll={async (e: any) => {
        if (e.target.scrollTop < 300) await store.MoreLoadMessages();
      }}
      ref={ref}
    >
      {store.messages.map((el: Message, i: number) =>
        el.type === "File" ? (
          <div
            className={`flex w-max flex-col mb-4 border bg-white px-5 py-2 rounded-lg ${
              el.author === "Manager" ? managerMessages : ""
            }`}
            key={`${i} ${el.id}`}
          >
            <span className={`text-sm mb-2`}>{new Date(el.date).toDateString()}</span>
            <div>
              <span>Document number {el.id}</span>
              <button>save</button>
            </div>
          </div>
        ) : (
          <div
            className={`flex w-max flex-col bg-white mb-4 border px-5 py-2 rounded-lg ${
              el.author === "Manager" ? managerMessages : ""
            }`}
            key={`${i} ${el.id}`}
          >
            <span className={`text-sm mb-2`}>{new Date(el.date).toDateString()}</span>
            <span>{el.text}</span>
          </div>
        )
      )}
    </div>
  ));
};

export const ManagerChat: FC<{ store: ManagerApplicationStore }> = ({ store }) => {
  usePollMessages(store);

  return useObserver(() => (
    <div className={`p-10 h-screen`}>
      <div className={`flex flex-col border bg-blue-400 h-full p-10 shadow`}>
        <MessageChatWindow store={store} />
        <form
          className={`flex`}
          onSubmit={async (e) => {
            e.preventDefault();
            await store.postMessages();
          }}
        >
          <input
            className={`w-11/12 mr-5 outline-none text-white border p-4 bg-transparent`}
            value={store.sms}
            onChange={(e) => (store.sms = e.target.value)}
          />
          <button className={`border flex w-2/12 items-center justify-center hover:border-gray-300 text-white`}>
            Send
          </button>
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
        <div className={`flex flex-col mb-4`}>
          <span className={`mb-4`}>commonApplicationInfo</span>
          <span>{JSON.stringify(info.commonApplicationInfo, null, 2)}</span>
        </div>
        <div className={`flex flex-col`}>
          <span>entityTypeSpecificApplicationInfo</span>
          <span>{JSON.stringify(info.entityTypeSpecificApplicationInfo, null, 2)}</span>
        </div>
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
