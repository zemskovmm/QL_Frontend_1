import React, { useState } from "react";
import cn from "classnames";

import styles from "./TabsControlBlock.module.css";
import { PageBlockRowDto } from "../../interfaces/pageSharedDto";
import { TypedBlockTypeInfo } from "../blocks-info";
import { RowsPresenter } from "../index";

interface TabControlBlockTab {
  title: string;
  rows: PageBlockRowDto[];
}

interface TabControlBlockProps {
  tabs: TabControlBlockTab[];
}

interface TabsProps {
  titles: string[];
  components: any;
}

const TabControl = ({ tabs }: TabControlBlockProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const effectiveActiveTab = Math.min(activeTab, tabs.length - 1);

  return (
    <div className="flex flex-col w-full">
      <div className={cn(styles.tabs, "flex p-2.5")}>
        <div className="flex mx-auto">
          {tabs.map((tab, ind) => (
            <div key={ind} className={cn(ind === activeTab ? styles.active : "")} onClick={() => setActiveTab(ind)}>
              {tab.title}
            </div>
          ))}
        </div>
      </div>
      <div className={cn(styles.content, "py-9 px-10")}>
        <div>
          {effectiveActiveTab < 0 ? null : <RowsPresenter rows={tabs[effectiveActiveTab].rows} />}
        </div>
      </div>
    </div>
  );
};

export const TabControlBlockInfo: TypedBlockTypeInfo<TabControlBlockProps> = {
  id: "tab-control",
  name: "Tabs with content",
  renderer: TabControl,
  initialData: {
    tabs: [
      {
        title: "Tab1",
        rows: [],
      },
    ],
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
    ],
  },
};
