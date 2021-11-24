import React, { FC } from "react"
import { Text } from "@project/components/src/ui-kit/Text";
import cn from 'classnames'

export type MessageType = {
    id:number;
    me: boolean;
    title: string;
    text: string;
};

type MessagePropsType = MessageType & {
    key?:string;
    className?:string;
};

export const MIN_MESSAGE_HEIGHT=38;

export const Message: FC<MessagePropsType> = ({key,id,className,title,text,me}) => {
    return (
        <div 
            style={{minHeight:MIN_MESSAGE_HEIGHT}}
            className={cn(
                "py-1.5",
                me ? "self-end pl-8 pr-2 " : "self-start pl-2 pr-8",
                className
            )}
        >
            <div 
                key={key}
                className={cn(
                    "flex flex-col p-2 h-full",
                    "border border-bdsecondary rounded",
                    me ? "bg-blue-50" : "bg-white",
                )}>
                {/* <Text text={`(${id}) ${title}`} size="caption" color="help" /> */}
                <Text text={text} size="small" tag="pre"/>
            </div>
        </div>
        
        
    )
};