
import { useMemo } from "preact/hooks";
import { createMap } from 'nanostores'
import { useStore } from "nanostores/preact";
import { userStatuseStore, UserStatuseRegisterProps } from "stores/UserStatuseStore";

interface SignUpStore {
    isLoading :boolean;
    isSuccess :boolean;
}

const createSignUpStore = ()=>{
    const store = createMap<SignUpStore>(() => {
        store.set({
            isLoading: false,
            isSuccess: false,
        })
    })

    const registerAction = async (data:UserStatuseRegisterProps) => {
        store.setKey("isLoading",true);
        store.setKey("isSuccess",await userStatuseStore.registerAction(data));
        store.setKey("isLoading",false);
    }

    return { store, registerAction }
}


export const useSignUpStore = () => {
    const pageStore = useMemo(() => createSignUpStore(), []);
    const state = useStore(pageStore.store)
    return { ...pageStore, ...state }
}