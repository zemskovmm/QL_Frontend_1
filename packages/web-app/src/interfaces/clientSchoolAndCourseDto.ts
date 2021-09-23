/*        public Dictionary<string, List<CommonTraitLanguageDto>> NamedTraits { get; set; }
        public List<UniversitySpecialtiesDto> UniversitySpecialties { get; set; }
        public List<UniversityDegreeDto> UniversityDegrees { get; set; }*

 */
import { ClientCommonTraitLanguageDto } from "src/interfaces/clientCommonTraitLanguageDto";
import { ClientSchoolDto } from "./clientSchoolDto";
import { ClientCourseDto } from "./clientCourseDto";
import { CatalogCourseDto } from "./catalogFilterDto";

export interface ClientSchoolTraitsDto {
  namedTraits: { [key: string]: ClientCommonTraitLanguageDto[] };
}

export interface ClientSchoolAndCourseDto {
  school: ClientSchoolDto;
  courses: CatalogCourseDto[];
  urls: string;
}
