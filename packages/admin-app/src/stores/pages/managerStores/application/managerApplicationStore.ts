import { RequestTracking } from "src/utils/Loadable";
import { RootStore } from "src/stores/RootStore";
import { action, computed, observable } from "mobx";
import { AdminApi } from "src/clients/adminApiClient";
import { ManagerApplicationInfoDto } from "src/interfaces/ManagerRpc";

const POLL_INTERVAL = 5000;

export class ManagerApplicationStore extends RequestTracking {
  @observable application: ManagerApplicationInfoDto = {};
  @observable id: string = "";
  @observable openInfo: boolean = false;
  @observable messages: any;

  @observable intervalTimer = 0;

  @computed get isPolling() {
    return this.intervalTimer !== 0;
  }

  constructor(public rootStore: RootStore) {
    super();
  }

  @action
  pollMessages() {
    if (this.isPolling) return;
    this.intervalTimer = window.setInterval(this.loadMessages.bind(this), POLL_INTERVAL);
  }

  @action
  stopPolling() {
    if (!this.isPolling) return;
    window.clearTimeout(this.intervalTimer);
    this.intervalTimer = 0;
  }

  @action reset() {
    this.openInfo = false;
    this.stopPolling();
  }

  @action async loadMessagesIntervalCallback() {
    if (!this.isPolling) return;
    await this.loadMessages();
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
