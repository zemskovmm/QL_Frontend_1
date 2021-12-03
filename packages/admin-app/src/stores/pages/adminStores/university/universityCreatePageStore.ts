import { observable } from "mobx";
import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { RootStore } from "src/stores/RootStore";
import { AdminUniversityItemPostDto, AdminUniversityPageLanguageDto } from "src/interfaces/UniversityPageDto";
import { AdminRouteNames } from "src/pages/Admin/AdminRoutes";

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
      await this.track(() => AdminApi.postUniversity(data));
      await routerStore.goTo(AdminRouteNames.universityList);
    } catch (e) {
      alert(e);
    }
  }
}
