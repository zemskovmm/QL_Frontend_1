import React, { FC } from "react";
import style from "./catalogInnerAbout.module.css";
import { ClientUniversityDto } from "src/interfaces/clientUniversityDto";
import { ContactUsFormButton } from "src/components/common/contactUsForm/contactUsForm";
import { HtmlPresenter } from "@project/components/src/ui/HtmlPresenter/htmlPresenter";
import { LocalizedText } from "../../common/LocalizedText";
import styles from "@project/components/src/blocks/FeedbackSliderBlock/feedbackSliderBlock.module.css";
import cn from "classnames";
import Carousel from "react-multi-carousel";
import { ApiBaseUrl } from "@project/components/src/api/apiClientBase";

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
  data: ClientUniversityDto;
};

export const CatalogInnerAbout: FC<CatalogInnerAboutProps> = ({ data }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 1920, min: 1024 },
      items: 1,
      partialVisibilityGutter: 1200,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      partialVisibilityGutter: 0,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 0,
    },
  };

  console.log("asdfasdf", data);
  return (
    <div className={style.catalogInnerAbout__bg}>
      <div className={style.catalogInnerAbout__maxWidth}>
        <div className={style.catalogInnerAbout}>
          <h2 className={style.catalogInnerAbout__title}>{data.title}</h2>
          <HtmlPresenter text={data.descriptionHtml} />
          <div className={style.info__row}>
            <div className={`${style.info__columnItem} w-full`}>
              <span className={`${style.info__columnTitle}`}>
                <LocalizedText id={"university_direction"} />
              </span>
              <div className={style.info__columnItem__list}>
                {data.traits.universitySpecialties.map((el) => (
                  <span>{el.name}</span>
                ))}
              </div>
            </div>
            <div className={`${style.info__columnItem} w-full`}>
              <span className={`${style.info__columnTitle}`}>
                <LocalizedText id={"university_cost"} />
              </span>
              <div className={`flex flex-col w-full`}>
                {data.traits.universityDegrees.map((el) => (
                  <div className={style.info__columnItem__priceList}>
                    <span>
                      <b>
                        <LocalizedText id={"university_from"} /> {el.costFrom} €
                      </b>{" "}
                      / <LocalizedText id={"university_year"} />.
                    </span>
                    <span>
                      <b>
                        <LocalizedText id={"university_upto"} /> {el.costTo} €
                      </b>{" "}
                      / <LocalizedText id={"university_year"} />.
                    </span>
                    <span>
                      <b> {el.name}</b>
                    </span>
                  </div>
                ))}
              </div>
            </div>
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
                <LocalizedText id={"university_foundation"} />
              </span>
              <div className={style.info__columnItem__list}>
                <span>{data.foundationYear}</span>
              </div>
            </div>
          </div>
        </div>
        <CatalogCallBack />
      </div>

      {data.galleryList.length > 0 && (
        <div className={style.catalogInnerAbout__maxWidth}>
          <Carousel ssr responsive={responsive} renderDotsOutside slidesToSlide={1} containerClass={styles.container}>
            {data.galleryList.map((img, ind) => (
              <div key={ind}>
                <img src={`${ApiBaseUrl}/api/media/${img}`} alt="" />
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};
