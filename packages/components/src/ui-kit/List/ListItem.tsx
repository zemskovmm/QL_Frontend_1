import React, { FunctionComponent } from "react";
import { ReactNode } from "react";
import { Text } from "../Text";

export type ListItemPropsType = {
    id: string;
    text: string;
    onClick: (id:string)=>void;
    depth: number;
}

export const ListItem:FunctionComponent<ListItemPropsType> = ({depth,id,text,onClick})=>{

    const handleClick = () => {
        onClick(id);
    }

    const ofset:Array<ReactNode> = []
    for(let d=0; d<depth; d++){
        ofset.push(<div className="pl-2"/>)
    }

    return (
        <div className="flex border px-2" onClick={handleClick}>
            {ofset}<Text text={text}/>
        </div>
    )
}