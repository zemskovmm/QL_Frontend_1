import { useIntl } from "react-intl";
import { MainPageDataDto } from "src/interfaces/mainPageDataDto";
import { CatalogWidget, ServerCatalogWidget } from "src/components/catalog/catalogWidget";
import { housingCatalogFilters } from "src/hardcoded/housingCatalogFilters";

const MainLangingPage = (props: MainPageDataDto) => {
  const lang = useIntl().locale;
  return (
    <div>
      Main page!
      <br />
      Current locale is {lang}
      <br />
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
      <br />
      <pre>{JSON.stringify(props)}</pre>
    </div>
  );
};

export default MainLangingPage;
