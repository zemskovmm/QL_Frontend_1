import { ApplicationType } from "@project/components/src/interfaces/ApplicationDto";
import { Translate } from "./_types";

export const ru: Translate = {
  SIGN_IN_TITLE: "Вход в личный кабинет",
  SIGN_IN_SUBTITLE: "Войдите или создайте аккаунт",
  SIGN_IN_ENTRY: "Продолжить",
  SIGN_IN_REG: "Зарегистрироваться",
  APPLICATION_LANG: "Заявка",
  APPLICATION_TYTLES_LANG: {
    [ApplicationType.Course]: "Заявление на прохождение КУРСА от :date",
    [ApplicationType.Housing]: "Заявка на ЖИЛЬЕ от :date",
    [ApplicationType.University]: "Заявка на получение ОБРАЗОВАНИЯ от :date",
    [ApplicationType.Visa]: "Заявка на получение ВИЗЫ от :date",
  },
  CHAT_LANG: "Чат",
  FIND_RENTAL_HOME: "Найдите жилье для аренды",
  GET_EDUCATION_LANG: "Получите профессиональное образование",
  GET_EDUCATION_COURSES_VISA_LANG:
    "Получите профессиональное образование, пройдите языковые курсы, найдите жилье или получите визу во Францию",
  GET_VISA_FRANCE: "Получить визу во Францию",
  GO_TO_LANG: "Перейти",
  MY_APPLICATIONS_LANG: "Мои заявки",
  NEW_APPLICATION_LANG: "Новая заявка",
  NOTHING_HERE_YET: "Здесь пока ничего нет",
  PROFILE_LANG: "Профиль",
  SETTINGS_LANG: "Настройки",
  TAKE_LANGUAGE_COURSES_LANG: "Пройдите языковые курсы",
  WHAT_SERVICES_LANG: "Какие услуги вас интересуют?",
};
