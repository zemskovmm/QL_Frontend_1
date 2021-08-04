import React from "react";
import styles from "./articleListBlock.module.css";
import test from "./test.png";
import calendary from "./calendary.svg";
import { ApiBaseUrl } from "../../../api/apiClientBase";

export const rangeMap = (count: number) =>
  Array(count)
    .fill(null)
    .map((_, i) => i);

export interface articleListBlockElement {
  title: string;
  img: number | null;
  date: string;
  tags: { name: string; link: string }[];
}

export const ArticleBlock = (props: articleListBlockElement) => {
  return (
    <div className={`${styles.articleList__width} pb-2.5 lg:pb-10`}>
      <div className={styles.articleList}>
        <div className={`flex flex-col relative mb-3`}>
          <img
            className={styles.articleList__img}
            src={props.img ? `${ApiBaseUrl}/api/media/${props.img}` : test}
            alt=""
          />
          {props.date && (
            <div className={styles.articleList__date}>
              <img src={calendary} alt="" /> {props.date}
            </div>
          )}
        </div>
        <div className={`lg:flex-col lg:flex justify-between lg:px-2.5 lg:mt-4`}>
          <div className={styles.articleList__title}>{props.title}</div>
          <div className={`flex flex-wrap`}>
            {props.date && <span className={styles.articleList__tag}>Изучение языка</span>}
            <span className={styles.articleList__tag}>Изучение языка</span>
            <span className={styles.articleList__tag}>Изучение языка</span>
            <span className={styles.articleList__tag}>Изучение языка</span>
            <span className={styles.articleList__tag}>Изучение языка</span>
          </div>
        </div>
      </div>
    </div>
  );
};
