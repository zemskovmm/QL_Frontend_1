import { action, map } from "nanostores";
import { useStore } from "@nanostores/react";
import { personalApi } from "../../api/PersonalApi";
import { addErrorAction } from "../NotificationStore";
import {
  ApplicationType,
  APPLICATION_DTO_DEFAULT,
} from "@project/components/src/interfaces/ApplicationDto";

interface NewApplicationState {
  createApplicationReq?:{applicationType: ApplicationType; entityId: number}
  createApplicationId?:number
}

const newApplicationState = map<NewApplicationState>({});

const saveCreateApplication = action(
  newApplicationState,
  "saveCreateApplication",
  (store, applicationType: ApplicationType, entityId: number)=> {
    store.setKey("createApplicationReq",{applicationType,entityId});
    store.setKey("createApplicationId",undefined);
  }
);
const clearCreateApplication = action(
  newApplicationState,
  "clearCreateApplication",
  (store)=> {
    store.setKey("createApplicationReq",undefined);
    store.setKey("createApplicationId",undefined);
  }
);

const sendCreateApplication = action(
  newApplicationState,
  "sendCreateApplication",
  async (store): Promise<void> => {
    const createApplicationReq = store.get().createApplicationReq

    if(createApplicationReq){
      const result = await personalApi.addApplications({
        ...APPLICATION_DTO_DEFAULT,
        type: createApplicationReq.applicationType,
        entityId: createApplicationReq.entityId,
      });
  
      const { isOk, body, error } = result;
      if (isOk) {
        const outApplicationId = body?.id || 0;
        store.setKey('createApplicationId',outApplicationId)
        store.setKey('createApplicationReq',undefined)
      } else {
        addErrorAction(error);
      }
    }
  }
);

export const useNewApplicationState = () => {
  const state = useStore(newApplicationState);
  return { ...state, saveCreateApplication,clearCreateApplication, sendCreateApplication };
};
