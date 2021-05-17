import { useIntl } from "react-intl";
import { AppGetServerSideProps } from "src/interfaces/AppGetServerSideProps";
import educationPageData from "src/hardcoded/educationPageData";
import { EducationPageDataDto } from "src/interfaces/educationPageDataDto";
import { getUrlsForStaticRoute } from "src/locales/locales";
import { ServerCatalogWidget } from "src/components/catalog/catalogWidget";
import { ClientReviewBlock } from "src/components/education/ClientReviewBlock/clientReviewBlock";
import { ReasonsListBlock } from "src/components/education/ReasonsListBlock/reasonsListBlock";
import { BigCardsListBlock } from "src/components/education/BigCardsListBlock/bigCardsListBlock";
import { SponsorBlock } from "src/components/education/SponsorBlock/sponsorBlock";
import { WideCardsBlock } from "src/components/education/WideCardsBlock/wideCardsBlock";
import { LeftImgRightContentBlock } from "src/components/education/LeftImgRightContentBlock/leftImgRightContentBlock";
import Search from "src/components/common/search/Search";

const EducationLangingPage = (props: EducationPageDataDto) => {
  const lang = useIntl().locale;
  return (
    <div>
      <Search title={educationPageData.firstScreen[lang]}>
        <ServerCatalogWidget filterIds={["city", "instruction-language", "degree"]} entityType="university" />
      </Search>
      <ClientReviewBlock data={educationPageData.allReviews[lang]} />
      <ReasonsListBlock data={educationPageData.reasonsList[lang]} />
      <BigCardsListBlock
        cards={educationPageData.links.map((el) => el[lang])}
        linksButton={educationPageData.linksButton[lang]}
        title={educationPageData.linksTitle[lang]}
      />
      <SponsorBlock title={educationPageData.sponsorTitle[lang]} />
      <WideCardsBlock data={educationPageData.wideCards[lang]} />
      <LeftImgRightContentBlock data={educationPageData.leftImgRightContent[lang]} />
    </div>
  );
};

export default EducationLangingPage;
