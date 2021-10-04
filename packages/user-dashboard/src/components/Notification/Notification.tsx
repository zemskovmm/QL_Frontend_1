import { FunctionalComponent } from "preact";
import { useNotificationStore } from "stores/NotificationStore";
import { NotificationItem } from "./NotificationItem";

export const Notification: FunctionalComponent = () => {
    const {notifications, removeAction } = useNotificationStore()
    return (
        <div class="relative">
            <div class="flex flex-col gap-2 absolute bottom-4 left-4">
                { notifications.map((data)=><NotificationItem data={data} onRemove={removeAction}/>)}
            </div>
        </div>
    );
};