import { createMap } from "nanostores";
import { useStore } from "nanostores/preact";
import { DEFAULT_LANG, LANGS_TRANSLATE, LANGS_VARIANT_REGEX_URL } from "./_constats";
import { Translate } from "./_types"



interface InternationalStore {
    lang:string;
    translate:Translate;
}

const createInternationalStore = ()=>{
    const store = createMap<InternationalStore>(() => {
        store.set({
            lang: DEFAULT_LANG,
            translate: LANGS_TRANSLATE[DEFAULT_LANG],
        })
    })

    const changeUrl = (url:string) => {
        const result = LANGS_VARIANT_REGEX_URL.exec(url);
        if(result){
            const lang = result[1];
            store.setKey("lang",lang);
            store.setKey("translate",LANGS_TRANSLATE[lang]);
        }else{
            store.setKey("lang",DEFAULT_LANG);
            store.setKey("translate",LANGS_TRANSLATE[DEFAULT_LANG]);
        }
    }

    return { store, changeUrl }
}

export const internationalStore = createInternationalStore();

export const useInternationalStore = () => {
    const state = useStore(internationalStore.store)
    return { ...internationalStore, ...state }
}