import { observable } from "mobx";
import { AdminDirectoryListItemDto } from "src/interfaces/DirectoryPageDto";
import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { ReactTableStore } from "src/stores/table/ReactTableStore";
import { RootStore } from "../RootStore";

export class DirectoryListPageStore extends ReactTableStore<any> {
  @observable items: AdminDirectoryListItemDto[] = [];

  constructor(public rootStore: RootStore) {
    super();
  }
  async refresh() {
    const req = await this.track(() => AdminApi.getDirectory());
    this.items = req.directories;
    this.totalPages =
      this.items.length % 10 ? Math.floor(this.items.length / 10) + 1 : Math.floor(this.items.length / 10);
  }
}
