import { useMemo,useEffect } from "preact/hooks";
import { createMap, updateKey } from 'nanostores'
import { useStore } from "nanostores/preact";
import { ApplicationsPage, ApplicationsPropsReq, personalApi } from "api/PersonalApi";
import { notificationStore } from "stores/NotificationStore";

export const TOTAL_APPLICATIONS = 100;

interface ApplicationsState {
    isLoading: boolean;
    applications: Array<ApplicationsPage>
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

    return { store, getApplications }
}

const applicationsState = createApplicationsState();

export const useApplicationsState = () => {
    const state = useStore(applicationsState.store)

    return { ...applicationsState, ...state }
}