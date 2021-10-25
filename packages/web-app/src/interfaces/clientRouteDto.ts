import { ClientPageDto } from "src/interfaces/clientPageDto";
import { ClientUniversityDto } from "src/interfaces/clientUniversityDto";
import { ClientHousingDto } from "./clientHousingDto";
import { ClientSchoolAndCourseDto } from "./clientCourseDto";
import { ClientSchoolDto } from "./clientSchoolDto";
import { ClientSchoolAndCourseListDto } from "./clientSchoolAndCourseDto";

interface RouteDataBase {
  urls: { [key: string]: string };
}

interface RoutedAsPage {
  moduleName: "page";
  module: {
    page: ClientPageDto;
  };
}

interface RoutedAsSchool {
  moduleName: "school";
  module: ClientSchoolDto;
}

interface RoutedAsUniversity {
  moduleName: "university";
  module: ClientUniversityDto;
}

interface RoutedAsCourse {
  moduleName: "schoolAndCourse";
  module: ClientSchoolAndCourseDto;
}

interface RoutedAsHousing {
  moduleName: "housing";
  module: ClientHousingDto;
}

interface RoutedAsSchoolAndCourse {
  moduleName: "schoolAndCourseList";
  module: ClientSchoolAndCourseListDto;
}

export type ClientRouteDto = RouteDataBase &
  (RoutedAsPage | RoutedAsUniversity | RoutedAsHousing | RoutedAsCourse | RoutedAsSchool | RoutedAsSchoolAndCourse);
