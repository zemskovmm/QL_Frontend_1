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

export interface AdminDirectoryListItemDto {
  id: number;
  title: string;
}

export interface AdminDirectoryListDto {
  title: string | null;
  partnerId: number | null;
  directories: AdminDirectoryListItemDto[];
  media: AdminDirectoryListItemDto[];
  id: string;
}
