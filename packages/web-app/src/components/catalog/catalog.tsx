import { NextRouter, useRouter } from "next/router";
import { CatalogFilterDto, CatalogResponseDto } from "src/interfaces/catalogFilterDto";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import stringify from "fast-json-stable-stringify";
import { CatalogFilterRequestDto, siteApi } from "src/clients/siteApiClient";
import { ParsedUrlQuery } from "querystring";
import { LoadingIf } from "src/components/utilities/Loading";
import { Paginator } from "src/components/utilities/Paginator";

export interface CatalogProps<T> {
  elementRenderer: (element: T) => JSX.Element;
  apiElementName: string;
}

interface CatalogState<T> {
  filters?: CatalogFilterDto[];
  data?: CatalogResponseDto<T>;
  loadedFor?: string;
  loadedFiltersForLang?: string;
}

async function loadForQuery<T>(
  lang: string,
  entityType: string,
  query: ParsedUrlQuery
): Promise<CatalogResponseDto<T>> {
  const filters: CatalogFilterRequestDto[] = [];
  for (const key in query) {
    if(!query.hasOwnProperty(key))
      continue;
    if (key.startsWith("filter-")) {
      const identifier = key.substring(7);
      const value = query[key];
      if (typeof value === "string") {
        const values = value
          .split(",")
          .map((v) => parseInt(v))
          .filter((v) => !isNaN(v));
        if (values.length > 0)
          filters.push({
            identifier: identifier,
            values: values,
          });
      }
    }
  }

  let page = 0;
  const routerPage = query["page"];
  if (typeof routerPage === "string") {
    page = parseInt(routerPage) || page;
  }

  return siteApi.getCatalogItems<T>(lang, entityType, 20, page, filters);
}

function changeQueryArg(router: NextRouter, key: string, value: string) {
  const newQuery = { ...router.query };
  newQuery[key] = value;
  router.push({
    query: newQuery,
  }, undefined, {
    shallow: true
  });
}

function CatalogFilter(props: { filter: CatalogFilterDto }) {
  const router = useRouter();
  let queryData = router.query["filter-" + props.filter.identifier];
  let selectedItems: number[] = [];
  if (queryData != undefined) {
    try {
      if (queryData instanceof Array) queryData = queryData[0];
      selectedItems = queryData
        .split(",")
        .map((v) => parseInt(v))
        .filter((v) => !isNaN(v));
    } catch {
      // Ignore, malformed url
    }
  }
  console.log(selectedItems);

  const toggleFilter = (id: number, selected: boolean) => {
    const newItems = selectedItems.filter((x) => x != id);
    if (selected) newItems.push(id);
    changeQueryArg(router!, "filter-" + props.filter.identifier, newItems.join(","));
  };

  return (
    <div>
      <h3>{props.filter.name}</h3>
      <div>
        {props.filter.options.map((option) => (
          <div>
            <input
              key={option.id}
              type="checkbox"
              checked={selectedItems.indexOf(option.id) != -1}
              onChange={(e) => toggleFilter(option.id, e.target.checked)}
            />
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function CatalogFilters(props: { filters: CatalogFilterDto[] }) {
  return (
    <div>
      {props.filters.map((filter) => (
        <CatalogFilter key={filter.identifier} filter={filter} />
      ))}
    </div>
  );
}

function CatalogItems<T>(props: { data: CatalogResponseDto<T>; elementRenderer: (item: T) => JSX.Element }) {
  const router = useRouter();
  let page = 0;

  const routerPage = router.query["page"];
  if (typeof routerPage === "string") {
    page = parseInt(routerPage!);
    if (page < 0 || isNaN(page) || page >= props.data.totalPages) page = 0;
  }

  return (
    <div>
      <div>Total items: {props.data.totalItems}</div>
      {props.data.items.map((item, idx) => (
        <div key={idx}>{props.elementRenderer(item)}</div>
      ))}
      <Paginator
        page={page}
        totalPages={props.data.totalPages}
        setPage={(p) => changeQueryArg(router, "page", p.toString())}
      />
    </div>
  );
}

export function Catalog<T>(props: CatalogProps<T>) {
  const router = useRouter();
  const locale = useIntl().locale;
  const [state, setState] = useState<CatalogState<T>>({});
  //  alert(JSON.stringify(router.query));
  useEffect(() => {
    if (state.filters == null || locale != state.loadedFiltersForLang) {
      console.log("No filters, loading filters");
      siteApi.getCatalogFilters(locale, props.apiElementName).then((filters) =>
        setState({
          filters: filters,
          loadedFiltersForLang: locale,
          data: state.data,
          loadedFor: state.loadedFor
        })
      );
      return;
    }

    const loadFor = props.apiElementName + "|" + stringify(router.query);
    if (loadFor != state.loadedFor) {
      console.log(`Loaded for ${state.loadedFor} loading for ${loadFor}`);
      loadForQuery<T>(locale, props.apiElementName, router.query).then((data) => {
        setState({
          filters: state.filters,
          loadedFor: loadFor,
          data: data,
        });
      });
    }
  });

  return (
    <table>
      <tbody>
        <tr>
          <td className="align-top">
            <CatalogFilters filters={state.filters || []} />
          </td>
          <td className="align-top">
            <LoadingIf isLoading={state.data == null}>
              {state.data == null ? null : (
                <CatalogItems<T> elementRenderer={props.elementRenderer} data={state.data} />
              )}
            </LoadingIf>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
