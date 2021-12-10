import { action, map, MapStore } from "nanostores";
import { useStore } from "src/stores/react-nanostores";
import { ApplicationsPropsReq, applicationsApi } from "src/api/ApplicationApi";
import { addErrorAction } from "../NotificationStore";
import { ApplicationType } from "@project/components/src/interfaces/ApplicationDto";
import { InfinityListProvider, InfinityListProviderInit } from "@project/components/src/ui-kit/List";
import { getLocaleTranslete } from "src/locales/locales";

export const TOTAL_APPLICATIONS = 20;

interface ApplicationsState {
  isOpenList: boolean;
  isLoading: boolean;
  lang: string;
  applicationList: InfinityListProvider;
}

let loadedPages: Array<boolean> = [];

const applicationsState = map<ApplicationsState>({
  isOpenList: false,
  isLoading: false,
  lang: "en",
  applicationList: InfinityListProviderInit(5),
});

const setIsOpenList = action(applicationsState, "setIsOpenPage", (store, isOpen: boolean) => {
  if (store.get().isOpenList === isOpen) {
    return;
  }
  clearApplications(applicationsState);
  store.setKey("isOpenList", isOpen);
  onItemsRendered(0, 0);
});

const getApplication = action(applicationsState, "getApplication", (store) => {
  clearApplications(applicationsState);
  onItemsRendered(0, 0);
});

const setLang = action(applicationsState, "setLang", (store, lang: string) => {
  if (store.get().lang === lang) {
    return;
  }
  store.setKey("lang", lang);
  clearApplications(applicationsState);
  onItemsRendered(0, 0);
});

const clearApplications = (store: MapStore<ApplicationsState>) => {
  loadedPages = [];
};

const onItemsRendered = action(
  applicationsState,
  "onItemsRendered",
  async (store, startIndex: number, stopIndex: number) => {
    const maxPageIndex = Math.floor(stopIndex / TOTAL_APPLICATIONS);
    for (let pageIndex = Math.floor(startIndex / TOTAL_APPLICATIONS); pageIndex <= maxPageIndex; pageIndex++) {
      if (!store.get().isOpenList) {
        return;
      }
      if (loadedPages[pageIndex]) {
        continue;
      }
      loadedPages[pageIndex] = true;
      const data: ApplicationsPropsReq = {
        page: pageIndex,
        pageSize: TOTAL_APPLICATIONS,
        type: "",
        status: "",
      };
      store.setKey("isLoading", true);
      const result = await applicationsApi.getApplications(data);
      const { isOk, body, error } = result;
      if (isOk) {
        if (body) {
          const APPLICATION_TYTLES_LANG: { [key: string]: string } = {
            [ApplicationType.Course]: getLocaleTranslete(store.get().lang).APPLICATION_TYTLES_COURSE_LANG,
            [ApplicationType.Housing]: getLocaleTranslete(store.get().lang).APPLICATION_TYTLES_HOUSING_LANG,
            [ApplicationType.University]: getLocaleTranslete(store.get().lang).APPLICATION_TYTLES_UNIVERSITY_LANG,
            [ApplicationType.Visa]: getLocaleTranslete(store.get().lang).APPLICATION_TYTLES_VISA_LANG,
          };
          store.setKey(
            "applicationList",
            store.get().applicationList.push({
              count: body.totalItems,
              start: TOTAL_APPLICATIONS * pageIndex,
              rows: body.items.map(({ id, type }) => {
                const date: Date = new Date(); //TODO После добавления даты, получать с сервера
                return {
                  id: id.toString(),
                  text: (APPLICATION_TYTLES_LANG[type] || type.toString()).replace(":date", date.toLocaleDateString()),
                };
              }),
            })
          );
        } else {
          store.setKey("applicationList", new InfinityListProvider());
          loadedPages = [];
        }
      } else {
        addErrorAction(error);
      }
      store.setKey("isLoading", false);
    }
  }
);

export const useApplicationsState = () => {
  const state = useStore(applicationsState);
  return { ...state, setLang, onItemsRendered, setIsOpenList, getApplication };
};
