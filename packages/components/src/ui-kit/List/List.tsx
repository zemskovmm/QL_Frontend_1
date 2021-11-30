import React, { FunctionComponent } from "react";
import { ListItem } from "./ListItem";
import { ListItemType } from "./_types";

export type ListPropsType = {
  className?: string;
  items: Array<ListItemType>;
  onClick: (id: string) => void;
  depth?: number;
};

export const List: FunctionComponent<ListPropsType> = ({ className, items, onClick, depth = 0 }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {items.map(({ id, text }) => (
        <ListItem depth={depth} key={id} text={text} onClick={() => onClick(id)} />
      ))}
    </div>
  );
};
