import React, { FC } from "react";
import style from "./catalogCourseInnerAbout.module.css";
import { ClientUniversityDto } from "src/interfaces/clientUniversityDto";
import { ContactUsFormButton } from "src/components/common/contactUsForm/contactUsForm";
import { HtmlPresenter } from "@project/components/src/ui/HtmlPresenter/htmlPresenter";
import { LocalizedText } from "src/components/common/LocalizedText";
import { ClientCourseDto } from "../../../interfaces/clientCourseDto";
import Link from "next/link";
import { ApiBaseUrl } from "@project/components/src/api/apiClientBase";
import notIcon from "../../../assets/icons/done_outline.svg";

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
          <h2 className={style.catalogInnerAbout__title}>
            <LocalizedText id={"courses_tab_about_course"} />
          </h2>
          <HtmlPresenter text={data.descriptionHtml} />
          <div className={style.info__row}>
            <div className={`${style.info__columnItem} w-full`}>
              <span className={`${style.info__columnTitle}`}>
                <LocalizedText id={"trait_directions_study"} />
              </span>
              <div className={style.info__columnItem__list}>
                {data.traits.namedTraits["directions-study"]?.map((el) => (
                  <span>{el.name}</span>
                ))}
              </div>
            </div>
            <div className={`${style.info__columnItem} w-full`}>
              <span className={`${style.info__columnTitle}`}>
                <LocalizedText id={"trait_learning_outcome"} />
              </span>
              <div className={style.info__columnItem__list}>
                {data.traits.namedTraits["learning-outcome"]?.map((el) => (
                  <span>{el.name}</span>
                ))}
              </div>
            </div>
            <div className={`${style.info__columnItem} w-6/12`}>
              <span className={`${style.info__columnTitle}`}>
                <LocalizedText id={"trait_start_dates"} />
              </span>
              <div className={style.info__columnItem__list}>
                {data.traits.namedTraits["start-dates"]?.map((el) => (
                  <span>{el.name}</span>
                ))}
              </div>
            </div>
            <div className={`${style.info__columnItem} w-4/12`}>
              <span className={`${style.info__columnTitle}`}>
                <LocalizedText id={"university_city"} />
              </span>
              <div className={style.info__columnItem__list}>
                {data.traits.namedTraits["city"]?.map((el) => (
                  <span>{el.name}</span>
                ))}
              </div>
            </div>
            <div className={`${style.info__columnItem} w-2/12`}>
              <span className={`${style.info__columnTitle}`}>
                <LocalizedText id={"trait_age"} />
              </span>
              <div className={style.info__columnItem__list}>
                {data.traits.namedTraits["Age"]?.map((el) => (
                  <span>{el.name}</span>
                ))}
              </div>
            </div>
            <div className={`${style.info__columnItem} w-6/12`}>
              <span className={`${style.info__columnTitle}`}>
                <LocalizedText id={"trait_level_preparation"} />
              </span>
              <div className={style.info__columnItem__list}>
                {data.traits.namedTraits["training-level"]?.map((el) => (
                  <span>{el.name}</span>
                ))}
              </div>
            </div>
            <div className={`${style.info__columnItem} w-4/12`}>
              <span className={`${style.info__columnTitle}`}>
                <LocalizedText id={"trait_size_class"} />
              </span>
              <div className={style.info__columnItem__list}>
                {data.traits.namedTraits["size-class"]?.map((el) => (
                  <span>{el.name}</span>
                ))}
              </div>
            </div>
          </div>
          <div className={`mb-6 flex flex-wrap px-4 lg:px-16`}>
            {data.traits.namedTraits["benefits"]?.map((el, index) => (
              <div className={`flex flex-col items-center mx-10 w-40 mb-10`} key={el.name + index}>
                <div className={`p-2 w-10 h-10 rounded-full mr-8 lg:mr-10`} style={{ backgroundColor: "#EFF3FA" }}>
                  <img src={el.iconId ? `${ApiBaseUrl}/api/media/scaled/${el.iconId}` : notIcon} alt="" />
                </div>
                <span style={{ color: "#373737" }} className={`text-sm`}>
                  {el.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <CatalogCallBack />
      </div>
    </div>
  );
};
