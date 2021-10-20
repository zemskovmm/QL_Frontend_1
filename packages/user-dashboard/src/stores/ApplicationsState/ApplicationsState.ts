import { createMap, updateKey } from 'nanostores'
import { useStore } from "nanostores/preact";
import { ApplicationsPropsReq, personalApi } from "api/PersonalApi";
import { notificationStore } from "stores/NotificationStore";
import { ApplicationDto, ApplicationType, APPLICATION_DTO_DEFAULT } from "@project/components/src/interfaces/ApplicationDto";

export const TOTAL_APPLICATIONS = 100;

interface ApplicationsState {
    isLoading: boolean;
    applications: Array<ApplicationDto>
    applicationId: number;
}

const createApplicationsState = ()=>{
    const store = createMap<ApplicationsState>(() => {
        store.set({
            isLoading: false,
            applications: [],
            applicationId: 0,
        })
    })

    const addApplication = async (applicationType:ApplicationType):Promise<number> => {
        store.setKey('isLoading',true);
        let outApplicationId = 0;

        const result = await personalApi.addApplications({
            ...APPLICATION_DTO_DEFAULT,
            type:applicationType
        });

        const {isOk,body,error} = result
        if(isOk){
            outApplicationId= body?.id || 0;
        }else{
            notificationStore.addErrorAction(error);
        }

        store.setKey('isLoading',false);
        return outApplicationId;
    }

    const getApplications = async (data:ApplicationsPropsReq) => {
        store.setKey('isLoading',true);
        const result = await personalApi.getApplications(data);
        const {isOk,body,error} = result
        if(isOk){
            const applications = body?.items || [];
            updateKey(store, "applicationId",(applicationId)=>{
                if(applications.length === 0){
                    return 0;
                }
                for(let {id} of applications){
                    if(applicationId === id){
                        return applicationId
                    }
                }
                return applications[0].id;
            });
            store.setKey( "applications", applications )
        }else{
            notificationStore.addErrorAction(error);
        }

        store.setKey('isLoading',false);
    }

    return { store, getApplications, addApplication }
}

const applicationsState = createApplicationsState();

export const useApplicationsState = () => {
    const state = useStore(applicationsState.store)

    return { ...applicationsState, ...state }
}