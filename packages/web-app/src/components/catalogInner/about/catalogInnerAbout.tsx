import React, { FC } from "react";
import style from "./catalogInnerAbout.module.css";
import { ClientUniversityDto } from "src/interfaces/clientUniversityDto";
import { ContactUsFormButton } from "src/components/common/contactUsForm/contactUsForm";

const CatalogCallBack = () => {
  return (
    <div className={style.catalogCallBack + " w-full"}>
      <div className={style.catalogCallBack__top}>
        <h3 className={style.catalogCallBack__title}>Есть вопросы?</h3>
        <div className={style.catalogCallBack__subtitle}>Наш менеджер на них ответит!</div>
      </div>
      <ContactUsFormButton footer={true}>
        <button className={style.catalogCallBack__btn}>Хочу учиться здесь</button>
      </ContactUsFormButton>
    </div>
  );
};

type CatalogInnerAboutProps = {
  data: ClientUniversityDto;
};

export const CatalogInnerAbout: FC<CatalogInnerAboutProps> = ({ data }) => {
  return (
    <div className={style.catalogInnerAbout__bg}>
      <div className={style.catalogInnerAbout__maxWidth}>
        <div className={style.catalogInnerAbout}>
          <h2 className={style.catalogInnerAbout__title}>{data.title}</h2>
          <div
            className={style.catalogInnerAbout__content}
            dangerouslySetInnerHTML={{ __html: data.descriptionHtml }}
          />
          <div className={style.info__row}>
            <div className={`${style.info__columnItem} w-full`}>
              <span className={`${style.info__columnTitle}`}>Направления обучения:</span>
              <div className={style.info__columnItem__list}>
                {data.traits.universitySpecialties.map((el) => (
                  <span>{el.name}</span>
                ))}
              </div>
            </div>
            <div className={`${style.info__columnItem} w-full`}>
              <span className={`${style.info__columnTitle}`}>Направления обучения:</span>
              <div className={`flex flex-col w-full`}>
                {data.traits.universityDegrees.map((el) => (
                  <div className={style.info__columnItem__priceList}>
                    <span>
                      <b>от {el.costFrom} €</b> / год.
                    </span>
                    <span>
                      <b>до {el.costTo} €</b> / год.
                    </span>
                    <span>
                      <b> {el.name}</b>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${style.info__columnItem} w-6/12`}>
              <span className={`${style.info__columnTitle}`}>Язык обучения:</span>
              <div className={style.info__columnItem__list}>
                {data.traits.namedTraits["instruction-language"].map((el) => (
                  <span>{el.name}</span>
                ))}
              </div>
            </div>
            <div className={`${style.info__columnItem} w-6/12`}>
              <span className={`${style.info__columnTitle}`}>Сертификация:</span>
              <div className={style.info__columnItem__list}>
                {data.traits.namedTraits["certification"].map((el) => (
                  <span>{el.name}</span>
                ))}
              </div>
            </div>
            <div className={`${style.info__columnItem} w-6/12`}>
              <span className={`${style.info__columnTitle}`}>Города:</span>
              <div className={style.info__columnItem__list}>
                {data.traits.namedTraits["city"].map((el) => (
                  <span>{el.name}</span>
                ))}
              </div>
            </div>
            <div className={`${style.info__columnItem} w-6/12`}>
              <span className={`${style.info__columnTitle}`}>Год основания:</span>
              <div className={style.info__columnItem__list}>
                <span>{data.foundationYear}</span>
              </div>
            </div>
          </div>
        </div>
        <CatalogCallBack />
      </div>
    </div>
  );
};
