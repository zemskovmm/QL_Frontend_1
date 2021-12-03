import { RequestTracking } from "src/utils/Loadable";
import { RootStore } from "src/stores/RootStore";
import { action, observable } from "mobx";
import { AdminApi } from "src/clients/adminApiClient";
import { ManagerApplicationInfoDto } from "src/interfaces/ManagerRpc";

export class ManagerApplicationStore extends RequestTracking {
  @observable application: ManagerApplicationInfoDto = {};
  @observable id: string = "";
  @observable openInfo: boolean = false;
  @observable messages: any;

  constructor(public rootStore: RootStore) {
    super();
  }

  @action reset() {
    this.openInfo = false;
  }

  @action
  async loadMessages() {
    try {
      this.messages = await AdminApi.getManagerApplicationMessages(this.id);
    } catch (e) {
      alert(e);
    }
  }

  @action
  async loadApplication() {
    try {
      this.application = await AdminApi.getManagerApplication(this.id);
    } catch (e) {
      alert(e);
    }
  }

  @action async load(id: string) {
    this.id = id;
    this.reset();
    await this.loadApplication();
    await this.loadMessages();
  }
}
