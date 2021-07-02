import { observable } from "mobx";
import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { RootStore } from "src/stores/RootStore";
import {
  AdminUniversityItemDto,
  AdminUniversityItemPostDto,
  AdminUniversityPageLanguageDto,
} from "../../../interfaces/UniversityPageDto";

export class UniversityPageStore extends RequestTracking {
  @observable items: { [lang: string]: AdminUniversityPageLanguageDto } = {};
  @observable id: string = "";
  @observable foundationYear: number = 0;
  @observable logoId: number | null = 0;
  @observable bannerId: number | null = 0;
  @observable galleryList: (number | string)[] = [];

  constructor(public rootStore: RootStore) {
    super();
  }

  async load(id: string) {
    const res = await this.track(() => AdminApi.getUniversity(id));
    this.items = res.languages;
    this.id = id;
    this.foundationYear = res.foundationYear;
    this.logoId = res.logoId;
    this.bannerId = res.bannerId;
    this.galleryList = res.galleryList;
  }

  async save() {
    const data: AdminUniversityItemPostDto = {
      foundationYear: this.foundationYear,
      logoId: this.logoId,
      bannerId: this.bannerId,
      languages: this.items,
    };
    const res = await this.track(() => AdminApi.putUniversity(this.id, data));
  }
}
