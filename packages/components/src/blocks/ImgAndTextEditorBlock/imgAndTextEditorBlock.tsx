import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./imgAndTextEditorBlock.module.css";
import { ButtonFormBlock } from "../ButtonFormBlock/buttonFormBlock";
import { ApiBaseUrl } from "../../api/apiClientBase";
import preview from "./preview.png";
import { HtmlPresenter } from "../../ui/HtmlPresenter/htmlPresenter";
import cn from "classnames";

export interface ImgAndTextEditorBlockElement {
  align: boolean;
  text: string;
  titlePart?: string;
  videoLink?: string;
  img: number | null;
  imgWidth: string;
  textButton: string;
  buttonLink: string;
  showButton: boolean;
}

export const ImgAndTextEditorBlock = (props: ImgAndTextEditorBlockElement) => {
  return (
    <div className="lg:py-12">
      <div className="lg:px-10 px-4 flex justify-center mx-auto max-w-screen-xl w-full">
        <div
          className={cn(
            styles.imgAndTextEditorBlock,
            "w-full",
            props.align ? "flex-row-reverse" : "",
            props.videoLink ? "items-stretch" : "items-center"
          )}
        >
          <div
            className={`${styles.imgAndTextEditorBlock__content} ${
              props.align ? styles.imgAndTextEditorBlock__contentRight : styles.imgAndTextEditorBlock__contentLeft
            }`}
          >
            {props.titlePart && <HtmlPresenter text={props.titlePart} />}
            {props.videoLink && (
              <iframe
                className={styles.imgAndTextEditorBlock__imgmobile}
                src={props.videoLink}
                title="YouTube video player"
                width="100%"
                height="315"
              />
            )}
            {props.img && !props.videoLink && (
              <img
                src={`${ApiBaseUrl}/api/media/${props.img}`}
                alt=""
                className={styles.imgAndTextEditorBlock__imgmobile}
              />
            )}
            <HtmlPresenter text={props.text} />
            {props.showButton && (
              <ButtonFormBlock
                myClass={`mt-6`}
                name={props.textButton}
                align={`justify-start`}
                link={props.buttonLink}
              />
            )}
          </div>
          {props.videoLink && (
            <iframe
              className={styles.imgAndTextEditorBlock__img}
              src={props.videoLink}
              title="YouTube video player"
              width={props.imgWidth}
              height="auto"
            />
          )}
          {props.img && !props.videoLink && (
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
    titlePart: "Title",
    videoLink: "",
    img: null,
    imgWidth: "400px",
    textButton: "",
    buttonLink: "",
    showButton: false,
  },
  definition: {
    fields: [
      {
        id: "titlePart",
        type: "Custom",
        customType: "Html",
        name: "Title Part",
      },
      {
        id: "text",
        type: "Custom",
        customType: "Html",
        name: "Text",
      },
      {
        id: "videoLink",
        type: "String",
        name: "Video Link:",
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
        id: "buttonLink",
        type: "String",
        name: "Button link",
      },
      {
        id: "showButton",
        type: "CheckBox",
        name: "Show button",
      },
    ],
  },
};
