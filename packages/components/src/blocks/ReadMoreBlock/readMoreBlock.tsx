import React, { useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./readMoreBlock.module.css";
import { is } from "@babel/types/lib/index-legacy";

export interface ReadMoreBlockElement {
  header: string;
  textBefore: string;
  textAfter: string;
}

export const ReadMoreBlock = (props: ReadMoreBlockElement) => {
  // const [isOpen, Open] = useState(false);
  return (
    <div className="py-28">
      <div className="flex justify-between mx-auto max-w-screen-xl w-full">
        <div className={styles.readMoreBlock}>
          <div className={styles.readMoreBlock__title}>{props.header}</div>
          <div className={styles.readMoreBlock__text} dangerouslySetInnerHTML={{ __html: props.textBefore }} />
          {/*{props.textAfter && !isOpen && (*/}
          {/*  <button className={styles.readMoreBlock__button} type={"button"} onClick={() => Open(true)}>*/}
          {/*    Читать полностью*/}
          {/*  </button>*/}
          {/*)}*/}
          {/*{isOpen && <div className={styles.readMoreBlock__text} dangerouslySetInnerHTML={{__html: props.textAfter}}/></div>}*/}
        </div>
      </div>
    </div>
  );
};

export const ReadMoreBlockInfo: TypedBlockTypeInfo<ReadMoreBlockElement> = {
  id: "readMoreBlock",
  name: "ReadMoreBlock",
  renderer: ReadMoreBlock,
  initialData: {
    header: "Header",
    textBefore: "9000",
    textAfter: "Text",
  },
  definition: {
    fields: [
      {
        id: "header",
        type: "String",
        name: "Header",
      },
      {
        id: "textBefore",
        type: "Custom",
        customType: "Html",
        name: "Text before",
      },
      {
        id: "textAfter",
        type: "Custom",
        customType: "Html",
        name: "Text after",
      },
    ],
  },
};
