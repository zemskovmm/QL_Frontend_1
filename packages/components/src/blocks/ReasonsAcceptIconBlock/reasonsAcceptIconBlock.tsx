import React, { useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./reasonsAcceptIconBlock.module.css";
import { is } from "@babel/types/lib/index-legacy";
import icon from "./acceptIcon.svg";
import { ButtonFormBlock } from "../ButtonFormBlock/buttonFormBlock";
import preview from "./preview.png";

export interface ReasonsAcceptIconBlockElement {
  header: string;
  textOverButton: string;
  elements: { title: string; text: string }[];
  showButton: boolean;
  textButton: string;
}

export const ReasonsAcceptIconBlock = (props: ReasonsAcceptIconBlockElement) => {
  return (
    <div className="py-12 px-4 lg:px-0">
      <div className="flex justify-between mx-auto max-w-screen-xl w-full">
        <div className={"flex flex-col w-full"}>
          <div className={styles.reasonsAcceptIconBlock__title}>{props.header}</div>
          <div className={"flex flex-wrap w-full flex-col lg:flex-row"}>
            {props.elements.map((el) => (
              <div className={styles.reasonsAcceptIconBlock__item}>
                <div className={styles.reasonsAcceptIconBlock__icon}>
                  <img src={icon} alt="" />
                </div>
                <div className={`flex flex-col`}>
                  <div className={styles.reasonsAcceptIconBlock__itemTitle}>{el.title}</div>
                  <div className={styles.reasonsAcceptIconBlock__text} dangerouslySetInnerHTML={{ __html: el.text }} />
                </div>
              </div>
            ))}
            {props.showButton && (
              <div className={styles.reasonsAcceptIconBlock__item + " flex-col px-10 lg:px-0"}>
                {props.textOverButton && (
                  <div
                    className={styles.reasonsAcceptIconBlock__buttonText}
                    dangerouslySetInnerHTML={{ __html: props.textOverButton }}
                  />
                )}
                <ButtonFormBlock name={props.textButton} align={`center`} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReasonsAcceptIconBlockInfo: TypedBlockTypeInfo<ReasonsAcceptIconBlockElement> = {
  id: "reasonsAcceptIconBlock",
  name: "ReasonsAcceptIconBlock",
  preview: preview,
  renderer: ReasonsAcceptIconBlock,
  initialData: {
    header: "Header",
    textOverButton: "9000",
    elements: [
      {
        title: "string",
        text: "string",
      },
    ],
    showButton: true,
    textButton: "search",
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
        id: "textOverButton",
        type: "Custom",
        customType: "Html",
        name: "Text Over Button",
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
    ],
  },
};
