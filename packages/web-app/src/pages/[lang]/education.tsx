import { useIntl } from "react-intl";

import educationPageData from "src/hardcoded/educationPageData";
import { EducationPageDataDto } from "src/interfaces/educationPageDataDto";

import { ClientReviewBlock } from "src/components/education/ClientReviewBlock/clientReviewBlock";
import { ReasonsListBlock } from "src/components/education/ReasonsListBlock/reasonsListBlock";
import { BigCardsListBlock } from "src/components/education/BigCardsListBlock/bigCardsListBlock";
import { SponsorBlock } from "src/components/education/SponsorBlock/sponsorBlock";
import { WideCardsBlock } from "src/components/education/WideCardsBlock/wideCardsBlock";
import { LeftImgRightContentBlock } from "src/components/education/LeftImgRightContentBlock/leftImgRightContentBlock";
import { TitleAndTabsBlock } from "@project/components/src/blocks/TitleAndTabsBlock/titleAndTabsBlock";
import { BreadcrumbsBlock } from "@project/components/src/blocks/BreadcrumbsBlock/breadcrumbsBlock";

const EducationLangingPage = (props: EducationPageDataDto) => {
  const lang = useIntl().locale;

  return (
    <div>
      <section style={{ background: "#F9FAFD", maxWidth: "100%" }} className="relative mx-auto">
        <BreadcrumbsBlock
          whiteColor={false}
          items={[
            { name: educationPageData[lang].breadcrumbs[0].title, link: educationPageData[lang].breadcrumbs[0].url },
            { name: educationPageData[lang].breadcrumbs[1].title, link: educationPageData[lang].breadcrumbs[1].url },
          ]}
        />
        <TitleAndTabsBlock
          title={educationPageData[lang].firstScreen}
          background={2532}
          tabs={[
            {
              type: "university",
              title: educationPageData[lang].breadcrumbs[1].title,
              filters: [{ filter: "city" }, { filter: "instruction-language" }, { filter: "degree" }],
            },
          ]}
        />
      </section>
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
