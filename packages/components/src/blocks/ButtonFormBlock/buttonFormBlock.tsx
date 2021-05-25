import React, { useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./buttonFormBlock.module.css";
import { is } from "@babel/types/lib/index-legacy";
import cn from "classnames";

interface IComponentHost {
  showContactUsForm: () => void;
}

export interface ButtonFormBlockElement {
  name: string;
  icon: number | null;
  link: string;
  align: string;
  MyContext?: IComponentHost;
}

export const ButtonFormBlock = (props: ButtonFormBlockElement) => {
  console.log(props.MyContext?.showContactUsForm);
  return (
    <div className={`flex mx-auto max-w-screen-xl w-full ${props.align}`}>
      <button type={"button"} className={styles.button} onClick={() => props.MyContext?.showContactUsForm}>
        {props.icon && <img src={`https://ql.dotlic.ru/api/media/${props.icon}`} alt="" />}
        <span>{props.name}</span>
      </button>
    </div>
  );
};

export const ButtonFormBlockInfo: TypedBlockTypeInfo<ButtonFormBlockElement> = {
  id: "buttonFormBlock",
  name: "ButtonFormBlock",
  renderer: ButtonFormBlock,
  initialData: {
    name: "string",
    icon: null,
    link: "string",
    align: "string",
  },
  definition: {
    fields: [
      {
        id: "name",
        type: "String",
        name: "name",
      },
      {
        id: "icon",
        name: "icon",
        type: "Custom",
        customType: "Image",
      },
      {
        id: "link",
        type: "String",
        name: "link",
      },
      {
        id: "align",
        type: "Radio",
        name: "align",
        possibleValues: [
          {
            id: "justify-start",
            name: "left",
          },
          {
            id: "justify-center",
            name: "center",
          },
          {
            id: "justify-end",
            name: "right",
          },
        ],
      },
    ],
  },
};
