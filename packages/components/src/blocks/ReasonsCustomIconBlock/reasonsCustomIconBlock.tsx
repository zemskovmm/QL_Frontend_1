import React, { useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./reasonsCustomIconBlock.module.css";
import { ButtonFormBlock } from "../ButtonFormBlock/buttonFormBlock";

export interface ReasonsCustomIconBlockElement {
  header: string;
  elements: { title: string; text: string; image: number | null }[];
  showButton: boolean;
  textButton: string;
  alignButton: string;
}

export const ReasonsCustomIconBlock = (props: ReasonsCustomIconBlockElement) => {
  // const [isOpen, Open] = useState(false);
  return (
    <div className="py-2">
      <div className="flex justify-between mx-auto max-w-screen-xl w-full">
        <div className={styles.reasonsCustomIconBlock}>
          <div className={styles.reasonsCustomIconBlock__title}>{props.header}</div>
          <div className={styles.reasonsCustomIconBlock__list}>
            {props.elements.map((el) => (
              <div className={styles.reasonsCustomIconBlock__item}>
                <div className={styles.reasonsCustomIconBlock__icon}>
                  <img src={`https://ql.dotlic.ru/api/media/${el.image}`} alt="" />
                </div>
                <div className={`flex flex-col`}>
                  <div className={styles.reasonsCustomIconBlock__itemTitle}>{el.title}</div>
                  <div className={styles.reasonsCustomIconBlock__text} dangerouslySetInnerHTML={{ __html: el.text }} />
                </div>
              </div>
            ))}
          </div>
          {props.showButton && <ButtonFormBlock name={props.textButton} align={props.alignButton} />}
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
        image: null,
      },
    ],
    showButton: true,
    alignButton: "",
    textButton: "call",
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
          {
            id: "image",
            name: "image",
            type: "Custom",
            customType: "Image",
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
        id: "textButton",
        type: "String",
        name: "Text button",
      },
      {
        id: "alignButton",
        type: "Radio",
        name: "Align Button",
        possibleValues: [
          {
            id: "justify-start",
            name: "left",
          },
          {
            id: "justify-center",
            name: "center",
          },
          {
            id: "justify-end",
            name: "right",
          },
        ],
      },
    ],
  },
};
