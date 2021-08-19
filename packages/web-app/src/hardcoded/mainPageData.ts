import { MainPageDataDto } from "src/interfaces/mainPageDataDto";

const mainPageData: MainPageDataDto = {
  firstScreen: {
    ru: "Получите профессиональное образование или пройдите языковые курсы во Франции",

    cn: "在法國接受高等教育或學習法語",

    fr: "Faites vos études supérieures ou apprenez le français en France",
    esp: "Obtenga una educación superior o tome un curso de idiomas en Francia",
    en: "Get a higher education or take a language course in France",
  },
  firstScreenTabs: {
    ru: ["Обучение", "Проживание"],
    cn: ["高等教育", "住宿"],
    fr: ["Enseignement", "Hébergement"],
    esp: ["Estudios", "Alojamiento"],
    en: ["Education", "Accommodation"],
  },
  utp: {
    ru: {
      items: [
        {
          titleWord: "с",
          total: "2012",
          subtitle: "Года реализуем ваши мечты о Франции",
        },
        {
          titleWord: "более",
          total: "200",
          subtitle: "Учебных заведений - партнёров",
        },
        {
          titleWord: "более",
          total: "300",
          subtitle: "Студенческих резиденций по всей Франции",
        },
        {
          titleWord: "более",
          total: "1 500",
          subtitle: "Встреч на кофе в нашем уютном офисе",
        },
      ],
    },
    cn: {
      items: [
        {
          titleWord: "自",
          total: "2012",
          subtitle: "年以來，我們一直在實現您的法國夢",
        },
        {
          titleWord: "巴黎及該地區超過",
          total: "200",
          subtitle: "所私立合作學校",
        },
        {
          titleWord: "超过",
          total: "300",
          subtitle: "家学生公寓资源",
        },
        {
          titleWord: "超过",
          total: "1 500",
          subtitle: "人次留学生已经使用过我们的服务",
        },
      ],
    },
    fr: {
      items: [
        {
          titleWord: "depuis",
          total: "2012",
          subtitle: "Nous réalisons vos rêves de France",
        },
        {
          titleWord: "PLUS DE",
          total: "200",
          subtitle: "Ecoles privées partenaires à Paris et en région",
        },
        {
          titleWord: "PLUS DE",
          total: "300",
          subtitle: "Résidences étudiantes à travers la France",
        },
        {
          titleWord: "PLUS DE",
          total: "1 500",
          subtitle: "Cafés partagés dans notre confortable agence",
        },
      ],
    },
    esp: {
      items: [
        {
          titleWord: "desde",
          total: "2012",
          subtitle: "Hemos realizado sus sueños de Francia",
        },
        {
          titleWord: "MÁS DE",
          total: "200",
          subtitle: "Escuelas de negocios asociadas en París y en otras regiones",
        },
        {
          titleWord: "MÁS DE",
          total: "300",
          subtitle: "Residencias de estudiantes en toda Francia",
        },
        {
          titleWord: "MÁS DE",
          total: "1 500",
          subtitle: "Cafés con nuestros clientes en nuestra acogedora oficina",
        },
      ],
    },
    en: {
      items: [
        {
          titleWord: "since",
          total: "2012",
          subtitle: "We have been fulfilling your dreams of France",
        },
        {
          titleWord: "MORE THAN",
          total: "200",
          subtitle: "Partner business schools in Paris and region",
        },
        {
          titleWord: "MORE THAN",
          total: "300",
          subtitle: "Student residences throughout France",
        },
        {
          titleWord: "MORE THAN",
          total: "1 500",
          subtitle: "Cups of coffee shared in our cosy agency",
        },
      ],
    },
  },
  partners: {
    ru: {
      title: "Наши партнёры",
      url: "/ru/partners",
    },
    cn: {
      url: "/en/partners",
      title: "我們的合作夥伴",
    },
    fr: {
      title: "Nos partenaires",
      url: "/fr/partners",
    },
    esp: {
      title: "Nuestros compañeros",
      url: "/en/partners",
    },
    en: {
      url: "/en/partners",
      title: "Our partners",
    },
  },
  offersTitle: {
    ru: {
      title: "КОМПЛЕКСНЫЕ ПРЕДЛОЖЕНИЯ",
      subtitle: "73% наших клиентов предпочитают купить пакет услуг, чтобы сделать переезд комфортным и выгодным",
    },
    cn: {
      title: "優惠",
      subtitle: "",
    },
    fr: {
      title: "OFFRES",
      subtitle:
        "73% de nos clients préfèrent acheter un pack de services pour faire le déménagement rentable et confortable",
    },
    esp: {
      title: "OFERTAS ",
      subtitle:
        "El 73 % de nuestros clientes prefieren contratar un paquete de servicios para ahorrar dinero y garantizarse un traslado agradable",
    },
    en: {
      title: "OFFERS",
      subtitle: "73% of our customers prefer to buy a package to make the relocation comfortable and profitable",
    },
  },
  offers: {
    cn: [
      {
        img: "/images/slider/1.png",
        title: "高等教育",
        url: "/cn/predlozhenija/stoimost-uslug",
      },
      {
        img: "/images/slider/3.png",
        title: "签证申请",
        url: "/cn/predlozhenija/stoimost-uslug",
      },
      {
        img: "/images/slider/2.png",
        title: "语言学习",
        url: "/cn/uslugi-po-adaptatsii/pakety-uslug-po-adaptatsii",
      },
    ],
    ru: [
      {
        img: "/images/slider/1.png",
        title: "Поступление в ВУЗ",
        url: "/ru/predlozhenija/stoimost-uslug",
      },
      {
        img: "/images/slider/3.png",
        title: "Визовая поддержка",
        url: "/ru/vizovaja-podderzhka/help-with-visa-package",
      },
      {
        img: "/images/slider/2.png",
        url: "/ru/uslugi-po-adaptatsii/pakety-uslug-po-adaptatsii",
        title: "Услуги по адаптации",
      },
    ],
    esp: [
      {
        img: "/images/slider/1.png",
        url: "/en/predlozhenija/cost-of-services",
        title: "ESTUDIOS",
      },
      {
        img: "/images/slider/3.png",
        url: "/en/predlozhenija/cost-of-services",
        title: "OBTENCIÓN DEL VISADO",
      },
      {
        img: "/images/slider/2.png",
        url: "/en/uslugi-po-adaptatsii/adaptation-service-packages",
        title: "ADAPTACIÓN ",
      },
    ],
    en: [
      {
        img: "/images/slider/1.png",
        title: "EDUCATION",
        url: "/en/predlozhenija/cost-of-services",
      },
      {
        img: "/images/slider/3.png",
        url: "/en/predlozhenija/cost-of-services",
        title: "VISA SUPPORT",
      },
      {
        img: "/images/slider/2.png",
        url: "/en/uslugi-po-adaptatsii/adaptation-service-packages",
        title: "ADAPTATION SERVICES",
      },
    ],
    fr: [
      {
        img: "/images/slider/1.png",
        url: "/fr/predlozhenija/tarifs-de-nos-services",
        title: "ENSEIGNEMENT",
      },
      {
        img: "/images/slider/3.png",
        url: "/fr/predlozhenija/tarifs-de-nos-services",
        title: "AIDE À L’OBTENTION DU VISA",
      },
      {
        img: "/images/slider/2.png",
        url: "/fr/uslugi-po-adaptatsii/pack-de-services-dadaptation",
        title: "SERVICES D'ADAPTATION",
      },
    ],
  },
  assorted: {
    esp: [
      {
        title: "Instagram",
        url: "https://www.instagram.com/p/CKdRgIEAqVX/embed",
      },
      {
        title: "Facebook",
        url: "https://www.facebook.com/QuartierLatinEN/",
      },
    ],
    en: [
      {
        url: "https://www.instagram.com/p/CLBoWC2jO_D/embed",
        title: "Instagram",
      },
      {
        url: "https://www.facebook.com/QuartierLatinEN/",
        title: "Facebook",
      },
    ],
    fr: [
      {
        url: "https://www.instagram.com/p/CKyLchbj34V/embed",
        title: "Instagram",
      },
      {
        title: "Facebook",
        url: "https://www.facebook.com/QuartierLatinFR/",
      },
    ],
    ru: [
      {
        url: "https://www.instagram.com/p/CKdRgIEAqVX/embed",
        title: "Instagram",
      },
      {
        title: "YouTube",
        url: "https://www.youtube.com/channel/UCEfRnfb8l-Wp7WXHkG-gUZA",
      },
    ],
  },
};
export default mainPageData;
