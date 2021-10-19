import { createMap } from "nanostores";
import { useStore } from "nanostores/preact";
import { DEFAULT_LANG, getTranslate, Translate} from "locales/utils";




type LocalesStore = Translate &{
    lang: string;
} 

const createLocalesStore = ()=>{
    const store = createMap<LocalesStore>(() => {
        store.set({
            ...getTranslate(DEFAULT_LANG),
            lang: DEFAULT_LANG,
        })
    })

    const changeLang = (lang:string) => {
        store.set({
            ...getTranslate(lang),
            lang,
        });
    }

    return { store, changeLang }
}

export const localesStore = createLocalesStore();

export const useLocalesStore = () => {
    const state = useStore(localesStore.store)

    return { ...localesStore, ...state }
}