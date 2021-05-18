import { CatalogFilterDto, CatalogResponseDto } from "src/interfaces/catalogFilterDto";
import { CatalogFilterRequestDto } from "src/clients/siteApiClient";
import { Paginator } from "src/components/utilities/Paginator";
import { LoadingIf } from "src/components/utilities/Loading";
import style from "./style/catalogView.module.css";
import img from "src/assets/images/courses/2.png";
import education from "src/assets/icons/education.svg";
import hotel from "src/assets/icons/hotel.svg";
import { LocalizedText } from "../common/LocalizedText";

function CatalogFilter(props: {
  filter: CatalogFilterDto;
  seletedItems: number[];
  toggleFilter: (id: number, selected: boolean) => void;
}) {
  return (
    <div className={style.catalog__filterRow}>
      <h3 className={style.catalog__filterTitle}>{props.filter.name}</h3>
      <div className={`flex flex-col`}>
        {props.filter.options.map((option) => (
          <label className={`${style.checkbox__label}`} key={option.id}>
            <span
              className={`${style.checkbox__input} ${
                props.seletedItems.indexOf(option.id) != -1 ? style.isChecked : ""
              }`}
            >
              <span className={`${style.checkbox__inner}`} />
              <input
                type="checkbox"
                checked={props.seletedItems.indexOf(option.id) != -1}
                aria-hidden="false"
                className={style.checkbox__original}
                value={option.name}
                onChange={(e) => props.toggleFilter(option.id, e.target.checked)}
              />
            </span>
            <span className={`${style.checkbox__name}`}>{option.name}</span>
          </label>
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
    <div className={`flex flex-col w-full`}>
      <div className={`flex items-center`}>
        <h1 className={`${style.catalog__h1}`}>
          <LocalizedText id={"catalogEducation_title"} />
        </h1>
        <div className={`${style.catalog__count}`}>
          {props.data.totalItems} <LocalizedText id={"catalogEducation_search_result"} />
        </div>
      </div>
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
    <div className={`flex w-full`}>
      <div className={`${style.catalog__filterCol} align-top`}>
        <div className={style.catalog__filterRow}>
          <h3 className={style.catalog__filterTitle}>
            <LocalizedText id={"catalogEducation_categories"} />
          </h3>
          <div>
            <a href="#" className={`${style.toggle__switch} ${style.toggle__switch_active}`}>
              <img src={education} alt="" className={`${style.toggle__switchImg}`} />
              <span className={`${style.toggle__switchName}`}>
                <LocalizedText id={"catalogEducation_education"} />
              </span>
            </a>
            <a href="#" className={`${style.toggle__switch}`}>
              <img src={hotel} alt="" className={`${style.toggle__switchImg}`} />
              <span className={`${style.toggle__switchName}`}>
                <LocalizedText id={"catalogEducation_accommodationn"} />
              </span>
            </a>
          </div>
        </div>
        <CatalogFilters filters={props.filters || []} parsedFilters={props.parsedFilters} setFilter={props.setFilter} />
      </div>
      <div className={`${style.catalog__itemsCol} align-top w-full`}>
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
      </div>
    </div>
  );
}
