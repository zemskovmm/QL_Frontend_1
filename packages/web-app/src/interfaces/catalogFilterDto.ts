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

export interface CatalogUniversityDto {
  url: string;
  name: string;
  priceFrom: number;
  priceTo: number;
  instructionLanguages: string[];
  degrees: string[];
}
