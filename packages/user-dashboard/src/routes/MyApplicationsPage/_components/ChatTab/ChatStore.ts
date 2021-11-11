import { useMemo } from "preact/hooks";
import { createMap, MapStore } from "nanostores";
import { useStore } from "nanostores/preact";
import { personalApi } from "api/PersonalApi";
import { notificationStore } from "stores/NotificationStore";

export type ChatMessagesType = {
  author: string;
  blobId: number | null;
  date: Date;
  type: string;
  text: string;
};

export type ChatSendMessageType = {
  text: string;
};

interface ChatStore {
  isLoading: boolean;
  messages: Array<ChatMessagesType>;
}
interface CreateChatStore {
  store: MapStore<ChatStore>;
  getMessages: (applicationId: number) => Promise<void>;
  sendMessage: (applicationId: number, message: ChatSendMessageType) => Promise<void>;
}

export type ChatStoreType = CreateChatStore & ChatStore;

const createChatStore = (): CreateChatStore => {
  const store = createMap<ChatStore>(() => {
    store.set({
      isLoading: false,
      messages: [],
    });
  });

  const getMessages = async (applicationId: number): Promise<void> => {
    store.setKey("messages", []);
    if (applicationId === 0) return;
    store.setKey("isLoading", true);
    const result = await personalApi.getMessages(applicationId);
    const { isOk, body, error } = result;
    if (isOk) {
      const messages: Array<ChatMessagesType> = (body || []).map(({ author, blobId, date, type, text }) => ({
        author,
        blobId,
        date: new Date(date),
        type,
        text,
      }));
      store.setKey("messages", messages);
    } else {
      notificationStore.addErrorAction(error);
    }
    store.setKey("isLoading", false);
  };

  const sendMessage = async (applicationId: number, message: ChatSendMessageType): Promise<void> => {
    if (applicationId === 0) return;
    const result = await personalApi.sendMessages(applicationId, { ...message, type: 0 });
    const { isOk, error } = result;
    if (isOk) {
      await getMessages(applicationId);
    } else {
      notificationStore.addErrorAction(error);
    }
  };

  return { store, getMessages, sendMessage };
};

export const useChatStore = (): ChatStoreType => {
  const pageStore = useMemo(() => createChatStore(), []);
  const state = useStore(pageStore.store);

  return { ...pageStore, ...state };
};
