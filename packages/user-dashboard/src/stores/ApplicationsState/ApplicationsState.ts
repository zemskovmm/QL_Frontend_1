import { createMap } from "nanostores";
import { useStore } from "nanostores/preact";
import { ApplicationsPropsReq, personalApi } from "api/PersonalApi";
import { notificationStore } from "stores/NotificationStore";
import {
  ApplicationDto,
  ApplicationType,
  APPLICATION_DTO_DEFAULT,
} from "@project/components/src/interfaces/ApplicationDto";

export const TOTAL_APPLICATIONS = 20;

interface ApplicationsState {
  isLoading: boolean;
  applications: Array<ApplicationDto | undefined>;
}

const createApplicationsState = () => {
  let loadedPages: Array<boolean> = [];
  const store = createMap<ApplicationsState>(() => {
    store.set({
      isLoading: false,
      applications: [],
    });
  });

  const addApplication = async (applicationType: ApplicationType): Promise<number> => {
    store.setKey("isLoading", true);
    let outApplicationId = 0;

    const result = await personalApi.addApplications({
      ...APPLICATION_DTO_DEFAULT,
      type: applicationType,
    });

    const { isOk, body, error } = result;
    if (isOk) {
      outApplicationId = body?.id || 0;
      await getApplications();
    } else {
      notificationStore.addErrorAction(error);
    }

    store.setKey("isLoading", false);
    return outApplicationId;
  };

  const getApplications = async () => {
    loadedPages = [];
    await onItemRender(0);
  };

  const onItemRender = async (index: number) => {
    const pageIndex = Math.floor(index / TOTAL_APPLICATIONS);
    if (loadedPages[pageIndex]) {
      return;
    }
    loadedPages[pageIndex] = true;
    const data: ApplicationsPropsReq = {
      page: pageIndex,
      pageSize: TOTAL_APPLICATIONS,
      type: "",
      status: "",
    };
    store.setKey("isLoading", true);
    const result = await personalApi.getApplications(data);
    const { isOk, body, error } = result;
    if (isOk) {
      let applications: Array<ApplicationDto | undefined> = store.value?.applications || [];
      if (body) {
        if (applications.length !== body.totalItems) {
          applications = new Array(body.totalItems);
        }
        body.items.forEach((item, index) => {
          applications[TOTAL_APPLICATIONS * pageIndex + index] = item;
        });
      } else {
        applications = [];
        loadedPages = [];
      }
      store.setKey("applications", applications);
    } else {
      notificationStore.addErrorAction(error);
    }

    store.setKey("isLoading", false);
  };

  return { store, onItemRender, getApplications, addApplication };
};

const applicationsState = createApplicationsState();

export const useApplicationsState = () => {
  const state = useStore(applicationsState.store);

  return { ...applicationsState, ...state };
};
