import { Loadable } from "src/utils/Loadable";
import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import { AdminApi } from "src/clients/adminApiClient";
import { RemoteUiEditorStore } from "@kekekeks/remoteui/src";
import { LanguageDictionaryCustomize } from "src/components/remoteui/AdminLanguageDictionaryEditor";
import { Dictionary } from "src/utils/types";
import { TraitEditorStore, TraitLoaderWithCache } from "src/components/traitEditor";

const emptyModel = ({ languages: { en: {} } } as unknown) as AdminHousingDto<unknown>;

export type AdminHousingLanguageDto<T extends unknown> = {
  name: string;
  htmlDescription: string;
  url: string;
  metadata?: T;
};

export type AdminHousingDtoLanguagesDict = Dictionary<AdminHousingLanguageDto<unknown>>;

export type AdminHousingDto<T extends unknown> = {
  id: string;
  languages: AdminHousingDtoLanguagesDict;
};

export class HousingTraitLoader extends TraitLoaderWithCache {
  @observable HousingId = 0;

  @observable async setHousingId(id: number) {
    this.HousingId = id;
    await this.reload();
  }

  async addTraitToItem(traitId: number) {
    await AdminApi.addTraitToHousing(this.HousingId, traitId);
  }

  async deleteTraitToItem(traitId: number) {
    await AdminApi.removeTraitFromHousing(this.HousingId, traitId);
  }

  async loadActiveTraits(): Promise<number[]> {
    return await AdminApi.getActiveHousingTraits(this.HousingId);
  }
}

export class HousingAccommodationTraitLoader extends TraitLoaderWithCache {
  @observable HousingId = 0;

  @observable async setHousingId(id: number) {
    this.HousingId = id;
    await this.reload();
  }

  async addTraitToItem(traitId: number) {
    await AdminApi.addTraitToHousingAccommodation(this.HousingId, traitId);
  }

  async deleteTraitToItem(traitId: number) {
    await AdminApi.removeTraitFromHousingAccommodation(this.HousingId, traitId);
  }

  async loadActiveTraits(): Promise<number[]> {
    return await AdminApi.getActiveHousingAccommodationTraits(this.HousingId);
  }
}

export class HousingEditPageStore extends Loadable {
  @observable.ref remoteUiStore?: RemoteUiEditorStore;
  @observable root: RootStore;
  @observable id = 0;

  constructor(public rootStore: RootStore) {
    super();
    this.root = rootStore;
  }

  @action async loadById(id: number) {
    this.id = id;
    await this.load();
  }

  @action async save() {
    const data = await this.remoteUiStore?.getDataAsync();
    if (data) {
      try {
        await AdminApi.updateHousing(this.id, data as AdminHousingDto<unknown>);
        alert("Entity updated");
      } catch (e) {
        alert(`This id is school undefined`);
      }
    }
  }

  async load(): Promise<void> {
    const { value, definition } = await this.track(() => AdminApi.getHousing(this.id));
    this.remoteUiStore = new RemoteUiEditorStore(definition, value, new LanguageDictionaryCustomize(value.languages));
  }
}

export class CreateHousingPageStore extends Loadable {
  @observable.ref remoteUiStore?: RemoteUiEditorStore;
  @observable root: RootStore;

  constructor(public rootStore: RootStore) {
    super();
    this.root = rootStore;
  }

  async save() {
    const data = await this.remoteUiStore?.getDataAsync();
    if (data) {
      try {
        await AdminApi.createHousing(data as AdminHousingDto<unknown>);
        alert("Entity created");
      } catch (e) {
        alert(`This id is school undefined`);
      }
    }
  }

  @action async load(): Promise<void> {
    const def = await AdminApi.definitionHousings();
    this.remoteUiStore = new RemoteUiEditorStore(
      def,
      emptyModel,
      new LanguageDictionaryCustomize(emptyModel.languages)
    );
  }
}

export class HousingListStore extends Loadable {
  @observable items: AdminHousingDto<unknown>[] = [];
  @observable totalPages: number = 1;
  @observable currentPage: number = 1;
  @observable root: RootStore;

  constructor(public rootStore: RootStore) {
    super();
    this.root = rootStore;
  }

  @action async load(): Promise<void> {
    this.items = await this.track(() => AdminApi.getHousingList());
  }
}

export class HousingTraitEditorStore {
  @observable root: RootStore;
  @observable traitStore: TraitEditorStore<HousingTraitLoader>;

  constructor(public rootStore: RootStore) {
    this.root = rootStore;
    this.traitStore = new TraitEditorStore(new HousingTraitLoader());
  }

  @action async loadStore(id: number) {
    this.traitStore.page = 0;
    await this.traitStore.traitLoader.setHousingId(id);
    await this.traitStore.refresh({});
  }
}

export class HousingAccommodationTraitEditorStore {
  @observable root: RootStore;
  @observable traitStore: TraitEditorStore<HousingAccommodationTraitLoader>;

  constructor(public rootStore: RootStore) {
    this.root = rootStore;
    this.traitStore = new TraitEditorStore(new HousingAccommodationTraitLoader());
  }

  @action async loadStore(id: number) {
    this.traitStore.page = 0;
    await this.traitStore.traitLoader.setHousingId(id);
    await this.traitStore.refresh({});
  }
}
