import { changeLangInUrl, DEFAULT_LANG, urlToLang } from 'locales/utils';
import { createMap } from 'nanostores'
import { useStore } from "nanostores/preact";
import { route, RouterOnChangeArgs } from 'preact-router';
import { localesStore } from 'stores/LocalesStore';
import { userStatuseStore } from 'stores/UserStatuseStore';
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

    const changeUrl = ( event:RouterOnChangeArgs ) => {
        const url = event.url;
        const lang = urlToLang(url)
        store.set({
            ...getLangPagePaths(lang||DEFAULT_LANG),
            url,
        });
        if(!lang){
            route(changeLangInUrl(url,DEFAULT_LANG), true);
        }
        localesStore.changeLang(lang||DEFAULT_LANG);
        userStatuseStore.heartbeatAction();
    }

    return { store, changeUrl }
}

export const routerStore = createRouterStore();

export const useRouterStore = () => {
    const state = useStore(routerStore.store)
    return { ...routerStore, ...state }
}