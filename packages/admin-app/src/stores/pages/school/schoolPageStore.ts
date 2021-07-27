import { Loadable, RequestTracking } from "../../../utils/Loadable";
import { RootStore } from "../../RootStore";
import { observable } from "mobx";
import { AdminApi } from "../../../clients/adminApiClient";

export type AdminSchoolLanguageDto<T extends unknown> = {
  name: string;
  htmlDescription: string;
  url: string;
  metadata?: T;
};

export type AdminSchoolDto<T extends unknown> = {
  id: string;
  foundationYear?: number;
  languages: { [id: string]: AdminSchoolLanguageDto<T> };
};

export class SchoolListPageStore extends Loadable {
  @observable items: AdminSchoolDto<unknown>[] = [];
  @observable totalPages: number = 1;
  @observable currentPage: number = 1;
  @observable root: RootStore;

  constructor(public rootStore: RootStore) {
    super();
    this.root = rootStore;
  }

  async load(): Promise<void> {
    this.items = await this.track(() => AdminApi.getSchoolList());
  }
}
