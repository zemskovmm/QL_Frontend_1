import { Catalog } from "src/components/catalog/catalog";
import { CatalogUniversityDto } from "src/interfaces/catalogFilterDto";
import Link from "next/link";
import style from "src/components/catalog/style/catalogView.module.css";
import img from "src/assets/images/courses/2.png";
import { Breadcrumbs } from "../../../components/ui/Breadcrumbs/breadcrumbs";
import { BreadcrumbMain, BreadcrumbUniversityCatalog } from "../../../components/ui/Breadcrumbs/commonBreadcumbs";

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
);

const UniversityCatalogPage = () => {
  return (
    <div className={style.catalogWrapper}>
      <div className={`mr-auto mb-7`}>
        <Breadcrumbs items={[BreadcrumbMain, BreadcrumbUniversityCatalog]} />
      </div>
      <Catalog<CatalogUniversityDto> elementRenderer={UniversityCatalogElement} apiElementName="university" />;
    </div>
  );
};

export default UniversityCatalogPage;
