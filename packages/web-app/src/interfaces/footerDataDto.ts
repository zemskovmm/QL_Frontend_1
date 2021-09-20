import { LocalizedLinkGroupDto, LocalizedLinkLocale, LocalizedLinkWithIconDto } from "src/interfaces/localizedLinkDto";

export interface FooterDataDto {
  [key: string]: {
    socials: LocalizedLinkLocale[];
    headLinks: LocalizedLinkWithIconDto[];
    writeUs: string;
    links: LocalizedLinkGroupDto[];
  };
}
