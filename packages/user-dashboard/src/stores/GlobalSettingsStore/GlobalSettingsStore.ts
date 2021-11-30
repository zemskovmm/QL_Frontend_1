import { action, map } from "nanostores";
import { useStore } from "@nanostores/react";
import { EditFormDto, PersonalCabinetDto } from "admin-app/src/interfaces/GlobalSettingsDto";
import { globalSettingsApi } from "src/api/GlobalSettingsApi";
import { ActualState } from "src/stores/ActualState";

interface GlobalSettingsStore {
  isLoading: boolean;
  personalCabinet: PersonalCabinetDto;
}

const globalSettingsStore = map<GlobalSettingsStore>({
  isLoading: false,
  personalCabinet: {},
});

const globalSettingsActualState = new ActualState<string>(
  async (lang: string) => {
    const store = globalSettingsStore;
    store.setKey("isLoading", true);
    const { isOk, body } = await globalSettingsApi.getGlobalSettings(lang);
    console.log(body);
    let personalCabinet: EditFormDto | undefined = undefined;
    if (isOk) {
      store.setKey("personalCabinet", body?.personalCabinet || {});
    } else {
      store.setKey("personalCabinet", {});
    }
    store.setKey("isLoading", false);
  },
  "",
  (prev, curr) => prev === curr
);

const getGlobalSettings = action(
  globalSettingsStore,
  "getGlobalSettings",
  async (store, lang: string): Promise<void> => {
    await globalSettingsActualState.update(lang);
  }
);

export const useGlobalSettingsStore = () => {
  const state = useStore(globalSettingsStore);
  return { ...state, getGlobalSettings };
};
