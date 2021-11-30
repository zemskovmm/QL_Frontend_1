import { FC } from "react";
import { useNotificationStore } from "../../stores/NotificationStore";
import { NotificationItem } from "./NotificationItem";

export const Notification: FC = () => {
  // const { notifications, removeAction } = useNotificationStore();
  return (
    <div className="relative">
      <div className="flex flex-col gap-2 absolute bottom-4 left-4">
        {/*{notifications.map((data) => (*/}
        {/*  <NotificationItem data={data} onRemove={removeAction} />*/}
        {/*))}*/}
      </div>
    </div>
  );
};
