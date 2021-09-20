import { ClientCommonTraitLanguageDto } from "./clientCommonTraitLanguageDto";

export interface ClientCatalogFilterOptionDto {
  id: number;
  name: string;
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
  priceFrom: number;
  priceTo: number;
  term: string;
  schoolName: string;
}

export interface CatalogHousingDto {
  galleryList: number[];
  imageId: number | null;
  langlessUrl: string;
  name: string;
  price: number;
  url: string;
  namedTraits: { [key: string]: ClientCommonTraitLanguageDto[] };
}
