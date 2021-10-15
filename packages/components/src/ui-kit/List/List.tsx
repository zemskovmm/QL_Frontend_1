import React, { FunctionComponent } from "react";
import { ListItem } from "./ListItem";
import { ListItemType } from "./_types";

export type ListPropsType = {
    className?: string;
    items: Array<ListItemType>;
    onClick: (id:string) => void;
}

export const List:FunctionComponent<ListPropsType> = ({className,items,onClick})=>{
    

    return <div className={`flex flex-col ${className}`}>
        {items.map(({id,text,list})=>(
            <ListItem 
                key={id} 
                id={id} 
                text={text} 
                onClick={onClick} 
                component={list ? <List items={list} onClick={onClick}/> : <></>}
            />
        ))}
    </div>
}