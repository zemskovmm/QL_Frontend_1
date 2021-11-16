import { publicRoute, secureRoute } from "./_utils";

//TEMPLATES
export const HOME_TEMPLATE = publicRoute("/");
export const SIGN_UP_TEMPLATE = publicRoute("/sign-up");
export const SIGN_UP_REDIRECT_CREATE_APPLICATIONS_TEMPLATE = publicRoute("/sign-up","/:applicationType/:entityId");
export const SIGN_IN_TEMPLATE = publicRoute("/sign-in");
export const SIGN_IN_REDIRECT_CREATE_APPLICATIONS_TEMPLATE = publicRoute("/sign-in","/:applicationType/:entityId");
export const CREATE_APPLICATIONS_TEMPLATE = publicRoute("/create-applications","/:applicationType/:entityId");

export const PROFILE_TEMPLATE = secureRoute("/profile");
export const MY_APPLICATIONS_TEMPLATE = secureRoute("/my-applications","/:applicationId?");
export const SETTINGS_TEMPLATE = secureRoute("/settings");
export const NEW_APPLICATION_TEMPLATE = secureRoute("/new-application");
