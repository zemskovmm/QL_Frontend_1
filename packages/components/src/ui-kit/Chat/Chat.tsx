import React,{ FC } from "react"
import cn from 'classnames'
import { MessageList,MessageListProvider } from "./_components/MessageList"

export type ChatPropsType={
    classname?:string;
    provider:MessageListProvider;
    onBeforeMessages:(id:number)=>void;
    onAfterMessages:(id:number)=>void;
}

export const Chat:FC<ChatPropsType> = ({classname,provider,onBeforeMessages,onAfterMessages})=>{



    return (
        <MessageList provider={provider} onBeforeMessages={onBeforeMessages} onAfterMessages={onAfterMessages}/>
    )
    // <div className={cn("flex flex-col border gap-2 p-2", className)} >
    //     <Messages className="flex-grow" store={store}/>
    //     <MessagesEdit applicationId={applicationId} store={store}/>
    // </div>
}