import { observable } from "mobx";
import { AdminUniversityItemDto } from "src/interfaces/UniversityPageDto";
import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { RootStore } from "src/stores/RootStore";

export class UniversityListPageStore extends RequestTracking {
  @observable items: AdminUniversityItemDto[] = [];
  @observable totalPages: number = 0;
  @observable currentPage: number = 0;

  constructor(public rootStore: RootStore) {
    super();
  }

  async load() {
    this.items = await this.track(() => AdminApi.getUniversityList());
    this.totalPages = AdminApi.getTotalPages(this.items.length);
  }
}
