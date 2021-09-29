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
        try{
            const result = await qlClient.login(data)
            this.rootStor.notification.addSuccessAction("Login successful");
            this.rootStor.heartbeatAction(UserStatus.LOGINED_PROFILE_STATUS);
        }catch(e){
            this.rootStor.notification.addErrorAction(e);
        }
        this.isLoading = false;
    }
}