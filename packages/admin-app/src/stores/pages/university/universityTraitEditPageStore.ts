import { observable } from "mobx";
import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { RootStore } from "src/stores/RootStore";
import {
  AdminUniversityItemDto,
  AdminUniversityItemPostDto,
  AdminUniversityPageLanguageDto,
} from "../../../interfaces/UniversityPageDto";
import { AdminTraitItemDto, AdminTraitListItemDto } from "../../../interfaces/TraitPageDto";

export class UniversityTraitEditPageStore extends RequestTracking {
  @observable items: AdminTraitListItemDto[] = [];
  @observable itemsHave: AdminTraitListItemDto[] = [];
  @observable itemsAvailable: AdminTraitListItemDto[] = [];
  @observable id: string = "";
  @observable traits: [] = [];
  @observable traitAvailable: AdminTraitListItemDto[] = [];
  @observable traitHave: number[] = [];
  @observable totalPagesAvailable: number = 0;
  @observable currentPageAvailable: number = 0;
  @observable totalPagesHave: number = 0;
  @observable currentPageHave: number = 0;

  constructor(public rootStore: RootStore) {
    super();
  }

  async load(id: string) {
    this.traitHave = await this.track(() => AdminApi.getUniversityTraitHave(id));
    const traitList = await this.track(() => AdminApi.getTraitList());
    const traitAvailableResponse = await this.track(() => AdminApi.getTraitAvailable("university"));
    this.traitAvailable = traitList.filter((el) => traitAvailableResponse.includes(el.id));
    this.id = id;
  }

  async traitLoad(id: string) {
    this.items = await this.track(() => AdminApi.getTrait(id));
    this.sortTraitsLoad();
  }

  sortTraitsLoad() {
    this.itemsAvailable = this.items.filter((el) => !this.traitHave.includes(el.id));
    this.itemsHave = this.items.filter((el) => this.traitHave.includes(el.id));
    this.totalPagesAvailable = AdminApi.getTotalPages(this.items.length);
    this.totalPagesHave = AdminApi.getTotalPages(this.items.length);
  }

  async addTrait(traitId: string) {
    try {
      await AdminApi.postUniversityTrait(this.id, traitId);
      this.traitHave.push(Number(traitId));
      this.sortTraitsLoad();
    } catch (e) {
      alert(e);
    }
  }

  async removeTrait(traitId: string) {
    try {
      await AdminApi.deleteUniversityTrait(this.id, traitId);
      this.traitHave = this.traitHave.filter((el) => el !== Number(traitId));
      this.sortTraitsLoad();
    } catch (e) {
      alert(e);
    }
  }
}
