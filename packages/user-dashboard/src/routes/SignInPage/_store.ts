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

    //computed
    async loginAction(data:QlClientLoginProps){
        this.isLoading = true;
        const result = await qlClient.login(data)
        if(result.isOk){
            this.rootStor.heartbeatAction(UserStatus.LOGINED_PROFILE_STATUS);
            this.rootStor.notification.addSuccessAction("Login successful");
        }else{
            this.rootStor.notification.addErrorAction(`${result.status} ${result.error}`);
        }
        this.isLoading = false;
    }
}