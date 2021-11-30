import { map, action} from "nanostores";
import { useStore } from "@nanostores/preact";
import { GetMessagesPropsReq, personalApi } from "api/PersonalApi";
import { addErrorAction } from "stores/NotificationStore";
import { MessageListProvider,MessageType } from "@project/components/src/ui-kit/Chat";

const MAX_MESSAGES = 20

type ChatSendMessageType = {
  text: string;
};

interface ChatStore {
  isLoading: boolean;
  applicationId: number;
  messages: MessageListProvider;
}

const chatStor = map<ChatStore>({
  isLoading: false,
  applicationId: 0,
  messages: new MessageListProvider(),
});

const setApplicationId = action(chatStor,"setApplicationId",(store, applicationId: number)=>{
  if(store.get().applicationId!==applicationId){
    store.setKey("messages", new MessageListProvider());
  }
  store.setKey("applicationId", applicationId);
})

const getMessages = action( chatStor,"getMessages", async (store, applicationId: number,data:GetMessagesPropsReq={}): Promise<void> => {
  setApplicationId(applicationId);
  if (applicationId === 0) return;
  store.setKey("isLoading", true);
  const result = await personalApi.getMessages(applicationId,{...data,count:MAX_MESSAGES});
  const { isOk, body, error } = result;
  if (isOk) {
    const messages: Array<MessageType> = (body || []).map(({id, author, blobId, date, type, text }) => ({
      id,
      me: author === "User",
      fileId: blobId||undefined,
      text: text,
    }));
    if(store.get().applicationId===applicationId){
      store.setKey('messages',store.get().messages.push(messages))
    }
  } 
  store.setKey("isLoading", false);
});

const uploadFile = action( chatStor,"getMessages", async (store, applicationId: number, file:File): Promise<void> => {
  setApplicationId(applicationId);
  if (applicationId === 0) return;
  const data = new FormData();
  let fileToBlob = new Blob([new Uint8Array(await file.arrayBuffer())], {type: file.type });
  data.append("UploadedFile", fileToBlob, file.name);
  
  const result = await personalApi.uploadFile(applicationId,data);
  const { isOk, body, error } = result;
  if (isOk) {
    if(store.get().applicationId===applicationId){
      getMessages(applicationId);
    }
  } else {
    addErrorAction(error);
  }
});

const sendMessage = action( chatStor,"getMessages", async (store, applicationId: number, message: ChatSendMessageType): Promise<void> => {
  setApplicationId(applicationId);
  if (applicationId === 0) return;
  const result = await personalApi.sendMessages(applicationId, { ...message, type: 0 });
  const { isOk, error } = result;
  if (isOk) {
    if(store.get().applicationId===applicationId){
      getMessages(applicationId);
    }
  } else {
    addErrorAction(error);
  }
});

export const useChatStore = () => {
  const state = useStore(chatStor);
  return { ...state, getMessages, sendMessage,uploadFile,setApplicationId };
};
