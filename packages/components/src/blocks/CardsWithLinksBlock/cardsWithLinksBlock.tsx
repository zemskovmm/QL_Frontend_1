import React, { useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./cardsWithLinksBlock.module.css";
import Link from "next/link";
import arrow from "./arrow-left.svg";
import preview from "./preview.png";

export interface CardsWithLinksBlockElement {
  title: string;
  subtitle: string;
  elements: { title: string; links: { name: string; link: string }[] }[];
}

export const CardsWithLinksBlock = (props: CardsWithLinksBlockElement) => {
  return (
    <div className="py-12">
      <div className="px-10 flex justify-between mx-auto max-w-screen-xl w-full">
        <div className={styles.cardsWithLinksBlock}>
          <div className={styles.cardsWithLinksBlock__head}>
            <h2 className={styles.cardsWithLinksBlock__title} dangerouslySetInnerHTML={{ __html: props.title }} />
            <div
              className={styles.cardsWithLinksBlock__subtitle}
              dangerouslySetInnerHTML={{ __html: props.subtitle }}
            />
          </div>
          <div className={styles.cardsWithLinksBlock__list}>
            {props.elements.map((el) => (
              <div className={styles.cardsWithLinksBlock__item + " " + styles.cardsWithLinksBlock__grid}>
                <div className={styles.cardsWithLinksBlock__itemTitle} dangerouslySetInnerHTML={{ __html: el.title }} />
                {el.links?.map((item) => (
                  <Link href={item.link ?? "#"}>
                    <a className={`flex`}>
                      <img src={arrow} alt="" />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardsWithLinksBlockInfo: TypedBlockTypeInfo<CardsWithLinksBlockElement> = {
  id: "cardsWithLinksBlock",
  name: "CardsWithLinksBlock",
  preview: preview,
  renderer: CardsWithLinksBlock,
  initialData: {
    title: "Header",
    subtitle: "Header",
    elements: [
      {
        title: "string",
        links: [
          {
            name: "st",
            link: "s",
          },
        ],
      },
    ],
  },
  definition: {
    subTypes: {
      elementLinks: {
        fields: [
          {
            id: "name",
            type: "String",
            name: "Name",
          },
          {
            id: "link",
            type: "String",
            name: "Link",
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
            id: "links",
            name: "Links",
            type: "List",
            listType: "elementLinks",
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
        type: "Custom",
        customType: "Html",
        name: "Subtitle",
      },
      {
        id: "elements",
        name: "Elements",
        type: "List",
        listType: "element",
      },
      {
        id: "textOverButton",
        type: "Custom",
        customType: "Html",
        name: "Text Over Button",
      },
      {
        id: "showPostscript",
        type: "CheckBox",
        name: "ShowPostscript",
      },
    ],
  },
};
