import React, { FunctionComponent,CSSProperties,ReactNode,MouseEvent } from "react";
import { Icon } from "@project/components/src/ui-kit/Icon";
import { Text } from "../Text";
import DOWN_ARROW_ICON from "@project/components/src/assets/icons/down-arrow.svg"
import RIGHT_ARROW_ICON from "@project/components/src/assets/icons/right-arrow.svg"

export const LIST_ITEM_H = 40;

export type ListItemPropsType = {
    className?: string;
    id: string;
    text: string;
    onClick?: (id:string, event: MouseEvent)=>void;
    depth?: number;
    style?: CSSProperties;
    isOpenArrow?: boolean;
    withArrow?: boolean;
}

export const ListItem:FunctionComponent<ListItemPropsType> = ({className,depth=0,id,text,onClick=()=>{},style,isOpenArrow="false",withArrow})=>{

    const handleClick = (event: MouseEvent) => {
        onClick(id,event);
    }

    const ofset:Array<ReactNode> = []
    for(let d=0; d<depth; d++){
        ofset.push(<div className="pl-4"/>)
    }

    return (
        <div className={`relative border-l border-t border-r h-10 flex-shrink-0 ${className}`} onClick={handleClick} style={style} >
            <div className="relative -bottom-px border-b flex items-center justify-between h-full px-4 py-1"  >
                <div className="flex max-h-9 overflow-hidden">{ofset}<Text text={text} size="small"/></div>
                {withArrow && <Icon src={ isOpenArrow ? DOWN_ARROW_ICON: RIGHT_ARROW_ICON } size="8"/>}
            </div>
        </div>
    )
}