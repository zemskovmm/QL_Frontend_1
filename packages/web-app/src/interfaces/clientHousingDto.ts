import { ClientCommonTraitLanguageDto } from "src/interfaces/clientCommonTraitLanguageDto";

export interface ClientHousingDto {
  housingAccommodationTypes: ClientHousingAccommodationTypesDto[];
  galleryList: number[];
  htmlDescription: string;
  location: LocationDto;
  imageId: number | null;
  metadata: any | null;
  price: number;
  title: string;
  traits: ClientHousingTraitsDto;
}

export interface LocationDto {
  address: string;
  lat: number;
  lng: number;
}

export interface ClientHousingTraitsDto {
  namedTraits: { [key: string]: ClientCommonTraitLanguageDto[] };
}

export interface ClientHousingAccommodationTypesDto {
  name: string;
  price: number;
  residents: string;
  square: string;
  traits: ClientHousingTraitsDto;
}
