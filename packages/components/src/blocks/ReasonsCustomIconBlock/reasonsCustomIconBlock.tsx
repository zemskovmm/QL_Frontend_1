import React, { useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./reasonsCustomIconBlock.module.css";
import { is } from "@babel/types/lib/index-legacy";
import icon from "./acceptIcon.svg";

export interface ReasonsCustomIconBlockElement {
  header: string;
  elements: { title: string; text: string }[];
  showButton: boolean;
  alignButton: string;
}

export const ReasonsCustomIconBlock = (props: ReasonsCustomIconBlockElement) => {
  // const [isOpen, Open] = useState(false);
  return (
    <div className="py-28">
      <div className="flex justify-between mx-auto max-w-screen-xl w-full">
        <div className={styles.reasonsCustomIconBlock}>
          <div className={styles.reasonsCustomIconBlock__title}>{props.header}</div>
          <div className={styles.reasonsCustomIconBlock__list}>
            {props.elements.map((el) => (
              <div className={styles.reasonsCustomIconBlock__item}>
                <div className={styles.reasonsCustomIconBlock__icon}>
                  <img src={icon} alt="" />
                </div>
                <div className={`flex flex-col`}>
                  <div className={styles.reasonsCustomIconBlock__itemTitle}>{el.title}</div>
                  <div className={styles.reasonsCustomIconBlock__text} dangerouslySetInnerHTML={{ __html: el.text }} />
                </div>
              </div>
            ))}
            {props.showButton && (
              <button className={styles.reasonsCustomIconBlock__button} style={{ margin: props.alignButton }}>
                Подобрать жилье
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReasonsCustomIconBlockInfo: TypedBlockTypeInfo<ReasonsCustomIconBlockElement> = {
  id: "reasonsCustomIconBlock",
  name: "ReasonsCustomIconBlock",
  renderer: ReasonsCustomIconBlock,
  initialData: {
    header: "Header",
    elements: [
      {
        title: "string",
        text: "string",
      },
    ],
    showButton: true,
    alignButton: "",
  },
  definition: {
    subTypes: {
      element: {
        fields: [
          {
            id: "title",
            type: "String",
            name: "Title",
          },
          {
            id: "text",
            type: "String",
            name: "Text",
          },
        ],
      },
    },
    fields: [
      {
        id: "header",
        type: "String",
        name: "Header",
      },
      {
        id: "elements",
        name: "Elements",
        type: "List",
        listType: "element",
      },
      {
        id: "showButton",
        type: "CheckBox",
        name: "Show Button",
      },
      {
        id: "alignButton",
        type: "String",
        name: "Align Button",
      },
    ],
  },
};
