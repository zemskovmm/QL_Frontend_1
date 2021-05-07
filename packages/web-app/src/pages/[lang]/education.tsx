import { useIntl } from "react-intl";
import { AppGetServerSideProps } from "src/interfaces/AppGetServerSideProps";
import mainPageData from "src/hardcoded/mainPageData";
import educationPageData from "src/hardcoded/educationPageData";
import { EducationPageDataDto } from "src/interfaces/educationPageDataDto";
import {getUrlsForStaticRoute} from "src/locales/locales";
import {ServerCatalogWidget} from "src/components/catalog/catalogWidget";

const EducationLangingPage = (props: EducationPageDataDto) => {
  const lang = useIntl().locale;
  return (
    <div>
      Education page!
      <br />
      Current locale is {lang}
      <div className="m-4 border-red-500 border-2">
        <ServerCatalogWidget filterIds={["city", "instruction-language", "degree"]} entityType="university" />
      </div>
      <pre>{JSON.stringify(props)}</pre>
    </div>
  );
};

export default EducationLangingPage;
