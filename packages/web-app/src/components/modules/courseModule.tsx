import { ClientCourseDto } from "src/interfaces/clientCourseDto";
import { BreadcrumbsBlock } from "@project/components/src/blocks/BreadcrumbsBlock/breadcrumbsBlock";
import { LocalizedText, useLocalizedText } from "../common/LocalizedText";
import { TitleAndCallBackBlock } from "@project/components/src/blocks/TitleAndCallBackBlock/titleAndCallBackBlock";
import { CatalogInnerAbout } from "../catalogInner/about/catalogInnerAbout";
import { GallerySliderBlock } from "@project/components/src/blocks/GallerySliderBlock/gallerySliderBlock";
import { CatalogCourseInnerAbout } from "../catalogInner/course/catalogCourseInnerAbout";
import { useIntl } from "react-intl";
import cn from "classnames";
import styles from "src/components/catalogInner/course/TabsControlBlock.module.css";
import { RowsPresenter } from "@project/components/src/blocks";
import React, { useState } from "react";
import { siteApi } from "../../clients/siteApiClient";
import Link from "next/link";

const tabs = ["course"]; /* "all course", "housing", "school" */

export const CourseModule = (props: ClientCourseDto) => {
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
            { name: props.title, link: `#` },
          ]}
        />
        <TitleAndCallBackBlock
          logo={props.imageId}
          title={props.title}
          titleColor={"black"}
          titleShadow={false}
          background={null}
          backgroundShadow={"0"}
          textButton={<LocalizedText id={"university_button"} />}
          showButton={false}
          textAbove={`
            ${useLocalizedText({ id: "courses_title1" }, intl)} ${props.title}${useLocalizedText(
            { id: "courses_title2" },
            intl
          )}`}
          school={true}
        />
      </section>
      <div className="flex flex-col w-full">
        <div className={cn(styles.tabs, "flex px-2.5 pb-2.5")}>
          <div className="flex flex-wrap justify-left max-w-screen-xl w-full mx-auto px-5">
            <Link href={{ pathname: `/en/school/1233211321` }}>
              <div>
                <LocalizedText id={"courses_tab_about_school"} />
              </div>
            </Link>
            <Link href={`/en/1233211321/courses` ?? "#"}>
              <div>
                <LocalizedText id={"courses_tab_all_course"} />
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
            <Link href={`#`}>
              <div className={styles.active}>
                <LocalizedText id={"courses_tab_about_school"} />
              </div>
            </Link>
            <Link href={`#`}>
              <div>
                <LocalizedText id={"courses_tab_about_course"} />
              </div>
            </Link>
          </div>
        </div>
        <div className={cn("py-9 px-10")}>
          <CatalogCourseInnerAbout data={props} />
        </div>
      </div>
    </>
  );
};
