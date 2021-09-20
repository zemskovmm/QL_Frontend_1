import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./buttonFormBlock.module.css";
import cn from "classnames";
import { ApiBaseUrl } from "../../api/apiClientBase";
import preview from "./preview.png";

export interface ImageBlockElement {
  image: number | null;
  videoLink?: string;
  videoWidth?: string;
  videoHeight?: string;
  align: string;
}

export const ImageBlock = (props: ImageBlockElement) => {
  return (
    <div className={`flex w-full ${props.align}`}>
      {props.videoLink && (
              <iframe
                src={props.videoLink}
                title="YouTube video player"
                width={props.videoWidth || "100%"}
                height={props.videoHeight || "300px"}
              />
            )
      }
      {!props.videoLink && props.image && <img src={`${ApiBaseUrl}/api/media/${props.image}`} alt="" />}
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
    videoLink: "",
    videoWidth: "100%",
    videoHeight: "300px",
    align: "center",
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
        id: "videoLink",
        name: "Video Link:",
        type: "String",
      },
      {
        id: "videoWidth",
        name: "Video Width:",
        type: "String",
      },
      {
        id: "videoHeight",
        name: "Video Height:",
        type: "String",
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
