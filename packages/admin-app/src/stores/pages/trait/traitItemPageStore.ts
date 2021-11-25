import { action, observable } from "mobx";
import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { RootStore } from "src/stores/RootStore";
import { RemoteUiEditorStore } from "@kekekeks/remoteui/src";
import { LanguageDictionaryCustomize } from "src/components/remoteui/AdminLanguageDictionaryEditor";
import { Loadable } from "src/stores/table/LoadableStore";
import { AdminRouteNames } from "src/pages/Admin/AdminRoutes";

export class NewTraitItemPageStore extends Loadable {
  @observable remoteUi?: RemoteUiEditorStore;
  @observable traitTypeId = 0;
  @observable root: RootStore;

  constructor(root: RootStore) {
    super();
    this.root = root;
  }

  @action async load(): Promise<void> {
    const def = await this.track(() => AdminApi.definitionTrait());
    const trait = {
      traitTypeId: this.traitTypeId,
      names: { en: {} },
      order: null,
      iconId: null,
      parentId: null,
    };
    this.remoteUi = new RemoteUiEditorStore(def, trait, new LanguageDictionaryCustomize(trait.names));
  }

  @action async save() {
    const value = (await this.remoteUi?.getDataAsync()) as any;
    if (!value) return;
    const unmapNames = Object.keys(value.names).reduce((acc, x) => ({ ...acc, [x]: value.names[x].name }), {});
    await this.track(() => AdminApi.createTrait(this.traitTypeId, { ...value, names: unmapNames }));
    await this.root.routerStore.goTo(AdminRouteNames.traitPage, { id: `${this.traitTypeId}` });
  }
}

export class TraitItemPageStore extends RequestTracking {
  @observable id: string = "";
  @observable typeId: number = 0;
  @observable partnerId: number | null = 0;
  @observable names: { [name: string]: string } = {};
  @observable order: number | null = 0;
  @observable iconId: number | null = 0;

  @observable remoteUi?: RemoteUiEditorStore;

  constructor(public rootStore: RootStore) {
    super();
  }

  @action async load(id: string) {
    const req = await this.track(() => AdminApi.getTraitItem(id));
    const def = await this.track(() => AdminApi.definitionTrait());
    // map {ru: "CityName"} -> {ru: {name: "CityName"}} to help DictionaryEditor map this mess
    const transformNames = Object.keys(req.names).reduce((acc, x) => ({ ...acc, [x]: { name: req.names[x] } }), {});

    this.remoteUi = new RemoteUiEditorStore(
      def,
      {
        ...req,
        names: transformNames,
      },
      new LanguageDictionaryCustomize(transformNames)
    );
    this.typeId = req.traitTypeId;
    this.partnerId = req.parentId;
    this.names = req.names;
    this.iconId = req.iconId;
    this.order = req.order;
    this.id = id;
  }

  async save() {
    const value = (await this.remoteUi?.getDataAsync()) as any;
    if (!value) return;
    const unmapNames = Object.keys(value.names).reduce((acc, x) => ({ ...acc, [x]: value.names[x].name }), {});
    await this.track(() => AdminApi.putTraitItem(this.id, { ...value, names: unmapNames }));
    await this.load(this.id);
  }
}
