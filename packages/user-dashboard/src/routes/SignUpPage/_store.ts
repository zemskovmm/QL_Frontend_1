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
        try{
            const result = await qlClient.register(data)
            this.rootStor.notification.addSuccessAction("Register successful");
            this.isRegistred = true;
        }catch(e){
            this.rootStor.notification.addErrorAction(e);
        }
        this.isLoading = false;
    }
}