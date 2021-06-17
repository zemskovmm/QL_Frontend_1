import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./framesWithArrowBlock.module.css";
import preview from "./preview.png";
import { HtmlPresenter } from "../../ui/HtmlPresenter/htmlPresenter";

export interface FramesWithArrowBlockElement {
  elements: { text: string }[];
  text: string;
}

export const FramesWithArrowBlock = (props: FramesWithArrowBlockElement) => {
  return (
    <div className="px-10 mx-auto max-w-screen-xl w-full">
      <HtmlPresenter text={props.text} />
      <div className="flex justify-start items-start flex-wrap">
        {props.elements.map((el, ind) => (
          <div className={styles.frame} key={ind}>
            {el.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export const FramesWithArrowBlockInfo: TypedBlockTypeInfo<FramesWithArrowBlockElement> = {
  id: "FramesWithArrowBlock",
  name: "FramesWithArrowBlock",
  preview: preview,
  renderer: FramesWithArrowBlock,
  initialData: {
    text: "Text",
    elements: [
      {
        text: "Text",
      },
      {
        text: "Text",
      },
    ],
  },
  definition: {
    subTypes: {
      element: {
        fields: [
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
        id: "text",
        type: "Custom",
        customType: "Html",
        name: "Text",
      },
      {
        id: "elements",
        name: "Elements",
        type: "List",
        listType: "element",
      },
    ],
  },
};
