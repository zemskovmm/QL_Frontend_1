import { userApi, QlClientLoginProps, QlClientRegisterProps } from "src/api/UserApi";
import { action, computed, map, MapStore, onMount } from "nanostores";
import { UserStatus } from "./_types";
import { addErrorAction, addSuccessAction } from "src/stores/NotificationStore";
import { onResponse } from "src/api/QLBaseApi";
import { useStore } from "src/stores/react-nanostores";

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
  user: UserStatuseUserProps;
}

const userStatuseStore = map<UserStatuseStore>({
  userStatus: UserStatus.INIT_PROFILE_STATUS,
  user: EMPTY_USER,
});

const isAuthorizedComputed = computed(
  userStatuseStore,
  (store) => store.userStatus === UserStatus.AUTHORIZED_PROFILE_STATUS
);
const isNotAuthorizedComputed = computed(
  userStatuseStore,
  (store) => store.userStatus === UserStatus.NOT_AUTHORIZED_PROFILE_STATUS
);
const isInitProfileComputed = computed(
  userStatuseStore,
  (store) => store.userStatus === UserStatus.INIT_PROFILE_STATUS
);
const isRegistrationCompliteComputed = computed(
  userStatuseStore,
  (store) =>
    store.userStatus !== UserStatus.INIT_PROFILE_STATUS &&
    !!store.user.lastName &&
    !!store.user.firstName &&
    !!store.user.phone
);
const isNotRegistrationCompliteComputed = computed(
  userStatuseStore,
  (store) =>
    store.userStatus !== UserStatus.INIT_PROFILE_STATUS &&
    !(!!store.user.lastName && !!store.user.firstName && !!store.user.phone)
);

onMount(userStatuseStore, () => {
  heartbeatAction();
  return onResponse(({ status, url }) => {
    if (status === 401) {
      setUserStatus(userStatuseStore, UserStatus.NOT_AUTHORIZED_PROFILE_STATUS);
    }
  });
});

const setUser = (store: MapStore<UserStatuseStore>, user: any) => {
  store.setKey("user", {
    lastName: user.lastName || "",
    firstName: user.firstName || "",
    phone: user.phone || "",
    email: user.email || "",
    personalInfo: user.personalInfo || {},
  });
};

const setUserStatus = (store: MapStore<UserStatuseStore>, userStatus: UserStatus) => {
  store.setKey("userStatus", userStatus);
  if (userStatus == UserStatus.NOT_AUTHORIZED_PROFILE_STATUS) {
    setUser(store, EMPTY_USER);
  }
};

export const putUserAction = action(
  userStatuseStore,
  "putUserAction",
  async (store, data: UserStatuseUserProps): Promise<boolean> => {
    const { isOk, error } = await userApi.putUser(data);
    if (isOk) {
      addSuccessAction("Profile successful update");
      setUser(store, data);
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
  async (store): Promise<void> => {
    const { isOk, body } = await userApi.getUser();
    if (isOk) {
      setUserStatus(store, UserStatus.AUTHORIZED_PROFILE_STATUS);
      const user = body || EMPTY_USER;
      setUser(store, user);
    }
  }
);

export const loginAction = action(
  userStatuseStore,
  "loginAction",
  async (store, data: UserStatuseLoginProps): Promise<boolean> => {
    const { isOk, error } = await userApi.login(data);
    if (isOk) {
      setUserStatus(store, UserStatus.AUTHORIZED_PROFILE_STATUS);
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
  async (store): Promise<void> => {
    const { isOk, status, error } = await userApi.logout();
    if (isOk) {
      addSuccessAction("Logout successful");
      setUserStatus(store, UserStatus.NOT_AUTHORIZED_PROFILE_STATUS);
    } else {
      addErrorAction(error);
    }
    if (status === 401) {
      setUserStatus(store, UserStatus.NOT_AUTHORIZED_PROFILE_STATUS);
    }
  }
);

export const useUserStatuseStore = () => {
  const state = useStore(userStatuseStore);
  const isAuthorized = useStore(isAuthorizedComputed);
  const isNotAuthorized = useStore(isNotAuthorizedComputed);
  const isInitProfile = useStore(isInitProfileComputed);
  const isRegistrationComplite = useStore(isRegistrationCompliteComputed);
  const isNotRegistrationComplite = useStore(isNotRegistrationCompliteComputed);

  return {
    ...state,
    isAuthorized,
    isNotAuthorized,
    isInitProfile,
    isRegistrationComplite,
    isNotRegistrationComplite,
    heartbeatAction,
    logoutAction,
    loginAction,
    putUserAction,
    registerAction,
  };
};
