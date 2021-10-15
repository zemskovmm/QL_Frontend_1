import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";
import { ChatTab, ApplicationTab } from "./_components";
import { useChatStore } from "./_components/ChatTab/ChatStore";
import { useLocalesStore } from "stores/LocalesStore";
import { LeftNavigationLayout } from "layouts/LeftNavigationLayout";
import { useState } from "preact/hooks";
import { Button } from "@project/components/src/ui-kit/Button";

const APPLICATION_TAB = "APPLICATION_TAB"
const CHAT_TAB = "CHAT_TAB"

type PropsType = {
    applicationId: string;
};

const MyApplicationsPage: FunctionalComponent<PropsType> = ({applicationId}) => {
    const [tabId, setTabId] = useState(CHAT_TAB);
    const {translate:{APPLICATION,CHAT}} = useLocalesStore();
    const applicationIdInt = Number.parseInt(applicationId)
    const chatStore = useChatStore();

    const handleTab = (id:string=APPLICATION_TAB)=>{
        setTabId(id);
    }

    return (
        <LeftNavigationLayout title={`${APPLICATION} ${applicationId}`}>
            <div className="flex flex-col h-full">
                <div className="flex gap-2">
                    <Button className="flex-grow" id={APPLICATION_TAB} text={APPLICATION} onClick={handleTab} color="secondary"/>
                    <Button className="flex-grow" id={CHAT_TAB} text={CHAT} onClick={handleTab} color="secondary"/>
                </div>
                <div className="flex-grow">
                    {tabId===APPLICATION_TAB && <ApplicationTab className="h-full" applicationId={applicationIdInt}/>}
                    {tabId===CHAT_TAB && <ChatTab className="h-full" applicationId={applicationIdInt}  store={chatStore}/>}
                </div>
            </div>
            
        </LeftNavigationLayout>
    );
};

export default MyApplicationsPage;