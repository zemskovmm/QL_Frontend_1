import {
  CatalogCourseDto,
  CatalogHousingDto,
  CatalogItemDto,
  CatalogUniversityDto,
} from "src/interfaces/catalogFilterDto";
import Link from "next/link";
import style from "src/components/catalog/style/catalogView.module.css";
import img from "src/assets/images/courses/2.png";
import { LocalizedText } from "src/components/common/LocalizedText";
import { ApiBaseUrl } from "@project/components/src/api/apiClientBase";
import React, { FC, useContext } from "react";
import pin from "src/assets/icons/pin.svg";
import { useObserver } from "mobx-react";
import { ComponentHostContext } from "@project/components/src/blocks";
import { default as Flags } from "../../assets/icons/flags";

const ElementCatalog: FC<{ item: CatalogItemDto }> = ({ children, item }) => (
  <Link href={item.url ?? "#"}>
    <a className={style.card}>
      <div className={style.card__left}>
        <div className={style.card__leftImg}>
          {item.logoId ? <img src={`${ApiBaseUrl}/api/media/${item.logoId}`} alt="" /> : <img src={img} alt="" />}
        </div>
      </div>
      <div className={style.card__right}>
        <div className={style.card__rightTitle}>{item?.name}</div>
        {children}
        <div className={style.card__rightPrice}>
          <span className={style.card__rightSubtitle}>
            <LocalizedText id={"catalogItems_price"} />:
          </span>
          <div className={style.card__rightPrice__list}>
            {item?.priceFrom > 0 ? (
              <>
                <span className={style.card__rightPrice__listItem}>
                  <b>
                    <LocalizedText id={"catalogItems_price_from"} /> {item?.priceFrom}{" "}
                    <LocalizedText id={"catalogItems_price_value"} />
                  </b>{" "}
                  / <LocalizedText id={"catalogItems_price_year"} />
                </span>
                <span className={style.card__rightPrice__listItem}>
                  <b>
                    <LocalizedText id={"catalogItems_price_before"} /> {item?.priceTo}{" "}
                    <LocalizedText id={"catalogItems_price_value"} />
                  </b>{" "}
                  / <LocalizedText id={"catalogItems_price_year"} />
                </span>
              </>
            ) : (
              <span className={style.card__rightPrice__listItem}>
                <b>
                  <LocalizedText id={"catalogItems_price_upto"} /> {item?.priceTo}{" "}
                  <LocalizedText id={"catalogItems_price_value"} />
                </b>{" "}
                / <LocalizedText id={"catalogItems_price_year"} />
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  </Link>
);

export const HousingCatalogElement: FC<{ item: CatalogHousingDto }> = ({ item }) => (
  <Link href={item?.url}>
    <a className={style.card}>
      <div className={style.card__left}>
        <div className={style.card__leftImg}>
          {item.galleryList ? (
            <img src={`${ApiBaseUrl}/api/media/${item.galleryList[0]}`} alt="" />
          ) : (
            <img src={img} alt="" />
          )}
        </div>
      </div>
      <div className={style.card__right}>
        <div className={style.card__rightTitle}>
          {item?.name} {item.namedTraits.city && item.namedTraits.city[0]?.name}
        </div>
        <a
          className={`flex items-start ${style.multiImg__contentMap}`}
          href={`https://www.google.com/maps/@${item.location?.lat},${item.location?.lng},20z`}
          target={`_blank`}
        >
          <img src={pin} alt="" /> <span className={`ml-2 underline`}>{item.location?.address}</span>
        </a>
        <div dangerouslySetInnerHTML={{ __html: item.htmlDescription }} className={`${style.card__housingDesc} py-5`} />
        <div className={`${style.card__rightPrice} mt-auto`}>
          <span className={style.card__rightSubtitle}>
            <LocalizedText id={"catalogItems_price"} />:
          </span>
          <div className={`${style.card__rightPrice__list}`}>
            <span className={style.card__rightPrice__listItem}>
              <b>
                {Number(item?.price) < 400 ? (
                  <span>
                    <LocalizedText id={"catalogItems_price_upto"} /> {"400"}
                  </span>
                ) : (
                  <span>
                    <LocalizedText id={"catalogItems_price_from"} /> {item?.price}{" "}
                  </span>
                )}
                <LocalizedText id={"catalogItems_price_value"} />
              </b>{" "}
              / <LocalizedText id={"catalogItems_price_month"} />
            </span>
          </div>
        </div>
      </div>
    </a>
  </Link>
);

export const UniversityCatalogElement: FC<{ item: CatalogUniversityDto }> = ({ item }) => {
  const lang = useContext(ComponentHostContext)?.lang;
  return useObserver(() => (
    <ElementCatalog item={item}>
      <div className={style.card__rightLevel}>
        <span className={style.card__rightSubtitle}>
          <LocalizedText id={"catalogItems_degree"} />:{" "}
        </span>
        {item.degrees?.map((el, ind) => (
          <span key={ind} className={style.card__rightLevel_degree}>
            {el}
          </span>
        ))}
      </div>
      <div className={style.card__rightLanguage}>
        <span className={style.card__rightSubtitle}>
          <LocalizedText id={"catalogItems_language"} />:
        </span>
        <div className={style.card__rightLanguage_list}>
          <span className={`mr-2`}>
            <Flags icon={"en"} />
          </span>

          <span className={`mr-2`}>
            <Flags icon={"ru"} />
          </span>

          <span className={`mr-2`}>
            <Flags icon={"fr"} />
          </span>

          <span className={`mr-2`}>
            <Flags icon={"esp"} />
          </span>

          <span className={`mr-2`}>
            <Flags icon={"cn"} />
          </span>
        </div>
      </div>
    </ElementCatalog>
  ));
};

export const CourseCatalogElement: FC<{ item: CatalogCourseDto }> = ({ item }) => (
  <Link href={item.url ?? "#"}>
    <a className={style.card}>
      <div className={style.card__left}>
        <div className={style.card__leftImg}>
          {item.courseImageId ? (
            <img src={`${ApiBaseUrl}/api/media/${item.courseImageId}`} alt="" />
          ) : item.schoolImageId ? (
            <img src={`${ApiBaseUrl}/api/media/${item.schoolImageId}`} alt="" />
          ) : item.imageId ? (
            <img src={`${ApiBaseUrl}/api/media/${item.imageId}`} alt="" />
          ) : (
            <img src={img} alt="" />
          )}
        </div>
      </div>
      <div className={style.card__right}>
        <div className={style.card__rightTitle}>{item?.name}</div>
        <div className={style.card__rightLevel}>
          <span className={style.card__rightSubtitle}>
            <LocalizedText id={"catalogItems_school"} />:{" "}
          </span>
          <p className={style.card__school}>
            <span>{item?.schoolName}</span>
          </p>
        </div>
        <div className={style.card__rightLevel}>
          <span className={style.card__rightSubtitle}>
            <LocalizedText id={"catalogItems_duration"} />:{" "}
          </span>
          <div className={`flex flex-col`}>
            {item.traits
              ? item.traits.namedTraits["duration"]?.map((el, i) => (
                  <span key={`duration ${i} ${el.name}`}>{el.name}</span>
                ))
              : item.namedTraits["duration"]?.map((el, i) => <span key={`duration ${i} ${el.name}`}>{el.name}</span>)}
          </div>
        </div>
        <div className={`${style.card__rightPrice} mt-auto`}>
          <span className={style.card__rightSubtitle}>
            <LocalizedText id={"catalogItems_price"} />:
          </span>
          <div className={`${style.card__rightPrice__list}`}>
            <span className={style.card__rightPrice__listItem}>
              <b>
                <LocalizedText id={"catalogItems_price_from"} /> {item?.price}{" "}
                <LocalizedText id={"catalogItems_price_value"} />
              </b>{" "}
              / <LocalizedText id={"catalogItems_price_month"} />
            </span>
          </div>
        </div>
      </div>
    </a>
  </Link>
);
