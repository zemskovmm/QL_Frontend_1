import { action, map } from "nanostores";
import { useStore } from "@nanostores/react";
import { DEFAULT_LANG, getTranslate, Translate } from "../../locales/utils";

type LocalesStore = Translate & {
  lang: string;
};
const localesStore = map<LocalesStore>({
  ...getTranslate(DEFAULT_LANG),
  lang: DEFAULT_LANG,
});

const changeLang = action(localesStore, "changeLang", (store, lang: string) => {
  store.set({
    ...getTranslate(lang),
    lang,
  });
});

export const useLocalesStore = () => {
  const state = useStore(localesStore);

  return { ...state, changeLang };
};
