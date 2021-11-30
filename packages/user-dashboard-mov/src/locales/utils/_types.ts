export type Translate = {
  SIGN_IN_TITLE: string;
  SIGN_IN_SUBTITLE: string;
  SIGN_IN_ENTRY: string;
  SIGN_IN_REG: string;
  SIGN_UP_TITLE: string;
  SIGN_UP_SUBTITLE: string;
  SIGN_UP_EMAIL_LABEL: string;
  SIGN_UP_EMAIL_PLACEHOLDER: string;
  SIGN_UP_PASSWORD_LABEL: string;
  SIGN_UP_PASSWORD_PLACEHOLDER: string;
  SIGN_UP_PASSWORD_CONF_LABEL: string;
  SIGN_UP_PASSWORD_CONF_PLACEHOLDER: string;
  APPLICATION_LANG: string;
  APPLICATION_TYTLES_LANG: { [key: string]: string };
  CHAT_LANG: string;
  FIND_RENTAL_HOME: string;
  GET_EDUCATION_LANG: string;
  GET_EDUCATION_COURSES_VISA_LANG: string;
  GET_VISA_FRANCE: string;
  GO_TO_LANG: string;
  MY_APPLICATIONS_LANG: string;
  NEW_APPLICATION_LANG: string;
  NOTHING_HERE_YET: string;
  PROFILE_LANG: string;
  PROFILE_SAVE: string;
  PROFILE_NAME: string;
  PROFILE_NAME_PLACEHOLDER: string;
  PROFILE_LASTNAME: string;
  PROFILE_LASTNAME_PLACEHOLDER: string;
  PROFILE_PHONE: string;
  PROFILE_PHONE_PLACEHOLDER: string;
  SETTINGS_LANG: string;
  TAKE_LANGUAGE_COURSES_LANG: string;

  WHAT_SERVICES_LANG: string;
};

export type LangsTranslate = {
  [key: string]: Translate;
};
