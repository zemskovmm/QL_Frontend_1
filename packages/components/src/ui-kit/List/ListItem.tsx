import React, { FunctionComponent } from "react";
import { Text } from "../Text";

export type ListItemPropsType = {
    id: string;
    text: string;
    onClick: (id:string)=>void;
}

export const ListItem:FunctionComponent<ListItemPropsType> = ({id,text,onClick})=>{

    const handleClick = () => {
        onClick(id);
    }

    return (
        <button onClick={handleClick}>
            <Text text={text}/>
        </button>
    )
}