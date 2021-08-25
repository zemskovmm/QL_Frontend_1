import { ClientUniversityDto } from "src/interfaces/clientUniversityDto";
import { BreadcrumbsBlock } from "@project/components/src/blocks/BreadcrumbsBlock/breadcrumbsBlock";
import { useIntl } from "react-intl";
import { HousingTable } from "../catalogInner/housing/table/housingTable";

export const HousingModule = (props: ClientUniversityDto) => {
  const lang = useIntl().locale;
  return (
    <>
      <HousingTable />
    </>
  );
};
