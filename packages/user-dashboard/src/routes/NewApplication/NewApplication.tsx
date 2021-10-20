import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";
import { useLocalesStore } from "stores/LocalesStore";
import { ApplicationCard } from "./_components";

export const NewApplication: FunctionalComponent = () => {
    const {
        WHAT_SERVICES_LANG,
        GET_EDUCATION_COURSES_VISA_LANG, 
        GO_TO_LANG,
    } = useLocalesStore();
    
    return (
        <div className="flex flex-col items-center">
            <Text className="" text={WHAT_SERVICES_LANG} size="title-large" isBold />
            <Text text={GET_EDUCATION_COURSES_VISA_LANG} size="title-small" isBold />

            <div className="self-stretch flex justify-around">
                <ApplicationCard title={WHAT_SERVICES_LANG}/>
                <ApplicationCard title={WHAT_SERVICES_LANG}/>
                <ApplicationCard title={WHAT_SERVICES_LANG}/>
                <ApplicationCard title={WHAT_SERVICES_LANG}/>
                
            </div>
        </div>
    );
};
