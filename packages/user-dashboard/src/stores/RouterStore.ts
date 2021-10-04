import { createMap } from 'nanostores'
import { useStore } from "nanostores/preact";



interface RouterStore {
    url:string;
}

const createRouterStore = ()=>{
    const store = createMap<RouterStore>(() => {
        store.set({
            url:"",
        })
    })

    const changeUrl = (url:string) => {
        store.setKey("url", url);
    }

    return { store, changeUrl }
}

export const routerStore = createRouterStore();

export const useRouterStore = () => {
    const state = useStore(routerStore.store)
    return { ...routerStore, ...state }
}