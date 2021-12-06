import React, { FC, useEffect } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListOnItemsRenderedProps } from "react-window";
import { InfinityListProvider } from "./InfinityListProvider";
import { ListItem, LIST_ITEM_H } from "./ListItem";

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
  maxSize = 3,
  provider,
  onClick,
  onItemsRendered,
  depth = 0,
}) => {
  const handleItemsRendered = ({ overscanStartIndex, overscanStopIndex }: ListOnItemsRenderedProps) => {
    onItemsRendered(overscanStartIndex, overscanStopIndex);
  };

  useEffect(() => {
    console.log("provider", provider.count, maxSize);
  }, [provider]);

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

  const height = LIST_ITEM_H * (provider.count > maxSize ? maxSize : provider.count);

  return (
    <FixedSizeList
      className={className}
      onItemsRendered={handleItemsRendered}
      height={height}
      itemCount={provider.count}
      itemSize={LIST_ITEM_H}
      width={"100%"}
    >
      {Row}
    </FixedSizeList>
  );
};
