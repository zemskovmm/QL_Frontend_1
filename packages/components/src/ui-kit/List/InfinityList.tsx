import React, { FunctionComponent,useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList} from "react-window";
import { ListItemType } from ".";
import { ListItem } from "./ListItem";

export type InfinityListPropsType = {
    className?: string;
    items: Array<ListItemType>;
    depth?: number;
    onClick: (id:string) => void;
    onItemRender: (index:number) => void;
}

export const InfinityList:FunctionComponent<InfinityListPropsType> = ({className,items,onClick,onItemRender,depth=0})=>{
    
    const Row = ({ index, style }:any) => {
        onItemRender(index);
        const {id,text} = items[index] || {
            id:`InfinityList-${index}`,
            text: "Loading...",
            depth: 0,
        }
        const hanldeClick = items[index] ? onClick:()=>{}

        return <ListItem 
            style={style}
            depth={depth}
            key={id} 
            id={id} 
            text={text} 
            onClick={hanldeClick}
        />
    };

    return <div className={className}>
        <AutoSizer>
            {({ height, width }) => (
                <FixedSizeList
                    height={height}
                    itemCount={items.length}
                    itemSize={35}
                    width={width}
                >
                    {Row}
                </FixedSizeList>
            )}
        </AutoSizer>
    </div> 
}