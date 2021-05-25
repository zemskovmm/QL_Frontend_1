import React, { FC } from "react";
import style from "./bigCardsListBlock.module.css";
import { TypedBlockTypeInfo } from "../blocks-info";

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
      {card.url ? (
        <a href={card.url} className={style.bigCard}>
          <img src={`https://ql.dotlic.ru/api/media/${card.img}`} alt="" className={style.bigCard__img} />
          <div className={style.bigCard__title} dangerouslySetInnerHTML={{ __html: card.title }} />
          <div className={style.bigCard__subtitle} dangerouslySetInnerHTML={{ __html: card.text }} />
        </a>
      ) : (
        <div className={style.bigCard}>
          <img src={`https://ql.dotlic.ru/api/media/${card.img}`} alt="" className={style.bigCard__img} />
          <div className={style.bigCard__title} dangerouslySetInnerHTML={{ __html: card.title }} />
          <div className="bigCard__subtitle" dangerouslySetInnerHTML={{ __html: card.text }} />
        </div>
      )}
    </>
  );
};

type BigCardsListBlockElement = {
  elements: { img: number | null; title: string; text: string; url: string }[];
  title: string;
  linksButton: { link: string; name: string; description: string }[];
};

export const BigCardsListBlock: FC<BigCardsListBlockElement> = ({ elements, linksButton, title }) => {
  return (
    <div className="py-28">
      <div className="flex justify-between mx-auto max-w-screen-xl w-full">
        <div className={style.bigCardsListBlock__container}>
          <h2 className={style.bigCardsListBlock__title} dangerouslySetInnerHTML={{ __html: title }} />
          <div className={style.bigCardsListBlock__list}>
            {elements.map((el) => (
              <BigCard card={el} />
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
    linksButton: [{ link: "string", name: "string", description: "string" }],
  },
  definition: {
    subTypes: {
      linksButton: {
        fields: [
          {
            id: "link",
            type: "String",
            name: "link",
          },
          {
            id: "name",
            type: "String",
            name: "name",
          },
          {
            id: "description",
            type: "String",
            name: "description",
          },
        ],
      },
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
        id: "elements",
        name: "Elements",
        type: "List",
        listType: "element",
      },
      {
        id: "title",
        type: "String",
        name: "Title",
      },
      {
        id: "linksButton",
        name: "LinksButton",
        type: "List",
        listType: "element",
      },
    ],
  },
};
