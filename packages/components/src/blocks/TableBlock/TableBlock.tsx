import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./TableBlock.module.css";

import preview from "./preview.png";
import cn from "classnames";
import { ApiBaseUrl } from "../../api/apiClientBase";

interface TableRowElement {
  cellWidth?: string;
  maxTextWidth?: string;
  vertical?: boolean;
  text?: string;
  info?: TableRowElement[];
  titles?: {
    title: string;
  }[];
  title?: number;
  note?: number;
  image?: number | null;
}

export interface TableRow {
  titles: {
    title: string;
  }[];
  rows: TableRowElement[];
  notes: {
    note: string;
  }[];
}

const TableRowBlock = (props: TableRowElement) => {
  const titleText: string =
    (props.image || props.text) && props.title && props.title > 0 && props.titles?.length
      ? props.titles[+props.title - 1]
        ? props.titles[+props.title - 1].title
        : ""
      : "";
  return (
    <div
      className={cn(styles.cell, props.vertical ? styles.vertical : "")}
      style={{ maxWidth: props.cellWidth, flexShrink: props.cellWidth ? 0 : undefined }}
    >
      {props.info && props.info.length > 0 ? (
        <>
          <div className={styles.text} style={{ maxWidth: props.maxTextWidth }}>
            {titleText && <span>{titleText}</span>}
            {props.text?.includes("<br/>") ? <p dangerouslySetInnerHTML={{ __html: props.text }} /> : props.text}
            {props.note && props.note > 0 ? (
              <sup>
                <a href={`#note${props.note}`}>{props.note}</a>
              </sup>
            ) : (
              ""
            )}
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
          {props.text?.includes("<br/>") ? <p dangerouslySetInnerHTML={{ __html: props.text }} /> : props.text}
          {props.note && props.note > 0 ? (
            <sup>
              <a href={`#note${props.note}`}>{props.note}</a>
            </sup>
          ) : (
            ""
          )}
          {props.image && <img src={`${ApiBaseUrl}/api/media/${props.image}`} alt="" />}
        </>
      )}
    </div>
  );
};

export const TableBlock = (props: TableRow) => {
  return (
    <div className="py-12">
      <div className="px-10 flex flex-col justify-between mx-auto w-full">
        <div className={styles.table}>
          {props.rows.map((row, ind) => {
            return <TableRowBlock key={ind} {...row} titles={props.titles} />;
          })}
        </div>
        {props.notes?.length > 0 && (
          <div className={styles.notes}>
            {props.notes.map(({ note }, ind) => (
              <p key={ind} id={`note${ind + 1}`}>
                ({ind + 1}) {note}
              </p>
            ))}
          </div>
        )}
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
    titles: [
      {
        title: "",
      },
    ],
    rows: [
      {
        text: "Text1",
      },
    ],
    notes: [
      {
        note: "",
      },
    ],
  },
  definition: {
    subTypes: {
      title: {
        fields: [
          {
            id: "title",
            type: "String",
            name: "Title",
          },
        ],
      },
      note: {
        fields: [
          {
            id: "note",
            type: "String",
            name: "Note",
          },
        ],
      },

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
            id: "note",
            name: "Note:",
            type: "Number",
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
        type: "List",
        listType: "title",
      },
      {
        id: "rows",
        name: "Rows",
        type: "List",
        listType: "element",
      },
      {
        id: "notes",
        name: "Notes",
        type: "List",
        listType: "note",
      },
    ],
  },
};
