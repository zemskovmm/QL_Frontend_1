import { ClientUniversityDto } from "src/interfaces/clientUniversityDto";
import { CatalogInnerAbout } from "src/components/catalogInner/about/catalogInnerAbout";
import { TitleAndCallBackBlock } from "@project/components/src/blocks/TitleAndCallBackBlock/titleAndCallBackBlock";
import { LocalizedText } from "../common/LocalizedText";
import { BreadcrumbsBlock } from "@project/components/src/blocks/BreadcrumbsBlock/breadcrumbsBlock";
import { useIntl } from "react-intl";

export const UniversityModule = (props: ClientUniversityDto) => {
  const lang = useIntl().locale;
  return (
    <>
      <section style={{ background: "#F9FAFD", maxWidth: "100%" }} className="relative mx-auto">
        <BreadcrumbsBlock
          whiteColor={true}
          items={[
            { name: <LocalizedText id={"breadcrumbs_Main"} />, link: `/${lang}` },
            { name: <LocalizedText id={"breadcrumbs_Catalog"} />, link: `/${lang}/catalog/university` },
            { name: props.title, link: `#` },
          ]}
        />
        <TitleAndCallBackBlock
          logo={props.logoId}
          title={props.title}
          titleColor={"white"}
          titleShadow={true}
          background={props.bannerId}
          textButton={<LocalizedText id={"university_button"} />}
          showButton={false}
          textAbove={""}
        />
      </section>
      <CatalogInnerAbout data={props} />
    </>
  );
};
