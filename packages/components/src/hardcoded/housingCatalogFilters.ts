export const housingCatalogFilters: { [key: string]: { filters: any[] } } = {
  ru: {
    filters: [
      {
        identifier: "city",
        name: "Город",
        options: [
          {
            id: "paris",
            name: "Париж",
          },
          {
            id: "asnières-sur-seine",
            name: "Asnières-sur-Seine",
          },
          {
            id: "bagnolet",
            name: "Bagnolet",
          },
          {
            id: "boulogne-billancourt",
            name: "Boulogne-Billancourt",
          },
          {
            id: "bourget",
            name: "Bourget",
          },
          {
            id: "cachan",
            name: "Cachan",
          },
          {
            id: "cergy",
            name: "Cergy",
          },
          {
            id: "champs-sur-marne",
            name: "Champs-sur-Marne",
          },
          {
            id: "châtillon",
            name: "Châtillon",
          },
          {
            id: "chelles",
            name: "Chelles",
          },
          {
            id: "clamart",
            name: "Clamart",
          },
          {
            id: "clichy",
            name: "Clichy",
          },
          {
            id: "cormeilles-en-parisis",
            name: "Cormeilles-en-Parisis",
          },
          {
            id: "courbevoie",
            name: "Courbevoie",
          },
          {
            id: "créteil",
            name: "Créteil",
          },
          {
            id: "évry",
            name: "Évry",
          },
          {
            id: "issy-les-moulineaux",
            name: "Issy-les-Moulineaux",
          },
          {
            id: "ivry-sur-seine",
            name: "Ivry-sur-Seine",
          },
          {
            id: "joinville-le-pont",
            name: "Joinville-le-Pont",
          },
          {
            id: "le bourget-du-lac",
            name: "Le Bourget-du-Lac",
          },
          {
            id: "levallois-perret",
            name: "Levallois-Perret",
          },
          {
            id: "maisons-alfort",
            name: "Maisons-Alfort",
          },
          {
            id: "malakoff",
            name: "Malakoff",
          },
          {
            id: "massy",
            name: "Massy",
          },
          {
            id: "montigny-le-bretonneux",
            name: "Montigny-le-Bretonneux",
          },
          {
            id: "montreuil",
            name: "Montreuil",
          },
          {
            id: "montrouge",
            name: "Montrouge",
          },
          {
            id: "nanterre",
            name: "Nanterre",
          },
          {
            id: "neuilly-plaisance",
            name: "Neuilly-Plaisance",
          },
          {
            id: "noisy-le-grand",
            name: "Noisy-le-Grand",
          },
          {
            id: "palaiseau",
            name: "Palaiseau",
          },
          {
            id: "pantin",
            name: "Pantin",
          },
          {
            id: "prés-saint-gervais",
            name: "Prés-Saint-Gervais",
          },
          {
            id: "puteaux",
            name: "Puteaux",
          },
          {
            id: "romainville",
            name: "Romainville",
          },
          {
            id: "rosny-sous-bois",
            name: "Rosny-sous-Bois",
          },
          {
            id: "rueil-malmaison",
            name: "Rueil-Malmaison",
          },
          {
            id: "saint-denis",
            name: "Saint-Denis",
          },
          {
            id: "saint-maurice",
            name: "Saint-Maurice",
          },
          {
            id: "saint-ouen",
            name: "Saint-Ouen",
          },
          {
            id: "sèvres",
            name: "Sèvres",
          },
          {
            id: "vanves",
            name: "Vanves",
          },
          {
            id: "vélizy-villacoublay",
            name: "Vélizy-Villacoublay",
          },
          {
            id: "villejuif",
            name: "Villejuif",
          },
          {
            id: "vincennes",
            name: "Vincennes",
          },
          {
            id: "vitry-sur-seine",
            name: "Vitry-sur-Seine",
          },
          {
            id: "amiens",
            name: "Амьен",
          },
          {
            id: "angers",
            name: "Анже",
          },
          {
            id: "annecy",
            name: "Анси",
          },
          {
            id: "bordeaux",
            name: "Бордо",
          },
          {
            id: "mérignac",
            name: "Mérignac",
          },
          {
            id: "pessac",
            name: "Pessac",
          },
          {
            id: "talence",
            name: "Talence",
          },
          {
            id: "valence",
            name: "Валанс",
          },
          {
            id: "grenoble",
            name: "Гренобль",
          },
          {
            id: "fontaine",
            name: "Fontaine",
          },
          {
            id: "saint-martin-d'hères",
            name: "Saint-Martin-d'Hères",
          },
          {
            id: "dijon",
            name: "Дижон",
          },
          {
            id: "douai",
            name: "Дуэ",
          },
          {
            id: "caen",
            name: "Кан",
          },
          {
            id: "cannes",
            name: "Канны",
          },
          {
            id: "valbonne",
            name: "Valbonne",
          },
          {
            id: "clermont-ferrand",
            name: "Клермон-Ферран",
          },
          {
            id: "la rochelle",
            name: "Ла-Рошель",
          },
          {
            id: "le mans",
            name: "Ле-Ман",
          },
          {
            id: "lille",
            name: "Лилль",
          },
          {
            id: "roubaix",
            name: "Roubaix",
          },
          {
            id: "villeneuve-d'ascq",
            name: "Villeneuve-d'Ascq",
          },
          {
            id: "lyon",
            name: "Лион",
          },
          {
            id: "bron",
            name: "Bron",
          },
          {
            id: "saint-priest",
            name: "Saint-Priest",
          },
          {
            id: "villeurbanne",
            name: "Villeurbanne",
          },
          {
            id: "marseille",
            name: "Марсель",
          },
          {
            id: "metz",
            name: "Мец",
          },
          {
            id: "montpellier",
            name: "Монпелье",
          },
          {
            id: "nancy",
            name: "Нанси",
          },
          {
            id: "nantes",
            name: "Нант",
          },
          {
            id: "nice",
            name: "Ницца",
          },
          {
            id: "orléans",
            name: "Орлеан",
          },
          {
            id: "perpignan",
            name: "Перпиньян",
          },
          {
            id: "poitiers",
            name: "Пуатье",
          },
          {
            id: "reims",
            name: "Реймс",
          },
          {
            id: "rennes",
            name: "Ренн",
          },
          {
            id: "rouen",
            name: "Руан",
          },
          {
            id: "darnétal",
            name: "Darnétal",
          },
          {
            id: "cenon",
            name: "Сенон",
          },
          {
            id: "saint-étienne",
            name: "Сент-Этьен",
          },
          {
            id: "strasbourg",
            name: "Страсбург",
          },
          {
            id: "schiltigheim",
            name: "Schiltigheim",
          },
          {
            id: "toulon",
            name: "Тулон",
          },
          {
            id: "toulouse",
            name: "Тулуза",
          },
          {
            id: "tours",
            name: "Тур",
          },
          {
            id: "chambéry",
            name: "Шамбери",
          },
          {
            id: "aix-en-provence",
            name: "Экс-ан-Прованс",
          },
        ],
      },
      {
        identifier: "placement",
        name: "Тип жилья",
        options: [
          {
            id: "room",
            name: "Комната",
          },
          {
            id: "studio",
            name: "Студия",
          },
          {
            id: "one room",
            name: "1-комнатная квартира",
          },
          {
            id: "two rooms",
            name: "Двухкомнатная квартира",
          },
          {
            id: "three rooms",
            name: "Трёхкомнатная квартира",
          },
          {
            id: "four rooms",
            name: "Четырёхкомнатная квартира",
          },
        ],
      },
    ],
  },
  en: {
    filters: [
      {
        identifier: "city",
        name: "City",
        options: [
          {
            id: "paris",
            name: "Paris",
          },
          {
            id: "asnières-sur-seine",
            name: "Asnières-sur-Seine",
          },
          {
            id: "bagnolet",
            name: "Bagnolet",
          },
          {
            id: "boulogne-billancourt",
            name: "Boulogne-Billancourt",
          },
          {
            id: "bourget",
            name: "Bourget",
          },
          {
            id: "cachan",
            name: "Cachan",
          },
          {
            id: "cergy",
            name: "Cergy",
          },
          {
            id: "champs-sur-marne",
            name: "Champs-sur-Marne",
          },
          {
            id: "châtillon",
            name: "Châtillon",
          },
          {
            id: "chelles",
            name: "Chelles",
          },
          {
            id: "clamart",
            name: "Clamart",
          },
          {
            id: "clichy",
            name: "Clichy",
          },
          {
            id: "cormeilles-en-parisis",
            name: "Cormeilles-en-Parisis",
          },
          {
            id: "courbevoie",
            name: "Courbevoie",
          },
          {
            id: "créteil",
            name: "Créteil",
          },
          {
            id: "évry",
            name: "Évry",
          },
          {
            id: "issy-les-moulineaux",
            name: "Issy-les-Moulineaux",
          },
          {
            id: "ivry-sur-seine",
            name: "Ivry-sur-Seine",
          },
          {
            id: "joinville-le-pont",
            name: "Joinville-le-Pont",
          },
          {
            id: "le bourget-du-lac",
            name: "Le Bourget-du-Lac",
          },
          {
            id: "levallois-perret",
            name: "Levallois-Perret",
          },
          {
            id: "maisons-alfort",
            name: "Maisons-Alfort",
          },
          {
            id: "malakoff",
            name: "Malakoff",
          },
          {
            id: "massy",
            name: "Massy",
          },
          {
            id: "montigny-le-bretonneux",
            name: "Montigny-le-Bretonneux",
          },
          {
            id: "montreuil",
            name: "Montreuil",
          },
          {
            id: "montrouge",
            name: "Montrouge",
          },
          {
            id: "nanterre",
            name: "Nanterre",
          },
          {
            id: "neuilly-plaisance",
            name: "Neuilly-Plaisance",
          },
          {
            id: "noisy-le-grand",
            name: "Noisy-le-Grand",
          },
          {
            id: "palaiseau",
            name: "Palaiseau",
          },
          {
            id: "pantin",
            name: "Pantin",
          },
          {
            id: "prés-saint-gervais",
            name: "Prés-Saint-Gervais",
          },
          {
            id: "puteaux",
            name: "Puteaux",
          },
          {
            id: "romainville",
            name: "Romainville",
          },
          {
            id: "rueil-malmaison",
            name: "Rueil-Malmaison",
          },
          {
            id: "saint-denis",
            name: "Saint-Denis",
          },
          {
            id: "saint-maurice",
            name: "Saint-Maurice",
          },
          {
            id: "saint-ouen",
            name: "Saint-Ouen",
          },
          {
            id: "sèvres",
            name: "Sèvres",
          },
          {
            id: "vanves",
            name: "Vanves",
          },
          {
            id: "vélizy-villacoublay",
            name: "Vélizy-Villacoublay",
          },
          {
            id: "villejuif",
            name: "Villejuif",
          },
          {
            id: "vincennes",
            name: "Vincennes",
          },
          {
            id: "vitry-sur-seine",
            name: "Vitry-sur-Seine",
          },
          {
            id: "aix-en-provence",
            name: "Aix-en-Provence",
          },
          {
            id: "amiens",
            name: "Amiens",
          },
          {
            id: "angers",
            name: "Angers",
          },
          {
            id: "annecy",
            name: "Annecy",
          },
          {
            id: "bordeaux",
            name: "Bordeaux",
          },
          {
            id: "mérignac",
            name: "Mérignac",
          },
          {
            id: "pessac",
            name: "Pessac",
          },
          {
            id: "talence",
            name: "Talence",
          },
          {
            id: "caen",
            name: "Caen",
          },
          {
            id: "cannes",
            name: "Cannes",
          },
          {
            id: "valbonne",
            name: "Valbonne",
          },
          {
            id: "cenon",
            name: "Cenon",
          },
          {
            id: "chambéry",
            name: "Chambéry",
          },
          {
            id: "clermont-ferrand",
            name: "Clermont-Ferrand",
          },
          {
            id: "dijon",
            name: "Dijon",
          },
          {
            id: "douai",
            name: "Douai",
          },
          {
            id: "grenoble",
            name: "Grenoble",
          },
          {
            id: "fontaine",
            name: "Fontaine",
          },
          {
            id: "saint-martin-d'hères",
            name: "Saint-Martin-d'Hères",
          },
          {
            id: "la rochelle",
            name: "La Rochelle",
          },
          {
            id: "le mans",
            name: "Le Mans",
          },
          {
            id: "lille",
            name: "Lille",
          },
          {
            id: "roubaix",
            name: "Roubaix",
          },
          {
            id: "villeneuve-d'ascq",
            name: "Villeneuve-d'Ascq",
          },
          {
            id: "lyon",
            name: "Lyon",
          },
          {
            id: "bron",
            name: "Bron",
          },
          {
            id: "saint-priest",
            name: "Saint-Priest",
          },
          {
            id: "villeurbanne",
            name: "Villeurbanne",
          },
          {
            id: "marseille",
            name: "Marseille",
          },
          {
            id: "metz",
            name: "Metz",
          },
          {
            id: "montpellier",
            name: "Montpellier",
          },
          {
            id: "nancy",
            name: "Nancy",
          },
          {
            id: "nantes",
            name: "Nantes",
          },
          {
            id: "nice",
            name: "Nice",
          },
          {
            id: "orléans",
            name: "Orléans",
          },
          {
            id: "perpignan",
            name: "Perpignan",
          },
          {
            id: "poitiers",
            name: "Poitiers",
          },
          {
            id: "reims",
            name: "Reims",
          },
          {
            id: "rennes",
            name: "Rennes",
          },
          {
            id: "rouen",
            name: "Rouen",
          },
          {
            id: "darnétal",
            name: "Darnétal",
          },
          {
            id: "saint-étienne",
            name: "Saint-Étienne",
          },
          {
            id: "strasbourg",
            name: "Strasbourg",
          },
          {
            id: "schiltigheim",
            name: "Schiltigheim",
          },
          {
            id: "toulon",
            name: "Toulon",
          },
          {
            id: "toulouse",
            name: "Toulouse",
          },
          {
            id: "tours",
            name: "Tours",
          },
          {
            id: "valence",
            name: "Valence",
          },
        ],
      },
      {
        identifier: "placement",
        name: "Placement",
        options: [
          {
            id: "room",
            name: "Room",
          },
          {
            id: "studio",
            name: "Studio",
          },
          {
            id: "one room",
            name: "One-room apartment",
          },
          {
            id: "two rooms",
            name: "Two-roomed apartment",
          },
          {
            id: "three rooms",
            name: "Three-room apartment",
          },
          {
            id: "four rooms",
            name: "Four-room apartment",
          },
        ],
      },
    ],
  },
  esp: {
    filters: [
      {
        identifier: "city",
        name: "City",
        options: [
          {
            id: "paris",
            name: "Paris",
          },
          {
            id: "asnières-sur-seine",
            name: "Asnières-sur-Seine",
          },
          {
            id: "bagnolet",
            name: "Bagnolet",
          },
          {
            id: "boulogne-billancourt",
            name: "Boulogne-Billancourt",
          },
          {
            id: "bourget",
            name: "Bourget",
          },
          {
            id: "cachan",
            name: "Cachan",
          },
          {
            id: "cergy",
            name: "Cergy",
          },
          {
            id: "champs-sur-marne",
            name: "Champs-sur-Marne",
          },
          {
            id: "châtillon",
            name: "Châtillon",
          },
          {
            id: "chelles",
            name: "Chelles",
          },
          {
            id: "clamart",
            name: "Clamart",
          },
          {
            id: "clichy",
            name: "Clichy",
          },
          {
            id: "cormeilles-en-parisis",
            name: "Cormeilles-en-Parisis",
          },
          {
            id: "courbevoie",
            name: "Courbevoie",
          },
          {
            id: "créteil",
            name: "Créteil",
          },
          {
            id: "évry",
            name: "Évry",
          },
          {
            id: "issy-les-moulineaux",
            name: "Issy-les-Moulineaux",
          },
          {
            id: "ivry-sur-seine",
            name: "Ivry-sur-Seine",
          },
          {
            id: "joinville-le-pont",
            name: "Joinville-le-Pont",
          },
          {
            id: "le bourget-du-lac",
            name: "Le Bourget-du-Lac",
          },
          {
            id: "levallois-perret",
            name: "Levallois-Perret",
          },
          {
            id: "maisons-alfort",
            name: "Maisons-Alfort",
          },
          {
            id: "malakoff",
            name: "Malakoff",
          },
          {
            id: "massy",
            name: "Massy",
          },
          {
            id: "montigny-le-bretonneux",
            name: "Montigny-le-Bretonneux",
          },
          {
            id: "montreuil",
            name: "Montreuil",
          },
          {
            id: "montrouge",
            name: "Montrouge",
          },
          {
            id: "nanterre",
            name: "Nanterre",
          },
          {
            id: "neuilly-plaisance",
            name: "Neuilly-Plaisance",
          },
          {
            id: "noisy-le-grand",
            name: "Noisy-le-Grand",
          },
          {
            id: "palaiseau",
            name: "Palaiseau",
          },
          {
            id: "pantin",
            name: "Pantin",
          },
          {
            id: "prés-saint-gervais",
            name: "Prés-Saint-Gervais",
          },
          {
            id: "puteaux",
            name: "Puteaux",
          },
          {
            id: "romainville",
            name: "Romainville",
          },
          {
            id: "rueil-malmaison",
            name: "Rueil-Malmaison",
          },
          {
            id: "saint-denis",
            name: "Saint-Denis",
          },
          {
            id: "saint-maurice",
            name: "Saint-Maurice",
          },
          {
            id: "saint-ouen",
            name: "Saint-Ouen",
          },
          {
            id: "sèvres",
            name: "Sèvres",
          },
          {
            id: "vanves",
            name: "Vanves",
          },
          {
            id: "vélizy-villacoublay",
            name: "Vélizy-Villacoublay",
          },
          {
            id: "villejuif",
            name: "Villejuif",
          },
          {
            id: "vincennes",
            name: "Vincennes",
          },
          {
            id: "vitry-sur-seine",
            name: "Vitry-sur-Seine",
          },
          {
            id: "aix-en-provence",
            name: "Aix-en-Provence",
          },
          {
            id: "amiens",
            name: "Amiens",
          },
          {
            id: "angers",
            name: "Angers",
          },
          {
            id: "annecy",
            name: "Annecy",
          },
          {
            id: "bordeaux",
            name: "Bordeaux",
          },
          {
            id: "mérignac",
            name: "Mérignac",
          },
          {
            id: "pessac",
            name: "Pessac",
          },
          {
            id: "talence",
            name: "Talence",
          },
          {
            id: "caen",
            name: "Caen",
          },
          {
            id: "cannes",
            name: "Cannes",
          },
          {
            id: "valbonne",
            name: "Valbonne",
          },
          {
            id: "cenon",
            name: "Cenon",
          },
          {
            id: "chambéry",
            name: "Chambéry",
          },
          {
            id: "clermont-ferrand",
            name: "Clermont-Ferrand",
          },
          {
            id: "dijon",
            name: "Dijon",
          },
          {
            id: "douai",
            name: "Douai",
          },
          {
            id: "grenoble",
            name: "Grenoble",
          },
          {
            id: "fontaine",
            name: "Fontaine",
          },
          {
            id: "saint-martin-d'hères",
            name: "Saint-Martin-d'Hères",
          },
          {
            id: "la rochelle",
            name: "La Rochelle",
          },
          {
            id: "le mans",
            name: "Le Mans",
          },
          {
            id: "lille",
            name: "Lille",
          },
          {
            id: "roubaix",
            name: "Roubaix",
          },
          {
            id: "villeneuve-d'ascq",
            name: "Villeneuve-d'Ascq",
          },
          {
            id: "lyon",
            name: "Lyon",
          },
          {
            id: "bron",
            name: "Bron",
          },
          {
            id: "saint-priest",
            name: "Saint-Priest",
          },
          {
            id: "villeurbanne",
            name: "Villeurbanne",
          },
          {
            id: "marseille",
            name: "Marseille",
          },
          {
            id: "metz",
            name: "Metz",
          },
          {
            id: "montpellier",
            name: "Montpellier",
          },
          {
            id: "nancy",
            name: "Nancy",
          },
          {
            id: "nantes",
            name: "Nantes",
          },
          {
            id: "nice",
            name: "Nice",
          },
          {
            id: "orléans",
            name: "Orléans",
          },
          {
            id: "perpignan",
            name: "Perpignan",
          },
          {
            id: "poitiers",
            name: "Poitiers",
          },
          {
            id: "reims",
            name: "Reims",
          },
          {
            id: "rennes",
            name: "Rennes",
          },
          {
            id: "rouen",
            name: "Rouen",
          },
          {
            id: "darnétal",
            name: "Darnétal",
          },
          {
            id: "saint-étienne",
            name: "Saint-Étienne",
          },
          {
            id: "strasbourg",
            name: "Strasbourg",
          },
          {
            id: "schiltigheim",
            name: "Schiltigheim",
          },
          {
            id: "toulon",
            name: "Toulon",
          },
          {
            id: "toulouse",
            name: "Toulouse",
          },
          {
            id: "tours",
            name: "Tours",
          },
          {
            id: "valence",
            name: "Valence",
          },
        ],
      },
      {
        identifier: "placement",
        name: "Placement",
        options: [
          {
            id: "room",
            name: "Room",
          },
          {
            id: "studio",
            name: "Studio",
          },
          {
            id: "one room",
            name: "One-room apartment",
          },
          {
            id: "two rooms",
            name: "Two-roomed apartment",
          },
          {
            id: "three rooms",
            name: "Three-room apartment",
          },
          {
            id: "four rooms",
            name: "Four-room apartment",
          },
        ],
      },
    ],
  },
  fr: {
    filters: [
      {
        identifier: "city",
        name: "VILLE",
        options: [
          {
            id: "paris",
            name: "Paris",
          },
          {
            id: "asnières-sur-seine",
            name: "Asnières-sur-Seine",
          },
          {
            id: "bagnolet",
            name: "Bagnolet",
          },
          {
            id: "boulogne-billancourt",
            name: "Boulogne-Billancourt",
          },
          {
            id: "bourget",
            name: "Bourget",
          },
          {
            id: "cachan",
            name: "Cachan",
          },
          {
            id: "cergy",
            name: "Cergy",
          },
          {
            id: "champs-sur-marne",
            name: "Champs-sur-Marne",
          },
          {
            id: "châtillon",
            name: "Châtillon",
          },
          {
            id: "chelles",
            name: "Chelles",
          },
          {
            id: "clamart",
            name: "Clamart",
          },
          {
            id: "clichy",
            name: "Clichy",
          },
          {
            id: "cormeilles-en-parisis",
            name: "Cormeilles-en-Parisis",
          },
          {
            id: "courbevoie",
            name: "Courbevoie",
          },
          {
            id: "créteil",
            name: "Créteil",
          },
          {
            id: "évry",
            name: "Évry",
          },
          {
            id: "issy-les-moulineaux",
            name: "Issy-les-Moulineaux",
          },
          {
            id: "ivry-sur-seine",
            name: "Ivry-sur-Seine",
          },
          {
            id: "joinville-le-pont",
            name: "Joinville-le-Pont",
          },
          {
            id: "le bourget-du-lac",
            name: "Le Bourget-du-Lac",
          },
          {
            id: "levallois-perret",
            name: "Levallois-Perret",
          },
          {
            id: "maisons-alfort",
            name: "Maisons-Alfort",
          },
          {
            id: "malakoff",
            name: "Malakoff",
          },
          {
            id: "massy",
            name: "Massy",
          },
          {
            id: "montigny-le-bretonneux",
            name: "Montigny-le-Bretonneux",
          },
          {
            id: "montreuil",
            name: "Montreuil",
          },
          {
            id: "montrouge",
            name: "Montrouge",
          },
          {
            id: "nanterre",
            name: "Nanterre",
          },
          {
            id: "neuilly-plaisance",
            name: "Neuilly-Plaisance",
          },
          {
            id: "noisy-le-grand",
            name: "Noisy-le-Grand",
          },
          {
            id: "palaiseau",
            name: "Palaiseau",
          },
          {
            id: "pantin",
            name: "Pantin",
          },
          {
            id: "prés-saint-gervais",
            name: "Prés-Saint-Gervais",
          },
          {
            id: "puteaux",
            name: "Puteaux",
          },
          {
            id: "romainville",
            name: "Romainville",
          },
          {
            id: "rosny-sous-bois",
            name: "Rosny-sous-Bois",
          },
          {
            id: "rueil-malmaison",
            name: "Rueil-Malmaison",
          },
          {
            id: "saint-denis",
            name: "Saint-Denis",
          },
          {
            id: "saint-maurice",
            name: "Saint-Maurice",
          },
          {
            id: "saint-ouen",
            name: "Saint-Ouen",
          },
          {
            id: "sèvres",
            name: "Sèvres",
          },
          {
            id: "vanves",
            name: "Vanves",
          },
          {
            id: "vélizy-villacoublay",
            name: "Vélizy-Villacoublay",
          },
          {
            id: "villejuif",
            name: "Villejuif",
          },
          {
            id: "vincennes",
            name: "Vincennes",
          },
          {
            id: "vitry-sur-seine",
            name: "Vitry-sur-Seine",
          },
          {
            id: "aix-en-provence",
            name: "Aix-en-Provence",
          },
          {
            id: "amiens",
            name: "Amiens",
          },
          {
            id: "angers",
            name: "Angers",
          },
          {
            id: "annecy",
            name: "Annecy",
          },
          {
            id: "bordeaux",
            name: "Bordeaux",
          },
          {
            id: "mérignac",
            name: "Mérignac",
          },
          {
            id: "pessac",
            name: "Pessac",
          },
          {
            id: "talence",
            name: "Talence",
          },
          {
            id: "caen",
            name: "Caen",
          },
          {
            id: "cannes",
            name: "Cannes",
          },
          {
            id: "valbonne",
            name: "Valbonne",
          },
          {
            id: "cenon",
            name: "Cenon",
          },
          {
            id: "chambéry",
            name: "Chambéry",
          },
          {
            id: "clermont-ferrand",
            name: "Clermont-Ferrand",
          },
          {
            id: "dijon",
            name: "Dijon",
          },
          {
            id: "douai",
            name: "Douai",
          },
          {
            id: "grenoble",
            name: "Grenoble",
          },
          {
            id: "fontaine",
            name: "Fontaine",
          },
          {
            id: "saint-martin-d'hères",
            name: "Saint-Martin-d'Hères",
          },
          {
            id: "la rochelle",
            name: "La Rochelle",
          },
          {
            id: "lille",
            name: "Lille",
          },
          {
            id: "roubaix",
            name: "Roubaix",
          },
          {
            id: "villeneuve-d'ascq",
            name: "Villeneuve-d'Ascq",
          },
          {
            id: "lyon",
            name: "Lyon",
          },
          {
            id: "bron",
            name: "Bron",
          },
          {
            id: "saint-priest",
            name: "Saint-Priest",
          },
          {
            id: "villeurbanne",
            name: "Villeurbanne",
          },
          {
            id: "marseille",
            name: "Marseille",
          },
          {
            id: "metz",
            name: "Metz",
          },
          {
            id: "montpellier",
            name: "Montpellier",
          },
          {
            id: "nancy",
            name: "Nancy",
          },
          {
            id: "nantes",
            name: "Nantes",
          },
          {
            id: "nice",
            name: "Nice",
          },
          {
            id: "orléans",
            name: "Orléans",
          },
          {
            id: "perpignan",
            name: "Perpignan",
          },
          {
            id: "poitiers",
            name: "Poitiers",
          },
          {
            id: "reims",
            name: "Reims",
          },
          {
            id: "rennes",
            name: "Rennes",
          },
          {
            id: "rouen",
            name: "Rouen",
          },
          {
            id: "darnétal",
            name: "Darnétal",
          },
          {
            id: "saint-étienne",
            name: "Saint-Étienne",
          },
          {
            id: "strasbourg",
            name: "Strasbourg",
          },
          {
            id: "schiltigheim",
            name: "Schiltigheim",
          },
          {
            id: "toulon",
            name: "Toulon",
          },
          {
            id: "toulouse",
            name: "Toulouse",
          },
          {
            id: "tours",
            name: "Tours",
          },
          {
            id: "valence",
            name: "Valence",
          },
        ],
      },
      {
        identifier: "placement",
        name: "TYPE DE LOGEMENT",
        options: [
          {
            id: "room",
            name: "Chambre",
          },
          {
            id: "studio",
            name: "Studio",
          },
          {
            id: "one room",
            name: "Appartement 1 pièce",
          },
          {
            id: "two rooms",
            name: "Appartement 2 pièces",
          },
          {
            id: "three rooms",
            name: "Appartement 3 pièces",
          },
          {
            id: "four rooms",
            name: "Appartement 4 pièces",
          },
        ],
      },
    ],
  },
  cn: {
    filters: [
      {
        identifier: "city",
        name: "City",
        options: [
          {
            id: "paris",
            name: "Paris",
          },
          {
            id: "asnières-sur-seine",
            name: "Asnières-sur-Seine",
          },
          {
            id: "bagnolet",
            name: "Bagnolet",
          },
          {
            id: "boulogne-billancourt",
            name: "Boulogne-Billancourt",
          },
          {
            id: "bourget",
            name: "Bourget",
          },
          {
            id: "cachan",
            name: "Cachan",
          },
          {
            id: "cergy",
            name: "Cergy",
          },
          {
            id: "champs-sur-marne",
            name: "Champs-sur-Marne",
          },
          {
            id: "châtillon",
            name: "Châtillon",
          },
          {
            id: "chelles",
            name: "Chelles",
          },
          {
            id: "clamart",
            name: "Clamart",
          },
          {
            id: "clichy",
            name: "Clichy",
          },
          {
            id: "cormeilles-en-parisis",
            name: "Cormeilles-en-Parisis",
          },
          {
            id: "courbevoie",
            name: "Courbevoie",
          },
          {
            id: "créteil",
            name: "Créteil",
          },
          {
            id: "évry",
            name: "Évry",
          },
          {
            id: "issy-les-moulineaux",
            name: "Issy-les-Moulineaux",
          },
          {
            id: "ivry-sur-seine",
            name: "Ivry-sur-Seine",
          },
          {
            id: "joinville-le-pont",
            name: "Joinville-le-Pont",
          },
          {
            id: "le bourget-du-lac",
            name: "Le Bourget-du-Lac",
          },
          {
            id: "levallois-perret",
            name: "Levallois-Perret",
          },
          {
            id: "maisons-alfort",
            name: "Maisons-Alfort",
          },
          {
            id: "malakoff",
            name: "Malakoff",
          },
          {
            id: "massy",
            name: "Massy",
          },
          {
            id: "montigny-le-bretonneux",
            name: "Montigny-le-Bretonneux",
          },
          {
            id: "montreuil",
            name: "Montreuil",
          },
          {
            id: "montrouge",
            name: "Montrouge",
          },
          {
            id: "nanterre",
            name: "Nanterre",
          },
          {
            id: "neuilly-plaisance",
            name: "Neuilly-Plaisance",
          },
          {
            id: "noisy-le-grand",
            name: "Noisy-le-Grand",
          },
          {
            id: "palaiseau",
            name: "Palaiseau",
          },
          {
            id: "pantin",
            name: "Pantin",
          },
          {
            id: "prés-saint-gervais",
            name: "Prés-Saint-Gervais",
          },
          {
            id: "puteaux",
            name: "Puteaux",
          },
          {
            id: "romainville",
            name: "Romainville",
          },
          {
            id: "rosny-sous-bois",
            name: "Rosny-sous-Bois",
          },
          {
            id: "rueil-malmaison",
            name: "Rueil-Malmaison",
          },
          {
            id: "saint-denis",
            name: "Saint-Denis",
          },
          {
            id: "saint-maurice",
            name: "Saint-Maurice",
          },
          {
            id: "saint-ouen",
            name: "Saint-Ouen",
          },
          {
            id: "sèvres",
            name: "Sèvres",
          },
          {
            id: "vanves",
            name: "Vanves",
          },
          {
            id: "vélizy-villacoublay",
            name: "Vélizy-Villacoublay",
          },
          {
            id: "villejuif",
            name: "Villejuif",
          },
          {
            id: "vincennes",
            name: "Vincennes",
          },
          {
            id: "vitry-sur-seine",
            name: "Vitry-sur-Seine",
          },
          {
            id: "aix-en-provence",
            name: "Aix-en-Provence",
          },
          {
            id: "amiens",
            name: "Amiens",
          },
          {
            id: "angers",
            name: "Angers",
          },
          {
            id: "annecy",
            name: "Annecy",
          },
          {
            id: "bordeaux",
            name: "Bordeaux",
          },
          {
            id: "mérignac",
            name: "Mérignac",
          },
          {
            id: "pessac",
            name: "Pessac",
          },
          {
            id: "talence",
            name: "Talence",
          },
          {
            id: "caen",
            name: "Caen",
          },
          {
            id: "cannes",
            name: "Cannes",
          },
          {
            id: "valbonne",
            name: "Valbonne",
          },
          {
            id: "cenon",
            name: "Cenon",
          },
          {
            id: "chambéry",
            name: "Chambéry",
          },
          {
            id: "clermont-ferrand",
            name: "Clermont-Ferrand",
          },
          {
            id: "dijon",
            name: "Dijon",
          },
          {
            id: "douai",
            name: "Douai",
          },
          {
            id: "grenoble",
            name: "Grenoble",
          },
          {
            id: "fontaine",
            name: "Fontaine",
          },
          {
            id: "saint-martin-d'hères",
            name: "Saint-Martin-d'Hères",
          },
          {
            id: "la rochelle",
            name: "La Rochelle",
          },
          {
            id: "lille",
            name: "Lille",
          },
          {
            id: "roubaix",
            name: "Roubaix",
          },
          {
            id: "villeneuve-d'ascq",
            name: "Villeneuve-d'Ascq",
          },
          {
            id: "lyon",
            name: "Lyon",
          },
          {
            id: "bron",
            name: "Bron",
          },
          {
            id: "saint-priest",
            name: "Saint-Priest",
          },
          {
            id: "villeurbanne",
            name: "Villeurbanne",
          },
          {
            id: "marseille",
            name: "Marseille",
          },
          {
            id: "metz",
            name: "Metz",
          },
          {
            id: "montpellier",
            name: "Montpellier",
          },
          {
            id: "nancy",
            name: "Nancy",
          },
          {
            id: "nantes",
            name: "Nantes",
          },
          {
            id: "nice",
            name: "Nice",
          },
          {
            id: "orléans",
            name: "Orléans",
          },
          {
            id: "perpignan",
            name: "Perpignan",
          },
          {
            id: "poitiers",
            name: "Poitiers",
          },
          {
            id: "reims",
            name: "Reims",
          },
          {
            id: "rennes",
            name: "Rennes",
          },
          {
            id: "rouen",
            name: "Rouen",
          },
          {
            id: "darnétal",
            name: "Darnétal",
          },
          {
            id: "saint-étienne",
            name: "Saint-Étienne",
          },
          {
            id: "strasbourg",
            name: "Strasbourg",
          },
          {
            id: "schiltigheim",
            name: "Schiltigheim",
          },
          {
            id: "toulon",
            name: "Toulon",
          },
          {
            id: "toulouse",
            name: "Toulouse",
          },
          {
            id: "tours",
            name: "Tours",
          },
          {
            id: "valence",
            name: "Valence",
          },
        ],
      },
      {
        identifier: "placement",
        name: "Placement",
        options: [
          {
            id: "room",
            name: "房間",
          },
          {
            id: "studio",
            name: "一室公寓",
          },
          {
            id: "one room",
            name: "一室公寓",
          },
          {
            id: "two rooms",
            name: "兩居室公寓",
          },
          {
            id: "three rooms",
            name: "三臥室公寓",
          },
          {
            id: "four rooms",
            name: "四室公寓",
          },
        ],
      },
    ],
  },
};
