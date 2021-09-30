import { qlClient, QlClientLoginProps } from "api/QlClient";
import { RootStore, UserStatus } from "stores/RootStore";
import { makeAutoObservable } from "mobx";


export class SignInStore{
    rootStor:RootStore;
    isLoading = false;

    constructor(rootStor:RootStore) {
        this.rootStor = rootStor;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async loginAction(data:QlClientLoginProps){
        this.isLoading = true;
        const {isOk,error} = await qlClient.login(data)
        if(isOk){
            this.rootStor.heartbeatAction(UserStatus.LOGINED_PROFILE_STATUS);
            this.rootStor.notification.addSuccessAction("Login successful");
        }else{
            this.rootStor.notification.addErrorAction(error);
        }
        this.isLoading = false;
    }
}