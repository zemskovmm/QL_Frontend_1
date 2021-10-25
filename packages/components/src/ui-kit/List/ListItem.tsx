import React, { FunctionComponent,CSSProperties,ReactNode } from "react";
import { Text } from "../Text";

export type ListItemPropsType = {
    id: string;
    text: string;
    onClick: (id:string)=>void;
    depth: number;
    style?:CSSProperties;
}

export const ListItem:FunctionComponent<ListItemPropsType> = ({depth,id,text,onClick,style})=>{

    const handleClick = () => {
        onClick(id);
    }

    const ofset:Array<ReactNode> = []
    for(let d=0; d<depth; d++){
        ofset.push(<div className="pl-2"/>)
    }

    return (
        <div className="flex border px-2" onClick={handleClick} style={style} >
            {ofset}<Text text={text}/>
        </div>
    )
}