/*        public Dictionary<string, List<CommonTraitLanguageDto>> NamedTraits { get; set; }
        public List<UniversitySpecialtiesDto> UniversitySpecialties { get; set; }
        public List<UniversityDegreeDto> UniversityDegrees { get; set; }*

 */
import { ClientCommonTraitLanguageDto } from "src/interfaces/clientCommonTraitLanguageDto";
import { ClientSchoolDto } from "./clientSchoolDto";

export interface ClientTraitDto {
  iconId: null | number;
  id: number;
  identifier: number | null;
  name: string;
}

export interface ClientCourseTraitDto {
  [key: string]: ClientTraitDto[];
}

export interface ClientCourseDto {
  descriptionHtml: string;
  imageId: number | null;
  metadata: null;
  schoolId: number;
  title: string;
  traits: { namedTraits: ClientCourseTraitDto };
}

export interface ClientSchoolAndCourseDto {
  school: ClientSchoolDto;
  course: ClientCourseDto;
  title: string;
  urls: string;
}
