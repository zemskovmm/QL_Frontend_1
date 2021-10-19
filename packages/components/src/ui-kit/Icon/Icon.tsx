import React, { FunctionComponent } from "react";
import { ICON_SIZES } from "./_constants";
import { IconPropsType } from "./_types";


export const Icon:FunctionComponent<IconPropsType> = 
({className,src,alt,size="4"})=>{
    
    const iconClass = [
        ICON_SIZES[size],
        className,
    ].join(' ');

    return <img 
        className={iconClass} 
        src={src}
        alt={alt}
    />
}