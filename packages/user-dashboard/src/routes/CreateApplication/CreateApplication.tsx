import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";
import { useLocalesStore } from "stores/LocalesStore";
import { useApplicationsState } from "stores/ApplicationsState";
import { ApplicationType } from "@project/components/src/interfaces/ApplicationDto";
import { route } from "preact-router";
import { MY_APPLICATIONS_TEMPLATE } from "stores/RouterStore";
import { useEffect } from "preact/hooks";

type PropsType = {
    applicationType:string;
    entityId:string;
}

export const CreateApplication: FunctionalComponent<PropsType> = ({applicationType,entityId}) => {
    const {
        lang,
    } = useLocalesStore();
    const { addApplication } = useApplicationsState();

    useEffect(()=>{
        handleClick();
    },[applicationType,entityId])

    const handleClick = async () => {
        if(Object.values(ApplicationType).includes(applicationType as ApplicationType)){
            const id = await addApplication(applicationType as ApplicationType, entityId);
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
