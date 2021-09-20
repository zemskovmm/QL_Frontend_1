import { ClientCommonTraitLanguageDto } from "src/interfaces/clientCommonTraitLanguageDto";

export interface ClientHousingDto {
  housingAccommodationTypes: ClientHousingAccommodationTypesDto[];
  galleryList: number[];
  htmlDescription: string;
  imageId: number | null;
  metadata: any | null;
  price: number;
  title: string;
  traits: ClientHousingTraitsDto;
}

export interface ClientHousingTraitsDto {
  namedTraits: { [key: string]: ClientCommonTraitLanguageDto[] };
}

export interface ClientHousingAccommodationTypesDto {
  price: number;
  residents: string;
  square: string;
  traits: ClientHousingTraitsDto;
}
