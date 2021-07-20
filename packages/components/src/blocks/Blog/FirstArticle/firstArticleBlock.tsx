import React from "react";
import { TypedBlockTypeInfo } from "../../blocks-info";
import styles from "./firstArticleBlock.module.css";
import preview from "./preview.png";
import test from "./test.png";
import calendary from "./calendary.svg";
import { ComponentLink } from "../../../component-link";

export interface FirstArticleBlockElement {
  title: string;
  img: string | null;
  date: string;
  tags: { name: string; link: string }[];
}

export const FirstArticleBlock = (props: FirstArticleBlockElement) => {
  return (
    <div className={`${styles.firstArticle__width} py-12`}>
      <div className={styles.firstArticle}>
        <div className={`flex flex-col relative mb-3`}>
          <img className={styles.firstArticle__img} src={test} alt="" />
          <div className={styles.firstArticle__date}>
            <img src={calendary} alt="" /> 04.02.2017
          </div>
        </div>
        <div className={`lg:flex justify-between lg:px-2.5 lg:mt-4`}>
          <div className={styles.firstArticle__title}>Почему нет прогресса во французском</div>
          <div className={`flex flex-wrap`}>
            <span className={styles.firstArticle__tag}>Изучение языка</span>
            <span className={styles.firstArticle__tag}>Изучение языка</span>
            <span className={styles.firstArticle__tag}>Изучение языка</span>
            <span className={styles.firstArticle__tag}>Изучение языка</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FirstArticleBlockInfo: TypedBlockTypeInfo<FirstArticleBlockElement> = {
  id: "firstArticleBlock",
  name: "FirstArticleBlock",
  preview: preview,
  renderer: FirstArticleBlock,
  initialData: {
    title: "Header",
    date: "20.04.2017",
    img: null,
    tags: [],
  },
  definition: {
    subTypes: {
      tagsLinks: {
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
    },
    fields: [
      {
        id: "title",
        type: "String",
        name: "Title",
      },
      {
        id: "date",
        type: "String",
        name: "Date",
      },
      {
        id: "img",
        type: "Custom",
        customType: "Image",
        name: "Img",
      },
      {
        id: "tags",
        name: "Tags",
        type: "List",
        listType: "tagsLinks",
      },
    ],
  },
};
