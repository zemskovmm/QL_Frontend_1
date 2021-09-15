import React, { FC, useState } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import { ApiBaseUrl } from "../../api/apiClientBase";
import style from "./MultiImgBlock.module.css";
import { HtmlPresenter } from "../../ui/HtmlPresenter/htmlPresenter";
import preview from "./preview.jpg";

interface MultiImgBlockProps {
  img: { id: number | null }[];
  html: string;
}

export const MultiImgBlock: FC<MultiImgBlockProps> = ({ img, html }) => {
  const [current, setCurrent] = useState(img[0].id);
  return (
    <div className={`lg:px-0 px-4 flex w-full mx-auto max-w-screen-xl w-full`}>
      <div className={`flex w-full mr-20`}>
        <div className={`${style.multiImg__list} flex flex-col`}>
          {img.map((el, index) => (
            <img
              src={`${ApiBaseUrl}/api/media/scaled/${el.id}?dimension=200`}
              alt=""
              key={`${index} multi img`}
              onClick={() => setCurrent(el.id)}
              className={`${style.multiImg__list_item} cursor-pointer`}
            />
          ))}
        </div>
        <img src={`${ApiBaseUrl}/api/media/scaled/${current}`} alt="" className={style.multiImg__list_setItem} />
      </div>
      <div className={`${style.multiImg__content} flex flex-col justify-between`}>
        <HtmlPresenter text={html} />
      </div>
    </div>
  );
};

export const MultiImgBlockInfo: TypedBlockTypeInfo<MultiImgBlockProps> = {
  id: "multiImgBlock",
  name: "MultiImgBlock",
  renderer: MultiImgBlock,
  preview: preview,
  initialData: {
    img: [{ id: 0 }],
    html: "",
  },
  definition: {
    subTypes: {
      img: {
        fields: [
          {
            id: "id",
            type: "Custom",
            customType: "Image",
            name: "img",
          },
        ],
      },
    },
    fields: [
      {
        id: "img",
        name: "Image",
        type: "List",
        listType: "img",
      },
      {
        id: "html",
        name: "html",
        type: "Custom",
        customType: "Html",
      },
    ],
  },
};
