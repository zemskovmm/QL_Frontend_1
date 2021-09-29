import { makeAutoObservable } from "mobx";
import { NotificationGroupEnum, NotificationType } from "./_types";

const MAX_NOTIFICATION = 15;
const MAX_TIME_NOTIFICATION = 6000;

export class NotificationStore {
    notifications: Array<NotificationType> = [];
    lastId:number= 1;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }



    addAction(notification: NotificationType) {
        const newNotifications = this.notifications.slice(-(MAX_NOTIFICATION-1));
        newNotifications.push({...notification,time: Date.now()})
        this.notifications = newNotifications;
    }

    removeAction( notificationsId?: string ) {
        this.notifications = this.notifications.filter(({ id }) => id !== notificationsId);
    }

    addErrorAction(error:string) {
        const id = `localID_${this.lastId++}`;
        this.addAction({
            id, 
            group: NotificationGroupEnum.ERROR_NOTIFICATION_GROUP,
            message: error,
        });
    }
    
    addSuccessAction(success:string) {
        const id = `localID_${this.lastId++}`;
        this.addAction({
            id, 
            group: NotificationGroupEnum.SUCCESS_NOTIFICATION_GROUP,
            message: success,
        });
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