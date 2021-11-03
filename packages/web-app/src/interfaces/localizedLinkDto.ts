export interface LocalizedLinkLocale {
  url: string;
  title: string;
}

export interface LocalizedLinkDto {
  [key: string]: LocalizedLinkLocale;
}
