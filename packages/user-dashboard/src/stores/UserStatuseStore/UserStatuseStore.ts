import { userApi, QlClientLoginProps, QlClientRegisterProps } from "src/api/UserApi";
import { action, map, onMount, task } from "nanostores";
import { useStore } from "@nanostores/react";
import { UserStatus } from "./_types";
import { addErrorAction, addSuccessAction } from "src/stores/NotificationStore";
import { onResponse } from "src/api/QLBaseApi";

export type UserStatuseLoginProps = QlClientLoginProps;
export type UserStatuseRegisterProps = QlClientRegisterProps;

export type UserStatuseUserProps = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  personalInfo: any;
};

const EMPTY_USER: UserStatuseUserProps = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  personalInfo: {},
};

interface UserStatuseStore {
  userStatus: UserStatus;
  isLogined: boolean;
  isUnlogined: boolean;
  isRegistrationComplite: boolean;
  user: UserStatuseUserProps;
}

const userStatuseStore = map<UserStatuseStore>({
  userStatus: UserStatus.INIT_PROFILE_STATUS,
  isLogined: false,
  isUnlogined: false,
  isRegistrationComplite: false,
  user: EMPTY_USER,
});

onMount(userStatuseStore, () => {
  heartbeatAction();
  return onResponse(({ status, url }) => {
    if (status === 401) {
      setUserStatus(UserStatus.UNLOGINED_PROFILE_STATUS);
    }
  });
});

const setUser = action(userStatuseStore, "setUser", (store, user: any) => {
  store.setKey("user", {
    lastName: user.lastName || "",
    firstName: user.firstName || "",
    phone: user.phone || "",
    email: user.email || "",
    personalInfo: user.personalInfo || {},
  });
  store.setKey("isRegistrationComplite", !!user.lastName && !!user.firstName && !!user.phone);
});

const setUserStatus = action(userStatuseStore, "setUserStatus", (store, userStatus: UserStatus) => {
  store.setKey("userStatus", userStatus);
  store.setKey("isLogined", userStatus === UserStatus.LOGINED_PROFILE_STATUS);
  store.setKey("isUnlogined", userStatus === UserStatus.UNLOGINED_PROFILE_STATUS);
  if (userStatus != UserStatus.UNLOGINED_PROFILE_STATUS) {
    setUser(EMPTY_USER);
  }
});

export const putUserAction = action(
  userStatuseStore,
  "putUserAction",
  async (store, data: UserStatuseUserProps): Promise<boolean> => {
    const { isOk, error } = await userApi.putUser(data);
    if (isOk) {
      addSuccessAction("Profile successful update");
      setUser(data);
      return true;
    } else {
      addErrorAction(error);
    }
    return false;
  }
);

const heartbeatAction = action(
  userStatuseStore,
  "heartbeatAction",
  async (store): Promise<boolean> => {
    const { isOk, body } = await userApi.getUser();
    if (isOk) {
      setUserStatus(UserStatus.LOGINED_PROFILE_STATUS);
      const user = body || EMPTY_USER;
      setUser(user);
      return true;
    }
    return store.get().isLogined;
  }
);

export const loginAction = action(
  userStatuseStore,
  "loginAction",
  async (store, data: UserStatuseLoginProps): Promise<boolean> => {
    const { isOk, error } = await userApi.login(data);
    if (isOk) {
      setUserStatus(UserStatus.LOGINED_PROFILE_STATUS);
      addSuccessAction("Login successful");
      return true;
    } else {
      addErrorAction(error);
    }
    return false;
  }
);

export const registerAction = action(
  userStatuseStore,
  "registerAction",
  async (store, data: UserStatuseRegisterProps): Promise<boolean> => {
    const { isOk, error } = await userApi.register(data);
    if (isOk) {
      addSuccessAction("Register successful");
      return true;
    } else {
      addErrorAction(error);
    }
    return false;
  }
);

const logoutAction = action(
  userStatuseStore,
  "logoutAction",
  async (store): Promise<boolean> => {
    const { isOk, status, error } = await userApi.logout();
    if (isOk) {
      addSuccessAction("Logout successful");
      setUserStatus(UserStatus.UNLOGINED_PROFILE_STATUS);
      return true;
    } else {
      addErrorAction(error);
    }
    if (status === 401) {
      setUserStatus(UserStatus.UNLOGINED_PROFILE_STATUS);
      return true;
    }
    return store.get().isUnlogined;
  }
);

export const useUserStatuseStore = () => {
  const state = useStore(userStatuseStore);
  return { ...state, heartbeatAction, logoutAction, loginAction, putUserAction, registerAction };
};
