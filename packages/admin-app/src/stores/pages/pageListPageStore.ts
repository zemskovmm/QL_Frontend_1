import { observable, action } from "mobx";
import { AdminPageListItemDto } from "src/interfaces/AdminPageDto";
import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";

export class PageListPageStore extends RequestTracking {
  @observable currentState: AdminPageListItemDto[] = [];
  @observable current: AdminPageListItemDto[] = [];
  @observable test: boolean[] = [];
  @observable currentPage: number = 0;
  @observable searchQuery: string = "";
  @observable totalPages: number = 0;
  @observable searchLang: string = "en";

  async load(page: number) {
    const res = await this.track(() => AdminApi.getPages(page));
    this.currentState = res.results;
    this.currentPage = page;
  }

  async search(): Promise<void> {
    this.current = this.currentState;
    if (this.searchQuery) {
      this.current = await this.currentState.filter(
        (el) => el.titles[this.searchLang]?.toLowerCase()?.split(this.searchQuery.toLowerCase()).length > 1
      );
    }
    this.totalPages = AdminApi.getTotalPages(this.current.length);
    this.currentPage = 0;
  }
}
