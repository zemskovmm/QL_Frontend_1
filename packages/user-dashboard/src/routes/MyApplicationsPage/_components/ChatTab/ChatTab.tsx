import { FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { useChatStore } from "./ChatStore";
import { Chat } from '@project/components/src/ui-kit/Chat'

type PropsType = {
    className?:string;
    applicationId: number;
};

export const ChatTab: FunctionalComponent<PropsType> = ({className, applicationId}) => {
    const {getMessages,sendMessage, messages}= useChatStore()

    useEffect(()=>{
        getMessages(applicationId);
    },[applicationId])

    const handleBeforeMessages=(beforeMessageId:number)=>{
        getMessages(applicationId,{beforeMessageId});
    }

    const handleAfterMessages=(afterMessageId:number)=>{
        getMessages(applicationId,{afterMessageId});
    }
    const handleSendMessage=(text:string)=>{
        sendMessage(applicationId,{text})
    }

    return <Chat 
        className={className} 
        provider={messages}
        onBeforeMessages={handleBeforeMessages}
        onAfterMessages={handleAfterMessages}
        onSendMessage={handleSendMessage}
        />
};
