import { useIntl } from "react-intl";
//import { MainPageDataDto } from "src/interfaces/mainPageDataDto";
import Search from "src/components/common/search/Search";
import { CatalogWidget, ServerCatalogWidget } from "../../components/catalog/catalogWidget";
import { housingCatalogFilters } from "src/hardcoded/housingCatalogFilters";
import mainPageData from "src/hardcoded/mainPageData";
import Tabs from "src/components/ui/Tabs/Tabs";
import { CirclesBlock } from "src/components/main/circles/circles";
import Partners from "src/components/main/Partners/Partners";
import Offers from "src/components/main/Offers/Offers";
import bgSearch from "src/assets/images/search.png";

const MainLangingPage = () => {
  const lang = useIntl().locale;
  const circles = mainPageData.utp[lang].items.map(({ titleWord, total, subtitle }) => ({
    header: titleWord,
    number: total,
    text: subtitle,
  }));
  return (
    <main>
      <Search title={mainPageData.firstScreen[lang]} background={bgSearch}>
        <Tabs
          titles={["Проживание", "Обучение"]}
          components={[
            <CatalogWidget
              filters={housingCatalogFilters[lang].filters}
              filterIds={["City", "Placement"]}
              entityType="housing"
            />,
            <ServerCatalogWidget filterIds={["city", "instruction-language", "degree"]} entityType="university" />,
          ]}
        />
      </Search>
      <CirclesBlock elements={circles} />
      <Offers
        title={mainPageData.offersTitle[lang].title}
        subtitle={mainPageData.offersTitle[lang].subtitle}
        offers={mainPageData.offers[lang]}
      />
      <Partners title={mainPageData.partners[lang].title} url={mainPageData.partners[lang].url} />
    </main>
  );
};

export default MainLangingPage;
