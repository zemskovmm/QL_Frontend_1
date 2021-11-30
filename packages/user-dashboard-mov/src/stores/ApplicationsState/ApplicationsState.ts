import { action, map } from "nanostores";
import { useStore } from "@nanostores/preact";
import { ApplicationsPropsReq, personalApi } from "api/PersonalApi";
import { addErrorAction } from "stores/NotificationStore";
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

let loadedPages: Array<boolean> = [];

const applicationsState = map<ApplicationsState>({
  isLoading: false,
  applications: [],
});

const addApplication = action(applicationsState,"addApplication",async (store,applicationType:ApplicationType,entityId:number):Promise<number> => {
  store.setKey('isLoading',true);
  let outApplicationId = 0;

  const result = await personalApi.addApplications({
      ...APPLICATION_DTO_DEFAULT,
      type:applicationType,
      entityId,
  });

  const { isOk, body, error } = result;
  if (isOk) {
    outApplicationId = body?.id || 0;
    await getApplications();
  } else {
    addErrorAction(error);
  }

  store.setKey("isLoading", false);
  return outApplicationId;
}) 

const getApplications = action(applicationsState,'getApplications',async (store) => {
  loadedPages = [];
  await onItemRender(0);
}) 

const onItemRender =  action(applicationsState,'getApplications',async (store, index: number) => {
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
    let applications: Array<ApplicationDto | undefined> = store.get().applications || [];
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
    addErrorAction(error);
  }
  store.setKey("isLoading", false);
});

export const useApplicationsState = () => {
  const state = useStore(applicationsState);
  return { ...state, onItemRender, getApplications, addApplication };
};