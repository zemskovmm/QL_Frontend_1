import { NotificationGroupEnum, NotificationType } from "./_types";

const MAX_NOTIFICATION = 15;
const MAX_TIME_NOTIFICATION = 6000;

import { action, atom, onMount } from 'nanostores'
import { useStore } from "@nanostores/react";


const notificationStore = atom<Array<NotificationType>>([])

onMount(notificationStore, ()=>{
    let intervalId = setInterval(updateTimeAction,300);
    return ()=>clearInterval(intervalId);
})

const addAction = action(notificationStore,'addAction',(store, notification: NotificationType) => {
    const newNotifications = store.get().slice(-(MAX_NOTIFICATION-1));
    newNotifications.push({...notification,time: Date.now()})
    store.set(newNotifications)
}) 

const removeAction = action(notificationStore,'removeAction', (store, notificationsId?: string ) => {
    store.set(store.get().filter(({ id }) => id !== notificationsId) )
}) 

let lastId = 1;
export const addErrorAction = action(notificationStore,'addErrorAction',(store, error:string) => {
    const id = `localID_${lastId++}`;
    addAction({
        id, 
        group: NotificationGroupEnum.ERROR_NOTIFICATION_GROUP,
        message: error,
    });
}) 

export const addSuccessAction = action(notificationStore,'addSuccessAction',(store,success:string) => {
    const id = `localID_${lastId++}`;
    addAction({
        id, 
        group: NotificationGroupEnum.SUCCESS_NOTIFICATION_GROUP,
        message: success,
    });
})

const updateTimeAction = action(notificationStore,'updateTimeAction',(store) => {
    const notifications = store.get();
    if(notifications.length>0){
        const now = Date.now() - MAX_TIME_NOTIFICATION;
        if(now > (notifications[0].time || 0)){
            store.set(notifications.filter(({ time }) => now < (time || 0)));
        }
    }
})



export const useNotificationStore = () => {
    const notifications = useStore(notificationStore)
    return { 
        notifications,
        removeAction,
        addSuccessAction, 
        addErrorAction,
    }
}
