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
    className?:string;
};

export const Message: FC<MessagePropsType> = ({className,title,text,me}) => {

    return (
        <div 
            className={cn(
                "flex flex-col rounded border px-2",
                me ? "bg-green-100 self-end" : "bg-white self-start",
                className
            )}>
            <Text text={title} size="caption" color="help"/>
            <Text text={text} />
        </div>
    )
};