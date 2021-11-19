import { FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { useChatStore } from "./ChatStore";
import { Chat } from '@project/components/src/ui-kit/Chat'

type PropsType = {
    className?:string;
    applicationId: number;
};

export const ChatTab: FunctionalComponent<PropsType> = ({className, applicationId}) => {
    const {getMessages, messages}= useChatStore()

    useEffect(()=>{
        getMessages(applicationId);
    },[applicationId])

    const handleBeforeMessages=(beforeMessageId:number)=>{
        getMessages(applicationId,{beforeMessageId});
    }

    const handleAfterMessages=(afterMessageId:number)=>{
        getMessages(applicationId,{afterMessageId});
    }

    return <Chat 
        classname={className} 
        provider={messages}
        onBeforeMessages={handleBeforeMessages}
        onAfterMessages={handleAfterMessages}/>
};