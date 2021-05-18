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
import bgSearch from "src/assets/images/Training.png";

const EducationLangingPage = (props: EducationPageDataDto) => {
  const lang = useIntl().locale;

  return (
    <div>
      <Search
        className="py-9 px-10"
        title={educationPageData[lang].firstScreen}
        background={bgSearch}
        breadcrumbs={educationPageData[lang].breadcrumbs}
      >
        <ServerCatalogWidget filterIds={["city", "instruction-language", "degree"]} entityType="university" />
      </Search>
      <ClientReviewBlock data={educationPageData[lang].allReviews} />
      <ReasonsListBlock data={educationPageData[lang].reasonsList} />
      <BigCardsListBlock
        cards={educationPageData[lang].links}
        linksButton={educationPageData[lang].linksButton}
        title={educationPageData[lang].linksTitle}
      />
      <SponsorBlock title={educationPageData[lang].sponsorTitle} />
      <WideCardsBlock data={educationPageData[lang].wideCards} />
      <LeftImgRightContentBlock data={educationPageData[lang].leftImgRightContent} />
    </div>
  );
};

export default EducationLangingPage;
