import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./article-before-image-block.module.css";
import { ApiBaseUrl } from "../../api/apiClientBase";
import preview from "./preview.png";
import { HtmlPresenter } from "../../ui/HtmlPresenter/htmlPresenter";

export interface ArticleBeforeImageBlockElement {
  title: string;
  text: string;
  img: number | null;
}

export const ArticleBeforeImageBlock = (props: ArticleBeforeImageBlockElement) => {
  return (
    <div className="py-12">
      <div className="px-4 lg:px-10 flex flex-col width justify-between mx-auto max-w-screen-xl w-full">
        <div className={styles.articleBeforeImageBlock__title}>{props.title}</div>
        <HtmlPresenter text={props.text} />
        {props.img && <img className={"w-full rounded-md"} src={`${ApiBaseUrl}/api/media/${props.img}`} alt="" />}
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
