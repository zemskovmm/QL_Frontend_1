import { qlClient, QlClientLoginProps, QlClientRegisterProps } from 'api/QlClient';
import { makeAutoObservable } from 'mobx';
import { NotificationStore } from 'stores/NotificationStore';
import { UserStatus } from './_types';


export class RootStore{
    url:string = "";
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

    get isUnlogined() {
        return this.userStatus === UserStatus.UNLOGINED_PROFILE_STATUS;
    }


    //actions

    async heartbeatAction(status?:UserStatus): Promise<boolean>{
        if(status){
            this.userStatus = status;
        }
        const {isOk} = await qlClient.heartbeat();
        if(isOk){
            this.userStatus = UserStatus.LOGINED_PROFILE_STATUS;
            return true;
        }
        this.userStatus = UserStatus.UNLOGINED_PROFILE_STATUS;
        return false;
    }

    async logoutAction(){
        const {isOk,error} = await qlClient.logout();
        if(isOk){
            this.notification.addSuccessAction("Logout successful");
            this.userStatus = UserStatus.UNLOGINED_PROFILE_STATUS;
        }else{
            this.notification.addErrorAction(error);
        }
    }

    async changeUrl(url:string){
        this.url=url;
    }
}