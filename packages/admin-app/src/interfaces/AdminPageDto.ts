import { PageDataDto } from "@project/components/src/interfaces/pageSharedDto";
import { observable } from "mobx";

export interface IdResponseDto {
  id: number;
}

export interface AdminPageLanguageDto {
  pageData: PageDataDto;
  url: string;
  title: string;
  previewImageId?: number;
  smallPreviewImageId?: number;
  widePreviewImageId?: number;
}

export interface AdminPageDto {
  languages: { [lang: string]: AdminPageLanguageDto };
  pageType: number;
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
