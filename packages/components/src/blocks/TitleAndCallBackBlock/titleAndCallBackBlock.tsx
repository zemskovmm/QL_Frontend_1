import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./titleAndCallBackBlock.module.css";
import Search from "../../ui/search/Search";
import { ButtonFormBlock } from "../ButtonFormBlock/buttonFormBlock";
import preview from "./preview.png";

enum TabsEnum {
  university,
  housing,
}

export interface TitleAndCallBackBlockElement {
  title: string;
  titleColor: "black" | "white";
  titleShadow?: boolean;
  textButton: string | React.ReactNode;
  textAbove: string;
  background: number | null;
  logo: number | null;
  showButton: boolean;
}

export const TitleAndCallBackBlock = (props: TitleAndCallBackBlockElement) => {
  return (
    <Search
      logo={props.logo}
      title={props.title}
      titleColor={props.titleColor}
      titleShadow={props.titleShadow}
      background={props.background}
      callback={true}
    >
      {props.showButton && (
        <div className={`flex flex-col ${styles.callbackBlock}`}>
          <div className={`${styles.callbackBlockText}`} dangerouslySetInnerHTML={{ __html: props.textAbove }} />
          <ButtonFormBlock name={props.textButton || ""} align={`center`} />
        </div>
      )}
    </Search>
  );
};

export const TitleAndCallBackBlockInfo: TypedBlockTypeInfo<TitleAndCallBackBlockElement> = {
  id: "titleAndCallBackBlock",
  name: "TitleAndCallBackBlock",
  preview: preview,
  renderer: TitleAndCallBackBlock,
  initialData: {
    title: "Title",
    titleColor: "black",
    titleShadow: false,
    textButton: "Title",
    textAbove: "Title",
    background: null,
    logo: null,
    showButton: false,
  },
  definition: {
    fields: [
      {
        id: "logo",
        type: "Custom",
        customType: "Image",
        name: "Logo",
      },
      {
        id: "title",
        type: "String",
        name: "Title",
      },
      {
        id: "titleColor",
        type: "Radio",
        name: "Title Color",
        possibleValues: [
          {
            id: "black",
            name: "Black",
          },
          {
            id: "white",
            name: "White",
          },
        ],
      },
      {
        id: "titleShadow",
        type: "CheckBox",
        name: "Title with shadow",
      },
      {
        id: "textButton",
        type: "String",
        name: "Text button",
      },
      {
        id: "textAbove",
        type: "Custom",
        customType: "Html",
        name: "Text above",
      },
      {
        id: "background",
        type: "Custom",
        customType: "Image",
        name: "Background",
      },
      {
        id: "showButton",
        type: "CheckBox",
        name: "Show button",
      },
    ],
  },
};
