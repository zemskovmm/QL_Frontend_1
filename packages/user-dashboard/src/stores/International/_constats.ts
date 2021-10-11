import { LangsTranslate } from "./_types";

export const DEFAULT_LANG = "en";
export const LANGS_TRANSLATE:LangsTranslate = {
    'en': {
        My_profile:"My profile"
    },
    'ru': {
        My_profile:"Мой профиль"
    },
}

export const LANGS_VARIANT = Object.keys(LANGS_TRANSLATE);
export const LANGS_VARIANT_REGEX_URL = new RegExp(`^/(${LANGS_VARIANT.join("|")})`)