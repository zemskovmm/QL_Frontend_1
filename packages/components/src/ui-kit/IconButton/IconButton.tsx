import React, { FunctionComponent } from "react";
import { Icon } from "@project/components/src/ui-kit/Icon";
import { IconButtonPropsType } from "./_types";


export const IconButton:FunctionComponent<IconButtonPropsType> = 
({className,id="",src,alt,size,onClick})=>{

    const handleOnClick = ()=>{
        onClick && onClick(id)
    }

    return <button className={className} onClick={handleOnClick}>
        <Icon src={src} alt={alt} size={size}/>
    </button>
}