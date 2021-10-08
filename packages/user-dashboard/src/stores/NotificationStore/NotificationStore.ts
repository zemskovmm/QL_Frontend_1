import { NotificationGroupEnum, NotificationType } from "./_types";

const MAX_NOTIFICATION = 15;
const MAX_TIME_NOTIFICATION = 6000;

import { createStore, getValue, update } from 'nanostores'
import { useStore } from "nanostores/preact";


const createNotificationStore = ()=>{
    let lastId = 1;

    const store = createStore<Array<NotificationType>>(() => {
        store.set([])

        let intervalId = setInterval(updateTimeAction,300);
        return ()=>clearInterval(intervalId);
    })

    const addAction = (notification: NotificationType) => {
        update(store,(prev)=>{
            const newNotifications = prev.slice(-(MAX_NOTIFICATION-1));
            newNotifications.push({...notification,time: Date.now()})
            return newNotifications;
        })
    }

    const removeAction = ( notificationsId?: string ) => {
        update( store, prev => prev.filter(({ id }) => id !== notificationsId) );
    }

    const addErrorAction = (error:string) => {
        const id = `localID_${lastId++}`;
        addAction({
            id, 
            group: NotificationGroupEnum.ERROR_NOTIFICATION_GROUP,
            message: error,
        });
    }
    
    const addSuccessAction = (success:string) => {
        const id = `localID_${lastId++}`;
        addAction({
            id, 
            group: NotificationGroupEnum.SUCCESS_NOTIFICATION_GROUP,
            message: success,
        });
    }

    const updateTimeAction = () => {
        const notifications = getValue(store);
        if(notifications.length>0){
            const now = Date.now() - MAX_TIME_NOTIFICATION;
            if(now > (notifications[0].time || 0)){
                store.set(notifications.filter(({ time }) => now < (time || 0)));
            }
        }
    }

    return { store, addAction, removeAction, addErrorAction, addSuccessAction }
}

export const notificationStore = createNotificationStore();

export const useNotificationStore = () => {
    const notifications = useStore(notificationStore.store)
    return { ...notificationStore, notifications }
}