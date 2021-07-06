import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./reasonsAcceptCardBlock.module.css";
import icon from "./acceptIcon.svg";
import { ButtonFormBlock } from "../ButtonFormBlock/buttonFormBlock";
import preview from "./preview.png";
import { HtmlPresenter } from "../../ui/HtmlPresenter/htmlPresenter";
import cn from "classnames";
import { ApiBaseUrl } from "../../api/apiClientBase";

export interface ReasonsAcceptCardBlockElement {
  header: string;
  subtitle: string;
  textOverButton: string;
  elements: { text: string; icon?: number | null }[];
  showPostscript: boolean;
  fullWidthPostscript: boolean;
  textButton: string;
  showButton: boolean;
}

export const ReasonsAcceptCardBlock = (props: ReasonsAcceptCardBlockElement) => {
  return (
    <div className="py-12">
      <div className="px-4 lg:px-10 flex flex-col justify-between mx-auto max-w-screen-xl w-full">
        <div className={styles.reasonsAcceptCardBlock__titleblock}>
          <div className={styles.reasonsAcceptCardBlock__title}>{props.header}</div>
          {props.subtitle && <span className={styles.reasonsAcceptCardBlock__subtitle}>{props.subtitle}</span>}
        </div>

        <div className={"flex flex-wrap w-full"}>
          {props.elements.map((el) => (
            <div className={styles.reasonsAcceptCardBlock__item + " " + styles.reasonsAcceptCardBlock__grid}>
              <div className={styles.reasonsAcceptCardBlock__icon}>
                {el.icon ? <img src={`${ApiBaseUrl}/api/media/${el.icon}`} alt="" /> : <img src={icon} alt="" />}
              </div>
              <div className={styles.reasonsAcceptCardBlock__itemTitle} dangerouslySetInnerHTML={{ __html: el.text }} />
            </div>
          ))}
          {(props.showPostscript || props.showButton) && !props.fullWidthPostscript && (
            <div className={cn(styles.reasonsAcceptCardBlock__blockText, "flex-col align")}>
              {props.showPostscript && (
                <div className={styles.reasonsAcceptCardBlock__buttonText}>
                  <HtmlPresenter text={props.textOverButton} />
                </div>
              )}
              {props.showButton && <ButtonFormBlock name={props.textButton} myClass={`mt-3`} align={`flex-start`} />}
            </div>
          )}
        </div>
        {(props.showPostscript || props.showButton) && props.fullWidthPostscript && (
          <div className={styles.postScriptButton}>
            {props.showPostscript && (
              <div className={styles.postScriptButton__description}>
                <HtmlPresenter text={props.textOverButton} />
              </div>
            )}
            {props.showButton && <ButtonFormBlock name={props.textButton} align={"justify-end"} />}
          </div>
        )}
      </div>
    </div>
  );
};

export const ReasonsAcceptCardBlockInfo: TypedBlockTypeInfo<ReasonsAcceptCardBlockElement> = {
  id: "reasonsAcceptCardBlock",
  name: "ReasonsAcceptCardBlock",
  preview: preview,
  renderer: ReasonsAcceptCardBlock,
  initialData: {
    header: "Header",
    subtitle: "",
    textOverButton: "9000",
    elements: [
      {
        text: "string",
      },
    ],
    showPostscript: true,
    fullWidthPostscript: false,
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
            name: "Text",
          },
          {
            id: "icon",
            type: "Custom",
            customType: "Image",
            name: "Icon",
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
        id: "fullWidthPostscript",
        type: "CheckBox",
        name: "FullWidthPostscript",
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
