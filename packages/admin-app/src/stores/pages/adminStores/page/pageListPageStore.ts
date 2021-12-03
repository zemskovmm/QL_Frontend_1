import { observable } from "mobx";
import { AdminPageListItemDto } from "src/interfaces/AdminPageDto";
import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";

export class PageListPageStore extends RequestTracking {
  @observable current: AdminPageListItemDto[] = [];
  @observable currentPage: number = 0;
  @observable search: string = "";
  @observable totalPages: number = 0;

  async load() {
    let res = await this.track(() => AdminApi.getPages(this.currentPage, this.search));
    if (this.currentPage > res.totalPages) {
      this.currentPage = +res.totalPages - 1;
      res = await this.track(() => AdminApi.getPages(this.currentPage, this.search));
    }
    this.current = res.results;
    this.totalPages = res.totalPages;
  }
}
