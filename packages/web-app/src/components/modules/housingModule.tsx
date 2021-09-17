import { BreadcrumbsBlock } from "@project/components/src/blocks/BreadcrumbsBlock/breadcrumbsBlock";
import { MultiImgBlock } from "src/components/catalogInner/housing/MultiCard/MultiImgBlock";
import { useIntl } from "react-intl";
import { ClientHousingDto } from "../../interfaces/clientHousingDto";
import { LocalizedText } from "../common/LocalizedText";
import { HousingTable } from "../catalogInner/housing/table/housingTable";
import { ApiBaseUrl } from "@project/components/src/api/apiClientBase";
import notIcon from "src/assets/icons/done_outline.svg";
import React from "react";

export const HousingModule = (props: ClientHousingDto) => {
  const lang = useIntl().locale;
  return (
    <div className={`max-w-screen-xl mx-auto`}>
      <div className={`px-3 lg:px-16`}>
        <BreadcrumbsBlock
          whiteColor={false}
          relative={true}
          items={[
            { name: <LocalizedText id={"breadcrumbs_Main"} />, link: `/${lang}` },
            { name: <LocalizedText id={"breadcrumbs_Catalog"} />, link: `/${lang}/catalog/housing` },
            { name: props.title, link: `#` },
          ]}
        />
      </div>
      <div className={`mb-16 px-0 lg:px-16`}>
        <MultiImgBlock
          img={props.galleryList}
          text={``}
          title={props.title}
          city={props.traits.namedTraits["city"][0].name}
        />
      </div>
      <div className={`mb-6 flex flex-wrap px-3 lg:px-16`}>
        {props.traits.namedTraits["housing-accommodation"].map((el, index) => (
          <div className={`flex items-center mr-40 w-40 mb-10`} key={el.name + index}>
            <div className={`p-2 w-10 h-10 rounded-full mr-10`} style={{ backgroundColor: "#EFF3FA" }}>
              <img src={el.iconId ? `${ApiBaseUrl}/api/media/scaled/${el.iconId}` : notIcon} alt="" />
            </div>
            <span style={{ color: "#373737" }} className={`text-sm`}>
              {el.name}
            </span>
          </div>
        ))}
      </div>
      <div className={`flex flex-col px-3 lg:px-16`}>
        <h3 className={`mb-10`}>
          <LocalizedText id={"housing_accommodationTypes_title"} />
        </h3>
        <HousingTable data={props.housingAccommodationTypes} />
      </div>
    </div>
  );
};
