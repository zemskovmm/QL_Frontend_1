import { makeAutoObservable } from "mobx";
import { NotificationGroupEnum, NotificationType } from "./_types";

const MAX_TIME_NOTIFICATION = 6000

export class NotificationStore {
    notifications: Array<NotificationType> = [];
    lastId:number= 1;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }



    addAction(notification: NotificationType) {
        this.notifications = [...this.notifications, {...notification,time: Date.now()}];
    }

    removeAction( notificationsId?: string ) {
        this.notifications = this.notifications.filter(({ id }) => id !== notificationsId);
    }

    addErrorAction(error:string) {
        const id = `localID_${this.lastId++}`;
        this.notifications = [...this.notifications, {
            id, 
            group: NotificationGroupEnum.ERROR_NOTIFICATION_GROUP,
            message: error,
            time: Date.now()
        }];
    }
    
    addSuccessAction(error:string) {
        const id = `localID_${this.lastId++}`;
        this.notifications = [...this.notifications, {
            id, 
            group: NotificationGroupEnum.SUCCESS_NOTIFICATION_GROUP,
            message: error,
            time: Date.now()
        }];
    }

    updateTimeAction() {
        if(this.notifications.length>0){
            const now = Date.now() - MAX_TIME_NOTIFICATION;
            if(now > (this.notifications[0].time || 0)){
                this.notifications = this.notifications.filter(({ time }) => now < (time || 0));
            }
        }
    }
}