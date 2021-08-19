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
        url: "/ru/education",
        title: "Обучение",
      },
      {
        title: "Изучение французского",
        url: "/ru/izuchenie-jazyka",
      },
      {
        title: "Адаптация на месте",
        url: "/ru/uslugi-po-adaptatsii",
      },
      {
        title: "Аренда жилья",
        url: "/ru/arenda-zhilja",
      },
      {
        url: "/ru/vizovaja-podderzhka",
        title: "Визовая поддержка",
      },
    ],
    links: [
      {
        url: "/ru/o-kompanii",
        title: "О компании",
      },
      {
        url: "/ru/faq",
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
        url: "/en/education",
      },
      {
        title: "LEARNING THE LANGUAGE",
        url: "/en/izuchenie-jazyka",
      },
      {
        title: "Adaptation services",
        url: "/en/uslugi-po-adaptatsii",
      },
      {
        url: "/en/arenda-zhilja",
        title: "RENTING",
      },
      {
        title: "VISA SUPPORT",
        url: "/en/vizovaja-podderzhka",
      },
    ],
    links: [
      {
        title: "ABOUT US",
        url: "/en/o-kompanii",
      },
      {
        url: "/en/faq",
        title: "FAQ",
      },
    ],
  },
  cn: {
    offers: [
      {
        url: "/cn/education",
        title: "高等教育",
      },
      {
        url: "/cn/uslugi-po-adaptatsii",
        title: "协助办理法国行政手续",
      },
      {
        url: "/cn/izuchenie-jazyka",
        title: "语言学习",
      },
      {
        url: "/cn/arenda-zhilja",
        title: "住房业务",
      },
      {
        url: "/cn/vizovaja-podderzhka",
        title: "签证申请",
      },
    ],
    links: [
      {
        title: " 我们是谁？",
        url: "/cn/o-kompanii",
      },
      {
        title: "问答",
        url: "/cn/faq",
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
        url: "/fr/education",
      },
      {
        title: "Apprentissage de la langue",
        url: "/fr/izuchenie-jazyka",
      },
      {
        title: "Services d'adaptation",
        url: "/fr/uslugi-po-adaptatsii",
      },
      {
        title: "Hébergement",
        url: "/fr/arenda-zhilja",
      },
      {
        url: "/fr/vizovaja-podderzhka",
        title: "Aide à l’obtention du visa",
      },
    ],
    links: [
      {
        url: "/fr/o-kompanii",
        title: "QUI SOMMES-NOUS?",
      },
      {
        title: "FAQ",
        url: "/fr/faq",
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
        url: "/esp/education",
      },
      {
        url: "/esp/izuchenie-jazyka",
        title: "Aprendizaje de francés",
      },
      {
        url: "/esp/uslugi-po-adaptatsii",
        title: "Adaptación",
      },
      {
        title: "Alojamiento",
        url: "/esp/arenda-zhilja",
      },
      {
        title: "Obtención del visado",
        url: "/esp/vizovaja-podderzhka",
      },
    ],
    links: [
      {
        url: "/esp/o-kompanii",
        title: "¿QUIÉNES SOMOS?",
      },
      {
        url: "/esp/faq",
        title: "PREGUNTAS FRECUENTES ",
      },
    ],
  },
};

export default headerData;
