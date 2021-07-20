import { CatalogFilterDto, CatalogResponseDto } from "src/interfaces/catalogFilterDto";
import { CatalogFilterRequestDto } from "src/clients/siteApiClient";
import { Paginator } from "src/components/utilities/Paginator";
import { LoadingIf } from "src/components/utilities/Loading";
import style from "./style/catalogView.module.css";
import img from "src/assets/images/courses/2.png";
import education from "src/assets/icons/education.svg";
import hotel from "src/assets/icons/hotel.svg";
import filter from "src/assets/icons/filter.svg";
import sort from "src/assets/icons/sort.svg";
import close from "src/assets/icons/cross-remove.svg";
import { LocalizedText } from "../common/LocalizedText";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

function CatalogFilter(props: {
  filter: CatalogFilterDto;
  seletedItems: number[];
  toggleFilter: (id: number, selected: boolean) => void;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (props.seletedItems.length > 0) setShow(true);
  });

  return (
    <div className={style.catalog__filterRow}>
      <h3 className={style.catalog__filterTitle}>{props.filter.name}</h3>
      <div
        className={`flex flex-col relative ${props.filter.options.length > 5 ? style.filterList : ""} ${
          show ? style.hideList : style.showList
        }`}
      >
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
      {props.filter.options.length > 5 && (
        <button className={style.showMore_button} type={"button"} onClick={() => setShow(!show)}>
          {show ? <LocalizedText id={"catalogList_hide"} /> : <LocalizedText id={"catalogList_show"} />}
        </button>
      )}
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
  widthInner: boolean;
  clickFilter: () => void;
  clickSort: () => void;
  title: string;
}) {
  return (
    <div className={`flex flex-col w-full`}>
      <div className={`flex items-center px-4 lg:px-0 mb-3`}>
        <h1 className={`${style.catalog__h1}`}>{props.title}</h1>
        <div className={`${style.catalog__count}`}>
          {props.data.totalItems}{" "}
          <span className={`hidden lg:inline`}>
            <LocalizedText id={"catalogEducation_search_result"} />
          </span>
        </div>
      </div>
      {!props.widthInner && (
        <div className={style.buttonRow}>
          <button onClick={props.clickFilter} className={`flex w-full text-xs flex px-4 py-1 items-center`}>
            <img src={filter} alt="filter" className={`mr-3`} />
            <LocalizedText id={"catalogEducation_mobile_filterButton"} />
          </button>
          {/*<button onClick={props.clickSort} className={`flex ml-auto`}>*/}
          {/*  <img src={sort} alt="sort" />*/}
          {/*</button>*/}
        </div>
      )}
      {props.data.items.map((item, idx) => (
        <div key={idx} className={`mx-auto lg:mx-0`}>
          {props.elementRenderer(item)}
        </div>
      ))}
      <Paginator page={props.page} totalPages={props.data.totalPages} setPage={props.setPage} />
    </div>
  );
}

const linkHousing: { [key: string]: string } = {
  en: "https://housing.quartier-latin.com/en/housing",
  ru: "https://housing.quartier-latin.com/housing",
  cn: "https://housing.quartier-latin.com/cn/housing",
  fr: "https://housing.quartier-latin.com/fr/housing",
  esp: "",
};

export function CatalogView<T>(props: {
  elementRenderer: (element: T) => JSX.Element;
  filters: CatalogFilterDto[] | undefined;
  parsedFilters: CatalogFilterRequestDto[];
  data: CatalogResponseDto<T> | undefined;
  page: number;
  setPage: (p: number) => void;
  setFilter: (identifier: string, item: number, value: boolean) => void;
  title: string;
}): JSX.Element {
  const [widthInner, setWidthInner] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(true);
  useEffect(() => {
    setWidthInner(window.innerWidth > 1023);
    return;
  });
  const lang = useIntl().locale;
  return (
    <div className={`flex w-full`}>
      {!widthInner && openFilter && (
        <div className={style.modalFilter}>
          <button onClick={() => setOpenFilter(false)} className={`absolute right-4 top-4 ` + style.modalClose}>
            <img src={close} alt="" />
          </button>
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
                {linkHousing[lang] && (
                  <a href={linkHousing[lang]} className={`${style.toggle__switch}`}>
                    <img src={hotel} alt="" className={`${style.toggle__switchImg}`} />
                    <span className={`${style.toggle__switchName}`}>
                      <LocalizedText id={"catalogEducation_accommodationn"} />
                    </span>
                  </a>
                )}
              </div>
            </div>
            <CatalogFilters
              filters={props.filters || []}
              parsedFilters={props.parsedFilters}
              setFilter={props.setFilter}
            />
          </div>
          <div className={`fixed bottom-4 flex items-center z-30 left-4 right-4`}>
            <button className={style.buttonSearch} onClick={() => setOpenFilter(false)}>
              <LocalizedText id={"catalogWidget_search"} />
            </button>
          </div>
        </div>
      )}
      {widthInner && (
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
              {linkHousing[lang] && (
                <a href={linkHousing[lang]} className={`${style.toggle__switch}`}>
                  <img src={hotel} alt="" className={`${style.toggle__switchImg}`} />
                  <span className={`${style.toggle__switchName}`}>
                    <LocalizedText id={"catalogEducation_accommodationn"} />
                  </span>
                </a>
              )}
            </div>
          </div>
          <CatalogFilters
            filters={props.filters || []}
            parsedFilters={props.parsedFilters}
            setFilter={props.setFilter}
          />
        </div>
      )}
      <div className={`${style.catalog__itemsCol} align-top w-full`}>
        <LoadingIf isLoading={props.data == null}>
          {props.data == null ? null : (
            <CatalogItems<T>
              elementRenderer={props.elementRenderer}
              data={props.data}
              page={props.page}
              setPage={props.setPage}
              widthInner={widthInner}
              clickFilter={() => setOpenFilter(true)}
              clickSort={() => setOpenSort(true)}
              title={props.title}
            />
          )}
        </LoadingIf>
      </div>
    </div>
  );
}
