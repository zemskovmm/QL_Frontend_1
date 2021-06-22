/*        public Dictionary<string, List<CommonTraitLanguageDto>> NamedTraits { get; set; }
        public List<UniversitySpecialtiesDto> UniversitySpecialties { get; set; }
        public List<UniversityDegreeDto> UniversityDegrees { get; set; }*

 */
import { ClientCommonTraitLanguageDto } from "src/interfaces/clientCommonTraitLanguageDto";

export interface ClientUniversityDegreeDto {
  name: string;
  costFrom: string;
  costTo: string;
}

export interface ClientUniversityTraitsDto {
  namedTraits: { [key: string]: ClientCommonTraitLanguageDto[] };
  universitySpecialties: { name: string }[];
  universityDegrees: ClientUniversityDegreeDto[];
}

export interface ClientUniversityDto {
  logoId: number | null;
  title: string;
  descriptionHtml: string;
  foundationYear: string;
  bannerId: number;
  galleryList: number[];
  traits: ClientUniversityTraitsDto;
}
