import { ApplicationType } from "@project/components/src/interfaces/ApplicationDto";
import { Translate } from "./_types";

export const en: Translate = {
  SIGN_IN_TITLE: "Login to your personal account",
  SIGN_IN_SUBTITLE: "Login or create an account",
  SIGN_IN_ENTRY: "Proceed",
  SIGN_IN_REG: "Register now",
  APPLICATION_LANG: "Application",
  APPLICATION_TYTLES_LANG: {
    [ApplicationType.Course]: "Application for passing the COURSE from :date",
    [ApplicationType.Housing]: "Application for HOUSING from :date",
    [ApplicationType.University]: "Application for EDUCATION from :date",
    [ApplicationType.Visa]: "VISA application from :date",
  },
  CHAT_LANG: "Chat",
  FIND_RENTAL_HOME: "Find a rental home",
  GET_EDUCATION_LANG: "Get professional education",
  GET_EDUCATION_COURSES_VISA_LANG:
    "Get professional education, take language courses, find accommodation or get a visa to France",
  GET_VISA_FRANCE: "Get a visa to France",
  GO_TO_LANG: "Go to",
  MY_APPLICATIONS_LANG: "My applications",
  NEW_APPLICATION_LANG: "New application",
  NOTHING_HERE_YET: "There is nothing here yet",
  PROFILE_LANG: "Profile",
  SETTINGS_LANG: "Settings",
  TAKE_LANGUAGE_COURSES_LANG: "Take language courses",
  WHAT_SERVICES_LANG: "What services are you interested in?",
};
