import { observable } from "mobx";
import { AdminPageListDto } from "src/interfaces/AdminPageDto";
import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";

export class PageListPageStore extends RequestTracking {
  @observable current: AdminPageListDto = { totalPages: 1, results: [] };
  @observable currentPage: number = 0;

  async load(page: number) {
    this.current = await this.track(() => AdminApi.getPages(page));
    this.currentPage = page;
  }
}
