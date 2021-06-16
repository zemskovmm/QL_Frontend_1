import React from "react";

import styles from "./NewsBlock.module.css";
import cn from "classnames";
import { ApiBaseUrl } from "../../api/apiClientBase";
import { TypedBlockTypeInfo } from "../blocks-info";
import preview from "./preview.png";

export interface NewsProps {
  title: string;
  url?: string;
  num?: number;
  news?: { img: number | null; link: string; description: string; date: string }[];
}

export const NewsBlock: React.FC<NewsProps> = ({ title, url, num, news }) => (
  <section className={"py-24"}>
    <div className={cn(styles.container, "px-10 flex flex-col max-w-screen-xl w-full my-0 mx-auto")}>
      <h2 className={styles.title}>
        {url ? (
          <a className={styles.link} href={url}>
            {title}
          </a>
        ) : (
          <>{title}</>
        )}
        {num && num > 0 ? (
          <>
            {" "}
            <span>({num})</span>
          </>
        ) : (
          ""
        )}
      </h2>
      <div className={cn(styles.news, "flex flex-wrap")}>
        {news &&
          news.map(({ link, img, description, date }, ind) => (
            <a key={ind} href={url}>
              <img src={`${ApiBaseUrl}/api/media/${img}`} alt="" />
              <div>
                <span>{date}</span>
                <p>{description}</p>
              </div>
            </a>
          ))}
      </div>
    </div>
  </section>
);

export const NewsBlockInfo: TypedBlockTypeInfo<NewsProps> = {
  id: "newsBlock",
  name: "NewsBlock",
  preview: preview,
  renderer: NewsBlock,
  initialData: {
    title: "Header",
    url: "",
    num: 0,
    news: [
      {
        img: null,
        link: "#",
        description: "text",
        date: "01-01-2020",
      },
    ],
  },
  definition: {
    subTypes: {
      element: {
        fields: [
          {
            id: "img",
            name: "Image",
            type: "Custom",
            customType: "Image",
          },
          {
            id: "link",
            name: "Link",
            type: "String",
          },
          {
            id: "description",
            name: "Description",
            type: "String",
          },
          {
            id: "date",
            name: "Date",
            type: "String",
          },
        ],
      },
    },
    fields: [
      {
        id: "title",
        type: "String",
        name: "Title",
      },
      {
        id: "url",
        type: "String",
        name: "URL",
      },
      {
        id: "num",
        type: "Number",
        name: "Num:",
      },

      {
        id: "news",
        name: "News",
        type: "List",
        listType: "element",
      },
    ],
  },
};
