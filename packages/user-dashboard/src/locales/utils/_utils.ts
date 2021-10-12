import { LANGS_TRANSLATE, Translate } from ".";
import { DEFAULT_LANG, LANGS_VARIANT } from "./_constants"

export const urlToLang = (url:string):string|undefined => {
    const LANGS_URL_REGEX = /^\/(\w+)/
    const result = LANGS_URL_REGEX.exec(url);
    console.log("urlToLang",result)
    if(result){
        const lang = result[1];
        if(LANGS_VARIANT.includes(lang)){
            return lang;
        }
    }
}

export const changeLangInUrl = (url:string,lang:string):string => {
    return url.replace(/^\/\w+/, `/${lang}`)
}

export const getTranslate = (lang:string):Translate => {
    if(lang in LANGS_TRANSLATE){
        return LANGS_TRANSLATE[lang]
    }
    return LANGS_TRANSLATE[DEFAULT_LANG]
}