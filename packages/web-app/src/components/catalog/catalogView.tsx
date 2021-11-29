import {CatalogFilterDto, CatalogResponseDto, ClientCatalogFilterOptionDto} from "src/interfaces/catalogFilterDto";
import { CatalogFilterRequestDto } from "src/clients/siteApiClient";
import { Paginator } from "src/components/utilities/Paginator";
import { LoadingIf } from "src/components/utilities/Loading";
import style from "./style/catalogView.module.css";
import img from "src/assets/images/courses/2.png";
import education from "src/assets/icons/education.svg";
import course from "src/assets/icons/course.svg";
import hotel from "src/assets/icons/hotel.svg";
import filter from "src/assets/icons/filter.svg";
import sort from "src/assets/icons/sort.svg";
import close from "src/assets/icons/cross-remove.svg";
import { LocalizedText } from "../common/LocalizedText";
import {FC, useEffect, useState} from "react";
import { useIntl } from "react-intl";
import cn from "classnames";
import { CourseCatalogElement, HousingCatalogElement, UniversityCatalogElement } from "./catalogElement";
import {useObserver} from "mobx-react";

const RegionFilter:FC<{option: ClientCatalogFilterOptionDto, seletedItems:number[] , toggleFilter: (id: number, selected: boolean) => void }> = ({option, seletedItems, toggleFilter}) => {
  const [openRegion, setOpenRegion] = useState(false)
  return useObserver( () =>
    <div className={`flex`}>
      <label className={`${style.checkbox__label}`}>
        <span
          className={`${style.checkbox__input} ${
            seletedItems.indexOf(option.id) != -1 ? style.isChecked : ""
          }`}
        >
          <span className={`${style.checkbox__inner}`} />
          <input
            type="checkbox"
            checked={seletedItems.indexOf(option.id) != -1}
            aria-hidden="false"
            className={style.checkbox__original}
            value={option.name}
            onChange={(e) => toggleFilter(option.id, e.target.checked)}
          />
        </span>
      </label>
      <div className={`flex flex-col w-full`}>
        <div className={`${style.checkbox__name} w-full flex items-center cursor-pointer`} onClick={() => setOpenRegion(!openRegion)}>{option.name} <svg className={`${openRegion ? '-rotate-90' : 'rotate-90'} transform ml-2 transition duration-300`} xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" fill="none"><path d="M2.08268 0L0.916016 1.16667L4.74935 5L0.916016 8.83333L2.08268 10L7.08268 5L2.08268 0Z" fill="#567DD0"/></svg></div>
        <div className={`flex flex-wrap justify-between w-full pl-2.5 pr-6 ${openRegion ? style.hideListRegions : style.showListRegions }`}>
          <label className={`${style.checkbox__label} w-full ${openRegion ? 'mb-4' : ''}`} >
            <span
              className={`${style.checkbox__input} ${
                seletedItems.indexOf(option.id) != -1 ? style.isChecked : ""
              }`}
            >
              <span className={`${style.checkbox__inner}`} />
              <input
                type="checkbox"
                checked={seletedItems.indexOf(option.id) != -1}
                aria-hidden="false"
                className={style.checkbox__original}
                value={option.name}
                onChange={(e) => toggleFilter(option.id, e.target.checked)}
              />
            </span>
            <span className={`${style.checkbox__name}`}>{option.name}</span>
          </label>
          <label className={`${style.checkbox__label} w-full`} >
            <span
              className={`${style.checkbox__input} ${
                seletedItems.indexOf(option.id) != -1 ? style.isChecked : ""
              }`}
            >
              <span className={`${style.checkbox__inner}`} />
              <input
                type="checkbox"
                checked={seletedItems.indexOf(option.id) != -1}
                aria-hidden="false"
                className={style.checkbox__original}
                value={option.name}
                onChange={(e) => toggleFilter(option.id, e.target.checked)}
              />
            </span>
            <span className={`${style.checkbox__name}`}>{option.name}</span>
          </label>
        </div>
      </div>
    </div>
    )
}

const CityFilter:FC<{option: ClientCatalogFilterOptionDto, seletedItems:number[] , toggleFilter: (id: number, selected: boolean) => void }> = ({option, seletedItems, toggleFilter}) => {
  return (
    <label className={`${style.checkbox__label} w-full mb-4`}>
            <span
              className={`${style.checkbox__input} ${
                seletedItems.indexOf(option.id) != -1 ? style.isChecked : ""
              }`}
            >
              <span className={`${style.checkbox__inner}`} />
              <input
                type="checkbox"
                checked={seletedItems.indexOf(option.id) != -1}
                aria-hidden="false"
                className={style.checkbox__original}
                value={option.name}
                onChange={(e) => toggleFilter(option.id, e.target.checked)}
              />
            </span>
      <span className={`${style.checkbox__name}`}>{option.name}</span>
    </label>
  )
}

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
          props.filter.options.length <= 5 ? "" : show ? style.hideList : style.showList
        }`}
      >
        {props.filter.options.map((option) => (
          <RegionFilter option={option} toggleFilter={props.toggleFilter} seletedItems={props.seletedItems} key={`option ${option.name} ${option.id}`} />
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

const CatalogCategories = ({ lang = "en", type = "university" }) => (
  <div className={style.catalog__filterRow}>
    <h3 className={style.catalog__filterTitle}>
      <LocalizedText id={"catalogEducation_categories"} />
    </h3>
    <div>
      {/*<a*/}
      {/*  href={`/${lang}/catalog/course`}*/}
      {/*  className={cn(style.toggle__switch, type === "course" ? style.toggle__switch_active : "")}*/}
      {/*>*/}
      {/*  <img src={course} alt="" className={`${style.toggle__switchImg}`} />*/}
      {/*  <span className={`${style.toggle__switchName}`}>*/}
      {/*    <LocalizedText id={"catalogEducation_courses"} />*/}
      {/*  </span>*/}
      {/*</a>*/}
      <a
        href={`/${lang}/catalog/university`}
        className={cn(style.toggle__switch, type === "university" ? style.toggle__switch_active : "")}
      >
        <img src={education} alt="" className={`${style.toggle__switchImg}`} />
        <span className={`${style.toggle__switchName}`}>
          <LocalizedText id={"catalogEducation_education"} />
        </span>
      </a>
      <a
        href={`/${lang}/catalog/housing`}
        className={cn(style.toggle__switch, type === "housing" ? style.toggle__switch_active : "")}
      >
        <img src={hotel} alt="" className={`${style.toggle__switchImg}`} />
        <span className={`${style.toggle__switchName}`}>
          <LocalizedText id={"catalogHousing_title"} />
        </span>
      </a>
    </div>
  </div>
);

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
  elementRendererName: string;
  page: number;
  setPage: (page: number) => void;
  widthInner: boolean;
  clickFilter: () => void;
  clickSort: () => void;
  title: string;
  searchTitle: string;
}) {
  return (
    <div className={`flex flex-col w-full`}>
      <div className={`flex items-center px-4 lg:px-0 mb-3`}>
        <h1 className={`${style.catalog__h1}`}>{props.title}</h1>
        <div className={`${style.catalog__count}`}>
          {props.data.totalItems} <span className={`hidden lg:inline`}>{props.searchTitle}</span>
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
      {props.elementRendererName === "university"
        ? props.data.items.map((item: any, idx) => (
            <div key={idx} className={`mx-auto lg:mx-0`}>
              <UniversityCatalogElement item={item} />
            </div>
          ))
        : props.elementRendererName === "housing"
        ? props.data.items.map((item: any, idx) => (
            <div key={idx} className={`mx-auto lg:mx-0`}>
              <HousingCatalogElement item={item} />
            </div>
          ))
        : props.elementRendererName === "course"
        ? props.data.items.map((item: any, idx) => (
            <div key={idx} className={`mx-auto lg:mx-0`}>
              <CourseCatalogElement item={item} />
            </div>
          ))
        : ""}
      <Paginator page={props.page} totalPages={props.data.totalPages} setPage={props.setPage} />
    </div>
  );
}

export function CatalogView<T>(props: {
  elementRendererName: string;
  filters: CatalogFilterDto[] | undefined;
  parsedFilters: CatalogFilterRequestDto[];
  data: CatalogResponseDto<T> | undefined;
  page: number;
  setPage: (p: number) => void;
  setFilter: (identifier: string, item: number, value: boolean) => void;
  title: string;
  type: string;
  searchTitle: string;
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
            <CatalogCategories lang={lang} />
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
          <CatalogCategories lang={lang} type={props.type} />
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
              elementRendererName={props.elementRendererName}
              data={props.data}
              page={props.page}
              setPage={props.setPage}
              widthInner={widthInner}
              clickFilter={() => setOpenFilter(true)}
              clickSort={() => setOpenSort(true)}
              title={props.title}
              searchTitle={props.searchTitle}
            />
          )}
        </LoadingIf>
      </div>
    </div>
  );
}
