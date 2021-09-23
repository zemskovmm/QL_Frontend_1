import { CatalogInnerAbout } from "src/components/catalogInner/about/catalogInnerAbout";
import { TitleAndCallBackBlock } from "@project/components/src/blocks/TitleAndCallBackBlock/titleAndCallBackBlock";
import { LocalizedText, useLocalizedText } from "../common/LocalizedText";
import { BreadcrumbsBlock } from "@project/components/src/blocks/BreadcrumbsBlock/breadcrumbsBlock";
import { useIntl } from "react-intl";
import { GallerySliderBlock } from "@project/components/src/blocks/GallerySliderBlock/gallerySliderBlock";
import { ClientSchoolDto } from "../../interfaces/clientSchoolDto";
import cn from "classnames";
import styles from "../catalogInner/course/TabsControlBlock.module.css";
import { CatalogSchoolInnerAbout } from "../catalogInner/school/catalogSchoolInnerAbout";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const SchoolModule = (props: ClientSchoolDto) => {
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
          logo={props.logoId}
          title={props.title}
          titleColor={"black"}
          titleShadow={false}
          background={null}
          backgroundShadow={"0%"}
          textButton={""}
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
          <div className="flex flex-wrap justify-left max-w-screen-xl w-full mx-auto px-10">
            <Link href={`#`}>
              <div className={styles.active}>
                <LocalizedText id={"courses_tab_about_school"} />
              </div>
            </Link>
            <Link href={`/${lang}/${props.urls.split("/")[3]}/courses` ?? "#"}>
              <div>
                <LocalizedText id={"courses_tab_all_course"} />
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
            <Link href={`/${lang}/${props.urls.split("/")[3]}/courses` ?? "#"}>
              <div className={styles.active}>
                <LocalizedText id={"courses_tab_all_course"} />
              </div>
            </Link>
          </div>
        </div>
        <div className={cn("py-9 px-10")}>
          <CatalogSchoolInnerAbout data={props} />
        </div>
      </div>
    </>
  );
};
