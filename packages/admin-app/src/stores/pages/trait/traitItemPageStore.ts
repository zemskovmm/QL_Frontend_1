import { action, observable } from "mobx";
import { AdminTraitItemDto } from "src/interfaces/TraitPageDto";
import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { RootStore } from "src/stores/RootStore";
import { RemoteUiEditorStore } from "@kekekeks/remoteui/src";
import { LanguageDictionaryCustomize } from "../../../components/remoteui/AdminLanguageDictionaryEditor";

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
    const data: AdminTraitItemDto = {
      traitTypeId: this.typeId,
      parentId: this.partnerId,
      names: this.names,
      order: this.order,
      iconId: this.iconId,
    };

    const value = (await this.remoteUi?.getDataAsync()) as any;
    if (!value) return;
    const unmapNames = Object.keys(value.names).reduce((acc, x) => ({ ...acc, [x]: value.names[x].name }), {});
    await this.track(() => AdminApi.putTraitItem(this.id, { ...value, names: unmapNames }));
    await this.load(this.id);
  }
}
