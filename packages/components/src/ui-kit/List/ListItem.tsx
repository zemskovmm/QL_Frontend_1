import React, { FunctionComponent,CSSProperties,ReactNode } from "react";
import { Text } from "../Text";

export const LIST_ITEM_H = 40;

export type ListItemPropsType = {
    id: string;
    text: string;
    onClick?: (id:string)=>void;
    depth?: number;
    style?:CSSProperties;
}

export const ListItem:FunctionComponent<ListItemPropsType> = ({depth=0,id,text,onClick=()=>{},style})=>{

    const handleClick = () => {
        onClick(id);
    }

    const ofset:Array<ReactNode> = []
    for(let d=0; d<depth; d++){
        ofset.push(<div className="pl-4"/>)
    }

    return (
        <div className="flex border-b items-center h-10 px-4 py-1" onClick={handleClick} style={style} >
            {ofset}<Text text={text} size="small"/>
        </div>
    )
}