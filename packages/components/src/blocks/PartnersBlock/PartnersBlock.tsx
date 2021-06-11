import React from "react";

import styles from "./PartnersBlock.module.css";
import cn from "classnames";
import { ApiBaseUrl } from "../../api/apiClientBase";
import { TypedBlockTypeInfo } from "../blocks-info";
import preview from "./preview.png";

export interface PartnersProps {
  title: string;
  url?: string;
  num?: number;
  elements: { img: number | null; link?: string }[];
}

export const PartnersBlock: React.FC<PartnersProps> = ({ title, url, num, elements }) => (
  <section className="py-24">
    <div className="flex flex-col max-w-screen-xl w-full my-0 mx-auto py-6 px-10">
      <h2 className={styles.title}>
        {url ? (
          <a className={styles.link} href={url}>
            {title}
          </a>
        ) : (
          <>{title}</>
        )}
        {num && num > 0 ? (
          <>
            {" "}
            <span>({num})</span>
          </>
        ) : (
          ""
        )}
      </h2>
      <div className="flex flex-wrap items-center">
        {elements.map(({ img, link }, ind) => (
          <div className={styles.partner} key={ind}>
            {link ? (
              <a href={link} target="_blank">
                <img src={`${ApiBaseUrl}/api/media/${img}`} alt="" />
              </a>
            ) : (
              <img src={`${ApiBaseUrl}/api/media/${img}`} alt="" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const PartnersBlockInfo: TypedBlockTypeInfo<PartnersProps> = {
  id: "partnersBlock",
  name: "PartnersBlock",
  preview: preview,
  renderer: PartnersBlock,
  initialData: {
    title: "Header",
    url: "",
    num: 0,
    elements: [
      {
        img: null,
        link: "",
      },
    ],
  },
  definition: {
    subTypes: {
      element: {
        fields: [
          {
            id: "img",
            name: "Image",
            type: "Custom",
            customType: "Image",
          },
          {
            id: "link",
            name: "Link",
            type: "String",
          },
        ],
      },
    },
    fields: [
      {
        id: "title",
        type: "String",
        name: "Title",
      },
      {
        id: "url",
        type: "String",
        name: "URL",
      },
      {
        id: "num",
        type: "Number",
        name: "Num:",
      },

      {
        id: "elements",
        name: "Elements",
        type: "List",
        listType: "element",
      },
    ],
  },
};
