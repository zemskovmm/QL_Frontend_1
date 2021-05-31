import React, { useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./reasonsAcceptCardBlock.module.css";
import { is } from "@babel/types/lib/index-legacy";
import icon from "./acceptIcon.svg";
import { ButtonFormBlock } from "../ButtonFormBlock/buttonFormBlock";

export interface ReasonsAcceptCardBlockElement {
  header: string;
  textOverButton: string;
  elements: { title: string; text: string }[];
  showPostscript: boolean;
  textButton: string;
  showButton: boolean;
}

export const ReasonsAcceptCardBlock = (props: ReasonsAcceptCardBlockElement) => {
  return (
    <div className="py-12">
      <div className="px-10 flex justify-between mx-auto max-w-screen-xl w-full">
        <div className={styles.reasonsAcceptCardBlock}>
          <div className={styles.reasonsAcceptCardBlock__title}>{props.header}</div>
          <div className={styles.reasonsAcceptCardBlock__list}>
            {props.elements.map((el) => (
              <div className={styles.reasonsAcceptCardBlock__item + " " + styles.reasonsAcceptCardBlock__grid}>
                <div className={styles.reasonsAcceptCardBlock__icon}>
                  <img src={icon} alt="" />
                </div>
                <div
                  className={styles.reasonsAcceptCardBlock__itemTitle}
                  dangerouslySetInnerHTML={{ __html: el.text }}
                />
              </div>
            ))}
            {(props.showPostscript || props.showButton) && (
              <div className={styles.reasonsAcceptCardBlock__blockText + " flex-col align"}>
                {props.showPostscript && (
                  <div
                    className={styles.reasonsAcceptCardBlock__buttonText}
                    dangerouslySetInnerHTML={{ __html: props.textOverButton }}
                  />
                )}
                {props.showButton && <ButtonFormBlock name={props.textButton} myClass={`mt-3`} align={`flex-start`} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReasonsAcceptCardBlockInfo: TypedBlockTypeInfo<ReasonsAcceptCardBlockElement> = {
  id: "reasonsAcceptCardBlock",
  name: "ReasonsAcceptCardBlock",
  renderer: ReasonsAcceptCardBlock,
  initialData: {
    header: "Header",
    textOverButton: "9000",
    elements: [
      {
        title: "string",
        text: "string",
      },
    ],
    showPostscript: true,
    showButton: true,
    textButton: "search",
  },
  definition: {
    subTypes: {
      element: {
        fields: [
          {
            id: "text",
            type: "Custom",
            customType: "Html",
            name: "Text Over Button",
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
        id: "showPostscript",
        type: "CheckBox",
        name: "ShowPostscript",
      },
      {
        id: "textButton",
        type: "String",
        name: "Text button",
      },
      {
        id: "showButton",
        type: "CheckBox",
        name: "Show button",
      },
    ],
  },
};
