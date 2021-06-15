import React, { useContext } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import Tabs from "../../ui/Tabs/Tabs";
import Search from "../../ui/search/Search";
import { ServerCatalogWidget } from "../../ui/catalog/catalogWidget";
import preview from "./preview.png";
import Link from "next/link";
import education from "./education.svg";
import hotel from "./hotel.svg";
import style from "./titleAndTabsBlock.module.css";
import { ComponentHostContext } from "../index";
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
  const lang = useContext(ComponentHostContext)?.lang;
  return (
    <Search title={props.title} background={props.background}>
      <div className={`hidden lg:block`}>
        <Tabs titles={props.tabs?.map((el) => el.title)} components={tabsComponent} />
      </div>
      <div className={`flex flex-col lg:hidden`}>
        {props.tabs.map((el) => (
          <Link href={el.type === "university" ? `/${lang}/catalog/university` : `/${lang}/housing`}>
            <a className={style.buttonMobile}>
              <img src={el.type === "university" ? education : hotel} alt="" />
              {el.title}
            </a>
          </Link>
        ))}
      </div>
    </Search>
  );
};

export const TitleAndTabsBlockInfo: TypedBlockTypeInfo<TitleAndTabsBlockElement> = {
  id: "titleAndTabsBlock",
  name: "TitleAndTabsBlock",
  preview: preview,
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
                name: "City",
              },
              {
                id: "instruction-language",
                name: "Instruction-language",
              },
              {
                id: "degree",
                name: "Degree",
              },
              {
                id: "placement",
                name: "Placement",
              },
              {
                id: "accreditation",
                name: "Accreditation",
              },
              {
                id: "certification",
                name: "Certification",
              },
              {
                id: "price",
                name: "Price",
              },
              {
                id: "specialty-category",
                name: "Specialty-category",
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
