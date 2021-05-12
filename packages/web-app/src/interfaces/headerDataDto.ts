import {LocalizedLinkDto, LocalizedLinkLocale} from "src/interfaces/localizedLinkDto";

export interface HeaderSocialLinksDto {
  vk: LocalizedLinkLocale;
  facebook: LocalizedLinkLocale;
  telegram: LocalizedLinkLocale;
  instagram: LocalizedLinkLocale;
}

export interface HeaderDataDto {
  social: HeaderSocialLinksDto;
  offers: LocalizedLinkLocale[];
  links: LocalizedLinkLocale[];
}
