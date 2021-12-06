import React, { FC } from "react"
import { Text } from "@project/components/src/ui-kit/Text";
import { IconButton } from "@project/components/src/ui-kit/IconButton";
import CLIP_ICON from "@project/components/src/assets/icons/clip.svg";
import cn from 'classnames'

export type MessageType = {
    id:number;
    me: boolean;
    fileId?: number;
    text?: string;
};

type MessagePropsType = MessageType & {
    className?:string;
};

export const MIN_MESSAGE_HEIGHT=38;

export const Message: FC<MessagePropsType> = ({id,className,text,me,fileId}) => {
    return (
        <div
            id={`message_${id}`}
            style={{minHeight:MIN_MESSAGE_HEIGHT}}
            className={cn(
                "py-1.5",
                me ? "self-end pl-8 pr-2 " : "self-start pl-2 pr-8",
                className
            )}
        >
            <div 
                className={cn(
                    "flex flex-col p-2 h-full",
                    "border border-bdsecondary rounded",
                    me ? "bg-blue-50" : "bg-white",
                )}>
                {fileId ? <IconButton src={CLIP_ICON} size="16" />:null}
                {text ? <Text text={text} size="small" tag="pre"/>:null}
                
            </div>
        </div>
        
        
    )
};