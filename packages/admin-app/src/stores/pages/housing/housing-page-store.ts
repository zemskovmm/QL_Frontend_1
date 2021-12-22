import { Loadable } from "src/utils/Loadable";
import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import { AdminApi } from "src/clients/adminApiClient";
import { RemoteUiDefinition, RemoteUiEditorStore } from "@kekekeks/remoteui/src";
import {
  LanguageDictionaryCustomize,
  PageDefinitionBuilder,
} from "src/components/remoteui/AdminLanguageDictionaryEditor";
import { Dictionary } from "src/utils/types";
import { TraitEditorStore, TraitLoaderWithCache } from "src/components/traitEditor";
import { get, set } from "lodash";

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
type PageDefinitionFactory = (x: RemoteUiDefinition) => PageDefinitionBuilder;

const pageDefinitionFactory: PageDefinitionFactory = (x) => (name) => {
  const def: RemoteUiDefinition = {
    types: {
      HousingLanguageLocationAdminDto: get(x, "types.HousingLanguageLocationAdminDto"),
    },
    groups: get(x, "types.HousingLanguageAdminDto.groups"),
  };
  set(def.groups, "[0].name", name);
  return def;
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
    this.remoteUiStore = new RemoteUiEditorStore(
      definition,
      value,
      new LanguageDictionaryCustomize(value.languages, pageDefinitionFactory(definition))
    );
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
