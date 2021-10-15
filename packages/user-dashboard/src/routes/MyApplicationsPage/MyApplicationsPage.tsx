import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";
import { Chat } from "./_components";
import { useChatStore } from "./_components/Chat/ChatStore";
import { useLocalesStore } from "stores/LocalesStore";
import { LeftNavigationLayout } from "layouts/LeftNavigationLayout";

type PropsType = {
    applicationId: string;
};

const MyApplicationsPage: FunctionalComponent<PropsType> = ({applicationId}) => {
    const applicationIdInt = Number.parseInt(applicationId)
    const chatStore = useChatStore();
    
    const {translate:{
        application,
    }} = useLocalesStore();

    return (
        <LeftNavigationLayout title={`${application} ${applicationId}`}>
            <Chat applicationId={applicationIdInt} className="flex-grow" store={chatStore}/>
        </LeftNavigationLayout>
    );
};

export default MyApplicationsPage;