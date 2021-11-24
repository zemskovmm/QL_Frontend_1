import React, { useContext } from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import Tabs from "../../ui/Tabs/Tabs";
import Search from "../../ui/search/Search";
import { ServerCatalogWidget } from "../../ui/catalog/catalogWidget";
import preview from "./preview.png";
import education from "./education.svg";
import hotel from "./hotel.svg";
import course from "./course.svg";
import { ComponentHostContext } from "../index";
import { ComponentLink } from "../../component-link";

export interface TitleAndTabsBlockElement {
  title: string;
  background: number | null;
  backgroundShadow?: string;
  tabs: { title: string; filters: { filter: string }[]; type: string }[];
}

export const TitleAndTabsBlock = (props: TitleAndTabsBlockElement) => {
  const tabsComponent = props.tabs.map((el, index) => (
    <ServerCatalogWidget key={index + el.type} filterIds={el.filters.map((el) => el.filter)} entityType={el.type} />
  ));
  const lang = useContext(ComponentHostContext)?.lang;
  return (
    <Search title={props.title} background={props.background} backgroundShadow={props.backgroundShadow}>
      <div className={`hidden lg:flex w-full`}>
        <Tabs titles={props.tabs?.map((el) => el.title)} components={tabsComponent} />
      </div>
      <div className={`flex flex-col lg:hidden`}>
        {props.tabs.map((el) => (
          <ComponentLink href={`/${lang}/catalog/${el.type}`}>
            <a
              className={` flex items-center bg-white mb-1.5 rounded py-1.5 px-6`}
              style={{
                border: "1px solid #EFF3FA",
              }}
            >
              <img
                src={
                  el.type === "housing"
                    ? hotel
                    : el.type === "university"
                    ? education
                    : el.type === "course"
                    ? course
                    : ""
                }
                alt=""
                className={`w-6 h-6 box-content py-5 pr-6 mr-5`}
                style={{
                  borderRight: "1px solid #C9D5F0",
                }}
              />
              {el.title}
            </a>
          </ComponentLink>
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
    backgroundShadow: "0%",
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
        id: "backgroundShadow",
        type: "String",
        name: "Background Shadow",
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
