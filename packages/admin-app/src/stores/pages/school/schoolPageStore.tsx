import { Loadable, RequestTracking } from "../../../utils/Loadable";
import { RootStore } from "../../RootStore";
import { observable } from "mobx";
import { AdminApi } from "../../../clients/adminApiClient";
import { RemoteUiEditorStore } from "@kekekeks/remoteui/src";
import { SchoolPageCustomize } from "../../../components/remoteui/AdminLanguageDictionaryEditor";
import { AdminPageDto } from "../../../interfaces/AdminPageDto";

export type AdminSchoolLanguageDto<T extends unknown> = {
  name: string;
  htmlDescription: string;
  url: string;
  metadata?: T;
};

export type AdminSchoolDtoLanguagesDict = { [id: string]: AdminSchoolLanguageDto<unknown> };

export type AdminSchoolDto<T extends unknown> = {
  id: string;
  foundationYear?: number;
  languages: AdminSchoolDtoLanguagesDict;
};

export class SchoolListPageStore extends Loadable {
  @observable items: AdminSchoolDto<unknown>[] = [];
  @observable totalPages: number = 1;
  @observable currentPage: number = 1;
  @observable root: RootStore;

  constructor(public rootStore: RootStore) {
    super();
    this.root = rootStore;
  }

  async load(): Promise<void> {
    this.items = await this.track(() => AdminApi.getSchoolList());
  }
}

export class SchoolPageStore extends Loadable {
  @observable.ref remoteUiStore?: RemoteUiEditorStore;
  @observable root: RootStore;
  @observable id = 0;

  constructor(public rootStore: RootStore) {
    super();
    this.root = rootStore;
  }

  async loadById(id: number) {
    this.id = id;
    await this.load();
  }

  async save() {
    const data = await this.remoteUiStore?.getDataAsync();
    if (data) await AdminApi.updateSchool(this.id, data as AdminSchoolDto<unknown>);
    alert("Entity updated");
  }

  async load(): Promise<void> {
    const { value, definition } = await this.track(() => AdminApi.getSchool(this.id));
    this.remoteUiStore = new RemoteUiEditorStore(definition, value, new SchoolPageCustomize(value));
  }
}
