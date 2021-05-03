import { useState } from "react";

export interface AdminTabControlTab {
  id: string;
  title: string;
  renderer: () => JSX.Element;
}

export interface AdminTabControlProps {
  tabs: AdminTabControlTab[];
  selectedId?: string;
  onChangeSelectedId?: (id: string) => void;
}

export const AdminTabControl = (props: AdminTabControlProps) => {
  const [selectedId, changeSelectedId] = useState<string | null>(null);

  const selectedTab =
    (props.selectedId != null && props.onChangeSelectedId != null
      ? props.tabs.filter((t) => t.id == props.selectedId)[0]
      : props.tabs.filter((t) => t.id == selectedId)[0]) || props.tabs[0];

  const SelectedTab = selectedTab != null ? selectedTab.renderer : () => <div />;

  return (
    <div>
      <div className="bg-white">
        <nav className="flex flex-col sm:flex-row">
          {props.tabs.map((tab) => (
            <button
              key={tab.id}
              className={
                "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 font-medium" +
                (tab == selectedTab ? "ext-blue-500 border-b-2 font-medium border-blue-500" : "")
              }
              onClick={(e) => {
                e.preventDefault();
                if (props.onChangeSelectedId) props.onChangeSelectedId(tab.id);
                else changeSelectedId(tab.id);
              }}
            >
              {tab.title}
            </button>
          ))}
        </nav>
      </div>
      <SelectedTab />
    </div>
  );
};
