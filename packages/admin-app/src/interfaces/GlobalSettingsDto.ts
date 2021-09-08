import { EditorState } from "draft-js";

export interface SocialLinkDto {
  icon: string;
  link: string;
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
  requestFormPostScriptText: string;
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
  footerContactText: string;
}

export interface GlobalSettingsDto {
  requestForm: RequestFormDto;
  header: HeaderDto;
  footer: FooterDto;
}
