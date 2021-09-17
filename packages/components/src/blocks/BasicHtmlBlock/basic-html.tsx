import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import preview from "./preview.png";
import { HtmlPresenter } from "../../ui/HtmlPresenter/htmlPresenter";

export interface BasicHtmlBlockProps {
  html: string;
}

export const BasicHtmlBlockInfo: TypedBlockTypeInfo<BasicHtmlBlockProps> = {
  id: "basic-html",
  name: "Basic HTML",
  preview: preview,
  initialData: {
    html: "<b>Lorem ipsum</b> <i>dolor sit amet</i>",
  },
  definition: {
    fields: [
      {
        id: "html",
        name: "html",
        type: "Custom",
        customType: "Html",
      },
    ],
  },
  renderer: (props) => (
    <div className={`px-4 lg:px-0`}>
      <div className={`BasicHtmlBlockInfo`} 
        dangerouslySetInnerHTML={{ __html: props.html || "" }}>
      </div>
    </div>
  ),
};
