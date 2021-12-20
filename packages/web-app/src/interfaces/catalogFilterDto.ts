import { ClientCommonTraitLanguageDto } from "./clientCommonTraitLanguageDto";
import { LocationDto } from "./clientHousingDto";

export interface ClientCatalogFilterOptionItemsDto {
  id: number;
  name: string;
}

export interface ClientCatalogFilterOptionDto {
  id: number;
  name: string;
  items: null | ClientCatalogFilterOptionItemsDto[];
}

export interface CatalogFilterDto {
  identifier: string;
  name: string;
  options: ClientCatalogFilterOptionDto[];
}

export interface CatalogResponseDto<T> {
  totalPages: number;
  totalItems: number;
  items: T[];
}

export interface CatalogItemDto {
  url: string;
  name: string;
  logoId: number;
  priceFrom: number;
  priceTo: number;
}

export interface CatalogUniversityDto {
  url: string;
  name: string;
  logoId: number;
  priceFrom: number;
  priceTo: number;
  instructionLanguages: string[];
  degrees: string[];
}

export interface CatalogCourseDto {
  url: string;
  name: string;
  logoId: number;
  price: number;
  term: string;
  schoolName: string;
  schoolImageId: number | null;
  courseImageId: number | null;
  imageId: number | null;
  traits: {
    namedTraits: { [key: string]: ClientCommonTraitLanguageDto[] };
  };
  namedTraits: { [key: string]: ClientCommonTraitLanguageDto[] };
}

export interface CatalogHousingDto {
  galleryList: number[];
  imageId: number | null;
  htmlDescription: string;
  location: LocationDto;
  langlessUrl: string;
  name: string;
  price: number;
  url: string;
  namedTraits: { [key: string]: ClientCommonTraitLanguageDto[] };
}
