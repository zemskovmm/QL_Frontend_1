import { BreadcrumbsBlock } from "@project/components/src/blocks/BreadcrumbsBlock/breadcrumbsBlock";
import { LocalizedText, useLocalizedText } from "../common/LocalizedText";
import { TitleAndCallBackBlock } from "@project/components/src/blocks/TitleAndCallBackBlock/titleAndCallBackBlock";
import { CatalogCourseInnerAbout } from "../catalogInner/course/catalogCourseInnerAbout";
import { useIntl } from "react-intl";
import cn from "classnames";
import styles from "src/components/catalogInner/course/TabsControlBlock.module.css";
import React from "react";
import Link from "next/link";
import { ClientSchoolAndCourseDto } from "../../interfaces/clientCourseDto";

export const CourseModule = (props: ClientSchoolAndCourseDto) => {
  const lang = useIntl().locale;
  const intl = useIntl();

  return (
    <>
      <section style={{ background: "#F9FAFD", maxWidth: "100%" }} className="relative mx-auto">
        <BreadcrumbsBlock
          whiteColor={false}
          items={[
            { name: <LocalizedText id={"breadcrumbs_Main"} />, link: `/${lang}` },
            { name: <LocalizedText id={"breadcrumbs_Catalog"} />, link: `/${lang}/catalog/course` },
            { name: <LocalizedText id={"courses_tab_about_course"} />, link: `#` },
          ]}
        />
        <TitleAndCallBackBlock
          logo={props.school.logoId}
          title={props.school.title}
          titleColor={"black"}
          titleShadow={false}
          background={null}
          backgroundShadow={"0"}
          textButton={<LocalizedText id={"university_button"} />}
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
            <Link href={{ pathname: `/${lang}/school/${props.urls.split("/")[2]}` ?? "#" }}>
              <div>
                <LocalizedText id={"courses_tab_about_school"} />
              </div>
            </Link>
            <Link href={`/${lang}/${props.urls.split("/")[2]}/courses` ?? "#"}>
              <div>
                <LocalizedText id={"courses_tab_all_course"} />
              </div>
            </Link>
            <Link href={`/${lang}/catalog/housing`}>
              <div>
                <LocalizedText id={"catalogHousing_title"} />
              </div>
            </Link>
            <Link href={`#`}>
              <div className={styles.active}>
                <LocalizedText id={"courses_tab_about_course"} />
              </div>
            </Link>
          </div>
        </div>
        <div className={cn(styles.tabs, styles.mobiletabs, "p-2.5")}>
          <div className="flex flex-col  mx-auto">
            <Link href={{ pathname: `/${lang}/school/${props.urls.split("/")[2]}` ?? "#" }}>
              <div>
                <LocalizedText id={"courses_tab_about_school"} />
              </div>
            </Link>
            <Link href={`/${lang}/${props.urls.split("/")[2]}/courses` ?? "#"}>
              <div>
                <LocalizedText id={"courses_tab_all_course"} />
              </div>
            </Link>
            <Link href={`/${lang}/catalog/housing`}>
              <div>
                <LocalizedText id={"catalogHousing_title"} />
              </div>
            </Link>
            <Link href={`#`}>
              <div className={styles.active}>
                <LocalizedText id={"courses_tab_about_course"} />
              </div>
            </Link>
          </div>
        </div>
        <div className={cn("py-9 px-10")}>
          <CatalogCourseInnerAbout data={props.course} />
        </div>
      </div>
    </>
  );
};
