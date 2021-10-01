import { PageDataDto } from "@project/components/src/interfaces/pageSharedDto";

export interface IdResponseDto {
  id: number;
}

export interface AdminFormPageLanguageDto {
  pageData: PageDataDto;
}

export interface AdminFormPageDto {
  languages: { [lang: string]: AdminFormPageLanguageDto };
}
