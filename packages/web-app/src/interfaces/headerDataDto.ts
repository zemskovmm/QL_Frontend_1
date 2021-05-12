import {LocalizedLinkLocale} from "src/interfaces/localizedLinkDto";

export interface HeaderDataDto {
  social?: LocalizedLinkLocale[];
  offers: LocalizedLinkLocale[];
  links: LocalizedLinkLocale[];
}
