import { useIntl } from "react-intl";
import { MainPageDataDto } from "src/interfaces/mainPageDataDto";
import { CatalogWidget, ServerCatalogWidget } from "src/components/catalog/catalogWidget";
import { housingCatalogFilters } from "src/hardcoded/housingCatalogFilters";
import mainPageData from "src/hardcoded/mainPageData";
import {CirclesBlock} from "src/components/main/circles/circles"
import Partners from "src/components/main/Partners/Partners";
import Offers from "src/components/main/Offers/Offers";

const MainLangingPage = (props: MainPageDataDto) => {
  const lang = useIntl().locale;
  const circles = mainPageData.utp[lang].items.map(({titleWord, total, subtitle})=>({header:titleWord,number:total,text:subtitle}))
  return (
    <main>
      <section>
        <div className="m-4 border-blue-500 border-2">
          <CatalogWidget
            filters={housingCatalogFilters[lang].filters}
            filterIds={["City", "Placement"]}
            entityType="housing"
          />
        </div>
        <div className="m-4 border-red-500 border-2">
          <ServerCatalogWidget filterIds={["city", "instruction-language", "degree"]} entityType="university" />
        </div>
      </section>
      <CirclesBlock elements={circles} />
      <Offers
        title={mainPageData.offersTitle[lang].title}
        subtitle={mainPageData.offersTitle[lang].subtitle}
        offers={mainPageData.offers[lang]}
      />
      <Partners title={mainPageData.partners[lang].title} url={mainPageData.partners[lang].url}/>
    </main>
  );
};

export default MainLangingPage;
