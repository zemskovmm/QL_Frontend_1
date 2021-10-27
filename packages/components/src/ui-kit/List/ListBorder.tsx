import React, { FunctionComponent,CSSProperties } from "react";

export type ListBorderPropsType = {
    className?: string;
    style?:CSSProperties;
    withoutBorder?: boolean;
}

export const ListBorder:FunctionComponent<ListBorderPropsType> = ({className,style, withoutBorder=false, children})=>{
    const classes = [
        withoutBorder?"":"border-l border-t border-r",
        className
    ].join(" ")
    
    return <div style={style} className={classes}>
        {children}
    </div>
}