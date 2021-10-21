
export type Translate={
    APPLICATION_LANG: string;
    CHAT_LANG: string;
    FIND_RENTAL_HOME: string;
    GET_EDUCATION_LANG: string;
    GET_EDUCATION_COURSES_VISA_LANG: string;
    GET_VISA_FRANCE: string;
    GO_TO_LANG: string;
    MY_APPLICATIONS_LANG: string;
    NEW_APPLICATION_LANG: string;
    PROFILE_LANG: string;
    SETTINGS_LANG: string;
    TAKE_LANGUAGE_COURSES_LANG: string;
    WHAT_SERVICES_LANG: string;
}

export type LangsTranslate = {
    [key:string]:Translate
}
