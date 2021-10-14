import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";
import { Chat } from "./_components";
import { useChatStore } from "./_components/Chat/ChatStore";
import { useMyApplicationsState } from "./MyApplicationsState";
import { useLocalesStore } from "stores/LocalesStore";
import { LeftNavigationLayout } from "layouts/LeftNavigationLayout";

const MyApplicationsPage: FunctionalComponent = () => {
    const {applications,applicationId,selectApplication} = useMyApplicationsState();
    const chatStore = useChatStore();

    const {translate:{
        myApplications,
        application,
    }} = useLocalesStore();

    return (
        <LeftNavigationLayout title={`${application} ${applicationId}`}>
            <div className="flex border bg-gray-50 h-full">
                <ul>
                    {applications.map(({id,type,status})=>(
                        <li className={`border px-2 ${applicationId===id?"bg-green-200":""}`}
                            key={id} 
                            onClick={()=>{selectApplication(id)}}>
                            <Text text={`${id} ${type} ${status}`}/>
                        </li>
                    ))}
                </ul> 
                <Chat applicationId={applicationId} className="flex-grow" store={chatStore}/>
            </div>
        </LeftNavigationLayout>
    );
};

export default MyApplicationsPage;