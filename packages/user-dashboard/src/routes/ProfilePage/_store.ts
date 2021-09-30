import { qlClient, QlClientLoginProps, QlClientUserProps } from "api/QlClient";
import { RootStore, UserStatus } from "stores/RootStore";
import { makeAutoObservable } from "mobx";


const EMPTY_USER:QlClientUserProps = {
    firstName:"",
    lastName:"",
    phone:"",
    personalInfo:{}
}


export class ProfileStore{
    rootStor:RootStore;
    isLoading = false;
    defaultUser:QlClientUserProps = EMPTY_USER;

    constructor(rootStor:RootStore) {
        this.rootStor = rootStor;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async putUserAction(data:QlClientUserProps){
        this.isLoading = true;
        const {isOk,error} = await qlClient.putUser(data)
        if(isOk){
            this.rootStor.heartbeatAction();
            this.rootStor.notification.addSuccessAction("Profile successful update");
        }else{
            this.rootStor.notification.addErrorAction(error);
        }
        this.isLoading = false;
    }

    async getUserAction():Promise<QlClientUserProps>{
        
        this.isLoading = true;
        const {isOk,error,body} = await qlClient.getUser()
        if(!isOk){
            this.rootStor.notification.addErrorAction(error);
        }
        this.isLoading = false;
        this.defaultUser = body? body: EMPTY_USER;
        return this.defaultUser;
    }
}