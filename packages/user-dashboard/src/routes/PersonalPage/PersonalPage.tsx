import { Button } from "components/Button";
import { Text } from "components/Text";
import { FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { Chat } from "./_components";
import { useChatStore } from "./_components/Chat/ChatStore";
import { usePersonalStore } from "./PersonalPageState";

const PersonalPage: FunctionalComponent = () => {
    const {applications,applicationId,selectApplication} = usePersonalStore();
    const chatStore = useChatStore();
    
    return <div className="flex flex-col h-full">
        <Text text="Personal" size="title-medium" isBold/>
        <div className="flex-grow flex border bg-gray-50">
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
        
        
        
    </div>
};

export default PersonalPage;