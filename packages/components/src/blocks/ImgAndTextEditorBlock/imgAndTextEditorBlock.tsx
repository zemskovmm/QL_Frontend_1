import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./imgAndTextEditorBlock.module.css";
import { ButtonFormBlock } from "../ButtonFormBlock/buttonFormBlock";
import { ApiBaseUrl } from "../../api/apiClientBase";
import preview from "./preview.png";
import { HtmlPresenter } from "../../ui/HtmlPresenter/htmlPresenter";

export interface ImgAndTextEditorBlockElement {
  align: boolean;
  text: string;
  img: number | null;
  imgWidth: string;
  textButton: string;
  showButton: boolean;
}

export const ImgAndTextEditorBlock = (props: ImgAndTextEditorBlockElement) => {
  return (
    <div className="py-12">
      <div className="px-10 flex justify-center mx-auto max-w-screen-xl w-full">
        <div className={`${styles.imgAndTextEditorBlock} w-full ${props.align ? "flex-row-reverse" : ""}`}>
          <div
            className={`${styles.imgAndTextEditorBlock__content} ${
              props.align ? styles.imgAndTextEditorBlock__contentRight : styles.imgAndTextEditorBlock__contentLeft
            }`}
          >
            <HtmlPresenter text={props.text} />
            {props.showButton && <ButtonFormBlock myClass={`mt-6`} name={props.textButton} align={`justify-start`} />}
          </div>
          {props.img && (
            <img
              src={`${ApiBaseUrl}/api/media/${props.img}`}
              style={{ maxWidth: props.imgWidth }}
              alt=""
              className={styles.imgAndTextEditorBlock__img}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const ImgAndTextEditorBlockInfo: TypedBlockTypeInfo<ImgAndTextEditorBlockElement> = {
  id: "imgAndTextEditorBlock",
  name: "ImgAndTextEditorBlock",
  preview: preview,
  renderer: ImgAndTextEditorBlock,
  initialData: {
    align: false,
    text: "string",
    img: null,
    imgWidth: "400px",
    textButton: "",
    showButton: false,
  },
  definition: {
    fields: [
      {
        id: "text",
        type: "Custom",
        customType: "Html",
        name: "Text",
      },
      {
        id: "img",
        type: "Custom",
        customType: "Image",
        name: "Img",
      },
      {
        id: "align",
        type: "CheckBox",
        name: "Image from the left",
      },
      {
        id: "imgWidth",
        type: "Select",
        name: "Img Width",
        possibleValues: [
          {
            id: "400px",
            name: "400 px",
          },
          {
            id: "470px",
            name: "470 px",
          },
          {
            id: "500px",
            name: "500 px",
          },
          {
            id: "600px",
            name: "600 px",
          },
        ],
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
