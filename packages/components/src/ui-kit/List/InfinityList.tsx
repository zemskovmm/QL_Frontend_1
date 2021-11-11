import React, { FunctionComponent, CSSProperties } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import { ListItemType } from ".";
import { ListItem, LIST_ITEM_H } from "./ListItem";

export type InfinityListPropsType = {
  className?: string;
  style?: CSSProperties;
  count: number;
  maxSize?: number;
  onClick: (id: string) => void;
  onItemRender: (index: number) => ListItemType | undefined;
  depth?: number;
};

export const InfinityList: FunctionComponent<InfinityListPropsType> = ({
  className,
  count,
  maxSize = 20,
  onClick,
  onItemRender,
  depth = 0,
}) => {
  const Row = ({ index, style }: any) => {
    const item = onItemRender(index);
    const hanldeClick = item ? onClick : () => {};
    const { id, text } = item || {
      id: `InfinityListLoading-${index}`,
      text: "Loading...",
    };
    return <ListItem style={style} depth={depth} key={id} text={text} onClick={() => hanldeClick(id)} />;
  };

  return (
    <div
      className={className}
      style={{
        height: LIST_ITEM_H * (count > maxSize ? maxSize : count),
      }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList height={height} itemCount={count} itemSize={LIST_ITEM_H} width={width}>
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
};
