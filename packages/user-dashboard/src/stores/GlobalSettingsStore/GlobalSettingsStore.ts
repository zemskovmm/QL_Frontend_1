import { createMap } from 'nanostores'
import { useStore } from "nanostores/preact";
import { GlobalSettingsDto } from 'admin-app/src/interfaces/GlobalSettingsDto'
import { globalSettingsApi } from "api/GlobalSettingsApi";


interface GlobalSettingsStore {
    isLoading: boolean;
    gs?:GlobalSettingsDto,
}

const createGlobalSettingsStore = ()=>{
    const store = createMap<GlobalSettingsStore>(() => {
        store.set({
            isLoading: false,
        })
    })

    const getGlobalSettings = async (lang: string):Promise<boolean> =>  {
        store.setKey("isLoading",true);
        const { isOk, body } = await globalSettingsApi.getGlobalSettings(lang);
        store.setKey("isLoading",false);
        if(isOk){
            store.setKey("gs",body);
            console.log("getGlobalSettings",body);
            return true;
        }
        return false;
    }

    return { 
        store, 
        getGlobalSettings,
    }
}

export const globalSettingsStore = createGlobalSettingsStore();

export const useGlobalSettingsStore = () => {
    const state = useStore(globalSettingsStore.store)
    return { ...globalSettingsStore, ...state }
}