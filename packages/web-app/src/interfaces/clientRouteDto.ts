import { ClientPageDto } from "src/interfaces/clientPageDto";
import { ClientUniversityDto } from "src/interfaces/clientUniversityDto";
import { ClientHousingDto } from "./clientHousingDto";

interface RouteDataBase {
  urls: { [key: string]: string };
}

interface RoutedAsPage {
  moduleName: "page";
  module: {
    page: ClientPageDto;
  };
}

interface RoutedAsUniversity {
  moduleName: "university";
  module: ClientUniversityDto;
}

interface RoutedAsHousing {
  moduleName: "housing";
  module: ClientHousingDto;
}

export type ClientRouteDto = RouteDataBase & (RoutedAsPage | RoutedAsUniversity | RoutedAsHousing);
