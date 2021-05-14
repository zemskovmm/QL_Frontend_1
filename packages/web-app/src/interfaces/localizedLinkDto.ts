export interface LocalizedLinkLocale {
  url: string;
  title: string;
}

export interface LocalizedLinkDto {
  [key: string]: LocalizedLinkLocale;
}

export interface LocalizedLinkWithIconDto {
  link: LocalizedLinkLocale;
  icon: string;
}

export interface LocalizedLinkGroupDto {
  group: LocalizedLinkLocale;
  items: LocalizedLinkLocale[];
}
