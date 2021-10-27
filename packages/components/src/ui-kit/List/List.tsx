import React, { FunctionComponent } from "react";
import { ListBorder } from "./ListBorder";
import { ListItem } from "./ListItem";
import { ListItemType } from "./_types";

export type ListPropsType = {
    className?: string;
    items: Array<ListItemType>;
    onClick: (id:string) => void;
    depth?: number;
    withoutBorder?: boolean;
}

export const List:FunctionComponent<ListPropsType> = ({className,items,onClick,depth=0,withoutBorder=false})=>{
    
    return <ListBorder withoutBorder={withoutBorder} className={`flex flex-col ${className}`}>
        {items.map(({id,text})=>(
            <ListItem 
                depth={depth}
                key={id} 
                id={id} 
                text={text} 
                onClick={onClick}
            />
        ))}
    </ListBorder>
}