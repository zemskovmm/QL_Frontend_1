import React from "react";
import styles from "./articleListBlock.module.css";
import test from "./test.png";
import calendary from "./calendary.svg";

export const rangeMap = (count: number) =>
  Array(count)
    .fill(null)
    .map((_, i) => i);

export interface articleListBlockElement {
  title: string;
  img: string | null;
  date: string;
  tags: { name: string; link: string }[];
}

export const ArticleBlock = (props: articleListBlockElement) => {
  return (
    <div className={`${styles.articleList__width} pb-2.5 lg:pb-10`}>
      <div className={styles.articleList}>
        <div className={`flex flex-col relative mb-3`}>
          <img className={styles.articleList__img} src={test} alt="" />
          <div className={styles.articleList__date}>
            <img src={calendary} alt="" /> 04.02.2017
          </div>
        </div>
        <div className={`lg:flex-col lg:flex justify-between lg:px-2.5 lg:mt-4`}>
          <div className={styles.articleList__title}>Почему нет прогресса во французском</div>
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

export const ArticleListBlock = (props: { items: articleListBlockElement[] }) => {
  const count = rangeMap(7);
  const length = count.length / 3;
  const lengthMap = [
    length % 1 === 0 ? Math.floor(length) : Math.floor(length + 1),
    length % 1 === 0 || ((count.length + 2) / 3) % 1 === 0 ? Math.floor(length) : Math.floor(length + 1),
    Math.floor(length),
  ];
  return (
    <div className={`flex flex-col lg:flex-row`}>
      <div className={`flex flex-col lg:w-4/12`}>
        {count.slice(0, lengthMap[0]).map((el: number) => (
          <ArticleBlock img={""} title={""} date={""} tags={[]} key={""} />
        ))}
      </div>
      <div className={`flex flex-col lg:w-4/12 lg:mx-10`}>
        {count.slice(lengthMap[0], lengthMap[0] + lengthMap[1]).map((el: number) => (
          <ArticleBlock img={""} title={""} date={"2"} tags={[]} key={""} />
        ))}
      </div>
      <div className={`flex flex-col lg:w-4/12`}>
        {count.slice(lengthMap[0] + lengthMap[1], lengthMap[0] + lengthMap[1] + lengthMap[2]).map((el: number) => (
          <ArticleBlock img={""} title={""} date={""} tags={[]} key={""} />
        ))}
      </div>
    </div>
  );
};
