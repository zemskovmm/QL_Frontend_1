import { useIntl } from "react-intl";
//import { MainPageDataDto } from "src/interfaces/mainPageDataDto";
import Search from 'src/components/common/search/Search'
import {CatalogWidget, ServerCatalogWidget} from "../../components/catalog/catalogWidget";
import {housingCatalogFilters} from "src/hardcoded/housingCatalogFilters";
import mainPageData from "src/hardcoded/mainPageData";
import Tabs from "src/components/ui/Tabs/Tabs";

const MainLangingPage = () => {
  const lang = useIntl().locale;
  return (
    <Search title={mainPageData.firstScreen[lang]}>

    <Tabs
      titles={['Проживание','Обучение']}
      components={[
        <CatalogWidget
          filters={housingCatalogFilters[lang].filters}
          filterIds={["City", "Placement"]}
          entityType="housing"
        />,
        <ServerCatalogWidget filterIds={["city", "instruction-language", "degree"]} entityType="university" />
      ]}
    />
    </Search>
  );
};

export default MainLangingPage;
