import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";
import { useLocalesStore } from "stores/LocalesStore";
import { ApplicationCard } from "./_components";
import { ApplicationType } from "@project/components/src/interfaces/ApplicationDto";
import { useApplicationsState } from "stores/ApplicationsState";
import { route } from "preact-router";
import { MY_APPLICATIONS_TEMPLATE } from "stores/RouterStore";

export const NewApplication: FunctionalComponent = () => {
    const {
        lang,
        WHAT_SERVICES_LANG,
        GET_EDUCATION_COURSES_VISA_LANG, 
        GO_TO_LANG,
    } = useLocalesStore();

    const { addApplication } = useApplicationsState();

    const handleClick = async (applicationType:string|undefined) => {
        if(Object.values(ApplicationType).includes(applicationType as ApplicationType)){
            const id = await addApplication(applicationType as ApplicationType);
            if(id){
                route(MY_APPLICATIONS_TEMPLATE.getRoute({lang,pageId:id.toString()}))
            }
            
        }
    }
    
    return (
        <div className="flex flex-col items-center p-4">
            <Text className="m-4" text={WHAT_SERVICES_LANG} size="title-large" isBold />
            <Text className="m-4" text={GET_EDUCATION_COURSES_VISA_LANG} size="title-small" isBold />

            <div className="self-stretch flex flex-wrap justify-center">
                <ApplicationCard 
                    id={ApplicationType.University} 
                    title={"Получите профессиональное образование"}
                    onClick={handleClick}/>
                <ApplicationCard 
                    id={ApplicationType.Course} 
                    title={"Пройдите языковые курсы"}
                    onClick={handleClick}/>
                <ApplicationCard 
                    id={ApplicationType.Housing} 
                    title={"Найдите жилье для аренды"}
                    onClick={handleClick}/>
                <ApplicationCard 
                    id={ApplicationType.Visa} 
                    title={"Получили визу во Францию"}
                    onClick={handleClick}/>
            </div>
        </div>
    );
};
