import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./TableBlock.module.css";

import preview from "./preview.png";
import cn from "classnames";
import { ApiBaseUrl } from "../../api/apiClientBase";

export interface TableRowElement {
  cellWidth?: string;
  maxTextWidth?: string;
  vertical?: boolean;
  text?: string;
  info?: TableRowElement[];
  titles?: string;
  title?: number;
  image?: number | null;
}

export interface TableRow {
  titles?: string;
  rows: TableRowElement[];
}

const TableRowBlock = (props: TableRowElement) => {
  const titleText =
    (props.image || props.text) && props.title && props.title > 0 ? props.titles?.split(";")[+props.title - 1] : "";
  return (
    <div
      className={cn(styles.cell, props.vertical ? styles.vertical : "")}
      style={{ maxWidth: props.cellWidth, flexShrink: props.cellWidth ? 0 : undefined }}
    >
      {props.info && props.info.length > 0 ? (
        <>
          <div className={styles.text} style={{ maxWidth: props.maxTextWidth }}>
            {titleText && <span>{titleText}</span>}
            {props.text}
            {props.image && <img src={`${ApiBaseUrl}/api/media/${props.image}`} alt="" />}
          </div>
          <div className={styles.info}>
            {props.info.map((el: any, ind: number) => (
              <TableRowBlock key={ind} {...el} titles={props.titles} />
            ))}
          </div>
        </>
      ) : (
        <>
          {titleText && <span>{titleText}</span>}
          {props.text}
          {props.image && <img src={`${ApiBaseUrl}/api/media/${props.image}`} alt="" />}
        </>
      )}
    </div>
  );
};

export const TableBlock = (props: TableRow) => {
  return (
    <div className="py-12">
      <div className="px-10 flex justify-between mx-auto w-full">
        <div className={styles.table}>
          {props.rows.map((row, ind) => {
            return <TableRowBlock key={ind} {...row} titles={props.titles} />;
          })}
        </div>
      </div>
    </div>
  );
};

export const TableBlockInfo: TypedBlockTypeInfo<TableRow> = {
  id: "tableBlock",
  name: "TableBlock",
  preview: preview,
  renderer: TableBlock,
  initialData: {
    titles: "",
    rows: [
      {
        text: "Text1",
      },
    ],
  },
  definition: {
    subTypes: {
      element: {
        fields: [
          {
            id: "text",
            name: "Text",
            type: "String",
          },
          {
            id: "title",
            name: "Number of title:",
            type: "Number",
          },
          {
            id: "image",
            name: "image",
            type: "Custom",
            customType: "Image",
          },
          {
            id: "cellWidth",
            type: "String",
            name: "Cell width:",
          },
          {
            id: "vertical",
            type: "CheckBox",
            name: "Vertical Cell",
          },
          {
            id: "maxTextWidth",
            type: "String",
            name: "Maximum text width:",
          },
          {
            id: "info",
            name: "Info",
            type: "List",
            listType: "element",
          },
        ],
      },
    },
    fields: [
      {
        id: "titles",
        name: "Titles",
        type: "String",
      },
      {
        id: "rows",
        name: "Rows",
        type: "List",
        listType: "element",
      },
    ],
  },
};
