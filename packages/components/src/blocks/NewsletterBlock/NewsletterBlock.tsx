import React, { useContext } from "react";
import styles from "./NewsletterBlock.module.css";
import { TypedBlockTypeInfo } from "../blocks-info";
import preview from "./preview.png";
import { ComponentHostContext } from "../index";

export interface NewsletterProps {
  title: string;
  description: string;
  buttonName: string;
}

export const NewsletterBlock = (props: NewsletterProps) => {
  const cl = useContext(ComponentHostContext);
  return (
    <div className={"py-24"}>
      <div className={styles.newsletter__bg}>
        <div className={styles.newsletter__content}>
          <div className={`flex flex-col ${styles.newsletter__textBlock}`}>
            <div className={styles.newsletter__title}>
              Получайте новые статьи <br /> блога по электроннй почте
            </div>
            <div className={styles.newsletter__desc}>
              Ваши данные не будут переданы <br /> третьим лицам. Мы не будем <br /> рассылать спам
            </div>
          </div>
          <form className={styles.newsletter__form}>
            <input type="text" className={styles.newsletter__input} placeholder={`E-mail`} required={true} />
            <button className={styles.newsletter__button}>Подписаться</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const NewsletterBlockInfo: TypedBlockTypeInfo<NewsletterProps> = {
  id: "newsletterBlock",
  name: "NewsletterBlock",
  preview: preview,
  renderer: NewsletterBlock,
  initialData: {
    title: "Header",
    description: "eqwe",
    buttonName: "",
  },
  definition: {
    fields: [
      {
        id: "title",
        type: "String",
        name: "Title",
      },
      {
        id: "description",
        type: "String",
        name: "Description",
      },
      {
        id: "buttonName",
        type: "String",
        name: "Button Text",
      },
    ],
  },
};
