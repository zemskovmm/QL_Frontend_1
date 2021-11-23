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

export const MIN_MESSAGE_HEIGHT=50;

export const Message: FC<MessagePropsType> = ({key,id,className,title,text,me}) => {
    return (
        <div 
            style={{minHeight:MIN_MESSAGE_HEIGHT}}
            key={key}
            className={cn(
                "flex flex-col rounded border px-2",
                me ? "bg-green-100 self-end" : "bg-white self-start",
                className
            )}>
            <Text text={`(${id}) ${title}`} size="caption" color="help"/>
            <Text text={text} />
        </div>
    )
};