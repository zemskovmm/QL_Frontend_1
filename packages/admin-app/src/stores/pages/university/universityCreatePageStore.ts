import { observable } from "mobx";
import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { RootStore } from "src/stores/RootStore";
import {
  AdminUniversityItemDto,
  AdminUniversityItemPostDto,
  AdminUniversityPageLanguageDto,
} from "../../../interfaces/UniversityPageDto";
import { RouteNames } from "../../../routing/routes";

export class UniversityCreatePageStore extends RequestTracking {
  @observable items: { [lang: string]: AdminUniversityPageLanguageDto };
  @observable foundationYear: number = 0;
  @observable logoId: number | null = 0;
  @observable bannerId: number | null = 0;

  constructor(public rootStore: RootStore) {
    super();
    this.items = {
      en: { name: "", htmlDescription: "", url: "" },
      ru: { name: "", htmlDescription: "", url: "" },
      cn: { name: "", htmlDescription: "", url: "" },
      esp: { name: "", htmlDescription: "", url: "" },
      fr: { name: "", htmlDescription: "", url: "" },
    };
  }

  async save() {
    const { routerStore } = this.rootStore;
    const data: AdminUniversityItemPostDto = {
      foundationYear: this.foundationYear,
      logoId: this.logoId,
      bannerId: this.bannerId,
      languages: this.items,
    };
    try {
      const res = await this.track(() => AdminApi.postUniversity(data));
      await routerStore.goTo(RouteNames.universityList);
    } catch (e) {
      alert(e);
    }
  }
}
