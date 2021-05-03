export interface IdResponseDto {
  id: number
}

export interface PageBlockRowDto {
  blocks: PageBlockDto[];
}

export interface PageBlockDto {
  size: number;
  type: string,
  data: any
}

export interface PageDataDto {
  rows: PageBlockRowDto[];
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
