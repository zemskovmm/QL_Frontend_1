import {PageDataDto} from "@project/components/src/interfaces/pageSharedDto";

export interface IdResponseDto {
  id: number
}

export interface AdminPageLanguageDto {
  pageData: PageDataDto;
  url: string;
  title: string;
}

export interface AdminPageDto {
  languages: { [lang: string]: AdminPageLanguageDto };
}

export interface AdminPageListItemDto {
  id: number;
  urls: { [name: string]: string };
  titles: { [name: string]: string };
}

export interface AdminPageListDto {
  totalPages: number;
  results: AdminPageListItemDto[];

}
