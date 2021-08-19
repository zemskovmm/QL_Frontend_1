import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./stringReasonsBlock.module.css";
import { ApiBaseUrl } from "../../api/apiClientBase";
import preview from "./preview.png";

export interface StringReasonsBlockElement {
  elements: { text: string; img: number | null }[];
}

export const StringReasonsBlock = (props: StringReasonsBlockElement) => {
  return (
    <div className="py-12">
      <div className="px-10 flex justify-between mx-auto max-w-screen-xl w-full">
        <div className={styles.stringReasonsBlock}>
          <div className={styles.stringReasonsBlock__list}>
            {props.elements.map((el) => (
              <div className={styles.stringReasonsBlock__item}>
                <img className={styles.stringReasonsBlock__icon} src={`${ApiBaseUrl}/api/media/${el.img}`} alt="" />
                <div className={`flex flex-col`}>
                  <div className={styles.stringReasonsBlock__text} dangerouslySetInnerHTML={{ __html: el.text }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const StringReasonsBlockInfo: TypedBlockTypeInfo<StringReasonsBlockElement> = {
  id: "stringReasonsBlock",
  name: "StringReasonsBlock",
  preview: preview,
  renderer: StringReasonsBlock,
  initialData: {
    elements: [
      {
        text: "string",
        img: null,
      },
    ],
  },
  definition: {
    subTypes: {
      element: {
        fields: [
          {
            id: "text",
            type: "Custom",
            customType: "Html",
            name: "Text",
          },
          {
            id: "img",
            type: "Custom",
            customType: "Image",
            name: "Img",
          },
        ],
      },
    },
    fields: [
      {
        id: "elements",
        name: "Elements",
        type: "List",
        listType: "element",
      },
    ],
  },
};
