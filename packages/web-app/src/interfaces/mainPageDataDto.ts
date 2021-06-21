import { LocalizedLinkDto } from "src/interfaces/localizedLinkDto";

export interface MainPageDataDto {
  firstScreen: { [key: string]: string };
  firstScreenTabs: { [key: string]: string[] };
  utp: { [key: string]: { items: { titleWord: string; total: string; subtitle: string }[] } };
  offersTitle: { [key: string]: { title: string; subtitle: string } };
  partners: LocalizedLinkDto;
  offers: { [key: string]: { img: string; title: string; url: string }[] };
  assorted: { [key: string]: { title: string; url: string }[] };
}
