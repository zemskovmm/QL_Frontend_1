import React, { useState } from "react";

import styles from "./SocialBlock.module.css";
import cn from "classnames";
import { TypedBlockTypeInfo } from "../blocks-info";
import preview from "./preview.png";

interface SocialTabsProps {
  title1: string;
  title2: string;
}

export const SocialBlock: React.FC<SocialTabsProps> = ({ title1, title2 }) => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className={"py-24"}>
      <div className="px-10 flex w-full">
        <a
          className={cn(styles.link, activeTab === 1 ? styles.active : "")}
          href="#"
          target="_blank"
          onClick={() => setActiveTab(1)}
        >
          {title1}
        </a>
        <a
          className={cn(styles.link, activeTab === 2 ? styles.active : "")}
          href="#"
          target="_blank"
          onClick={() => setActiveTab(2)}
        >
          {title2}
        </a>
      </div>
      <div className={styles.frame} />
    </div>
  );
};

export const SocialBlockInfo: TypedBlockTypeInfo<SocialTabsProps> = {
  id: "SocialBlock",
  name: "SocialBlock",
  preview: preview,
  renderer: SocialBlock,
  initialData: {
    title1: "Instagram",
    title2: "YouTube",
  },
  definition: {
    fields: [
      {
        id: "title1",
        type: "String",
        name: "Title1",
      },
      {
        id: "title2",
        type: "String",
        name: "Title2",
      },
    ],
  },
};
