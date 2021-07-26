import React, { useContext } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import { ComponentHostContext } from "../index";
import IframeResizer from "iframe-resizer-react";
import preview from "./preview.png";
import { ApiBaseUrl } from "../../api/apiClientBase";
export interface CommentsBlockElement {
  widgetId: number;
  href?: string;
  xid: string;
  lang: string;
}

export const CommentsBlock = ({ widgetId, href, xid, lang }: CommentsBlockElement) => {
  const cl = useContext(ComponentHostContext);
  if (cl == null) return <b style={{ padding: 10, color: "red" }}>hyppercomments</b>;
  return href ? (
    <IframeResizer
      src={`${ApiBaseUrl}/hyppercomments.html?widgetId=${widgetId}&lang=${lang !== "cn" ? lang : "en"}&href=${href}`}
      style={{ minWidth: "100%" }}
    />
  ) : (
    <IframeResizer
      src={`${ApiBaseUrl}/hyppercomments.html?widgetId=${widgetId}&lang=${lang !== "cn" ? lang : "en"}&xid=${xid}`}
      style={{ minWidth: "100%" }}
    />
  );
};

export const CommentsBlockInfo: TypedBlockTypeInfo<CommentsBlockElement> = {
  id: "commentsBlock",
  name: "CommentsBlock",
  preview: preview,
  renderer: CommentsBlock,
  initialData: {
    widgetId: 78694,
    href: "",
    xid: "",
    lang: "en",
  },
  definition: {
    fields: [
      {
        id: "widgetId",
        type: "Number",
        name: "Widget Id",
      },
      {
        id: "href",
        type: "String",
        name: "Href: ",
      },
      {
        id: "xid",
        type: "String",
        name: "Xid: ",
      },
      {
        id: "lang",
        type: "Radio",
        name: "Lang: ",
        possibleValues: [
          {
            id: "en",
            name: "EN",
          },
          {
            id: "fr",
            name: "FR",
          },
          {
            id: "ru",
            name: "RU",
          },
          {
            id: "esp",
            name: "ESP",
          },
          {
            id: "cn",
            name: "CN",
          },
        ],
      },
    ],
  },
};
