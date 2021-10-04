import { useMemo } from "preact/hooks";
import { createMap } from 'nanostores'
import { useStore } from "nanostores/preact";
import { userStatuseStore, UserStatuseUserProps } from "stores/UserStatuseStore";

interface ProfileStore {
    isLoading:boolean;
}

const createProfileStore = ()=>{
    const store = createMap<ProfileStore>(() => {
        store.set({
            isLoading: false,
        })
    })

    const putUserAction = async (data:UserStatuseUserProps) => {
        store.setKey('isLoading',true);
        await userStatuseStore.putUserAction(data);
        store.setKey('isLoading',false);
    }

    return { store, putUserAction }
}


export const useProfileStore = () => {
    const pageStore = useMemo(() => createProfileStore(), []);
    const state = useStore(pageStore.store)

    return { ...pageStore, ...state }
}