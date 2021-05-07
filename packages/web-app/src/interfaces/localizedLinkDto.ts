export interface LocalizedLinkLocale {
  url: string;
  title: string;
}

export interface LocalizedLinkDto {
  [key: string]: LocalizedLinkLocale;
}

export interface LocalizedLinkWithIconDto {
  link: LocalizedLinkDto;
  icon: string;
}

export interface LocalizedLinkGroupDto {
  group: LocalizedLinkDto;
  items: LocalizedLinkDto[];
}
