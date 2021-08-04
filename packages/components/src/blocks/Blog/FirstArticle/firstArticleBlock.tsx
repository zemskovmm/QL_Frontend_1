import React from "react";
import { TypedBlockTypeInfo } from "../../blocks-info";
import styles from "./firstArticleBlock.module.css";
import preview from "./preview.png";
import test from "./test.png";
import calendary from "./calendary.svg";
import { ComponentLink } from "../../../component-link";
import { ApiBaseUrl } from "../../../api/apiClientBase";

export interface FirstArticleBlockElement {
  title: string;
  img: number | null;
  date: string;
  tags: { name: string; link: string }[];
  blog: boolean;
}

export const FirstArticleBlock = (props: FirstArticleBlockElement) => {
  return (
    <div className={`${styles.firstArticle__width} ${props.blog ? styles.firstArticle__blog : ""} py-12`}>
      <div className={styles.firstArticle}>
        <div className={`flex flex-col relative mb-3`}>
          <img
            className={styles.firstArticle__img}
            src={props.img ? `${ApiBaseUrl}/api/media/${props.img}` : test}
            alt=""
          />
          {!props.blog && props.date && (
            <div className={styles.firstArticle__date}>
              <img src={calendary} alt="" /> {props.date}
            </div>
          )}
        </div>
        <div
          className={`${
            props.blog ? "items-center md:items-start flex flex-col md:flex-row lg:pr-1" : ""
          } lg:flex justify-between lg:px-2.5 lg:mt-4`}
        >
          {props.blog ? (
            <div className={styles.firstArticle__date}>
              <img src={calendary} alt="" /> {props.date}
            </div>
          ) : (
            <div className={styles.firstArticle__title}>{props.title}</div>
          )}
          <div className={`${props.blog ? "justify-center md:justify-start" : ""} flex flex-wrap`}>
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
    blog: false,
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
        id: "blog",
        type: "CheckBox",
        name: "Blog",
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
