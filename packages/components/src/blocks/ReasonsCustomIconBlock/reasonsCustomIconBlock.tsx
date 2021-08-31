import React, { useEffect, useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./reasonsCustomIconBlock.module.css";
import { ButtonFormBlock } from "../ButtonFormBlock/buttonFormBlock";
import { ApiBaseUrl } from "../../api/apiClientBase";
import preview from "./preview.png";

export interface ReasonsCustomIconBlockElement {
  header: string;
  subtitle?: string;
  elements: { title: string; text: string; image: number | null; link?: string }[];
  showButton: boolean;
  textButton: string;
  alignButton: string;
}

export const ReasonsCustomIconBlock = (props: ReasonsCustomIconBlockElement) => {
  const [widthInner, setWidthInner] = useState(true);
  useEffect(() => {
    setWidthInner(window.innerWidth < 1024);
    return;
  });
  return (
    <div className="py-12">
      <div className="px-4 lg:px-10 flex justify-between mx-auto max-w-screen-xl w-full">
        <div className={"flex flex-col w-full"}>
          <div className={styles.reasonsCustomIconBlock__title}>{props.header}</div>
          {props.subtitle && <h2 className={styles.reasonsCustomIconBlock__subtitle}>{props.subtitle}</h2>}
          <div className={"flex flex-col lg:flex-row flex-wrap w-full"}>
            {props.elements.map((el) => {
              return el.link
                  ? <a href={el.link} className={styles.reasonsCustomIconBlock__item}>
                    <div className={styles.reasonsCustomIconBlock__icon}>
                      <img src={`${ApiBaseUrl}/api/media/${el.image}`} alt="" />
                    </div>
                    <div className={`flex flex-col w-full items-center`}>
                      <div className={styles.reasonsCustomIconBlock__itemTitle}>{el.title}</div>
                      <div className={styles.reasonsCustomIconBlock__text}
                           dangerouslySetInnerHTML={{ __html: el.text }} />
                    </div>
                  </a>
                  : <div className={styles.reasonsCustomIconBlock__item}>
                    <div className={styles.reasonsCustomIconBlock__icon}>
                      <img src={`${ApiBaseUrl}/api/media/${el.image}`} alt="" />
                    </div>
                    <div className={`flex flex-col w-full items-center`}>
                      <div className={styles.reasonsCustomIconBlock__itemTitle}>{el.title}</div>
                      <div className={styles.reasonsCustomIconBlock__text}
                           dangerouslySetInnerHTML={{ __html: el.text }} />
                    </div>
                  </div>
            })}
          </div>
          {props.showButton && (
            <ButtonFormBlock name={props.textButton} align={widthInner ? "justify-center" : props.alignButton} />
          )}
        </div>
      </div>
    </div>
  );
};

export const ReasonsCustomIconBlockInfo: TypedBlockTypeInfo<ReasonsCustomIconBlockElement> = {
  id: "reasonsCustomIconBlock",
  name: "ReasonsCustomIconBlock",
  preview: preview,
  renderer: ReasonsCustomIconBlock,
  initialData: {
    header: "Header",
    subtitle: "",
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
          {
            id: "link",
            type: "String",
            name: "Link",
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
        id: "subtitle",
        type: "String",
        name: "Subtitle",
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
