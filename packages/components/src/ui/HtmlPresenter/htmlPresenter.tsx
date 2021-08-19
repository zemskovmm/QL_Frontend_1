import React from "react";
import styles from "./htmlPresenter.module.css";

export const HtmlPresenter = (props: { text: string }) => {
  return <div className={styles.text} dangerouslySetInnerHTML={{ __html: props.text }} />;
};
