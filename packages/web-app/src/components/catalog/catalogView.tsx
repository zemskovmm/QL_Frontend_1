import { CatalogFilterDto, CatalogResponseDto } from "src/interfaces/catalogFilterDto";
import { CatalogFilterRequestDto } from "src/clients/siteApiClient";
import { Paginator } from "src/components/utilities/Paginator";
import { LoadingIf } from "src/components/utilities/Loading";

function CatalogFilter(props: {
  filter: CatalogFilterDto;
  seletedItems: number[];
  toggleFilter: (id: number, selected: boolean) => void;
}) {
  return (
    <div>
      <h3>{props.filter.name}</h3>
      <div>
        {props.filter.options.map((option) => (
          <div key={option.id}>
            <input
              type="checkbox"
              checked={props.seletedItems.indexOf(option.id) != -1}
              onChange={(e) => props.toggleFilter(option.id, e.target.checked)}
            />
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function CatalogFilters(props: {
  filters: CatalogFilterDto[];
  parsedFilters: CatalogFilterRequestDto[];
  setFilter: (identifier: string, item: number, value: boolean) => void;
}) {
  return (
    <div>
      {props.filters.map((filter) => (
        <CatalogFilter
          key={filter.identifier}
          filter={filter}
          seletedItems={props.parsedFilters.find((f) => f.identifier == filter.identifier)?.values || []}
          toggleFilter={(id, selected) => props.setFilter(filter.identifier, id, selected)}
        />
      ))}
    </div>
  );
}

function CatalogItems<T>(props: {
  data: CatalogResponseDto<T>;
  elementRenderer: (item: T) => JSX.Element;
  page: number;
  setPage: (page: number) => void;
}) {
  return (
    <div>
      <div>Total items: {props.data.totalItems}</div>
      {props.data.items.map((item, idx) => (
        <div key={idx}>{props.elementRenderer(item)}</div>
      ))}
      <Paginator page={props.page} totalPages={props.data.totalPages} setPage={props.setPage} />
    </div>
  );
}

export function CatalogView<T>(props: {
  elementRenderer: (element: T) => JSX.Element;
  filters: CatalogFilterDto[] | undefined;
  parsedFilters: CatalogFilterRequestDto[];
  data: CatalogResponseDto<T> | undefined;
  page: number;
  setPage: (p: number) => void;
  setFilter: (identifier: string, item: number, value: boolean) => void;
}): JSX.Element {
  return (
    <table>
      <tbody>
        <tr>
          <td className="align-top">
            <CatalogFilters
              filters={props.filters || []}
              parsedFilters={props.parsedFilters}
              setFilter={props.setFilter}
            />
          </td>
          <td className="align-top">
            <LoadingIf isLoading={props.data == null}>
              {props.data == null ? null : (
                <CatalogItems<T>
                  elementRenderer={props.elementRenderer}
                  data={props.data}
                  page={props.page}
                  setPage={props.setPage}
                />
              )}
            </LoadingIf>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
