import React, { FC } from "react";
import style from "./bigCardsListBlock.module.css";
import { TypedBlockTypeInfo } from "../blocks-info";
import { ApiBaseUrl } from "../../api/apiClientBase";
import preview from "./preview.png";
import cn from "classnames";

type BigCardProps = {
  card: {
    title: string;
    img: number | null;
    url: string;
    text: string;
  };
};

const BigCard: FC<BigCardProps> = ({ card }) => {
  return (
    <a href={card.url} className={style.bigCard}>
      <img src={`${ApiBaseUrl}/api/media/${card.img}`} alt="" className={style.bigCard__img} />
      <div className={style.bigCard__title} dangerouslySetInnerHTML={{ __html: card.title }} />
      <div className={style.bigCard__subtitle} dangerouslySetInnerHTML={{ __html: card.text }} />
    </a>
  );
};

type BigCardsListBlockElement = {
  elements: { img: number | null; title: string; text: string; url: string }[];
  title: string;
  subtitle?: string;
  mainStyle: boolean;
};

export const BigCardsListBlock: FC<BigCardsListBlockElement> = ({ elements, title, subtitle, mainStyle }) => {
  return (
    <div className={cn(mainStyle ? style.main : "", "py-12")}>
      <div className="px-10 flex flex-col justify-between mx-auto max-w-screen-xl w-full">
        <div className="flex items-end mb-10">
          <h2 className={style.bigCardsListBlock__title}>{title}</h2>
          {subtitle && <h3 className={style.bigCardsListBlock__subtitle}>{subtitle}</h3>}
        </div>
        <div className={cn(mainStyle ? "" : "", "flex flex-wrap w-full")}>
          {elements.map((el, ind) => (
            <BigCard key={ind} card={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const BigCardsListBlockInfo: TypedBlockTypeInfo<BigCardsListBlockElement> = {
  id: "bigCardsListBlock",
  name: "BigCardsListBlock",
  preview: preview,
  renderer: BigCardsListBlock,
  initialData: {
    elements: [
      {
        title: "string",
        text: "string",
        img: null,
        url: "",
      },
      {
        title: "string",
        text: "string",
        img: null,
        url: "",
      },
      {
        title: "string",
        text: "string",
        img: null,
        url: "",
      },
    ],
    title: "string",
    subtitle: "string",
    mainStyle: false,
  },
  definition: {
    subTypes: {
      element: {
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
          {
            id: "url",
            type: "String",
            name: "Url",
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
        id: "subtitle",
        type: "String",
        name: "Subtitle",
      },
      {
        id: "mainStyle",
        type: "CheckBox",
        name: "MainStyle",
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
