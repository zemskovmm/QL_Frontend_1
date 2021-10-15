import React, { FunctionComponent } from "react";
import { ReactNode } from "react";
import { Text } from "../Text";

export type ListItemPropsType = {
    id: string;
    text: string;
    onClick: (id:string)=>void;
    component?: ReactNode;
}

export const ListItem:FunctionComponent<ListItemPropsType> = ({id,text,onClick,component=(<></>)})=>{

    const handleClick = () => {
        onClick(id);
    }

    return (
        <div className="flex flex-col">
            <button className="border" onClick={handleClick}>
                <Text text={text}/>
            </button>
            {component}
        </div>
        
    )
}