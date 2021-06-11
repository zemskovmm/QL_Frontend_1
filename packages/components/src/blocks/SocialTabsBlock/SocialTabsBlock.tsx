import React, { useState } from "react";

import styles from "./SocialTabsBlock.module.css";
import cn from "classnames";
import { TypedBlockTypeInfo } from "../blocks-info";
import preview from "./preview.png";

interface SocialTabsProps {
  title1: string;
  title2: string;
}

export const SocialTabsBlock: React.FC<SocialTabsProps> = ({ title1, title2 }) => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <div className="flex w-full">
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

export const SocialTabsBlockInfo: TypedBlockTypeInfo<SocialTabsProps> = {
  id: "SocialTabsBlock",
  name: "SocialTabsBlock",
  preview: preview,
  renderer: SocialTabsBlock,
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
