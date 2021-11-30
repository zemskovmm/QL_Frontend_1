import { DEFAULT_LANG, getLangIUrls, urlToLang } from "src/locales/utils";
import { map, action } from "nanostores";
import { useStore } from "@nanostores/react";
import { PagePaths } from "./_types";
import { getLangPagePaths } from "./_utils";

type RouterStore = PagePaths & {
  url: string;
  langUrls: { [key: string]: string };
};
const routerStore = map<RouterStore>({
  ...getLangPagePaths(DEFAULT_LANG),
  url: "",
  langUrls: getLangIUrls(""),
});

const changeUrl = action(routerStore, "changeUrl", (store, url: string) => {
  const lang = urlToLang(url);
  store.set({
    ...getLangPagePaths(lang || DEFAULT_LANG),
    url,
    langUrls: getLangIUrls(url),
  });
});

export const useRouterStore = () => {
  const state = useStore(routerStore);
  return { ...state, changeUrl };
};
