import { RequestTracking } from "src/utils/Loadable";
import { RootStore } from "src/stores/RootStore";
import { action, observable } from "mobx";
import { ManagerApplicationListDto, ManagerListSettingsDto } from "src/interfaces/ManagerRpc";
import { AdminApi } from "src/clients/adminApiClient";

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

  @action reset() {
    this.listSettings = {
      page: 0,
      pageSize: 20,
    };
    this.applications = {
      totalPages: 0,
      totalItems: 0,
    };
  }

  @action async getApplication(newSearch?: boolean) {
    if (newSearch) this.listSettings.page = 0;
    try {
      if (this.listSettings.userId) {
        this.applications = await AdminApi.getManagerApplicationUserIdList(this.listSettings, this.listSettings.userId);
      } else {
        this.applications = await AdminApi.getManagerApplicationList(this.listSettings);
      }
    } catch (e) {
      alert(e);
    }
  }

  @action
  async load(answered?: boolean) {
    this.reset();
    if (answered) this.listSettings.isAnswered = true;
    await this.getApplication();
  }
}
