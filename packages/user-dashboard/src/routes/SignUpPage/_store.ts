import { qlClient, QlClientRegisterProps } from "api/QlClient";
import { RootStore} from "stores/RootStore";
import { makeAutoObservable } from "mobx";


export class SignUpStore{
    rootStor:RootStore;
    isLoading = false;
    isRegistred = false;

    constructor(rootStor:RootStore) {
        this.rootStor = rootStor;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    //computed

    async registerAction(data:QlClientRegisterProps){
        this.isRegistred = false;
        this.isLoading = true;
        const {isOk,error} = await qlClient.register(data)
        if(isOk){
            this.rootStor.notification.addSuccessAction("Register successful");
            this.isRegistred = true;
        }else{
            this.rootStor.notification.addErrorAction(error);
        }
        this.isLoading = false;
    }
}