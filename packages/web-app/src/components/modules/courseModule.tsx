import { ClientCourseDto } from "src/interfaces/clientCourseDto";
import { BreadcrumbsBlock } from "@project/components/src/blocks/BreadcrumbsBlock/breadcrumbsBlock";
import { LocalizedText } from "../common/LocalizedText";
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

const tabs = ["course"]; /* "all course", "housing", "school" */

export const CourseModule = (props: ClientCourseDto) => {
  const lang = useIntl().locale;
  const [activeTab, setActiveTab] = useState(0);
  const effectiveActiveTab = Math.min(activeTab, tabs.length - 1);

  return (
    <>
      <section style={{ background: "#F9FAFD", maxWidth: "100%" }} className="relative mx-auto">
        <BreadcrumbsBlock
          whiteColor={false}
          items={[
            { name: <LocalizedText id={"breadcrumbs_Main"} />, link: `/${lang}` },
            { name: <LocalizedText id={"breadcrumbs_Catalog"} />, link: `/${lang}/catalog/university` },
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
          textAbove={""}
        />
      </section>
      <div className="flex flex-col w-full">
        {/*<div className={cn(styles.tabs, "flex px-2.5 pb-2.5")}>*/}
        {/*  <div className="flex flex-wrap justify-center mx-auto">*/}
        {/*    {tabs.map((tab, ind) => (*/}
        {/*      <div key={ind} className={cn(ind === activeTab ? styles.active : "")} onClick={() => setActiveTab(ind)}>*/}
        {/*        {tab}*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className={cn(styles.tabs, styles.mobiletabs, "p-2.5")}>
          <div className="flex flex-col  mx-auto">
            {tabs.map((tab, ind) => (
              <div key={ind} onClick={() => setActiveTab(ind)}>
                <div className={cn(ind === activeTab ? styles.active : "")}>{tab}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={cn(styles.content, "py-9 px-10")}>
          <CatalogCourseInnerAbout data={props} />
        </div>
      </div>
    </>
  );
};
