import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./framesWithArrowBlock.module.css";
import preview from "./preview.png";

export interface FramesWithArrowBlockElement {
  elements: { text: string }[];
}

export const FramesWithArrowBlock = (props: FramesWithArrowBlockElement) => {
  return (
    <div className="px-10 flex justify-start items-start flex-wrap mx-auto max-w-screen-xl w-full">
      {props.elements.map((el, ind) => (
        <div className={styles.frame} key={ind}>
          {el.text}
        </div>
      ))}
    </div>
  );
};

export const FramesWithArrowBlockInfo: TypedBlockTypeInfo<FramesWithArrowBlockElement> = {
  id: "FramesWithArrowBlock",
  name: "FramesWithArrowBlock",
  preview: preview,
  renderer: FramesWithArrowBlock,
  initialData: {
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
        id: "elements",
        name: "Elements",
        type: "List",
        listType: "element",
      },
    ],
  },
};
