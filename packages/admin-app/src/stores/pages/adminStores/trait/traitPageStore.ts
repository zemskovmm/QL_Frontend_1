import { action, observable } from "mobx";
import { AdminTraitListItemDto } from "src/interfaces/TraitPageDto";
import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { RootStore } from "src/stores/RootStore";

export class TraitPageStore extends RequestTracking {
  @observable items: AdminTraitListItemDto[] = [];
  @observable totalPages: number = 0;
  @observable currentPage: number = 0;
  @observable traitTypeId = "0";

  constructor(public rootStore: RootStore) {
    super();
  }

  @action async load(id: string) {
    this.traitTypeId = id;
    this.items = await this.track(() => AdminApi.getTrait(id));
    this.totalPages = AdminApi.getTotalPages(this.items.length);
  }
}
