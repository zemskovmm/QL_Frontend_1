import React, { useState } from "react";
import cn from "classnames";

import styles from "./Tabs.module.css";

interface TabsProps {
  titles: string[];
  components: any;
}

const Tabs = ({ titles, components }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col w-full">
      <div className={cn(styles.tabs, "flex p-2.5")}>
        {titles.length > 1 && (
          <div className="flex mx-auto">
            {titles?.map((title, ind) => (
              <div key={ind} className={cn(ind === activeTab ? styles.active : "")} onClick={() => setActiveTab(ind)}>
                {title}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={cn(styles.content, "py-9 px-10")}>
        {components.map((comp: any, ind: number) => (
          <div key={ind} className={cn(ind === activeTab ? styles.active : "")}>
            {comp}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
