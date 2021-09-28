import { Text } from "components/Text";
import { FunctionalComponent } from "preact";
import { NotificationGroupEnum, NotificationType } from "stores/NotificationStore";

type PropsType = {
    data: NotificationType;
    onRemove: (id:string)=>void;
};

export const NotificationItem: FunctionalComponent<PropsType> = ({data, onRemove}) => {
    
    const classes = [
        "inline-flex p-2 rounded max-w-md",
        NotificationGroupEnum.SUCCESS_NOTIFICATION_GROUP,
        data.group === NotificationGroupEnum.SUCCESS_NOTIFICATION_GROUP ? "bg-green-400":
        data.group === NotificationGroupEnum.ERROR_NOTIFICATION_GROUP ? "bg-red-400" : 
            "bg-gray-400",
    ].join(' ');

    return (
        <button className={classes} key={data.id+""} onClick={()=>onRemove(data.id+"")} >
            <Text text={data.message+""}/>
        </button>
    );
};