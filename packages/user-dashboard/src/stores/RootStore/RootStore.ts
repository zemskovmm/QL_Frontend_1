import { createMap } from 'nanostores'
import { useStore } from "nanostores/preact";



interface RootStore {
    url:string;
}

const createRootStore = ()=>{
    const store = createMap<RootStore>(() => {
        store.set({
            url:"",
        })
    })

    const changeUrl = (url:string) => {
        store.setKey("url", url);
    }

    return { store, changeUrl }
}

export const rootStore = createRootStore();

export const useRootStore = () => {
    const state = useStore(rootStore.store)
    return { ...rootStore, ...state }
}