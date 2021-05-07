import { LocalizedLinkDto, LocalizedLinkGroupDto, LocalizedLinkWithIconDto } from "src/interfaces/localizedLinkDto";

export interface FooterSocialLinksDto {
  youtube: LocalizedLinkDto;
  googlePlus: LocalizedLinkDto;
  linkedIn: LocalizedLinkDto;
  instagram: LocalizedLinkDto;
  telegram: LocalizedLinkDto;
  vk: LocalizedLinkDto;
  facebook: LocalizedLinkDto;
  twitter: LocalizedLinkDto;
}

export interface FooterHeadLinks {
  forPartners: LocalizedLinkWithIconDto;
  about: LocalizedLinkWithIconDto;
  blog: LocalizedLinkWithIconDto;
  faq: LocalizedLinkWithIconDto;
}

export interface FooterDataDto {
  socials: FooterSocialLinksDto;
  headLinks: FooterHeadLinks;
  writeUs: { [key: string]: string };
  links: LocalizedLinkGroupDto[];
}
