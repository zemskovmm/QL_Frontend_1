import { action, map } from "nanostores";
import { useStore } from "@nanostores/react";
import { loginAction as userStatuseloginAction, UserStatuseLoginProps } from "src/stores/UserStatuseStore";

interface SignInStore {
  isLoading: boolean;
  isSuccess: boolean;
}

const signInStore = map<SignInStore>({
  isLoading: false,
  isSuccess: false,
});

const loginAction = action(signInStore, "loginAction", async (store, data: UserStatuseLoginProps) => {
  store.setKey("isLoading", true);
  store.setKey("isSuccess", await userStatuseloginAction(data));
  store.setKey("isLoading", false);
});

export const useSignInStore = () => {
  const state = useStore(signInStore);
  return { ...state, loginAction };
};
