export interface EducationPageDataDto {
  breadcrumbs: { [key: string]: { name: string; link: string }[] };
  firstScreen: { [key: string]: string };
  links: { [key: string]: { img: string; title: string; url: string } }[];
  linksButton: { [key: string]: { link: string; name: string; description: string } };
  linksTitle: { [key: string]: string };
  sponsorTitle: { [key: string]: string };
  reasonsList: { [key: string]: { title: string; items: { img: string; title: string; subtitle: string }[] } };
  allReviews: { [key: string]: { img: string; text: string; button: { title: string; url: string } } };
  wideCards: {
    [key: string]: {
      title: string;
      subtitle: string;
      items: { img: string; name: string }[];
      button: { link: string; name: string; description: string };
    };
  };
  leftImgRightContent: { [key: string]: { img: string; text: string } };
}
