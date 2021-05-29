import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./leftAlignBlock.module.css";

export interface LeftAlignBlockElement {
  elements: { title: string; text: string; img: number | null }[];
}

export const LeftAlignBlock = (props: LeftAlignBlockElement) => {
  return (
    <div className="py-28">
      <div className="flex justify-between mx-auto max-w-screen-xl w-full">
        <div className={styles.leftAlignBlock}>
          <div className={styles.leftAlignBlock__list}>
            {props.elements.map((el) => (
              <div className={styles.leftAlignBlock__item}>
                <div className={styles.leftAlignBlock__icon}>
                  <img src={`https://ql.dotlic.ru/api/media/${el.img}`} alt="" />
                </div>
                <div className={`flex flex-col`}>
                  <div className={styles.leftAlignBlock__itemTitle}>{el.title}</div>
                  <div className={styles.leftAlignBlock__text} dangerouslySetInnerHTML={{ __html: el.text }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const LeftAlignBlockInfo: TypedBlockTypeInfo<LeftAlignBlockElement> = {
  id: "leftAlignBlock",
  name: "LeftAlignBlock",
  renderer: LeftAlignBlock,
  initialData: {
    elements: [
      {
        title: "string",
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
            id: "title",
            type: "String",
            name: "Title",
          },
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
