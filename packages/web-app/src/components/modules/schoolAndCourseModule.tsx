import { TitleAndCallBackBlock } from "@project/components/src/blocks/TitleAndCallBackBlock/titleAndCallBackBlock";
import { LocalizedText, useLocalizedText } from "../common/LocalizedText";
import { BreadcrumbsBlock } from "@project/components/src/blocks/BreadcrumbsBlock/breadcrumbsBlock";
import { useIntl } from "react-intl";
import cn from "classnames";
import styles from "../catalogInner/course/TabsControlBlock.module.css";
import React from "react";
import Link from "next/link";
import { ClientSchoolAndCourseListDto } from "../../interfaces/clientSchoolAndCourseDto";
import style from "../catalog/style/catalogView.module.css";
import { Catalog } from "../catalog/catalog";
import { CatalogUniversityDto } from "../../interfaces/catalogFilterDto";
import { UniversityCatalogElement } from "../catalog/catalogElement";
import { CatalogView } from "../catalog/catalogView";
import { CourseCatalogElement } from "src/components/catalog/catalogElement";

export const SchoolAndCourseModule = (props: ClientSchoolAndCourseListDto) => {
  const lang = useIntl().locale;
  const intl = useIntl();
  return (
    <>
      <section style={{ background: "#F9FAFD", maxWidth: "100%" }} className="relative mx-auto">
        <BreadcrumbsBlock
          whiteColor={false}
          items={[
            { name: <LocalizedText id={"breadcrumbs_Main"} />, link: `/${lang}` },
            { name: props.school.title, link: `/${lang}/school/${props.urls.split("/")[2]}` },
            { name: <LocalizedText id={"courses_tab_all_course"} />, link: `#` },
          ]}
        />
        <TitleAndCallBackBlock
          logo={props.school.logoId}
          title={props.school.title}
          titleColor={"black"}
          titleShadow={false}
          background={null}
          backgroundShadow={"0%"}
          textButton={""}
          showButton={false}
          textAbove={`
            ${useLocalizedText({ id: "courses_title1" }, intl)} ${props.school.title}${useLocalizedText(
            { id: "courses_title2" },
            intl
          )}`}
          school={true}
        />
      </section>
      <div className="flex flex-col w-full">
        <div className={cn(styles.tabs, "flex px-2.5 pb-2.5")}>
          <div className="flex flex-wrap justify-left max-w-screen-xl w-full mx-auto px-5">
            <Link href={`/${lang}/school/${props.urls.split("/")[2]}`}>
              <div>
                <LocalizedText id={"courses_tab_about_school"} />
              </div>
            </Link>
            <Link href={"#"}>
              <div className={styles.active}>
                <LocalizedText id={"courses_tab_all_course"} />
              </div>
            </Link>
          </div>
        </div>
        <div className={cn(styles.tabs, styles.mobiletabs, "p-2.5")}>
          <div className="flex flex-col  mx-auto">
            <Link href={`/${lang}/school/${props.urls.split("/")[2]}`}>
              <div className={styles.active}>
                <LocalizedText id={"courses_tab_about_school"} />
              </div>
            </Link>
            <Link href={"#"}>
              <div className={styles.active}>
                <LocalizedText id={"courses_tab_all_course"} />
              </div>
            </Link>
          </div>
        </div>
        <div className={`max-w-screen-xl w-full mx-auto my-10 px-14`}>
          <div className={`mb-8`}>Вы сможете забронировать вариант проживания в процессе покупки курса</div>
          <div className={`w-6/12`}>
            {props.courses.map((el) => (
              <CourseCatalogElement {...el} schoolName={props.school.title} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
