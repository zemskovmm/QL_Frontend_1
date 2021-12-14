import { action, map } from "nanostores";
import { useStore } from "src/stores/react-nanostores";
import { applicationsApi } from "src/api/ApplicationApi";
import { addErrorAction, addSuccessAction } from "src/stores/NotificationStore";
import { ApplicationPostProps } from "@project/components/src/interfaces/ApplicationDto";
import { portalUserFileApi } from "src/api/PortalUserFileApi";

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
    const result = await applicationsApi.getApplicationItem(applicationId);
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
    const { isOk, error } = await applicationsApi.postApplicationItem(store.get().application.id, data);
    if (isOk) {
      addSuccessAction("Profile successful update");
      return true;
    } else {
      addErrorAction(error);
    }
    return false;
  }
);

const postMedia = action(
  applicationStore,
  "postMedia",
  async (store, data: FormData): Promise<number> => {
    //const { isOk, error, body } = await applicationsApi.postMedia(store.get().application.id, data);
    const { isOk, error, body } = await portalUserFileApi.postUserFile(data);
    if (isOk) {
      return body?.id || 0;
    }
    throw error;
  }
);

const deleteMedia = action(
  applicationStore,
  "deleteMedia",
  async (store, blobId: number): Promise<void> => {
    //const { isOk, error, body } = await applicationsApi.deleteMedia(store.get().application.id, blobId);
    const { isOk, error, body } = await portalUserFileApi.deleteUserFile(blobId);

    if (!isOk) {
      throw error;
    }
  }
);

export const useApplicationTabStore = () => {
  const state = useStore(applicationStore);

  return { ...state, getApplication, postApplicationAction, postMedia, deleteMedia };
};
