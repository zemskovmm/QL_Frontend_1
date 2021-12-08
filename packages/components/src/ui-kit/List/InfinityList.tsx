import React, { FC, useEffect } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListOnItemsRenderedProps } from "react-window";
import { InfinityListProvider } from "./InfinityListProvider";
import { ListItem, LIST_ITEM_H } from "./ListItem";
import cn from "classnames";

export type InfinityListPropsType = {
  className?: string;
  provider: InfinityListProvider;
  maxSize?: number;
  onClick: (id: string) => void;
  onItemsRendered: (startIndex: number, stopIndex: number) => void;
  depth?: number;
};

export const InfinityList: FC<InfinityListPropsType> = ({
  className,
  maxSize = 20,
  provider,
  onClick,
  onItemsRendered,
  depth = 0,
}) => {
  const handleItemsRendered = ({ overscanStartIndex, overscanStopIndex }: ListOnItemsRenderedProps) => {
    onItemsRendered(overscanStartIndex, overscanStopIndex);
  };

  const Row = ({ index, style }: any) => {
    const item = provider.items[index];
    const hanldeClick = item ? onClick : () => {};
    const { id, text } = item || {
      id: `${index}`,
      text: "Loading...",
    };
    return (
      <ListItem
        id={id}
        style={style}
        depth={depth}
        key={`InfinityListLoading${id}`}
        text={text}
        onClick={() => hanldeClick(id)}
      />
    );
  };

  const maxHeight = LIST_ITEM_H * maxSize;
  const minHeight = provider.count ? LIST_ITEM_H : 0;

  return (
    <div className={cn(className)} style={{ minHeight, maxHeight }}>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            onItemsRendered={handleItemsRendered}
            width={width}
            height={height}
            itemCount={provider.count}
            itemSize={LIST_ITEM_H}
          >
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
};
