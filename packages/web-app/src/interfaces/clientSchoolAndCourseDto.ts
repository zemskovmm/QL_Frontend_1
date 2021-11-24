/*        public Dictionary<string, List<CommonTraitLanguageDto>> NamedTraits { get; set; }
        public List<UniversitySpecialtiesDto> UniversitySpecialties { get; set; }
        public List<UniversityDegreeDto> UniversityDegrees { get; set; }*

 */
import { ClientSchoolDto } from "./clientSchoolDto";
import { CatalogCourseDto } from "./catalogFilterDto";

export interface ClientSchoolAndCourseListDto {
  school: ClientSchoolDto;
  courses: CatalogCourseDto[];
  urls: string;
}
