import { PageDataDto } from "@project/components/src/interfaces/pageSharedDto";

export interface IdResponseDto {
  id: number;
}

export interface AdminPageLanguageDto {
  pageData: PageDataDto;
  url: string;
  title: string;
}

export interface AdminPageDto {
  languages: { [lang: string]: AdminPageLanguageDto };
}

export interface AdminTraitListItemDto {
  id: number;
  names: { [name: string]: string };
  identifier: string;
}

export interface AdminTraitItemDto {
  traitTypeId: number;
  names: { [name: string]: string };
  iconId: number | null;
  order: number | null;
  parentId: number | null;
}
