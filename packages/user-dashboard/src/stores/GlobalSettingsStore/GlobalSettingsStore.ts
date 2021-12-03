import { action, map } from "nanostores";
import { useStore } from "src/stores/react-nanostores";
import { PersonalCabinetDto } from "admin-app/src/interfaces/GlobalSettingsDto";
import { globalSettingsApi } from "src/api/GlobalSettingsApi";

interface GlobalSettingsStore {
  isLoading: boolean;
  personalCabinet: PersonalCabinetDto;
}

const globalSettingsStore = map<GlobalSettingsStore>({
  isLoading: false,
  personalCabinet: {},
});

var versionReq = 0;
var lastLang: string;
const getGlobalSettings = action(
  globalSettingsStore,
  "getGlobalSettings",
  async (store, lang: string): Promise<void> => {
    console.log("getGlobalSettings",lang);
    if(lastLang === lang){
      return;
    }
    
    lastLang = lang
    const newVersionReq = ++versionReq

    store.setKey("isLoading", true);
    const { isOk, body } = await globalSettingsApi.getGlobalSettings(lang);
    console.log(body);
    if(newVersionReq!==versionReq){
      return;
    }
    
    if (isOk) {
      store.setKey("personalCabinet", body?.personalCabinet || {});
    } else {
      store.setKey("personalCabinet", {});
    }
    store.setKey("isLoading", false);
  }
);

export const useGlobalSettingsStore = () => {
  const state = useStore(globalSettingsStore);
  return { ...state, getGlobalSettings };
};
