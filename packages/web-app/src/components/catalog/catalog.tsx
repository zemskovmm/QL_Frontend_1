import { NextRouter, useRouter } from "next/router";
import { useIntl } from "react-intl";
import { CatalogFilterRequestDto, siteApi } from "src/clients/siteApiClient";
import { ParsedUrlQuery } from "querystring";
import { CatalogView } from "src/components/catalog/catalogView";

export interface CatalogProps<T> {
  elementRenderer: (element: T) => JSX.Element;
  apiElementName: string;
  title: string;
  searchTitle: string;
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

async function changeQueryArg(router: NextRouter, key: string, value: string) {
  const newQuery = { ...router.query };
  newQuery[key] = value;
  await router.push(
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
  const setFilter = async (identifier: string, id: number, selected: boolean) => {
    const selectedItems = parsed.filters.find((f) => f.identifier == identifier)?.values || [];
    const newItems = selectedItems.filter((x) => x != id);
    if (selected) newItems.push(id);
    await changeQueryArg(router!, "filter-" + identifier, newItems.join(","));
  };

  return (
    <CatalogView<T>
      page={parsed.page}
      filters={filters}
      parsedFilters={parsed.filters}
      data={data}
      setPage={setPage}
      setFilter={setFilter}
      elementRenderer={props.elementRenderer}
      title={props.title}
      searchTitle={props.searchTitle}
      type={props.apiElementName}
    />
  );
}
