import { Catalog } from "src/components/catalog/catalog";
import { CatalogUniversityDto } from "src/interfaces/catalogFilterDto";
import Link from "next/link";
import style from "src/components/catalog/style/catalogView.module.css";
import img from "src/assets/images/courses/2.png";
import { LocalizedText } from "../../../components/common/LocalizedText";
import { BreadcrumbsBlock } from "@project/components/src/blocks/BreadcrumbsBlock/breadcrumbsBlock";
import { useIntl } from "react-intl";

const UniversityCatalogElement = (item: CatalogUniversityDto) => (
  <a href={item.url} className={style.card}>
    <div className={style.card__left}>
      <div className={style.card__leftImg}>
        <img src={img} alt="" />
      </div>
    </div>
    <div className={style.card__right}>
      <div className={style.card__rightTitle}>{item.name}</div>
      <div className={style.card__rightLevel}>
        <span className={style.card__rightSubtitle}>
          <LocalizedText id={"catalogItems_degree"} />:{" "}
        </span>
        {item.degrees?.map((el) => (
          <span className={style.card__rightLevel_degree}>{el}</span>
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
      <div className={style.card__rightPrice}>
        <span className={style.card__rightSubtitle}>Стоимость:</span>
        <div className={style.card__rightPrice__list}>
          <span className={style.card__rightPrice__listItem}>
            <b>
              <LocalizedText id={"catalogItems_price_from"} /> {item.priceFrom}{" "}
              <LocalizedText id={"catalogItems_price_value"} />
            </b>{" "}
            / <LocalizedText id={"catalogItems_price_week"} />
          </span>
          <span className={style.card__rightPrice__listItem}>
            <b>
              <LocalizedText id={"catalogItems_price_before"} /> {item.priceTo}{" "}
              <LocalizedText id={"catalogItems_price_value"} />
            </b>{" "}
            / <LocalizedText id={"catalogItems_price_week"} />
          </span>
        </div>
      </div>
    </div>
  </a>
);

const UniversityCatalogPage = () => {
  const lang = useIntl().locale;

  return (
    <div style={{ backgroundColor: "#f9fafd" }}>
      <div className={style.catalogWrapper}>
        <div className={`mr-auto mb-7`}>
          <BreadcrumbsBlock
            items={[
              {
                name: <LocalizedText id={"breadcrumbs_Main"} />,
                link: `/${lang}`,
              },
              {
                name: <LocalizedText id={"breadcrumbs_Catalog"} />,
                link: ``,
              },
            ]}
          />
        </div>
        <Catalog<CatalogUniversityDto> elementRenderer={UniversityCatalogElement} apiElementName="university" />;
      </div>
    </div>
  );
};

export default UniversityCatalogPage;
