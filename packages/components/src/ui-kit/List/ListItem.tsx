import React, { FunctionComponent,CSSProperties,ReactNode,MouseEvent } from "react";
import { Text } from "../Text";

export const LIST_ITEM_H = 40;

export type ListItemPropsType = {
    className?: string;
    id: string;
    text: string;
    onClick?: (id:string, event: MouseEvent)=>void;
    depth?: number;
    style?:CSSProperties;
}

export const ListItem:FunctionComponent<ListItemPropsType> = ({className,depth=0,id,text,onClick=()=>{},style})=>{

    const handleClick = (event: MouseEvent) => {
        onClick(id,event);
    }

    const ofset:Array<ReactNode> = []
    for(let d=0; d<depth; d++){
        ofset.push(<div className="pl-4"/>)
    }

    return (
        <div className={`relative border-l border-t border-r h-10 ${className}`} onClick={handleClick} style={style} >
            <div className="relative -bottom-px border-b flex items-center h-full px-4 py-1"  >
                {ofset}<Text text={text} size="small"/>
            </div>
        </div>
    )
}