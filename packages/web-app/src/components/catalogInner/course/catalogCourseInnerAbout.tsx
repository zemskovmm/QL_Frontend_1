import React, { FC } from "react";
import style from "./catalogCourseInnerAbout.module.css";
import { ClientUniversityDto } from "src/interfaces/clientUniversityDto";
import { ContactUsFormButton } from "src/components/common/contactUsForm/contactUsForm";
import { HtmlPresenter } from "@project/components/src/ui/HtmlPresenter/htmlPresenter";
import { LocalizedText } from "src/components/common/LocalizedText";
import { ClientCourseDto } from "../../../interfaces/clientCourseDto";
import Link from "next/link";

const CatalogCallBack = () => {
  return (
    <div className={style.catalogCallBack + " w-full"}>
      <div className={style.catalogCallBack__top}>
        <h3 className={style.catalogCallBack__title}>
          <LocalizedText id={"university_question"} />
        </h3>
        <div className={style.catalogCallBack__subtitle}>
          <LocalizedText id={"university_answer"} />
        </div>
      </div>
      <ContactUsFormButton footer={true}>
        <button className={style.catalogCallBack__btn}>
          <LocalizedText id={"university_button"} />
        </button>
      </ContactUsFormButton>
    </div>
  );
};

type CatalogInnerAboutProps = {
  data: ClientCourseDto;
};

export const CatalogCourseInnerAbout: FC<CatalogInnerAboutProps> = ({ data }) => {
  return (
    <div className={style.catalogInnerAbout__bg}>
      <div className={style.catalogInnerAbout__maxWidth}>
        <div className={style.catalogInnerAbout}>
          <h2 className={style.catalogInnerAbout__title}>{data.title}</h2>
          <HtmlPresenter text={data.descriptionHtml} />
          <div className={style.info__row}>
            <div className={`${style.info__columnItem} w-6/12`}>
              <span className={`${style.info__columnTitle}`}>
                <LocalizedText id={"university_lang"} />
              </span>
              <div className={style.info__columnItem__list}>
                {data.traits.namedTraits["instruction-language"].map((el) => (
                  <span>{el.name}</span>
                ))}
              </div>
            </div>
            <div className={`${style.info__columnItem} w-6/12`}>
              <span className={`${style.info__columnTitle}`}>
                <LocalizedText id={"university_sert"} />
              </span>
              <div className={style.info__columnItem__list}>
                {data.traits.namedTraits["certification"].map((el) => (
                  <span>{el.name}</span>
                ))}
              </div>
            </div>
            <div className={`${style.info__columnItem} w-6/12`}>
              <span className={`${style.info__columnTitle}`}>
                <LocalizedText id={"university_city"} />
              </span>
              <div className={style.info__columnItem__list}>
                {data.traits.namedTraits["city"].map((el) => (
                  <span>{el.name}</span>
                ))}
              </div>
            </div>
            <div className={`${style.info__columnItem} w-6/12`}>
              <span className={`${style.info__columnTitle}`}>
                <LocalizedText id={"housing_tableTitle_equipment"} />
              </span>
              <div className={style.info__columnItem__list}>
                {data.traits.namedTraits["accreditation"].map((el) => (
                  <span>{el.name}</span>
                ))}
              </div>
            </div>
          </div>
          {/*<div>*/}
          {/*  <span className={`${style.info__columnTitle}`}>Blog</span>*/}
          {/*  <div className={`flex`}>*/}
          {/*    <div className={style.info__columnItem__list}>*/}
          {/*      {data.traits.namedTraits["blog-tags2"].map((el, index) => (*/}
          {/*        <Link href={lang}>*/}
          {/*          <span className={`rounded-xl px-2`} style={{ background: `#FF67${index}8` }}>*/}
          {/*            #{el.name}*/}
          {/*          </span>*/}
          {/*        </Link>*/}
          {/*      ))}*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <CatalogCallBack />
      </div>
    </div>
  );
};
