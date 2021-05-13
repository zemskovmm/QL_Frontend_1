import { NextRouter, useRouter } from "next/router";
import { CatalogFilterDto, CatalogResponseDto } from "src/interfaces/catalogFilterDto";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import stringify from "fast-json-stable-stringify";
import { CatalogFilterRequestDto, siteApi } from "src/clients/siteApiClient";
import { ParsedUrlQuery } from "querystring";
import { LoadingIf } from "src/components/utilities/Loading";
import { Paginator } from "src/components/utilities/Paginator";
import { CatalogView } from "src/components/catalog/catalogView";
import style from "./style/catalog.module.css";
import { Breadcrumbs } from "src/components/ui/Breadcrumbs/breadcrumbs";

export interface CatalogProps<T> {
  elementRenderer: (element: T) => JSX.Element;
  apiElementName: string;
}

interface CatalogQuery {
  filters: CatalogFilterRequestDto[];
  page: number;
}

function parseCatalogQuery(query: ParsedUrlQuery) {
  const data: CatalogQuery = { page: 0, filters: [] };
  for (const key in query) {
    if (!query.hasOwnProperty(key)) continue;
    if (key.startsWith("filter-")) {
      const identifier = key.substring(7);
      const value = query[key];
      if (typeof value === "string") {
        const values = value
          .split(",")
          .map((v) => parseInt(v))
          .filter((v) => !isNaN(v));
        if (values.length > 0)
          data.filters.push({
            identifier: identifier,
            values: values,
          });
      }
    }

    const routerPage = query["page"];
    if (typeof routerPage === "string") {
      data.page = parseInt(routerPage) || data.page;
    }
  }

  return data;
}

function changeQueryArg(router: NextRouter, key: string, value: string) {
  const newQuery = { ...router.query };
  newQuery[key] = value;
  router.push(
    {
      query: newQuery,
    },
    undefined,
    {
      shallow: true,
    }
  );
}

export function Catalog<T>(props: CatalogProps<T>) {
  const router = useRouter();
  const locale = useIntl().locale;

  const parsed = parseCatalogQuery(router.query);
  const filters = siteApi.useCatalogFilters(locale, props.apiElementName);
  const data = siteApi.useCatalogItems<T>(locale, props.apiElementName, 20, parsed.page, parsed.filters);

  const setPage = (page: number) => changeQueryArg(router, "page", page.toString());
  const setFilter = (identifier: string, id: number, selected: boolean) => {
    const selectedItems = parsed.filters.find((f) => f.identifier == identifier)?.values || [];
    const newItems = selectedItems.filter((x) => x != id);
    if (selected) newItems.push(id);
    changeQueryArg(router!, "filter-" + identifier, newItems.join(","));
  };

  const bread = {
    fr: [
      {
        name: "Principal",
        link: "/fr",
      },
      {
        name: "Catalogue",
        link: "/fr/catalog/university",
      },
    ],
    en: [
      {
        name: "Main",
        link: "/en",
      },
      {
        name: "Catalog",
        link: "/en/catalog/university",
      },
    ],
    esp: [
      {
        name: "el principal",
        link: "/esp",
      },
      {
        name: "Catalogar",
        link: "/esp/catalog/university",
      },
    ],
    ru: [
      {
        name: "Главная",
        link: "/ru",
      },
      {
        name: "Каталог",
        link: "/ru/catalog/university",
      },
    ],
    cn: [
      {
        name: "主要的",
        link: "/cn",
      },
      {
        name: "目录",
        link: "/cn/catalog/university",
      },
    ],
  };

  return (
    <div className={style.catalogWrapper}>
      <div className={`mr-auto mb-7`}>
        <Breadcrumbs items={bread[locale]} />
      </div>
      <CatalogView<T>
        page={parsed.page}
        filters={filters}
        parsedFilters={parsed.filters}
        data={data}
        setPage={setPage}
        setFilter={setFilter}
        elementRenderer={props.elementRenderer}
      />
    </div>
  );
}
