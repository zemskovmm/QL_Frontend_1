import { createMap } from "nanostores";
import { useStore } from "nanostores/preact";
import { EditFormDto, PersonalCabinetDto } from "admin-app/src/interfaces/GlobalSettingsDto";
import { globalSettingsApi } from "api/GlobalSettingsApi";
import { ActualState } from "stores/ActualState";

interface GlobalSettingsStore {
  isLoading: boolean;
  personalCabinet: PersonalCabinetDto;
}

const createGlobalSettingsStore = () => {
  const store = createMap<GlobalSettingsStore>(() => {
    store.set({
      isLoading: false,
      personalCabinet:{}
    });
  });

  const globalSettingsActualState = new ActualState<string>(
    async (lang: string) => {
      store.setKey("isLoading", true);
      const { isOk, body } = await globalSettingsApi.getGlobalSettings(lang);
      console.log(body);
      let personalCabinet: EditFormDto|undefined = undefined;
      if (isOk) {
        store.setKey("personalCabinet", body?.personalCabinet || {})
      }else{
        store.setKey("personalCabinet", {})
      }
      store.setKey("isLoading", false);
    },
    "",
    (prev, curr) => prev === curr
  );

  const getGlobalSettings = async (lang: string): Promise<void> => {
    await globalSettingsActualState.update(lang);
  };

  return {
    store,
    getGlobalSettings,
  };
};

export const globalSettingsStore = createGlobalSettingsStore();

export const useGlobalSettingsStore = () => {
  const state = useStore(globalSettingsStore.store);
  return { ...globalSettingsStore, ...state };
};
