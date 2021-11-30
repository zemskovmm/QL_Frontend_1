import { action, map } from "nanostores";
import { useStore } from "@nanostores/preact";
import { putUserAction as UserStatusPutUserAction, UserStatuseUserProps } from "stores/UserStatuseStore";

interface ProfileStore {
  isLoading: boolean;
}

const profileStore = map<ProfileStore>({
  isLoading: false,
});

const putUserAction = action(profileStore,'putUserAction', async (store,data: UserStatuseUserProps):Promise<void> => {
  store.setKey("isLoading", true);
  console.log(data);
  await UserStatusPutUserAction(data);
  store.setKey("isLoading", false);
});

type UseProfileStoreType = ProfileStore&{
  putUserAction:(data: UserStatuseUserProps)=>Promise<void>
}

export const useProfileStore = ():UseProfileStoreType => {
  const state = useStore(profileStore);
  return { ...state, putUserAction};
};
