import { useMemo } from "preact/hooks";
import { createMap } from 'nanostores'
import { useStore } from "nanostores/preact";
import { userStatuseStore, UserStatuseLoginProps } from "stores/UserStatuseStore";

interface SignInStore {
    isLoading: boolean;
    isSuccess: boolean;
}

const createSignInStore = ()=>{
    const store = createMap<SignInStore>(() => {
        store.set({
            isLoading: false,
            isSuccess: false,
        })
    })

    const loginAction = async (data:UserStatuseLoginProps) => {
        store.setKey('isLoading',true);
        store.setKey('isSuccess',await userStatuseStore.loginAction(data) );
        store.setKey('isLoading',false);
    }

    return { store, loginAction }
}

export const useSignInStore = () => {
    const pageStore = useMemo(() => createSignInStore(), []);
    const state = useStore(pageStore.store)
    return { ...pageStore, ...state }
}