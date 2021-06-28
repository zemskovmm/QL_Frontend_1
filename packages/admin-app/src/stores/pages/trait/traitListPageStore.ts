import { observable } from "mobx";
import { AdminTraitListItemDto } from "src/interfaces/TraitPageDto";
import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { RootStore } from "src/stores/RootStore";

export class TraitListPageStore extends RequestTracking {
  @observable items: AdminTraitListItemDto[] = [];
  @observable totalPages: number = 0;
  @observable currentPage: number = 0;

  constructor(public rootStore: RootStore) {
    super();
  }

  async load() {
    this.items = await this.track(() => AdminApi.getTraitList());
    this.totalPages = AdminApi.getTotalPages(this.items.length);
  }
}
