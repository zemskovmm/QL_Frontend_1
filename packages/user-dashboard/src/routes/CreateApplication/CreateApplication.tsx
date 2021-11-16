import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";
import { useLocalesStore } from "stores/LocalesStore";
import { useApplicationsState } from "stores/ApplicationsState";
import { ApplicationType } from "@project/components/src/interfaces/ApplicationDto";
import { route } from "preact-router";
import { 
    MY_APPLICATIONS_TEMPLATE, 
    PROFILE_REDIRECT_CREATE_APPLICATIONS_TEMPLATE, 
    SIGN_IN_REDIRECT_CREATE_APPLICATIONS_TEMPLATE, 
    useRouterStore 
} from "stores/RouterStore";
import { useEffect } from "preact/hooks";
import { useUserStatuseStore } from "stores/UserStatuseStore";

type PropsType = {
    applicationType:string;
    entityId:string;
}

export const CreateApplication: FunctionalComponent<PropsType> = ({applicationType,entityId}) => {
    const { addApplication } = useApplicationsState();
    const { lang } = useLocalesStore()
    const { SIGN_IN_PATH,PROFILE_PATH } = useRouterStore();
    const { isUnlogined,isRegistrationComplite } = useUserStatuseStore();

    const signInPath = applicationType
        ? SIGN_IN_REDIRECT_CREATE_APPLICATIONS_TEMPLATE.getRoute({lang,params:[applicationType,entityId||"0"]}) 
        :SIGN_IN_PATH

    const profilePath = applicationType 
        ? PROFILE_REDIRECT_CREATE_APPLICATIONS_TEMPLATE.getRoute({lang,params:[applicationType,entityId||"0"]}) 
        :PROFILE_PATH

    useEffect(()=>{
        if( isUnlogined ){
            route(signInPath);
        }else if( isRegistrationComplite ){
            handleClick();
        }else {
            route(profilePath);
        }
    },[isUnlogined,applicationType,entityId])

    const handleClick = async () => {
        if(Object.values(ApplicationType).includes(applicationType as ApplicationType)){
            const id = await addApplication(applicationType as ApplicationType, Number(entityId));
            if(id){
                route(MY_APPLICATIONS_TEMPLATE.getRoute({lang,params:[id.toString()]}))
            }else{
                route(MY_APPLICATIONS_TEMPLATE.getRoute({lang,params:['0']}))
            }
        }
    }
    
    return (
        <div className="flex flex-col items-center p-4">
            <Text className="m-4" text="Wait..." size="title-large" isBold />
        </div>
    );
};
