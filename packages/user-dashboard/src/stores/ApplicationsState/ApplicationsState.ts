import { action, map } from "nanostores";
import { useStore } from "@nanostores/react";
import { ApplicationsPropsReq, personalApi } from "../../api/PersonalApi";
import { addErrorAction } from "../NotificationStore";
import {
  ApplicationDto,
  ApplicationType,
  APPLICATION_DTO_DEFAULT,
} from "@project/components/src/interfaces/ApplicationDto";

export const TOTAL_APPLICATIONS = 20;

interface ApplicationsState {
  isOpenPage: boolean;
  isLoading: boolean;
  applications: Array<ApplicationDto | undefined>;
}

let loadedPages: Array<boolean> = [];

const applicationsState = map<ApplicationsState>({
  isOpenPage:false,
  isLoading: false,
  applications: [],
});

const setIsOpenPage = action(applicationsState,"setIsOpenPage",
  (store, isOpen: boolean) => {
    store.setKey("isOpenPage", isOpen);
  }
);

const getApplications = action(applicationsState, "getApplications", async (store) => {
  loadedPages = [];
  await onItemRender(0);
});

const onItemRender = action(applicationsState, "getApplications", async (store, index: number) => {
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
  return { ...state, onItemRender, getApplications, setIsOpenPage };
};
