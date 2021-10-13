import { DEFAULT_LANG, urlToLang } from 'locales/utils';
import { createMap } from 'nanostores'
import { useStore } from "nanostores/preact";
import { PagePaths } from './_types';
import { getLangPagePaths } from './_utils';


type RouterStore = PagePaths & {
    url:string;
}

const createRouterStore = ()=>{
    const store = createMap<RouterStore>(() => {
        store.set({
            ...getLangPagePaths(DEFAULT_LANG),
            url: "",
        })
    })

    const changeUrl = ( url:string ) => {
        const lang = urlToLang(url)
        store.set({
            ...getLangPagePaths(lang||DEFAULT_LANG),
            url,
        });
    }


    return { store, changeUrl }
}

export const routerStore = createRouterStore();

export const useRouterStore = () => {
    const state = useStore(routerStore.store)
    return { ...routerStore, ...state }
}