import { ClientPageDto } from "src/interfaces/clientPageDto";
import { ClientUniversityDto } from "src/interfaces/clientUniversityDto";

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

export type ClientRouteDto = RouteDataBase & (RoutedAsPage | RoutedAsUniversity);
