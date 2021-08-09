import { Loadable, RequestTracking } from "../../../utils/Loadable";
import { RootStore } from "../../RootStore";
import { action, observable } from "mobx";
import { AdminApi } from "../../../clients/adminApiClient";
import { RemoteUiEditorStore } from "@kekekeks/remoteui/src";
import { LanguageDictionaryCustomize } from "../../../components/remoteui/AdminLanguageDictionaryEditor";
import { Dictionary } from "../../../utils/types";
import { TraitEditorStore, TraitLoaderWithCache } from "../../../components/traitEditor";

const emptyModel = ({ languages: { en: {} } } as unknown) as AdminSchoolDto<unknown>;

export type AdminSchoolLanguageDto<T extends unknown> = {
  name: string;
  htmlDescription: string;
  url: string;
  metadata?: T;
};

export type AdminSchoolDtoLanguagesDict = Dictionary<AdminSchoolLanguageDto<unknown>>;

export type AdminSchoolDto<T extends unknown> = {
  id: string;
  foundationYear?: number;
  languages: AdminSchoolDtoLanguagesDict;
};

export class SchoolTraitLoader extends TraitLoaderWithCache {
  @observable schoolId = 0;

  @action async setSchoolId(id: number) {
    this.schoolId = id;
    await this.reload();
  }

  async addTraitToItem(traitId: number) {
    await AdminApi.addTraitToSchool(this.schoolId, traitId);
  }

  async deleteTraitToItem(traitId: number) {
    await AdminApi.removeTraitFromSchool(this.schoolId, traitId);
  }

  async loadActiveTraits() {
    return await AdminApi.getActiveTraitsBySchoolId(this.schoolId);
  }
}

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

export class CreateSchoolPageStore extends Loadable {
  @observable.ref remoteUiStore?: RemoteUiEditorStore;
  @observable root: RootStore;

  constructor(public rootStore: RootStore) {
    super();
    this.root = rootStore;
  }

  async save() {
    const data = await this.remoteUiStore?.getDataAsync();
    if (data) await AdminApi.createSchool(data as AdminSchoolDto<unknown>);
    alert("Entity created");
  }

  @action async load(): Promise<void> {
    const def = await AdminApi.definitionSchool();
    this.remoteUiStore = new RemoteUiEditorStore(
      def,
      emptyModel,
      new LanguageDictionaryCustomize(emptyModel.languages)
    );
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
    this.remoteUiStore = new RemoteUiEditorStore(definition, value, new LanguageDictionaryCustomize(value.languages));
  }
}

export class SchoolTraitEditorStore {
  @observable root: RootStore;
  @observable traitStore: TraitEditorStore<SchoolTraitLoader>;

  constructor(public rootStore: RootStore) {
    this.root = rootStore;
    this.traitStore = new TraitEditorStore(new SchoolTraitLoader());
  }

  @action async loadStore(id: number) {
    this.traitStore.page = 0;
    await this.traitStore.traitLoader.setSchoolId(id);
    await this.traitStore.refresh({});
  }
}
