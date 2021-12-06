import { RequestTracking } from "src/utils/Loadable";
import { RootStore } from "src/stores/RootStore";
import { action, computed, observable } from "mobx";
import { AdminApi } from "src/clients/adminApiClient";
import { ManagerApplicationInfoDto } from "src/interfaces/ManagerRpc";
import { take, pullAllWith, isEqual, takeRight } from "lodash";

const POLL_INTERVAL = 5000;

export type Message = {
  id: number;
  author: string;
  blobId: number | null;
  date: string;
  type: string;
  text: string;
};

export class ManagerApplicationStore extends RequestTracking {
  @observable application: ManagerApplicationInfoDto = {};
  @observable id: string = "";
  @observable openInfo: boolean = false;
  @observable messages: Message[] | any = [];
  @observable sms: string = "";
  @observable stopMore: boolean = false;
  @observable stopLoad: boolean = false;

  @observable intervalTimer = 0;

  @computed get isPolling() {
    return this.intervalTimer !== 0;
  }

  constructor(public rootStore: RootStore) {
    super();
  }

  @action async postMessages() {
    if (!this.sms) return;
    const sms = this.sms;
    this.sms = "";
    try {
      await AdminApi.postManagerApplicationMessage(this.id, { type: 0, text: sms });
      await this.loadMessages();
    } catch (e) {
      console.log(e);
    }
  }

  @action async postFile(file: File) {
    try {
      await AdminApi.postManagerApplicationUpload(this.id, file);
    } catch (e) {
      console.log(e);
    }
  }

  /*Messages list*/
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
    if (this.stopMore) return;
    this.stopLoad = true;
    try {
      const messages = await AdminApi.getManagerApplicationMessages(this.id, {
        beforeMessageId: null,
        afterMessageId: null,
        count: 60,
      });
      this.messages = this.messages.concat(pullAllWith(messages, takeRight(this.messages, 60), isEqual));
      this.stopLoad = false;
    } catch (e) {
      alert(e);
    }
  }

  @action
  async MoreLoadMessages() {
    if (this.stopMore) return;
    this.stopMore = true;
    try {
      const lastId: Message[] = take(this.messages);
      const messagesBefore = await AdminApi.getManagerApplicationMessages(this.id, {
        beforeMessageId: lastId[0]?.id,
        afterMessageId: null,
        count: 30,
      });
      this.messages = pullAllWith(messagesBefore, take(this.messages, 30), isEqual).concat(this.messages);
      this.stopMore = false;
    } catch (e) {
      alert(e);
    }
  }

  /* Any */

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
