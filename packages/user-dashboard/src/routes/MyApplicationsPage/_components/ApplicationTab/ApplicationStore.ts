import { action, map } from "nanostores";
import { useStore } from "src/stores/react-nanostores";
import { personalApi } from "src/api/PersonalApi";
import { addErrorAction, addSuccessAction } from "src/stores/NotificationStore";
import { ApplicationPostProps } from "@project/components/src/interfaces/ApplicationDto";

type ApplicationItem = {
  id: number;
  type: number | string;
  entityId: number;
  status: number;
  commonApplicationInfo: { [key: string]: any };
  entityTypeSpecificApplicationInfo: { [key: string]: any };
};

interface ApplicationStore {
  isLoading: boolean;
  application: ApplicationItem;
}

const applicationStore = map<ApplicationStore>({
  isLoading: false,
  application: {
    id: 0,
    type: 0,
    entityId: 0,
    status: 0,
    commonApplicationInfo: {},
    entityTypeSpecificApplicationInfo: {},
  },
});

const getApplication = action(
  applicationStore,
  "getApplication",
  async (store, applicationId: number): Promise<void> => {
    if (!applicationId) return;
    store.setKey("isLoading", true);
    const result = await personalApi.getApplicationItem(applicationId);
    const { isOk, body, error } = result;
    if (isOk) {
      store.setKey("application", body as ApplicationItem);
    } else {
      addErrorAction(error);
    }
    store.setKey("isLoading", false);
  }
);

const postApplicationAction = action(
  applicationStore,
  "postApplicationAction",
  async (store, data: ApplicationPostProps): Promise<boolean> => {
    if (!store.get().application.id) return false;
    const { isOk, error } = await personalApi.postApplicationItem(store.get().application.id, data);
    if (isOk) {
      addSuccessAction("Profile successful update");
      return true;
    } else {
      addErrorAction(error);
    }
    return false;
  }
);

type UseApplicationStore = ApplicationStore & {
  getApplication: (applicationId: number) => Promise<void>;
  postApplicationAction: (data: ApplicationPostProps) => Promise<boolean>;
};

export const useApplicationStore = (): UseApplicationStore => {
  const state = useStore(applicationStore);

  return { ...state, getApplication, postApplicationAction };
};
