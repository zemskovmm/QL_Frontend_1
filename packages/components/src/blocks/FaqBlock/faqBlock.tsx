import React, { useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./faqBlock.module.css";
import arrow from "./arrow-down.svg";
import preview from "./preview.jpg";
import { HtmlPresenter } from "../../ui/HtmlPresenter/htmlPresenter";

export interface FaqBlockElement {
  title: string;
  elementsLeft: { title: string; text: string }[];
  elementsRight: { title: string; text: string }[];
}

export const FaqBlock = (props: FaqBlockElement) => {
  const [name, setName] = useState("");

  return (
    <div className="py-12">
      <div className="px-10 flex justify-between mx-auto max-w-screen-xl w-full">
        <div className={`flex w-full flex-col`}>
          <div className={styles.faqBlock__title}>{props.title}</div>
          <div className={`flex w-full ${styles.faqBlock__container}`}>
            <div className={`flex w-full flex-col pr-1`}>
              {props.elementsLeft.map((el, index) => (
                <div
                  onClick={() => (name === `${index} leftListFaq` ? setName("") : setName(`${index} leftListFaq`))}
                  className={`${styles.faqBlock__item} w-full flex flex-col ${
                    name === `${index} leftListFaq` ? styles.showItem : styles.hideItem
                  }`}
                  key={index + "leftListFaq"}
                >
                  <div className={`flex items-center`}>
                    <div className={styles.faqBlock__itemTitle} dangerouslySetInnerHTML={{ __html: el.title }} />
                    <img className={`ml-auto ${styles.faqBlock__itemArrow}`} src={arrow} alt="" />
                  </div>
                  <div className={`${styles.faqBlock__itemText}`} dangerouslySetInnerHTML={{ __html: el.text }} />
                </div>
              ))}
            </div>
            <div className={`flex w-full flex-col pl-1`}>
              {props.elementsRight.map((el, index) => (
                <div
                  onClick={() => (name === `${index} rightListFaq` ? setName("") : setName(`${index} rightListFaq`))}
                  className={`${styles.faqBlock__item} w-full flex flex-col ${
                    name === `${index} rightListFaq` ? styles.showItem : styles.hideItem
                  }`}
                  key={index + "leftListFaq"}
                >
                  <div className={`flex items-center`}>
                    <div className={styles.faqBlock__itemTitle} dangerouslySetInnerHTML={{ __html: el.title }} />
                    <img className={`ml-auto ${styles.faqBlock__itemArrow}`} src={arrow} alt="" />
                  </div>
                  <div className={`${styles.faqBlock__itemText}`}>
                    <HtmlPresenter text={el.text} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FaqBlockInfo: TypedBlockTypeInfo<FaqBlockElement> = {
  id: "faqBlock",
  name: "FaqBlock",
  preview: preview,
  renderer: FaqBlock,
  initialData: {
    title: "FAQ",
    elementsLeft: [
      {
        title: "string",
        text: "string",
      },
    ],
    elementsRight: [
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
        id: "elementsLeft",
        name: "Elements",
        type: "List",
        listType: "element",
      },
      {
        id: "elementsRight",
        name: "Elements",
        type: "List",
        listType: "element",
      },
      {
        id: "title",
        type: "String",
        name: "Title",
      },
    ],
  },
};
