import { HeaderDataDto } from "src/interfaces/headerDataDto";

const headerData: { [key: string]: HeaderDataDto } = {
  ru: {
    social: [
      {
        url: "https://vk.com/quartierlatinru",
        title: "vk",
      },
      {
        url: "https://www.facebook.com/QuartierLatinRU/",
        title: "facebook",
      },
      {
        url: "https://t.me/quartierlatinru",
        title: "telegram",
      },
      {
        title: "instagram",
        url: "https://www.instagram.com/quartierlatinru/",
      },
    ],
    offers: [
      {
        url: "/ru/training",
        title: "Обучение",
      },
      {
        title: "Изучение французского",
        url: "https://quartier-latin.com/izuchenie-jazyka",
      },
      {
        title: "Адаптация на месте",
        url: "https://quartier-latin.com/uslugi-po-adaptatsii",
      },
      {
        title: "Аренда жилья",
        url: "https://quartier-latin.com/arenda-zhilja",
      },
      {
        url: "https://quartier-latin.com/vizovaja-podderzhka",
        title: "Визовая поддержка",
      },
    ],
    links: [
      {
        url: "https://quartier-latin.com/o-kompanii",
        title: "О компании",
      },
      {
        url: "https://quartier-latin.com/blog",
        title: "Блог",
      },
      {
        url: "https://quartier-latin.com/faq",
        title: "FAQ",
      },
    ],
  },
  en: {
    social: [
      {
        title: "facebook",
        url: "https://www.facebook.com/QuartierLatinEN/",
      },
      {
        title: "instagram",
        url: "https://www.instagram.com/quartierlatinen/",
      },
      {
        title: "WhatsApp",
        url: "https://api.whatsapp.com/send/?phone=33626638627&text&app_absent=0",
      },
    ],
    offers: [
      {
        title: "EDUCATION",
        url: "/en/training",
      },
      {
        title: "LEARNING THE LANGUAGE",
        url: "https://quartier-latin.com/en/izuchenie-jazyka",
      },
      {
        title: "Adaptation services",
        url: "https://quartier-latin.com/en/uslugi-po-adaptatsii",
      },
      {
        url: "https://quartier-latin.com/en/arenda-zhilja",
        title: "RENTING",
      },
      {
        title: "VISA SUPPORT",
        url: "https://quartier-latin.com/en/vizovaja-podderzhka",
      },
    ],
    links: [
      {
        title: "ABOUT US",
        url: "https://quartier-latin.com/en/o-kompanii",
      },
      {
        url: "https://quartier-latin.com/en/blog",
        title: "BLOG",
      },
      {
        url: "https://quartier-latin.com/en/faq",
        title: "FAQ",
      },
    ],
  },
  cn: {
    offers: [
      {
        url: "/cn/training",
        title: "高等教育",
      },
      {
        url: "https://quartier-latin.com/cn/uslugi-po-adaptatsii",
        title: "协助办理法国行政手续",
      },
      {
        url: "https://quartier-latin.com/cn/izuchenie-jazyka",
        title: "语言学习",
      },
      {
        url: "https://quartier-latin.com/cn/arenda-zhilja",
        title: "住房业务",
      },
      {
        url: "https://quartier-latin.com/cn/vizovaja-podderzhka",
        title: "签证申请",
      },
    ],
    links: [
      {
        title: " 我们是谁？",
        url: "https://quartier-latin.com/cn/o-kompanii",
      },
      {
        title: "博客",
        url: "https://quartier-latin.com/cn/blog",
      },
      {
        title: "问答",
        url: "https://quartier-latin.com/cn/faq",
      },
    ],
  },
  fr: {
    social: [
      {
        title: "facebook",
        url: "https://www.facebook.com/QuartierLatinFR/",
      },
      {
        title: "instagram",
        url: "https://www.instagram.com/quartierlatinfr/",
      },
      {
        title: "WhatsApp",
        url: "https://api.whatsapp.com/send/?phone=33626638627&text&app_absent=0",
      },
    ],
    offers: [
      {
        title: "Enseignement",
        url: "/fr/training",
      },
      {
        title: "Apprentissage de la langue",
        url: "https://quartier-latin.com/fr/izuchenie-jazyka",
      },
      {
        title: "Services d'adaptation",
        url: "https://quartier-latin.com/fr/uslugi-po-adaptatsii",
      },
      {
        title: "Hébergement",
        url: "https://quartier-latin.com/fr/arenda-zhilja",
      },
      {
        url: "https://quartier-latin.com/fr/vizovaja-podderzhka",
        title: "Aide à l’obtention du visa",
      },
    ],
    links: [
      {
        url: "https://quartier-latin.com/fr/o-kompanii",
        title: "QUI SOMMES-NOUS?",
      },
      {
        url: "https://quartier-latin.com/fr/blog",
        title: "BLOG",
      },
      {
        title: "FAQ",
        url: "https://quartier-latin.com/fr/faq",
      },
    ],
  },
  esp: {
    social: [
      {
        title: "facebook",
        url: "https://www.facebook.com/QuartierLatinEN/",
      },
      {
        title: "instagram",
        url: "https://www.instagram.com/quartierlatinesp/",
      },
      {
        url: "",
        title: "",
      },
      {
        title: "WhatsApp",
        url: "https://api.whatsapp.com/send/?phone=33626638627&text&app_absent=0",
      },
    ],
    offers: [
      {
        title: "Estudios",
        url: "/esp/training",
      },
      {
        url: "https://quartier-latin.com/en/izuchenie-jazyka",
        title: "Aprendizaje de francés",
      },
      {
        url: "https://quartier-latin.com/en/uslugi-po-adaptatsii",
        title: "Adaptación",
      },
      {
        title: "Alojamiento",
        url: "https://quartier-latin.com/en/arenda-zhilja",
      },
      {
        title: "Obtención del visado",
        url: "https://quartier-latin.com/en/vizovaja-podderzhka",
      },
    ],
    links: [
      {
        url: "https://quartier-latin.com/en/o-kompanii",
        title: "¿QUIÉNES SOMOS?",
      },
      {
        url: "https://quartier-latin.com/en/blog",
        title: "BLOG ",
      },
      {
        url: "https://quartier-latin.com/en/faq",
        title: "PREGUNTAS FRECUENTES ",
      },
    ],
  },
};

export default headerData;
