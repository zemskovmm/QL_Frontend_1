import {
  CatalogCourseDto,
  CatalogHousingDto,
  CatalogItemDto,
  CatalogUniversityDto,
} from "src/interfaces/catalogFilterDto";
import Link from "next/link";
import style from "src/components/catalog/style/catalogView.module.css";
import img from "src/assets/images/courses/2.png";
import TempSchoolLogo from "src/assets/icons/tempSchoolLogo.svg";
import { LocalizedText } from "src/components/common/LocalizedText";
import { ApiBaseUrl } from "@project/components/src/api/apiClientBase";
import { FC } from "react";
import pin from "src/assets/icons/pin.svg";

const ElementCatalog: FC<{ item: CatalogItemDto }> = ({ children, item }) => (
  <Link href={item.url}>
    <a className={style.card}>
      <div className={style.card__left}>
        <div className={style.card__leftImg}>
          {item.logoId ? <img src={`${ApiBaseUrl}/api/media/${item.logoId}`} alt="" /> : <img src={img} alt="" />}
        </div>
      </div>
      <div className={style.card__right}>
        <div className={style.card__rightTitle}>{item.name}</div>
        {children}
        <div className={style.card__rightPrice}>
          <span className={style.card__rightSubtitle}>
            <LocalizedText id={"catalogItems_price"} />:
          </span>
          <div className={style.card__rightPrice__list}>
            {item.priceFrom > 0 ? (
              <>
                <span className={style.card__rightPrice__listItem}>
                  <b>
                    <LocalizedText id={"catalogItems_price_from"} /> {item.priceFrom}{" "}
                    <LocalizedText id={"catalogItems_price_value"} />
                  </b>{" "}
                  / <LocalizedText id={"catalogItems_price_year"} />
                </span>
                <span className={style.card__rightPrice__listItem}>
                  <b>
                    <LocalizedText id={"catalogItems_price_before"} /> {item.priceTo}{" "}
                    <LocalizedText id={"catalogItems_price_value"} />
                  </b>{" "}
                  / <LocalizedText id={"catalogItems_price_year"} />
                </span>
              </>
            ) : (
              <span className={style.card__rightPrice__listItem}>
                <b>
                  <LocalizedText id={"catalogItems_price_upto"} /> {item.priceTo}{" "}
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

export const HousingCatalogElement = (item: CatalogHousingDto) => (
  <Link href={item.url}>
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
          {item.name} {item.namedTraits.city && item.namedTraits.city[0]?.name}
        </div>
        <div className={`${style.card__rightPrice} mt-auto`}>
          <span className={style.card__rightSubtitle}>
            <LocalizedText id={"catalogItems_price"} />:
          </span>
          <div className={`${style.card__rightPrice__list}`}>
            <span className={style.card__rightPrice__listItem}>
              <b>
                <LocalizedText id={"catalogItems_price_upto"} /> {item.price}{" "}
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

export const UniversityCatalogElement = (item: CatalogUniversityDto) => (
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
        <b>
          <img src="`../../images/catalogFlags/${lang}.svg`" alt="" />
          <span>
            <LocalizedText id={"catalogItems_language_all"} />
          </span>
        </b>
      </div>
    </div>
  </ElementCatalog>
);

export const CourseCatalogElement = (item: CatalogCourseDto) => (
  <ElementCatalog item={item}>
    <div className={style.card__rightLevel}>
      <span className={style.card__rightSubtitle}>
        <LocalizedText id={"catalogItems_school"} />:{" "}
      </span>
      <p className={style.card__school}>
        <span>{item.schoolName}</span>
      </p>
    </div>
    <div className={style.card__rightLevel}>
      <span className={style.card__rightSubtitle}>
        <LocalizedText id={"catalogItems_duration"} />:{" "}
      </span>
      <LocalizedText id={"catalogItems_week"} />
    </div>
  </ElementCatalog>
);
