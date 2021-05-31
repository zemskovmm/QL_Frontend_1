import React, { FC } from "react";
import style from "./bigCardsListBlock.module.css";
import { TypedBlockTypeInfo } from "../blocks-info";
import {ApiBaseUrl} from "../../api/apiClientBase";

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
    <>
      <a href={card.url} className={style.bigCard}>
        <img src={`${ApiBaseUrl}/api/media/${card.img}`} alt="" className={style.bigCard__img} />
        <div className={style.bigCard__title} dangerouslySetInnerHTML={{ __html: card.title }} />
        <div className={style.bigCard__subtitle} dangerouslySetInnerHTML={{ __html: card.text }} />
      </a>
    </>
  );
};

type BigCardsListBlockElement = {
  elements: { img: number | null; title: string; text: string; url: string }[];
  title: string;
};

export const BigCardsListBlock: FC<BigCardsListBlockElement> = ({ elements, title }) => {
  return (
    <div className="py-12">
      <div className="px-10 flex justify-between mx-auto max-w-screen-xl w-full">
        <div className={style.bigCardsListBlock__container}>
          <h2 className={style.bigCardsListBlock__title} dangerouslySetInnerHTML={{ __html: title }} />
          <div className={style.bigCardsListBlock__list}>
            {elements.map((el) => (
              <div className="w-1/3">
                <BigCard card={el} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const BigCardsListBlockInfo: TypedBlockTypeInfo<BigCardsListBlockElement> = {
  id: "bigCardsListBlock",
  name: "BigCardsListBlock",
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
        id: "elements",
        name: "Elements",
        type: "List",
        listType: "element",
      },
    ],
  },
};
