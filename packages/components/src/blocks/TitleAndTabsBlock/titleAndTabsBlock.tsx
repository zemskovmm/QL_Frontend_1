import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import Tabs from "../../ui/Tabs/Tabs";
import Search from "../../ui/search/Search";
import { ServerCatalogWidget, CatalogWidget } from "../../ui/catalog/catalogWidget";

enum TabsEnum {
  university,
  housing,
}

export interface TitleAndTabsBlockElement {
  title: string;
  background: number | null;
  tabs: { title: string; filters: { filter: string }[]; type: string }[];
}

export const TitleAndTabsBlock = (props: TitleAndTabsBlockElement) => {
  const tabsComponent = props.tabs.map((el, index) => (
    <ServerCatalogWidget key={index + el.type} filterIds={el.filters.map((el) => el.filter)} entityType={el.type} />
  ));
  return (
    <Search title={props.title} background={props.background}>
      <Tabs titles={props.tabs?.map((el) => el.title)} components={tabsComponent} />
    </Search>
  );
};

export const TitleAndTabsBlockInfo: TypedBlockTypeInfo<TitleAndTabsBlockElement> = {
  id: "titleAndTabsBlock",
  name: "TitleAndTabsBlock",
  renderer: TitleAndTabsBlock,
  initialData: {
    title: "Title",
    background: null,
    tabs: [],
  },
  definition: {
    subTypes: {
      filtersElement: {
        fields: [
          {
            id: "filter",
            type: "Select",
            possibleValues: [
              {
                id: "city",
                name: "city",
              },
              {
                id: "instruction-language",
                name: "instruction-language",
              },
              {
                id: "degree",
                name: "degree",
              },
              {
                id: "placement",
                name: "Placement",
              },
            ],
            name: "filter",
          },
        ],
      },
      element: {
        fields: [
          {
            id: "title",
            type: "String",
            name: "Title",
          },
          {
            id: "filters",
            name: "Elements",
            type: "List",
            listType: "filtersElement",
          },
          {
            id: "type",
            type: "Select",
            possibleValues: [
              {
                id: "university",
                name: "university",
              },
              {
                id: "housing",
                name: "housing",
              },
            ],
            name: "type",
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
        id: "background",
        type: "Custom",
        customType: "Image",
        name: "Background",
      },
      {
        id: "tabs",
        name: "Tab",
        type: "List",
        listType: "element",
      },
    ],
  },
};
