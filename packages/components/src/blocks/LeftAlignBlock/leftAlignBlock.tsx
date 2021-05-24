import React, { useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./leftAlignBlock.module.css";
import { is } from "@babel/types/lib/index-legacy";
import icon from "./acceptIcon.svg";

export interface LeftAlignBlockElement {
  elements: { title: string; text: string }[];
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
                  <img src={icon} alt="" />
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
