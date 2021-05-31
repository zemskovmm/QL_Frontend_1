import React, { useState } from "react";
import cn from "classnames";

import styles from "./LeftTabsRightContentBlock.module.css";
import { PageBlockRowDto } from "../../interfaces/pageSharedDto";
import { TypedBlockTypeInfo } from "../blocks-info";
import { RowsPresenter } from "../index";

interface TabControlBlockTab {
  title: string;
  rows: PageBlockRowDto[];
}

interface TabControlBlockProps {
  tabs: TabControlBlockTab[];
  revers: boolean;
}

interface TabsProps {
  titles: string[];
  components: any;
}

const LeftTabsRightContentBlock = ({ tabs, revers }: TabControlBlockProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const effectiveActiveTab = Math.min(activeTab, tabs.length - 1);

  return (
    <div className={`flex w-full mx-auto py-12 max-w-screen-xl ${revers ? "flex-row-reverse" : ""}`}>
      <div className={cn(styles.content, revers ? styles.contentRight : styles.contentLeft)}>
        <div>{effectiveActiveTab < 0 ? null : <RowsPresenter rows={tabs[effectiveActiveTab].rows} />}</div>
      </div>
      <div className={`flex pr-10 flex-col w-full ml-auto ${styles.tab__elementList}`}>
        {tabs.map((tab, ind) => (
          <button
            type={"button"}
            key={ind}
            className={cn(ind === activeTab ? styles.tab__elementActive : "", styles.tab__element)}
            onClick={() => setActiveTab(ind)}
          >
            {tab.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export const LeftTabsRightContentBlockInfo: TypedBlockTypeInfo<TabControlBlockProps> = {
  id: "leftTabsRightContentBlock",
  name: "LeftTabsRightContentBlock",
  renderer: LeftTabsRightContentBlock,
  initialData: {
    tabs: [
      {
        title: "Tab1",
        rows: [],
      },
    ],
    revers: false,
  },
  definition: {
    subTypes: {
      Tab: {
        fields: [
          {
            id: "title",
            type: "String",
            name: "Title",
          },
          {
            id: "rows",
            type: "Custom",
            customType: "Rows",
            name: "Content",
          },
        ],
      },
    },
    fields: [
      {
        id: "tabs",
        name: "Tabs",
        type: "List",
        listType: "Tab",
      },
      {
        id: "revers",
        type: "CheckBox",
        name: "Reverse",
      },
    ],
  },
};
