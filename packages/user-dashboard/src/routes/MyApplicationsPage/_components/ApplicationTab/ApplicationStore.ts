import { useMemo } from "preact/hooks";
import { createMap, MapStore } from "nanostores";
import { useStore } from "nanostores/preact";
import { personalApi } from "api/PersonalApi";
import { userApi } from "api/UserApi";
import { notificationStore } from "stores/NotificationStore";

type ApplicationItem = {
  id: number;
  type: number | string;
  entityId: number;
  status: number;
  commonApplicationInfo: { [key: string]: any };
  entityTypeSpecificApplicationInfo: { [key: string]: any };
};

export type ApplicationPostProps = {
  type: number | string;
  entityId: number;
  commonApplicationInfo: { [key: string]: any };
  entityTypeSpecificApplicationInfo: { [key: string]: any };
};

interface ApplicationStore {
  isLoading: boolean;
  application: ApplicationItem;
}

interface CreateApplicationStore {
  store: MapStore<ApplicationStore>;
  getApplication: (applicationId: number) => Promise<void>;
  postApplicationAction: (data: ApplicationPostProps) => Promise<boolean>;
}

export type ChatStoreType = CreateApplicationStore & ApplicationStore;

const applicationItemDefault = {
  id: 0,
  type: 0,
  entityId: 0,
  status: 0,
  commonApplicationInfo: {},
  entityTypeSpecificApplicationInfo: {},
};

const createApplicationStore = (): CreateApplicationStore => {
  const store = createMap<ApplicationStore>(() => {
    store.set({
      isLoading: false,
      application: applicationItemDefault,
    });
  });

  const getApplication = async (applicationId: number): Promise<void> => {
    if (!applicationId) return;
    store.setKey("isLoading", true);
    const result = await personalApi.getApplicationItem(applicationId);
    const { isOk, body, error } = result;
    if (isOk) {
      store.setKey("application", body as ApplicationItem);
    } else {
      notificationStore.addErrorAction(error);
    }
    store.setKey("isLoading", false);
  };

  const postApplicationAction = async (data: ApplicationPostProps): Promise<boolean> => {
    if (!store.value?.application.id) return false;
    const { isOk, error } = await personalApi.postApplicationItem(store.value?.application.id, data);
    if (isOk) {
      notificationStore.addSuccessAction("Profile successful update");
      return true;
    } else {
      notificationStore.addErrorAction(error);
    }
    return false;
  };

  return { store, getApplication, postApplicationAction };
};

export const useApplicationStore = (): ChatStoreType => {
  const pageStore = useMemo(() => createApplicationStore(), []);
  const state = useStore(pageStore.store);

  return { ...pageStore, ...state };
};
