export enum NotificationGroupEnum {
    ERROR_NOTIFICATION_GROUP = 'ERROR_NOTIFICATION_GROUP',
    WARNING_NOTIFICATION_GROUP = "WARNING_NOTIFICATION_GROUP",
    TEXT_NOTIFICATION_GROUP = "TEXT_NOTIFICATION_GROUP",
    SUCCESS_NOTIFICATION_GROUP = "SUCCESS_NOTIFICATION_GROUP",
}

export type NotificationType = {
    id:string;
    group: NotificationGroupEnum;
    message: string;
    time?: number;
}