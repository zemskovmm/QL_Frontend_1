import React, { useState } from "react";
import { TypedBlockTypeInfo } from "../../blocks-info";
import preview from "./preview.png";
import { HtmlPresenter } from "../../../ui/HtmlPresenter/htmlPresenter";
import { ApiBaseUrl } from "../../../api/apiClientBase";

export interface historyClientsBlockElement {
  name: string;
  age: string;
  city: string;
  img: string | null;
  text: string;
  textAfter: string;
}

export const HistoryClientsBlock = (props: historyClientsBlockElement) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`mx-4 md:mx-0 my-2.5 md:my-5 rounded-md flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start pt-4 px-4 pb-10 md:p-9`}
      style={{ border: "1px solid #EFF3FA" }}
    >
      <img
        className={`w-16 md:w-24 mb-3 md:mb-0 md:mr-9 rounded-full`}
        src={
          props.img
            ? `${ApiBaseUrl}/api/media/${props.img}`
            : "https://secure.gravatar.com/avatar/e79614dec5cf2e6758e8c75b6cb333f8?s=180&d=identicon"
        }
        alt=""
      />
      <div className={`flex flex-col items-center md:items-start justify-center md:justify-start`}>
        <div className={`font-bold md:text-lg`}>{props.name}</div>
        <div className={`text-xs mb-2 md:mb-4`} style={{ color: "#646F83" }}>
          {props.age}, {props.city}
        </div>
        <HtmlPresenter text={props.text} />
        {open && <HtmlPresenter text={props.textAfter} />}
        <button
          className={`mt-2 mb:mt-3 text-xs md:text-sm border-dashed border-b	`}
          style={{ color: "#567DD0" }}
          onClick={() => setOpen(!open)}
        >
          {open ? "close" : "open"}
        </button>
      </div>
    </div>
  );
};

export const HistoryClientsBlockInfo: TypedBlockTypeInfo<historyClientsBlockElement> = {
  id: "historyClientsBlock",
  name: "HistoryClientsBlock",
  preview: preview,
  renderer: HistoryClientsBlock,
  initialData: {
    name: "Header",
    age: "20.04.2017",
    img: null,
    city: "",
    text: "",
    textAfter: "",
  },
  definition: {
    fields: [
      {
        id: "img",
        type: "Custom",
        customType: "Image",
        name: "Img",
      },
      {
        id: "name",
        type: "String",
        name: "Name",
      },
      {
        id: "city",
        type: "String",
        name: "City",
      },
      {
        id: "age",
        type: "String",
        name: "Age",
      },
      {
        id: "text",
        name: "Text",
        type: "Custom",
        customType: "Html",
      },
      {
        id: "textAfter",
        name: "Text After",
        type: "Custom",
        customType: "Html",
      },
    ],
  },
};
