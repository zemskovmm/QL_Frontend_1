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
  backgroundShadow?: string;
  logo: number | null;
  showButton: boolean;
  school?: boolean;
}

export const TitleAndCallBackBlock = (props: TitleAndCallBackBlockElement) => {
  return (
    <Search
      logo={props.logo}
      title={props.title}
      titleColor={props.titleColor}
      titleShadow={props.titleShadow}
      background={props.background}
      backgroundShadow={props.backgroundShadow}
      callback={true}
    >
      {props.showButton && (
        <div className={`flex flex-col ${styles.callbackBlock}`}>
          <div className={`${styles.callbackBlockText}`} dangerouslySetInnerHTML={{ __html: props.textAbove }} />
          {props.textButton && <ButtonFormBlock name={props.textButton} align={`center`} />}
        </div>
      )}
      {props.school && (
        <div className={`flex flex-col ${styles.school}`}>
          <div className={`${styles.callbackBlockText}`} dangerouslySetInnerHTML={{ __html: props.textAbove }} />
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
    backgroundShadow: "0%",
    logo: null,
    showButton: false,
    school: false,
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
        id: "backgroundShadow",
        type: "String",
        name: "Background Shadow",
      },
      {
        id: "showButton",
        type: "CheckBox",
        name: "Show button",
      },
    ],
  },
};
