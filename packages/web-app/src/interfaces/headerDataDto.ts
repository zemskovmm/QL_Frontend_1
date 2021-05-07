import { LocalizedLinkDto } from "src/interfaces/localizedLinkDto";

export interface HeaderSocialLinksDto {
  vk: LocalizedLinkDto;
  facebook: LocalizedLinkDto;
  telegram: LocalizedLinkDto;
  instagram: LocalizedLinkDto;
}

export interface HeaderDataDto {
  social: HeaderSocialLinksDto;
  offers: LocalizedLinkDto[];
  links: LocalizedLinkDto[];
}
