import { action, observable } from "mobx";
import { AdminTraitItemDto } from "src/interfaces/TraitPageDto";
import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { RootStore } from "src/stores/RootStore";
import { RemoteUiEditorStore } from "@kekekeks/remoteui/src";

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
    this.remoteUi = new RemoteUiEditorStore(def, req);
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
    const req = await this.track(() => AdminApi.putTraitItem(this.id, data));
  }
}
