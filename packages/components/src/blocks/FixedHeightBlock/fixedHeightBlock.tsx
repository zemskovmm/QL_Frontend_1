import React, { useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./fixedHeightBlock.module.css";
import preview from "./preview.png";
import cn from "classnames";
import { HtmlPresenter } from "../../ui/HtmlPresenter/htmlPresenter";

export interface FixedHeightBlockElement {
  header: string;
  text: string;
  height: number;
}

export const FixedHeightBlock = (props: FixedHeightBlockElement) => {
  const [isOpen, Open] = useState(false);
  return (
    <div className="py-12">
      <div className={cn(styles.block, "px-10 flex justify-between flex-col mx-auto max-w-screen-xl w-full")}>
        <div className={styles.title}>{props.header}</div>
        <div className={cn(styles.text, isOpen ? styles.open : "")} style={{ maxHeight: +props.height }}>
          <HtmlPresenter text={props.text} />
        </div>
        <div className={cn(styles.arrow, isOpen ? styles.open : "")} onClick={() => Open((isOpen) => !isOpen)} />
      </div>
    </div>
  );
};

export const FixedHeightBlockInfo: TypedBlockTypeInfo<FixedHeightBlockElement> = {
  id: "fixedHeightBlock",
  name: "FixedHeightBlock",
  preview: preview,
  renderer: FixedHeightBlock,
  initialData: {
    header: "Header",
    text: "Text",
    height: 300,
  },
  definition: {
    fields: [
      {
        id: "header",
        type: "String",
        name: "Header",
      },
      {
        id: "text",
        type: "Custom",
        customType: "Html",
        name: "Text",
      },
      {
        id: "height",
        type: "Number",
        name: "Height",
      },
    ],
  },
};
