import { RequestTracking } from "src/utils/Loadable";
import { RootStore } from "src/stores/RootStore";
import { action, observable } from "mobx";
import { AdminApi } from "../../../../clients/adminApiClient";

export class ManagerApplicationStore extends RequestTracking {
  @observable application: any = {};
  @observable id: string = "";

  constructor(public rootStore: RootStore) {
    super();
  }

  @action
  async loadApplication() {
    try {
      this.application = AdminApi.getManagerApplication(this.id);
    } catch (e) {
      alert(e);
    }
  }

  @action load(id: string) {
    this.id = id;
  }
}
