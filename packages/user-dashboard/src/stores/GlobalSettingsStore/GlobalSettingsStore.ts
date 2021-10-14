import { createMap, effect } from 'nanostores'
import { useStore } from "nanostores/preact";
import { GlobalSettingsDto } from 'admin-app/src/interfaces/GlobalSettingsDto'
import { globalSettingsApi } from "api/GlobalSettingsApi";
import { ActualState } from 'stores/ActualState';


interface GlobalSettingsStore {
    gs?:GlobalSettingsDto,
}

const createGlobalSettingsStore = ()=>{
    const store = createMap<GlobalSettingsStore>(() => {
        store.set({})
    })

    const globalSettingsActualState = new ActualState<string>(async (lang: string)=>{
        const { isOk, body } = await globalSettingsApi.getGlobalSettings(lang)
        if(isOk){
            store.setKey("gs",body);
        }
    },"",(prev,curr)=>prev===curr);

    const getGlobalSettings = async (lang: string):Promise<void> =>  {
        globalSettingsActualState.update(lang);
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