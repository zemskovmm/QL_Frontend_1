import { Loadable } from "src/utils/Loadable";
import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import { AdminApi } from "src/clients/adminApiClient";
import { RemoteUiEditorStore } from "@kekekeks/remoteui/src";
import { LanguageDictionaryCustomize } from "src/components/remoteui/AdminLanguageDictionaryEditor";
import { TraitEditorStore, TraitLoaderWithCache } from "src/components/traitEditor";
import { cloneDeep, set } from "lodash";
import {
  AdminHousingAccommodationDto,
  AdminHousingAccommodationDtoLanguagesDict,
  AdminHousingAccommodationDtoLanguagesDictRemoteUi,
  mapFromRemoteUi,
  mapToRemoteUi,
} from "./type-utils";

const emptyModel = ({
  names: { en: { name: "" } },
} as unknown) as AdminHousingAccommodationDto<AdminHousingAccommodationDtoLanguagesDictRemoteUi>;

export class HousingAccommodationTraitLoader extends TraitLoaderWithCache {
  @observable HousingAccommodationId = 0;

  @observable async setHousingAccommodationId(id: number) {
    this.HousingAccommodationId = id;
    await this.reload();
  }

  async addTraitToItem(traitId: number) {
    await AdminApi.addTraitToHousingAccommodation(this.HousingAccommodationId, traitId);
  }

  async deleteTraitToItem(traitId: number) {
    await AdminApi.removeTraitFromHousingAccommodation(this.HousingAccommodationId, traitId);
  }

  async loadActiveTraits(): Promise<number[]> {
    return await AdminApi.getActiveHousingAccommodationTraits(this.HousingAccommodationId);
  }
}

export class HousingAccommodationEditPageStore extends Loadable {
  @observable.ref remoteUiStore?: RemoteUiEditorStore;
  @observable root: RootStore;
  @observable id = 0;
  @observable housingId = 0;

  constructor(public rootStore: RootStore) {
    super();
    this.root = rootStore;
  }

  @action async loadById(id: number, housingId: number) {
    this.id = id;
    this.housingId = housingId;
    await this.load();
  }

  @action async save() {
    const data = (await this.remoteUiStore?.getDataAsync()) as AdminHousingAccommodationDto<AdminHousingAccommodationDtoLanguagesDictRemoteUi>;
    if (!data) return;
    set(data, "housingId", this.housingId);
    if (data) {
      try {
        await AdminApi.updateHousingAccommodation(this.id, mapFromRemoteUi(data));
        alert("Entity updated");
      } catch (e) {
        alert(`This id is school undefined`);
      }
    }
  }

  async load(): Promise<void> {
    const { value, definition } = await this.track(() => AdminApi.getHousingAccommodation(this.id));
    const mappedValue = mapToRemoteUi(value);
    this.remoteUiStore = new RemoteUiEditorStore(
      definition,
      mappedValue,
      new LanguageDictionaryCustomize(mappedValue.names)
    );
  }
}

export class CreateHousingAccommodationPageStore extends Loadable {
  @observable.ref remoteUiStore?: RemoteUiEditorStore;
  @observable root: RootStore;
  @observable housingId = 0;

  constructor(public rootStore: RootStore) {
    super();
    this.root = rootStore;
  }

  async save() {
    const data = (await this.remoteUiStore?.getDataAsync()) as AdminHousingAccommodationDto<AdminHousingAccommodationDtoLanguagesDictRemoteUi>;
    if (!data) return;
    set(data, "housingId", this.housingId);
    if (data) {
      try {
        await AdminApi.createHousingAccommodation(mapFromRemoteUi(data));
        alert("Entity created");
      } catch (e) {
        alert(`This id is school undefined`);
      }
    }
  }

  @action assignHousingId(housingId: number) {
    this.housingId = housingId;
  }

  @action async load(): Promise<void> {
    const def = await AdminApi.definitionHousingsAccommodation();
    const clone = { ...cloneDeep(emptyModel), housingId: this.housingId };
    this.remoteUiStore = new RemoteUiEditorStore(def, clone, new LanguageDictionaryCustomize(clone.names));
  }
}

export class HousingAccommodationListStore extends Loadable {
  @observable items: AdminHousingAccommodationDto<AdminHousingAccommodationDtoLanguagesDict>[] = [];
  @observable totalPages: number = 1;
  @observable currentPage: number = 1;
  @observable root: RootStore;
  @observable id = 0;
  @observable housingId = 0;

  constructor(public rootStore: RootStore) {
    super();
    this.root = rootStore;
  }

  @action async loadById(id: number, housingId: number) {
    this.id = id;
    this.housingId = housingId;
    await this.load();
  }

  @action async load(): Promise<void> {
    this.items = await this.track(() => AdminApi.getHousingAccommodationList(this.id));
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
    await this.traitStore.traitLoader.setHousingAccommodationId(id);
    await this.traitStore.refresh({});
  }
}
