import React, { useContext, useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import { ComponentHostContext } from "../index";
import style from "./breadcrumbsBlock.module.css";
import icon from "./arrow-left.svg";

export interface BreadcrumbsBlockElement {
  items: { name: string; link: string }[];
}

export const BreadcrumbsBlock = (props: BreadcrumbsBlockElement) => {
  return (
    <div className={style.breadcrumbs + " flex"}>
      {props.items.map((el, index) => (
        <>
          <a href={el.link} className={style.breadcrumbs__items} key={`${index} bread`}>
            {el.name}
            {props.items.length - 1 > index && <img src={icon} alt="" />}
          </a>
        </>
      ))}
    </div>
  );
};

export const BreadcrumbsBlockInfo: TypedBlockTypeInfo<BreadcrumbsBlockElement> = {
  id: "breadcrumbsBlock",
  name: "BreadcrumbsBlock",
  renderer: BreadcrumbsBlock,
  initialData: {
    items: [
      {
        name: "Home",
        link: "/",
      },
    ],
  },
  definition: {
    subTypes: {
      items: {
        fields: [
          {
            id: "name",
            type: "String",
            name: "name",
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
        id: "items",
        type: "List",
        name: "breadcrumbs",
        listType: "items",
      },
    ],
  },
};
