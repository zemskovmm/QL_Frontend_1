import { Button } from "components/Button";
import { useRootContext } from "components/RootContextProvider";
import { observer } from "mobx-react-lite";
import { FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { NotificationItem } from "./NotificationItem";

export const ObservedNotification: FunctionalComponent = observer(() => {
    const {notification:{notifications, removeAction,updateTimeAction}} = useRootContext()

    useEffect(()=>{
        let intervalId = setInterval(updateTimeAction,300);
        return ()=>clearInterval(intervalId);
    },[])

    return (
        <div class="relative">
            <div class="flex flex-col gap-2 absolute bottom-4 left-4">
                { notifications.map((data)=><NotificationItem data={data} onRemove={removeAction}/>)}
            </div>
        </div>
    );
});