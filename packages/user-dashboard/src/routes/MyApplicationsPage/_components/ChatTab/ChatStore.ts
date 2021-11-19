import { map, action} from "nanostores";
import { useStore } from "@nanostores/preact";
import { GetMessagesPropsReq, personalApi } from "api/PersonalApi";
import { addErrorAction } from "stores/NotificationStore";
import { MessageListProvider,MessageType } from "@project/components/src/ui-kit/Chat";



export type ChatSendMessageType = {
  text: string;
};

interface ChatStore {
  isLoading: boolean;
  applicationId: number;
  messages: MessageListProvider;
}

const MAX_COUNT = 3

const chatStor = map<ChatStore>({
  isLoading: false,
  applicationId: 0,
  messages: new MessageListProvider(),
});

const getMessages = action( chatStor,"getMessages", async (store, applicationId: number,data:GetMessagesPropsReq={}): Promise<void> => {
  store.setKey("applicationId", applicationId);
  if(store.get().applicationId!==applicationId){
    store.setKey("messages", new MessageListProvider());
  }
  if (applicationId === 0) return;
  store.setKey("isLoading", true);
  const result = await personalApi.getMessages(applicationId,{...data,count:MAX_COUNT});
  const { isOk, body, error } = result;
  if (isOk) {
    const messages: Array<MessageType> = (body || []).map(({id, author, blobId, date, type, text }) => ({
      id,
      me: author === "User",
      title: new Date(date).toLocaleString(),
      text: text,
    }));
    store.setKey('messages',store.get().messages.push(messages))
  } 
  store.setKey("isLoading", false);
});


const sendMessage = action( chatStor,"getMessages", async (store, applicationId: number, message: ChatSendMessageType): Promise<void> => {
  console.log(getMessages)
  if (applicationId === 0) return;
  const result = await personalApi.sendMessages(applicationId, { ...message, type: 0 });
  const { isOk, error } = result;
  if (isOk) {
    getMessages(applicationId);
  } else {
    addErrorAction(error);
  }
});


chatStor.listen((state,keys)=>{
  console.log(keys,state)
})

export const useChatStore = () => {
  const state = useStore(chatStor);
  return { ...state, getMessages, sendMessage };
};
