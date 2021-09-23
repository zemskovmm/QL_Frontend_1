/*        public Dictionary<string, List<CommonTraitLanguageDto>> NamedTraits { get; set; }
        public List<UniversitySpecialtiesDto> UniversitySpecialties { get; set; }
        public List<UniversityDegreeDto> UniversityDegrees { get; set; }*

 */
import { ClientCommonTraitLanguageDto } from "src/interfaces/clientCommonTraitLanguageDto";

export interface ClientSchoolTraitsDto {
  namedTraits: { [key: string]: ClientCommonTraitLanguageDto[] };
}

export interface ClientSchoolDto {
  logoId: number | null;
  title: string;
  descriptionHtml: string;
  foundationYear: string;
  traits: ClientSchoolTraitsDto;
  metadata: [] | null;
  imageId: number | null;
  urls: string;
}
