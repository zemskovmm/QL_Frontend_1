import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import style from "./breadcrumbsBlock.module.css";
import icon from "./arrow-left.svg";
import icon_white from "./arrow-left-white.svg";
import preview from "./preview.png";
import cn from "classnames";
import { ComponentLink } from "../../component-link";
export interface BreadcrumbsBlockElement {
  whiteColor?: boolean;
  items: { name: string | React.ReactNode; link: string }[];
  relative?: boolean;
}

export const BreadcrumbsBlock = (props: BreadcrumbsBlockElement) => {
  return (
    <div
      className={cn(
        style.breadcrumbs,
        "flex",
        props.whiteColor ? style.breadcrumbs_white : "",
        props.relative ? "py-6 px-0" : "absolute px-5"
      )}
    >
      {props.items.map((el, index) => (
        <ComponentLink href={el.link ? el.link : "#"} key={`breadcrumbsBlock ${index} ${el.name}`}>
          <a className={"flex"} key={`${index}`}>
            {el.name}
            {props.items.length - 1 > index && <img src={props.whiteColor ? icon_white : icon} alt="" />}
          </a>
        </ComponentLink>
      ))}
    </div>
  );
};

export const BreadcrumbsBlockInfo: TypedBlockTypeInfo<BreadcrumbsBlockElement> = {
  id: "breadcrumbsBlock",
  name: "BreadcrumbsBlock",
  preview: preview,
  renderer: BreadcrumbsBlock,
  initialData: {
    items: [
      {
        name: "Home",
        link: "/",
      },
    ],
    whiteColor: false,
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
        id: "whiteColor",
        type: "CheckBox",
        name: "White color",
      },
      {
        id: "items",
        type: "List",
        name: "breadcrumbs",
        listType: "items",
      },
    ],
  },
};
