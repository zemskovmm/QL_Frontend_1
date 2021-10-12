import { createMap } from "nanostores";
import { useStore } from "nanostores/preact";
import { DEFAULT_LANG, getTranslate, Translate} from "locales/utils";




interface LocalesStore {
    lang:string;
    translate:Translate;
}

const createLocalesStore = ()=>{
    const store = createMap<LocalesStore>(() => {
        store.set({
            lang: DEFAULT_LANG,
            translate: getTranslate(DEFAULT_LANG),
        })
    })

    const changeLang = (lang:string) => {
        store.setKey("lang",lang);
        store.setKey("translate",getTranslate(lang));
    }

    return { store, changeLang }
}

export const localesStore = createLocalesStore();

export const useLocalesStore = () => {
    const state = useStore(localesStore.store)

    return { ...localesStore, ...state }
}