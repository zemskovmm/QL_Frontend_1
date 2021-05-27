import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./titleAndCallBackBlock.module.css";
import Tabs from "../../ui/Tabs/Tabs";
import Search from "../../ui/search/Search";
import { ServerCatalogWidget, CatalogWidget } from "../../ui/catalog/catalogWidget";
import { ButtonFormBlock } from "../ButtonFormBlock/buttonFormBlock";

enum TabsEnum {
  university,
  housing,
}

export interface TitleAndCallBackBlockElement {
  title: string;
  textButton: string;
  textAbove: string;
  background: number | null;
  showButton: boolean;
}

export const TitleAndCallBackBlock = (props: TitleAndCallBackBlockElement) => {
  return (
    <Search title={props.title} background={props.background} callback={true}>
      {props.showButton && (
        <div className={`flex flex-col ${styles.callbackBlock}`}>
          <div className={`${styles.callbackBlockText}`} dangerouslySetInnerHTML={{ __html: props.textAbove }} />
          <ButtonFormBlock name={props.textButton} align={`center`} />
        </div>
      )}
    </Search>
  );
};

export const TitleAndCallBackBlockInfo: TypedBlockTypeInfo<TitleAndCallBackBlockElement> = {
  id: "titleAndCallBackBlock",
  name: "TitleAndCallBackBlock",
  renderer: TitleAndCallBackBlock,
  initialData: {
    title: "Title",
    textButton: "Title",
    textAbove: "Title",
    background: null,
    showButton: false,
  },
  definition: {
    fields: [
      {
        id: "title",
        type: "String",
        name: "Title",
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
