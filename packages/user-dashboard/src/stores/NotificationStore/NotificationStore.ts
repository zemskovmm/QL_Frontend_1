import { makeAutoObservable } from "mobx";
import { NotificationGroupEnum, NotificationType } from "./_types";

export class NotificationStore {
    notifications: Array<NotificationType> = [];
    lastId:number= 1;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }



    addAction(notification: NotificationType) {
        this.notifications = [...this.notifications, notification];
    }

    removeAction(notification: { id: string }) {
        this.notifications = this.notifications.filter(({ id }) => id !== notification.id);
    }

    addErrorAction(error:string) {
        const id = `localID_${this.lastId++}`;
        this.notifications = [...this.notifications, {
            id, 
            group: NotificationGroupEnum.ERROR_NOTIFICATION_GROUP,
            messtate: error,
        }];
    }
}