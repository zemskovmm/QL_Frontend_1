import {
  LocalizedLinkGroupDto,
  LocalizedLinkLocale,
  LocalizedLinkWithIconDto
} from "src/interfaces/localizedLinkDto";


/*export interface FooterHeadLinks {
  forPartners: LocalizedLinkWithIconDto;
  about: LocalizedLinkWithIconDto;
  blog: LocalizedLinkWithIconDto;
  faq: LocalizedLinkWithIconDto;
}*/

export interface FooterDataDto {
  [key: string]: {
    socials: LocalizedLinkLocale[],
    headLinks: LocalizedLinkWithIconDto[],
    writeUs: string,
    links: LocalizedLinkGroupDto[]
  }

}

