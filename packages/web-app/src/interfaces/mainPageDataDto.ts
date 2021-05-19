import { LocalizedLinkDto } from "src/interfaces/localizedLinkDto";

export interface MainPageDataDto {
  firstScreen: { [key: string]: string };
  firstScreenTabs: { [key: string]: string[]},
  news: { [key: string] : { link: string; img: string; description: string; date: string }[]};
  utp: { [key: string]: { items: { titleWord: string; total: string; subtitle: string }[] } };
  offersTitle: { [key: string]: { title: string; subtitle: string } };
  partners: LocalizedLinkDto;
  offers: { [key: string]: { img: string; title: string; url: string }[] };
  articles: LocalizedLinkDto;
  assorted:  { [key: string]: { title: string; url: string }[] };
}
