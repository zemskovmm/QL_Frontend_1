import { qlClient, QlClientLoginProps, QlClientRegisterProps } from 'api/QlClient';
import { makeAutoObservable } from 'mobx';
import { NotificationStore } from 'stores/NotificationStore';
import { UserStatus } from './_types';


export class RootStore{
    userStatus:UserStatus = UserStatus.INIT_PROFILE_STATUS;
    notification:NotificationStore;

    constructor(notification:NotificationStore) {
        this.notification = notification;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    //computed
    get isLogined(){
        return this.userStatus === UserStatus.LOGINED_PROFILE_STATUS;
    }

    get isUnlogined(){
        return this.userStatus === UserStatus.UNLOGINED_PROFILE_STATUS;
    }


    //actions
    async heartbeatAction(status?:UserStatus){
        if(status){
            this.userStatus = status;
        }
        try{
            const result = await qlClient.heartbeat()
            if(result){
                this.userStatus = UserStatus.LOGINED_PROFILE_STATUS;
                return;
            }
        }catch(e){ }
        this.userStatus = UserStatus.UNLOGINED_PROFILE_STATUS;
    }
}