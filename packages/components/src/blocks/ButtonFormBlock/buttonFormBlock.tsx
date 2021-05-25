import React, { useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./buttonFormBlock.module.css";
import { is } from "@babel/types/lib/index-legacy";

export interface ButtonFormBlockElement {
  name: string;
  icon: number | null;
  link: string;
  align: string;
}

export const ButtonFormBlock = (props: ButtonFormBlockElement) => {
  return (
    <div className="flex mx-auto max-w-screen-xl w-full" style={{ justifyContent: props.align }}>
      <a className={styles.button} href={props.link}>
        {props.icon && <img src={`https://ql.dotlic.ru/api/media/${props.icon}`} alt="" />}
        <span>{props.name}</span>
      </a>
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
        customType: "Image"
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
            id: "flex-start",
            name: "left",
          },
          {
            id: "center",
            name: "center",
          },
          {
            id: "flex-end",
            name: "right",
          },
        ],
      },
    ],
  },
};
