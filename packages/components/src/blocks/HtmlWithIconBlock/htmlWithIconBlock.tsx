import React, { useContext } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import styles from "./htmlWithIconBlock.module.css";

import MedalIcon from "./icons/medal.png";
import ListIcon from "./icons/list.png";
import LabelIcon from "./icons/label.png";

import preview from "./preview.png";
import cn from "classnames";

export interface HtmlWithIconBlockElement {
  title: string;
  html: string;
  link?: string;
  icon: string;
}

const IconChooser: React.FC<{ icon: string }> = ({ icon }) => {
  switch (icon) {
    case "medal":
      return <img src={MedalIcon} alt="" />;
    case "list":
      return <img src={ListIcon} alt="" />;
    case "label":
    default:
      return <img src={LabelIcon} alt="" />;
  }
};

export const HtmlWithIconBlock = (props: HtmlWithIconBlockElement) => {
  return (
    <div className={cn(styles.block, "px-10 flex justify-start items-start mx-auto max-w-screen-xl w-full")}>
      <IconChooser icon={props.icon} />
      <div>
        {props.link ? <a href={props.link}>{props.title}</a> : <h3>{props.title}</h3>}
        <div dangerouslySetInnerHTML={{ __html: props.html }} />
      </div>
    </div>
  );
};

export const HtmlWithIconBlockInfo: TypedBlockTypeInfo<HtmlWithIconBlockElement> = {
  id: "HtmlWithIconBlock",
  name: "HtmlWithIconBlock",
  preview: preview,
  renderer: HtmlWithIconBlock,
  initialData: {
    title: "string",
    link: "",
    icon: "medal",
    html: "<b>Lorem ipsum</b> <i>dolor sit amet</i>",
  },
  definition: {
    fields: [
      {
        id: "title",
        type: "String",
        name: "Title",
      },
      {
        id: "link",
        type: "String",
        name: "Link",
      },
      {
        id: "html",
        name: "html",
        type: "Custom",
        customType: "Html",
      },
      {
        id: "icon",
        type: "Radio",
        name: "Icon",
        possibleValues: [
          {
            id: "medal",
            name: "Medal",
          },
          {
            id: "list",
            name: "List",
          },
          {
            id: "label",
            name: "Label",
          },
        ],
      },
    ],
  },
};
