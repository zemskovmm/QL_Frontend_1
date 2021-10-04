import { Text } from "components/Text";
import { FunctionalComponent } from "preact";
import { NotificationGroupEnum, NotificationType } from "stores/NotificationStore";

const NotificationColors = {
    [NotificationGroupEnum.ERROR_NOTIFICATION_GROUP]: "bg-red-200 border-red-500",
    [NotificationGroupEnum.WARNING_NOTIFICATION_GROUP]: "bg-yellow-200 border-yellow-500",
    [NotificationGroupEnum.TEXT_NOTIFICATION_GROUP]: "bg-gray-200 border-gray-500",
    [NotificationGroupEnum.SUCCESS_NOTIFICATION_GROUP]: "bg-green-200 border-green-500",
}

type PropsType = {
    data: NotificationType;
    onRemove: (id:string)=>void;
};

export const NotificationItem: FunctionalComponent<PropsType> = ({ data:{id,message,group}, onRemove}) => {
    
    const classes = [
        "inline-flex p-2 rounded border max-w-md",
        NotificationColors[group],
    ].join(' ');

    return (
        <button className={classes} key={id} onClick={()=>onRemove(id)} >
            <Text text={message}/>
        </button>
    );
};