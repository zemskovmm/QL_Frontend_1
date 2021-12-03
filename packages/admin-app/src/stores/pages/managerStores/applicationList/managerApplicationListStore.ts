import { RequestTracking } from "src/utils/Loadable";
import { RootStore } from "src/stores/RootStore";
import { action, computed, observable } from "mobx";
import { ManagerApplicationListDto, ManagerListSettingsDto } from "src/interfaces/ManagerRpc";
import { AdminApi } from "../../../../clients/adminApiClient";

export class ManagerApplicationListStore extends RequestTracking {
  @observable applications: ManagerApplicationListDto = {
    totalPages: 0,
    totalItems: 0,
  };

  @observable listSettings: ManagerListSettingsDto = {
    page: 0,
    pageSize: 20,
  };

  constructor(public rootStore: RootStore) {
    super();
  }

  @action
  async load() {
    try {
      this.applications = await AdminApi.getManagerApplication(this.listSettings);
    } catch (e) {
      alert(e);
    }
  }
}
