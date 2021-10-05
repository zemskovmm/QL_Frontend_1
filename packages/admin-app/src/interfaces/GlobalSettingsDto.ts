import { AdminFormPageDto } from "./AdminFormPageDto";

export interface SocialLinkDto {
  icon: string;
  link: string;
}

export interface ContactLinkDto {
  icon: string;
  link: string;
  text: string;
}

export interface LinkDto {
  name: string;
  link: string;
}

export interface LinkListDto {
  title: string;
  url: string;
  list: LinkDto[];
}

export interface RequestFormDto {
  requestFormTitle: string;
  requestFormLeftTitle: string;
  requestFormRightTitle: string;
  requestFormPostText: string;
}

export interface HeaderDto {
  headerTopLink: LinkDto[];
  headerSocialLink: SocialLinkDto[];
  headerBottomLink: LinkDto[];
}

export interface FooterDto {
  footerTopLink: LinkDto[];
  footerLinkList: LinkListDto[];
  footerSocialLink: SocialLinkDto[];
  footerContactLinkList: ContactLinkDto[];
}

export interface PersonalCabinetDto {
  [key: string]: AdminFormPageDto;
}

export interface GlobalSettingsDto {
  requestForm: RequestFormDto;
  header: HeaderDto;
  footer: FooterDto;
  personalCabinet: PersonalCabinetDto;
}