import { Catalog } from "src/components/catalog/catalog";
import { CatalogCourseDto } from "src/interfaces/catalogFilterDto";
import style from "src/components/catalog/style/catalogView.module.css";
import { LocalizedText, useLocalizedText } from "src/components/common/LocalizedText";
import { BreadcrumbsBlock } from "@project/components/src/blocks/BreadcrumbsBlock/breadcrumbsBlock";
import { useIntl } from "react-intl";

const CourseCatalogPage = () => {
  const lang = useIntl().locale;
  const intl = useIntl();
  return (
    <div style={{ backgroundColor: "#f9fafd" }}>
      <div className={style.catalogWrapper}>
        <div className={`mr-auto mb-7 ` + style.catalog__bread}>
          <BreadcrumbsBlock
            items={[
              {
                name: <LocalizedText id={"breadcrumbs_Main"} />,
                link: `/${lang}`,
              },
              {
                name: <LocalizedText id={"breadcrumbs_courses"} />,
                link: `/${lang}/catalog/course`,
              },
            ]}
          />
        </div>
        <Catalog<CatalogCourseDto>
          title={useLocalizedText({ id: "catalogCourses_title" }, intl)}
          searchTitle={useLocalizedText({ id: "catalogEducation_search_result" }, intl)}
          elementRendererName={"course"}
          apiElementName="course"
        />
      </div>
    </div>
  );
};

export default CourseCatalogPage;
