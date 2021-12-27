import React, { useState } from "react";

import styles from "./SocialBlock.module.css";
import cn from "classnames";
import { TypedBlockTypeInfo } from "../blocks-info";
import preview from "./preview.png";

interface SocialTabsProps {
  title1: string;
  title2: string;
  link1: string;
  link2: string;
}

export const SocialBlock: React.FC<SocialTabsProps> = ({ title1, title2, link1, link2 }) => {
  const [activeTab, setActiveTab] = useState({ title: title1, link: link1 });
  const [itsFirefox, setItsFirefox] = useState(false); //window.navigator.userAgent.includes("irefox");
  React.useEffect(() => {
    setItsFirefox(window.navigator.userAgent.includes("firefox"));
  }, []);
  return !itsFirefox ? (
    <div className={`px-4 xl:px-0`}>
      <div className="flex w-full">
        <div
          className={cn(styles.link, activeTab.title === title1 ? styles.active : "")}
          onClick={() => setActiveTab({ title: title1, link: link1 })}
        >
          {title1}
        </div>
        <div
          className={cn(styles.link, activeTab.title === title2 ? styles.active : "")}
          onClick={() => setActiveTab({ title: title2, link: link2 })}
        >
          {title2}
        </div>
      </div>
      <div className={cn(styles.frame, activeTab.title.toLowerCase() === "youtube" ? styles.frame_big : "")}>
        {activeTab.title.toLowerCase() === "youtube" ? (
          <iframe
            width="100%"
            height="100%"
            src={activeTab.link}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <iframe src={activeTab.link} width="100%" height="100%" frameBorder="0" />
        )}
      </div>
    </div>
  ) : null;
};

export const SocialBlockInfo: TypedBlockTypeInfo<SocialTabsProps> = {
  id: "SocialBlock",
  name: "SocialBlock",
  preview: preview,
  renderer: SocialBlock,
  initialData: {
    title1: "Instagram",
    link1: "https://www.instagram.com/p/CKdRgIEAqVX/embed",
    title2: "YouTube",
    link2: "https://www.youtube.com/embed/videoseries?list=PLwFQzlRbKmcFc_tzNFOcZVyKWvAClYNDb",
  },
  definition: {
    fields: [
      {
        id: "title1",
        name: "Title1",
        type: "String",
      },
      {
        id: "link1",
        name: "Link1",
        type: "String",
      },
      {
        id: "title2",
        name: "Title2",
        type: "String",
      },
      {
        id: "link2",
        name: "Link2",
        type: "String",
      },
    ],
  },
};
