import { CatalogFilterDto } from "src/interfaces/catalogFilterDto";
import {FC, useEffect, useState} from "react";
import {LocalizedText} from "src/components/common/LocalizedText";
import {NextRouter, useRouter} from "next/router";
import {buildQueryString} from "src/utilities/utils";
import {useIntl} from "react-intl";
import {router} from "next/client";
import {siteApi} from "src/clients/siteApiClient";
import Select from "src/components/ui/Select/Select";

import styles from './style/catalogWidget.module.css'

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


const housingLangs : {[key: string]: string} = {
  ru: "https://housing.quartier-latin.com/housing",
  en: "https://housing.quartier-latin.com/en/housing",
  cn: "https://housing.quartier-latin.com/cn/housing",
  fr: "https://housing.quartier-latin.com/fr/housing",
  esp: "https://housing.quartier-latin.com/en/housing",
}

function navigateToCatalog(lang: string, router: NextRouter, entityType: string, filters: { [key: string]: string | undefined })
{
  const query :  {[key: string]: string} ={};

  for(const key in filters) {
    const value = filters[key];
    if (value != null) {
      const newKey = entityType == "housing" ? key : "filter-" + key;
      query[newKey] = value;
    }
  }


  if(entityType == "university") {
    router.push({
      pathname: `/[lang]/catalog/university`,
      query: {...query, lang: lang}
    });
  }
  else if(entityType == "housing")
    window.location.href = housingLangs[lang] + "?" + buildQueryString(query);
}

export const CatalogWidget: FC<CatalogWidgetProps> = (props) => {
  const lang = useIntl().locale;
  const router = useRouter();
  const appliedFilters: CatalogWidgetFilter[] = [];
  const [selected, setSelected] = useState<{ [key: string]: string | undefined }>({});
  for (const id of props.filterIds) {
    const found = props.filters.find((x) => x.identifier == id);
    if (found) appliedFilters.push(found);
  }

  return (
    <div className="flex justify-between items-end w-full text-xs leading-relaxed">
      {appliedFilters.map((filter) => (
        <div className="w-full mr-7">
          <Select
            label={filter.name}
            value={selected[filter.identifier] || filter.name}
            selectChange={value => setSelected({...selected, [filter.identifier]: value})}
            options={[filter.name, ...filter.options.map(({name}) => (name))]}
          />
        </div>
      ))}
      <a className={styles.catalog_button} href="#" onClick={e=>{
        e.preventDefault();
        navigateToCatalog(lang, router, props.entityType, selected);
      }}><LocalizedText id={"catalogWidget_search"}/></a>
    </div>
  );
};

export interface ServerCatalogWidgetProps {
  filterIds: string[];
  entityType: string;
}

export const ServerCatalogWidget : FC<ServerCatalogWidgetProps> = (props) => {
  const [state, setState] = useState<{filters: CatalogWidgetFilter[], filtersLoadedForLang?: string}>({
    filters: []
  });
  const lang = useIntl().locale;
  useEffect(()=>{
    if(state.filtersLoadedForLang != lang)
    {
      siteApi.getCatalogFilters(lang, props.entityType).then(filters=>setState({
        filters: filters,
        filtersLoadedForLang: lang
      }))

    }

  });
  return <CatalogWidget filters={state.filters || []} filterIds={props.filterIds} entityType={props.entityType}/>
}
