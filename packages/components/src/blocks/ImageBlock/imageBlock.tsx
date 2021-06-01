import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./buttonFormBlock.module.css";
import cn from "classnames";
import { ApiBaseUrl } from "../../api/apiClientBase";
import preview from "./preview.png";

export interface ImageBlockElement {
  image: number | null;
  align: string;
}

export const ImageBlock = (props: ImageBlockElement) => {
  return (
    <div className={`flex w-full ${props.align}`}>
      {props.image && <img src={`${ApiBaseUrl}/api/media/${props.image}`} alt="" />}
    </div>
  );
};

export const ImageBlockInfo: TypedBlockTypeInfo<ImageBlockElement> = {
  id: "imageBlock",
  name: "ImageBlock",
  preview: preview,
  renderer: ImageBlock,
  initialData: {
    image: null,
    align: "string",
  },
  definition: {
    fields: [
      {
        id: "image",
        name: "image",
        type: "Custom",
        customType: "Image",
      },
      {
        id: "align",
        type: "Radio",
        name: "align",
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
