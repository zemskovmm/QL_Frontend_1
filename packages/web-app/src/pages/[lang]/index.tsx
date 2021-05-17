import { useIntl } from "react-intl";
//import { MainPageDataDto } from "src/interfaces/mainPageDataDto";
import Search from 'src/components/common/search/Search'
import {CatalogWidget, ServerCatalogWidget} from "../../components/catalog/catalogWidget";
import {housingCatalogFilters} from "../../hardcoded/housingCatalogFilters";
import mainPageData from "src/hardcoded/mainPageData";

const MainLangingPage = () => {
  const lang = useIntl().locale;
  return (
    <Search title={mainPageData.firstScreen[lang]}>
      <div>
        <CatalogWidget
          filters={housingCatalogFilters[lang].filters}
          filterIds={["City", "Placement"]}
          entityType="housing"
        />
      </div>
      <div>
        <ServerCatalogWidget filterIds={["city", "instruction-language", "degree"]} entityType="university" />
      </div>
    </Search>
  );
};

export default MainLangingPage;
