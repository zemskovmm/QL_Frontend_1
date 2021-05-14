import { CatalogFilterDto, CatalogResponseDto } from "src/interfaces/catalogFilterDto";
import { CatalogFilterRequestDto } from "src/clients/siteApiClient";
import { Paginator } from "src/components/utilities/Paginator";
import { LoadingIf } from "src/components/utilities/Loading";
import style from "./style/catalogView.module.css";
import img from "src/assets/images/courses/2.png";

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
        <h1 className={`${style.catalog__h1}`}>Образование за рубежом</h1>
        <div className={`${style.catalog__count}`}>{props.data.totalItems} программ</div>
      </div>
      {props.data.items.map((item, idx) => (
        <a href={item.url} className={style.card} key={idx}>
          <div className={style.card__left}>
            <div className={style.card__leftImg}>
              <img src={img} alt="" />
            </div>
          </div>
          <div className={style.card__right}>
            <div className={style.card__rightTitle}>{item.name}</div>
            <div className={style.card__rightLevel}>
              <span className={style.card__rightSubtitle}>Уровень: </span>
              {item.degrees?.map((el) => (
                <span className={style.card__rightLevel_degree}>{el}</span>
              ))}
            </div>
            <div className={style.card__rightLanguage}>
              <span className={style.card__rightSubtitle}>Язык:</span>
              <div className={style.card__rightLanguage_list}>
                <b>
                  <img src="`../../images/catalogFlags/${lang}.svg`" alt="" />
                  <span>Все языки</span>
                </b>
              </div>
            </div>
            <div className={style.card__rightPrice}>
              <span className={style.card__rightSubtitle}>Стоимость:</span>
              <div className={style.card__rightPrice__list}>
                <span className={style.card__rightPrice__listItem}>
                  <b>от {item.priceFrom} €</b> / нед.
                </span>
                <span className={style.card__rightPrice__listItem}>
                  <b>до {item.priceTo} €</b> / нед.
                </span>
              </div>
            </div>
          </div>
        </a>
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
          <h3 className={style.catalog__filterTitle}>КАТЕГОРИИ</h3>
          <div>
            <a href="#" className={`${style.toggle__switch} ${style.toggle__switch_active}`}>
              <svg
                className={`${style.toggle__switchImg}`}
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26 4.4491V2.92566H0V4.4491H6.30993V14.5033H19.6901V4.4491H22.4975V17.3887C21.6818 17.6973 21.1 18.4861 21.1 19.4086C21.1 20.8501 23.2661 23.0743 23.2661 23.0743C23.2661 23.0743 24.2032 22.1038 24.5834 21.5567C25.1373 20.7595 25.4182 20.0368 25.4182 19.4087C25.4182 18.4862 24.8365 17.6974 24.0208 17.3887V4.4491H26ZM7.83336 12.9798V11.3697H18.1666V12.9798H7.83336ZM18.1666 9.84628H7.83336V4.4491H18.1666V9.84628ZM23.2551 20.7988C22.9306 20.3533 22.6235 19.811 22.6235 19.4086C22.6235 19.0581 22.9086 18.7729 23.2592 18.7729C23.6097 18.7729 23.8949 19.0581 23.8949 19.4086C23.8949 19.7784 23.5979 20.3234 23.2551 20.7988Z"
                  fill="#567DD0"
                />
                <line x1="7.80005" y1="10.6" x2="18.2" y2="10.6" stroke="#FF6768" stroke-width="1.6" />
              </svg>
              {/*<img src="" alt="" className={`${style.toggle__switchImg}`}/>*/}
              <span className={`${style.toggle__switchName}`}>Образование</span>
            </a>
            <a href="#" className={`${style.toggle__switch}`}>
              <svg
                className={`${style.toggle__switchImg}`}
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26 4.4491V2.92566H0V4.4491H6.30993V14.5033H19.6901V4.4491H22.4975V17.3887C21.6818 17.6973 21.1 18.4861 21.1 19.4086C21.1 20.8501 23.2661 23.0743 23.2661 23.0743C23.2661 23.0743 24.2032 22.1038 24.5834 21.5567C25.1373 20.7595 25.4182 20.0368 25.4182 19.4087C25.4182 18.4862 24.8365 17.6974 24.0208 17.3887V4.4491H26ZM7.83336 12.9798V11.3697H18.1666V12.9798H7.83336ZM18.1666 9.84628H7.83336V4.4491H18.1666V9.84628ZM23.2551 20.7988C22.9306 20.3533 22.6235 19.811 22.6235 19.4086C22.6235 19.0581 22.9086 18.7729 23.2592 18.7729C23.6097 18.7729 23.8949 19.0581 23.8949 19.4086C23.8949 19.7784 23.5979 20.3234 23.2551 20.7988Z"
                  fill="#567DD0"
                />
                <line x1="7.80005" y1="10.6" x2="18.2" y2="10.6" stroke="#FF6768" stroke-width="1.6" />
              </svg>
              {/*<img src="" alt="" className={`${style.toggle__switchImg}`}/>*/}
              <span className={`${style.toggle__switchName}`}>Проживание</span>
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
