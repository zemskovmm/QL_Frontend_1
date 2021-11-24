type educationPageDataType = {
  [key: string]: {
    breadcrumbs: { title: string; url: string }[];
    firstScreen: string;
    links: { img: string; title: string; url: string }[];
    linksButton: { link: string; name: string; description: string };
    linksTitle: string;
    sponsorTitle: string;
    reasonsList: { title: string; items: { img: string; title: string; subtitle: string }[] };
    allReviews: { img: string; text: string; button: { title: string; url: string } };
    wideCards: {
      title: string;
      subtitle: string;
      items: { img: string; name: string }[];
      button: { link: string; name: string; description: string };
    };
    leftImgRightContent: { img: string; text: string };
  };
};

const educationPageData: educationPageDataType = {
  ru: {
    breadcrumbs: [
      {
        title: "Главная",
        url: "/",
      },
      {
        title: "Обучение",
        url: "/education",
      },
    ],
    firstScreen: "МЫ НА СОБСТВЕННОМ ОПЫТЕ ЗНАЕМ, КАК СЛОЖНО ПОДОБРАТЬ И ПОСТУПИТЬ В ЖЕЛАЕМОЕ УЧЕБНОЕ ЗАВЕДЕНИЕ",
    links: [
      {
        img: "./../images/bigCards/1.jpg",
        title: "Заверенный перевод документов",
        url: "/ru/dopolnitelnye-uslugi/zaverennyj-perevod-dokumentov",
      },
      {
        img: "./../images/bigCards/2.jpg",
        title: "Составление и перевод резюме",
        url: "/ru/dopolnitelnye-uslugi/sostavlenie-i-perevod-rezjume",
      },
      {
        img: "./../images/bigCards/3.jpg",
        url: "/ru/dopolnitelnye-uslugi/sostavlenie-motivatsionnyh-pisem",
        title: "Составление мотивационных писем",
      },
      {
        img: "./../images/bigCards/4.jpg",
        title: "Подбор и запись на стипендию",
        url: "/ru/dopolnitelnye-uslugi/podbor-i-zapis-na-stipendiju",
      },
      {
        img: "./../images/bigCards/5.jpg",
        title: "Подготовка к собеседованию в ВУЗе",
        url: "/ru/dopolnitelnye-uslugi/podgotovka-k-sobesedovaniju-na-postuplenie",
      },
      {
        img: "./../images/bigCards/6.jpg",
        title: "Заполнение анкет",
        url: "/ru/dopolnitelnye-uslugi/zapolnenie-anket",
      },
    ],
    linksButton: {
      link: "/",
      name: "Получить консультацию",
      description: "Выберите подходящий вариант или <br> оставьте заявку на консультацию",
    },
    linksTitle:
      "МЫ ПРЕДЛАГАЕМ РАЗЛИЧНЫЕ ВАРИАНТЫ ОБУЧЕНИЯ ЗА ГРАНИЦЕЙ ОТ ПОДГОТОВИТЕЛЬНЫХ КУРСОВ ДО МЕЖДУНАРОДНОГО ВЫСШЕГО ОБРАЗОВАНИЯ",
    reasonsList: {
      title:
        "Мы на собственном опыте знаем, как сложно подобрать и поступить в желаемое учебное заведение, поэтому помогаем вам:",
      items: [
        {
          img: "./../images/training/reasons/1.svg",
          title: "Выбрать",
          subtitle: "подходящий университет и программу обучения",
        },
        {
          img: "./../images/training/reasons/2.svg",
          title: "Составить и оформить",
          subtitle: "документы для подачи заявления",
        },
        {
          img: "./../images/training/reasons/3.svg",
          title: "Оформить и подать",
          subtitle: "заявку в бесплатные учебные заведения",
        },
        {
          img: "./../images/training/reasons/4.svg",
          title: "Организовать",
          subtitle: "ваше путешествие, перелет, проживание, визу, бытовые потребности",
        },
        {
          img: "./../images/training/reasons/5.svg",
          title: "Прояснить",
          subtitle: "все тонкости образования зарубежом",
        },
        {
          img: "./../images/training/reasons/6.svg",
          title: "Сэкономить",
          subtitle: "максимально своё время и деньги",
        },
      ],
    },
    sponsorTitle: "СОТРУДНИЧАЕМ С ВЕДУЩИМИ ВУЗАМИ ФРАНЦИИ И ДРУГИХ СТРАН",
    allReviews: {
      img: "./../images/training/training-alexzendra.png",
      text:
        "<h2>Знакомьтесь, это Александра!</h2><p>Мы помогли ей осуществить давнюю мечту поступить в один из лучших ВУЗов Франции!</p><br><blockquote>Хочу поблагодарить Латинский Квартал за то, что прошли со мной эти два безумных года. Ребята общались с ВУЗом, помогли быстро сделать титр, страховку и поступить в магистратуру именитой школы, минуя все формальные процедуры, на специальных условиях. <br><br> Это просто ВАУ! <br><br> У ребят всегда есть два с половиной плана на любой случай. Они на каждом шагу остаются рядом: будь то перевод досье на французский или текста моей свадебной церемонии, уже на русский язык. Но это уже совсем другая история :)</blockquote><br><h3>Александра</h3>",
      button: {
        title: "Все отзывы",
        url: "/ru/zhivaja-lenta-otzyvov",
      },
    },
    wideCards: {
      title: "Популярные специальности",
      subtitle:
        "На которых вы можете учиться во Франции, Швейцарии, Монако, Бельгии. Обучение проходит как на французском, так и на английском языках",
      items: [
        {
          img: "./../images/training/wideCard/1.svg",
          name: "Лингвистика",
        },
        {
          img: "./../images/training/wideCard/2.svg",
          name: "Мода",
        },
        {
          img: "./../images/training/wideCard/3.svg",
          name: "Экономика",
        },
        {
          img: "./../images/training/wideCard/4.svg",
          name: "Гостиничное дело",
        },
        {
          img: "./../images/training/wideCard/5.svg",
          name: "Юриспруденция",
        },
        {
          img: "./../images/training/wideCard/6.svg",
          name: "Туризм",
        },
        {
          img: "./../images/training/wideCard/7.svg",
          name: "Дизайн",
        },
        {
          img: "./../images/training/wideCard/8.svg",
          name: "Архитектура",
        },
      ],
      button: {
        link: "/",
        name: "Получить консультацию",
        description:
          "Оставьте заявку на консультацию,<br> если хотите получить полный спектр<br> направлений и специальностей?",
      },
    },
    leftImgRightContent: {
      img: "",
      text:
        "<h2>Добивайтесь своего</h2><h3>Будьте первыми во всем, что вы делаете</h3><br><br><blockquote>Верьте в себя: вы важны и уникальны, и такой судьбы не повторится ни у кого и никогда. <br><br> Верьте в это сегодня и всегда: сохраните это свежее чувство новизны и грядущих открытий на всю жизнь и наполняйте им каждый свой день. <br><br> Если ваш язык не понимают, покажите, спойте, станцуйте (как мы :). Если у вас закончились деньги, просто выходите и гуляйте, потому что жить это бесплатно. Если вам нужны друзья в Париже, тогда дом десять, улица Луны</blockquote><br><br><h3>Команда Quartier Latin</h3>",
    },
  },
  en: {
    breadcrumbs: [
      {
        title: "Main",
        url: "/en",
      },
      {
        title: "EDUCATION",
        url: "/en/education",
      },
    ],
    firstScreen:
      "WE KNOW FROM EXPERIENCE HOW HARD IT IS TO CHOOSE A UNIVERSITY AND GET THROUGH THE ADMISSION PROCESS. ",
    links: [
      {
        img: "./../images/bigCards/1.jpg",
        url: "/en/dopolnitelnye-uslugi/certified-translation-of-documents",
        title: "Certified translation of documents",
      },
      {
        img: "./../images/bigCards/2.jpg",
        url: "/en/dopolnitelnye-uslugi/assistance-in-preparing-and-translating-your-cv",
        title: "Assistance in preparing and translating your CV",
      },
      {
        img: "./../images/bigCards/3.jpg",
        url: "/en/dopolnitelnye-uslugi/assistance-in-preparing-and-writing-motivation-letters",
        title: "Assistance in preparing and writing motivation letters",
      },
      {
        img: "./../images/bigCards/4.jpg",
        title: "Selecting and applying for a scholarship",
        url: "/en/dopolnitelnye-uslugi/selecting-and-applying-for-a-scholarship",
      },
      {
        img: "./../images/bigCards/5.jpg",
        url: "/en/dopolnitelnye-uslugi/preparing-for-a-university-interview",
        title: "Preparing for a university interview",
      },
      {
        img: "./../images/bigCards/6.jpg",
        url: "/en/dopolnitelnye-uslugi/filling-in-the-application-form",
        title: "Filling in the application form",
      },
    ],
    linksButton: {
      link: "/",
      name: "CONSULTATION",
      description: "choose the type of studies you are interested in or ask for a",
    },
    linksTitle:
      "WE OFFER DIFFERENT TYPES OF STUDIES ABROAD: FROM PREPARATORY COURSES TO SOME OF THE MOST COMPETITIVE DEGREES IN THE BEST UNIVERSITIES",
    reasonsList: {
      title:
        "WE KNOW FROM EXPERIENCE HOW HARD IT IS TO CHOOSE A UNIVERSITY AND GET THROUGH THE ADMISSION PROCESS. THAT'S WHY WE HELP YOU TO:",
      items: [
        {
          img: "./../images/training/reasons/1.svg",
          title: "choose",
          subtitle: "the best university and degree",
        },
        {
          img: "./../images/training/reasons/2.svg",
          title: "Collect and fill",
          subtitle: "in all the documents required for the application",
        },
        {
          img: "./../images/training/reasons/3.svg",
          title: "Collect and send",
          subtitle: "the application to both public and private universities",
        },
        {
          img: "./../images/training/reasons/4.svg",
          title: "Organise",
          subtitle: "everything: your arrival, accommodation, visa and basic needs",
        },
        {
          img: "./../images/training/reasons/5.svg",
          title: "Clarify",
          subtitle: "all the difficulties of studying abroad",
        },
        {
          img: "./../images/training/reasons/6.svg",
          title: "Save",
          subtitle: "your time and money",
        },
      ],
    },
    sponsorTitle: "WE WORK WITH THE BEST UNIVERSITIES IN FRANCE AND EUROPE",
    allReviews: {
      img: "./../images/training/training-alexzendra.png",
      text:
        "<h2>MEET ALEXANDRA!</h2><p>With our help, her dream of studying at one of the best universities in France came true!</p><br><blockquote>I want to thank Quartier Latin for being by my side during these two years. They contacted the university, helped me to get a residence permit, health insurance and, thanks to them, I went to a prestigious university, where I studied the master's degree that best suited my wishes. But most importantly, I didn’t have to go through all the paperwork on my own. <br><br> There’s only one thing I can say: Wow! <br><br> These guys always have an ace up their sleeve when it comes to planning everything. They guided me every step of the way and, if their help with official translations wasn’t enough, they even helped me to translate my wedding vows. But that's an entirely different story 😊</blockquote><br><h3>ALEXANDRA</h3>",
      button: {
        title: "All reviews",
        url: "/en/zhivaja-lenta-otzyvov",
      },
    },
    wideCards: {
      title: "THE MOST POPULAR DEGREES AND FACULTIES",
      subtitle:
        "You can study these degrees and many others in France, Switzerland, Monaco or Belgium. There are studies available in both English and French",
      items: [
        {
          img: "./../images/training/wideCard/1.svg",
          name: "Linguistics",
        },
        {
          img: "./../images/training/wideCard/2.svg",
          name: "Fashion",
        },
        {
          img: "./../images/training/wideCard/3.svg",
          name: "Economy",
        },
        {
          img: "./../images/training/wideCard/4.svg",
          name: "Hotel and catering",
        },
        {
          img: "./../images/training/wideCard/5.svg",
          name: "Law",
        },
        {
          img: "./../images/training/wideCard/6.svg",
          name: "Tourism",
        },
        {
          img: "./../images/training/wideCard/7.svg",
          name: "Design",
        },
        {
          img: "./../images/training/wideCard/8.svg",
          name: "Architecture",
        },
      ],
      button: {
        link: "/",
        name: "CONSULTATION",
        description: "choose the type of studies you are interested in or ask for a",
      },
    },
    leftImgRightContent: {
      img: "",
      text:
        "<h2>Always get what you want.</h2><h3>Whatever you do, always try to be the best.</h3><br><br><blockquote>Believe in yourself: every person is important and unique. A life like yours will never happen again. <br><br> You should remind yourself that every day. Keep your mind and heart open and discover something new every day. Let that feeling be your guide. <br><br> If they don't understand you when you speak, use gestures, sing, dance (like us :). If you run out of money, go for a walk down the street. Because living is free. And if you need friends in Paris, then remember that you will always find them at 10 rue de la Lune.</blockquote><br><br><h3>Quartier Latin team</h3>",
    },
  },
  cn: {
    breadcrumbs: [
      {
        title: "主要的",
        url: "/cn",
      },
      {
        title: "高等教育",
        url: "/cn/education",
      },
    ],
    firstScreen: "如果您在选择或者注册法国高等院校时遇到了困难",
    links: [
      {
        img: "./../images/bigCards/1.jpg",
        url: "/cn/dopolnitelnye-uslugi/zaverennyj-perevod-dokumentov",
        title: "翻译公证文件",
      },
      {
        img: "./../images/bigCards/2.jpg",
        url: "/cn/dopolnitelnye-uslugi/sostavlenie-i-perevod-rezjume",
        title: "修改简历",
      },
      {
        img: "./../images/bigCards/3.jpg",
        title: "修改动机信",
        url: "/cn/dopolnitelnye-uslugi/sostavlenie-motivatsionnyh-pisem",
      },
      {
        img: "./../images/bigCards/4.jpg",
        title: "申请奖学金",
        url: "/cn/dopolnitelnye-uslugi/podbor-i-zapis-na-stipendiju",
      },
      {
        img: "./../images/bigCards/5.jpg",
        title: "准备学校面试",
        url: "/cn/dopolnitelnye-uslugi/podgotovka-k-sobesedovaniju-na-postuplenie",
      },
      {
        img: "./../images/bigCards/6.jpg",
        title: "行政支持",
        url: "/cn/dopolnitelnye-uslugi/zapolnenie-anket",
      },
    ],
    linksButton: {
      link: "/",
      name: "咨询",
      description: "选择您想咨询的内容",
    },
    linksTitle: "我们为您的法国留学提供定制服务，为您选择最合适您的好学校",
    reasonsList: {
      title: "如果您在选择或者注册法国高等院校时遇到了困难，我们很荣幸可以在以下方面协助您：",
      items: [
        {
          img: "./../images/training/reasons/1.svg",
          title: "选择最适合您的法国院校和项目",
          subtitle: "",
        },
        {
          img: "./../images/training/reasons/2.svg",
          title: "为您准备相关申请表格",
          subtitle: "",
        },
        {
          img: "./../images/training/reasons/3.svg",
          title: "协助您准备并递交申请材料",
          subtitle: "",
        },
        {
          img: "./../images/training/reasons/4.svg",
          title: "规划好您的行程，机票，住房，签证以及其他一切需要的手续",
          subtitle: "",
        },
        {
          img: "./../images/training/reasons/5.svg",
          title: "我们是最了解留学法国的人",
          subtitle: "",
        },
        {
          img: "./../images/training/reasons/6.svg",
          title: "帮您省钱，省时又省力",
          subtitle: "",
        },
      ],
    },
    sponsorTitle: "我们在法国和全世界法语地区都有众多合作院校",
    allReviews: {
      img: "./../images/training/training-alexzendra.png",
      text:
        "<h2>来了解一下ALEXANDRA的经历</h2><p>我们曾经帮助她完成了在顶尖法国院校就读的梦想。</p><br><blockquote>我要感谢拉丁区教育再这两年里给我的帮助，在他们的帮助下我成功申请到了法国学校，并在最短的时间内拿到了居留卡和学生保险。 <br><br> 他们的服务实在是简单又有效！ <br><br> 无论我向他们提出什么要求，他们都能拿出解决的办法并且一步步的陪我解决问题，例如首先需要翻译公证我的学校录取和结婚证明之类的。</blockquote><br><h3>ALEXANDRA</h3>",
      button: {
        title: "所有評論",
        url: "/cn/zhivaja-lenta-otzyvov",
      },
    },
    wideCards: {
      title: "法国热门留学专业",
      subtitle: "您可以再法国，瑞士，摩纳哥和比利时申请这些专业，可选择英语或法语项目。",
      items: [
        {
          img: "./../images/training/wideCard/1.svg",
          name: "语言",
        },
        {
          img: "./../images/training/wideCard/2.svg",
          name: "时装",
        },
        {
          img: "./../images/training/wideCard/3.svg",
          name: "经济",
        },
        {
          img: "./../images/training/wideCard/4.svg",
          name: "酒店餐饮",
        },
        {
          img: "./../images/training/wideCard/5.svg",
          name: "法律",
        },
        {
          img: "./../images/training/wideCard/6.svg",
          name: "旅游",
        },
        {
          img: "./../images/training/wideCard/7.svg",
          name: "设计",
        },
        {
          img: "./../images/training/wideCard/8.svg",
          name: "建筑",
        },
      ],
      button: {
        link: "/",
        name: "咨询",
        description: "选择您想咨询的内容",
      },
    },
    leftImgRightContent: {
      img: "",
      text:
        "<h2>实现您的留学目标，</h2><h3>一切以您的需求为先。</h3><br><br><blockquote>对我们来说每一个学生都是重要的，我们始终为了帮您实现留学梦而努力。 <br><br> 如果您语言不通，就可以用舞蹈来表达（跟我们一样☺） <br><br> 如果您在巴黎需要朋友，随时来10 rue de la Lune 找我们。</blockquote><br><br><h3>拉丁区法国教育团队</h3>",
    },
  },
  fr: {
    breadcrumbs: [
      {
        title: "Principal",
        url: "/fr",
      },
      {
        title: "ENSEIGNEMENT",
        url: "/fr/education",
      },
    ],
    firstScreen:
      "NOUS SOMMES BIEN PLACES POUR SAVOIR QU’IL EST DIFFICILE DE SELECTIONNER ET D’ENTRER DANS L’ETABLISSEMENT D’ENSEIGNEMENT SUPERIEUR DE SON CHOIX",
    links: [
      {
        img: "./../images/bigCards/1.jpg",
        title: "Traduction notariée de documents",
        url: "/fr/dopolnitelnye-uslugi/traduction-notariee-de-documents",
      },
      {
        img: "./../images/bigCards/2.jpg",
        title: "Aide à la rédaction d'un CV",
        url: "/fr/dopolnitelnye-uslugi/aide-a-la-redaction-et-a-la-traduction-dun-cv",
      },
      {
        img: "./../images/bigCards/3.jpg",
        title: "Aide à la rédaction d'une lettre de motivation",
        url: "/fr/dopolnitelnye-uslugi/aide-a-la-redaction-et-a-la-mise-en-forme-dune-lettre-de-motivation",
      },
      {
        img: "./../images/bigCards/4.jpg",
        title: "Candidature à une bourse",
        url: "/fr/dopolnitelnye-uslugi/selection-et-candidature-a-une-bourse",
      },
      {
        img: "./../images/bigCards/5.jpg",
        title: "Préparation à l'entretien d'admission à un établissement",
        url: "/fr/dopolnitelnye-uslugi/preparation-a-lentretien-dadmission-a-un-etablissement-denseignement-superieur",
      },
      {
        img: "./../images/bigCards/6.jpg",
        url: "/fr/dopolnitelnye-uslugi/soutien-administratif",
        title: "Soutien administratif",
      },
    ],
    linksButton: {
      link: "/",
      name: "CONSULTATION",
      description: "choisissez l’option qui vous convient ou faites une demande de",
    },
    linksTitle:
      "NOUS PROPOSONS DIFFERENTES OPTIONS D’ETUDES A L’ETRANGER, DES CLASSES PREPARATOIRES AUX ETUDES SUPERIEURES DE NIVEAU INTERNATIONAL",
    reasonsList: {
      title:
        "NOUS SOMMES BIEN PLACES POUR SAVOIR QU’IL EST DIFFICILE DE SELECTIONNER ET D’ENTRER DANS L’ETABLISSEMENT D’ENSEIGNEMENT SUPERIEUR DE SON CHOIX, VOILA POURQUOI NOUS VOUS AIDONS A:",
      items: [
        {
          img: "./../images/training/reasons/1.svg",
          title: "choisir",
          subtitle: "l’université et le programme qui conviennent le mieux",
        },
        {
          img: "./../images/training/reasons/2.svg",
          title: "Préparer et remplir",
          subtitle: "les documents pour candidater",
        },
        {
          img: "./../images/training/reasons/3.svg",
          title: "Préparer et déposer",
          subtitle: "votre demande même dans des établissements publics",
        },
        {
          img: "./../images/training/reasons/4.svg",
          title: "Organiser",
          subtitle: "votre voyage, vol, hébergement, visa et autres détails logistiques",
        },
        {
          img: "./../images/training/reasons/5.svg",
          title: "Comprendre",
          subtitle: "toutes les subtilités des études à l’étranger",
        },
        {
          img: "./../images/training/reasons/6.svg",
          title: "Economiser",
          subtitle: "son temps et son argent au maximum",
        },
      ],
    },
    sponsorTitle: "NOUS SOMMES PARTENAIRES DE GRANDS ETABLISSEMENTS DE FRANCE ET D’AILLEURS",
    allReviews: {
      img: "./../images/training/training-alexzendra.png",
      text:
        "<h2>FAITES CONNAISSANCE AVEC ALEXANDRA!</h2><p>Nous l’avons aidée à exaucer son vieux rêve d’entrer dans l’une des plus prestigieuses universités de France !</p><br><blockquote>J'aimerais remercier Quartier Latin d’avoir passé à mes côtés ces deux dernières années de folie. Ils ont échangé avec les établissements d'enseignement supérieur, m'ont aidé à obtenir rapidement un titre de séjour, une assurance et à entrer en master dans une école réputée, en évitant toutes les formalités habituelles, sur dérogation.<br><br> C'était tout simplement génial ! <br><br> Ces gars ont toujours plus d'un tour dans leur sac dans n'importe quelle situation. Ils m'ont accompagnée à chaque étape : qu'il faille traduire en français mon dossier d'admission ou le texte de ma cérémonie de mariage, en russe cette fois. Mais ça, c'est une autre histoire 😊</blockquote><br><h3>ALEXANDRA</h3>",
      button: {
        title: "Tous les avis",
        url: "/fr/zhivaja-lenta-otzyvov",
      },
    },
    wideCards: {
      title: "DISCIPLINES ET FACULTES LES PLUS POPULAIRES",
      subtitle:
        "Vous pouvez étudier en France, en Suisse, à Monaco et en Belgique dans ces disciplines et bien d’autres. L’enseignement a lieu tant en français qu’en anglais.",
      items: [
        {
          img: "./../images/training/wideCard/1.svg",
          name: "Linguistique",
        },
        {
          img: "./../images/training/wideCard/2.svg",
          name: "Economie",
        },
        {
          img: "./../images/training/wideCard/3.svg",
          name: "Droit",
        },
        {
          img: "./../images/training/wideCard/4.svg",
          name: "Design",
        },
        {
          img: "./../images/training/wideCard/5.svg",
          name: "Mode",
        },
        {
          img: "./../images/training/wideCard/6.svg",
          name: "Hôtellerie-restauration",
        },
        {
          img: "./../images/training/wideCard/7.svg",
          name: "Tourisme",
        },
        {
          img: "./../images/training/wideCard/8.svg",
          name: "Architecture",
        },
      ],
      button: {
        link: "/",
        name: "CONSULTATION",
        description: "choisissez l’option qui vous convient ou faites une demande de",
      },
    },
    leftImgRightContent: {
      img: "",
      text:
        "<h2>Atteignez votre but.</h2><h3>Soyez premiers dans tout ce que vous faites.</h3><br><br><blockquote>Croyez en vous, vous êtes important et unique, et un tel destin ne se répètera jamais nulle part. <br><br> Croyez-y aujourd’hui et pour toujours, conservez ce sentiment frais de dépaysement et de découvertes à venir toute votre vie et remplissez-en chacun de vos jours. <br><br> Si on ne comprend pas votre langue, montrez, chantez, dansez (comme nous ☺). Si vous n’avez plus d’argent, sortez et baladez-vous, parce que vivre est gratuit. Si vous avez besoin d’amis à Paris, passez au 10 rue de la Lune.</blockquote><br><br><h3>L’équipe de Quartier Latin </h3>",
    },
  },
  esp: {
    breadcrumbs: [
      {
        title: "el principal",
        url: "/esp",
      },
      {
        title: "ESTUDIOS",
        url: "/esp/education",
      },
    ],
    firstScreen: "SABEMOS POR EXPERIENCIA LO DIFÍCIL QUE PUEDE SER ENTRAR EN LA UNIVERSIDAD QUE UNO QUIERE.",
    links: [
      {
        img: "./../images/bigCards/1.jpg",
        url: "/en/dopolnitelnye-uslugi/certified-translation-of-documents",
        title: "Traducción jurada de documentos",
      },
      {
        img: "./../images/bigCards/2.jpg",
        title: "Asistencia para la preparación y traducción del CV",
        url: "/en/dopolnitelnye-uslugi/assistance-in-preparing-and-translating-your-cv",
      },
      {
        img: "./../images/bigCards/3.jpg",
        title: "Asistencia para la redacción de cartas de motivación",
        url: "/en/dopolnitelnye-uslugi/assistance-in-preparing-and-writing-motivation-letters",
      },
      {
        img: "./../images/bigCards/4.jpg",
        title: "Selección y solicitud de una beca",
        url: "/en/dopolnitelnye-uslugi/selecting-and-applying-for-a-scholarship",
      },
      {
        img: "./../images/bigCards/5.jpg",
        title: "Preparación para entrevistas de admisión a la universidad",
        url: "/en/dopolnitelnye-uslugi/preparing-for-a-university-interview",
      },
      {
        img: "./../images/bigCards/6.jpg",
        url: "/en/dopolnitelnye-uslugi/filling-in-the-application-form",
        title: "Cumplimentación de formularios",
      },
    ],
    linksButton: {
      link: "/",
      name: "CONSULTA",
      description: "Elija el tipo de estudios que le interesa o pida una",
    },
    linksTitle:
      "OFRECEMOS DIFERENTES TIPOS DE ESTUDIOS EN EL EXTRANJERO, DESDE CURSOS PREPARATORIOS HASTA CARRERAS EN LAS MEJORES UNIVERSIDADES",
    reasonsList: {
      title:
        "SABEMOS POR EXPERIENCIA LO DIFÍCIL QUE PUEDE SER ENTRAR EN LA UNIVERSIDAD QUE UNO QUIERE. POR ESO LE AYUDAMOS A:",
      items: [
        {
          img: "./../images/training/reasons/1.svg",
          title: "Elegir",
          subtitle: "la mejor universidad y el plan de estudios más adecuado",
        },
        {
          img: "./../images/training/reasons/2.svg",
          title: "Recoger y cumplimentar",
          subtitle: "todos los documentos necesarios para la solicitud",
        },
        {
          img: "./../images/training/reasons/3.svg",
          title: "Recoger y enviar",
          subtitle: "la solicitud tanto a universidades públicas como privadas",
        },
        {
          img: "./../images/training/reasons/4.svg",
          title: "Organizar",
          subtitle:
            "todo lo relacionado con el viaje, el alojamiento, el visado y las necesidades básicas de su estancia",
        },
        {
          img: "./../images/training/reasons/5.svg",
          title: "Aclarar",
          subtitle: "todas las dificultades que supone estudiar fuera",
        },
        {
          img: "./../images/training/reasons/6.svg",
          title: "Ahorrar",
          subtitle: "su tiempo y dinero al máximo",
        },
      ],
    },
    sponsorTitle: "COLABORAMOS CON LOS MEJORES CENTROS DE FRANCIA Y DE OTROS PAÍSES",
    allReviews: {
      img: "./../images/training/training-alexzendra.png",
      text:
        "<h2>CONOZCA A ALEXANDRA</h2><p>Le hemos ayudado a cumplir su sueño de estudiar en una de las mejores universidades de Francia.</p><br><blockquote>Quiero dar las gracias a Quartier Latin por haber estado conmigo durante estos dos años. Hablaron con la universidad, me ayudaron a conseguir el permiso de residencia, el seguro médico y, gracias a ellos, entré en una universidad de prestigio, donde estudié el máster que mejor se adaptaba a mis deseos sin tener que hacer todo el papeleo por mi cuenta. <br><br> Solo puedo decir una cosa: ¡WOW! <br><br> El equipo de Quartier Latin siempre tiene un as en la manga cuando se trata de planificarlo todo. Me acompañaron en cada etapa del camino y, por si fuera poca su ayuda con las traducciones juradas, hasta me ayudaron a traducir mis votos matrimoniales. Pero eso ya es una historia aparte :)</blockquote><br><h3>ALEXANDRA</h3>",
      button: {
        title: "Todas las reseñas",
        url: "/en/zhivaja-lenta-otzyvov",
      },
    },
    wideCards: {
      title: "LAS CARRERAS Y FACULTADES MÁS POPULARES",
      subtitle:
        "Puede estudiar estas y muchas otras carreras en Francia, Suiza, Mónaco o Bélgiga. Existen planes de estudios tanto en Inglés como en Francés",
      items: [
        {
          img: "./../images/training/wideCard/1.svg",
          name: "Filología ",
        },
        {
          img: "./../images/training/wideCard/2.svg",
          name: "Moda",
        },
        {
          img: "./../images/training/wideCard/3.svg",
          name: "Economía",
        },
        {
          img: "./../images/training/wideCard/4.svg",
          name: "Hostelería",
        },
        {
          img: "./../images/training/wideCard/5.svg",
          name: "Derecho",
        },
        {
          img: "./../images/training/wideCard/6.svg",
          name: "Turismo",
        },
        {
          img: "./../images/training/wideCard/7.svg",
          name: "Diseño",
        },
        {
          img: "./../images/training/wideCard/8.svg",
          name: "Arquitectura",
        },
      ],
      button: {
        link: "/",
        name: "CONSULTA",
        description: "Elija el tipo de estudios que le interesa o pida una",
      },
    },
    leftImgRightContent: {
      img: "",
      text:
        "<h2>Consiga siempre lo que se propone.</h2><h3>Haga lo que haga, siempre intente ser el mejor.</h3><br><br><blockquote>Crea en sí mismo: cada persona es importante y única y una vida como la suya no se repetirá nunca. <br><br> Crea en esto hoy y el resto de su vida. Guarde siempre ese espíritu de buscar novedades y descubrir algo todos los días. Deje que esa sensación sea siempre su guía. <br><br> Si no le entienden cuando habla, gesticule, cante, baile (como nosotros :). Si se queda sin dinero, salga a dar una vuelta por la calle. Porque vivir es gratis. Y si necesita amigos en París, entonces recuerde que siempre los encontrará en el número 10 de la calle de la Luna.</blockquote><br><br><h3>El equipo de Quartier Latin</h3>",
    },
  },
};

export default educationPageData;
