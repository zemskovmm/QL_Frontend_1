import React, { useContext, useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./buttonFormBlock.module.css";
import { is } from "@babel/types/lib/index-legacy";
import cn from "classnames";
import { ComponentHostContext } from "../index";
import { ApiBaseUrl } from "../../api/apiClientBase";
import preview from "./preview.png";

export interface ButtonFormBlockElement {
  name: string;
  iconLink?: string;
  icon?: number | null;
  link?: string;
  align: string;
  myClass?: string;
}

export const ButtonFormBlock = (props: ButtonFormBlockElement) => {
  const cl = useContext(ComponentHostContext);
  const icon = props.iconLink ? props.iconLink : props.icon ? `${ApiBaseUrl}/api/media/${props.icon}` : null;
  return (
    <div className={`flex mx-auto max-w-screen-xl w-full ${props.align} ${props.myClass}`}>
      {props.link ? (
        <a type={"button"} className={styles.button} href={props.link}>
          {icon && <img src={icon} alt="" />}
          <span>{props.name}</span>
        </a>
      ) : (
        <button type={"button"} className={styles.button} onClick={() => cl?.showContactUsForm()}>
          {icon && <img src={icon} alt="" />}
          <span>{props.name}</span>
        </button>
      )}
    </div>
  );
};

export const ButtonFormBlockInfo: TypedBlockTypeInfo<ButtonFormBlockElement> = {
  id: "buttonFormBlock",
  name: "ButtonFormBlock",
  preview: preview,
  renderer: ButtonFormBlock,
  initialData: {
    name: "string",
    iconLink: "string",
    icon: null,
    link: "",
    align: "string",
    myClass: "",
  },
  definition: {
    fields: [
      {
        id: "name",
        type: "String",
        name: "name",
      },
      {
        id: "iconLink",
        name: "IconLink",
        type: "String",
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
        id: "myClass",
        type: "String",
        name: "myClass",
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
