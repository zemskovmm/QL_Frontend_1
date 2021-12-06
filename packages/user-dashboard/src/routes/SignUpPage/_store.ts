import { map, action } from "nanostores";
import { useStore } from "src/stores/react-nanostores";
import { registerAction as userStatuseregisterAction, UserStatuseRegisterProps } from "src/stores/UserStatuseStore";

interface SignUpStore {
  isLoading: boolean;
  isSuccess: boolean;
}

const signUpStore = map<SignUpStore>({
  isLoading: false,
  isSuccess: false,
});

const registerAction = action(signUpStore, "registerAction", async (store, data: UserStatuseRegisterProps) => {
  store.setKey("isLoading", true);
  store.setKey("isSuccess", await userStatuseregisterAction(data));
  store.setKey("isLoading", false);
});

export const useSignUpStore = () => {
  const state = useStore(signUpStore);
  return { ...state, registerAction };
};
