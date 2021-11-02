import { AdminFormPageLanguageDto } from "./AdminFormPageDto";
import { PageDataDto } from "@project/components/src/interfaces/pageSharedDto";

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
  [key: string]: EditFormDto;
}

export interface EditFormDto {
  form: AdminFormPageLanguageDto;
  schema: FormSchemaFieldDto[];
}

export interface FormSchemaFieldDto {
  id: string;
  displayName: string;
  type: FormSchemaTypeEnum;
  required: boolean;
  hide: boolean;
}

export enum FormSchemaTypeEnum {
  text = "text",
  file = "file",
  fileList = "fileList",
}

export interface GlobalSettingsDto {
  requestForm: RequestFormDto;
  header: HeaderDto;
  footer: FooterDto;
  personalCabinet: PersonalCabinetDto;
}
