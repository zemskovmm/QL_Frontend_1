import React, { FC, useContext, useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import Select from "../Select/Select";
import styles from "./style/catalogWidget.module.css";
import { ComponentHostContext } from "../../blocks";
import { buildQueryString } from "../../utils/buildQueryString";
import { housingCatalogFilters } from "../../hardcoded/housingCatalogFilters";

export interface CatalogWidgetFilterOption {
  id: number | string;
  name: string;
}

export interface CatalogWidgetFilter {
  identifier: string;
  name: string;
  options: CatalogWidgetFilterOption[];
}

export interface CatalogWidgetProps {
  filters: CatalogWidgetFilter[];
  filterIds: string[];
  entityType: string;
}

const housingLangs: { [key: string]: string } = {
  ru: "/catalog/housing",
  en: "/en/catalog/housing",
  cn: "/cn/catalog/housing",
  fr: "/fr/catalog/housing",
  esp: "/en/catalog/housing",
};

function navigateToCatalog(
  lang: string,
  router: NextRouter,
  entityType: string,
  filters: { [key: string]: string | undefined }
) {
  const query: { [key: string]: string } = {};

  for (const key in filters) {
    const value = filters[key];
    if (value != null) {
      const newKey = "filter-" + key;
      query[newKey] = value;
    }
  }

  if (entityType == "university") {
    router.push({
      pathname: `/[lang]/catalog/university`,
      query: { ...query, lang: lang },
    });
  } else if (entityType == "housing") window.location.href = housingLangs[lang] + "?" + buildQueryString(query);
}

const allTranslate: { [key: string]: string } = {
  ru: "Любой",
  cn: "任何",
  fr: "Quelconque",
  en: "Any",
  esp: "cualquier",
};

const searchTranslate: { [key: string]: string } = {
  ru: "Найти",
  cn: "搜索",
  fr: "Rechercher",
  en: "Search",
  esp: "Buscar",
};

export const CatalogWidget: FC<CatalogWidgetProps> = (props) => {
  const router = useRouter();
  const appliedFilters: CatalogWidgetFilter[] = [];
  const [selected, setSelected] = useState<{ [key: string]: string | undefined }>({});
  const [selectedName, setSelectedName] = useState<{ [key: string]: string | undefined }>({});
  for (const id of props.filterIds) {
    const found = props.filters.find((x) => x.identifier == id);
    if (found) appliedFilters.push(found);
  }

  const cl = useContext(ComponentHostContext);

  return (
    <div className="flex justify-between items-end w-full text-xs leading-relaxed">
      {appliedFilters.map((filter) => (
        <div className="w-full mr-7">
          <Select
            label={filter.name}
            value={selectedName[filter.identifier] || filter.name}
            selectChange={(value, ind) => {
              setSelectedName({ ...selectedName, [filter.identifier]: value });
              setSelected({ ...selected, [filter.identifier]: String(ind) });
            }}
            options={[{ name: allTranslate[cl?.lang ?? "en"], id: 0 }, ...filter.options]}
          />
        </div>
      ))}
      <a
        className={styles.catalog_button}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          navigateToCatalog(cl?.lang ?? "en", router, props.entityType, selected);
        }}
      >
        {searchTranslate[cl?.lang ?? "en"]}
      </a>
    </div>
  );
};

export interface ServerCatalogWidgetProps {
  filterIds: string[];
  entityType: string;
}

export const ServerCatalogWidget: FC<ServerCatalogWidgetProps> = (props) => {
  const [state, setState] = useState<{ filters: CatalogWidgetFilter[] | any; filtersLoadedForLang?: string }>({
    filters: [],
  });

  const cl = useContext(ComponentHostContext);
  useEffect(() => {
    if (props.entityType === "housing") {
		/*
      if (state.filtersLoadedForLang != cl?.lang) {
        setState({
          filters: housingCatalogFilters[cl?.lang ?? "en"].filters,
          filtersLoadedForLang: cl?.lang,
        });
      } */
	   if (state.filtersLoadedForLang != cl?.lang) {
        cl?.filters.getCatalogFilters(cl?.lang, props.entityType).then((filter: any) =>
          setState({
            filters: filter,
            filtersLoadedForLang: cl?.lang,
          })
        );
	  
    } }else {
      if (state.filtersLoadedForLang != cl?.lang) {
        cl?.filters.getCatalogFilters(cl?.lang, props.entityType).then((filter: any) =>
          setState({
            filters: filter,
            filtersLoadedForLang: cl?.lang,
          })
        );
      }
    }
  });

  return <CatalogWidget filters={state.filters || []} filterIds={props.filterIds} entityType={props.entityType} />;
};
