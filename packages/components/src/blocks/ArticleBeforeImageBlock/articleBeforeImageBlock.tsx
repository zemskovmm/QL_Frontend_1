import React, { useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./articleBeforeImageBlock.module.css";
import { is } from "@babel/types/lib/index-legacy";
import { ApiBaseUrl } from "../../api/apiClientBase";
import preview from "./preview.png";

export interface ArticleBeforeImageBlockElement {
  title: string;
  text: string;
  img: number | null;
}

export const ArticleBeforeImageBlock = (props: ArticleBeforeImageBlockElement) => {
  return (
    <div className="py-12">
      <div className="px-10 flex justify-between mx-auto max-w-screen-xl w-full">
        <div className={styles.articleBeforeImageBlock}>
          <div className={styles.articleBeforeImageBlock__title}>{props.title}</div>
          <div className={styles.articleBeforeImageBlock__text} dangerouslySetInnerHTML={{ __html: props.text }} />
          <img className={styles.articleBeforeImageBlock__img} src={`${ApiBaseUrl}/api/media/${props.img}`} alt="" />
        </div>
      </div>
    </div>
  );
};

export const ArticleBeforeImageBlockInfo: TypedBlockTypeInfo<ArticleBeforeImageBlockElement> = {
  id: "articleBeforeImageBlock",
  name: "ArticleBeforeImageBlock",
  preview: preview,
  renderer: ArticleBeforeImageBlock,
  initialData: {
    title: "string",
    text: "string",
    img: null,
  },
  definition: {
    fields: [
      {
        id: "title",
        type: "String",
        name: "Title",
      },
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
    ],
  },
};
