import { ClientUniversityDto } from "src/interfaces/clientUniversityDto";
import { HousingTable } from "../catalogInner/housing/table/housingTable";

export const HousingModule = (props: ClientUniversityDto) => {
  return (
    <>
      <HousingTable />
    </>
  );
};
